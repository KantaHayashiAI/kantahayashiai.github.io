# AstroPaper provenance and customization

This starter adapts AstroPaper's static publishing structure, frontmatter conventions, metadata approach, and sorted-post pattern. It is a **substantial custom reading layer**, not an untouched checkout of the complete theme. The upstream license is preserved in `LICENSE`.

Upstream inspected: [satnaing/astro-paper](https://github.com/satnaing/astro-paper), package version **6.1.0**, declaring Astro **7.0.3**, accessed 2026-09-19.

Relevant upstream files:

| Path | Inspected Git blob |
|---|---|
| `package.json` | `6e659a5bb6b3891d3fb8b98255ba7324fb1ccc09` |
| `astro.config.ts` | `db76e9508532ecf9a8296e2aac800b525fadbce6` |
| `src/content.config.ts` | `77517be77a46276c5845108a3dab8317edeef0c5` |
| `src/layouts/Layout.astro` | `f136d5e3c1d7762a3ed31efd36952303d4f5c6d7` |
| `src/utils/getSortedPosts.ts` | `a716a39d4f77b53ecca11e46c4fec2a6c7dbbd61` |
| `LICENSE` | `fa7c7912cbfd0dc2da335a26e7098da334349198` |

These are blob hashes, not a claim to reproduce an entire upstream commit. A future update is a reviewed migration, not a blind merge of every upstream file.

## Deliberate changes

- English-first public pages plus explicit Japanese routes and translation pairs.
- A near-white/deep-green single-column design inspired by the sparse structure of https://tartanllama.xyz/; no content or assets copied from that site.
- No client router or React/Svelte dependency. The native document remains readable without JavaScript.
- Plain CSS instead of Tailwind for this small custom presentation layer.
- Genuine Markdown/MDX content collections, math, Shiki, Pagefind, RSS, sitemap, and build-time OG cards.
- A separate preview stage and sample flag, with test articles excluded on launch.
- No bundled sample photography, externally loaded analytics, or fake project achievements.

## Fonts and images

Inter and Noto Sans JP are declared through Fontsource and installed by npm. No font binaries are in the delivered archive. The local visual preview used installed Inter and Noto Sans CJK JP; production uses Fontsource's Noto Sans JP, so exact rasterization is not guaranteed.

The two illustrative SVGs and raster social preview cards were created for this starter. Their numbers are explicitly fictional. The standard build replaces the social cards using `scripts/build-og.mjs` (Satori/Sharp).

The sorting and filtering utilities are directly adapted into `src/utils/getSortedPosts.mjs` and `src/utils/postFilter.mjs`. The latter adds explicit sample/live rules and has no development-mode future-post bypass. The source uses AstroPaper conventions, not all of AstroPaper’s original Tailwind components.
