
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ColorQuiz } from './ColorQuiz';
import { ArtStyleQuiz } from './ArtStyleQuiz';
import { DrawingCanvas } from './DrawingCanvas';
import { Palette, Brush, Brain, Trophy, Star } from 'lucide-react';

type GameMode = 'menu' | 'colorQuiz' | 'artStyleQuiz' | 'drawing';

export const QuiteArtsy = () => {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [score, setScore] = useState(0);

  const handleModeSelect = (mode: GameMode) => {
    setGameMode(mode);
  };

  const handleBackToMenu = () => {
    setGameMode('menu');
  };

  const addScore = (points: number) => {
    setScore(prev => prev + points);
  };

  if (gameMode === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-3 bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200">
        <div className="text-center mb-6">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 mb-2 drop-shadow-lg transform -rotate-1"
              style={{
                fontFamily: 'Comic Sans MS, cursive',
                textShadow: '3px 3px 0 rgba(0,0,0,0.1)',
                letterSpacing: '2px'
              }}>
            Quite Artsy
          </h1>
          <p className="text-xl md:text-2xl text-purple-700 font-bold mb-4 italic transform rotate-1"
             style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            A peaceful mess of color and expression
          </p>
          <div className="flex items-center justify-center gap-3 text-2xl font-bold text-purple-700 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <Trophy size={32} className="text-yellow-500" />
            <Star size={24} className="text-yellow-400" />
            <span style={{ fontFamily: 'Comic Sans MS, cursive' }}>Score: {score}</span>
            <Star size={24} className="text-yellow-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl w-full px-4">
          <Card className="p-4 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 cursor-pointer bg-gradient-to-br from-blue-100 to-blue-200 border-4 border-blue-300 rounded-3xl"
                onClick={() => handleModeSelect('colorQuiz')}>
            <Palette className="mx-auto mb-3 text-blue-600 drop-shadow-md" size={56} />
            <h2 className="text-2xl md:text-3xl font-black text-blue-800 mb-2 transform -rotate-1"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}>Color Quest</h2>
            <p className="text-blue-700 font-semibold text-sm"
               style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Mix colors, crack hex codes, and find opposites!
            </p>
          </Card>

          <Card className="p-4 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 cursor-pointer bg-gradient-to-br from-green-100 to-green-200 border-4 border-green-300 rounded-3xl"
                onClick={() => handleModeSelect('artStyleQuiz')}>
            <Brain className="mx-auto mb-3 text-green-600 drop-shadow-md" size={56} />
            <h2 className="text-2xl md:text-3xl font-black text-green-800 mb-2 transform rotate-1"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}>Style Detective</h2>
            <p className="text-green-700 font-semibold text-sm"
               style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Spot cartoon, retro, and artistic styles!
            </p>
          </Card>

          <Card className="p-4 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 cursor-pointer bg-gradient-to-br from-pink-100 to-pink-200 border-4 border-pink-300 rounded-3xl"
                onClick={() => handleModeSelect('drawing')}>
            <Brush className="mx-auto mb-3 text-pink-600 drop-shadow-md" size={56} />
            <h2 className="text-2xl md:text-3xl font-black text-pink-800 mb-2 transform -rotate-1"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}>Art Studio</h2>
            <p className="text-pink-700 font-semibold text-sm"
               style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Draw amazing emojis and unleash creativity!
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-3 bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Button 
            onClick={handleBackToMenu}
            variant="outline"
            className="bg-white/90 hover:bg-white border-3 border-purple-400 text-purple-700 font-bold rounded-full px-6 py-3 text-lg shadow-lg transform hover:scale-105 transition-all"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            ← Back to Menu
          </Button>
          <div className="flex items-center gap-3 text-xl font-bold text-purple-700 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <Trophy size={28} className="text-yellow-500" />
            <Star size={20} className="text-yellow-400" />
            <span style={{ fontFamily: 'Comic Sans MS, cursive' }}>Score: {score}</span>
            <Star size={20} className="text-yellow-400" />
          </div>
        </div>

        {gameMode === 'colorQuiz' && <ColorQuiz onAddScore={addScore} />}
        {gameMode === 'artStyleQuiz' && <ArtStyleQuiz onAddScore={addScore} />}
        {gameMode === 'drawing' && <DrawingCanvas onAddScore={addScore} />}
      </div>
    </div>
  );
};
