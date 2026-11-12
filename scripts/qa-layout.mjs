import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { createServer } from "node:http";
import { readFile, readdir, stat, mkdir, writeFile } from "node:fs/promises";
import { resolve, extname, relative } from "node:path";
import assert from "node:assert/strict";

const root = resolve("dist");
const homeHTML = await readFile(resolve(root, "index.html"), "utf8");
const base = new URL(homeHTML.match(/rel="canonical" href="([^"]+)"/)[1])
  .pathname;
const capture =
  process.argv.includes("--capture") || process.env.QA_CAPTURE === "true";
const routes = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.endsWith(".html")) {
      const html = await readFile(path, "utf8");
      if (html.includes("<main"))
        routes.push(relative(root, path).replace(/index\.html$/, ""));
    }
  }
}
await walk(root);
const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};
const server = createServer(async (req, res) => {
  try {
    const pathname = new URL(req.url, "http://localhost").pathname;
    if (!pathname.startsWith(base)) throw Error("Outside base path");
    let path = resolve(
      root,
      decodeURIComponent(pathname.slice(base.length)) || "index.html",
    );
    if (!path.startsWith(root + "/")) throw Error("Outside dist");
    if ((await stat(path)).isDirectory()) path = resolve(path, "index.html");
    res.setHeader(
      "Content-Type",
      mime[extname(path)] || "application/octet-stream",
    );
    res.end(await readFile(path));
  } catch {
    res.statusCode = 404;
    res.end("Not found");
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}${base}`;
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox"],
});
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();
const failures = [],
  metrics = [],
  behaviors = [];
page.on("pageerror", (error) => failures.push({ javascript: error.message }));
const shots = {
  "": "sk-home",
  "en/": "en-home",
  "zh/": "zh-home",
  "sluzby/povolenia-a-schvalenia/": "sk-service",
  "letectvo/": "sk-aviation",
  "letectvo/skusky-avioniky/": "sk-aviation-testing",
  "kontaktujte-nas/": "sk-contact",
  "en/references/": "en-references",
};
const shotDir = "docs/review/shots-v2";
if (capture) await mkdir(shotDir, { recursive: true });
async function ready() {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images]
        .filter((image) => image.checkVisibility())
        .map(async (image) => {
          image.loading = "eager";
          await image.decode().catch(() => {});
        }),
    );
    scrollTo(0, 0);
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
  });
}
async function checkImagePixels(label, targetPage = page) {
  const bad = await targetPage.evaluate(async () => {
    const images = [
      ...document.querySelectorAll("img[data-source-width]"),
    ].filter((image) => image.checkVisibility());
    return (
      await Promise.all(
        images.map(async (image) => {
          const bitmap = await createImageBitmap(
            await (await fetch(image.currentSrc)).blob(),
          );
          const r = image.getBoundingClientRect();
          const available = Math.min(
            devicePixelRatio,
            +image.dataset.sourceWidth / r.width,
            +image.dataset.sourceHeight / r.height,
          );
          const supplied = Math.min(
            bitmap.width / r.width,
            bitmap.height / r.height,
          );
          const issue =
            supplied + 0.02 < available
              ? { image: image.currentSrc, supplied, available }
              : null;
          bitmap.close();
          return issue;
        }),
      )
    ).filter(Boolean);
  });
  if (bad.length) failures.push({ imageResolution: label, bad });
}
try {
  for (const width of [390, 640, 1024, 1440, 1080]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    for (const route of routes) {
      await page.goto(origin + route);
      await ready();
      const result = await page.evaluate(() => {
        const visible = (element) =>
          element.checkVisibility() &&
          element.getBoundingClientRect().height > 0;
        const rect = (element) => element.getBoundingClientRect();
        const text = (element) =>
          `${element.tagName}.${element.className}: ${element.textContent.trim().slice(0, 65)}`;
        const gutter = rect(document.querySelector(".wrap")).left;
        const floor = Math.min(280, innerWidth - 2 * gutter);
        const narrow = [];
        for (const element of document.querySelectorAll(
          "main p, main h1, main h2, main h3, main h4, main li, main label, main .list > a",
        )) {
          if (!visible(element)) continue;
          // Inline breadcrumb items are intentional; they are not reading columns.
          if (element.closest(".breadcrumb")) continue;
          let minimum = floor;
          // Explicit bounded layouts: cards, padded forms, two-column capabilities and nested prose lists.
          // Check these against their real column's expected width, rather than treating a short label as a collapsed grid.
          const card = element.closest(".card-content");
          if (card)
            minimum = Math.min(minimum, rect(card.parentElement).width - 48);
          const form = element.closest(".enquiry-form");
          if (form) {
            const style = getComputedStyle(form);
            const inner =
              rect(form).width -
              parseFloat(style.paddingLeft) -
              parseFloat(style.paddingRight);
            minimum = Math.min(minimum, inner);
            if (element.closest(".form-row") && innerWidth >= 640)
              minimum = Math.min(minimum, (inner - 16) / 2);
          }
          if (element.closest(".capabilities") && innerWidth >= 640)
            minimum = Math.min(
              minimum,
              (rect(element.closest(".capabilities")).width - 24) / 2,
            );
          if (element.matches("li") && element.closest(".prose")) {
            let depth = 0,
              ancestor = element.parentElement;
            while (ancestor && !ancestor.classList.contains("prose")) {
              if (ancestor.matches("ul, ol")) depth++;
              ancestor = ancestor.parentElement;
            }
            minimum -= depth * 20;
          }
          if (rect(element).width + 1 < minimum)
            narrow.push({
              element: text(element),
              width: rect(element).width,
              minimum,
            });
        }
        const overlap = [];
        // Compare direct block siblings, including structural columns. Ignore inline text and hidden details.
        for (const parent of document.querySelectorAll("main, main *")) {
          const children = [...parent.children].filter(
            (element) =>
              visible(element) &&
              !["inline", "contents", "inline-block", "inline-flex"].includes(
                getComputedStyle(element).display,
              ) &&
              getComputedStyle(element).position !== "absolute",
          );
          for (let i = 0; i < children.length; i++)
            for (let j = i + 1; j < children.length; j++) {
              const a = rect(children[i]),
                b = rect(children[j]);
              if (
                Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 &&
                Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1
              )
                overlap.push([text(children[i]), text(children[j])]);
            }
        }
        const columns = [];
        if (innerWidth < 1080)
          for (const element of document.querySelectorAll(
            "main .grid > :not(aside):not(.eyebrow)",
          )) {
            if (!visible(element)) continue;
            const parent = rect(element.parentElement),
              child = rect(element);
            if (Math.abs(parent.width - child.width) > 1)
              columns.push({
                element: text(element),
                width: child.width,
                expected: parent.width,
              });
          }
        const contact = document.querySelector(".contact-form-col");
        const contactOrder =
          innerWidth >= 1080 ||
          !contact ||
          rect(contact).top <
            rect(document.querySelector(".contact-details")).top;
        const images = [...document.querySelectorAll("img[data-source-width]")]
          .filter(visible)
          .flatMap((image) => {
            const r = rect(image),
              sw = +image.dataset.sourceWidth,
              sh = +image.dataset.sourceHeight;
            const scale = Math.max(r.width / sw, r.height / sh);
            return scale > 1.001
              ? [{ image: image.alt || image.src, scale }]
              : [];
          });
        return {
          overflow: document.documentElement.scrollWidth !== innerWidth,
          narrow,
          overlap,
          columns,
          contactOrder,
          images,
        };
      });
      metrics.push({ route, width, ...result });
      if (
        result.overflow ||
        result.narrow.length ||
        result.overlap.length ||
        result.columns.length ||
        !result.contactOrder ||
        result.images.length
      )
        failures.push({ route, width, ...result });
      if ([390, 1440].includes(width)) {
        const axe = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        for (const violation of axe.violations)
          failures.push({
            route,
            width,
            axe: violation.id,
            nodes: violation.nodes.map((node) => ({
              target: node.target,
              summary: node.failureSummary,
            })),
          });
      }
      await checkImagePixels(`${route} at ${width}px`);
      const name = shots[route];
      if (
        capture &&
        name &&
        (width === 1440 ||
          width === 390 ||
          ([640, 1024, 1080].includes(width) &&
            ["sk-home", "sk-contact", "sk-aviation-testing"].includes(name)))
      ) {
        await page.screenshot({
          path: `${shotDir}/${name}-${width === 1440 ? "desktop" : width === 390 ? "mobile" : width}.jpg`,
          fullPage: true,
          type: "jpeg",
          quality: 85,
        });
      }
    }
  }
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await page.goto(origin + "letectvo/");
    await page.locator(".gallery summary").click();
    await ready();
    assert.equal(
      await page.locator(".gallery details").getAttribute("open"),
      "",
    );
    await checkImagePixels(`Expanded gallery at ${width}px`);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth === innerWidth,
      ),
      true,
    );
  }
  behaviors.push(
    "Expanded gallery: no overflow or image enlargement at 390/1440",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(origin);
  await ready();
  await page.locator(".menu-toggle").click();
  assert.equal(
    await page.locator(".menu-toggle").getAttribute("aria-expanded"),
    "true",
  );
  assert.equal(await page.locator(".menu-close").isVisible(), true);
  assert.equal(await page.locator(".dropdown a").last().isVisible(), true);
  assert.equal(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).overflow,
    ),
    "hidden",
  );
  if (capture)
    await page.screenshot({
      path: `${shotDir}/sk-menu-open-390.jpg`,
      type: "jpeg",
      quality: 85,
    });
  await page.keyboard.press("Escape");
  assert.equal(
    await page.locator(".menu-toggle").getAttribute("aria-expanded"),
    "false",
  );
  assert.equal(
    await page
      .locator(".menu-toggle")
      .evaluate((e) => e === document.activeElement),
    true,
  );
  behaviors.push(
    "Mobile menu: services visible, close icon, scroll lock, Escape and focus return",
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(origin);
  await ready();
  assert.equal(await page.locator(".services-menu").getAttribute("open"), null);
  await page.locator(".services-menu summary").click();
  if (capture)
    await page.screenshot({
      path: `${shotDir}/sk-dropdown-open-1440.jpg`,
      type: "jpeg",
      quality: 85,
    });
  await page.keyboard.press("Escape");
  assert.equal(await page.locator(".services-menu").getAttribute("open"), null);
  behaviors.push("Desktop dropdown: closed on arrival, opens, Escape closes");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(origin + "kontaktujte-nas/");
  await page.locator(".enquiry-form button").click();
  assert.equal(await page.locator("#name-error").isVisible(), true);
  await page.locator("#name").fill("Test");
  await page.locator("#email").fill("invalid");
  await page.locator("#message").fill("Test");
  await page.locator(".enquiry-form button").click();
  assert.equal(await page.locator("#email-error").isVisible(), true);
  behaviors.push("Contact form: required-field and email errors");
  const retina = await browser.newContext({
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const retinaPage = await retina.newPage();
  for (const width of [390, 1440]) {
    await retinaPage.setViewportSize({ width, height: 1000 });
    for (const route of ["", "zh/", "letectvo/"]) {
      await retinaPage.goto(origin + route);
      await retinaPage.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          [...document.images]
            .filter((i) => i.checkVisibility())
            .map(async (i) => {
              i.loading = "eager";
              await i.decode().catch(() => {});
            }),
        );
      });
      await checkImagePixels(`2× display: ${route} at ${width}px`, retinaPage);
    }
  }
  await retina.close();
  behaviors.push(
    "Responsive photos at 2× density: home SK/ZH and Aviation at 390/1440, capped at source pixels",
  );
  const bare = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const nojs = await bare.newPage();
  await nojs.goto(origin);
  assert.equal(await nojs.locator(".dropdown a").last().isVisible(), true);
  await nojs.setViewportSize({ width: 1440, height: 1000 });
  assert.equal(await nojs.locator(".dropdown a").last().isVisible(), false);
  behaviors.push(
    "No JavaScript: mobile services visible, desktop dropdown closed",
  );
  await bare.close();
} catch (error) {
  failures.push({ behavior: error.message });
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
const report = {
  base,
  routes: routes.length,
  viewports: [390, 640, 1024, 1440, 1080],
  axeRuns: routes.length * 2,
  failures,
  behaviors,
  metrics,
};
await writeFile(
  capture ? "docs/review/qa-v2.json" : "dist/qa-layout.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(
  `Layout QA: ${routes.length} routes × 5 widths; ${report.axeRuns} axe runs; ${failures.length} failures.`,
);
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
}
