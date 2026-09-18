import {readPosts} from './read-content.mjs';
import {postPath,visiblePosts} from '../src/lib/content.mjs';
import site from '../src/config/site.mjs';
const posts=readPosts(),errors=[],paths=new Set(),translations=new Set();
for(const {data:d,id} of posts) {
 if(typeof d.title!=='string'||!d.title||d.title.length>180)errors.push(`${id}: title missing/too long`);
 if(typeof d.description!=='string'||!d.description||d.description.length>300)errors.push(`${id}: description missing/too long`);
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(d.slug))errors.push(`${id}: invalid slug`);
 if(!['en','ja'].includes(d.lang)||!['research','engineering','notes'].includes(d.kind))errors.push(`${id}: invalid language/kind`);
 if(!Number.isFinite(+new Date(d.pubDatetime)))errors.push(`${id}: invalid publication date`);
 if(!Array.isArray(d.tags)||!d.tags.every(t=>typeof t==='string'))errors.push(`${id}: invalid tags`);
 if(paths.has(postPath(d)))errors.push(`${id}: duplicate URL`);paths.add(postPath(d));
 if(d.translationKey){const k=`${d.lang}:${d.translationKey}`;if(translations.has(k))errors.push(`${id}: duplicate translation`);translations.add(k);}
 if(d.lang==='ja'&&!d.socialTitle&&!d.draft)errors.push(`${id}: add an English socialTitle for the Latin-only social card`);
}
if(!['preview','live'].includes(site.stage))errors.push('site.stage must be preview or live');
if(!/^https:\/\//.test(site.url))errors.push('Use an absolute HTTPS site URL');
if(site.stage==='live'&&visiblePosts(posts).length===0)errors.push('Add at least one non-draft, non-sample post before switching to live.');
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`Validated ${posts.length} sources; ${visiblePosts(posts).length} visible; stage=${site.stage}.`);
