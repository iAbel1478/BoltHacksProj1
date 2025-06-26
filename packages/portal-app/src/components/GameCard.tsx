import React from 'react';
import { Play, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Game } from '../data/games-with-geography';

interface GameCardProps {
  game: Game;
  isCarousel?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, isCarousel = false }) => {
  const getCharacterColor = (character: string) => {
    const colors = {
      'Daniel Tiger': 'bg-gradient-to-r from-red-400 to-red-600',
      'Wild Kratts': 'bg-gradient-to-r from-green-400 to-green-600',
      'Curious George': 'bg-gradient-to-r from-yellow-400 to-yellow-600',
      'Carl the Collector': 'bg-gradient-to-r from-gray-500 to-gray-700',
      'Lyla in the Loop': 'bg-gradient-to-r from-purple-400 to-purple-600',
      'Arthur': 'bg-gradient-to-r from-blue-400 to-blue-600',
      'Elinor Wonders Why': 'bg-gradient-to-r from-teal-400 to-teal-600',
      'Learning Leopards': 'bg-gradient-to-r from-orange-400 to-orange-600',
    };
    return colors[character as keyof typeof colors] || 'bg-gradient-to-r from-gray-400 to-gray-600';
  };

  const handleGameClick = () => {
    window.open(`/game/${game.id}`, '_blank');
  };

  if (isCarousel) {
    return (
      <div 
        className="flex-shrink-0 w-48 bg-gradient-to-br from-white to-yellow-50 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-yellow-200"
        onClick={handleGameClick}
      >
        <div className="relative">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
            <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-full p-2 opacity-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <Play className="w-4 h-4 text-white ml-0.5" />
            </button>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-black text-gray-800 text-sm mb-1 line-clamp-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            {game.title}
          </h3>
          <div className="text-xs text-gray-600 font-semibold">{game.character}</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-gradient-to-br from-white via-yellow-50 to-orange-50 rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer relative border-4 border-yellow-200"
      onClick={handleGameClick}
    >
      {game.isNew && (
        <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-black px-3 py-1 rounded-full z-10 shadow-lg border-2 border-yellow-300">
          NEW!
        </div>
      )}
      
      <div className="relative group">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-40 object-cover group-hover:brightness-110 transition-all duration-300 border-b-4 border-yellow-200"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl">
            <Play className="w-6 h-6 text-white ml-0.5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className={`${getCharacterColor(game.character)} text-white text-xs font-black px-3 py-1 rounded-full shadow-lg border border-yellow-200`}>
            {game.character}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 font-semibold">{game.rating}</span>
          </div>
        </div>

        <h3 className="font-black text-gray-800 mb-2 text-lg leading-tight" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          {game.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-semibold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          {game.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-gray-600 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1 rounded-full border border-yellow-300">
            Ages {game.ageRange}
          </span>
          <button className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 hover:from-green-600 hover:via-blue-600 hover:to-purple-700 text-white font-black py-2 px-4 rounded-full text-sm transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-yellow-300" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            🎮 Play Now! 🎮
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;