# Verification

This record separates source checks and browser layout tests from an actual Astro build.

## Checked in this revision

- 32 Node tests passed: escaping, URLs, date/draft/sample filtering, translation pairing, metadata, corpus boundaries, and shared page structure.
- Frontmatter validation passed: nine source posts, eight visible specimens, one hidden draft. No Jev article.
- 499 Chromium fixture assertions passed: 19 page layouts at 320, 390, 768, and 1440px in light and dark themes; page-level overflow and landmarks; theme toggling, filters, search states, mobile navigation, image zoom/Escape/focus restoration, code copying/error handling, translation links, footnotes, equation overflow, and reading without JavaScript.
- Light/dark ink, muted text, and links meet 4.5:1 contrast against their page background. This is not a full accessibility audit.
- Desktop and mobile screenshots of the homepage, Japanese article, code, math, and interactive specimen were inspected visually.
- The source archive does not include font binaries, credentials, dependencies, or compiled output.

Results: [Node tests](verification/node-tests.txt) · [Browser fixtures](verification/browser-fixtures.json).

## What the preview represents

The preview uses the same `src/lib/ui.mjs`, `public/site.css`, `public/site.js`, post content, and MDX component markup as the source. It is not an unrelated design mockup, but **it is not an Astro build**.

For fixtures, Markdown and code were rendered with Mistune/Pygments; formulas were converted to SVG by MathJax. The actual source uses Astro/MDX, Shiki, and KaTeX. Preview social images were rendered locally; the Astro workflow generates them with Satori/Sharp. These output paths are not claimed to be pixel-identical.

Chromium's environment policy blocked navigation to a local HTTP origin, so fixture pages were tested with `set_content` and inlined assets. The JSON search transport used real sample index entries with a mocked fetch response. Successful clipboard writing was mocked; denial was also exercised. The standalone HTML preview has its own clearly labeled navigation wrapper.

## Not verified here

- A complete npm install / transitive lockfile. The npm registry could not be reached; a bounded installation attempt did not complete.
- `astro check`, `astro build`, actual MDX compilation, actual KaTeX/Shiki output, Satori generation, and the Pagefind indexing/search integration.
- `scripts/check-dist.mjs` against a genuine Astro build.
- GitHub Actions / Pages deployment, Safari, Firefox, screen readers, and social-card scrapers.
- LocalStorage persistence across real-origin navigation in this restricted browser environment.

Run `npm install`, commit the generated lockfile, and run `npm run verify` before publishing. No lockfile or successful framework build log has been fabricated. `qa/browser-smoke.py` can then test the real preview server.

No model/API inference calls were made. No GitHub repository was changed or deployed by this task.
