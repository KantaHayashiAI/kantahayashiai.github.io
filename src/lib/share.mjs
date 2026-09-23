import { escapeHtml } from "./content.mjs";

// AstroPaper ShareLinks structure and Tabler outline icons (MIT).
// X, LinkedIn, Mail: satnaing/astro-paper src/assets/icons/socials;
// Bluesky: tabler/tabler-icons icons/outline/brand-bluesky.svg.
const icons = {
  "X": "<path d=\"M4 4l11.733 16h4.267l-11.733 -16z\" /><path d=\"M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772\" />",
  "LinkedIn": "<path d=\"M8 11v5\" /><path d=\"M8 8v.01\" /><path d=\"M12 16v-5\" /><path d=\"M16 16v-3a2 2 0 1 0 -4 0\" /><path d=\"M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z\" />",
  "Mail": "<path d=\"M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z\" /><path d=\"M3 7l9 6l9 -6\" />",
  "Bluesky": "<path d=\"M6.335 5.144c-1.654 -1.199 -4.335 -2.127 -4.335 .826c0 .59 .35 4.953 .556 5.661c.713 2.463 3.13 2.75 5.444 2.369c-4.045 .665 -4.889 3.208 -2.667 5.41c1.03 1.018 1.913 1.59 2.667 1.59c2 0 3.134 -2.769 3.5 -3.5c.333 -.667 .5 -1.167 .5 -1.5c0 .333 .167 .833 .5 1.5c.366 .731 1.5 3.5 3.5 3.5c.754 0 1.637 -.571 2.667 -1.59c2.222 -2.203 1.378 -4.746 -2.667 -5.41c2.314 .38 4.73 .094 5.444 -2.369c.206 -.708 .556 -5.072 .556 -5.661c0 -2.953 -2.68 -2.025 -4.335 -.826c-2.293 1.662 -4.76 5.048 -5.665 6.856c-.905 -1.808 -3.372 -5.194 -5.665 -6.856\" />"
};

export function shareLinks(title, url, lang = "en") {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const links = [
    ["X", `https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}&via=KantaHayashiAI`],
    ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`],
    ["Bluesky", `https://bsky.app/intent/compose?text=${encodeURIComponent(title + "\n" + url)}`],
    ["Mail", `mailto:?subject=${encodedTitle}&body=${encodedUrl}`],
  ];
  const ja = lang === "ja";
  return `<div class="share-links"><span class="share-intro">${ja ? "この記事を共有" : "Share this post:"}</span><div class="share-icons">${links.map(([name, href]) => {
    const label = ja ? (name === "Mail" ? "メールで記事を共有" : name + "で記事を共有") : (name === "Mail" ? "Share this post via email" : "Share this post on " + name);
    return `<a href="${escapeHtml(href)}" title="${escapeHtml(label)}" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${icons[name]}</svg><span class="sr-only">${escapeHtml(label)}</span></a>`;
  }).join("")}</div></div>`;
}
