# CLAUDE.md - AI Assistant Guide for Yunlin Shop Map

## Project Overview

**Yunlin Shop Map (雲林商店地圖)** is a cultural tourism web application showcasing the historic old city district of Douliu (斗六舊城) in Yunlin County, Taiwan. The application serves as an interactive multimedia guide to local food establishments, cultural landmarks, and specialty shops, featuring immersive audio guides and narrative storytelling.

**Technology Stack:**
- **Backend:** Flask 3.0.0 (Python)
- **Frontend:** Jinja2 templates, vanilla JavaScript, CSS3
- **Content:** Markdown files with YAML front matter
- **Audio:** Dual-format support (MP3/M4A)
- **Language:** Traditional Chinese (Taiwan)

## Repository Structure

```
yunlin_shop_map/
├── app.py                          # Main Flask application (5,214 bytes)
├── requirements.txt                # Python dependencies
├── convert_audio.py               # Audio conversion utility (m4a → mp3)
├── update_audio_extensions.py      # Updates markdown audio references
├── .gitignore                      # Git ignore rules
│
├── templates/                      # Jinja2 HTML templates
│   ├── base.html                  # Base layout with navigation
│   ├── index.html                 # Homepage with hero section
│   ├── food.html                  # Food category page
│   ├── culture.html               # Cultural landmarks page
│   ├── shopping.html              # Specialty shops page
│   ├── audio_guide.html           # Full-screen audio player
│   └── story.html                 # Extended narrative display
│
├── content/                       # Markdown content files
│   ├── food/                      # 4 food establishments
│   ├── culture/                   # 2 cultural landmarks
│   └── shopping/                  # 2 specialty shops
│
└── static/                        # Static assets
    ├── audio/                     # Audio files (.mp3, .m4a)
    ├── images/                    # Location photos (.jpeg)
    ├── css/style.css              # Main stylesheet (1,122 lines)
    ├── font/                      # Custom Taiwan fonts (GenSen Rounded)
    ├── subtitles/                 # SRT subtitle files
    └── favicon.ico
```

## Core Application Architecture

### Flask Application (app.py)

**Key Functions:**

1. **`load_content(directory)`** - Primary content loader
   - Reads all `.md` files from `content/{directory}/`
   - Parses YAML front matter for metadata
   - Converts markdown body to HTML
   - Splits content at `## 延伸閱讀` marker
   - Returns list of content dictionaries

2. **Route Structure:**
   ```python
   /                              # Homepage
   /food                          # Food category listing
   /culture                       # Cultural landmarks listing
   /shopping                      # Shopping category listing
   /audio-guide/<category>/<id>   # Full-screen audio player
   /story/<category>/<id>         # Extended narrative view
   ```

3. **Audio File Handling:**
   - Supports both `.mp3` and `.m4a` formats
   - Custom MIME type configuration
   - No-cache headers for fresh playback
   - Automatic format detection

### Content System

**Markdown File Structure:**

Every content file follows this standardized format:

```yaml
---
title: "店家名稱"
address: "地址"
phone: "電話號碼"
opening_hours: "營業時間"
website: "Google Maps 導航連結"
image: "filename.jpeg"
audio: "filename.mp3"
categories:
  - "類別1"
  - "類別2"
id: "filename_without_extension"
story: true  # or false
admission: "免費參觀"  # Optional, for cultural sites
---

## 店家簡介
Main introduction content...

## 推薦美食 / 特色介紹
Details and recommendations...

## 延伸閱讀
Extended narrative story (optional)...
```

**Current Content Inventory (8 locations):**

- **Food (4):**
  - `laojiewanguo.md` - 老街碗粿 (Old Street Bowl Cake)
  - `rong.md` - 融 melting (Ice Shop)
  - `taimirice.md` - 台米 (Taimi Rice)
  - `sao_grass_jelly.md` - 騷仙草 (Sao Grass Jelly)

- **Culture (2):**
  - `fude.md` - 福德宮 (Fude Temple)
  - `gyoukei.md` - 行啟紀念館 (Gyoukei Memorial Hall)

