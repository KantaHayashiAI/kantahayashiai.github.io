import {getCollection} from "astro:content";
import site from "../config/site.mjs";
import {feedPosts,postPath,escapeHtml} from "../lib/content.mjs";
export async function GET() {
 const paths=site.stage==="preview"?[]:["/","/about/","/writing/","/ja/","/ja/about/","/ja/writing/",...feedPosts(await getCollection("posts")).map(postPath)];
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p=>`<url><loc>${escapeHtml(new URL(p,site.url).href)}</loc></url>`).join("")}</urlset>`,{headers:{"Content-Type":"application/xml; charset=utf-8"}});
}
