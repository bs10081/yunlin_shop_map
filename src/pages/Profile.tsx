// 個人資料和遊戲進度頁面

import { useGame } from '@/hooks/useGame';
import { getBadgeRarityColor, getBadgeRarityBorder } from '@/data/badges';
import Breadcrumb from '@/components/Breadcrumb';

export default function Profile() {
  const {
    progress,
    level,
    exp,
    expToNextLevel,
    badges,
    achievements,
    stats,
    getProgressPercentage,
  } = useGame();

  const breadcrumbItems = [
    { label: '首頁', path: '/' },
    { label: '我的冒險' },
  ];

  const progressPercent = (exp / expToNextLevel) * 100;
  const totalProgress = getProgressPercentage();
  const unlockedBadges = badges.filter((b) => b.unlocked);
  const completedAchievements = achievements.filter((a) => a.completed);

  return (
    <div className="retro-page-bg min-h-screen">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 border-4 border-neon-pink"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.2), rgba(131, 56, 236, 0.2))',
              boxShadow: '0 0 40px rgba(255, 0, 110, 0.6), 0 0 80px rgba(255, 0, 110, 0.4)',
            }}
          >
            <i className="fas fa-user-astronaut text-5xl text-neon-pink animate-neon-pulse" aria-hidden="true"></i>
          </div>
          <h1 className="text-5xl font-retro font-black mb-4">
            <span className="neon-text-pink glitch">我的冒險</span>
          </h1>
          <p className="text-lg text-retro-purple font-retro tracking-wide">
            ADVENTURE LOG • 1980s EDITION
          </p>
        </div>

        {/* 等級和經驗值 */}
        <div className="retro-card p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-retro font-black mb-2">
                <span className="neon-text-cyan">LEVEL {level}</span>
              </h2>
              <p className="text-gray-300 font-retro">
                {exp} / {expToNextLevel} EXP
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-retro font-black neon-text-pink">{totalProgress}%</div>
              <p className="text-sm text-gray-400 font-retro">完成度</p>
            </div>
          </div>
          <div className="h-4 bg-gray-800 rounded-full overflow-hidden border-2 border-neon-cyan/50">
            <div
              className="h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 統計數據 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="retro-card p-6 text-center">
            <i className="fas fa-map-pin text-4xl text-neon-pink mb-3 animate-neon-pulse" aria-hidden="true"></i>
            <div className="text-3xl font-retro font-black text-white mb-1">{stats.totalCheckIns}</div>
            <div className="text-sm text-gray-400 font-retro">總打卡數</div>
          </div>
          <div className="retro-card p-6 text-center">
            <i className="fas fa-location-dot text-4xl text-neon-cyan mb-3 animate-neon-pulse" aria-hidden="true"></i>
            <div className="text-3xl font-retro font-black text-white mb-1">{stats.uniqueLocations}</div>
            <div className="text-sm text-gray-400 font-retro">探索地點</div>
          </div>
          <div className="retro-card p-6 text-center">
            <i className="fas fa-medal text-4xl text-neon-purple mb-3 animate-neon-pulse" aria-hidden="true"></i>
            <div className="text-3xl font-retro font-black text-white mb-1">{unlockedBadges.length}</div>
            <div className="text-sm text-gray-400 font-retro">已解鎖徽章</div>
          </div>
          <div className="retro-card p-6 text-center">
            <i className="fas fa-trophy text-4xl text-neon-green mb-3 animate-neon-pulse" aria-hidden="true"></i>
            <div className="text-3xl font-retro font-black text-white mb-1">{completedAchievements.length}</div>
            <div className="text-sm text-gray-400 font-retro">完成成就</div>
          </div>
        </div>

        {/* 分類統計 */}
        <div className="retro-card p-8 mb-8">
          <h3 className="text-2xl font-retro font-black mb-6 neon-text-cyan">分類探索</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-white font-retro">
                  <i className="fas fa-utensils text-neon-pink mr-2" aria-hidden="true"></i>
                  美食地圖
                </span>
                <span className="text-neon-pink font-retro">{stats.foodVisited}</span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-neon-pink/30">
                <div
                  className="h-full bg-gradient-to-r from-retro-pink to-neon-pink"
                  style={{ width: `${(stats.foodVisited / 15) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-white font-retro">
                  <i className="fas fa-landmark text-neon-blue mr-2" aria-hidden="true"></i>
                  文化景點
                </span>
                <span className="text-neon-blue font-retro">{stats.cultureVisited}</span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-neon-blue/30">
                <div
                  className="h-full bg-gradient-to-r from-retro-blue to-neon-blue"
                  style={{ width: `${(stats.cultureVisited / 10) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-white font-retro">
                  <i className="fas fa-store text-neon-green mr-2" aria-hidden="true"></i>
                  特色商店
                </span>
                <span className="text-neon-green font-retro">{stats.shoppingVisited}</span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-neon-green/30">
                <div
                  className="h-full bg-gradient-to-r from-retro-cyan to-neon-green"
                  style={{ width: `${(stats.shoppingVisited / 12) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 徽章收集 */}
        <div className="retro-card p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-retro font-black neon-text-pink">
              徽章收集 ({unlockedBadges.length}/{badges.length})
            </h3>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`relative p-4 rounded-lg border-2 ${getBadgeRarityBorder(badge.rarity)} ${
                  badge.unlocked
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900'
                    : 'bg-gray-900/50 opacity-40'
                } hover:scale-105 transition-transform`}
                title={badge.unlocked ? `${badge.name}\n${badge.description}` : '未解鎖'}
              >
                <i
                  className={`fas ${badge.icon} text-3xl ${
                    badge.unlocked ? getBadgeRarityColor(badge.rarity) : 'text-gray-600'
                  } ${badge.unlocked ? 'animate-neon-pulse' : ''}`}
                  aria-hidden="true"
                ></i>
                {badge.unlocked && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-neon-green rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-xs text-black" aria-hidden="true"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 成就進度 */}
        <div className="retro-card p-8">
          <h3 className="text-2xl font-retro font-black mb-6 neon-text-cyan">
            成就進度 ({completedAchievements.length}/{achievements.length})
          </h3>
          <div className="space-y-4">
            {achievements.slice(0, 10).map((achievement) => {
              const percent = (achievement.progress / achievement.target) * 100;
              return (
                <div key={achievement.id} className="bg-black/50 p-4 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <i
                        className={`fas ${achievement.icon} text-2xl ${
                          achievement.completed ? 'text-neon-green' : 'text-gray-500'
                        }`}
                        aria-hidden="true"
                      ></i>
                      <div>
                        <div className="font-retro text-white">{achievement.name}</div>
                        <div className="text-sm text-gray-400">{achievement.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-retro text-neon-cyan">
                        {achievement.progress}/{achievement.target}
                      </div>
                      {achievement.completed && (
                        <i className="fas fa-check-circle text-neon-green" aria-hidden="true"></i>
                      )}
                    </div>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-neon-cyan/30">
                    <div
                      className={`h-full ${
                        achievement.completed
                          ? 'bg-gradient-to-r from-neon-green to-neon-cyan'
                          : 'bg-gradient-to-r from-neon-cyan to-neon-purple'
                      } transition-all duration-500`}
                      style={{ width: `${Math.min(percent, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 開發者工具（可選） */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-red-900/20 border-2 border-red-500 rounded-lg">
            <h4 className="font-retro text-red-400 mb-2">開發者工具</h4>
            <button
              onClick={() => {
                if (confirm('確定要重置所有進度嗎？')) {
                  const { resetProgress } = useGame();
                  resetProgress();
                  window.location.reload();
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded font-retro hover:bg-red-700"
            >
              重置進度
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
