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
      {/* Entire header content removed as requested */}
    </header>
  );
};

export default Header;