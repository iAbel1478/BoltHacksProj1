import React from 'react';
import GameHeader from '../components/GameHeader';
import QuizGame from '../components/QuizGame';

const Index = () => {
  return (
    <div className="min-h-screen bg-[url('/parchment-bg.png')] bg-repeat bg-biblical-cream font-serif px-4 py-8">
      <GameHeader />
      <div className="py-8 max-w-3xl mx-auto">
        <QuizGame />
      </div>
      
      {/* Decorative biblical elements */}
      <div className="fixed top-20 left-4 opacity-20 pointer-events-none hidden lg:block">
        <div className="w-16 h-24 bg-wood-400 rounded-t-full"></div>
        <div className="w-16 h-2 bg-wood-600"></div>
      </div>
      
      <div className="fixed top-20 right-4 opacity-20 pointer-events-none hidden lg:block">
        <div className="w-16 h-24 bg-wood-400 rounded-t-full"></div>
        <div className="w-16 h-2 bg-wood-600"></div>
      </div>
      
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 opacity-20 pointer-events-none">
        <div className="text-xs text-wood-600 text-center font-serif">
          "Train up a child in the way he should go" - Proverbs 22:6
        </div>
      </div>
    </div>
  );
};

export default Index;
