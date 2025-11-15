# 斗六舊城漫遊 🗺️

一個互動式的斗六舊城導覽網站，提供美食、文化景點和特色商店的資訊，搭配語音導覽和延伸閱讀功能。

## 功能特色

- 📍 **三大分類導覽**：美食地圖、文化景點、特色商店
- 🎧 **語音導覽**：每個景點都配有專屬的語音介紹
- 📖 **延伸閱讀**：深度故事內容，讓你更了解在地文化
- 📱 **響應式設計**：支援桌面和行動裝置瀏覽
- 🎨 **清新介面**：簡潔美觀的使用者介面

## 技術架構

- **後端框架**：Flask 3.0.0
- **內容管理**：Markdown + YAML frontmatter
- **音訊處理**：pydub
- **前端**：原生 JavaScript、Font Awesome 圖示庫

## 快速開始

### 環境需求

- Python 3.7+
- pip

### 安裝步驟

1. 克隆專案
```bash
git clone <repository-url>
cd yunlin_shop_map
```

2. 安裝相依套件
```bash
pip install -r requirements.txt
```

3. 執行開發伺服器
```bash
python app.py
```

4. 開啟瀏覽器訪問 `http://127.0.0.1:5000`

## 專案結構

```
.
├── app.py                          # Flask 主應用程式
├── content/                        # 內容資料夾
│   ├── food/                      # 美食資訊（Markdown 檔案）
│   ├── culture/                   # 文化景點（Markdown 檔案）
│   └── shopping/                  # 特色商店（Markdown 檔案）
├── templates/                      # Jinja2 模板
│   ├── base.html                  # 基礎模板
│   ├── index.html                 # 首頁
│   ├── food.html                  # 美食列表頁
│   ├── culture.html               # 文化景點列表頁
│   ├── shopping.html              # 特色商店列表頁
│   ├── story.html                 # 延伸閱讀頁面
│   └── audio_guide.html           # 語音導覽頁面
├── static/                         # 靜態檔案
│   ├── audio/                     # 語音檔案（MP3）
│   ├── images/                    # 圖片檔案
│   ├── css/                       # 樣式表
│   └── subtitles/                 # 字幕檔案
├── convert_audio.py               # 音訊轉檔工具（m4a → mp3）
└── update_audio_extensions.py     # 批次更新音訊副檔名
```

## 內容管理

### 新增景點資訊

1. 在對應分類資料夾建立 Markdown 檔案：
```bash
touch content/food/shop_name.md
```

2. 編輯檔案，加入 YAML frontmatter 和內容：
```markdown
---
title: 店家名稱
id: shop_name
image: shop_image.jpeg
audio: shop_audio.mp3
address: 雲林縣斗六市某某路123號
phone: 05-1234567
opening_hours: 10:00-20:00
website: https://maps.app.goo.gl/xxxxx
categories:
  - 分類1
  - 分類2
story: true
---

## 店家簡介

這裡是店家的簡介內容...

## 推薦美食

- 推薦項目 1
- 推薦項目 2

## 延伸閱讀

這裡是延伸閱讀的內容，會在故事頁面顯示...
```

3. 將對應的圖片放到 `static/images/`

4. 將語音檔案放到 `static/audio/`（建議使用 MP3 格式）

### 音訊檔案處理

如果你有 `.m4a` 格式的音訊檔案（例如 iPhone 語音備忘錄），可以使用轉檔工具：

```bash
# 將所有 .m4a 轉換為 .mp3
python convert_audio.py

# 更新 Markdown 檔案中的音訊檔案參照
python update_audio_extensions.py
```

## 開發說明

### 路由結構

- `/` - 首頁
- `/food` - 美食地圖列表
- `/culture` - 文化景點列表
- `/shopping` - 特色商店列表
- `/story/<category>/<item_name>` - 延伸閱讀頁面
- `/audio-guide/<category>/<item_name>` - 語音導覽頁面

### 內容載入機制

`load_content(directory)` 函數會：
1. 讀取指定分類資料夾中的所有 `.md` 檔案
2. 解析 YAML frontmatter 取得 metadata
3. 將 Markdown 內容轉換為 HTML
4. 識別 `## 延伸閱讀` 分隔符號並分割內容
5. 回傳處理後的資料給模板

### 語音播放器

語音播放器包含以下功能：
- 自訂播放/暫停按鈕
- 進度條顯示和拖曳定位
- 播放時間顯示
- 首次點擊覆蓋層啟動播放（符合行動裝置自動播放政策）

## 授權

本專案為斗六舊城導覽專案，詳細授權資訊請洽詢專案管理者。

## 貢獻

歡迎提交問題回報和功能建議！
