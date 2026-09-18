import fs from 'node:fs';
import path from 'node:path';
import site from '../src/config/site.mjs';
import {root,readPosts} from './read-content.mjs';
import {visiblePosts,postPath} from '../src/lib/content.mjs';
const dist=path.join(root,'dist');
if(!fs.existsSync(dist))throw new Error('Run astro build first.');
const errors=[];const collect=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?collect(path.join(dir,e.name)):[path.join(dir,e.name)]);
const htmls=collect(dist).filter(f=>f.endsWith('.html'));
for(const file of htmls){const html=fs.readFileSync(file,'utf8');
 if(!/<title>[^<]+<\/title>/.test(html))errors.push(`${file}: missing title`);
 if(!html.includes('name="description"'))errors.push(`${file}: missing description`);
 if(!html.includes('rel="canonical"'))errors.push(`${file}: missing canonical`);
 if(site.stage==='preview'&&!html.includes('noindex'))errors.push(`${file}: preview is indexable`);
 if(html.includes('DRAFT MUST NOT BE PUBLISHED'))errors.push(`${file}: draft leaked`);
 for(const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)[^"\s]*"/g)){
  const ref=m[1];if(ref.startsWith('//'))continue;
  const candidate=path.join(dist,decodeURI(ref));
  if(!fs.existsSync(candidate)&&!fs.existsSync(path.join(candidate,'index.html')))errors.push(`${path.relative(dist,file)}: missing ${ref}`);
 }
}
const rss=fs.readFileSync(path.join(dist,'rss.xml'),'utf8');
const sitemap=fs.readFileSync(path.join(dist,'sitemap.xml'),'utf8');
const index=JSON.parse(fs.readFileSync(path.join(dist,'search-index.json'),'utf8'));
const allowed=visiblePosts(readPosts());
if(index.length!==allowed.length)errors.push('Search index and visible posts disagree');
for(const p of allowed){if(!fs.existsSync(path.join(dist,postPath(p),'index.html')))errors.push(`Missing post ${postPath(p)}`);}
if(site.stage==='preview'&&(/<item[\s>]/.test(rss)||/<url>/.test(sitemap)))errors.push('Preview samples leaked into RSS/sitemap');
if(!fs.existsSync(path.join(dist,'pagefind/pagefind.js')))errors.push('Pagefind index missing');
if(errors.length){console.error(errors.join('\n'));process.exit(1);}console.log(`Checked ${htmls.length} HTML pages, search coverage, links, and publication boundaries.`);
