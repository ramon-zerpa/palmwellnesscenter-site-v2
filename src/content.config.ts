import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    /** Optional browser/search title when it should differ from the visible H1. */
    seoTitle: z.string().optional().default(""),
    description: z.string().optional().default(""),
    /** Optional Open Graph/Twitter summary when it differs from the meta description. */
    socialDescription: z.string().optional().default(""),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    lang: z.enum(["en", "es"]),
    /** Legacy: full URL path. Routing now derives the URL from filename + lang,
        so this is optional and kept only for reference on imported posts. */
    path: z.string().optional().default(""),
    heroImage: z.string().optional().default(""),
    /** Equivalent post path in the other language (language switcher + hreflang). */
    altPath: z.string().optional().default(""),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