- **Shopping (2):**
  - `jingan.md` - 崇德青草藥房 (Chongde Chinese Medicine)
  - `douliu_fourth_generation_malt_crisp.md` - 麥芽酥 (Malt Crisp)

## Development Workflows

### Adding a New Location

**Required Steps:**

1. **Create markdown file** in appropriate directory:
   ```bash
   touch content/food/new_shop.md
   ```

2. **Add front matter** with all required fields:
   - `title`, `address`, `phone`, `opening_hours`, `website`
   - `image`, `audio`, `categories`, `id`, `story`

3. **Write content sections:**
   - `## 店家簡介` (required)
   - `## 推薦美食` or `## 特色介紹` (required)
   - `## 延伸閱讀` (optional, only if `story: true`)

4. **Add image** to `static/images/`:
   - Format: `.jpeg`
   - Naming: Match the `id` field (e.g., `new_shop.jpeg`)

5. **Add audio** (if applicable):
   - Original: `static/audio/new_shop.m4a`
   - Convert: Run `python convert_audio.py`
   - Result: `static/audio/new_shop.mp3`

6. **Test the addition:**
   - Restart Flask app
   - Check category page for new card
   - Verify audio playback
   - Test story link (if applicable)

### Audio File Management

**Workflow:**

```bash
# 1. Add original .m4a file to static/audio/
cp ~/recordings/shop_audio.m4a static/audio/new_shop.m4a

# 2. Convert to MP3
python convert_audio.py

# 3. Update markdown references (if needed)
python update_audio_extensions.py
```

**Audio Conversion Details:**
- Uses `pydub` library
- Source: `.m4a` (iPhone voice memo format, AAC codec)
- Output: `.mp3` (universal browser compatibility)
- Skips already-converted files

### Template Modification

**Template Hierarchy:**
```
base.html (navigation, common structure)
  ├── index.html (extends base)
  ├── food.html (extends base)
  ├── culture.html (extends base)
  ├── shopping.html (extends base)
  ├── audio_guide.html (standalone)
  └── story.html (standalone)
```

**Common Blocks:**
- `{% block title %}` - Page title
- `{% block content %}` - Main content area
- Navigation bar is in `base.html`

### Styling Guidelines

**CSS Organization (style.css - 1,122 lines):**

1. **Lines 1-100:** CSS Reset & Base styles
2. **Lines 101-300:** Navigation bar & responsive menu
3. **Lines 301-500:** Homepage hero section & cards
4. **Lines 501-700:** Category pages (food/culture/shopping)
5. **Lines 701-900:** Audio player & tap-to-play overlay
6. **Lines 901-1,000:** Story page styling
7. **Lines 1,001-1,122:** Media queries & responsive design

**Color Palette:**
- Primary: `#C7B7A3` (navigation bar, warm beige)
- Background: `#f4f1eb` (light cream)
- Text: `#333` (dark gray)
- Accent: `rgba(199, 183, 163, 0.1)` (subtle overlays)

**Typography:**
- Font Family: `'GenSen Rounded TW'` (custom Taiwan font)
- Regular: `GenSenRounded2TW-R.otf`
- Medium: `GenSenRounded2TW-M.otf`

## Key Conventions & Best Practices

### File Naming

1. **Markdown files:**
   - Use lowercase with underscores
   - Must match the `id` field
   - Example: `old_street_bowl_cake.md` → `id: old_street_bowl_cake`

2. **Images:**
   - Format: `.jpeg` only
   - Naming: `{id}.jpeg`
   - Example: `rong.jpeg`, `laojiewanguo_index.jpeg`

3. **Audio:**
   - Original: `{id}.m4a`
   - Converted: `{id}.mp3`
   - Both files should exist in `static/audio/`

### Content Writing Guidelines

1. **Tone:** Warm, informative, culturally respectful
2. **Language:** Traditional Chinese (Taiwan)
3. **Story Character:** 麒麟 (Qilin) - mythical creature guide
4. **Story Style:** Narrative, poetic, first-person perspective
5. **Website Links:** Always use Google Maps navigation links

