import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
export const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
// Normal Markdown YAML is handled by gray-matter after npm install. The offline
// fallback deliberately accepts only the one-line scalar/JSON subset used here.
let matter;
try {matter=(await import('gray-matter')).default;} catch {}
export function parseSource(source) {
 if(matter){const {data,content}=matter(source);return {data,body:content};}
 const match=source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
 if(!match)throw new Error('Missing frontmatter');
 const data={};
 for(const line of match[1].split(/\r?\n/)) {
  if(!line.trim()||line.trim().startsWith('#'))continue;
  const pair=line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/);
  if(!pair)throw new Error('Install dependencies to parse extended YAML frontmatter.');
  const [,key,v]=pair;
  if(v.startsWith('"')||v.startsWith('[')||v.startsWith('{')||/^(true|false|null|\d+(\.\d+)?)$/.test(v)) data[key]=JSON.parse(v);
  else if(v==='|'||v==='>'||v.startsWith("'"))throw new Error('Install dependencies to parse extended YAML frontmatter.');
  else data[key]=v;
 }
 return {data,body:match[2]};
}
export function readPosts() {
 const base=path.join(root,'src/content/posts');
 function walk(dir) {return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):(!e.name.startsWith('_')&&/\.mdx?$/.test(e.name)?[path.join(dir,e.name)]:[]));}
 return walk(base).map(file=>{const p=parseSource(fs.readFileSync(file,'utf8'));return {...p,id:path.relative(base,file).replace(/\\/g,'/'),file,data:{author:'Kanta Hayashi',lang:'en',kind:'notes',tags:[],draft:false,sample:false,featured:false,...p.data}};});
}
