import {getCollection} from "astro:content";
import {visiblePosts,postPath} from "../lib/content.mjs";
export async function GET() {
 const rows=visiblePosts(await getCollection("posts")).map(p=>({title:p.data.title,description:p.data.description,url:postPath(p),tags:p.data.tags,kind:p.data.kind,lang:p.data.lang,sample:p.data.sample,body:(p.body??"").replace(/<[^>]*>/g," ")}));
 return new Response(JSON.stringify(rows),{headers:{"Content-Type":"application/json; charset=utf-8"}});
}
