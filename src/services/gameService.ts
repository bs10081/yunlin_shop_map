// 遊戲進度管理服務

import type { UserProgress, CheckIn, Badge, Achievement, Quest, DailyQuest } from '@/types/game';
import type { Category } from '@/types';
import { generateDailyQuests, shouldRefreshDailyQuests, getTodayString } from '@/data/dailyQuests';

const STORAGE_KEY = 'yunlin_game_progress';

class GameService {
  /**
   * 初始化用戶進度
   */
  private initializeProgress(): UserProgress {
    const today = getTodayString();
    return {
      level: 1,
      exp: 0,
      expToNextLevel: 100,
      checkIns: [],
      badges: [],
      achievements: [],
      quests: [],
      dailyQuests: generateDailyQuests(),
      lastDailyRefresh: today,
      stats: {
        totalCheckIns: 0,
        uniqueLocations: 0,
        foodVisited: 0,
        cultureVisited: 0,
        shoppingVisited: 0,
        totalDistance: 0,
        totalTime: 0,
      },
      dailyStats: {
        date: today,
        checkIns: 0,
        foodVisits: 0,
        cultureVisits: 0,
        shoppingVisits: 0,
        photos: 0,
        categories: [],
      },
      preferences: {
        notifications: true,
      },
    };
  }

  /**
   * 獲取用戶進度
   */
  getProgress(): UserProgress {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const progress = JSON.parse(data);
        // 轉換日期字符串回 Date 對象
        progress.checkIns = progress.checkIns.map((ci: any) => ({
          ...ci,
          timestamp: new Date(ci.timestamp),
        }));

        // 檢查是否需要刷新每日任務和統計
        const today = getTodayString();
        if (shouldRefreshDailyQuests(progress.lastDailyRefresh)) {
          progress.dailyQuests = generateDailyQuests();
          progress.lastDailyRefresh = today;
          progress.dailyStats = {
            date: today,
            checkIns: 0,
            foodVisits: 0,
            cultureVisits: 0,
            shoppingVisits: 0,
            photos: 0,
            categories: [],
          };
          this.saveProgress(progress);
        }

        // 兼容舊數據
        if (!progress.dailyQuests) {
          progress.dailyQuests = generateDailyQuests();
          progress.lastDailyRefresh = today;
        }
        if (!progress.dailyStats) {
          progress.dailyStats = {
            date: today,
            checkIns: 0,
            foodVisits: 0,
            cultureVisits: 0,
            shoppingVisits: 0,
            photos: 0,
            categories: [],
          };
        }

        return progress;
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
    return this.initializeProgress();
  }

  /**
   * 保存用戶進度
   */
  saveProgress(progress: UserProgress): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  /**
   * 添加打卡記錄
   */
  addCheckIn(
    locationId: string,
    category: Category,
    coordinates?: { latitude: number; longitude: number },
    photo?: string,
    note?: string
  ): CheckIn {
    const progress = this.getProgress();

    const checkIn: CheckIn = {
      id: `checkin_${Date.now()}`,
      locationId,
      category,
      timestamp: new Date(),
      coordinates,
      photo,
      note,
    };

    progress.checkIns.push(checkIn);
    progress.stats.totalCheckIns++;

    // 更新分類統計
    if (category === 'food') progress.stats.foodVisited++;
    if (category === 'culture') progress.stats.cultureVisited++;
    if (category === 'shopping') progress.stats.shoppingVisited++;

    // 計算唯一地點數
    const uniqueLocations = new Set(progress.checkIns.map((ci) => ci.locationId));
    progress.stats.uniqueLocations = uniqueLocations.size;

    // 更新每日統計
    progress.dailyStats.checkIns++;
    if (category === 'food') progress.dailyStats.foodVisits++;
    if (category === 'culture') progress.dailyStats.cultureVisits++;
    if (category === 'shopping') progress.dailyStats.shoppingVisits++;
    if (photo) progress.dailyStats.photos++;
    if (!progress.dailyStats.categories.includes(category)) {
      progress.dailyStats.categories.push(category);
    }

    // 檢查每日任務完成
    this.checkDailyQuests(progress);

    // 獎勵經驗值
    this.addExp(progress, 20);

    this.saveProgress(progress);
    return checkIn;
  }

  /**
   * 檢查是否已打卡
   */
  hasCheckedIn(locationId: string): boolean {
    const progress = this.getProgress();
    return progress.checkIns.some((ci) => ci.locationId === locationId);
  }

