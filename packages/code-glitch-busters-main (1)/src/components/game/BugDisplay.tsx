
import { useState, useEffect } from 'react';

interface BugDisplayProps {
  bugType: string;
  isDefeated: boolean;
  intensity: number;
  language: string;
}

export const BugDisplay = ({ bugType, isDefeated, intensity, language }: BugDisplayProps) => {
  const [isAttacking, setIsAttacking] = useState(false);

  useEffect(() => {
    if (!isDefeated) {
      const interval = setInterval(() => {
        setIsAttacking(true);
        setTimeout(() => setIsAttacking(false), 500);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isDefeated]);

  const getBugEmoji = () => {
    switch (bugType) {
      case 'syntax': return '🐞';
      case 'logic': return '👾';
      case 'runtime': return '💥';
      case 'boss': return '🐲';
      default: return '🐛';
    }
  };

  const getBugName = () => {
    const languagePrefix = language !== 'Multi-Language' ? `${language} ` : '';
    switch (bugType) {
      case 'syntax': return `${languagePrefix}Syntax Serpent`;
      case 'logic': return `${languagePrefix}Logic Lurker`;
      case 'runtime': return `${languagePrefix}Runtime Reaper`;
      case 'boss': return 'Mega Glitch Dragon';
      default: return `${languagePrefix}Code Creeper`;
    }
  };

  const getSize = () => {
    if (bugType === 'boss') return 'text-8xl';
    return 'text-6xl';
  };

  return (
    <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-2xl p-6 border-2 border-red-400/50 backdrop-blur-sm relative overflow-hidden">
      {/* Bug Monster */}
      <div className="text-center">
        <div 
          className={`${getSize()} transition-all duration-300 ${
            isDefeated 
              ? 'grayscale opacity-50 scale-75' 
              : isAttacking 
                ? 'animate-pulse scale-110 filter hue-rotate-180' 
                : 'animate-bounce'
          }`}
          style={{
            filter: isDefeated ? 'grayscale(100%)' : `hue-rotate(${intensity * 20}deg) saturate(${1 + intensity * 0.1})`
          }}
        >
          {getBugEmoji()}
        </div>
        
        <h3 className={`text-xl font-bold mt-2 ${isDefeated ? 'text-gray-400' : 'text-red-400'}`}>
          {getBugName()}
        </h3>
        
        <div className={`text-sm mt-1 ${isDefeated ? 'text-gray-500' : 'text-orange-400'}`}>
          {isDefeated ? '💀 DEFEATED' : '⚡ ACTIVE THREAT'}
        </div>
      </div>

      {/* Health Bar */}
      {!isDefeated && (
        <div className="mt-4">
          <div className="flex justify-between text-red-300 text-xs mb-1">
            <span>Glitch Power</span>
            <span>{intensity * 10}%</span>
          </div>
          <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-red-500 to-red-700 h-full transition-all duration-500 animate-pulse"
              style={{ width: `${Math.min(intensity * 10, 100)}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Attack Effects */}
      {isAttacking && !isDefeated && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full bg-red-500/30 animate-ping rounded-2xl"></div>
          <div className="absolute top-2 left-2 text-yellow-400 text-lg animate-bounce">💥</div>
          <div className="absolute bottom-2 right-2 text-orange-400 text-lg animate-bounce">⚡</div>
        </div>
      )}

      {/* Boss Special Effects */}
      {bugType === 'boss' && !isDefeated && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full bg-purple-500/20 animate-pulse rounded-2xl"></div>
        </div>
      )}

      {/* Victory Celebration */}
      {isDefeated && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="text-4xl animate-bounce">✨🎉✨</div>
        </div>
      )}
    </div>
  );
};
