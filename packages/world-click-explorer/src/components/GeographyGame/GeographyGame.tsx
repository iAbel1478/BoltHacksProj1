
import React, { useState, useEffect } from 'react';
import StartScreen from './StartScreen';
import GameScreen from './GameScreen';
import EndScreen from './EndScreen';
import { GameState, Difficulty, Country } from './types';
import { getCountriesByDifficulty } from './countries';

const GeographyGame = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [difficulty, setDifficulty] = useState<Difficulty>(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [currentQuestion, setCurrentQuestion] = useState<Country | null>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [usedCountries, setUsedCountries] = useState<string[]>([]);
  const [availableCountries, setAvailableCountries] = useState<Country[]>([]);

  const startGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setGameState('playing');
    setScore(0);
    setLives(3);
    setQuestionsAnswered(0);
    setUsedCountries([]);
    
    const countries = getCountriesByDifficulty(selectedDifficulty);
    setAvailableCountries(countries);
    generateQuestion(countries, []);
  };

  const generateQuestion = (countries: Country[], used: string[]) => {
    const availableCountries = countries.filter(country => !used.includes(country.id));
    
    // If we've completed 10 questions or no more countries available, end the game
    if (questionsAnswered >= 10 || availableCountries.length === 0) {
      setGameState('end');
      return;
    }
    
    const randomCountry = availableCountries[Math.floor(Math.random() * availableCountries.length)];
    setCurrentQuestion(randomCountry);
  };

  const handleAnswer = (isCorrect: boolean, accuracy: number) => {
    if (isCorrect) {
      setScore(prev => prev + Math.round(accuracy * 100));
    } else {
      setLives(prev => prev - 1);
    }
    
    setQuestionsAnswered(prev => prev + 1);
    setUsedCountries(prev => [...prev, currentQuestion!.id]);
    
    setTimeout(() => {
      // Check if game should end
      if (lives === 1 && !isCorrect) {
        setGameState('end');
      } else if (questionsAnswered + 1 >= 10) {
        setGameState('end');
      } else {
        generateQuestion(availableCountries, [...usedCountries, currentQuestion!.id]);
      }
    }, 3500); // Increased delay for new feedback system
  };

  const restartGame = () => {
    setGameState('start');
  };

  return (
    <div className="min-h-screen">
      {gameState === 'start' && (
        <StartScreen onStart={startGame} />
      )}
      {gameState === 'playing' && currentQuestion && (
        <GameScreen
          question={currentQuestion}
          score={score}
          lives={lives}
          difficulty={difficulty}
          onAnswer={handleAnswer}
          questionsAnswered={questionsAnswered}
        />
      )}
      {gameState === 'end' && (
        <EndScreen
          score={score}
          questionsAnswered={questionsAnswered}
          onRestart={restartGame}
        />
      )}
    </div>
  );
};

export default GeographyGame;
