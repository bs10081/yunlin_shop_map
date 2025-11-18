// 每日任務數據和邏輯

import type { Quest, DailyQuest } from '@/types/game';
import type { Category } from '@/types';

const DAILY_QUEST_TEMPLATES = [
  {
    id: 'daily_checkin_1',
    title: '今日探索',
    description: '完成 1 次打卡',
    type: 'visit' as const,
    difficulty: 'easy' as const,
    requirements: [{ type: 'daily_checkins', target: 1, current: 0 }],
    rewards: { exp: 30 },
  },
  {
    id: 'daily_checkin_3',
    title: '探索狂熱',
    description: '完成 3 次打卡',
    type: 'visit' as const,
    difficulty: 'medium' as const,
    requirements: [{ type: 'daily_checkins', target: 3, current: 0 }],
    rewards: { exp: 100 },
  },
  {
    id: 'daily_food',
    title: '美食探訪',
    description: '探訪 1 個美食地點',
    category: 'food' as Category,
    type: 'visit' as const,
    difficulty: 'easy' as const,
    requirements: [{ type: 'daily_food', target: 1, current: 0 }],
    rewards: { exp: 40 },
  },
  {
    id: 'daily_culture',
    title: '文化巡禮',
    description: '探訪 1 個文化景點',
    category: 'culture' as Category,
    type: 'visit' as const,
    difficulty: 'easy' as const,
    requirements: [{ type: 'daily_culture', target: 1, current: 0 }],
    rewards: { exp: 40 },
  },
  {
    id: 'daily_shopping',
    title: '購物之旅',
    description: '探訪 1 個特色商店',
    category: 'shopping' as Category,
    type: 'visit' as const,
    difficulty: 'easy' as const,
    requirements: [{ type: 'daily_shopping', target: 1, current: 0 }],
    rewards: { exp: 40 },
  },
  {
    id: 'daily_diverse',
    title: '多元探索',
    description: '探訪 2 個不同分類的地點',
    type: 'explore' as const,
    difficulty: 'medium' as const,
    requirements: [{ type: 'daily_diverse', target: 2, current: 0 }],
    rewards: { exp: 80 },
  },
  {
    id: 'daily_photo',
    title: '今日攝影師',
    description: '上傳 3 張打卡照片',
    type: 'collect' as const,
    difficulty: 'medium' as const,
    requirements: [{ type: 'daily_photos', target: 3, current: 0 }],
    rewards: { exp: 60 },
  },
];

/**
 * 獲取今天的日期字符串 (YYYY-MM-DD)
 */
export function getTodayString(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * 檢查是否需要刷新每日任務
 */
export function shouldRefreshDailyQuests(lastRefreshDate?: string): boolean {
  if (!lastRefreshDate) return true;
  return lastRefreshDate !== getTodayString();
}

/**
 * 生成今日任務（隨機選擇 3 個）
 */
export function generateDailyQuests(): DailyQuest[] {
  const todayString = getTodayString();
  const shuffled = [...DAILY_QUEST_TEMPLATES].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 3);

  return selected.map((template) => ({
    ...template,
    status: 'available' as const,
    dailyDate: todayString,
  }));
}

/**
 * 獲取每日任務的進度
 */
export function getDailyQuestProgress(
  quest: DailyQuest,
  stats: {
    dailyCheckIns: number;
    dailyFoodVisits: number;
    dailyCultureVisits: number;
    dailyShoppingVisits: number;
    dailyPhotos: number;
    dailyCategories: Set<string>;
  }
): { current: number; target: number; percent: number } {
  const req = quest.requirements[0];
  let current = 0;

  switch (req.type) {
    case 'daily_checkins':
      current = stats.dailyCheckIns;
      break;
    case 'daily_food':
      current = stats.dailyFoodVisits;
      break;
    case 'daily_culture':
      current = stats.dailyCultureVisits;
      break;
    case 'daily_shopping':
      current = stats.dailyShoppingVisits;
      break;
    case 'daily_diverse':
      current = stats.dailyCategories.size;
      break;
    case 'daily_photos':
      current = stats.dailyPhotos;
      break;
  }

  return {
    current,
    target: req.target,
    percent: Math.min((current / req.target) * 100, 100),
  };
}

/**
 * 計算距離明天還有多少時間
 */
export function getTimeUntilMidnight(): {
  hours: number;
  minutes: number;
  seconds: number;
} {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const diff = tomorrow.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}
