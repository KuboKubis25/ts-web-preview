import { review5Contract, typographyLines } from "./qa-review5.mjs";
import { sourceHeadings, normalizeHeading } from "./qa-source-headings.mjs";
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
// Observe from document creation, before fonts or images can move content.
await context.addInitScript(() => {
  window.__layoutShift = {
    value: 0,
    session: 0,
    start: 0,
    last: 0,
    entries: [],
  };
  new PerformanceObserver((list) => {
    const cls = window.__layoutShift;
    for (const entry of list.getEntries()) {
      if (entry.hadRecentInput) continue;
      if (
        entry.startTime - cls.last > 1000 ||
        entry.startTime - cls.start > 5000
      ) {
        cls.session = 0;
        cls.start = entry.startTime;
      }
      cls.last = entry.startTime;
      cls.session += entry.value;
      cls.value = Math.max(cls.value, cls.session);
      cls.entries.push({ value: entry.value, time: entry.startTime });
    }
  }).observe({ type: "layout-shift", buffered: true });
});
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
  "sluzby/rizika-atex-pawa/": "sk-risk",
  "letectvo/technicka-udrzba/": "sk-maintenance",
};
const shotDir = "docs/review/shots-v5";
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
// Runs inside the page so assertions use rendered geometry, including font metrics.
function layoutContract() {
  const issues = [];
  const visible = (el) =>
    el.checkVisibility() && el.getBoundingClientRect().height > 0;
  const box = (el) => el.getBoundingClientRect();
  const label = (el) =>
    `${el.tagName}.${el.className}: ${el.textContent.trim().slice(0, 65)}`;
  const check = (ok, rule, detail) => {
    if (!ok) issues.push({ rule, detail });
  };
  if (innerWidth === 1440) {
    for (const h2 of document.querySelectorAll("section h2, .footer-top h2")) {
      // Article blocks, prose and the contact form use the named margin/content split.
      if (!visible(h2) || h2.closest(".article-layout, .contact-layout"))
        continue;
      const expected = h2.closest(".aviation-feature") ? 843.33 : 64;
      check(Math.abs(box(h2).x - expected) <= 1, "section-heading-edge", {
        heading: label(h2),
        x: box(h2).x,
        expected,
      });
    }
  }
  check(
    !document.querySelector('a[href*="TS-AObjednavkaFinal_2019"]'),
    "retired-order-form",
    location.pathname,
  );
  const heroPhoto = document.querySelector(".hero-visual");
  if (heroPhoto && innerWidth < 1080) {
    check(
      Math.abs(box(heroPhoto).width - innerWidth) <= 1 &&
        box(heroPhoto).height <= Math.min(innerHeight / 2, 400) + 1,
      "stacked-hero-photo",
      { width: box(heroPhoto).width, height: box(heroPhoto).height },
    );
  }
  for (const photo of document.querySelectorAll(
    ".page-hero > img, .aviation-feature-grid > img",
  )) {
    if (innerWidth < 1080)
      check(
        box(photo).height <= Math.min(innerHeight / 2, 400) + 1 &&
          getComputedStyle(photo).objectFit === "cover",
        "stacked-photo-cap",
        box(photo).height,
      );
  }
  const article = document.querySelector(".article-layout");
  check(
    !document.querySelector(".related"),
    "related-inside-article",
    location.pathname,
  );
  if (article) {
    const prose = article.querySelector(".prose");
    const rail = article.querySelector(".rail");
    const contents = [...article.querySelectorAll(".contents a")];
    const endings = [
      ...article.querySelectorAll(".downloads, .partners, .related-block"),
    ];
    const targets = [...prose.querySelectorAll("h2[id], h3[id]"), ...endings];
    const hasFacts = !!article.querySelector(".facts");
    check(!!rail === (targets.length >= 2 || hasFacts), "rail-presence", {
      targets: targets.length,
      hasFacts,
    });
    check(
      contents.map((a) => decodeURIComponent(a.hash.slice(1))).join("|") ===
        (targets.length >= 2 ? targets.map((t) => t.id).join("|") : ""),
      "rail-targets",
      targets.map((t) => t.id),
    );
    for (const entry of contents) {
      check(
        entry.title === entry.textContent &&
          getComputedStyle(entry).whiteSpace === "normal" &&
          getComputedStyle(entry).webkitLineClamp === "2",
        "rail-entry-label",
        entry.textContent,
      );
      if (
        document.getElementById(decodeURIComponent(entry.hash.slice(1)))
          .tagName === "H3"
      )
        check(
          parseFloat(getComputedStyle(entry).paddingLeft) === 24,
          "rail-h3-indent",
          entry.textContent,
        );
    }
    for (const ending of endings)
      check(
        parseFloat(getComputedStyle(ending).marginTop) === 64 &&
          ending.querySelector("h2.type-h3"),
        "ending-block-rhythm",
        ending.id,
      );
    if (innerWidth >= 1080) {
      const container = box(article),
        step = (container.width + 24) / 12;
      check(
        Math.abs(box(prose).left - container.left - 4 * step) < 1 &&
          (innerWidth !== 1440 ||
            box(prose).right <= container.left + 10 * step - 24 + 1),
        "prose-column-edges",
        { left: box(prose).left, right: box(prose).right },
      );
      if (rail) {
        check(
          visible(rail) &&
            Math.abs(box(rail).left - container.left) < 1 &&
            Math.abs(box(rail).width - (3 * step - 24)) < 1,
          "rail-column-edges",
          { left: box(rail).left, width: box(rail).width },
        );
        check(
          getComputedStyle(rail).position === "sticky" &&
            getComputedStyle(rail.parentElement).alignSelf !== "start",
          "rail-sticky-container",
          getComputedStyle(rail.parentElement).alignSelf,
        );
        const current = rail.querySelector('[aria-current="location"]');
        if (current)
          check(
            getComputedStyle(current).color ===
              getComputedStyle(document.body).color &&
              getComputedStyle(current).boxShadow !== "none",
            "rail-active-rule",
            current.textContent,
          );
      }
      if (innerWidth === 1440) {
        // Round 5 unifies both sides of the hero hairline.
        const expected = parseFloat(getComputedStyle(article).paddingTop);
        const preceding = article.previousElementSibling;
        const hairline = box(preceding).bottom - 1;
        check(
          Math.abs(expected - 64) <= 0.1 &&
            Math.abs(
              box(prose.firstElementChild).top - hairline - expected - 1,
            ) < 1,
          "hairline-first-line",
          { gap: box(prose.firstElementChild).top - hairline, expected },
        );
        if (rail) {
          const offset = parseFloat(getComputedStyle(rail).paddingTop);
          check(
            Math.abs(
              box(rail.querySelector(".eyebrow")).top -
                box(prose.firstElementChild).top -
                offset,
            ) < 1 && offset === 6,
            "rail-first-line-alignment",
            offset,
          );
        }
      }
    } else {
      check(!rail || !visible(rail), "mobile-rail-hidden", location.pathname);
      const facts = article.querySelector(".mobile-facts");
      if (facts) {
        const cells = [...facts.querySelectorAll(".facts > div")];
        check(
          visible(facts) &&
            Math.abs(box(prose).top - box(facts).bottom - 32) < 1,
          "mobile-facts-gap",
          box(prose).top - box(facts).bottom,
        );
        check(
          getComputedStyle(facts.querySelector("dl")).gridTemplateColumns.split(
            " ",
          ).length === (innerWidth >= 640 ? 2 : 1),
          "mobile-facts-columns",
          innerWidth,
        );
        if (innerWidth >= 640)
          check(
            Math.abs(box(cells[0]).top - box(cells[1]).top) < 1,
            "mobile-facts-row",
            innerWidth,
          );
      }
    }
  }
  if (innerWidth >= 1080) {
    const action = document.querySelector(".footer-action");
    if (action) {
      const container = box(action.parentElement),
        expected = container.left + (7 * (container.width + 24)) / 12;
      for (const element of [action, ...action.children])
        check(
          Math.abs(box(element).left - expected) < 1,
          "footer-closing-edge",
          { left: box(element).left, expected },
        );
      const heading = document.querySelector(".footer-top h2"),
        email = action.querySelector(".footer-email");
      const offset =
        (parseFloat(getComputedStyle(heading).lineHeight) -
          parseFloat(getComputedStyle(email).lineHeight)) /
        2;
      check(
        Math.abs(box(email).top - box(heading).top - offset) < 1,
        "footer-closing-baseline",
        offset,
      );
    }
  }
  for (const list of document.querySelectorAll(
    ".prose li > ul, .prose li > ol",
  ))
    check(
      getComputedStyle(list).marginTop === "4px" &&
        getComputedStyle(list).marginBottom === "0px",
      "nested-list-rhythm",
      label(list),
    );
  const capabilities = [...document.querySelectorAll(".capabilities > li")];
  if (capabilities.length)
    check(
      capabilities.every(
        (el) =>
          getComputedStyle(el).alignItems === "start" &&
          getComputedStyle(el).paddingTop === "16px",
      ),
      "capability-baselines",
      location.pathname,
    );
  if (
    document.documentElement.lang === "zh" &&
    document.querySelector(".packages")
  ) {
    check(
      !document.querySelector(".packages details").open || document.querySelector(".packages details").dataset.qaExpanded,
      "zh-packages-closed",
      location.pathname,
    );
    for (const p of document.querySelectorAll(".intro-section p"))
      check(
        getComputedStyle(p).wordBreak === "keep-all" &&
          !!p.querySelector("wbr"),
        "zh-phrase-breaks",
        p.textContent,
      );
  }
  check(
    !document.querySelector(".aerial-group[role], .aerial-group[aria-label]"),
    "aerial-decoration",
    location.pathname,
  );
  const probe = document.createElement("span");
  probe.style.color = document.querySelector(
    'meta[name="theme-color"]',
  ).content;
  document.body.append(probe);
  check(
    getComputedStyle(probe).color === getComputedStyle(document.body).color,
    "theme-color-token",
    getComputedStyle(probe).color,
  );
  probe.remove();
  if (document.body.classList.contains("aviation"))
    check(
      document.querySelectorAll(".breadcrumb li").length === 2,
      "aviation-breadcrumb",
      location.pathname,
    );
  const question = document.querySelector(".footer-top h2");
  if (question)
    check(
      question.textContent.trim() ===
        { sk: "Máte otázku?", en: "Have a question?", zh: "有疑问？" }[
          document.documentElement.lang
        ],
      "localized-footer-question",
      question.textContent,
    );
  const rules = [];
  for (const el of document.querySelectorAll(
    "main *, .footer-top, .footer-bottom",
  )) {
    if (
      !visible(el) ||
      el.matches("a, button, input, textarea, .lang-tag") ||
      el.closest(".section-nav, .contents, .facts")
    )
      continue;
    const style = getComputedStyle(el),
      r = box(el);
    for (const edge of ["Top", "Bottom"]) {
      if (
        parseFloat(style[`border${edge}Width`]) === 1 &&
        style[`border${edge}Style`] !== "none" &&
        style[`border${edge}Color`] !== "rgba(0, 0, 0, 0)"
      )
        rules.push({
          x: r.left,
          right: r.right,
          y: edge === "Top" ? r.top : r.bottom - 1,
          label: label(el),
        });
    }
  }
  for (let i = 0; i < rules.length; i++)
    for (let j = i + 1; j < rules.length; j++) {
      const a = rules[i],
        b = rules[j],
        distance = Math.abs(a.y - b.y);
      // Co-located borders paint one separator; different grid columns do not share a rule.
      if (Math.abs(a.x - b.x) <= 1 && Math.min(a.right, b.right) - a.x > 80)
        check(distance <= 1 || distance > 48.5, "adjacent-hairlines", {
          a,
          b,
          distance,
        });
    }
  if (innerWidth >= 640)
    for (const list of document.querySelectorAll(".list")) {
      const rows = [...list.querySelectorAll(":scope > li")].filter(visible);
      const heights = rows.map((row) => box(row).height);
      if (list.matches(".capabilities")) {
        const groups = Map.groupBy(rows, row => Math.round(box(row).top));
        for (const group of groups.values()) check(Math.max(...group.map(row=>box(row).height))-Math.min(...group.map(row=>box(row).height))<=1, "equal-list-rows", group.map(row=>box(row).height));
      } else if (heights.length > 1)
        check(
          Math.max(...heights) - Math.min(...heights) <= 1,
          "equal-list-rows",
          { list: label(list), heights },
        );
    }
  for (const hero of document.querySelectorAll(".page-hero")) {
    const copy = hero.querySelector(":scope > div");
    const children = [
      copy?.lastElementChild,
      hero.querySelector(":scope > img"),
    ]
      .filter(Boolean)
      .filter(visible);
    const bottom = Math.max(...children.map((el) => box(el).bottom));
    const gap = box(hero).bottom - 1 - bottom;
    check(Math.abs(gap - Math.min(64, Math.max(40, 16 + innerWidth * .034))) <= 1, "hero-bottom", { gap });
  }
  for (const el of document.querySelectorAll(
    ".list-title, .disclosure > summary",
  )) {
    if (!visible(el)) continue;
    const style = getComputedStyle(el);
    check(
      Math.abs(parseFloat(style.fontSize) - 17) < 0.1 &&
        style.fontWeight === "500" &&
        Math.abs(parseFloat(style.lineHeight) - 23.8) < 0.1,
      "list-type",
      {
        element: label(el),
        size: style.fontSize,
        weight: style.fontWeight,
        leading: style.lineHeight,
      },
    );
  }
  const contact = document.querySelector(".contact-details");
  if (contact && innerWidth >= 1080)
    check(
      Math.abs(
        box(contact.querySelector("h2")).y -
          box(document.querySelector(".enquiry-form h2")).y,
      ) < 1,
      "contact-baseline",
      location.pathname,
    );
  const footer = document.querySelector(".site-footer");
  if (!footer.querySelector(".footer-top"))
    check(
      Math.abs(box(footer.querySelector("h3")).y - box(footer).y - 64) < 1,
      "contact-footer-gap",
      location.pathname,
    );
  const cta = document
    .querySelector(".header-cta > span")
    ?.childNodes[0]?.textContent.trim();
  if (cta) {
    const matches = [...document.querySelectorAll("body *")].filter(
      (el) =>
        !el.closest("header") &&
        el.textContent.trim() === cta &&
        ![...el.children].some((child) => child.textContent.trim() === cta),
    );
    check(matches.length <= 1, "repeated-cta", matches.map(label));
    check(
      document.querySelector(".footer-top h2")?.textContent.trim() !== cta,
      "footer-question",
      cta,
    );
  }
  const hrefs = [...document.querySelectorAll("footer a")].map((a) =>
    a.getAttribute("href"),
  );
  check(
    new Set(hrefs).size === hrefs.length,
    "duplicate-footer-links",
    hrefs.filter((href, i) => hrefs.indexOf(href) !== i),
  );
  for (const col of document.querySelectorAll(".footer-grid > div"))
    check(
      col.querySelectorAll("a").length <= 6,
      "footer-column-budget",
      label(col),
    );
  // Measure individual glyphs in text-node Ranges, including nested eyebrow spans.
  // A dot is invalid only when it is the first non-space glyph on its visual line.
  for (const eyebrow of document.querySelectorAll(".eyebrow")) {
    if (!visible(eyebrow)) continue;
    const walker = document.createTreeWalker(eyebrow, NodeFilter.SHOW_TEXT);
    const lines = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      for (let i = 0; i < node.length; i++) {
        const char = node.textContent[i];
        if (/\s/.test(char)) continue;
        const range = document.createRange();
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        const r = range.getClientRects()[0];
        if (!r || !r.width) continue;
        let line = lines.find((line) => Math.abs(line.top - r.top) < 2);
        if (!line) {
          line = { top: r.top, glyphs: [] };
          lines.push(line);
        }
        line.glyphs.push({ char, x: r.x });
      }
    }
    for (const line of lines)
      check(
        line.glyphs.sort((a, b) => a.x - b.x)[0]?.char !== "·",
        "leading-separator",
        label(eyebrow),
      );
  }
  const root = getComputedStyle(document.documentElement);
  const tokenLeading = [
    "display",
    "h1",
    "h2",
    "statement",
    "prose-h2",
    "h3",
    "h4",
    "lead",
    "body",
    "list",
    "small",
    "ui",
    "label",
    "wordmark",
    "wordmark-stacked",
    "cjk",
  ].map((name) => parseFloat(root.getPropertyValue(`--leading-${name}`)));
  for (const el of document.querySelectorAll("body *")) {
    if (
      !visible(el) ||
      ["SCRIPT", "STYLE"].includes(el.tagName) ||
      ![...el.childNodes].some(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim(),
      )
    )
      continue;
    const style = getComputedStyle(el),
      ratio = parseFloat(style.lineHeight) / parseFloat(style.fontSize);
    check(
      tokenLeading.some((allowed) => Math.abs(allowed - ratio) < 0.005),
      "token-line-height",
      { element: label(el), ratio },
    );
  }
  if (innerWidth < 1080)
    for (const el of document.querySelectorAll(
      "a, button, summary, input, textarea",
    )) {
      // Inline links within running prose (including form help) retain their text line box.
      if (
        !visible(el) ||
        el.closest(".prose, p") ||
        el.matches(".skip-link") ||
        getComputedStyle(el).position === "absolute"
      )
        continue;
      check(box(el).height >= 43.5, "touch-height", {
        element: label(el),
        height: box(el).height,
      });
    }
  if (
    document.body.classList.contains("aviation") &&
    /\/(?:letectvo|aviation)\/$/.test(location.pathname)
  )
    check(
      document.querySelectorAll('.prose li > a[href*="eur-lex.europa.eu"]').length === 2 && !document.querySelector(".prose li > ul"),
      "linked-regulations-without-repeat",
      location.pathname,
    );
  const cards = [...document.querySelectorAll(".service-card")];
  if (cards.length) {
    check(
      cards.every((card) => !card.querySelector("img")),
      "photo-free-cards",
      cards.length,
    );
    if (innerWidth === 640)
      check(
        Math.abs(box(cards[0]).y - box(cards[1]).y) < 1,
        "two-card-columns",
        cards.map((card) => box(card).y),
      );
    // DESIGN requires complete first sentences and unchanged source headings on ZH;
    // those take precedence over the review's 900px card-stack target.
    if (innerWidth === 390 && document.documentElement.lang !== "zh")
      check(
        cards.reduce((sum, card) => sum + box(card).height, 0) <= 900,
        "mobile-card-height",
        cards.map((card) => box(card).height),
      );
  }
  return issues;
}

