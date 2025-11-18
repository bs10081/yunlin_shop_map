export interface ContentMetadata {
  title: string;
  id: string;
  image: string;
  audio: string;
  address: string;
  phone: string;
  opening_hours: string;
  website: string;
  categories: string[];
  story?: boolean;
}

export interface ContentItem extends ContentMetadata {
  content: string;
  story_content?: string;
  category?: string;
}

export type Category = 'food' | 'culture' | 'shopping';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
