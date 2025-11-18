// 排行榜服務（模擬）

import type { LeaderboardEntry } from '@/types/game';
import { gameService } from './gameService';

class LeaderboardService {
  /**
   * 獲取排行榜（模擬多用戶）
   */
  getLeaderboard(sortBy: 'level' | 'exp' | 'badges' | 'checkIns' = 'level'): LeaderboardEntry[] {
    const currentProgress = gameService.getProgress();

    // 生成模擬用戶數據
    const mockUsers: LeaderboardEntry[] = [
      {
        rank: 0, // 稍後分配
        username: `探險家${currentProgress.level}`,
        level: currentProgress.level,
        exp: currentProgress.exp,
        badges: currentProgress.badges.filter((b) => b.unlocked).length,
        checkIns: currentProgress.stats.totalCheckIns,
      },
      // 生成 20 個模擬用戶
      ...Array.from({ length: 20 }, (_, i) => {
        const level = Math.max(1, currentProgress.level + Math.floor(Math.random() * 10) - 5);
        const badges = Math.floor(level * 0.8 + Math.random() * 5);
        const checkIns = Math.floor(level * 3 + Math.random() * 20);

        return {
          rank: 0,
          username: this.generateRandomUsername(),
          level,
          exp: Math.floor(level * 100 * Math.random()),
          badges,
          checkIns,
        };
      }),
    ];

    // 排序
    mockUsers.sort((a, b) => {
      switch (sortBy) {
        case 'level':
          return b.level !== a.level ? b.level - a.level : b.exp - a.exp;
        case 'exp':
          return b.exp - a.exp;
        case 'badges':
          return b.badges - a.badges;
        case 'checkIns':
          return b.checkIns - a.checkIns;
        default:
          return 0;
      }
    });

    // 分配排名
    mockUsers.forEach((user, index) => {
      user.rank = index + 1;
    });

    return mockUsers;
  }

  /**
   * 生成隨機用戶名
   */
  private generateRandomUsername(): string {
    const prefixes = [
      '時空',
      '霓虹',
      '復古',
      '賽博',
      '蒸氣',
      '星際',
      '銀河',
      '量子',
      '未來',
      '古典',
    ];
    const suffixes = [
      '旅人',
      '探險家',
      '冒險者',
      '漫遊者',
      '遊俠',
      '戰士',
      '大師',
      '獵人',
      '守護者',
      '行者',
    ];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const number = Math.floor(Math.random() * 999);

    return `${prefix}${suffix}${number}`;
  }
}

export const leaderboardService = new LeaderboardService();
