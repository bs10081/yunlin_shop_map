// 任務清單頁面

import { useGame } from '@/hooks/useGame';
import { initializeQuests } from '@/data/quests';
import Breadcrumb from '@/components/Breadcrumb';
import { useEffect } from 'react';

export default function Quests() {
  const { progress } = useGame();

  // 初始化任務（如果還沒有）
  useEffect(() => {
    if (progress.quests.length === 0) {
      progress.quests = initializeQuests();
    }
  }, [progress]);

  const breadcrumbItems = [
    { label: '首頁', path: '/' },
    { label: '任務中心' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-neon-green border-neon-green';
      case 'medium':
        return 'text-neon-cyan border-neon-cyan';
      case 'hard':
        return 'text-neon-pink border-neon-pink';
      default:
        return 'text-gray-400 border-gray-400';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '簡單';
      case 'medium':
        return '中等';
      case 'hard':
        return '困難';
      default:
        return difficulty;
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'food':
        return 'fa-utensils';
      case 'culture':
        return 'fa-landmark';
      case 'shopping':
        return 'fa-store';
      default:
        return 'fa-star';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'food':
        return 'text-neon-pink';
      case 'culture':
        return 'text-neon-blue';
      case 'shopping':
        return 'text-neon-green';
      default:
        return 'text-neon-cyan';
    }
  };

  // 根據統計數據更新任務進度
  const getQuestProgress = (quest: any) => {
    const req = quest.requirements[0];
    let current = 0;

    switch (req.type) {
      case 'checkin':
        current = progress.stats.totalCheckIns;
        break;
      case 'unique_locations':
        current = progress.stats.uniqueLocations;
        break;
      case 'food_visits':
        current = progress.stats.foodVisited;
        break;
      case 'culture_visits':
        current = progress.stats.cultureVisited;
        break;
      case 'shopping_visits':
        current = progress.stats.shoppingVisited;
        break;
      case 'level':
        current = progress.level;
        break;
    }

    return {
      current,
      target: req.target,
      percent: Math.min((current / req.target) * 100, 100),
    };
  };

  return (
    <div className="retro-page-bg min-h-screen">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 border-4 border-neon-cyan"
            style={{
              background: 'linear-gradient(135deg, rgba(6, 255, 165, 0.2), rgba(58, 134, 255, 0.2))',
              boxShadow: '0 0 40px rgba(6, 255, 165, 0.6), 0 0 80px rgba(6, 255, 165, 0.4)',
            }}
          >
            <i className="fas fa-scroll text-5xl text-neon-cyan animate-neon-pulse" aria-hidden="true"></i>
          </div>
          <h1 className="text-5xl font-retro font-black mb-4">
            <span className="neon-text-cyan glitch">任務中心</span>
          </h1>
          <p className="text-lg text-retro-purple font-retro tracking-wide">
            QUEST LOG • 1980s EDITION
          </p>
        </div>

        {/* Quest List */}
        <div className="space-y-6">
          {progress.quests.map((quest) => {
            const progressData = getQuestProgress(quest);
            const isCompleted = progressData.current >= progressData.target;

            return (
              <div
                key={quest.id}
                className={`retro-card p-6 border-2 ${
                  isCompleted ? 'border-neon-green' : 'border-gray-700'
                } ${isCompleted ? 'bg-gradient-to-r from-neon-green/10 to-neon-cyan/10' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`mt-1 ${getCategoryColor(quest.category)}`}>
                      <i
                        className={`fas ${getCategoryIcon(quest.category)} text-3xl`}
                        aria-hidden="true"
                      ></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-retro font-black text-white">{quest.title}</h3>
                        <span
                          className={`text-xs font-retro px-2 py-1 rounded border ${getDifficultyColor(
                            quest.difficulty
                          )}`}
                        >
                          {getDifficultyLabel(quest.difficulty)}
                        </span>
                        {isCompleted && (
                          <span className="text-xs font-retro px-2 py-1 rounded border border-neon-green text-neon-green">
                            <i className="fas fa-check mr-1" aria-hidden="true"></i>
                            完成
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 mb-4">{quest.description}</p>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-neon-cyan font-retro">
                            進度: {progressData.current} / {progressData.target}
                          </span>
                          <span className="text-neon-purple font-retro">
                            {Math.round(progressData.percent)}%
                          </span>
                        </div>
                        <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-neon-cyan/30">
                          <div
                            className={`h-full transition-all duration-500 ${
                              isCompleted
                                ? 'bg-gradient-to-r from-neon-green to-neon-cyan'
                                : 'bg-gradient-to-r from-neon-cyan to-neon-purple'
                            }`}
                            style={{ width: `${progressData.percent}%` }}
                          />
                        </div>
                      </div>

                      {/* Rewards */}
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <i className="fas fa-star text-neon-pink" aria-hidden="true"></i>
                          <span className="text-gray-300">+{quest.rewards.exp} EXP</span>
                        </div>
                        {quest.rewards.badges && quest.rewards.badges.length > 0 && (
                          <div className="flex items-center space-x-2">
                            <i className="fas fa-medal text-neon-purple" aria-hidden="true"></i>
                            <span className="text-gray-300">徽章獎勵</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {progress.quests.length === 0 && (
          <div className="text-center py-12">
            <i className="fas fa-scroll text-6xl text-gray-600 mb-4" aria-hidden="true"></i>
            <p className="text-gray-400 font-retro">目前沒有任務</p>
          </div>
        )}
      </div>
    </div>
  );
}
