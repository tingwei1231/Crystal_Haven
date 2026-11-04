# 驗證紀錄

日期：2026-11-05，Windows／Node.js 24.14.0／本機 Microsoft Edge。

| 檢查 | 結果 |
| --- | --- |
| `npm run dev` | Vite 正常啟動於 5173 |
| `npm run build` | 通過，包含 TypeScript 與 SEO 檔案生成 |
| `npm run typecheck` | 通過 |
| `npm run lint` | 21 個原始碼檔案，0 問題；使用專案 Babel AST lint，並非 ESLint |
| `npm test` | Node 內建 runner，9／9 通過 |
| `npm run test:e2e` | 正式 build，18／18 通過 |
| Pages 子路徑 `/pages-smoke/` | build 與三尺寸 e2e，18／18 通過 |
| 390／768／1440px | 首頁、詢價頁、商品詳情共 9 張完整截圖已逐張開啟檢視 |
| 版面量測 | 9 個頁面／尺寸組合均無水平溢出、無破圖、單一 h1；標題不超過兩行 |
| taste skill source lint | 0 FAIL、2 WARN；兩處 padStart 用於合法日期格式，保留 |
| taste skill inspector | 嘗試兩次，均 `CDP timeout: Page.enable`，未取得其檢查通過證明 |

單元測試涵蓋：LINE 中文／特殊字元編碼、錯誤與 placeholder ID、安全帳號備援、表單必填／長度／數量／相依選項／日期、摘要內容、服務啟用狀態、商品篩選／hidden 排除及 Pages 圖片路徑。

瀏覽器測試涵蓋：所有路由、未知與隱藏商品頁、重整、圖片載入、水平溢出、驗證及資料保留、摘要產生／作廢、未設定 LINE 時停用連結、剪貼簿成功及權限失敗、手動複製、商品空狀態、手機選單與 Escape、reduced-motion、圖片錯誤備援。

自動截圖與量測產物（本機檔案，未提交 Git）：

- `.taste-skill/inspect/home-390.png`、`home-768.png`、`home-1440.png`
- `.taste-skill/inspect/inquiry-390.png`、`inquiry-768.png`、`inquiry-1440.png`
- `.taste-skill/inspect/detail-390.png`、`detail-768.png`、`detail-1440.png`
- `.taste-skill/inspect/measurements.json`

可在正式 root-path build 的 preview 啟動後執行 `node scripts/qa.mjs` 重建畫面。CSS 調整解決平板表單欄寬與 grid 標題被拉長造成的量測誤判。

WebP 共 10 檔，合計約 127 KiB；JS gzip 約 93 KiB、CSS gzip 約 4.6 KiB。這是檔案大小，並非 Lighthouse／LCP 實測。

Pages 子路徑已使用包含 canonical 與 OG image 的實際 build 測試，最後恢復成 root-path 的本地 Demo 輸出。子路徑測試首輪所有案例完成後 Windows 子程序清理未退出，已中止該 runner；使用既有 preview 重跑後正常結束、18 項通過。GitHub CI 使用 Linux runner，尚待實際線上執行確認。

尚未驗證：實際 GitHub Actions／Pages 部署、正式帳號的手機／桌面 LINE 草稿行為、Lighthouse，以及正式商家資料與照片。沒有假定這些項目完成。

工具差異：網路 EACCES 且無套件快取，無法安裝 ESLint、Vitest 或 GSAP。使用自訂原始碼 lint、Node tests、Playwright，以及原生 CSS／Web Animations API；lockfile 固定本次能執行的依賴，Vite 5.4.21 並非最新版本。正式維護請在連網環境完成版本更新與原規格工具整合。
