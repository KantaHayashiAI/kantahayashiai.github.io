import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import {root,readPosts} from './read-content.mjs';
import {visiblePosts} from '../src/lib/content.mjs';
import site from '../src/config/site.mjs';
const f=path.join(root,'node_modules/@fontsource/inter/files/inter-latin-600-normal.woff');
if(!fs.existsSync(f))throw new Error('Inter WOFF file is missing. Run npm install before generating social cards.');
const font=fs.readFileSync(f);const out=path.join(root,'public/og');
// This directory is generated. Put custom article images under public/images.
fs.rmSync(path.join(out,'posts'),{recursive:true,force:true});fs.mkdirSync(path.join(out,'posts'),{recursive:true});
const items=[{title:'Language models & other notes.',kind:'RESEARCH / ENGINEERING / NOTES',path:'default.png'},...visiblePosts(readPosts()).map(({data:d})=>({title:d.socialTitle??d.title,kind:(d.sample?'LAYOUT TEST / ':'')+d.kind.toUpperCase(),path:`posts/${d.lang}-${d.slug}.png`}))];
for(const item of items){
 const el={type:'div',props:{style:{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',background:'#fafaf8',padding:'64px 76px',fontFamily:'Inter',fontWeight:600,color:'#222724',borderTop:'10px solid #256257'},children:[{type:'div',props:{style:{display:'flex',fontSize:23,color:'#256257',letterSpacing:2},children:item.kind}},{type:'div',props:{style:{fontSize:item.title.length>68?50:64,letterSpacing:-2,lineHeight:1.1,display:'flex',maxWidth:1020},children:item.title}},{type:'div',props:{style:{display:'flex',justifyContent:'space-between',fontSize:24,color:'#626b66'},children:[{type:'div',props:{children:site.title}},{type:'div',props:{children:'kantahayashiai.github.io'}}]}}]}};
 const svg=await satori(el,{width:1200,height:630,fonts:[{name:'Inter',data:font,weight:600,style:'normal'}]});
 await sharp(Buffer.from(svg)).png().toFile(path.join(out,item.path));
}
console.log(`Generated ${items.length} social cards.`);
