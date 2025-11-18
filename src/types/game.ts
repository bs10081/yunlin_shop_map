// 遊戲相關的 TypeScript 類型定義

import type { Category } from './index';

// 徽章類型
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: 'pink' | 'cyan' | 'purple' | 'blue' | 'green';
  category?: Category;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  unlockedAt?: Date;
}

// 成就類型
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
  completed: boolean;
  completedAt?: Date;
  rewards: {
    exp: number;
    badges?: string[];
  };
}

// 打卡記錄
export interface CheckIn {
  id: string;
  locationId: string;
  category: Category;
  timestamp: Date;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  photo?: string;
  note?: string;
}

// 任務類型
export interface Quest {
  id: string;
  title: string;
  description: string;
  category?: Category;
  type: 'visit' | 'collect' | 'explore' | 'challenge';
  difficulty: 'easy' | 'medium' | 'hard';
  requirements: {
    type: string;
    target: number;
    current: number;
  }[];
  rewards: {
    exp: number;
    badges?: string[];
  };
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  completedAt?: Date;
  expiresAt?: Date; // 限時任務
}

// 用戶進度
export interface UserProgress {
  level: number;
  exp: number;
  expToNextLevel: number;
  checkIns: CheckIn[];
  badges: Badge[];
  achievements: Achievement[];
  quests: Quest[];
  dailyQuests: DailyQuest[];
  lastDailyRefresh?: string; // YYYY-MM-DD
  stats: {
    totalCheckIns: number;
    uniqueLocations: number;
    foodVisited: number;
    cultureVisited: number;
    shoppingVisited: number;
    totalDistance: number; // 公尺
    totalTime: number; // 分鐘
  };
  dailyStats: {
    date: string; // YYYY-MM-DD
    checkIns: number;
    foodVisits: number;
    cultureVisits: number;
    shoppingVisits: number;
    photos: number;
    categories: string[]; // 今天訪問過的分類
  };
  preferences: {
    role?: 'foodie' | 'historian' | 'explorer' | 'collector';
    notifications: boolean;
  };
}

// 排行榜項目
export interface LeaderboardEntry {
  rank: number;
  username: string;
  level: number;
  exp: number;
  badges: number;
  checkIns: number;
}

// 每日任務
export interface DailyQuest extends Quest {
  dailyDate: string; // YYYY-MM-DD
}
