import fs from 'node:fs';
import path from 'node:path';
import {root} from './read-content.mjs';
const args=process.argv.slice(2);const option=(name,fallback)=>{const i=args.indexOf(name);return i<0?fallback:args[i+1]??fallback;};
const title=option('--title',''),slug=option('--slug',''),lang=option('--lang','en'),kind=option('--kind','notes');
if(!title||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)||!['en','ja'].includes(lang)||!['notes','engineering','research'].includes(kind)) {
 console.log('Usage: npm run new -- --title "My title" --slug my-title [--lang en|ja] [--kind notes|engineering|research]');process.exit(1);
}
const file=path.join(root,'src/content/posts',`${lang}-${slug}.md`);
if(fs.existsSync(file))throw new Error(`Refusing to overwrite ${file}`);
const data={title,slug,description:'Add a short description.',pubDatetime:new Date().toISOString(),lang,kind,tags:[],draft:true,sample:false,featured:false,...(lang==='ja'?{socialTitle:'Add an English title for the social card.'}:{})};
fs.writeFileSync(file,'---\n'+Object.entries(data).map(([k,v])=>`${k}: ${JSON.stringify(v)}`).join('\n')+'\n---\n\nWrite the article here.\n',{flag:'wx'});
console.log(`Created ${path.relative(root,file)} (draft, not published).`);
