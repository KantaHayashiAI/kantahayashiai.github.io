import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import site from "../config/site.mjs";
import { feedPosts, postPath } from "../lib/content.mjs";
export async function GET() {
 const posts=site.stage==="preview"?[]:feedPosts(await getCollection("posts"));
 return rss({title:site.title,description:site.description,site:site.url,items:posts.map(p=>({title:p.data.title,description:p.data.description,pubDate:p.data.pubDatetime,link:postPath(p)}))});
}
