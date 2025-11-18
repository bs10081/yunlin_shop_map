// 優惠券類型定義

import type { Category } from './index';

export interface Coupon {
  id: string;
  title: string;
  description: string;
  discount: string; // 如：「9折」、「買一送一」
  locationId?: string; // 特定地點優惠
  locationName?: string;
  category?: Category;
  requiredLevel: number; // 需要的等級
  requiredBadges?: string[]; // 需要的徽章
  requiredCheckIns?: number; // 需要的打卡數
  expiresAt: Date;
  redeemed: boolean;
  redeemedAt?: Date;
  code: string; // 優惠碼
}

export const COUPONS: Omit<Coupon, 'redeemed' | 'redeemedAt'>[] = [
  {
    id: 'coupon_welcome',
    title: '新手禮包',
    description: '歡迎來到斗六！全館 95 折優惠',
    discount: '95折',
    requiredLevel: 1,
    requiredCheckIns: 1,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30天
    code: 'WELCOME2024',
  },
  {
    id: 'coupon_food_lover',
    title: '美食愛好者',
    description: '美食類地點消費 9 折',
    discount: '9折',
    category: 'food',
    requiredLevel: 5,
    requiredBadges: ['badge_food_explorer'],
    expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60天
    code: 'FOOD90',
  },
  {
    id: 'coupon_culture',
    title: '文化探索家',
    description: '文化景點門票 8 折',
    discount: '8折',
    category: 'culture',
    requiredLevel: 10,
    requiredBadges: ['badge_culture_scholar'],
    expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90天
    code: 'CULTURE80',
  },
  {
    id: 'coupon_shopping',
    title: '購物達人',
    description: '特色商店消費滿 500 送 100',
    discount: '滿500送100',
    category: 'shopping',
    requiredLevel: 8,
    requiredBadges: ['badge_shop_collector'],
    expiresAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45天
    code: 'SHOP500',
  },
  {
    id: 'coupon_explorer',
    title: '時空探險家',
    description: '全區域消費 85 折',
    discount: '85折',
    requiredLevel: 15,
    requiredCheckIns: 30,
    expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90天
    code: 'EXPLORER85',
  },
  {
    id: 'coupon_master',
    title: '完美主義者',
    description: '全站消費 8 折',
    discount: '8折',
    requiredLevel: 20,
    requiredBadges: ['badge_completionist'],
    expiresAt: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 120天
    code: 'MASTER80',
  },
];
