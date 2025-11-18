// 成就數據定義

import type { Achievement } from '@/types/game';

export const ACHIEVEMENTS: Omit<Achievement, 'progress' | 'completed' | 'completedAt'>[] = [
  // 打卡成就
  {
    id: 'checkin_first',
    name: '踏出第一步',
    description: '完成首次打卡',
    icon: 'fa-walking',
    target: 1,
    rewards: {
      exp: 50,
      badges: ['badge_first_checkin'],
    },
  },
  {
    id: 'checkin_10',
    name: '十全十美',
    description: '完成 10 次打卡',
    icon: 'fa-map-marker-alt',
    target: 10,
    rewards: {
      exp: 100,
      badges: ['badge_checkin_10'],
    },
  },
  {
    id: 'checkin_25',
    name: '銀色旅程',
    description: '完成 25 次打卡',
    icon: 'fa-route',
    target: 25,
    rewards: {
      exp: 250,
      badges: ['badge_checkin_25'],
    },
  },
  {
    id: 'checkin_50',
    name: '黃金冒險',
    description: '完成 50 次打卡',
    icon: 'fa-compass',
    target: 50,
    rewards: {
      exp: 500,
      badges: ['badge_checkin_50'],
    },
  },
  {
    id: 'checkin_100',
    name: '傳奇探險家',
    description: '完成 100 次打卡',
    icon: 'fa-globe',
    target: 100,
    rewards: {
      exp: 1000,
      badges: ['badge_checkin_100'],
    },
  },

  // 美食成就
  {
    id: 'food_5',
    name: '美食初體驗',
    description: '探訪 5 個美食地點',
    icon: 'fa-utensils',
    target: 5,
    rewards: {
      exp: 100,
      badges: ['badge_food_explorer'],
    },
  },
  {
    id: 'food_10',
    name: '美食行家',
    description: '探訪 10 個美食地點',
    icon: 'fa-hamburger',
    target: 10,
    rewards: {
      exp: 200,
      badges: ['badge_food_master'],
    },
  },

  // 文化成就
  {
    id: 'culture_5',
    name: '文化之旅',
    description: '探訪 5 個文化景點',
    icon: 'fa-landmark',
    target: 5,
    rewards: {
      exp: 100,
      badges: ['badge_culture_seeker'],
    },
  },
  {
    id: 'culture_10',
    name: '文化達人',
    description: '探訪 10 個文化景點',
    icon: 'fa-book',
    target: 10,
    rewards: {
      exp: 200,
      badges: ['badge_culture_scholar'],
    },
  },

  // 商店成就
  {
    id: 'shopping_5',
    name: '購物初探',
    description: '探訪 5 個特色商店',
    icon: 'fa-store',
    target: 5,
    rewards: {
      exp: 100,
      badges: ['badge_shop_visitor'],
    },
  },
  {
    id: 'shopping_10',
    name: '購物狂熱',
    description: '探訪 10 個特色商店',
    icon: 'fa-shopping-bag',
    target: 10,
    rewards: {
      exp: 200,
      badges: ['badge_shop_collector'],
    },
  },

  // 等級成就
  {
    id: 'level_5',
    name: '新星崛起',
    description: '達到 5 級',
    icon: 'fa-star',
    target: 5,
    rewards: {
      exp: 150,
      badges: ['badge_level_5'],
    },
  },
  {
    id: 'level_10',
    name: '資深玩家',
    description: '達到 10 級',
    icon: 'fa-star-half-alt',
    target: 10,
    rewards: {
      exp: 300,
      badges: ['badge_level_10'],
    },
  },
  {
    id: 'level_20',
    name: '時空大師',
    description: '達到 20 級',
    icon: 'fa-crown',
    target: 20,
    rewards: {
      exp: 500,
      badges: ['badge_level_20'],
    },
  },

  // 特殊成就
  {
    id: 'all_categories',
    name: '全能探險家',
    description: '至少探訪一個美食、文化和商店地點',
    icon: 'fa-layer-group',
    target: 3,
    rewards: {
      exp: 200,
    },
  },
  {
    id: 'photo_20',
    name: '攝影大師',
    description: '上傳 20 張打卡照片',
    icon: 'fa-camera-retro',
    target: 20,
    rewards: {
      exp: 300,
      badges: ['badge_photo_enthusiast'],
    },
  },
];

/**
 * 初始化用戶成就
 */
export function initializeAchievements(): Achievement[] {
  return ACHIEVEMENTS.map((ach) => ({
    ...ach,
    progress: 0,
    completed: false,
  }));
}
