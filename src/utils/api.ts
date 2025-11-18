import type { ContentItem, Category, ApiResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

class ApiClient {
  private async fetch<T>(url: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse<T> = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Unknown error');
      }

      return data.data as T;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  /**
   * Get all items for a category
   */
  async getItems(category: Category): Promise<ContentItem[]> {
    return this.fetch<ContentItem[]>(`/${category}`);
  }

  /**
   * Get a specific item by category and id
   */
  async getItem(category: Category, id: string): Promise<ContentItem> {
    return this.fetch<ContentItem>(`/${category}/${id}`);
  }
}

export const api = new ApiClient();
