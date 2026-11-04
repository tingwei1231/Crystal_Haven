import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync } from 'node:fs';
const browser = await chromium.launch({channel:process.env.CI ? undefined : 'msedge',headless:true});
try {
  const page=await browser.newPage();
  for(const name of ['hero','seal','quartz','smoky','green']) {
    const svg=readFileSync(`public/images/${name}.svg`,'utf8');
    for(const width of [640,1200]) {
      const data=await page.evaluate(async ({svg,width})=>{
        const image=new Image();image.src=`data:image/svg+xml;base64,${btoa(svg)}`;await image.decode();
        const canvas=document.createElement('canvas');canvas.width=width;canvas.height=width*.75;
        canvas.getContext('2d').drawImage(image,0,0,width,width*.75);
        return canvas.toDataURL('image/webp',.9).split(',')[1];
      },{svg,width});
      writeFileSync(`public/images/${name}${width===640?'-640':''}.webp`,Buffer.from(data,'base64'));
    }
  }
} finally { await browser.close(); }
