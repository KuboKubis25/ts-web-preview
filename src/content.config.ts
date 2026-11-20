import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    key: z.string(),
    lang: z.enum(["sk", "en", "zh"]),
    path: z.string(),
    title: z.string(),
    description: z.string(),
    kind: z.enum([
      "home",
      "service",
      "aviation",
      "references",
      "contact",
      "legal",
    ]),
    image: z.string().optional(),
    facts: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .min(2)
      .max(4)
      .optional(),
    packageLead: z.string().optional(),
    closing: z.string().optional(),
    source: z.string(),
  }),
});
export const collections = { pages };
