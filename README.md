# 石與印 Demo

依根目錄 `spec.md` P0/MVP 建立的 React + TypeScript + Vite + Tailwind CSS 靜態網站。暫用品牌「石與印」，並非已確認店名。原有 `image/`、`taste-skill/` 與 `spec.md` 保留不動。

## 本機執行

需要 Node.js 24+。有網路的環境：

```sh
npm ci
npm run dev
```

開發站預設 `http://127.0.0.1:5173/`。正式輸出預覽：

Windows PowerShell 若顯示「已停用指令碼執行／無法載入 npm.ps1」，請使用 `npm.cmd`。這不需要修改系統的執行原則：

```powershell
node --version
npm.cmd ci
npm.cmd run dev
```

執行 `ci` 前，先在本專案的 dev／preview 終端按 Ctrl+C 關閉伺服器。Windows 上執行中的 Vite 會占用 Rollup 原生模組；此時重新安裝會出現 `EPERM unlink ...rollup.win32-x64-msvc.node`。安裝中斷後，`vite is not recognized` 通常表示套件尚未完整恢復，請關閉伺服器再重新執行 `npm.cmd ci`。不要一律終止電腦上的所有 Node 程序。

本專案使用 Node.js 24+（`.nvmrc`／`.node-version` 指定 24）；若版本較舊，先切換 Node 再安裝。以下 `npm` 指令在受限制的 PowerShell 中均可改用 `npm.cmd`。

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

Playwright 測試本機 Windows 使用已安裝的 Edge；CI 使用 Chromium：

```sh
npm run test:e2e
```

測試會自動啟動正式 build 的 preview；先執行 build。其他作業系統可在 `playwright.config.ts` 改用 Chromium，並執行 `npx playwright install chromium`。`CI=1` 也會選用 Chromium。

## 完成範圍

- HashRouter 的首頁、刻印服務、詢價、水晶列表／詳情、關於我們與找不到頁面。
- 集中設定、手機選單、跳至內容、可見焦點、語意標籤與 390／768／1440px 版面。
- 資料驅動服務、材質／尺寸／字體選項、必填／長度／整數／日期／相依選項驗證。
- 可檢查的詢價摘要；修改表單會清除舊摘要。錯誤時保留輸入並聚焦第一個錯誤。
- LINE 官方帳號草稿 URL，中文及特殊字元編碼、帳號驗證、長 URL 提醒、官方帳號備援。
- 複製成功／失敗訊息，失敗時提供可選取的唯讀摘要。缺少合法 LINE ID 時停用跳轉。
- 商品分類／狀態篩選、空狀態、`hidden` 排除列表及詳情、缺圖備援、多圖切換（有多圖時顯示）。
- CSS／Web Animations API + IntersectionObserver 入場、圖片縮放、控制項回饋與 reduced-motion。採原生動畫，未新增 GSAP 依賴。
- 本地 WebP 640／1200px、srcset、明確尺寸、lazy loading、首圖高優先載入。
- SEO 基礎標籤、favicon、依部署 URL 產生 canonical／OG image／robots／sitemap。Demo 預設 noindex。
- 單元測試、三尺寸瀏覽器端到端測試、GitHub Pages Actions workflow。

## 設定與內容維護

`src/config/site.ts` 是公開商家設定的唯一來源，修改品牌、LINE、社群、地址、電話、營業時間、交付方式與詢價長度限制。禁止填入 Access Token、Channel Secret、私人電話或未授權公開資料。

`visuals` 集中管理首頁圖片路徑、alt、圖說與素材來源；換成實拍後同步更新這些文字。`tradePolicy` 放店家確認的交易政策。正式上線時也請核對 FAQ 與其他 Demo 說明。

LINE 範例：`lineOfficialId: '@實際公開ID'`，請用官方帳號後台核對的英數 ID；不要填範例 placeholder。`lineAddFriendUrl` 接受官方 `https://lin.ee/...` 或 `https://line.me/...` 網址。不設定時依公開 ID 建立備援。

`src/data/engraving-services.json`：只啟用確認承接的項目。每筆包含 id、名稱、說明、材質、尺寸、字體、可空的起價、交期說明、圖片、enabled、isSample。此版本只有明確標示的 Demo 姓名章，不假設公司章或特殊用途。

`src/data/crystals.json`：複製一筆新增商品，維持唯一 id／slug，不需要修改 JSX。狀態為 available／reserved／sold／hidden。沒有確認的價格、重量、尺寸使用 null；照片依實際商品替換。`hidden` 只是 UI 不公開，靜態 JSON 仍可存在公開 bundle，不能當成保密機制。

圖檔放在 `public/images/`，資料填 `images/檔名.webp`。WebP 同時準備 1200px 主圖與 `檔名-640.webp`，元件自動產生 srcset。其他圖片格式不自動套 srcset。每件商品圖片陣列可放多張。

`scripts/art.mjs` 與 `scripts/rasterize.mjs` 是原創示意圖的可重製來源。前者生成 SVG，後者使用本機 Edge 將它們轉成 WebP。這些圖不是商品實拍；網站圖說、商品及關於頁均已標示。沒有使用外部照片／影片，也沒有外部攝影授權聲明。替換前請確認店家有圖片使用權及照片未洩漏客戶印文。

