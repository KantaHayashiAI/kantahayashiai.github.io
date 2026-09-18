# Writing

Put `.md` or `.mdx` files in `src/content/posts/`. The URL comes from `slug`, not the filename. Choose it once; changing it breaks existing links unless you add a redirect page.

```yaml
---
title: "A new research note"
slug: "a-new-research-note"
description: "One sentence describing the question and contribution."
pubDatetime: "2026-09-19T09:00:00+09:00"
lang: "en"
kind: "research"
tags: ["evaluation", "language-models"]
featured: true
draft: true
sample: false
---
```

`kind` is `research`, `engineering`, or `notes`. It controls list filters, not the standard of evidence. A culture note can simply be a note. `featured` is retained for AstroPaper compatibility; this minimal homepage lists posts chronologically. `pubDatetime` in the future is hidden until a **new build** occurs after that time: this static site has no scheduled rebuild by default.

Set `modDatetime` when making a substantive update. Do not invent an old publication date for a new page.

## Draft, sample, and preview

| State | Preview site | Live site | RSS / sitemap |
|---|---|---|---|
| `draft: true` | Hidden | Hidden | Hidden |
| Future `pubDatetime` | Hidden | Hidden | Hidden until a later build |
| `sample: true` | Shown with warning | Hidden | Always excluded |
| Ordinary article | Shown | Shown | Live only |

The global stage is `src/config/site.mjs`. Preview is deliberately `noindex, nofollow`. Search **within the site** includes visible test articles so it can be tested. External search-engine indexing is discouraged, not technically access-controlled.

## Two languages

English articles live under `/posts/…/`; Japanese under `/ja/posts/…/`. Use the same `translationKey` for both articles. They can share a slug because their URL prefixes differ. If there is no translation, no false translation link is shown.

A Japanese article needs `socialTitle`, an English version of its title used only in the social card. The browser page still uses its Japanese title. This keeps the social-image generator from needing a bundled Japanese font.

## Figures

Store author-owned SVG/PNG/WebP assets under `public/images/`. Use descriptive alt text and an honest caption.

```html
<figure>
  <img src="/images/example.svg" alt="Describe the main visual information."
       width="1080" height="540" loading="lazy" />
  <figcaption>What is measured, where the data came from, and any important limitation.</figcaption>
</figure>
```

Images not already wrapped in links receive a keyboard-accessible enlarge button. Captions are not a replacement for alt text. Keep source values somewhere readers can inspect.

## Math, code, and notes

- Inline math: `$p = 1 / n$`; display math: `$$ … $$`.
- Fenced code receives syntax highlighting; language tags improve it.
- Shiki `// [!code highlight]` and notation diffs are configured.
- Standard Markdown footnotes use `[^name]` and `[^name]: …`.
- `##` and `###` populate the table of contents.
- Use `<details><summary>…</summary>…</details>` for optional material.
- Use `.mdx` only when the article needs a component. See `07-mixture.mdx`.

`code`, `paper`, and `data` frontmatter fields may contain public URLs. They add small resource links below the title. Do not paste secrets or private document URLs.

## Before merging

Run `npm run verify` and inspect `npm run preview`. Check a narrow viewport, dark mode, long lines, links, search, and social cards. Source tests do not prove that an article's scientific claims are correct.
