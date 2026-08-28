import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.dirname(fileURLToPath(import.meta.url));
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.webmanifest':'application/manifest+json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.md':'text/markdown; charset=utf-8'};

const server=http.createServer(async(req,res)=>{
  try{
    const urlPath=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const relative=urlPath==='/'?'index.html':urlPath.replace(/^\/+/, '');
    const target=path.resolve(root,relative);
    if(!target.startsWith(root+path.sep)) throw new Error('invalid path');
    const body=await fs.readFile(target);
    res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-cache'});
    res.end(body);
  }catch{
    res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});
    res.end('404 Not Found');
  }
});

server.listen(port,'0.0.0.0',()=>console.log(`Travel Manager: http://localhost:${port}`));
