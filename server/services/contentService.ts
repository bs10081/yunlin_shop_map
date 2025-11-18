import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { ContentItem, Category } from '../types/content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure marked for better Chinese support
marked.setOptions({
  gfm: true,
  breaks: true,
});

class ContentService {
  private contentBasePath: string;

  constructor() {
    this.contentBasePath = path.join(__dirname, '..', '..', 'content');
  }

  /**
   * Load all content items from a category directory
   */
  async loadContent(category: Category): Promise<ContentItem[]> {
    const items: ContentItem[] = [];
    const categoryPath = path.join(this.contentBasePath, category);

    try {
      const files = await fs.readdir(categoryPath);

      for (const filename of files) {
        if (!filename.endsWith('.md')) continue;

        const filePath = path.join(categoryPath, filename);
        const item = await this.loadContentItem(category, filename);

        if (item) {
          items.push(item);
        }
      }

      return items;
    } catch (error) {
      console.error(`Error loading content from ${category}:`, error);
      return [];
    }
  }

  /**
   * Load a single content item
   */
  async loadContentItem(category: Category, filename: string): Promise<ContentItem | null> {
    try {
      const filePath = path.join(this.contentBasePath, category, filename);
      const fileContent = await fs.readFile(filePath, 'utf-8');

      // Parse YAML frontmatter and markdown content
      const { data: metadata, content: markdownContent } = matter(fileContent);

      // Split main content and story content
      let mainContent = markdownContent;
      let storyContent = '';

      if (markdownContent.includes('## 延伸閱讀')) {
        const parts = markdownContent.split('## 延伸閱讀');
        mainContent = parts[0];
        storyContent = parts[1] || '';
      }

      // Convert markdown to HTML
      const htmlContent = await marked(mainContent.trim());
      const storyHtmlContent = storyContent ? await marked(storyContent.trim()) : '';

      // Use filename (without extension) as id if not specified
      const id = metadata.id || path.basename(filename, '.md');

      const item: ContentItem = {
        id,
        title: metadata.title || '',
        image: metadata.image,
        audio: metadata.audio,
        address: metadata.address,
        phone: metadata.phone,
        opening_hours: metadata.opening_hours,
        website: metadata.website,
        categories: metadata.categories,
        content: htmlContent,
        category,
        story: false,
      };

      if (storyHtmlContent) {
        item.story_content = storyHtmlContent;
        item.story = true;
      }

      return item;
    } catch (error) {
      console.error(`Error loading content item ${filename}:`, error);
      return null;
    }
  }

  /**
   * Get a specific item by category and id
   */
  async getItem(category: Category, itemId: string): Promise<ContentItem | null> {
    const filename = `${itemId}.md`;
    return this.loadContentItem(category, filename);
  }

  /**
   * Check if a file exists
   */
  async itemExists(category: Category, itemId: string): Promise<boolean> {
    try {
      const filePath = path.join(this.contentBasePath, category, `${itemId}.md`);
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}

export const contentService = new ContentService();
