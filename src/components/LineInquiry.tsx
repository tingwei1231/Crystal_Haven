import { useState } from 'react';
import { siteConfig } from '../config/site';
import { buildLineInquiryUrl, officialAccountUrl } from '../lib/line';

export function LineInquiry({ message }: { message: string }) {
  const [notice, setNotice] = useState('');
  const [manual, setManual] = useState(false);
  const draftUrl = buildLineInquiryUrl(siteConfig.lineOfficialId, message);
  const accountUrl = officialAccountUrl(siteConfig.lineOfficialId, siteConfig.lineAddFriendUrl);
  const long = (draftUrl?.length || 0) > 2000;
  async function copy() {
    try {
      if (!navigator.clipboard) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText(message);
      setNotice('已複製詢價內容。請在 LINE 貼上，確認後自行傳送。');
    } catch {
      setManual(true);
      setNotice('無法自動複製，請選取下方文字手動複製。');
    }
  }
  return <div className="line-actions">
    <p>下一步將開啟 LINE，請在對話視窗確認後按下傳送。</p>
    {!draftUrl && <p className="notice">LINE 尚未設定。Demo 無法開啟官方帳號，您仍可複製詢價內容。</p>}
    {long && <p className="notice">內容較長，建議先複製，再開啟官方帳號貼上，避免草稿被截斷。</p>}
    <div className="actions">
      {draftUrl ? <a className="button" href={draftUrl} target="_blank" rel="noopener noreferrer">開啟 LINE 詢價 ↗</a> : <button className="button" disabled>開啟 LINE 詢價（未設定）</button>}
      <button className="button secondary" type="button" onClick={copy}>複製詢價內容</button>
      {accountUrl ? <a href={accountUrl} target="_blank" rel="noopener noreferrer" className="text-link">開啟 LINE 官方帳號 ↗</a> : <button className="text-link" disabled>官方帳號未設定</button>}
    </div>
    <p role="status" className="copy-status">{notice}</p>
    {manual && <label>手動複製摘要<textarea readOnly value={message} rows={12} onFocus={event => event.currentTarget.select()} /></label>}
    <p className="muted">網站不會自動傳送訊息、成立訂單或保留商品；價格與交期由店家人工確認。</p>
  </div>;
}
