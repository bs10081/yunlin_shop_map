// 照片相關類型定義

import type { Category } from './index';

export interface Photo {
  id: string;
  locationId: string;
  locationName: string;
  category: Category;
  imageData: string; // Base64 或 URL
  caption?: string;
  username: string;
  level: number;
  timestamp: Date;
  likes: number;
  filters?: PhotoFilter;
}

export type PhotoFilter =
  | 'none'
  | 'retro'
  | 'neon'
  | 'vintage'
  | 'cyberpunk'
  | 'vaporwave';

export interface PhotoFilterConfig {
  name: string;
  label: string;
  css: string;
}

export const PHOTO_FILTERS: Record<PhotoFilter, PhotoFilterConfig> = {
  none: {
    name: 'none',
    label: '原圖',
    css: '',
  },
  retro: {
    name: 'retro',
    label: '復古',
    css: 'sepia(50%) contrast(120%) brightness(90%)',
  },
  neon: {
    name: 'neon',
    label: '霓虹',
    css: 'saturate(200%) contrast(120%) brightness(110%) hue-rotate(10deg)',
  },
  vintage: {
    name: 'vintage',
    label: '懷舊',
    css: 'sepia(80%) contrast(110%) brightness(95%)',
  },
  cyberpunk: {
    name: 'cyberpunk',
    label: '賽博龐克',
    css: 'saturate(150%) contrast(130%) hue-rotate(270deg)',
  },
  vaporwave: {
    name: 'vaporwave',
    label: 'Vaporwave',
    css: 'saturate(180%) contrast(110%) hue-rotate(180deg) brightness(105%)',
  },
};
