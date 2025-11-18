// 用戶進度顯示組件

import { useGame } from '@/hooks/useGame';
import { Link } from 'react-router-dom';

export default function UserProgress() {
  const { level, exp, expToNextLevel } = useGame();

  const progressPercent = (exp / expToNextLevel) * 100;

  return (
    <Link
      to="/profile"
      className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-2 border-neon-cyan/30 hover:border-neon-cyan transition-all group"
    >
      {/* 等級 */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 border-2 border-neon-cyan group-hover:shadow-lg group-hover:shadow-neon-cyan/50 transition-all">
        <span className="text-sm font-retro font-black text-neon-cyan">{level}</span>
      </div>

      {/* 經驗值條 */}
      <div className="hidden sm:flex flex-col min-w-[100px]">
        <span className="text-xs font-retro text-gray-300 mb-1">
          LV.{level} • {exp}/{expToNextLevel} EXP
        </span>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden border border-neon-cyan/30">
          <div
            className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 移動端簡化顯示 */}
      <div className="sm:hidden">
        <span className="text-xs font-retro text-neon-cyan font-bold">LV.{level}</span>
      </div>
    </Link>
  );
}
