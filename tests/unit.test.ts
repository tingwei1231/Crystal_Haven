import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildLineInquiryUrl, isValidLineId, officialAccountUrl, buildCrystalMessage } from '../src/lib/line.ts';
import { validateInquiry, initialInquiry, buildInquiryMessage } from '../src/lib/inquiry.ts';
import { filterCrystals, activeServices } from '../src/lib/catalog.ts';
import { assetUrl } from '../src/lib/assets.ts';
import type { Crystal, Service } from '../src/types.ts';
const services = JSON.parse(readFileSync('src/data/engraving-services.json','utf8')) as Service[];
const crystals = JSON.parse(readFileSync('src/data/crystals.json','utf8')) as Crystal[];
const valid = { ...initialInquiry, service: services[0].id, text: '  王小明 & ?#\n印  ', quantity: '2', notes: '<script>文字</script>' };
test('LINE encodes Chinese, whitespace and reserved characters exactly',()=>{
  const message='中文 & ?#\n=+ 印';
  const url=buildLineInquiryUrl(' @shop123 ',message)!;
  assert.equal(url,`https://line.me/R/oaMessage/%40shop123/?${encodeURIComponent(message)}`);
  assert.equal(decodeURIComponent(url.split('?')[1]),message);
});
test('LINE rejects missing or placeholder IDs and unsafe fallback URLs',()=>{
  for(const id of ['','shop123','@YOUR_LINE_ID','@demo123','@a/b','@a?x','@例子']) { assert.equal(isValidLineId(id),false); assert.equal(buildLineInquiryUrl(id,'hello'),null); }
  assert.equal(officialAccountUrl('@shop123','javascript:alert(1)'),'https://line.me/R/ti/p/%40shop123');
  assert.equal(officialAccountUrl('@shop123','https://lin.ee/abc'),'https://lin.ee/abc');
});
test('empty required fields and out of range numbers are rejected',()=>{
  assert.deepEqual(Object.keys(validateInquiry(initialInquiry,services)).sort(),['service','text']);
  for(const quantity of ['0','100','1.5','-1','1e1','']) assert.ok(validateInquiry({...valid,quantity},services).quantity);
  assert.deepEqual(validateInquiry(valid,services),{});
});
test('bounds, disabled services and incompatible selections are enforced',()=>{
  assert.ok(validateInquiry({...valid,text:' '.repeat(4)},services).text);
  assert.ok(validateInquiry({...valid,text:'晶'.repeat(41)},services).text);
  assert.ok(validateInquiry({...valid,notes:'a'.repeat(301)},services).notes);
  assert.ok(validateInquiry({...valid,material:'unknown'},services).material);
  assert.ok(validateInquiry({...valid,delivery:'配送'},services).delivery);
  assert.ok(validateInquiry(valid,services.map(s=>({...s,enabled:false}))).service);
  assert.equal(activeServices(services.map(s=>({...s,enabled:false}))).length,0);
});
test('invalid dates and past dates are rejected without assuming timezone',()=>{
  for(const date of ['2000-01-01','2099-02-30','oops']) assert.ok(validateInquiry({...valid,date},services).date);
  assert.equal(validateInquiry({...valid,date:'2099-12-31'},services).date,undefined);
});
test('summary trims engraving text, preserves plain text, includes all options and warning',()=>{
  const message=buildInquiryMessage({...valid,material:services[0].availableMaterials[0],font:services[0].availableFonts[0],size:services[0].availableSizes[0],date:'2099-12-31',delivery:'未決定'},services);
  for(const value of ['王小明 & ?#\n印','數量：2',valid.notes,services[0].name,services[0].availableFonts[0],'2099-12-31','此訊息為詢價需求']) assert.ok(message.includes(value));
  assert.ok(!message.includes('刻印內容：  '));
});
test('hidden items never leak through any public filter',()=>{
  assert.equal(filterCrystals(crystals).length,3);
  assert.equal(filterCrystals(crystals,'all','hidden').length,0);
  assert.equal(filterCrystals(crystals,'quartz','available').length,1);
  assert.equal(filterCrystals(crystals,'smoky','available').length,0);
  for(const status of ['available','reserved','sold']) assert.equal(filterCrystals(crystals,'all',status).length,1);
});
test('product inquiry identifies the correct sample item',()=>{
  const message=buildCrystalMessage(crystals[0]);
  assert.ok(message.includes(crystals[0].id)); assert.ok(message.includes(crystals[0].name)); assert.ok(message.includes('非真實庫存'));
});
test('asset URLs support Pages subdirectories and root deployments',()=>{
  assert.equal(assetUrl('/images/quartz.webp','/stone-seal/'),'/stone-seal/images/quartz.webp');
  assert.equal(assetUrl('images/quartz.webp','/'),'/images/quartz.webp');
});
