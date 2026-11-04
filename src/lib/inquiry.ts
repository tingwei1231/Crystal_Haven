import type { Inquiry, Service } from '../types.ts';
export const initialInquiry: Inquiry = { service: '', material: '', size: '', font: '', text: '', quantity: '1', delivery: '', date: '', notes: '' };
export function validateInquiry(values: Inquiry, services: Service[], limits = { text: 40, notes: 300, quantity: 99 }, deliveryOptions = ['未決定']) {
  const errors: Partial<Record<keyof Inquiry, string>> = {};
  const service = services.find(item => item.enabled && item.id === values.service);
  if (!service) errors.service = '請選擇服務類型。';
  if (!values.text.trim() || Array.from(values.text.trim()).length > limits.text) errors.text = `請輸入 1–${limits.text} 字的刻印文字。`;
  if (!/^\d+$/.test(values.quantity) || Number(values.quantity) < 1 || Number(values.quantity) > limits.quantity) errors.quantity = `數量須為 1–${limits.quantity} 的整數。`;
  if (values.notes.length > limits.notes) errors.notes = `備註請勿超過 ${limits.notes} 字。`;
  if (service) {
    if (values.material && !service.availableMaterials.includes(values.material)) errors.material = '請重新選擇材質。';
    if (values.size && !service.availableSizes.includes(values.size)) errors.size = '請重新選擇尺寸。';
    if (values.font && !service.availableFonts.includes(values.font)) errors.font = '請重新選擇字體。';
  }
  if (values.delivery && !deliveryOptions.includes(values.delivery)) errors.delivery = '請重新選擇交付方式。';
  if (values.date) {
    const parsed = new Date(`${values.date}T00:00:00`);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const normalized = `${parsed.getFullYear()}-${String(parsed.getMonth()+1).padStart(2,'0')}-${String(parsed.getDate()).padStart(2,'0')}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date) || !Number.isFinite(parsed.getTime()) || parsed < today || normalized !== values.date) errors.date = '請選擇今天或之後的有效日期。';
  }
  return errors;
}
export function buildInquiryMessage(values: Inquiry, services: Service[]) {
  const service = services.find(item => item.id === values.service);
  return `您好，我想詢問印章刻印服務：${service?.isSample ? '\n（Demo 示意服務，承接範圍待店家確認）' : ''}\n服務類型：${service?.name || ''}\n材質：${values.material || '請店家推薦'}\n尺寸：${values.size || '不確定'}\n刻印內容：${values.text.trim()}\n風格：${values.font || '請店家建議'}\n數量：${Number(values.quantity)}\n交付方式：${values.delivery || '未決定'}\n預計需要日期：${values.date || '未指定'}\n備註：${values.notes.trim() || '無'}\n\n此訊息為詢價需求，正式內容、價格與交期以店家回覆為準。`;
}
