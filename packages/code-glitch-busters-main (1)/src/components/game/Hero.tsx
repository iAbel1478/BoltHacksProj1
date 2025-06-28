import { useState, useEffect } from 'react';
import { titleProgression } from '../../data/gameData';

interface HeroProps {
  stats: {
    name: string;
    level: number;
    experience: number;
    gear: any[];
    sidekicks: any[];
  };
}

export const Hero = ({ stats }: HeroProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getCurrentTitle = () => {
    const currentTitle = titleProgression
      .reverse()
      .find(title => stats.level >= title.level);
    return currentTitle || titleProgression[0];
  };

  const getHeroAppearance = () => {
    let baseClass = "text-6xl transition-all duration-300";
    if (isAnimating) {
      baseClass += " animate-bounce scale-110";
    }
    
    // Change hero based on level progression
    if (stats.level >= 20) return { emoji: "🦸‍♂️✨🏆", class: baseClass + " filter drop-shadow-2xl" };
    if (stats.level >= 15) return { emoji: "🦸‍♂️👑", class: baseClass + " filter drop-shadow-xl" };
    if (stats.level >= 10) return { emoji: "🦸‍♂️⚔️", class: baseClass + " filter drop-shadow-lg" };
    if (stats.level >= 7) return { emoji: "🦸‍♂️🛡️", class: baseClass + " filter drop-shadow-lg" };
    if (stats.level >= 4) return { emoji: "🦸‍♂️⚡", class: baseClass };
    if (stats.level >= 2) return { emoji: "👨‍💻🔍", class: baseClass };
    return { emoji: "👨‍💻", class: baseClass };
  };

  const hero = getHeroAppearance();
  const currentTitle = getCurrentTitle();

  return (
    <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-6 border-2 border-blue-400/30 backdrop-blur-sm">
      {/* Hero Avatar */}
      <div className="text-center mb-4">
        <div className={hero.class}>
          {hero.emoji}
        </div>
        <h3 className="text-xl font-bold text-white mt-2">{stats.name}</h3>
        
        {/* Dynamic Title */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text font-bold text-sm">
          {currentTitle.title}
        </div>
        <div className="text-yellow-400 text-xs opacity-75 mt-1">
          Level {stats.level}
        </div>
        <div className="text-gray-300 text-xs italic mt-1">
          "{currentTitle.description}"
        </div>
      </div>

      {/* Experience Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-white text-sm mb-1">
          <span>Experience</span>
          <span>{stats.experience} XP</span>
        </div>
        <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all duration-500"
            style={{ 
              width: `${Math.min((stats.experience % (stats.level * 200)) / (stats.level * 200) * 100, 100)}%` 
            }}
          ></div>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Next title: {titleProgression.find(t => t.level > stats.level)?.title || "Max Level!"}
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-2 text-white text-sm">
        <div className="flex justify-between">
          <span>💪 Debug Power:</span>
          <span>{stats.level * 10 + stats.gear.length * 5}</span>
        </div>
        <div className="flex justify-between">
          <span>🧠 Code Knowledge:</span>
          <span>{stats.level * 15}</span>
        </div>
        <div className="flex justify-between">
          <span>⚡ Syntax Speed:</span>
          <span>{stats.level * 8 + stats.sidekicks.length * 3}</span>
        </div>
        <div className="flex justify-between">
          <span>🔍 Bug Detection:</span>
          <span>{Math.min(stats.level * 12, 100)}%</span>
        </div>
      </div>

      {/* Special Effects for High Levels */}
      {stats.level >= 10 && (
        <div className="mt-4 text-center">
          <div className="text-yellow-400 text-xs animate-pulse">
            ✨ LEGENDARY CODER ✨
          </div>
        </div>
      )}

      {/* Power Aura */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`w-full h-full rounded-2xl transition-all duration-1000 ${
          isAnimating ? 'bg-blue-400/20 shadow-lg shadow-blue-400/50' : ''
        }`}></div>
      </div>
    </div>
  );
};
