// Adapted from AstroPaper (Sat Naing): collection schema and glob layout.
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import site from "./config/site.mjs";

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string().min(1).max(180),
    subtitle: z.string().optional(),
    description: z.string().min(1).max(300),
    author: z.string().default(site.title),
    pubDatetime: z.coerce.date(),
    modDatetime: z.coerce.date().optional(),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    lang: z.enum(["en", "ja"]).default("en"),
    kind: z.enum(["research", "engineering", "notes"]).default("notes"),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    sample: z.boolean().default(false),
    translationKey: z.string().optional(),
    socialTitle: z.string().optional(),
    ogImage: z.string().optional(),
    code: z.string().url().optional(),
    paper: z.string().url().optional(),
    data: z.string().url().optional(),
  }),
});
export const collections = { posts };
