import site from "../config/site.mjs";
import {getSortedPosts} from "../utils/getSortedPosts.mjs";
/** @param {unknown} value */
export function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
export function escapeJson(value) { return JSON.stringify(value).replace(/</g, "\\u003c"); }
export function safeUrl(value, fallback="#") {
  const s=String(value??"");
  return (/^https?:\/\//i.test(s)||(/^\//.test(s)&&!/^\/\//.test(s))||s.startsWith("#")) ? s : fallback;
}
export function postPath(p) { const d=p.data??p; return `${d.lang==="ja"?"/ja":""}/posts/${d.slug}/`; }
export function pagePath(name="",lang="en") { return `${lang==="ja"?"/ja":""}/${name?name+"/":""}`; }
/**
 * @template {{data:{draft?:boolean,sample?:boolean,pubDatetime:Date|string|number,modDatetime?:Date|string|number|null}}} T
 * @param {T[]} posts
 * @param {{stage?:string,now?:number}} options
 * @returns {T[]}
 */
export function visiblePosts(posts, options={}) {
  const stage=options.stage??site.stage, now=options.now??Date.now();
  return getSortedPosts(posts, {stage, now});
}
/**
 * @template {{data:{draft?:boolean,sample?:boolean,pubDatetime:Date|string|number,modDatetime?:Date|string|number|null}}} T
 * @param {T[]} posts
 * @param {number} now
 * @returns {T[]}
 */
export function feedPosts(posts,now=Date.now()) {return visiblePosts(posts,{stage:"live",now});}
export function dateLabel(value,lang="en") {
  return new Intl.DateTimeFormat(lang==="ja"?"ja-JP":"en-US",{year:"numeric",month:lang==="ja"?"long":"short",day:"numeric",timeZone:site.timezone}).format(new Date(value));
}
export function readingMinutes(body="") {
  const noCode=body.replace(/```[\s\S]*?```/g,"");
  const cjk=(noCode.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu)||[]).length;
  const words=noCode.replace(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu," ").split(/\s+/).filter(Boolean).length;
  return Math.max(1,Math.ceil(words/220+cjk/500));
}
export function sampleMessage(lang="en") {return lang==="ja"?"表示確認用のテスト記事です。研究成果・実測値の報告ではありません。":"Layout test. Sample content, not a research result.";}
/**
 * @template {{data:{translationKey?:string,lang?:string}}} T
 * @param {T} post
 * @param {T[]} posts
 * @returns {T|null}
 */
export function translationOf(post,posts) {
 const d=post.data??post; if(!d.translationKey)return null;
 return posts.find(p=>(p.data??p).translationKey===d.translationKey&&(p.data??p).lang!==d.lang)??null;
}
