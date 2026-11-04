import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { services } from '../store';
import { siteConfig } from '../config/site';
import { buildInquiryMessage, initialInquiry, validateInquiry } from '../lib/inquiry';
import type { Inquiry } from '../types';
import { LineInquiry } from '../components/LineInquiry';

export default function InquiryPage() {
  const location = useLocation();
  const chosen = typeof location.state?.serviceId === 'string' ? location.state.serviceId : '';
  const [values, setValues] = useState<Inquiry>({ ...initialInquiry, service: services.some(item => item.id === chosen) ? chosen : '' });
  const [errors, setErrors] = useState<Partial<Record<keyof Inquiry, string>>>({});
  const [message, setMessage] = useState('');
  const summary = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const service = services.find(item => item.id === values.service);
  const deliveryOptions = ['未決定', ...(siteConfig.pickupSupported ? ['門市取件'] : []), ...(siteConfig.shippingSupported ? ['配送'] : [])];
  const max = siteConfig.inquiryLimits;
  function update(key: keyof Inquiry, value: string) {
    setValues(current => key === 'service' ? { ...current, service: value, material: '', size: '', font: '' } : { ...current, [key]: value });
    setMessage('');
    setErrors(current => ({ ...current, [key]: undefined }));
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    const found = validateInquiry(values, services, max, deliveryOptions);
    setErrors(found);
    if (Object.keys(found).length) {
      requestAnimationFrame(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    setMessage(buildInquiryMessage(values, services));
    requestAnimationFrame(() => summary.current?.focus());
  }
  function field(key: keyof Inquiry) {
    return { id: key, name: key, value: values[key], onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => update(key, event.target.value), 'aria-invalid': Boolean(errors[key]), 'aria-describedby': `${key}-hint ${errors[key] ? `${key}-error` : ''}`.trim() };
  }
  function error(key: keyof Inquiry) { return errors[key] && <span id={`${key}-error`} className="error" role="alert">{errors[key]}</span>; }
  function select(key: keyof Inquiry, label: string, options: string[], fallback: string) {
    return <div className="field"><label htmlFor={key}>{label}</label><select {...field(key)}><option value="">{fallback}</option>{options.map(option => <option key={option}>{option}</option>)}</select><span id={`${key}-hint`} className="hint">選項不確定時可請店家建議。</span>{error(key)}</div>;
  }
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  return <div className="page inquiry-page">
    <div className="page-intro"><h1>把想法，<br />整理成一方印。</h1><p>填寫刻印需求 → 檢查摘要 → 自行開啟 LINE 詢價。{siteConfig.demoMode && <><br />目前為 Demo，服務選項待店家確認。</>}</p></div>
    <div className="inquiry-layout">
      <form onSubmit={submit} noValidate ref={form} className="inquiry-form" aria-label="刻印需求表單">
        <h2>刻印需求</h2>
        {!services.length && <p className="notice">目前尚無開放詢價的服務，請待店家更新。</p>}
        <div className="field"><label htmlFor="service">服務類型（必填）</label><select {...field('service')} required><option value="">請選擇服務</option>{services.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select><span className="hint" id="service-hint">{service?.isSample || siteConfig.demoMode ? 'Demo 選項不代表店家已確認承接。' : '特殊需求請於備註說明，交由店家確認。'}</span>{error('service')}</div>
        <div className="form-pair">{select('material', '材質', service?.availableMaterials || [], '請店家推薦')}{select('size', '尺寸', service?.availableSizes || [], '不確定')}</div>
        <div className="field"><label htmlFor="text">刻印文字（必填）</label><textarea {...field('text')} required rows={3} /><span className="hint" id="text-hint">1–{max.text} 字，送出前請確認文字；不需填寫其他個資。</span>{error('text')}</div>
        <div className="form-pair">{select('font', '字體／風格', service?.availableFonts || [], '請店家建議')}<div className="field"><label htmlFor="quantity">數量（必填）</label><input {...field('quantity')} type="number" min={1} max={max.quantity} step={1} required /><span className="hint" id="quantity-hint">1–{max.quantity} 個，僅供詢價。</span>{error('quantity')}</div></div>
        <div className="form-pair">{select('delivery', '交付方式', deliveryOptions, '未決定')}<div className="field"><label htmlFor="date">希望完成日期</label><input {...field('date')} type="date" min={todayString} /><span className="hint" id="date-hint">僅供評估，不承諾交期。</span>{error('date')}</div></div>
        <div className="field"><label htmlFor="notes">備註</label><textarea {...field('notes')} rows={4} /><span className="hint" id="notes-hint">最多 {max.notes} 字。可描述用途與希望的風格。</span>{error('notes')}</div>
        <button className="button" type="submit" disabled={!services.length}>檢查詢價摘要 ↗</button>
      </form>
      <aside className="inquiry-aside">
        <h2>先詢價，再確認。</h2><p>材質、印面尺寸與字體都會影響製作方式。還不確定的選項，留給店家一起討論。</p>
        <h3>您的隱私</h3><p>{siteConfig.privacyNote}</p><p>重新整理或離開表單頁會清除目前內容。</p>
        <div ref={summary} tabIndex={-1} className="summary" aria-label="詢價摘要">
          <h2>詢價摘要</h2>
          {message ? <><p className="summary-text">{message}</p><LineInquiry message={message} /></> : <p>填寫完成後，按「檢查詢價摘要」。這裡會呈現您準備傳給店家的內容。</p>}
        </div>
      </aside>
    </div>
  </div>;
}
