# 水晶原礦 × 印章刻印品牌網站 — Product & Engineering Spec

> Version: 1.0 (MVP)  
> Last updated: 2026-11-04  
> Status: Ready for Codex implementation  
> Language: 繁體中文（zh-TW）  
> Working project name: `stone-seal-studio`（暫定，品牌名稱由店家日後替換）

## 0. Codex 執行指令（必讀）

你是一位負責產品設計與前端實作的資深工程師。請依照本 `spec.md` 製作**可運作、可測試、可部署到 GitHub Pages** 的網站，而非僅有靜態視覺稿。

1. 先讀取本規格，再查閱已安裝的 `design-taste-frontend` skill，並優先遵循其設計工作流；若該 skill 未安裝，請提示安裝方式並繼續完成可執行的基礎專案，不要捏造執行結果。
2. 先完成可用的核心流程（刻印服務 → 填寫需求 → 檢查摘要 → 開啟 LINE 草稿），再處理水晶展示與進階動畫。
3. 採用 React + TypeScript + Vite + Tailwind CSS，部署於 GitHub Pages。不要為 MVP 建立後端、資料庫、登入、線上付款或 webhook。
4. 請使用**真實照片或可合法使用的展示素材**，清楚區分樣本圖片與正式商品照片，不可捏造店家認證、顧客評價、成交量或現貨狀態。
5. 不可在瀏覽器 bundle、公開 GitHub repository 或網站靜態檔案中包含金鑰、Channel Access Token、Channel Secret、客戶個資或私人訂單。
6. 每完成一個階段，執行 build / lint / relevant tests；如環境允許，以實際瀏覽器檢查手機、平板與桌面版。
7. 如果商家資料未提供，使用有標註的 placeholder，集中於單一設定檔供替換，不要把假資料寫死在元件中。
8. 避免過度工程化。所有使用者可見的 CTA 必須真實可用；不能把「已送出訂單」當成開啟 LINE 的結果。

---

## 1. 專案背景與目標

### 1.1 背景

家族經營實體店面，業務主要是：

- **主要**：印章／刻印服務（依店內實際提供的種類調整）
- **次要**：水晶原礦與天然石商品販售／展示

目前沒有系統性線上宣傳。第一階段以低成本品牌形象網站讓潛在客戶找得到服務、理解選項、提出需求，並導流至 LINE 官方帳號人工承接交易。

### 1.2 業務目標

1. 增加刻印服務的有效詢價數。
2. 減少店家在 LINE 中反覆詢問顧客印章資訊的時間。
3. 建立值得信任的品牌形象，帶動水晶新品關注。
4. 測試線上通路需求；累積足夠詢價與交易經驗後，再評估付款、庫存與自動化系統。

### 1.3 MVP 成功指標（先記錄，不要求本版全面自動追蹤）

- 每週網站造訪量（若未接分析工具，可先透過平台或後續同意後加裝分析）
- 「前往 LINE 詢價」按鈕點擊數（如未安裝分析，標記為尚未量測）
- 實際 LINE 詢價對話數（店家人工統計）
- 有效詢價／成交／完成訂單數（店家人工統計）
- 最常被詢問的印章類型與常見客服問題

> 不可假設 LINE 草稿開啟就等於訂單送出或成交。第一階段沒有跨平台的完整轉換歸因。

## 2. 產品定位與目標受眾

### 2.1 品牌定位

「工藝感 × 自然礦石 × 現代簡約」：可信賴、細緻、親切的在地工藝店，而非一般的大型電商模板。

- 印章：專業、安心、流程透明、材質與字體好理解。
- 水晶：以真實的天然紋理、色彩與光線呈現獨特性。
- 文字語氣：自然、準確、避免過度行銷與功效保證。

### 2.2 客群

- 需要姓名章、個人用章、禮贈印章等的客戶（僅列出店家確實承接者）
- 想比較材質、大小、字體、價格和交期的顧客
- 對天然水晶原礦／特色礦石有興趣的收藏者
- 從手機搜尋、社群、Google 商家檔案或實體店 QR Code 進站的人

## 3. 版本與範圍

### P0 — 必須在 MVP 上線

