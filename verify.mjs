import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const root='D:/maro-lab/travel-manager-web';
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const inline=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
if(!inline) throw new Error('index.html inline script not found');
new vm.Script(inline,{filename:'index-inline.js'});
new vm.Script(fs.readFileSync(path.join(root,'sw.js'),'utf8'),{filename:'sw.js'});
const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8'));
const required=['index.html','offline.html','sw.js','serve.mjs','manifest.webmanifest','icons/app-icon.svg','icons/app-icon-180.png','icons/app-icon-192.png','icons/app-icon-512.png','README.md'];
const missing=required.filter(file=>!fs.existsSync(path.join(root,file)));
const result={
  indexScript:'ok',
  serviceWorkerScript:'ok',
  manifestName:manifest.name,
  display:manifest.display,
  startUrl:manifest.start_url,
  iconCount:manifest.icons.length,
  missing,
  aiFeatures:(html.match(/AI TRAVEL|AI 예산|인공지능/gi)||[]).length,
  pages:(html.match(/class="page/g)||[]).length
};
console.log(JSON.stringify(result,null,2));
if(missing.length) process.exitCode=1;
