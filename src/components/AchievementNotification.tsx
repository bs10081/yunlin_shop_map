// 成就通知組件

import { useEffect, useState } from 'react';
import type { Achievement, Badge } from '@/types/game';

interface AchievementNotificationProps {
  achievement?: Achievement;
  badge?: Badge;
  onClose: () => void;
}

export default function AchievementNotification({
  achievement,
  badge,
  onClose,
}: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 動畫進入
    setTimeout(() => setIsVisible(true), 100);

    // 3秒後自動關閉
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (achievement) {
    return (
      <div
        className={`fixed top-20 right-4 z-[100] max-w-sm transition-all duration-300 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="retro-card p-6 border-4 border-neon-green shadow-2xl animate-bounce-slow">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-green/30 to-neon-cyan/30 flex items-center justify-center border-2 border-neon-green">
                <i
                  className={`fas ${achievement.icon} text-3xl text-neon-green animate-neon-pulse`}
                  aria-hidden="true"
                ></i>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-xs font-retro text-neon-cyan mb-1 tracking-wider">
                🎉 成就解鎖！
              </div>
              <div className="text-lg font-retro font-black text-white mb-1">{achievement.name}</div>
              <div className="text-sm text-gray-300 mb-2">{achievement.description}</div>
              <div className="text-xs font-retro text-neon-pink">
                +{achievement.rewards.exp} EXP
              </div>
            </div>
          </div>
          {/* 閃光效果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer pointer-events-none"></div>
        </div>
      </div>
    );
  }

  if (badge) {
    return (
      <div
        className={`fixed top-20 right-4 z-[100] max-w-sm transition-all duration-300 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="retro-card p-6 border-4 border-neon-pink shadow-2xl animate-bounce-slow">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-pink/30 to-neon-purple/30 flex items-center justify-center border-2 border-neon-pink">
                <i
                  className={`fas ${badge.icon} text-3xl text-neon-pink animate-neon-pulse`}
                  aria-hidden="true"
                ></i>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-xs font-retro text-neon-cyan mb-1 tracking-wider">
                ⭐ 徽章獲得！
              </div>
              <div className="text-lg font-retro font-black text-white mb-1">{badge.name}</div>
              <div className="text-sm text-gray-300">{badge.description}</div>
            </div>
          </div>
          {/* 閃光效果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer pointer-events-none"></div>
        </div>
      </div>
    );
  }

  return null;
}
