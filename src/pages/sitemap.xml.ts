import { getCollection } from "astro:content";
import { absolute } from "../lib/urls";
import type { APIRoute } from "astro";
export const GET: APIRoute = async ({ site }) => {
  const pages = await getCollection("pages");
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const href = (p: (typeof pages)[number]) =>
    esc(absolute(p.data.path ? p.data.path + "/" : "", site));
  const body = pages
    .map((page) => {
      const alternates = pages.filter((p) => p.data.key === page.data.key);
      const fallback =
        alternates.find((p) => p.data.lang === "sk") ||
        alternates.find((p) => p.data.lang === "en") ||
        page;
      return `<url><loc>${href(page)}</loc>${alternates.map((p) => `<xhtml:link rel="alternate" hreflang="${p.data.lang}" href="${href(p)}"/>`).join("")}<xhtml:link rel="alternate" hreflang="x-default" href="${href(fallback)}"/></url>`;
    })
    .join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
