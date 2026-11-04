import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
const output='.taste-skill/inspect';mkdirSync(output,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const results=[];
try{
  for(const width of [390,768,1440]){
    const page=await browser.newPage({viewport:{width,height:width===768?1024:900}});
    for(const [name,route] of [['home','/'],['inquiry','/engraving/inquiry'],['detail','/crystals/sample-quartz']]){
      await page.goto(`http://127.0.0.1:4173/#${route}`);
      for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=650){await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(100);}
      await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(800);
      await page.screenshot({path:`${output}/${name}-${width}.png`,fullPage:true});
      const data=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).length,headingCount:document.querySelectorAll('h1').length,headings:[...document.querySelectorAll('h1,h2,h3')].map(h=>({text:h.textContent,lines:Math.round(h.getBoundingClientRect().height/parseFloat(getComputedStyle(h).lineHeight))})).filter(h=>h.lines>2)}));
      results.push({route,width,...data});
    }
    await page.close();
  }
}finally{await browser.close();}
writeFileSync(`${output}/measurements.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
if(results.some(r=>r.overflow||r.brokenImages||r.headingCount!==1||r.headings.length))process.exitCode=1;
