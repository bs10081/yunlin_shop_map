// 排行榜頁面

import { useState, useEffect } from 'react';
import { leaderboardService } from '@/services/leaderboardService';
import { useGame } from '@/hooks/useGame';
import type { LeaderboardEntry } from '@/types/game';
import Breadcrumb from '@/components/Breadcrumb';

type SortType = 'level' | 'exp' | 'badges' | 'checkIns';

export default function Leaderboard() {
  const [sortBy, setSortBy] = useState<SortType>('level');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const { level } = useGame();

  useEffect(() => {
    loadLeaderboard();
  }, [sortBy]);

  const loadLeaderboard = () => {
    const data = leaderboardService.getLeaderboard(sortBy);
    setLeaderboard(data);
  };

  const breadcrumbItems = [
    { label: '首頁', path: '/' },
    { label: '排行榜' },
  ];

  const sortOptions = [
    { id: 'level' as SortType, label: '等級', icon: 'fa-star' },
    { id: 'exp' as SortType, label: '經驗值', icon: 'fa-chart-line' },
    { id: 'badges' as SortType, label: '徽章數', icon: 'fa-medal' },
    { id: 'checkIns' as SortType, label: '打卡數', icon: 'fa-map-pin' },
  ];

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-300';
    if (rank === 3) return 'text-orange-400';
    return 'text-neon-cyan';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return 'fa-crown';
    if (rank === 2) return 'fa-medal';
    if (rank === 3) return 'fa-award';
    return '';
  };

  const isCurrentUser = (entry: LeaderboardEntry) => {
    return entry.username === `探險家${level}` && entry.level === level;
  };

  return (
    <div className="retro-page-bg min-h-screen">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 border-4 border-neon-pink"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.2), rgba(255, 16, 240, 0.2))',
              boxShadow: '0 0 40px rgba(255, 0, 110, 0.6), 0 0 80px rgba(255, 0, 110, 0.4)',
            }}
          >
            <i className="fas fa-trophy text-5xl text-neon-pink animate-neon-pulse" aria-hidden="true"></i>
          </div>
          <h1 className="text-5xl font-retro font-black mb-4">
            <span className="neon-text-pink glitch">排行榜</span>
          </h1>
          <p className="text-lg text-retro-purple font-retro tracking-wide">
            LEADERBOARD • 1980s EDITION
          </p>
        </div>

        {/* 排序選項 */}
        <div className="flex justify-center space-x-3 mb-12">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSortBy(option.id)}
              className={`px-6 py-3 rounded-lg border-2 font-retro font-bold transition-all ${
                sortBy === option.id
                  ? 'border-neon-pink bg-neon-pink/20 text-neon-pink'
                  : 'border-gray-700 text-gray-300 hover:border-neon-pink/50'
              }`}
            >
              <i className={`fas ${option.icon} mr-2`} aria-hidden="true"></i>
              {option.label}
            </button>
          ))}
        </div>

        {/* 排行榜列表 */}
        <div className="space-y-3 max-w-4xl mx-auto">
          {leaderboard.map((entry) => (
            <div
              key={`${entry.username}-${entry.rank}`}
              className={`retro-card p-6 border-2 flex items-center justify-between ${
                isCurrentUser(entry)
                  ? 'border-neon-cyan bg-neon-cyan/10'
                  : entry.rank <= 3
                  ? 'border-neon-pink/50 bg-neon-pink/5'
                  : 'border-gray-700'
              }`}
            >
              <div className="flex items-center space-x-6 flex-1">
                {/* 排名 */}
                <div className="w-16 text-center">
                  {entry.rank <= 3 && getRankIcon(entry.rank) ? (
                    <i
                      className={`fas ${getRankIcon(entry.rank)} text-4xl ${getRankColor(entry.rank)}`}
                      aria-hidden="true"
                    ></i>
                  ) : (
                    <div className={`text-4xl font-retro font-black ${getRankColor(entry.rank)}`}>
                      {entry.rank}
                    </div>
                  )}
                </div>

                {/* 用戶信息 */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center border-2 border-neon-cyan">
                      <i className="fas fa-user text-white" aria-hidden="true"></i>
                    </div>
                    <div>
                      <div className="text-xl font-retro font-black text-white flex items-center space-x-2">
                        <span>{entry.username}</span>
                        {isCurrentUser(entry) && (
                          <span className="text-xs px-2 py-1 rounded bg-neon-cyan/20 border border-neon-cyan text-neon-cyan">
                            你
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400 font-retro">Level {entry.level}</div>
                    </div>
                  </div>
                </div>

                {/* 統計數據 */}
                <div className="flex space-x-8 text-center">
                  <div>
                    <div className="text-2xl font-retro font-black text-neon-pink">{entry.level}</div>
                    <div className="text-xs text-gray-400 font-retro">等級</div>
                  </div>
                  <div>
                    <div className="text-2xl font-retro font-black text-neon-purple">{entry.badges}</div>
                    <div className="text-xs text-gray-400 font-retro">徽章</div>
                  </div>
                  <div>
                    <div className="text-2xl font-retro font-black text-neon-cyan">{entry.checkIns}</div>
                    <div className="text-xs text-gray-400 font-retro">打卡</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
