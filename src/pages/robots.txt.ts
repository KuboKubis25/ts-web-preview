import type { APIRoute } from "astro";
import { absolute } from "../lib/urls";
export const GET: APIRoute = ({ site }) =>
  new Response(
    import.meta.env.PUBLIC_INDEXABLE === "true"
      ? `User-agent: *\nAllow: /\nSitemap: ${absolute("sitemap.xml", site)}\n`
      : "User-agent: *\nDisallow: /\n",
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
