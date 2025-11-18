// 遊戲狀態管理 Hook

import { useState, useEffect, useCallback } from 'react';
import { gameService } from '@/services/gameService';
import { BADGES } from '@/data/badges';
import { initializeAchievements } from '@/data/achievements';
import type { UserProgress, CheckIn, Badge, Achievement } from '@/types/game';
import type { Category } from '@/types';

export function useGame() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = gameService.getProgress();

    // 初始化徽章（如果是第一次）
    if (saved.badges.length === 0) {
      saved.badges = BADGES.map((b) => ({
        ...b,
        unlocked: false,
      }));
    }

    // 初始化成就（如果是第一次）
    if (saved.achievements.length === 0) {
      saved.achievements = initializeAchievements();
    }

    return saved;
  });

  // 刷新進度
  const refreshProgress = useCallback(() => {
    const updated = gameService.getProgress();
    setProgress(updated);
  }, []);

  // 打卡
  const checkIn = useCallback(
    (
      locationId: string,
      category: Category,
      coordinates?: { latitude: number; longitude: number },
      photo?: string,
      note?: string
    ): CheckIn => {
      const checkIn = gameService.addCheckIn(locationId, category, coordinates, photo, note);
      refreshProgress();
      return checkIn;
    },
    [refreshProgress]
  );

  // 檢查是否已打卡
  const hasCheckedIn = useCallback((locationId: string): boolean => {
    return gameService.hasCheckedIn(locationId);
  }, []);

  // 獲取打卡次數
  const getCheckInCount = useCallback((locationId: string): number => {
    return gameService.getCheckInCount(locationId);
  }, []);

  // 解鎖徽章
  const unlockBadge = useCallback(
    (badgeId: string): boolean => {
      const updated = gameService.getProgress();
      const success = gameService.unlockBadge(updated, badgeId);
      if (success) {
        refreshProgress();
      }
      return success;
    },
    [refreshProgress]
  );

  // 檢查成就
  const checkAchievements = useCallback((): Achievement[] => {
    const updated = gameService.getProgress();
    const completed = gameService.checkAchievements(updated);
    if (completed.length > 0) {
      refreshProgress();
    }
    return completed;
  }, [refreshProgress]);

  // 重置進度
  const resetProgress = useCallback(() => {
    gameService.resetProgress();
    const fresh = gameService.getProgress();
    fresh.badges = BADGES.map((b) => ({
      ...b,
      unlocked: false,
    }));
    fresh.achievements = initializeAchievements();
    gameService.saveProgress(fresh);
    setProgress(fresh);
  }, []);

  // 計算進度百分比
  const getProgressPercentage = useCallback((): number => {
    const totalBadges = progress.badges.length;
    const unlockedBadges = progress.badges.filter((b) => b.unlocked).length;
    return totalBadges > 0 ? Math.round((unlockedBadges / totalBadges) * 100) : 0;
  }, [progress.badges]);

  // 獲取下一個可解鎖成就
  const getNextAchievement = useCallback((): Achievement | null => {
    return (
      progress.achievements
        .filter((a) => !a.completed)
        .sort((a, b) => {
          const aProgress = a.progress / a.target;
          const bProgress = b.progress / b.target;
          return bProgress - aProgress;
        })[0] || null
    );
  }, [progress.achievements]);

  // 自動檢查成就（當進度變化時）
  useEffect(() => {
    checkAchievements();
  }, [progress.stats.totalCheckIns, progress.level]);

  return {
    // 進度數據
    progress,
    level: progress.level,
    exp: progress.exp,
    expToNextLevel: progress.expToNextLevel,
    badges: progress.badges,
    achievements: progress.achievements,
    stats: progress.stats,

    // 方法
    checkIn,
    hasCheckedIn,
    getCheckInCount,
    unlockBadge,
    checkAchievements,
    resetProgress,
    refreshProgress,
    getProgressPercentage,
    getNextAchievement,
  };
}
