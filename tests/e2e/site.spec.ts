import { test, expect } from '@playwright/test';
test('all public routes load, images work, refresh works and layout fits',async({page})=>{
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  for(const route of ['/','/engraving','/engraving/inquiry','/crystals','/crystals/sample-quartz','/about','/not-real','/crystals/sample-hidden']){
    await page.goto(`./#${route}`);await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    const images=page.locator('main img');
    for(const img of await images.all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);}
  }
  await page.goto('./#/crystals/sample-quartz');await page.reload();await expect(page.getByRole('heading',{name:'白水晶簇',exact:true})).toBeVisible();
  expect(errors).toEqual([]);
});
test('form validates, preserves text, summarizes and invalidates stale summary',async({page})=>{
  await page.goto('./#/engraving/inquiry');await page.getByRole('button',{name:'檢查詢價摘要'}).click();
  await expect(page.getByText('請選擇服務類型。')).toBeVisible();
  await page.getByLabel('服務類型（必填）').selectOption('demo-name-seal');
  await page.getByLabel('刻印文字（必填）').fill('王小明 & 印');await page.getByLabel('備註',{exact:true}).fill('請協助報價 <印>');
  await page.getByRole('button',{name:'檢查詢價摘要'}).click();
  await expect(page.locator('.summary-text')).toContainText('王小明 & 印');
  await expect(page.locator('.summary-text')).toContainText('請協助報價 <印>');
  await expect(page.getByRole('button',{name:'開啟 LINE 詢價（未設定）'})).toBeDisabled();
  await expect(page.locator('a[href*="oaMessage"]')).toHaveCount(0);
  await page.getByLabel('刻印文字（必填）').fill('新文字');await expect(page.locator('.summary-text')).toHaveCount(0);
  await page.getByRole('button',{name:'檢查詢價摘要'}).click();await expect(page.locator('.summary-text')).toContainText('新文字');
  await page.reload();await expect(page.getByLabel('刻印文字（必填）')).toHaveValue('');
});
test('clipboard success and failure have honest feedback',async({page,context})=>{
  await page.goto('./#/crystals/sample-quartz');
  await context.grantPermissions(['clipboard-read','clipboard-write']);
  await page.getByRole('button',{name:'複製詢價內容'}).click();await expect(page.getByRole('status')).toContainText('已複製詢價內容');
  await expect.poll(()=>page.evaluate(()=>navigator.clipboard.readText())).toContain('DEMO-CR-001');
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('denied');}}}));
  await page.getByRole('button',{name:'複製詢價內容'}).click();await expect(page.getByLabel('手動複製摘要')).toBeVisible();
  await expect(page.getByRole('status')).toContainText('無法自動複製');
});
test('catalog filters, empty state and hidden product route',async({page})=>{
  await page.goto('./#/crystals');await expect(page.locator('.crystal-item')).toHaveCount(3);
  await page.getByLabel('礦石分類').selectOption('quartz');await expect(page.locator('.crystal-item')).toHaveCount(1);
  await page.getByLabel('商品狀態').selectOption('sold');await expect(page.getByText('目前沒有符合條件的商品。')).toBeVisible();
  await page.getByRole('button',{name:'重設篩選'}).click();await expect(page.locator('.crystal-item')).toHaveCount(3);
  await page.goto('./#/crystals/sample-hidden');await expect(page.getByRole('heading',{name:'這一頁，還沒刻好。'})).toBeVisible();
});
test('mobile navigation, keyboard escape and reduced motion',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto('./#/');
  const toggle=page.locator('.menu-toggle');
  if(await toggle.isVisible()){
    await toggle.click();await expect(toggle).toHaveAttribute('aria-expanded','true');await page.keyboard.press('Escape');await expect(toggle).toHaveAttribute('aria-expanded','false');
    await toggle.click();await page.getByRole('navigation').getByRole('link',{name:'刻印服務',exact:true}).click();await expect(toggle).toHaveAttribute('aria-expanded','false');
  }
  await expect.poll(()=>page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length)).toBe(0);
});
test('failed product images have an accessible fallback',async({page})=>{
  await page.route('**/images/*.webp',route=>route.abort());
  await page.goto('./#/crystals/sample-quartz');
  await expect(page.getByRole('img',{name:'白水晶簇原創繪製示意圖'})).toContainText('影像待補充');
  await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
