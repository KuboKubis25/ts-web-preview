import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, relative, join } from "node:path";
import { parse } from "parse5";
const root = resolve("dist");
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else files.push(path);
  }
}
await walk(root);
const htmlFiles = files.filter((p) => p.endsWith(".html"));
const docs = new Map();
function nodes(node, result = []) {
  if (node.tagName) result.push(node);
  for (const child of node.childNodes || []) nodes(child, result);
  return result;
}
for (const path of htmlFiles) {
  const html = await readFile(path, "utf8");
  const elements = nodes(parse(html));
  docs.set(path, {
    html,
    elements,
    ids: new Set(
      elements.flatMap((n) =>
        n.attrs.filter((a) => a.name === "id").map((a) => a.value),
      ),
    ),
  });
}
const attr = (node, key) => node.attrs?.find((a) => a.name === key)?.value;
const home = docs.get(join(root, "index.html"));
const canonical = home.elements.find(
  (n) => n.tagName === "link" && attr(n, "rel") === "canonical",
);
const siteURL = new URL(attr(canonical, "href"));
const base = siteURL.pathname.endsWith("/")
  ? siteURL.pathname
  : siteURL.pathname + "/";
const failures = [];
let checked = 0;
function fileFor(u) {
  if (!u.pathname.startsWith(base))
    throw new Error(`escapes base ${base}: ${u.pathname}`);
  let pathname = decodeURIComponent(u.pathname.slice(base.length));
  if (!pathname || pathname.endsWith("/")) pathname += "index.html";
  const path = resolve(root, pathname);
  if (!path.startsWith(root + "/")) throw new Error("path escapes dist");
  return path;
}
async function check(href, current, label, fragment = true) {
  if (!href || /^(mailto:|tel:|data:|javascript:)/i.test(href)) return;
  const u = new URL(href, current);
  if (u.origin !== siteURL.origin) return;
  checked++;
  try {
    let path = fileFor(u);
    let info;
    try {
      info = await stat(path);
    } catch {
      if (!path.endsWith(".html")) {
        path = join(path, "index.html");
        info = await stat(path);
      } else throw new Error("file missing");
    }
    if (info.isDirectory()) {
      path = join(path, "index.html");
      await stat(path);
    }
    if (
      fragment &&
      u.hash &&
      docs.has(path) &&
      !docs.get(path).ids.has(decodeURIComponent(u.hash.slice(1)))
    )
      throw new Error(`fragment not found ${u.hash}`);
  } catch (e) {
    failures.push(`${label}: ${href} (${e.message})`);
  }
}
for (const [path, doc] of docs) {
  const rel = relative(root, path).replaceAll("\\", "/");
  const pagePath = rel === "index.html" ? "" : rel.replace(/index\.html$/, "");
  const current = new URL(pagePath, siteURL);
  for (const node of doc.elements) {
    for (const name of ["href", "src", "action"]) {
      const value = attr(node, name);
      if (value) await check(value, current, rel);
    }
    const srcset = attr(node, "srcset");
    if (srcset)
      for (const item of srcset.split(","))
        await check(item.trim().split(/\s+/)[0], current, rel, false);
  }
  const isRedirect = doc.elements.some(
    (n) => n.tagName === "meta" && attr(n, "http-equiv") === "refresh",
  );
  if (!isRedirect) {
    if (doc.elements.filter((n) => n.tagName === "h1").length !== 1)
      failures.push(`${rel}: expected exactly one h1`);
    for (const img of doc.elements.filter((n) => n.tagName === "img"))
      if (
        attr(img, "alt") === undefined ||
        !attr(img, "width") ||
        !attr(img, "height")
      )
        failures.push(`${rel}: image lacks alt or dimensions`);
  }
}
const redirects = JSON.parse(await readFile("src/data/redirects.json", "utf8"));
const old = [
  ...(await readFile("_source/sitemap.xml", "utf8")).matchAll(
    /<loc>([^<]+)<\/loc>/g,
  ),
].map((m) => new URL(m[1]).pathname.slice(1));
for (const slug of old) {
  const doc = docs.get(join(root, slug, "index.html"));
  if (!(slug in redirects) || !doc) failures.push(`Missing old URL: ${slug}`);
  else {
    const refresh = doc.elements.find(
      (n) => n.tagName === "meta" && attr(n, "http-equiv") === "refresh",
    );
    if (!refresh) failures.push(`Missing redirect: ${slug}`);
    await check(base + redirects[slug], siteURL, `redirect ${slug}`);
  }
}
const xml = await readFile(join(root, "sitemap.xml"), "utf8");
for (const match of xml.matchAll(/(?:<loc>|href=")([^<"]+)/g))
  await check(match[1].replaceAll("&amp;", "&"), siteURL, "sitemap");
const robots = await readFile(join(root, "robots.txt"), "utf8");
const indexable =
  attr(
    home.elements.find(
      (n) => n.tagName === "meta" && attr(n, "name") === "robots",
    ),
    "content",
  ) !== "noindex";
if (indexable === robots.includes("Disallow: /"))
  failures.push("robots.txt and robots meta disagree");
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `PASS: ${htmlFiles.length} HTML pages, ${checked} internal URLs/assets/fragments, ${old.length} legacy redirects; base ${base}; indexing ${indexable ? "enabled" : "disabled"}.`,
  );
