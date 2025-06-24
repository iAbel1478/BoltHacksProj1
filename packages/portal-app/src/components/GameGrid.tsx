import React, { useState, useMemo } from 'react';
import GameCard from './GameCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { allGames } from '../data/games-with-geography';

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
    <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
      {/* Featured Games Carousel */}
      <section className="py-12 bg-gradient-to-r from-orange-100 via-yellow-100 to-pink-100 border-t-4 border-yellow-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-orange-700 drop-shadow-sm" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              🌟 Featured Games 🌟
            </h2>
            <div className="flex space-x-3">
              <button className="p-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-xl border-2 border-yellow-300">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button className="p-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-xl border-2 border-yellow-300">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="flex space-x-6 overflow-x-auto pb-6">
            {allGames.slice(0, 6).map(game => (
              <GameCard key={game.id} game={game} isCarousel={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Main Games Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-orange-700 mb-6 drop-shadow-sm" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              🎮 All Games 🎮
            </h2>
            <p className="text-xl text-gray-700 font-semibold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Educational games featuring your favorite Learning Leopards characters!
            </p>
          </div>

          {visibleGames.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-yellow-300 max-w-md mx-auto">
                <p className="text-2xl text-orange-600 font-black" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  🕵️ No games found! 🕵️
                </p>
                <p className="text-lg text-gray-600 font-semibold mt-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  Try a different search or category!
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {visibleGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}

          {visibleGames.length > 0 && visibleGames.length < filteredGames.length && (
            <div className="text-center mt-16">
              <button
                className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 hover:from-green-600 hover:via-blue-600 hover:to-purple-700 text-white font-black py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-110 shadow-2xl border-4 border-yellow-300" style={{ fontFamily: 'Comic Sans MS, cursive' }}
                onClick={() => setVisibleCount(c => Math.min(c + 50, filteredGames.length))}
              >
                🎯 Load More Games! 🎯
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GameGrid;