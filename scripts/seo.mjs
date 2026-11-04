import { readFileSync, writeFileSync } from 'node:fs';
import { siteConfig } from '../src/config/site.ts';
import { loadEnv } from 'vite';
import { isValidLineId } from '../src/lib/line.ts';
const configured = process.env.VITE_SITE_URL || loadEnv('production',process.cwd(),'VITE_').VITE_SITE_URL || '';
let url = '';
if (configured) {
  const parsed = new URL(configured);
  if (parsed.protocol !== 'https:' || parsed.search || parsed.hash) throw new Error('VITE_SITE_URL must be an absolute HTTPS URL without query or hash.');
  url = parsed.href.endsWith('/') ? parsed.href : `${parsed.href}/`;
}
const escape = (value) => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
let html=readFileSync('dist/index.html','utf8');
const title=escape(`${siteConfig.brandName}${siteConfig.demoMode?' Demo':''}｜${siteConfig.tagline}`);
html=html.replace(/<title>.*?<\/title>/,`<title>${title}</title>`)
  .replace(/(<meta property="og:title" content=")[^"]*("\s*\/?>)/,`$1${title}$2`)
  .replace(/(<meta (?:name="description"|property="og:description") content=")[^"]*("\s*\/?>)/g,`$1${escape(siteConfig.description)}$2`);
if (url) html=html.replace('</head>',`<link rel="canonical" href="${escape(url)}" /><meta property="og:url" content="${escape(url)}" /><meta property="og:image" content="${escape(url)}images/hero.webp" /></head>`);
if (!siteConfig.demoMode) {
  if (!url) throw new Error('Production requires VITE_SITE_URL.');
  const catalog=JSON.parse(readFileSync('src/data/crystals.json','utf8'));
  const services=JSON.parse(readFileSync('src/data/engraving-services.json','utf8'));
  if (!isValidLineId(siteConfig.lineOfficialId)) throw new Error('Production requires a valid public LINE official account ID.');
  if(catalog.some(item=>item.status!=='hidden'&&item.isSample)||services.some(item=>item.enabled&&item.isSample)) throw new Error('Replace or hide/disable all sample products and services before turning off Demo mode.');
  html=html.replace('noindex, nofollow','index, follow');
}
writeFileSync('dist/index.html',html);
writeFileSync('dist/robots.txt',`User-agent: *\n${siteConfig.demoMode?'Disallow: /':'Allow: /'}\n${url ? `Sitemap: ${url}sitemap.xml\n` : ''}`);
writeFileSync('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${url && !siteConfig.demoMode ? `<url><loc>${escape(url)}</loc></url>`:''}</urlset>`);
console.log(`SEO files generated (${siteConfig.demoMode?'Demo noindex':'production'}, ${url||'canonical deferred until site URL is configured'}).`);
