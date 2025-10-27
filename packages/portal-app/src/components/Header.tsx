import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  // Trigger search when user stops typing (after 300ms)
  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    setTypingTimeout(timeout);

    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [searchQuery, onSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="relative bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-400 shadow-2xl border-b-4 border-yellow-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Search Bar - Centered */}
          <div className="hidden md:flex justify-center absolute left-1/2 transform -translate-x-1/2 w-1/2">
            <form onSubmit={handleSearch} className="w-full max-w-2xl">
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

          {/* Logo - Pushed to the right */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            <span className="text-3xl" role="img" aria-label="Leopard Paw Print">🐾</span>
            <h1 className="text-2xl font-black text-white drop-shadow-lg whitespace-nowrap" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Learning Leopards
            </h1>
          </div>

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

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-4 border-yellow-200 mt-4 p-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for games..."
                  className="w-full pl-10 pr-4 py-3 bg-white border-4 border-yellow-200 rounded-full text-gray-800 font-semibold shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
              </div>
            </form>
            <div className="p-4 text-center">
              <p className="text-orange-600 font-semibold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Use the search bar to find games
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;