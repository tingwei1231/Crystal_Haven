import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { siteConfig as site } from './config/site';
import { crystals, services } from './store';
import { filterCrystals, statusLabels } from './lib/catalog';
import { buildCrystalMessage } from './lib/line';
import { Media } from './components/Media';
import { LineInquiry } from './components/LineInquiry';
import InquiryPage from './pages/InquiryPage';
import type { Crystal } from './types';

const faq = [
  ['如何開始訂製？', '先填寫刻印需求，檢查摘要後自行開啟 LINE、確認並傳送。店家收到訊息後，再人工確認可製作性與正式報價。'],
  ['價格與交期怎麼確認？', '依實際服務、材質、尺寸與印文需求由店家報價。希望完成日期僅供評估，Demo 不承諾價格與交期。'],
  ['印文還可以修改嗎？', '請在正式製作前與店家確認印文與校稿方式。修改、取消與售後規則待店家提供，網站不代為承諾。'],
  ['可以取件或寄送嗎？', '交付方式依店家設定開放。目前 Demo 尚未確認取件、寄送範圍與費用，請在詢價時一起討論。'],
  ['每塊原礦都一樣嗎？', '天然礦石的紋理、結晶與顏色有個體差異。請以店家實物照片與說明確認；本站示意圖無法作為實物品相依據。'],
  ['頁面上的狀態是即時的嗎？', '庫存採人工維護，並非即時同步。Demo 狀態只為展示介面，實際庫存請以 LINE 確認。'],
];

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [location.pathname]);
  function closeWithEscape(event: React.KeyboardEvent) { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); } }
  return <header className="header" onKeyDown={closeWithEscape}>
    <Link to="/" className="wordmark" aria-label={`${site.brandName}首頁`}><span className="seal-mark" aria-hidden="true">石<br />印</span><span>{site.brandName}<small>{site.brandEnglishName}</small></span></Link>
    <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? '關閉選單 ×' : '選單 ＋'}</button>
    <nav id="main-nav" aria-label="主要導覽" className={open ? 'nav open' : 'nav'}>
      <NavLink to="/engraving">刻印服務</NavLink><NavLink to="/crystals">水晶選品</NavLink><NavLink to="/about">關於我們</NavLink>
      <Link className="nav-cta" to="/engraving/inquiry">LINE 詢價 ↗</Link>
    </nav>
  </header>;
}
function Footer() {
  return <footer className="footer"><div className="footer-top"><h2>留一方，<br />屬於自己的印記。</h2><div><Link className="button" to="/engraving/inquiry">開始刻印詢價 ↗</Link><p>{site.tagline}</p><p>LINE {site.lineOfficialId || '尚未設定'}</p></div></div><div className="footer-brand">{site.brandName}</div><div className="footer-bottom"><span>{site.brandEnglishName} · {site.demoMode ? 'Demo 暫用品牌' : site.tagline}</span><Link to="/about#privacy">隱私與聯絡資訊</Link><span>{site.visuals.credit}</span></div></footer>;
}
function CrystalItem({ item }: { item: Crystal }) {
  return <article className="crystal-item" data-reveal><Link to={`/crystals/${item.slug}`} className="product-image" aria-label={`查看${item.name}`}><Media src={item.images[0]} alt={`${item.name}${item.isSample ? '原創繪製示意圖' : '商品實拍'}`} /></Link><div className="product-info"><h3><Link to={`/crystals/${item.slug}`}>{item.name}</Link></h3><p>{item.isSample ? '示意狀態：' : ''}{statusLabels[item.status]}</p></div><p className="muted">{item.isSample ? 'Demo 示意資料・非真實庫存' : item.priceTwd === null ? '價格請詢問' : `NT$ ${item.priceTwd.toLocaleString()}（運費另確認）`}</p></article>;
}
function Process() {
  return <section className="process section" aria-labelledby="process-title"><h2 id="process-title" data-reveal>從想法，到印記。</h2><ol><li data-reveal><h3>整理需求</h3><p>選擇服務與刻印文字。不確定材質、尺寸或字體，也能請店家建議。</p></li><li data-reveal><h3>一起確認</h3><p>檢查摘要並自行透過 LINE 詢價，由店家人工確認製作方式與報價。</p></li><li data-reveal><h3>校稿與交付</h3><p>正式製作前，確認印文、付款與交付細節。實際流程以店家回覆為準。</p></li></ol></section>;
}
function Home() {
  const featured = filterCrystals(crystals).filter(item => item.featured).slice(0, 6);
  return <>
    <section className="hero">
      <div className="hero-heading"><h1 data-reveal>天然成礦。<br />用心刻印。</h1><div className="hero-copy" data-reveal><p>看見原石的紋理，<br />留下文字的分量。</p><p>天然水晶原礦與印章刻印，<br />從一份清楚的需求開始。</p><Link className="button" to="/engraving/inquiry">開始刻印詢價 ↗</Link></div></div>
      <figure className="hero-media" data-reveal><Media src={site.visuals.heroImage} alt={site.visuals.heroAlt} priority /><figcaption><span>原石的稜線，印面的刻痕。</span><span>{site.visuals.heroCredit}</span></figcaption></figure>
    </section>
    <section className="service-story section"><div data-reveal><h2>一方小印，<br />有自己的分量。</h2><p>從日常用章到一份心意，先把想刻的文字與希望的風格說清楚，再與店家討論適合的材質及尺寸。</p>{services.some(item => item.isSample) && <p className="muted">目前為示意服務；實際承接項目待店家確認。</p>}<Link className="text-link" to="/engraving">認識刻印服務 ↗</Link></div><figure data-reveal><Media src={site.visuals.sealImage} alt={site.visuals.sealAlt} /><figcaption>{site.visuals.sealCredit}</figcaption></figure></section>
    <section className="section collection"><div className="section-heading" data-reveal><h2>礦石，各有性格。</h2><Link className="text-link" to="/crystals">查看全部選品 ↗</Link></div><p data-reveal>不以完美複製為美。從稜面、透光與紋理，慢慢看見每一塊的不同。</p><div className="crystal-grid">{featured.map(item => <CrystalItem key={item.id} item={item} />)}</div>{!featured.length && <p>精選商品整理中。</p>}</section>
    <Process />
    <section className="section faq"><h2 data-reveal>詢問之前。</h2>{faq.map(([q, a]) => <div className="faq-row" key={q} data-reveal><h3>{q}</h3><p>{a}</p></div>)}</section>
  </>;
}
function Engraving() {
  return <div className="page"><div className="page-intro"><h1 data-reveal>刻一方印，<br />從文字開始。</h1><p>材質、尺寸與字體一起考慮。<br />先整理需求，再由店家確認可製作的方式。</p></div>
    {services.map(item => <section key={item.id} className="service-detail"><figure><Media src={item.images[0]} alt={`${item.name}${item.isSample ? '繪製示意' : '服務作品'}`} priority /><figcaption>{item.isSample ? 'Demo 原創示意圖，非實際作品' : '服務作品'}</figcaption></figure><div><h2>{item.name}</h2><p>{item.description}</p><dl><dt>材質</dt><dd>{item.availableMaterials.join('、') || '請店家建議'}</dd><dt>尺寸</dt><dd>{item.availableSizes.join('、') || '待店家確認'}</dd><dt>字體</dt><dd>{item.availableFonts.join('、') || '請店家建議'}</dd><dt>價格與交期</dt><dd>{item.startingPriceTwd === null ? '價格待店家確認。' : `NT$ ${item.startingPriceTwd.toLocaleString()} 起（費用細節另確認）。`}{item.turnaroundNote}</dd></dl><Link to="/engraving/inquiry" state={{ serviceId: item.id }} className="button">填寫刻印需求 ↗</Link></div></section>)}
    {!services.length && <p className="notice">服務內容整理中，尚無開放詢價項目。</p>}
    <Process /><section className="section notes"><h2>製作前，一起看清楚。</h2><div><p>請確認印文正確，特殊字、異體字或特殊用途需由店家評估。網站不提供字體效果、印鑑效力或特殊用途的保證。</p><p>{site.tradePolicy}</p></div></section></div>;
}
function Crystals() {
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const items = filterCrystals(crystals, category, status);
  const categoryNames: Record<string, string> = { quartz: '白水晶', smoky: '茶晶', mineral: '其他礦石' };
  return <div className="page"><div className="page-intro"><h1 data-reveal>讓原礦，<br />保留原來的樣子。</h1><p>細看晶面與光影，尋找喜歡的紋理。<br />{site.demoMode ? '本頁皆為 Demo 示意品項，並非店內現貨。' : '庫存人工維護，實際狀態請以 LINE 確認。'}</p></div><section className="catalog"><h2 className="sr-only">水晶選品</h2><div className="filters"><label>礦石分類<select value={category} onChange={e => setCategory(e.target.value)}><option value="all">全部礦石</option>{Array.from(new Set(filterCrystals(crystals).map(item => item.category))).map(key => <option value={key} key={key}>{categoryNames[key] || key}</option>)}</select></label><label>商品狀態<select value={status} onChange={e => setStatus(e.target.value)}><option value="all">全部狀態</option>{['available', 'reserved', 'sold'].map(key => <option key={key} value={key}>{statusLabels[key as keyof typeof statusLabels]}</option>)}</select></label><p aria-live="polite">{items.length} 件展示品</p></div><div className="crystal-grid">{items.map(item => <CrystalItem key={item.id} item={item} />)}</div>{!items.length && <div className="empty"><p>目前沒有符合條件的商品。</p><button className="button secondary" onClick={() => { setCategory('all'); setStatus('all'); }}>重設篩選</button></div>}<p className="notice">庫存人工維護，非即時同步。{site.demoMode && 'Demo 狀態不代表真實庫存；'}實際庫存請以 LINE 確認。</p></section></div>;
}
function CrystalDetail() {
  const { slug } = useParams();
  const item = filterCrystals(crystals).find(item => item.slug === slug);
  const [selected, setSelected] = useState(0);
  if (!item) return <NotFound />;
  return <div className="page"><Link to="/crystals" className="text-link back-link">← 返回水晶選品</Link><div className="detail-layout"><div><Media src={item.images[selected]} alt={`${item.name}${item.isSample ? '原創繪製示意圖' : '商品照片'}`} priority className="detail-image" />{item.images.length > 1 && <div className="image-options">{item.images.map((src, i) => <button key={src} aria-label={`查看第 ${i + 1} 張圖片`} aria-pressed={selected === i} onClick={() => setSelected(i)}><Media src={src} alt="" /></button>)}</div>}<p className="muted">{item.isSample ? 'Demo 原創繪製示意，非店內實物。' : '天然礦石的顏色與紋理請以實物確認。'}</p></div><div><h1>{item.name}</h1><p>{item.isSample ? '示意狀態：' : ''}{statusLabels[item.status]}</p>{item.isSample && <p className="notice">Demo 示意資料・非真實庫存</p>}<p>{item.description}</p><dl><dt>商品編號</dt><dd>{item.id}</dd><dt>尺寸</dt><dd>{item.sizeText || '待店家提供'}</dd><dt>重量</dt><dd>{item.weightGrams === null ? '待店家提供' : `${item.weightGrams} g`}</dd><dt>價格</dt><dd>{item.priceTwd === null ? '待店家確認' : `NT$ ${item.priceTwd.toLocaleString()}（運費及其他費用另確認）`}</dd><dt>資料更新</dt><dd>{item.updatedAt}（人工維護）</dd></dl><p>實際庫存請以 LINE 確認。{item.status === 'sold' ? '此品項標示已售出，可詢問類似商品。' : item.status === 'reserved' ? '此品項洽談或保留中，請先確認是否可購。' : ''}</p><h2>詢問這件商品</h2><p className="summary-text">{buildCrystalMessage(item)}</p><LineInquiry message={buildCrystalMessage(item)} /></div></div></div>;
}
function About() {
  const contacts = [['公開店址', site.address], ['營業時間', site.businessHours], ['聯絡電話', site.phone]];
  const socials = [['Instagram', site.instagramUrl], ['Facebook', site.facebookUrl], ['地圖', site.mapUrl]];
  return <div className="page"><div className="page-intro"><h1>自然的紋理，<br />手作的印記。</h1><p>一處認識礦石與刻印的起點。<br />{site.demoMode ? '目前是待店家補齊資訊的 Demo 展示站。' : site.tagline}</p></div><section className="about-story"><h2>關於{site.brandName}</h2><div><p>{site.story}</p>{site.demoMode && <p>「{site.brandName}」為暫用名稱。未宣稱店家年資、認證、顧客評價或服務數量。</p>}</div></section><section className="section notes"><h2>店家資訊</h2><div><dl>{contacts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value || '待店家提供'}</dd></div>)}</dl><p>LINE：{site.lineOfficialId || '尚未設定'}</p>{socials.filter(([, url]) => /^https:\/\//.test(url)).map(([name, url]) => <a className="text-link" key={name} href={url} target="_blank" rel="noopener noreferrer">{name} ↗</a>)}<Link className="button" to="/engraving/inquiry">整理刻印需求 ↗</Link></div></section><section id="privacy" className="section notes"><h2>隱私與交易提醒</h2><div><p>{site.privacyNote}</p><p>只有在您點擊 LINE 連結後，摘要才透過 LINE URL 帶入；之後的資料處理由 LINE 平台及店家依其政策辦理。本站沒有分析追蹤、付款、訂單資料庫或自動訊息功能。</p><p>{site.tradePolicy}</p></div></section><section className="section notes"><h2>影像素材</h2><p>{site.visuals.sourceNote}</p></section></div>;
}
function NotFound() { return <div className="page not-found"><h1>這一頁，還沒刻好。</h1><p>找不到您要的頁面或商品，可能已移除或尚未公開。</p><Link to="/" className="button">回到首頁 ↗</Link></div>; }

function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const titles: Record<string, string> = { '/': '天然原礦・刻印工藝', '/engraving': '刻印服務', '/engraving/inquiry': '刻印需求詢價', '/crystals': '水晶選品', '/about': '關於我們' };
    const item = filterCrystals(crystals).find(item => pathname === `/crystals/${item.slug}`);
    document.title = `${titles[pathname] || item?.name || '找不到頁面'}｜${site.brandName}${site.demoMode ? ' Demo' : ''}`;
    if (hash) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    else window.scrollTo({ top: 0, behavior: 'instant' });
    const main = document.getElementById('main');
    main?.focus({ preventScroll: true });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.animate([{ opacity: 0.45, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 650, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'none' });
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname, hash]);
  return null;
}
export default function App() {
  return <><a className="skip-link" href="#main" onClick={e => { e.preventDefault(); document.getElementById('main')?.focus(); }}>跳至主要內容</a><Header />{site.demoMode && <div className="demo-banner">Demo 展示站 · 品牌、服務與商品皆待店家確認{!site.lineOfficialId && ' · LINE 尚未設定'}</div>}<main id="main" tabIndex={-1}><Routes><Route path="/" element={<Home />} /><Route path="/engraving" element={<Engraving />} /><Route path="/engraving/inquiry" element={<InquiryPage />} /><Route path="/crystals" element={<Crystals />} /><Route path="/crystals/:slug" element={<CrystalDetail />} /><Route path="/about" element={<About />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /><RouteEffects /></>;
}
