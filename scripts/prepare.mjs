import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { loadEnv } from "vite";
const env = { ...loadEnv("production", process.cwd(), ""), ...process.env };
const base = "/" + (env.BASE_PATH || "").split("/").filter(Boolean).join("/");
const prefix = base === "/" ? "" : base;
await mkdir("public/s", { recursive: true });
await cp("_source/files", "public/s", { recursive: true });
await cp("_source/img/favicon.ico", "public/favicon.ico");
await cp("_source/img/LZZI_AD.JPG", "public/s/LZZI-Map.jpg");
// Preserve the old extensionless map URL as a real downloadable file too.
await cp("_source/img/LZZI_AD.JPG", "public/s/LZZI-Map");
await writeFile("public/.nojekyll", "");
const redirects = JSON.parse(await readFile("src/data/redirects.json", "utf8"));
const old = [
  ...(await readFile("_source/sitemap.xml", "utf8")).matchAll(
    /<loc>([^<]+)<\/loc>/g,
  ),
].map((m) => new URL(m[1]).pathname.slice(1));
for (const slug of old)
  if (!(slug in redirects)) throw new Error(`Missing redirect: ${slug}`);
const lines = Object.entries(redirects).flatMap(([from, to]) => [
  `${prefix}/${from} ${prefix}/${to} 301`,
  `${prefix}/${from}/ ${prefix}/${to} 301`,
]);
await writeFile("public/_redirects", lines.join("\n") + "\n");
console.log(
  `Prepared downloads and ${old.length} legacy redirects for ${prefix || "/"}.`,
);
