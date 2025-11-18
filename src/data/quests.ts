// 任務數據定義

import type { Quest } from '@/types/game';

export const QUESTS: Omit<Quest, 'status' | 'completedAt'>[] = [
  // 新手任務
  {
    id: 'quest_welcome',
    title: '歡迎來到斗六',
    description: '完成你的第一次打卡',
    type: 'visit',
    difficulty: 'easy',
    requirements: [
      {
        type: 'checkin',
        target: 1,
        current: 0,
      },
    ],
    rewards: {
      exp: 50,
      badges: ['badge_newbie'],
    },
  },
  {
    id: 'quest_explorer',
    title: '探索者之路',
    description: '探訪 5 個不同的地點',
    type: 'explore',
    difficulty: 'easy',
    requirements: [
      {
        type: 'unique_locations',
        target: 5,
        current: 0,
      },
    ],
    rewards: {
      exp: 100,
    },
  },

  // 美食任務
  {
    id: 'quest_foodie_start',
    title: '美食之旅',
    description: '探訪 3 個美食地點',
    category: 'food',
    type: 'visit',
    difficulty: 'easy',
    requirements: [
      {
        type: 'food_visits',
        target: 3,
        current: 0,
      },
    ],
    rewards: {
      exp: 80,
    },
  },
  {
    id: 'quest_foodie_master',
    title: '美食達人',
    description: '探訪所有美食地點',
    category: 'food',
    type: 'collect',
    difficulty: 'hard',
    requirements: [
      {
        type: 'food_visits',
        target: 15,
        current: 0,
      },
    ],
    rewards: {
      exp: 500,
      badges: ['badge_food_legend'],
    },
  },

  // 文化任務
  {
    id: 'quest_culture_start',
    title: '文化巡禮',
    description: '探訪 3 個文化景點',
    category: 'culture',
    type: 'visit',
    difficulty: 'easy',
    requirements: [
      {
        type: 'culture_visits',
        target: 3,
        current: 0,
      },
    ],
    rewards: {
      exp: 80,
    },
  },
  {
    id: 'quest_culture_guardian',
    title: '文化守護者',
    description: '探訪所有文化景點',
    category: 'culture',
    type: 'collect',
    difficulty: 'hard',
    requirements: [
      {
        type: 'culture_visits',
        target: 10,
        current: 0,
      },
    ],
    rewards: {
      exp: 400,
      badges: ['badge_culture_guardian'],
    },
  },

  // 商店任務
  {
    id: 'quest_shopping_start',
    title: '購物探索',
    description: '探訪 3 個特色商店',
    category: 'shopping',
    type: 'visit',
    difficulty: 'easy',
    requirements: [
      {
        type: 'shopping_visits',
        target: 3,
        current: 0,
      },
    ],
    rewards: {
      exp: 80,
    },
  },
  {
    id: 'quest_shopping_patron',
    title: '商店贊助者',
    description: '探訪所有特色商店',
    category: 'shopping',
    type: 'collect',
    difficulty: 'hard',
    requirements: [
      {
        type: 'shopping_visits',
        target: 12,
        current: 0,
      },
    ],
    rewards: {
      exp: 450,
      badges: ['badge_shop_patron'],
    },
  },

  // 挑戰任務
  {
    id: 'quest_completionist',
    title: '完美主義者',
    description: '探訪所有地點',
    type: 'challenge',
    difficulty: 'hard',
    requirements: [
      {
        type: 'unique_locations',
        target: 37,
        current: 0,
      },
    ],
    rewards: {
      exp: 1000,
      badges: ['badge_completionist'],
    },
  },
  {
    id: 'quest_level_10',
    title: '進階探險家',
    description: '達到 10 級',
    type: 'challenge',
    difficulty: 'medium',
    requirements: [
      {
        type: 'level',
        target: 10,
        current: 0,
      },
    ],
    rewards: {
      exp: 200,
    },
  },
];

/**
 * 初始化用戶任務
 */
export function initializeQuests(): Quest[] {
  return QUESTS.map((quest) => ({
    ...quest,
    status: 'available',
  }));
}