- RWD、SEO 基礎、無障礙、良好效能
- 首頁品牌介紹、印章服務入口、水晶新品精選、LINE CTA
- 刻印服務列表及詳細說明（種類／材質／文字注意事項）
- **刻印需求表單與 LINE 預填詢價訊息**
- 水晶商品列表、商品詳情、手動維護的庫存狀態
- 店家介紹、營業資訊（由店家提供）、常見問題、隱私提醒
- 集中化設定（店名、LINE ID、社群、店址、聯絡方式等）
- GitHub Pages 自動部署

### P1 — MVP 後再做

- 刻印字體示意預覽（僅展示用途；不保證最終刻字效果）
- 可編輯／檢視的訂單編碼和 LINE 客服回覆模板
- 更多作品集／範例案例、內容文章、Google 商家檔案導流
- 輕量分析（需要先訂隱私告知與同意策略）
- 用 GitHub issue / PR 或小型 CMS 更新商品（必須有權限控管）
- 特定水晶系列更完整的故事敘事和動畫

### P2 — 有穩定訂單後

- 真正的 LINE Messaging API Bot、HTTPS webhook、訂單狀態管理
- 後端、資料庫、管理員權限、庫存同步
- 訂單校稿、狀態通知、付款／物流整合
- 可評估 LIFF、小型客服後台、優惠券
- 金流申請、個資與交易法規檢視、維運監控

### 明確排除於 MVP

登入／註冊、會員中心、網頁直接付款、信用卡資訊蒐集、即時庫存保證、客製化用章正式法務審核、自動化 LINE 訊息發送、聊天機器人 webhook、商品購物車與庫存扣減。

## 4. 網站資訊架構與路由

使用 `react-router-dom`，部署時必須顧及 GitHub Pages 的 SPA 深層路由限制；**建議 MVP 採 HashRouter**，或另行設計可在 GitHub Pages 正確重新整理頁面的靜態路由策略。前者 URL 如 `/#/engraving`，可免除 404 問題。

| Path | 頁面 | P0 內容 |
| --- | --- | --- |
| `/` | 首頁 | Hero、核心價值、刻印 CTA、精選水晶、工藝介紹、FAQ、Footer |
| `/engraving` | 刻印服務 | 服務分類、材質／尺寸／字體說明、流程、注意事項、CTA |
| `/engraving/inquiry` | 刻印詢價 | 多步驟／單頁表單、驗證、訊息摘要、開啟 LINE |
| `/crystals` | 水晶展示 | 分類／狀態篩選（簡易）、新品、商品卡 |
| `/crystals/:slug` | 商品詳情 | 真實圖片、名稱、規格、價格（有資料才顯示）、庫存狀態、LINE 詢問 |
| `/about` | 關於我們 | 店家故事、工藝與信任資訊、聯絡方式 |
| `*` | 找不到頁面 | 回首頁連結 |

導覽列：品牌 Logo、刻印服務、水晶選品、關於我們、「LINE 詢價」主 CTA。手機版需有可用的 menu。

## 5. 核心業務流程（MVP）

### 5.1 刻印詢價（最優先開發）

1. 顧客從首頁或刻印服務頁進入「開始刻印詢價」。
2. 選擇服務類型（根據 `engraving-services.json` 的有效資料）。
3. 選擇材質、尺寸、字體／風格（允許「不確定，請店家建議」）。
4. 輸入預計刻印文字，選填數量、需求說明、希望完成時間或交付方式。
5. 前端驗證，顯示**清楚的詢價摘要**；敏感刻印內容需提醒使用者自行評估是否適合透過 LINE 傳送。
6. 點「開啟 LINE 詢價」，透過 LINE 官方支援的 URL scheme 開啟官方帳號聊天視窗並預填摘要文字。
7. **顧客須在 LINE 內自行確認並按下傳送**。此階段網站未接單、未保留訂單、無金流，也不知道對方是否真的按傳送。
8. 店家人工確認可製作性、正式報價、校稿、付款、交付與進度。

#### 表單建議欄位

| 欄位 | 必填 | 驗證／說明 |
| --- | --- | --- |
| 服務類型 | 是 | 資料驅動選項，至少一項 |
| 材質 | 否 | 允許「請推薦」 |
| 尺寸 | 否 | 允許「不確定」 |
| 刻印文字 | 是 | 去前後空白，限制合理長度（預設 1–40 字，可設定；特殊需求由人工確認） |
| 字體／風格 | 否 | 只列出確實可提供選項 |
| 數量 | 是 | 整數，1–99（可調整） |
| 交付方式 | 否 | 門市取件／配送／未決定，依實際支援配置 |
| 希望完成日期 | 否 | 不承諾交期，僅供店家評估 |
| 備註 | 否 | 限制文字長度，避免網址異常冗長 |

