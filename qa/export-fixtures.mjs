/** Render the shared UI with a placeholder for Markdown.
 * QA-only: this is NOT an Astro compiler or production build.
 */
import fs from 'node:fs';
import path from 'node:path';
import {root,readPosts} from '../scripts/read-content.mjs';
import site from '../src/config/site.mjs';
import {visiblePosts,postPath,translationOf} from '../src/lib/content.mjs';
import {headMeta,themeInit,header,footer,home,writing,about,searchPage,lab,articleStart,articleEnd,notFound} from '../src/lib/ui.mjs';
const posts=visiblePosts(readPosts());
const renderer = process.argv[2] ? JSON.parse(fs.readFileSync(process.argv[2],'utf8')) : {};
const pages=[];
function add(url,title,content,lang='en',post=null,other=null){
 const h=headMeta({title,path:url,lang,sample:post?.data.sample??false,post,other});
 const doc=`<!doctype html><html lang="${lang}"><head>${h}<script>${themeInit}</script><link rel="stylesheet" href="/site.css"><link rel="stylesheet" href="/qa-code.css"></head><body>${header(url,lang)}${content}${footer(lang)}<dialog id="image-viewer" aria-label="${lang==='ja'?'画像の拡大表示':'Expanded image'}"><button type="button" class="close-viewer">${lang==='ja'?'閉じる':'Close'} ×</button><img alt=""></dialog><script src="/site.js" defer></script></body></html>`;
 pages.push({url,html:doc});
}
for(const lang of ['en','ja']){
 const prefix=lang==='ja'?'/ja':'';
 add(`${prefix}/`,site.title,home(posts,lang),lang);
 add(`${prefix}/writing/`,lang==='ja'?'記事':'Writing',writing(posts,lang),lang);
 add(`${prefix}/about/`,lang==='ja'?'紹介':'About',about(lang),lang);
 add(`${prefix}/search/`,lang==='ja'?'検索':'Search',searchPage(lang),lang);
 if(site.stage==='preview')add(`${prefix}/lab/`,lang==='ja'?'表示チェック':'Test pages',lab(posts,lang),lang);
}
for(const p of posts){
 const other=translationOf(p,posts),slug=p.data.lang+':'+p.data.slug;
 const {html='<p>Markdown fixture is not rendered.</p>',headings=[]}=renderer[slug]??{};
 add(postPath(p),p.data.title,articleStart(p,headings,other)+html+articleEnd(p,posts.filter(x=>x!==p&&x.data.lang===p.data.lang&&x.data.kind===p.data.kind)),p.data.lang,p,other?{lang:other.data.lang,path:postPath(other)}:null);
}
add('/404/', 'Page not found',notFound());
const index=posts.map(p=>({title:p.data.title,description:p.data.description,lang:p.data.lang,kind:p.data.kind,tags:p.data.tags,sample:p.data.sample,body:p.body,url:postPath(p)}));
console.log(JSON.stringify({pages,posts,index,stage:site.stage}));
