export const siteConfig = {
  brandName: '石與印', brandEnglishName: 'Stone & seal', tagline: '天然原礦・刻印工藝', demoMode: true,
  description: '天然水晶原礦與印章刻印。填寫需求、檢視詢價摘要，再自行透過 LINE 聯繫店家。',
  visuals: {
    heroImage: 'images/hero.webp', heroAlt: '白水晶結晶與石材方章的原創繪製示意', heroCredit: 'Demo 原創示意圖',
    sealImage: 'images/seal.webp', sealAlt: '石材印章與印面原創繪製示意', sealCredit: '刻印工藝示意 · 非實際作品',
    credit: '原創繪製示意圖 · 待換店家實拍',
    sourceNote: '礦石與刻印圖為本專案原創向量繪製後轉製的 WebP 圖片，並非商品攝影，未使用外部圖庫素材。專案原有名片與標誌保留於 image/，尚待店家確認後使用。',
  },
  tradePolicy: '交易、校稿、付款、修改／取消及售後政策待店家提供，請先與店家確認，勿依示意內容付款。',
  lineOfficialId: '', lineAddFriendUrl: '', instagramUrl: '', facebookUrl: '', phone: '', address: '', businessHours: '', mapUrl: '',
  siteUrl: import.meta.env?.VITE_SITE_URL || '', shippingSupported: false, pickupSupported: false,
  inquiryLimits: { text: 40, notes: 300, quantity: 99 },
  story: '品牌故事待店家提供。目前呈現天然礦石與印章刻印的 Demo 體驗，所有示意品項、選項與流程均待店家確認。',
  privacyNote: '表單只在目前頁面的記憶體中處理，不儲存至瀏覽器或後端。請勿填寫身分證、電話、地址等敏感資料；刻印文字若包含個資，請自行評估是否適合透過 LINE 傳送。',
};
