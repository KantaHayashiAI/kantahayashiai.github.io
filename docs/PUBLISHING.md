# Publishing

## First deployment

1. Use the repository name `kantahayashiai.github.io` under `KantaHayashiAI`.
2. Keep `site.url` as `https://kantahayashiai.github.io/`. This is a user site: do not add a repository-name `base`.
3. Run `npm install`, then `npm run verify`. Commit the generated lockfile.
4. Commit the **contents** of this project, including `.github/workflows/`, `.nvmrc`, `.gitignore`, and `.gitattributes`. Do not commit `node_modules` or `dist`.
5. Choose GitHub Actions under Settings → Pages → Source.
6. Push `main`, then inspect the Actions build/deploy logs and the published site.

The Actions configuration can bootstrap an initial install without a lockfile, but generating and committing a lockfile locally first is preferable. Direct package versions are pinned; transitive resolution is not frozen until that file exists.

A minimal Git upload after creating an empty remote repository:

```bash
git init
git add .
git commit -m "Initialize personal blog"
git branch -M main
git remote add origin https://github.com/KantaHayashiAI/kantahayashiai.github.io.git
git push -u origin main
```

Use these only in the new project folder. If a repository or remote already exists, inspect it first rather than overwriting history.

## Before going live

- Review the public About text and the GitHub link. Add other social accounts only after confirming their URLs.
- Add a genuine article with `draft: false`, `sample: false`, and a publication time no later than the build.
- Change `stage` to `live` in `src/config/site.mjs`.
- Run `npm run verify`. It rejects a live build with no eligible real articles.
- Verify that the test articles and `/lab/` are gone, RSS has real items, and the sitemap has real URLs.
- Review social cards, canonical URLs, title/description, footnotes, and external links.
- Do not publish credentials, private information or unpublished collaborators' work by accident.

No analytics or comments are configured. Add them only as an explicit later decision.

## References

- [Astro: GitHub Pages deployment](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub: Custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Astro: Markdown](https://docs.astro.build/en/guides/markdown-content/)
- [Astro: MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/)
