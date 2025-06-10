import React, { useState } from 'react';
import { Search, Menu, X, Home } from 'lucide-react';

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

  const categories = ['All Games', 'Daniel Tiger', 'Wild Kratts', 'Curious George', 'Carl the Collector', 'Lyla in the Loop', 'Arthur'];

  return (
    <header className="relative">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* PBS Kids Logo */}
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-white font-bold text-sm">PBS<br/>KIDS</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-4">
              <button className="bg-white border-2 border-purple-500 rounded-full px-6 py-2 flex items-center space-x-2 hover:bg-purple-50 transition-colors">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🎮</span>
                </div>
                <span className="text-purple-600 font-bold">GAMES</span>
              </button>
              
              <button className="bg-white border-2 border-purple-500 rounded-full px-6 py-2 flex items-center space-x-2 hover:bg-purple-50 transition-colors">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">▶</span>
                </div>
                <span className="text-purple-600 font-bold">VIDEOS</span>
              </button>

              {/* WETA PBS Logo */}
              <div className="flex items-center space-x-2">
                <span className="bg-red-500 text-white px-2 py-1 text-xs font-bold">WETA</span>
                <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">PBS</span>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-4 space-y-4">
            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-full">
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-l-full border-none outline-none text-gray-700 flex-1 bg-transparent"
              />
              <button
                type="submit"
                className="p-2 bg-purple-500 hover:bg-purple-600 rounded-r-full transition-colors"
              >
                <Search className="w-5 h-5 text-white" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Character Filter Tabs - Hidden on mobile, shown on larger screens */}
      <div className="hidden md:block bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-1 py-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryFilter(category)}
                className="flex-shrink-0 px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 rounded-lg font-medium transition-colors whitespace-nowrap border border-gray-200"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;