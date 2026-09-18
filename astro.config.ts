import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { transformerNotationDiff, transformerNotationHighlight } from "@shikijs/transformers";
import site from "./src/config/site.mjs";

// AstroPaper's static content/Markdown setup, with a custom reading layout.
export default defineConfig({
  site: site.url,
  output: "static",
  trailingSlash: "always",
  integrations: [mdx()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { strict: false, throwOnError: false }]],
    }),
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
      wrap: false,
      transformers: [transformerNotationDiff(), transformerNotationHighlight()],
    },
  },
  server: { host: "127.0.0.1" },
});
