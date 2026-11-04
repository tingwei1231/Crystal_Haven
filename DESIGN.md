# 設計決策與檢視

已完整閱讀安裝於 `C:/Users/User/.agents/skills/design-taste-frontend/SKILL.md` 的 skill，執行 draw／source lint／inspector。

## 方向探索

抽取結果為 The dark room 與 The split stage（`--options 3` 實際只回傳這兩個符合方向），選擇 **The dark room**，seed **1826821023**。暗室把礦石與印章共同的受光切面當成展件；固定分欄在手機的連續需求流程比較不直接。無重新抽取方向。

核心句：在這個頁面，原礦自然形成的稜線與印面刻出的筆畫，成為同一暗室中的受光展件。

Live thing：使用者選擇服務、材質及尺寸、填寫印文，產生可檢查／複製的詢價文字。文字沒有變成不可信的實際刻印預覽。

尚未有可辨識的正式品牌故事與地點，概念目前仍屬品類層級，不能宣稱只有此店才能使用。

## 內容論證與素材盤點

可確認：主要刻印、次要原礦、天然稜面、印文刻痕、單件商品、人工報價、未知材質可推薦、LINE 草稿需手動傳送、庫存人工維護、店家內容待提供。沒有已核准年資、顧客評價或價格。

頁面順序：首頁說明兩項業務及刻印入口 → 材質／印文需要討論（服務說明）→ 每件原礦不同（資料驅動展示）→ 人工確認的必要性（流程）→ 回答價格、修改、交付、庫存問題（FAQ）→ 開始整理需求。

文案主軸：天然成礦。用心刻印。／一方小印，有自己的分量。／礦石，各有性格。／從想法，到印記。／詢問之前。每個段落均有實際內容，不以虛構評論充作證據。

## 落地調整

- 保留暗室的單一深色場域、物件主導與閱讀節奏。深綠石墨 `#181c1b`，淺石色 `#f0eee8`，礦物淡綠 `#d9e3c5` 用於行動。原抽取橘色與礦物／低彩度需求不合，改由材質取色，未混入漸層或霓虹。
- 抽取的拉丁字體不涵蓋繁中且無法連網取得字型；採本機明體作標題、正黑體作內文，避免巨型外部中文字型下載。
- 無店家實拍；開放圖庫搜尋回傳 EACCES。使用五張原創向量構圖轉製 WebP，全部標示示意，不宣稱照片或商家商品。外部照片／影片清單為空，無外部素材需附作者與授權；原創圖說在每張圖片、頁尾與關於頁。
- 保留主圖、對角錯位商品陳列、開放式 FAQ 與大字品牌收尾；不做冗長釘選場景。未設定 email，因此聯絡改接真實可用的詢價表單。
- 抽取的橫拖展示不適合手機不溢出與商品可掃讀的優先要求，改為換行展示；動態由揭示／圖片緩縮放／控制項回饋構成。所有非必要動態在 reduced-motion 停用。

## 截圖 critique

ROUND 1

Seen in one second: 深底上的礦石與方章，與「天然成礦。用心刻印。」標題。

Idea (one sentence): 以受光的稜面連結自然結晶與人為刻印。

Live thing: 刻印需求摘要產生及複製。

Layout words by section: hero=展件／service=圖文相對／collection=對角陳列／process=開放清單／faq=問答對照／footer=大字收尾。

Scores: design 6.5 · usability 8 · creativity 6 · content 6 → overall 6.8

Caps applied: 少於四張真實照片，design 上限 6.5；正式品牌未提供，概念尚屬品類，creativity 上限 6。

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. `inquiry-768.png` 的兩欄表單把選項壓窄 → 平板詢價頁改單欄表單、摘要下置。
2. `detail-1440.png` 圖片在長文字旁留下大片空間 → 桌面圖片與詢價側欄採 sticky，捲動時仍提供視覺／摘要脈絡。
3. `home-1440.png` 示意礦石偏幾何，缺少真實紋理 → 待店家實拍替換，不用假攝影冒充商品。

ROUND 2

Seen in one second: 礦石與印章、清楚刻印入口；平板表單欄寬已恢復。

Idea (one sentence): 受光切面把天然原礦與刻印物件放在同一展覽語境。

Live thing: 需求表單、即時作廢舊摘要、複製／手動複製備援。

Layout words by section: hero=展件／service=圖文相對／collection=對角陳列／process=開放清單／faq=問答對照／footer=大字收尾。

Scores: design 6.5 · usability 8 · creativity 6 · content 6 → overall 6.8

Caps applied: 同上；skill inspector timeout，沒有其檢查通過證明。

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. `home-1440.png` 仍是示意繪圖，非精品商品攝影 → 需要正式照片。
2. `detail-390.png` 缺少真實尺寸與價格 → 待店家資料，維持明確待提供。
3. `inquiry-1440.png` 服務選項只有 Demo → 依真實服務擴充 JSON，保持資料驅動。

最終評分 6.8/10，未達 skill 的 7.5 品牌成品門檻；可執行 Demo 已完成，正式視覺仍需店家資料與實拍。