### Code Style

**Python:**
- Follow PEP 8 conventions
- Use descriptive variable names
- Keep functions focused and single-purpose
- Add comments for complex logic

**HTML/Jinja2:**
- Use semantic HTML5 elements
- Keep templates DRY (Don't Repeat Yourself)
- Properly indent nested blocks
- Use Jinja2 filters for text processing

**CSS:**
- Use consistent indentation (2 spaces)
- Group related properties together
- Comment major sections
- Mobile-first responsive design

## Important Technical Details

### Audio Player Behavior

**Browser Autoplay Policy Compliance:**
- Audio requires user interaction before playing
- "Tap to play" overlay handles initial interaction
- Play state tracked via `data-played` attribute
- No audio caching (fresh playback each time)

**Implementation in audio_guide.html:**
```javascript
// First interaction triggers audio
overlay.addEventListener('click', function() {
    audioPlayer.play();
    overlay.style.display = 'none';
});
```

### Content Parsing Logic

**Front Matter Extraction:**
```python
# Splits on '---' delimiter
parts = content.split('---', 2)
metadata = yaml.safe_load(parts[1])
markdown_content = parts[2]
```

**Story Content Separation:**
```python
# Splits at "延伸閱讀" heading
if '## 延伸閱讀' in content:
    main_content, story_content = content.split('## 延伸閱讀', 1)
```

### Responsive Design Breakpoints

```css
/* Mobile: < 768px (default) */
/* Tablet: 768px - 1024px */
@media (min-width: 768px) { ... }

/* Desktop: > 1024px */
@media (min-width: 1024px) { ... }
```

## Common Tasks & Commands

### Development Server

```bash
# Start Flask development server
python app.py

# Server runs on http://localhost:5000
# Debug mode: ON (in development)
```

### Audio Conversion

```bash
# Convert all .m4a files to .mp3
python convert_audio.py

# Update markdown audio references
python update_audio_extensions.py
```

### Content Validation

**Before committing new content, verify:**
- [ ] YAML front matter is valid
- [ ] All required fields are present
- [ ] Image file exists in `static/images/`
- [ ] Audio file exists (both .mp3 and .m4a)
- [ ] Website link points to Google Maps
- [ ] Markdown headings are consistent
- [ ] Story content exists if `story: true`

## Git Workflow

### Branch Strategy

- **Development Branch:** `claude/claude-md-mhy4jyuoj8ezk6la-01ABqJ53K2gCYLtBiNACL2RH`
- Always develop on Claude-specific branches
- Branch naming: Must start with `claude/` and end with session ID

### Commit Message Guidelines

Follow the existing commit message style:

```
# Format: <type>: <description>

Examples:
- "Add: audio file"
- "fix: 刪除多餘的語音導覽按鈕"
- "所有website的網址改成店的導航"
- "添加rong.md頁面在food.html，適配所有.md的所有功能"
```

**Types:**
- `Add:` - New features or files
- `fix:` - Bug fixes
- `Update:` - Modifications to existing features
- Descriptions can be in Chinese or English

### Push Protocol

```bash
# Always use -u flag for new branches
git push -u origin <branch-name>

# Network retry logic:
# If push fails due to network, retry up to 4 times
# with exponential backoff: 2s, 4s, 8s, 16s
```

## Dependencies & Requirements

### Python Packages (requirements.txt)

```
Flask==3.0.0           # Web framework
python-dotenv==1.0.0   # Environment variable management
Markdown==3.5.1        # Markdown to HTML conversion
PyYAML==6.0.1          # YAML front matter parsing
pydub==0.25.1          # Audio format conversion
```

### System Requirements

- Python 3.7+
- FFmpeg (required by pydub for audio conversion)

### Installation

```bash
# Install Python dependencies
pip install -r requirements.txt

# Install FFmpeg (for audio conversion)
# Ubuntu/Debian:
sudo apt-get install ffmpeg

# macOS:
brew install ffmpeg
```

## Troubleshooting Guide

### Audio Not Playing

1. Check file exists in `static/audio/`
2. Verify both `.mp3` and `.m4a` versions exist
3. Check YAML front matter has correct filename
4. Ensure no-cache headers are working
5. Test in different browsers

### Content Not Displaying

1. Verify YAML front matter syntax is valid
2. Check markdown file is in correct directory
3. Ensure `id` field matches filename
4. Restart Flask server to reload content
5. Check Flask console for parsing errors

### Image Not Loading

1. Verify image exists in `static/images/`
2. Check filename matches `image` field in YAML
3. Ensure image format is `.jpeg`
4. Clear browser cache
5. Check file permissions

### Responsive Layout Issues

1. Test at multiple breakpoints (mobile, tablet, desktop)
2. Check CSS media queries in `style.css`
3. Verify viewport meta tag in `base.html`
4. Test on actual devices, not just browser resize
5. Check flexbox/grid properties

## Security Considerations

### Current Implementation

- Static content only (no user input)
- No database connections
- No authentication required
- No sensitive data stored

### Future Considerations

If adding dynamic features:
- Sanitize all user input
- Use CSRF protection for forms
- Implement rate limiting
- Validate file uploads
- Use environment variables for secrets

## Performance Optimization

### Current Optimizations

1. **Content Caching:** Markdown parsed once per request
2. **Audio:** Streaming delivery, no buffering
3. **Images:** JPEG format, optimized size
4. **CSS:** Single stylesheet, no external dependencies
5. **Fonts:** Local hosting, no external requests

### Future Improvements

- Implement Redis caching for parsed markdown
- Add image lazy loading
- Minify CSS/JS for production
- Use CDN for static assets
- Implement service worker for offline support

## Testing Checklist

### Before Committing Changes

- [ ] Flask app starts without errors
- [ ] All routes return 200 status
- [ ] Audio players work on all pages
- [ ] Story links navigate correctly
- [ ] Images load on all cards
- [ ] Mobile responsive layout works
- [ ] Navigation menu toggles properly
- [ ] No console errors in browser
- [ ] Content renders correctly
- [ ] Links open in new tabs

### Cross-Browser Testing

Recommended browsers:
- Chrome/Edge (Chromium)
- Firefox
- Safari (especially for audio)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Project-Specific Terminology

### Chinese Terms

- **斗六舊城** (Douliu Old City) - Historic district
- **店家簡介** - Shop introduction
- **推薦美食** - Recommended food
- **特色介紹** - Feature introduction
- **延伸閱讀** - Extended reading
- **麒麟** (Qilin) - Mythical creature narrator
- **語音導覽** - Audio guide
- **營業時間** - Opening hours
- **免費參觀** - Free admission

### File ID Conventions

Current IDs in use:
- `laojiewanguo` (老街碗粿)
- `rong` (融)
- `taimirice` (台米)
- `sao_grass_jelly` (騷仙草)
- `fude` (福德宮)
- `gyoukei` (行啟紀念館)
- `jingan` (崇德青草藥房)
- `douliu_fourth_generation_malt_crisp` (麥芽酥)

## Contact & Resources

### Related Documentation

- Flask Documentation: https://flask.palletsprojects.com/
- Jinja2 Templates: https://jinja.palletsprojects.com/
- Python Markdown: https://python-markdown.github.io/
- PyYAML: https://pyyaml.org/

### Git Repository

- **Branch:** `claude/claude-md-mhy4jyuoj8ezk6la-01ABqJ53K2gCYLtBiNACL2RH`
- **Recent Commits:** Focus on audio integration and content additions

---

## Quick Reference Commands

```bash
# Start development server
python app.py

# Convert audio files
python convert_audio.py

# Update audio references in markdown
python update_audio_extensions.py

# Check git status
git status

# Add all changes
git add .

# Commit with message
git commit -m "Add: new content"

# Push to branch
git push -u origin claude/claude-md-mhy4jyuoj8ezk6la-01ABqJ53K2gCYLtBiNACL2RH
```

---

**Last Updated:** 2025-11-14
**Version:** 1.0
**Maintainer:** AI Assistant (Claude)
