# Kanta Hayashi

English | [日本語](README.ja.md)

An English-first, static personal blog for `kantahayashiai.github.io`. An AstroPaper-derived publishing setup with a custom, text-first layout inspired by [Sy Brand's site](https://tartanllama.xyz/).

**This is the test edition:** eight visible sample posts, one hidden draft, and no Jev article. Preview pages are `noindex`; sample posts are excluded from RSS and the sitemap.

## Start

Use Node.js 24.

```sh
npm install
npm run dev
```

Open `http://localhost:4321`. Commit the generated `package-lock.json`; use `npm ci` for subsequent installs.

```sh
npm run verify   # source tests, metadata, OG images, Astro build, Pagefind, output checks
npm run preview
```

**Build status:** dependency installation was blocked in the authoring environment. Source tests and shared-UI browser fixtures were checked; a complete Astro build and GitHub deployment have not been verified. See [verification](docs/VERIFICATION.md).

## Features

- Markdown and MDX, math, syntax-highlighted code, copy controls, footnotes, and a collapsible contents list.
- English and Japanese routes, paired translation links, light/dark themes, and image enlargement.
- Pagefind search with a JSON fallback, RSS, sitemap, canonical metadata, and generated OG images.
- Explicit sample/draft handling; no tracking, comments, server, or model API.

## Customize

| Path | Purpose |
| --- | --- |
| `src/config/site.mjs` | Identity, URLs, preview/live mode |
| `src/content/posts/` | Articles and test specimens |
| `public/site.css` | Palette, typography, responsive layout |
| `src/lib/ui.mjs` | Shared page markup and public copy |
| `.github/workflows/` | Checks and GitHub Pages deployment |

```sh
npm run new -- --title "A new note" --slug a-new-note --lang en --kind notes
```

New posts start as drafts. See [writing](docs/WRITING.md) for images, math, MDX, and translation pairs.

## Deploy

Create `KantaHayashiAI/kantahayashiai.github.io`, add this folder's **contents**, and choose **Settings → Pages → Source → GitHub Actions**. Push `main` to run the included workflow. Keep `.github/` and the other dotfiles; do not upload `node_modules`, local credentials, or `dist`.

To launch, add a real post and change `stage: "preview"` to `stage: "live"` in `src/config/site.mjs`. All `sample: true` posts are then omitted from the built site. Preview/draft flags do not hide source files in a public repository.

[Publishing](docs/PUBLISHING.md) · [Design](docs/DESIGN.md) · [AstroPaper provenance](UPSTREAM.md)

## License

[MIT](LICENSE). Upstream AstroPaper attribution is retained. Font packages are installed by npm; no font binaries are bundled in this source archive.