**不要在 MVP 表單要求顧客填寫完整姓名、電話、身分證、地址、生日、印鑑證明等個資**。若正式作業需要敏感資訊，在建立可信賴的資料處理流程後再由店家透過適當方式蒐集。

#### LINE URL 實作規則

使用官方文件的形式：

```ts
export function buildLineInquiryUrl(lineId: string, message: string) {
  const encodedId = encodeURIComponent(lineId.trim());
  const encodedMessage = encodeURIComponent(message);
  return `https://line.me/R/oaMessage/${encodedId}/?${encodedMessage}`;
}
```

- `lineId` 由公開的 `src/config/site.ts` 取得，例如 `@YOUR_LINE_ID`（placeholder，務必替換）。
- 不可硬編碼任何 LINE Channel Secret 或 Access Token。
- 確認 LINE 連結在手機及桌機環境的實際行為；設置「複製詢價內容」及「開啟 LINE 官方帳號」備援按鈕。
- LINE URL 長度可能受平台與瀏覽器環境影響，對長內容應提供複製方式；不得宣稱 LINE 已收到訂單。
- LINE 按鈕上方文字：「下一步將開啟 LINE，請在對話視窗確認後按下傳送。」
- 若沒有設定合法的 LINE ID，顯示提示並禁用會導向錯誤連結的功能。
- `window.open` / external navigation 必須由使用者點擊觸發，避免被瀏覽器阻擋。
- 對於商品直接詢問，同樣產生含商品編號／名稱的預填訊息。

#### 詢價訊息範例

```text
您好，我想詢問印章刻印服務：
服務類型：姓名印章
材質：請店家推薦
尺寸：不確定
刻印內容：（顧客自行填寫）
風格：傳統字體
數量：1
交付方式：門市取件
預計需要日期：未指定
備註：請協助報價與確認製作時間

