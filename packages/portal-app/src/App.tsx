import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import GameGrid from './components/GameGrid';
import Footer from './components/Footer';
import GamePage from './components/GamePage';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-pink-100">
      <Header 
        onSearch={handleSearch} 
      />
      <Hero />
      <GameGrid 
        searchQuery={searchQuery}
      />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:id" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;