try {
  for (const width of [390, 640, 1024, 1440, 1080]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    // Routing disables cache. A delayed font makes the fallback paint on every mobile route.
    if (width === 390)
      await page.route("**/*.woff2", async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 350));
        await route.continue();
      });
    else await page.unroute("**/*.woff2");
    for (const route of routes) {
      await page.goto(origin + route, {
        waitUntil: width === 390 ? "domcontentloaded" : "load",
      });
      const fallbackEyebrowHeight =
        width === 390
          ? await page
              .locator(".hero-copy .eyebrow")
              .evaluateAll(
                (elements) => elements[0]?.getBoundingClientRect().height,
              )
          : undefined;
      await ready();
      if (fallbackEyebrowHeight !== undefined) {
        const finalHeight = await page
          .locator(".hero-copy .eyebrow")
          .evaluate((el) => el.getBoundingClientRect().height);
        if (Math.abs(finalHeight - fallbackEyebrowHeight) > 1)
          failures.push({
            route,
            width,
            fontWrap: { fallbackEyebrowHeight, finalHeight },
          });
      }
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
          "main p, main h1, main h2, main h3, main h4, main li, main label, main .list > li > a",
        )) {
          if (!visible(element)) continue;
          // Inline breadcrumb items are intentional; they are not reading columns.
          if (element.closest(".breadcrumb")) continue;
          let minimum = floor;
          // Explicit bounded layouts: cards, padded forms, two-column capabilities and nested prose lists.
          // Check these against their real column's expected width, rather than treating a short label as a collapsed grid.
          const card = element.closest(".card-content");
          if (card) minimum = Math.min(minimum, rect(card).width);
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
            // Reading text keeps its DESIGN measure even when its grid has collapsed.
            const maxWidth = parseFloat(getComputedStyle(element).maxWidth);
            const expected =
              element.matches(".intro-section > p") && Number.isFinite(maxWidth)
                ? Math.min(parent.width, maxWidth)
                : parent.width;
            if (Math.abs(expected - child.width) > 1)
              columns.push({
                element: text(element),
                width: child.width,
                expected,
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
      const cls = await page.evaluate(() => window.__layoutShift.value);
      if (width === 390 && cls >= 0.05) failures.push({ route, width, cls });
      const sourceFacts = await page
        .locator(".article-layout")
        .evaluateAll((articles) =>
          articles.map((article) => ({
            source: article.dataset.source,
            values: [...article.querySelectorAll(".rail .facts dd")].map(
              (el) => el.textContent,
            ),
            mobile: [
              ...article.querySelectorAll(".mobile-facts .facts dd"),
            ].map((el) => el.textContent),
          })),
        );
      for (const facts of sourceFacts) {
        const original = await readFile(facts.source, "utf8");
        if (
          facts.values.some((value) => {
            // DESIGN requires the nominative base form of this source noun.
            const normalize = token => token === 'vyhlášky' ? 'vyhláška' : token;
            const tokens = new Set((original.toLowerCase().match(/[\p{L}\p{N}]+/gu) || []).map(normalize));
            return (value.toLowerCase().match(/[\p{L}\p{N}]+/gu) || []).some(token => !tokens.has(token));
          }) ||
          facts.values.join("|") !== facts.mobile.join("|")
        )
          failures.push({
            route,
            facts:
              "Source-word facts and identical mobile rendering required",
          });
      }
      const articleSource = await page.locator('.article-layout').evaluateAll(elements => elements[0]?.dataset.source);
      if (articleSource && width === 1440) {
        const expected = await sourceHeadings(articleSource);
        const rendered = await page.locator('.prose h2, .prose h3, .prose h4').evaluateAll(elements=>elements.map(el=>({text:el.textContent, tag:el.tagName})));
        for (const heading of expected) if (!rendered.some(el=>normalizeHeading(el.text)===normalizeHeading(heading.text) && (heading.label ? el.tag==='H4' : ['H2','H3'].includes(el.tag)))) failures.push({route, sourceHeading:heading});
        const outline = await page.locator('.prose h2, .prose h3, .prose h4').evaluateAll(elements=>elements.map(el=>+el.tagName.slice(1)));
        if(outline.some((depth,i)=>depth>(i?outline[i-1]+1:2))) failures.push({route,headingLevelSkip:outline});
      }
      const contract = [...await page.evaluate(layoutContract), ...await page.evaluate(review5Contract)];
      if ([390,1440].includes(width)) {
        const lines = await page.evaluate(typographyLines);
        if(lines.length) failures.push({route,width,typographyLines:lines});
      }
      if (contract.length) failures.push({ route, width, contract });
      metrics.push({ route, width, cls, ...result, contract });
      if (
        result.overflow ||
        result.narrow.length ||
        result.overlap.length ||
        result.columns.length ||
        !result.contactOrder ||
        result.images.length
      )
        failures.push({ route, width, ...result });
      const name = shots[route];
      if (
        capture &&
        name &&
        (width === 1440 ||
          width === 390 ||
          ([640, 1024, 1080].includes(width) &&
            ["sk-home", "sk-contact", "sk-aviation-testing"].includes(name)) ||
          (width === 640 && ["sk-service", "en-home"].includes(name)) ||
          (width === 1024 && name === "zh-home"))
      ) {
        // Capture the arrival state before accessibility probes can focus or scroll controls.
        await page.evaluate(() => {
          document.activeElement?.blur();
          scrollTo(0, 0);
        });
        await page.screenshot({
          path: `${shotDir}/${name}-${width === 1440 ? "desktop" : width === 390 ? "mobile" : width}.jpg`,
          fullPage: true,
          type: "jpeg",
          quality: 85,
        });
      }
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
    }
    console.log(`Checked ${routes.length} routes at ${width}px.`);
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
    const galleryContract = await page.evaluate(layoutContract);
    if (galleryContract.length)
      failures.push({ expandedGallery: width, contract: galleryContract });
    assert.equal(
      await page
        .locator(".gallery-grid img")
        .evaluateAll((images) =>
// DESIGN permits density capped at source pixels (the panorama crops to 612px).
          // Every cell must still cover its complete displayed width at 1×.
          images.every(
            (image) =>
              Math.min(
                +image.dataset.sourceWidth,
                +image.dataset.sourceHeight * 1.5,
              ) >= image.getBoundingClientRect().width,
          ),
        ),
      true,
    );
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
  assert.equal(await page.locator(".dropdown-intro").isVisible(), false);
  assert.equal(
    await page
      .locator(".dropdown a")
      .last()
      .evaluate((el) => getComputedStyle(el).borderBottomWidth),
    "1px",
  );
  const menuContract = [...await page.evaluate(layoutContract), ...await page.evaluate(review5Contract)];
  if (menuContract.length) failures.push({ menu: 390, contract: menuContract });
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
  assert.ok(
    await page.evaluate(
      () =>
        Math.abs(
          document.querySelector(".dropdown").getBoundingClientRect().top -
            document.querySelector(".site-header").getBoundingClientRect()
              .bottom,
        ) <= 1,
    ),
  );
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
  await page.goto(origin + "letectvo/skusky-avioniky/");
  await ready();
  const tabState = await page.locator(".section-nav").evaluate((el) => {
    const active = el.querySelector('[aria-current="page"]');
    return {
      x: active.getBoundingClientRect().left,
      fadeStart: el.classList.contains("fade-start"),
      fadeEnd: el.classList.contains("fade-end"),
      mask: getComputedStyle(el).maskImage,
      scroll: el.scrollLeft,
    };
  });
  assert.ok(tabState.x >= 52);
  assert.ok(
    tabState.fadeStart &&
      tabState.fadeEnd &&
      tabState.scroll > 0 &&
      tabState.mask !== "none",
  );
  if (capture) {
    for (const name of [
      "sk-aviation-mobile-tabs",
      "sk-aviation-testing-mobile-tabs",
    ])
      await page.screenshot({
        path: `${shotDir}/${name}.jpg`,
        type: "jpeg",
        quality: 85,
      });
  }
  await page.locator(".section-nav").evaluate((el) => {
    el.scrollLeft = el.scrollWidth;
  });
  await page.waitForFunction(
    () =>
      !document.querySelector(".section-nav").classList.contains("fade-end"),
  );
  assert.equal(
    await page
      .locator(".section-nav")
      .evaluate((el) => el.classList.contains("fade-start")),
    true,
  );
  await page.locator(".section-nav").evaluate((el) => {
    el.scrollLeft = 0;
  });
  await page.waitForFunction(
    () =>
      !document.querySelector(".section-nav").classList.contains("fade-start"),
  );
  assert.equal(
    await page
      .locator(".section-nav")
      .evaluate((el) => el.classList.contains("fade-end")),
    true,
  );
  behaviors.push(
    "Mobile aviation tabs: both fades in the middle, start-only at end, end-only at start",
  );
  await page.goto(origin + "kontaktujte-nas/");
  await page.locator(".enquiry-form button").click();
  assert.equal(await page.locator("#name-error").isVisible(), true);
  await page.locator("#name").fill("Test");
  await page.locator("#email").fill("invalid");
  await page.locator("#message").fill("Test");
  await page.locator(".enquiry-form button").click();
  assert.equal(await page.locator("#email-error").isVisible(), true);
  behaviors.push("Contact form: required-field and email errors");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(origin);
  await ready();
  await page.evaluate(() => {
    const heading = document.querySelector(".services-section h2");
    heading.style.transform = "translateX(20px)";
    const footerLink = document.querySelector(".footer-grid a");
    footerLink.after(footerLink.cloneNode(true));
    const list = document.querySelector(".capabilities");
    list.children[0].style.height = "200px";
    list.children[1].style.height = "60px";
    document.querySelector(".intro-section p").style.lineHeight = "1.77";
  });
  const detected = new Set(
    (await page.evaluate(layoutContract)).map((issue) => issue.rule),
  );
  for (const rule of [
    "section-heading-edge",
    "duplicate-footer-links",
    "equal-list-rows",
    "token-line-height",
  ])
    assert.ok(detected.has(rule), `QA must catch injected ${rule}`);
  behaviors.push(
    "QA regression probes: displaced heading, duplicate footer link, uneven rows and off-token leading rejected",
  );
  if(capture) {
    await page.goto(origin); await ready();
    await page.screenshot({path:`${shotDir}/sk-home-viewport-1440.jpg`,type:'jpeg',quality:85});
  }
  // Review-5 expanded package content and source typography in every language.
  for (const width of [390,1440]) {
    await page.setViewportSize({width,height:width===390?844:1000});
    for (const route of ['', 'en/', 'zh/']) {
      await page.goto(origin+route);await ready();
      await page.locator('.packages details').evaluate(el=>{el.dataset.qaExpanded='true';el.open=true;});
      await ready();
      const contract=[...await page.evaluate(layoutContract), ...await page.evaluate(review5Contract)];
      const lines=await page.evaluate(typographyLines);
      if(contract.length || lines.length) failures.push({route,width,expandedPackages:contract,typographyLines:lines});
      if(capture && width===390 && route==='zh/') await page.screenshot({path:`${shotDir}/zh-home-packages-open-390.jpg`,fullPage:true,type:'jpeg',quality:85});
    }
  }
  behaviors.push('Packages closed on arrival, expanded content checked in SK/EN/ZH at 390/1440');
  // Scroll-spy must also handle the exact bottom, even beyond all article targets.
  await page.setViewportSize({width:1440,height:1000});
  for(const route of ['sluzby/rizika-atex-pawa/','sluzby/povolenia-a-schvalenia/','letectvo/']) {
    await page.goto(origin+route);await ready();
    assert.equal(await page.locator('.contents a[aria-current]').count(),0);
    await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));
    await page.waitForFunction(()=>document.querySelector('.contents a:last-child')?.hasAttribute('aria-current'));
  }
  behaviors.push('Risk/permits/aviation rail idle at arrival and last entry current at bottom');
  // Exercise the rail through prose h3s and the moved ending, including sticky containment.
  await page.goto(origin + "sluzby/povolenia-a-schvalenia/");
  await ready();
  await page.locator(".contents a").first().click();
  await page.waitForFunction(
    () =>
      Math.abs(
        document.querySelector(".rail").getBoundingClientRect().top - 96,
      ) < 1,
  );
  for (const target of [".prose h3[id]", "#related"]) {
    const id = await page.locator(target).first().getAttribute("id");
    await page.locator(`.contents a[href="#${id}"]`).click();
    await page.waitForFunction(
      (id) =>
        document.querySelector('.contents [aria-current="location"]')?.hash ===
        "#" + encodeURIComponent(id),
      id,
    );
  }
  behaviors.push(
    "Rail stays at 96px and scroll-spy follows h3 and ending targets",
  );
  await page.evaluate(() => {
    scrollTo(0, 0);
    document.querySelector(".rail").style.transform = "translateX(20px)";
    document.querySelector(".article-layout").style.paddingTop = "90px";
    document.querySelector(".footer-action").style.transform =
      "translateX(20px)";
  });
  const newRules = new Set(
    (await page.evaluate(layoutContract)).map((issue) => issue.rule),
  );
  for (const rule of [
    "rail-column-edges",
    "hairline-first-line",
    "footer-closing-edge",
  ])
    assert.ok(newRules.has(rule), `QA must catch injected ${rule}`);
  await page.locator(".rail").evaluate((el) => el.remove());
  assert.ok(
    (await page.evaluate(layoutContract)).some(
      (issue) => issue.rule === "rail-presence",
    ),
  );
  behaviors.push(
    "QA regression probes reject missing/displaced rail, wrong article gap and displaced footer closing",
  );
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
  capture ? "docs/review/qa-v5.json" : "dist/qa-layout.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(
  `Layout QA: ${routes.length} routes × 5 widths; ${report.axeRuns} axe runs; ${failures.length} failures.`,
);
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
}
