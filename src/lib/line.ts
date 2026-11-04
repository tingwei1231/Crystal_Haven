export function isValidLineId(id: string) {
  return /^@[a-z0-9._-]{3,30}$/i.test(id.trim()) && !/your|placeholder|demo|example/i.test(id);
}
export function buildLineInquiryUrl(lineId: string, message: string) {
  if (!isValidLineId(lineId)) return null;
  return `https://line.me/R/oaMessage/${encodeURIComponent(lineId.trim())}/?${encodeURIComponent(message)}`;
}
export function officialAccountUrl(lineId: string, addFriendUrl = '') {
  if (!isValidLineId(lineId)) return null;
  try {
    const url = new URL(addFriendUrl);
    if (url.protocol === 'https:' && ['line.me', 'lin.ee'].includes(url.hostname)) return url.href;
  } catch { /* Fall back to the validated public account ID. */ }
  return `https://line.me/R/ti/p/${encodeURIComponent(lineId.trim())}`;
}
export function buildCrystalMessage(item: { id: string; name: string; isSample: boolean }) {
  return `您好，我想詢問水晶商品：\n商品編號：${item.id}\n商品名稱：${item.name}${item.isSample ? '（Demo 示意資料，非真實庫存）' : ''}\n請協助確認實際庫存、價格與交付方式。\n此訊息為詢價，正式內容以店家回覆為準。`;
}