## Demo 與正式上線

Demo 可部署供檢視，預設 `demoMode: true`、全站提示及 `noindex`。不會成立訂單、收款、保存表單、傳送訊息或保留庫存。重新整理／離開表單頁即清除記憶體內容。只有使用者點擊 LINE 草稿連結時才帶入摘要，仍須在 LINE 自行確認及傳送。

正式上線前：

1. 店家確認品牌與 Logo、公開 LINE ID／加好友網址。
2. 確認服務、材質／尺寸／字體、報價及交期描述，替換 Demo 資料。
3. 提供實拍照片、品名／規格／價格／費用／實際狀態；將真實資料設為 `isSample: false`，移除或隱藏未用示意商品，停用未用示意服務。
4. 提供公開聯絡資訊、營業時間、取件／寄送範圍及費用。
5. 確認校稿、付款、修改／取消、售後、客製商品權益與個資告知。
6. 在真實手機 LINE 與桌面 LINE 測試草稿、編碼、傳送與複製備援。
7. 設定實際網站 URL，再將 `demoMode` 關閉。build 會阻擋缺少 URL／合法 LINE ID／仍有公開 sample 品項的正式模式；其他商家內容仍須人工核對。

## GitHub Pages 部署

目前目錄沒有 Git repository、remote 或目的 repository，尚未對 GitHub 推送／部署。

1. 建立 GitHub repository，將本專案（包含 `package-lock.json`）提交至 `main`。不要加入 `node_modules`、`.npm-cache`、`.env`、測試暫存或敏感資料。
2. 在 repository 的 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。
3. 推送 `main` 或手動執行 **Validate and deploy GitHub Pages** workflow。它依序安裝、typecheck、lint、unit test、build、瀏覽器測試及部署。
4. workflow 透過 `configure-pages` 取得 URL 與子路徑，自動帶入 `VITE_BASE_PATH`、`VITE_SITE_URL`，不需要手寫 repo 名稱。自訂網域先在 Pages 設定，build 同樣使用 Pages 回傳的 URL。
5. 開啟 Actions 部署結果的網址，檢查 `/#/engraving` 與 `/#/crystals/sample-quartz`（正式資料請換 slug）、重新整理、圖片及手機選單。

若 `Read GitHub Pages configuration` 出現 `Get Pages site failed`／`HttpError: Not Found`，先開啟 repository 的 Settings → Pages，把 Source 設成 GitHub Actions，再到失敗的 Actions run 按 Re-run failed jobs；這項設定不需重新提交程式。已有本專案 workflow 時，不需要另建 GitHub 建議的模板。

目前 repository 的 Pages 設定入口為 https://github.com/tingwei1231/Crystal_Haven/settings/pages 。如果頁面顯示須升級方案，請先核對私人 repository 的 Pages 方案資格，不能靠改 YAML 繞過。不要只加入 `enablement: true`：configure-pages v5 官方定義要求另提供具有適當權限的 token；此專案採管理者手動啟用一次、workflow 使用內建 GITHUB_TOKEN，無須增加 PAT。

本機模擬子路徑（PowerShell）：

```powershell
$env:VITE_BASE_PATH='/pages-smoke/'
$env:VITE_SITE_URL='https://example.github.io/pages-smoke/'
npm run build
$env:PLAYWRIGHT_BASE_PATH='/pages-smoke/'
npm run test:e2e
Remove-Item Env:VITE_BASE_PATH, Env:VITE_SITE_URL, Env:PLAYWRIGHT_BASE_PATH
```

執行前關閉原本佔用 4173 的 preview，讓測試啟動正確 base 的 server。也可複製 `.env.example` 為 `.env.local` 設定本機部署參數。HashRouter 避免 Pages 深層路由 404，但不能提供理想的獨立 SEO URL；sitemap 只列根網址，P1 可再評估 SSG。

## 驗證與限制

實際紀錄見 [QA.md](QA.md)，設計方向與截圖檢視見 [DESIGN.md](DESIGN.md)。

- 環境封鎖 npm／開放圖庫下載，因此依既有快取鎖定可執行的相容版本；Vite 使用 5.4.21，未宣稱是目前最新版本。正式維護時請在連網環境更新至受支援穩定版並重新驗證。
- ESLint 與 Vitest 無可用快取，未完成這兩套工具整合。`npm run lint` 是 Babel AST 的專案原始碼檢查；`npm test` 使用 Node 內建 test runner。React 實際互動由 Playwright 驗證，不將替代工具宣稱為 ESLint／Vitest。
- 設計 skill inspector 的 CDP 呼叫 timeout，無法取得其 0 FAIL 認證；已使用 Playwright／Edge 完成同尺寸截圖及功能檢查。
- 尚未執行 GitHub 線上部署、真實帳號的 LINE 手機／桌機跨平台驗證，或 Lighthouse 效能量測。

實作參考：[LINE 官方 URL scheme](https://developers.line.biz/en/docs/messaging-api/using-line-url-scheme/)、[Vite Pages 部署](https://vite.dev/guide/static-deploy.html#github-pages)、[Pages Actions 文件](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。
