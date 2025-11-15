# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Application
```bash
# Install dependencies
pip install -r requirements.txt

# Run the Flask development server
python app.py
# Server runs on http://127.0.0.1:5000 with debug mode enabled
```

### Audio File Management
```bash
# Convert .m4a audio files to .mp3 format
python convert_audio.py

# Update audio file extensions in content markdown files from .m4a to .mp3
python update_audio_extensions.py
```

## Architecture Overview

This is a Flask-based web application for exploring Douliu Old Town (斗六舊城漫遊). The app serves as an interactive guide with audio narration and extended reading features for local food, culture, and shopping locations.

### Content-Driven Architecture

The application follows a **content-driven design** where all location information is stored in markdown files with YAML frontmatter:

- **Content Storage**: `content/{category}/{item_name}.md`
  - Categories: `food/`, `culture/`, `shopping/`
  - Each file contains YAML metadata + markdown content
  - Supports extended reading sections with `## 延伸閱讀` delimiter

- **YAML Frontmatter Structure**:
  ```yaml
  ---
  title: 店家名稱
  id: unique_identifier
  image: image_filename.jpeg
  audio: audio_filename.mp3
  address: 完整地址
  phone: 聯絡電話
  opening_hours: 營業時間
  website: Google Maps或官網連結
  categories: [類別1, 類別2]
  story: true  # 是否有延伸閱讀內容
  ---
  ```

### Request Flow

1. **List Pages** (`/food`, `/culture`, `/shopping`):
   - `load_content(directory)` reads all `.md` files in `content/{directory}/`
   - Parses YAML frontmatter and converts markdown to HTML
   - Splits content at `## 延伸閱讀` marker if present
   - Returns list of items to display in grid layout

2. **Story Pages** (`/story/<category>/<item_name>`):
   - Displays the extended reading content (`## 延伸閱讀` section)
   - Includes custom audio player with progress bar and tap-to-play overlay
   - Full-page immersive reading experience with back button

3. **Audio Guide Pages** (`/audio-guide/<category>/<item_name>`):
   - Simplified audio-only player interface
   - Full-screen centered play button
   - Hidden navbar for immersive experience

### Audio File Handling

The app has specific audio configuration to handle iPhone voice memos (`.m4a` files):

- **MIME Type Configuration** (app.py:10-14): Maps `.m4a` and `.aac` to `audio/aac`
- **Response Headers** (app.py:19-26): Adds `Accept-Ranges: bytes` for audio streaming
- **Conversion Utility**: `convert_audio.py` converts `.m4a` → `.mp3` using pydub
- **Migration Tool**: `update_audio_extensions.py` updates markdown frontmatter references

### Template Inheritance

- `base.html`: Main layout with navbar, navigation menu, and shared JavaScript
- Category templates (`food.html`, `culture.html`, `shopping.html`): Extend base, display grid cards
- `story.html`: Full-page template with audio player and extended content
- `audio_guide.html`: Minimal template for audio-only playback

### Key Implementation Details

**Markdown Processing**:
- Uses Python `markdown` library with `extra` extensions for tables, fenced code blocks, etc.
- Content split logic: `content.split('---', 2)` extracts YAML and markdown separately
- HTML is marked safe with `| safe` filter in templates

**Audio Player Features**:
- Custom UI with play/pause button and progress bar
- Tap overlay on first load to enable autoplay (iOS requirement)
- Progress bar is clickable for seeking
- Time display formatting: `MM:SS`

**Navigation**:
- Active page highlighting via `{% if request.endpoint == 'food' %}active{% endif %}`
- Responsive mobile menu with hamburger toggle
- Breadcrumb navigation on list pages

**Static Assets**:
- `/static/audio/`: MP3 audio files for narration
- `/static/images/`: Shop/location photos
- `/static/css/style.css`: Global styles
- `/static/subtitles/`: (exists but not currently used)

## Important Patterns

### Adding New Content

1. Create markdown file in appropriate category folder:
   ```bash
   touch content/food/new_shop.md
   ```

2. Add YAML frontmatter + content following existing format

3. Add corresponding image to `static/images/`

4. Add audio file to `static/audio/` (preferably `.mp3`)

5. The item will automatically appear on the category page

### File Naming Conventions

- Markdown files: Use lowercase with underscores (e.g., `sao_grass_jelly.md`)
- The `id` field in frontmatter should match the filename (without `.md`)
- Image files: Match the `image` field in frontmatter
- Audio files: Match the `audio` field in frontmatter

### Audio Player Initialization

The story page audio player requires user interaction on iOS/mobile browsers. The implementation uses:
1. Tap overlay that captures first user interaction
2. `audio.load()` + `audio.play()` on first tap to initialize playback
3. Subsequent play/pause uses standard controls
4. `hasFirstTap` flag prevents re-initialization

## Technology Stack

- **Backend**: Flask 3.0.0
- **Content**: Markdown with PyYAML frontmatter
- **Frontend**: Vanilla JavaScript, Font Awesome icons
- **Audio Processing**: pydub (requires ffmpeg)
