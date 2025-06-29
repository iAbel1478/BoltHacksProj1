
import React from 'react';

interface BossEnemyProps {
  boss: any;
  onClick: () => void;
  getGermEmoji: (type: string) => string;
  getGermColor: (type: string) => string;
}

const BossEnemy: React.FC<BossEnemyProps> = ({ boss, onClick, getGermEmoji, getGermColor }) => {
  return (
    <div
      className={`absolute cursor-pointer transform transition-all duration-300 hover:scale-110 ${getGermColor(boss.type)} rounded-full flex items-center justify-center shadow-2xl animate-pulse border-4 border-yellow-400`}
      style={{
        left: `${boss.x}px`,
        top: `${boss.y}px`,
        width: `${boss.size}px`,
        height: `${boss.size}px`,
        animation: 'pulse 1s ease-in-out infinite, bounce 2s ease-in-out infinite'
      }}
      onClick={onClick}
    >
      <span className="text-4xl animate-spin">{getGermEmoji(boss.type)}</span>
      <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-1 rounded-full">
        BOSS
      </div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {[...Array(boss.hitsRemaining)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
        ))}
      </div>
    </div>
  );
};

export default BossEnemy;
