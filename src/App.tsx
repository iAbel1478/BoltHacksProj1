import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import GameGrid from './components/GameGrid';
import Footer from './components/Footer';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Games');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onSearch={handleSearch} 
        onCategoryFilter={handleCategoryFilter} 
      />
      <Hero />
      <GameGrid 
        searchQuery={searchQuery} 
        categoryFilter={categoryFilter} 
      />
      <Footer />
    </div>
  );
}

export default App;