此訊息為詢價需求，正式內容與價格以店家回覆為準。
```

### 5.2 水晶展示流程

1. 首頁展示 3–6 個精選水晶商品及明確的「查看全部」入口。
2. 顧客開啟商品詳情，查看真實圖片、實物特徵、尺寸、重量（若有）、價格（若有）、商品狀態。
3. 按「透過 LINE 詢問這件商品」，在 LINE 預填產品編號和名稱。
4. 店家人工回覆最新存貨、實際狀態、付款與交付方式。

庫存狀態：`available`（可詢問）／`reserved`（洽談或保留中）／`sold`（已售出）／`hidden`（不公開）；僅展示前 3 種，`hidden` 不呈現。網站庫存為**人工更新且非即時同步**；詳情頁要提醒「實際庫存請以 LINE 確認」。

商品售價如無法確認可先不標，勿提供假價格；價格如有標示須註明是否含運／其他費用，以免誤導。

## 6. 設計規範（Taste Skill + Apple 式敘事）

### 6.1 設計主張

以高品質產品攝影、細緻字體、留白與逐步展開的敘事節奏打造精品工藝感。可參考 Apple 產品頁的**原則**（清楚焦點、節奏、精緻微互動），但不得複製其文案、版面、圖片或品牌識別。

### 6.2 建議視覺方向

- 預設：溫潤石材／紙張色調，深墨色文字，選擇一種「礦物感」點綴色（如墨綠或岩金）。
- 中英文字體：搭配可合法使用、具繁體中文字形的字型；避免造成額外大型下載。
- Hero：大幅印章與礦石近距離照片 + 明確價值主張 + 主要刻印 CTA。
- 刻印服務：卡片、材質比較、工藝細節、清晰流程。
- 水晶展示：攝影主導、商品單獨佔據視覺焦點、適度留白。
- 手機先行設計，商務資訊可讀性高於純炫技效果。

### 6.3 動態效果

**P0 動畫**：

- Hero 首屏漸入、標題分段進場。
- 水晶區塊 scroll-trigger reveal、輕微視差。
- 商品 hover 微動、圖片平滑切換（僅已有圖片時）。
- 導覽列切換時一致的 transition。
- 使用 GSAP + ScrollTrigger（依需要）與 CSS transitions；注意 SSR 不涉及本案。

**不要在 P0 開發**：大量 WebGL、全站 Scroll-Jacking、昂貴 3D 特效、超長無法跳過的進場動畫。

**效能／無障礙**：

- `prefers-reduced-motion: reduce` 必須關閉非必要動畫。
- 滑動不應被動畫卡住，內容不能因 JS 動畫失敗而永久不可見。
- 避免 layout thrashing，優先 animate `transform` 與 `opacity`。
- 使用 responsive `srcset` / 轉成 WebP 或 AVIF、lazy loading；Hero 首圖需優先載入。
- 手機低效能設備降級顯示，不以動畫阻塞關鍵 CTA。
- 不使用未經授權的 Apple／品牌圖片。

### 6.4 引入指定 skill（必須在建置前確認）

Repository：https://github.com/Leonxlnx/taste-skill

依該專案 2026-11-04 可見 README，提供以下兩種安裝方式：

**方法 A：npx skills 安裝**

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

**方法 B：Codex plugin（若目前 Codex 支援此指令）**

```bash
codex plugin marketplace add Leonxlnx/taste-skill
codex plugin add taste-skill@taste-skill
```

Codex plugin 安裝後重新開始 Codex session。skill README 目前標示需 Node.js 22+ 與 Chrome／Edge／Chromium 供其檢查流程使用。

設計落地要求：

1. 先讀 skill 實際檔案，採用其提出的方向探索與真實瀏覽器檢查流程。
2. 產出一個明確的 creative direction（含一句核心概念、字體、色彩、影像風格、排版節奏）。
3. 不要做成通用 AI 產生的漸層科技 Landing Page。
4. 如無真實店家商品圖，允許使用**清楚標示為示意圖**的合法圖片，並保留之後替換照片的欄位；商業上線前完成素材檢核。
5. 用手機 390px、平板 768px、桌面 1440px 檢查版面；至少修正顯著的溢出、誤導式 CTA 與不合理留白。
6. 使用 skill 是設計品質要求，**不得讓它改寫核心交易流程、加入未要求的後端或自動聲稱圖片具商業授權**。

## 7. 技術選型

| 用途 | 技術 |
| --- | --- |
| 應用程式 | Vite + React + TypeScript |
| 樣式 | Tailwind CSS + 少量 CSS variables |
| 導覽 | React Router（優先 HashRouter） |
| 動畫 | GSAP + ScrollTrigger；簡易互動 CSS 即可 |
| Icons | Lucide React |
| 資料 | 本機型別化 JSON / TypeScript 常數 |
| 表單 | React Hook Form + Zod（如過度複雜，可等價實作） |
| 測試 | Vitest + React Testing Library；視需要 Playwright smoke test |
| 檢查 | ESLint + TypeScript typecheck |
| 部署 | GitHub Actions → GitHub Pages |
| 客服／詢價 | LINE Official Account 深連結（不是 Messaging API） |

採用依賴的最新穩定相容版本；安裝時請檢查實際官方文件與 lockfile，不依賴不明確的固定版本號。

### 7.1 設定檔

`src/config/site.ts`：

```ts
export const siteConfig = {
  brandName: '品牌名稱待設定',
  tagline: '天然礦石與細緻刻印工藝',
  lineOfficialId: '', // 公開 LINE 官方帳號 ID，例如 @xxxx
  lineAddFriendUrl: '', // 官方帳號後台產生的加好友連結（若有）
  instagramUrl: '',
  facebookUrl: '',
  phone: '',
  address: '',
  businessHours: '',
  mapUrl: '',
  siteUrl: '',
  shippingSupported: false,
  pickupSupported: true,
};
```

空資料不渲染虛假資訊；缺少 `lineOfficialId` 時顯示「LINE 尚未設定」的開發警示。

### 7.2 商品資料結構

`src/data/crystals.json`（示意，**不可冒充實際店家庫存**）：

```json
[
  {
    "id": "CR-001",
    "slug": "sample-quartz-001",
    "name": "水晶商品示意名稱",
    "category": "quartz",
    "description": "待替換為店內實際商品資料",
    "priceTwd": null,
    "status": "available",
    "featured": true,
    "isSample": true,
    "images": ["/images/crystals/sample-quartz.webp"],
    "sizeText": null,
    "weightGrams": null,
    "updatedAt": "2026-11-04"
  }
]
```

**注意**：圖片路徑需透過 Vite `BASE_URL` 相容的資源 helper 處理，避免 GitHub Pages 子路徑部署時 404。商品建議用 `public/images/...`，並檢查 URL 正確生成；若 `isSample` 為 true，頁面顯示「示意資料」。不需要在公開前留下假的真實庫存。

`src/data/engraving-services.json` 建議包含 `id`、`name`、`description`、`availableMaterials`、`availableSizes`、`availableFonts`、`startingPriceTwd`（nullable）、`turnaroundNote`、`images`、`enabled`。選項只顯示真正可提供的類別，不可擅自假設能承接公司章、印鑑證明相關業務或其他特殊業務。

### 7.3 專案目錄（建議）

```text
stone-seal-studio/
├── .github/workflows/deploy.yml
├── public/
│   ├── images/
│   │   ├── engraving/
│   │   ├── crystals/
│   │   └── brand/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/App.tsx
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   ├── engraving/
│   │   └── crystals/
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── EngravingPage.tsx
│   │   ├── InquiryPage.tsx
│   │   ├── CrystalsPage.tsx
│   │   ├── CrystalDetailPage.tsx
│   │   ├── AboutPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── config/site.ts
│   ├── data/engraving-services.json
│   ├── data/crystals.json
│   ├── lib/line.ts
│   ├── lib/assets.ts
│   ├── styles/globals.css
│   ├── types/
│   └── main.tsx
├── tests/
├── .env.example
├── README.md
├── spec.md
├── package.json
├── vite.config.ts
└── tsconfig.json
```

可依實作簡化目錄，維持易讀與可維護即可。

## 8. 非功能需求

### 8.1 可用性

- Mobile-first，至少在 360px、390px、768px、1440px 寬度不橫向溢出。
- 首頁與重要服務頁 3 次點擊內可找到 LINE 詢價入口。
- 表單各欄位要有 label、錯誤提示、鍵盤可操作；錯誤時不清空資料。
- 重要 CTA 在手機容易點擊，互動目標建議至少 44×44 CSS px。
- 所有圖片有適切 `alt`，裝飾圖 `alt=""`。

### 8.2 SEO 與信任

- 站點標題、description、Open Graph 封面、favicon、canonical URL；依部署環境設定真實網址。
- 首頁 h1 唯一；各頁有清楚標題層級。
- 基礎 `robots.txt`、`sitemap.xml`；**HashRouter 的頁面並非理想的獨立 SEO URL**。若 SEO 是主要獲客來源，P1 應轉向可預渲染或提供獨立 HTML 路徑的架構。
- 關於我們：可由店家提供成立背景、實體地址、營業時間、聯絡方式與商品實拍。
- FAQ：訂製流程、價格如何確認、可否修改、交期、取貨／寄送、天然原礦個體差異。
- 店家的退換貨、客製商品權益與個資告知，需在正式上線前依台灣適用法規及實際交易模式檢視，不可憑空填入法律保證。
- 禁止虛構「五星好評」、「已服務萬人」等未經證實的數字。

### 8.3 安全與隱私

- 不在 `localStorage`、URL query string、外部分析事件中保存客戶的刻印文字或敏感資訊。
- 不將表單內容送往任何自建或第三方後端；僅在顧客點擊後交由 LINE URL 草稿帶入。
- 警告使用者：預填文字尚未傳送，須自己點擊 LINE 送出。
- 外部連結使用安全的 `rel` 屬性；任何使用者輸入皆以純文字呈現，不使用 `dangerouslySetInnerHTML`。
- 公開 repo 不放店家私人電話、未同意公開的店址或敏感資料；只放店家核准對外公開的資訊。
- 若未來加入分析或廣告追蹤，先補充隱私告知及需要的同意機制。

### 8.4 效能目標（目標值，不宣稱已達成）

- Lighthouse mobile Performance ≥ 85（使用正式照片前後分別測）。
- Lighthouse Accessibility ≥ 90。
- LCP 優先朝 2.5 秒以內設計，避免大型首頁影片自動下載。
- 首圖適當預載，其餘圖片 Lazy Load；商品圖片壓縮且避免 layout shift。

## 9. GitHub Pages 部署規格

1. 使用 Vite `base` 設定，可從 `VITE_BASE_PATH` 或 repository name 安全切換；預設為 `/`，Project Pages 實際上線需設定 `/<repository>/`，自訂網域可改為 `/`。
2. GitHub Actions workflow 在 push 到 `main` 後：install（`npm ci`）、typecheck、lint、test、build、deploy `dist/`。
3. workflow 需使用 GitHub 官方 `actions/configure-pages`、`actions/upload-pages-artifact`、`actions/deploy-pages` 的目前相容版本。
4. GitHub repository 設定 Pages Source = GitHub Actions。
5. 確認重新整理首頁、刻印頁、水晶詳情路徑均可正常運作（HashRouter）。
6. 開發期可用 GitHub Pages 預設 URL；有品牌名稱後建議購買獨立網域以提升信任與未來遷移彈性。
7. `README.md` 記錄安裝、開發、部署、如何修改商品 JSON、如何替換 LINE ID、如何更換圖片及清除示意資料。

## 10. 驗收標準（Acceptance Criteria）

### AC-01：網站內容與路由

- [ ] 首頁包含明確刻印入口、3–6 項（或現有數量）精選商品、品牌與流程說明。
- [ ] 刻印服務頁清楚說明可承接服務、基本流程與詢價方式。
- [ ] 水晶列表與詳情資訊由資料檔渲染，新增資料不需修改 UI JSX。
- [ ] 未知網址有可返回首頁的頁面。

### AC-02：LINE 詢價

- [ ] 正常填完必填欄位才能開啟詢價 LINE 連結。
- [ ] 預填文字包含顧客的主要刻印選項和備註，中文與特殊字元正確 URL encode。
- [ ] 顧客送出前有可檢視摘要，並告知這是「詢價」而非「訂單已成立」。
- [ ] 有一鍵複製詢價內容的備援方式，複製成功／失敗有適當提示。
- [ ] 沒有設定 LINE ID 時不會導向無效連結。
- [ ] 水晶商品 CTA 產生正確商品 ID 與名稱。

### AC-03：體驗與設計

- [ ] 手機 390px、平板 768px、桌面 1440px 完成實際截圖檢視。
- [ ] 捲動動畫不影響閱讀，減少動態效果模式下仍能完整使用網站。
- [ ] 所有主要按鈕有實際用途，不會導向未實作頁面。
- [ ] 圖片錯誤時有替代顯示，缺少圖片不會破版。
- [ ] 真實商品和示意商品不會混淆。

### AC-04：工程品質

- [ ] `npm run dev`、`npm run build`、`npm run lint`、`npm run typecheck`、`npm run test` 可完成。
- [ ] 至少涵蓋 LINE URL encode、表單驗證、商品狀態篩選的單元測試。
- [ ] 成功部署至 GitHub Pages，檢查圖片與路由無 404。
- [ ] 所有尚未設定的店家資料均有清楚替換指引。
- [ ] GitHub repo 不包含金鑰、使用者私密資料或正式訂單。

## 11. 建議實作順序（Codex Task Breakdown）

### Phase A — 基礎建置

- [ ] 初始化 Vite React TS 專案，安裝所需套件與測試工具。
- [ ] 安裝並檢查指定 taste-skill（若環境可用）。
- [ ] 寫入設計方向、主題 Token、字體、色彩、Responsive breakpoints。
- [ ] 建立頁面路由與 Header / Footer / Mobile Nav。

### Phase B — 核心接單（最高優先）

- [ ] 建立可配置的刻印服務資料與服務頁。
- [ ] 建立刻印詢價表單、驗證和摘要。
- [ ] 實作 LINE 深連結、複製訊息、缺少 LINE ID 的錯誤狀態。
- [ ] 加入 URL builder 與表單測試。

### Phase C — 水晶展示

- [ ] 建立水晶資料型別與 JSON。
- [ ] 新品區、產品列表、詳情頁、庫存狀態、資料空狀態。
- [ ] 製作商品 LINE 詢問 CTA。
- [ ] 製作商品圖片管理與 GitHub Pages base-path helper。

### Phase D — 品牌設計與動態

- [ ] 按 taste-skill 設計方向完成高品質 Hero、產品敘事與精緻卡片。
- [ ] 使用 GSAP / CSS 實作適度的 reveal、parallax、hover 動畫。
- [ ] 做 reduced-motion 降級與移動端效能最佳化。
- [ ] 用瀏覽器 3 種尺寸檢視並修正明顯問題。

### Phase E — 上線

- [ ] 建立 README 與 GitHub Pages Actions workflow。
- [ ] 填入店家已確認的聯絡資訊、LINE ID 和實拍圖（如尚無，明確阻擋商業上線並保留 demo 標示）。
- [ ] 確認 SEO、FAQ、個資說明、付款與交期描述不誤導。
- [ ] 完成 build / test / deploy，實機測試 LINE 手機／桌面跳轉。

## 12. 商家待提供資訊（不阻礙先製作 Demo）

- [ ] 品牌／店名（中英文）、Logo（或允許先做暫用文字標）
- [ ] LINE 官方帳號公開 ID 與加好友網址
- [ ] 印章服務確實可提供的分類、材質、尺寸、字體、價格範圍、交期
- [ ] 實際刻印作品照片 5–10 張（拍照前確認是否有客戶印文或個資）
- [ ] 水晶商品照片、品名、規格、售價及狀態（建議先準備 6–10 件）
- [ ] 店面公開地址、營業時間、社群帳號、是否寄送與收費原則
- [ ] 店家認可的訂製流程、付款政策、修改／取消規則與售後聯絡方式
- [ ] 首頁希望主推的 1–2 種刻印服務

## 13. 後續擴充方案與技術邊界

第一版：`React static site → LINE deep link → 顧客按送出 → 店家人工處理`。

日後需要自動化時，逐步轉為：`React → API / DB → LINE webhook / messaging backend → 訂單工作流 → 金流 / 配送`。

**LINE Bot 並不是免費 GitHub Pages 上執行的前端程式**。Messaging API 的 webhook 需要公開可連線、能處理 HTTPS POST 和驗證簽章的後端服務。若將來要真正自動產生訂單紀錄、回覆狀態，應再評估 serverless functions 或獨立後端，不必一開始就租整台伺服器。

成長後可優先進行：

1. 統一詢價編號與訂單狀態，解決人工紀錄散亂。
2. 使商品庫存從 JSON 過渡到後台資料管理。
3. 待線上付款需求明確後，評估第三方金流與交易安全。
4. 若依賴 Google 搜尋獲客，再將目前的 HashRouter 與 SPA 改成預渲染／SSG／SSR 或適合搜尋引擎的獨立 URL。

## 14. 參考文件

- Taste Skill: https://github.com/Leonxlnx/taste-skill
- GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- GitHub Pages publish: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- LINE URL scheme: https://developers.line.biz/en/docs/messaging-api/using-line-url-scheme/
- LINE Messaging API overview: https://developers.line.biz/en/docs/messaging-api/overview/
- LINE Messaging API pricing: https://developers.line.biz/en/docs/messaging-api/pricing/

---

## 15. 可直接貼給 Codex 的起始 Prompt

```text
請先完整閱讀根目錄的 spec.md，依該文件的 P0/MVP 範圍建立可實際執行的 React + TypeScript + Vite 網站，並設定可部署至 GitHub Pages。

請先確認 design-taste-frontend skill 是否已安裝，若存在就按照它的設計工作流提出並選擇適合「天然水晶原礦 × 專業印章刻印」品牌的方向。不要仿製 Apple 的品牌頁面，但可以採用精品攝影、留白、細膩動畫的設計原則。

實作優先序：
1. 路由、網站資訊架構、設定資料、RWD
2. 刻印服務與需求表單、驗證、詢價摘要
3. LINE 官方帳號預填文字跳轉及複製備援（不可假裝訂單已送出）
4. 水晶資料驅動展示、商品詳情、庫存狀態
5. GSAP / CSS 動畫、reduced-motion、圖片最佳化
6. 測試與 GitHub Pages 自動部署

商家實際資料尚未提供的地方使用明確的 Demo placeholder，避免捏造真實服務與庫存。
完成後請執行測試、build、lint、typecheck，若可使用瀏覽器則檢查 390px / 768px / 1440px 畫面。最後回報完成項目、未完成項目、需要店家補充的資料與 GitHub Pages 上線步驟。
```
