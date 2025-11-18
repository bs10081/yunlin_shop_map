// 徽章數據定義

import type { Badge } from '@/types/game';

export const BADGES: Omit<Badge, 'unlocked' | 'unlockedAt'>[] = [
  // 新手徽章
  {
    id: 'badge_newbie',
    name: '時空旅人',
    description: '開始你的斗六舊城冒險',
    icon: 'fa-rocket',
    color: 'cyan',
    rarity: 'common',
  },
  {
    id: 'badge_first_checkin',
    name: '初次打卡',
    description: '完成第一次地點打卡',
    icon: 'fa-map-pin',
    color: 'pink',
    rarity: 'common',
  },

  // 美食徽章
  {
    id: 'badge_food_explorer',
    name: '美食探險家',
    description: '探訪 5 個美食地點',
    icon: 'fa-utensils',
    color: 'pink',
    category: 'food',
    rarity: 'common',
  },
  {
    id: 'badge_food_master',
    name: '美食達人',
    description: '探訪 10 個美食地點',
    icon: 'fa-hamburger',
    color: 'pink',
    category: 'food',
    rarity: 'rare',
  },
  {
    id: 'badge_food_legend',
    name: '美食傳說',
    description: '探訪所有美食地點',
    icon: 'fa-crown',
    color: 'pink',
    category: 'food',
    rarity: 'legendary',
  },

  // 文化徽章
  {
    id: 'badge_culture_seeker',
    name: '文化尋訪者',
    description: '探訪 5 個文化景點',
    icon: 'fa-landmark',
    color: 'blue',
    category: 'culture',
    rarity: 'common',
  },
  {
    id: 'badge_culture_scholar',
    name: '文化學者',
    description: '探訪 10 個文化景點',
    icon: 'fa-book',
    color: 'blue',
    category: 'culture',
    rarity: 'rare',
  },
  {
    id: 'badge_culture_guardian',
    name: '文化守護者',
    description: '探訪所有文化景點',
    icon: 'fa-shield-alt',
    color: 'purple',
    category: 'culture',
    rarity: 'legendary',
  },

  // 商店徽章
  {
    id: 'badge_shop_visitor',
    name: '商店訪客',
    description: '探訪 5 個特色商店',
    icon: 'fa-store',
    color: 'green',
    category: 'shopping',
    rarity: 'common',
  },
  {
    id: 'badge_shop_collector',
    name: '收藏家',
    description: '探訪 10 個特色商店',
    icon: 'fa-shopping-bag',
    color: 'green',
    category: 'shopping',
    rarity: 'rare',
  },
  {
    id: 'badge_shop_patron',
    name: '商店贊助者',
    description: '探訪所有特色商店',
    icon: 'fa-gem',
    color: 'cyan',
    category: 'shopping',
    rarity: 'legendary',
  },

  // 打卡數量徽章
  {
    id: 'badge_checkin_10',
    name: '霓虹新手',
    description: '完成 10 次打卡',
    icon: 'fa-star',
    color: 'cyan',
    rarity: 'common',
  },
  {
    id: 'badge_checkin_25',
    name: '復古玩家',
    description: '完成 25 次打卡',
    icon: 'fa-certificate',
    color: 'purple',
    rarity: 'rare',
  },
  {
    id: 'badge_checkin_50',
    name: '時空冒險王',
    description: '完成 50 次打卡',
    icon: 'fa-trophy',
    color: 'pink',
    rarity: 'epic',
  },
  {
    id: 'badge_checkin_100',
    name: '80s 傳奇',
    description: '完成 100 次打卡',
    icon: 'fa-medal',
    color: 'purple',
    rarity: 'legendary',
  },

  // 等級徽章
  {
    id: 'badge_level_5',
    name: '霓虹學徒',
    description: '達到 5 級',
    icon: 'fa-user-graduate',
    color: 'cyan',
    rarity: 'common',
  },
  {
    id: 'badge_level_10',
    name: '復古大師',
    description: '達到 10 級',
    icon: 'fa-user-ninja',
    color: 'purple',
    rarity: 'rare',
  },
  {
    id: 'badge_level_20',
    name: '時空領主',
    description: '達到 20 級',
    icon: 'fa-user-crown',
    color: 'pink',
    rarity: 'epic',
  },

  // 特殊徽章
  {
    id: 'badge_completionist',
    name: '完美主義者',
    description: '探訪所有地點',
    icon: 'fa-check-circle',
    color: 'pink',
    rarity: 'legendary',
  },
  {
    id: 'badge_early_bird',
    name: '早起的鳥兒',
    description: '在早上 8 點前打卡',
    icon: 'fa-sun',
    color: 'cyan',
    rarity: 'rare',
  },
  {
    id: 'badge_night_owl',
    name: '夜貓子',
    description: '在晚上 10 點後打卡',
    icon: 'fa-moon',
    color: 'purple',
    rarity: 'rare',
  },
  {
    id: 'badge_weekend_warrior',
    name: '週末戰士',
    description: '在週末完成 10 次打卡',
    icon: 'fa-calendar-weekend',
    color: 'pink',
    rarity: 'rare',
  },
  {
    id: 'badge_photo_enthusiast',
    name: '攝影愛好者',
    description: '上傳 20 張打卡照片',
    icon: 'fa-camera-retro',
    color: 'cyan',
    rarity: 'epic',
  },
];

/**
 * 取得徽章稀有度對應的霓虹顏色
 */
export function getBadgeRarityColor(rarity: Badge['rarity']): string {
  switch (rarity) {
    case 'common':
      return 'text-gray-300';
    case 'rare':
      return 'text-neon-cyan';
    case 'epic':
      return 'text-neon-purple';
    case 'legendary':
      return 'text-neon-pink';
    default:
      return 'text-gray-300';
  }
}

/**
 * 取得徽章稀有度對應的霓虹邊框
 */
export function getBadgeRarityBorder(rarity: Badge['rarity']): string {
  switch (rarity) {
    case 'common':
      return 'border-gray-400';
    case 'rare':
      return 'border-neon-cyan';
    case 'epic':
      return 'border-neon-purple';
    case 'legendary':
      return 'border-neon-pink';
    default:
      return 'border-gray-400';
  }
}
