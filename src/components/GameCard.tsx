import React from 'react';
import { Play, Star } from 'lucide-react';
import { Game } from '../data/games';

interface GameCardProps {
  game: Game;
  isCarousel?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, isCarousel = false }) => {
  const getCharacterColor = (character: string) => {
    const colors = {
      'Daniel Tiger': 'bg-red-400',
      'Wild Kratts': 'bg-green-500',
      'Curious George': 'bg-yellow-400',
      'Carl the Collector': 'bg-gray-600',
      'Lyla in the Loop': 'bg-purple-500',
      'Arthur': 'bg-blue-500',
      'Elinor Wonders Why': 'bg-teal-500',
      'Learning Leopards': 'bg-orange-500',
    };
    return colors[character as keyof typeof colors] || 'bg-gray-400';
  };

  const handleGameClick = () => {
    window.open(`/game/${game.id}`, '_blank');
  };

  if (isCarousel) {
    return (
      <div 
        className="flex-shrink-0 w-48 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        onClick={handleGameClick}
      >
        <div className="relative">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
            <button className="bg-white/90 hover:bg-white rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity">
              <Play className="w-4 h-4 text-purple-600 ml-0.5" />
            </button>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">
            {game.title}
          </h3>
          <div className="text-xs text-gray-600">{game.character}</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer relative"
      onClick={handleGameClick}
    >
      {game.isNew && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          NEW!
        </div>
      )}
      
      <div className="relative group">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-40 object-cover group-hover:brightness-110 transition-all duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <button className="bg-white/90 hover:bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
            <Play className="w-6 h-6 text-purple-600 ml-0.5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`${getCharacterColor(game.character)} text-white text-xs font-bold px-2 py-1 rounded-full`}>
            {game.character}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{game.rating}</span>
          </div>
        </div>

        <h3 className="font-bold text-gray-800 mb-2 text-lg leading-tight">
          {game.title}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {game.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            Ages {game.ageRange}
          </span>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full text-sm transition-all duration-200 transform hover:scale-105">
            Play Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;