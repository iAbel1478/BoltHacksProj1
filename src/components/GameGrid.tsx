import React, { useState, useMemo } from 'react';
import GameCard from './GameCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { allGames } from '../data/games';

interface GameGridProps {
  searchQuery: string;
  categoryFilter: string;
}

const GameGrid: React.FC<GameGridProps> = ({ searchQuery, categoryFilter }) => {
  const [visibleCount, setVisibleCount] = useState(50);

  const filteredGames = useMemo(() => {
    return allGames.filter(game => {
      const matchesSearch = searchQuery === '' || 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.character.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'All Games' || 
        game.character === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const visibleGames = filteredGames.slice(0, visibleCount);

  return (
    <div className="bg-white">
      {/* Featured Games Carousel */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Featured Games</h2>
            <div className="flex space-x-2">
              <button className="p-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {allGames.slice(0, 6).map(game => (
              <GameCard key={game.id} game={game} isCarousel={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Main Games Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              All Games
            </h2>
            <p className="text-lg text-gray-600">
              Educational games featuring your favorite Learning Leopards characters
            </p>
          </div>

          {visibleGames.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No games found. Try a different search or category!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}

          {visibleGames.length > 0 && visibleGames.length < filteredGames.length && (
            <div className="text-center mt-12">
              <button
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                onClick={() => setVisibleCount(c => Math.min(c + 50, filteredGames.length))}
              >
                Load {Math.min(50, filteredGames.length - visibleCount)} More Games
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GameGrid;