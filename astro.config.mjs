import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import { unified } from "@astrojs/markdown-remark";
import rehypeTypography from "./scripts/rehype-typography.mjs";
import packages from "./scripts/remark-packages.mjs";
import aviationDetails from "./scripts/remark-aviation-details.mjs";
import { ui } from "./src/data/ui.ts";
import baseAwareLinks from "./scripts/remark-links.mjs";
import redirects from "./src/data/redirects.json" with { type: "json" };
const env = {
  ...loadEnv(process.env.NODE_ENV || "production", process.cwd(), ""),
  ...process.env,
};
const base = "/" + (env.BASE_PATH || "").split("/").filter(Boolean).join("/");
export default defineConfig({
  site: env.SITE || "https://www.testing-service.org",
  base: base === "/" ? "/" : `${base}/`,
  output: "static",
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeTypography],
      remarkPlugins: [
        [packages, { labels: { sk: ui.sk.packages, en: ui.en.packages, zh: ui.zh.packages } }],
        [
          aviationDetails,
          {
            labels: { sk: ui.sk.more, en: ui.en.more },
            paths: {
              sk: ["/letectvo/skusky-avioniky/", "/letectvo/technicka-udrzba/"],
              en: [
                "/en/aviation/instrument-testing/",
                "/en/aviation/technical-maintenance/",
              ],
            },
          },
        ],
        [baseAwareLinks, { base, redirects }],
      ],
    }),
  },
  trailingSlash: "always",
  build: { format: "directory" },
});
