/** Public site configuration. Never put credentials or private biographical details here. */
/** @type {{title:string,nameJa:string,url:string,description:string,stage:"preview"|"live",timezone:string,github:string,repository:string,copyrightYear:number}} */
const config = {
  title: "Kanta Hayashi",
  nameJa: "林 寛太",
  url: "https://kantahayashiai.github.io/",
  description: "Notes on language models, training data, and evaluation — with room for the things around them.",
  // preview: sample articles are visible, the entire site is noindex, RSS is empty.
  // live: sample articles are not built or listed; only real, non-draft posts are published.
  stage: "live",
  timezone: "Asia/Tokyo",
  github: "https://github.com/KantaHayashiAI",
  repository: "https://github.com/KantaHayashiAI/kantahayashiai.github.io",
  copyrightYear: 2026,
};
export default Object.freeze(config);
