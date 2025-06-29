
import React, { useState } from 'react';
import GameBoard from '../components/GameBoard';
import WelcomeScreen from '../components/WelcomeScreen';
import BreathingExercise from '../components/BreathingExercise';

const Index = () => {
  const [gameState, setGameState] = useState<'welcome' | 'playing' | 'breathing'>('welcome');
  const [currentLevel, setCurrentLevel] = useState(1);

  const startGame = () => {
    setGameState('playing');
  };

  const levelComplete = () => {
    setGameState('breathing');
  };

  const breathingComplete = () => {
    setCurrentLevel(prev => prev + 1);
    setGameState('playing');
  };

  const backToWelcome = () => {
    setGameState('welcome');
    setCurrentLevel(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100">
      {gameState === 'welcome' && (
        <WelcomeScreen onStartGame={startGame} />
      )}
      
      {gameState === 'playing' && (
        <GameBoard 
          level={currentLevel} 
          onLevelComplete={levelComplete}
          onBackToMenu={backToWelcome}
        />
      )}
      
      {gameState === 'breathing' && (
        <BreathingExercise 
          onComplete={breathingComplete}
          level={currentLevel}
        />
      )}
    </div>
  );
};

export default Index;
