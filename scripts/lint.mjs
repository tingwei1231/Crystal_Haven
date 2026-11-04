// Offline-capable source lint. ESLint was unavailable in this environment's package cache.
import { parse } from '@babel/parser';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const files=[];
function collect(path){for(const name of readdirSync(path)){const full=join(path,name);if(statSync(full).isDirectory())collect(full);else if(/\.(ts|tsx|mjs)$/.test(name))files.push(full);}}
collect('src');collect('tests');collect('scripts');files.push('vite.config.ts','playwright.config.ts');
const issues=[];
function report(file,node,message){issues.push(`${file}:${node.loc?.start.line||1}: ${message}`);}
function walk(node,file){
  if(!node||typeof node!=='object')return;
  if(node.type==='TSAnyKeyword')report(file,node,'Avoid explicit any; use a concrete type.');
  if(node.type==='DebuggerStatement')report(file,node,'Remove debugger statement.');
  if(node.type==='CallExpression'&&node.callee?.name==='eval')report(file,node,'eval is forbidden.');
  if(node.type==='JSXAttribute'&&node.name?.name==='dangerouslySetInnerHTML')report(file,node,'Render user content as text.');
  if(node.type==='MemberExpression'&&['localStorage','sessionStorage'].includes(node.object?.name))report(file,node,'Do not persist inquiry data.');
  if(node.type==='JSXOpeningElement'){
    const attrs=node.attributes||[];
    const find=name=>attrs.find(a=>a.name?.name===name);
    if(node.name?.name==='img'&&!find('alt'))report(file,node,'Images need alt text.');
    if(find('target')?.value?.value==='_blank'&&!find('rel')?.value?.value?.includes('noopener'))report(file,node,'External links need rel=noopener.');
  }
  for(const value of Object.values(node)){if(Array.isArray(value))value.forEach(item=>walk(item,file));else if(value&&typeof value==='object')walk(value,file);}
}
for(const file of files){
  try{walk(parse(readFileSync(file,'utf8'),{sourceType:'module',plugins:['typescript',...(file.endsWith('.tsx')?['jsx']:[])]}),file);}catch(error){issues.push(`${file}: ${error.message}`);}
}
console.log(`Source lint: ${files.length} files, ${issues.length} problems. Checks syntax, explicit any, unsafe HTML/eval, storage, image alt and external links.`);
if(issues.length){console.error(issues.join('\n'));process.exitCode=1;}
