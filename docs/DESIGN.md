# Design

## Direction

The reference is [Sy Brand's text-first personal site](https://tartanllama.xyz/): identity, a short introduction, recent posts, and little else. No source, article text, headshot, or illustration from that site is copied.

The design leaves room for both language-model experiments and writing about books or films. It does not present the author as a company, a lab, or a portfolio of fictional achievements. The public bio uses only a short, broad description; edit it before publishing.

## Palette

| Role | Light | Dark |
| --- | --- | --- |
| Paper | `#fafaf8` | `#171f1d` |
| Ink | `#222724` | `#e8efeb` |
| Muted text | `#626b66` | `#a6b5ac` |
| Link / accent | `#256257` | `#9bd0b7` |
| Rules | `#dce1dc` | `#36453e` |
| Secondary surface | `#eff3ef` | `#202c26` |

Near-white paper and a deep green accent in light mode; green-black ink and a lighter green in dark mode. There are no decorative gradients, noisy textures, or automatic animations. Ink, secondary text, and links were checked for at least 4.5:1 contrast on their page backgrounds.

## Type and layout

- Inter with Noto Sans JP for Japanese; local preview falls back to Noto Sans CJK JP.
- A 780px reading column shared by the homepage and articles.
- Medium/semibold headings, 17px article text, comfortable Japanese line spacing.
- Flat post lists, no permanent sidebar. The contents list is a native disclosure.
- Code, tables, and long equations scroll locally rather than widening the page.
- Search, theme, copy, zoom, and the MDX example are progressive enhancements.
- The source ZIP has no font binaries. Fontsource dependencies are installed when building.

## Test specimens

Eight visible posts: research format, code, a cultural reading note, mathematical layout, English/Japanese typography, figures, and a local-only interactive mixture. One further draft is deliberately hidden.

All specimens have `sample: true`; numbers and illustrations are explicitly fictional. No Jev article or actual experimental results are used. Switching to live removes test posts from generated pages and indices. Sample posts are never RSS items.
