import React, { useState } from 'react';
import { Search, Menu, X, Home } from 'lucide-react';
import { allGames } from '../data/games-with-geography';

interface HeaderProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onCategoryFilter }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const categories = ['All Games', ...allGames.slice(0, 3).map(game => game.title)];

  return (
    <header className="relative bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-400 shadow-2xl border-b-4 border-yellow-300">
      {/* Bolt Badge - fixed top right */}
      <a
        href="https://bolt.new/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 top-4 right-4 md:top-6 md:right-8"
        style={{ display: 'block' }}
        aria-label="Built with Bolt.new"
      >
        <img
          src="/bolt-badge-white-circle.svg"
          alt="Built with Bolt.new"
          className="w-16 h-16 md:w-20 md:h-20 drop-shadow-xl hover:scale-105 transition-transform duration-200"
        />
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl" role="img" aria-label="Leopard Paw Print">🐾</span>
            <h1 className="text-2xl font-black text-white drop-shadow-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Learning Leopards
            </h1>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for games..."
                  className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border-4 border-yellow-300 rounded-full text-gray-800 font-semibold shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:border-yellow-400"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
              </div>
            </form>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <button className="text-white font-black hover:text-yellow-200 transition-colors duration-300" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Home
            </button>
            <button className="text-white font-black hover:text-yellow-200 transition-colors duration-300" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Games
            </button>
            <button className="text-white font-black hover:text-yellow-200 transition-colors duration-300" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Videos
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Category Filter */}
        <div className="pb-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryFilter(category)}
                className="bg-white/90 hover:bg-white text-orange-600 font-black px-4 py-2 rounded-full shadow-lg border-2 border-yellow-300 transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-4 border-yellow-300 mt-4 p-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for games..."
                  className="w-full pl-10 pr-4 py-3 bg-white border-4 border-yellow-300 rounded-full text-gray-800 font-semibold shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
              </div>
            </form>
            <nav className="space-y-2">
              <button className="block w-full text-left text-orange-600 font-black py-2 px-4 rounded-lg hover:bg-orange-100 transition-colors duration-300" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Home
              </button>
              <button className="block w-full text-left text-orange-600 font-black py-2 px-4 rounded-lg hover:bg-orange-100 transition-colors duration-300" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Games
              </button>
              <button className="block w-full text-left text-orange-600 font-black py-2 px-4 rounded-lg hover:bg-orange-100 transition-colors duration-300" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Videos
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;