  /**
   * 獲取地點打卡次數
   */
  getCheckInCount(locationId: string): number {
    const progress = this.getProgress();
    return progress.checkIns.filter((ci) => ci.locationId === locationId).length;
  }

  /**
   * 添加經驗值
   */
  addExp(progress: UserProgress, exp: number): void {
    progress.exp += exp;

    // 檢查是否升級
    while (progress.exp >= progress.expToNextLevel) {
      progress.exp -= progress.expToNextLevel;
      progress.level++;
      progress.expToNextLevel = this.calculateExpForNextLevel(progress.level);

      // 觸發升級事件（可以加音效或動畫）
      this.onLevelUp(progress.level);
    }
  }

  /**
   * 計算下一級所需經驗值
   */
  private calculateExpForNextLevel(level: number): number {
    return Math.floor(100 * Math.pow(1.5, level - 1));
  }

  /**
   * 升級回調
   */
  private onLevelUp(newLevel: number): void {
    console.log(`🎉 恭喜升級到 Level ${newLevel}!`);
    // 可以在這裡觸發通知或動畫
  }

  /**
   * 解鎖徽章
   */
  unlockBadge(progress: UserProgress, badgeId: string): boolean {
    const badge = progress.badges.find((b) => b.id === badgeId);
    if (badge && !badge.unlocked) {
      badge.unlocked = true;
      badge.unlockedAt = new Date();
      this.saveProgress(progress);
      return true;
    }
    return false;
  }

  /**
   * 檢查成就完成
   */
  checkAchievements(progress: UserProgress): Achievement[] {
    const completed: Achievement[] = [];

    progress.achievements.forEach((achievement) => {
      if (!achievement.completed) {
        // 根據統計數據更新進度
        const newProgress = this.calculateAchievementProgress(achievement, progress);
        achievement.progress = newProgress;

        // 檢查是否完成
        if (achievement.progress >= achievement.target) {
          achievement.completed = true;
          achievement.completedAt = new Date();
          this.addExp(progress, achievement.rewards.exp);

          // 解鎖獎勵徽章
          if (achievement.rewards.badges) {
            achievement.rewards.badges.forEach((badgeId) => {
              this.unlockBadge(progress, badgeId);
            });
          }

          completed.push(achievement);
        }
      }
    });

    if (completed.length > 0) {
      this.saveProgress(progress);
    }

    return completed;
  }

  /**
   * 計算成就進度
   */
  private calculateAchievementProgress(achievement: Achievement, progress: UserProgress): number {
    // 根據成就 ID 判斷進度計算方式
    if (achievement.id.startsWith('checkin_')) {
      return progress.stats.totalCheckIns;
    }
    if (achievement.id.startsWith('food_')) {
      return progress.stats.foodVisited;
    }
    if (achievement.id.startsWith('culture_')) {
      return progress.stats.cultureVisited;
    }
    if (achievement.id.startsWith('shopping_')) {
      return progress.stats.shoppingVisited;
    }
    if (achievement.id.startsWith('level_')) {
      return progress.level;
    }
    return achievement.progress;
  }

  /**
   * 檢查每日任務完成
   */
  checkDailyQuests(progress: UserProgress): DailyQuest[] {
    const completed: DailyQuest[] = [];

    progress.dailyQuests.forEach((quest) => {
      if (quest.status !== 'completed') {
        const req = quest.requirements[0];
        let current = 0;

        switch (req.type) {
          case 'daily_checkins':
            current = progress.dailyStats.checkIns;
            break;
          case 'daily_food':
            current = progress.dailyStats.foodVisits;
            break;
          case 'daily_culture':
            current = progress.dailyStats.cultureVisits;
            break;
          case 'daily_shopping':
            current = progress.dailyStats.shoppingVisits;
            break;
          case 'daily_diverse':
            current = progress.dailyStats.categories.length;
            break;
          case 'daily_photos':
            current = progress.dailyStats.photos;
            break;
        }

        req.current = current;

        if (current >= req.target && quest.status !== 'completed') {
          quest.status = 'completed';
          quest.completedAt = new Date();
          this.addExp(progress, quest.rewards.exp);
          completed.push(quest);
        }
      }
    });

    return completed;
  }

  /**
   * 重置進度（用於測試）
   */
  resetProgress(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  /**
   * 計算兩點之間的距離（公尺）
   */
  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371e3; // 地球半徑（公尺）
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
}

export const gameService = new GameService();
