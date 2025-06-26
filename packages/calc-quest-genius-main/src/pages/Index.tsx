import React, { useState, useEffect } from 'react';
import GameBoard from '../components/GameBoard';
import GameControls from '../components/GameControls';
import { generateEquation, validateEquation } from '../utils/gameLogic';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type Difficulty = 'easy' | 'medium' | 'hard' | 'killer';
type CellState = 'correct' | 'partial' | 'incorrect' | 'empty';

interface GameState {
  targetNumber: number;
  targetEquation: string;
  currentRow: number;
  maxAttempts: number;
  gridSize: number;
  guesses: string[][];
  cellStates: CellState[][];
  gameStatus: 'playing' | 'won' | 'lost';
  hintsUsed: number;
  isPracticeMode: boolean;
}

const difficultyConfig = {
  easy: { gridSize: 5, attempts: 4, minTarget: 5, maxTarget: 25 },
  medium: { gridSize: 6, attempts: 5, minTarget: 20, maxTarget: 99 },
  hard: { gridSize: 7, attempts: 6, minTarget: 50, maxTarget: 200 },
  killer: { gridSize: 8, attempts: 7, minTarget: 100, maxTarget: 500 }
};

const Index = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const initializeGame = (newDifficulty: Difficulty, practiceMode = false) => {
    const config = difficultyConfig[newDifficulty];
    const { equation, target } = generateEquation(config.gridSize, config.minTarget, config.maxTarget);
    
    console.log('Generated equation:', equation, 'Target:', target, 'Length:', equation.length);
    
    setGameState({
      targetNumber: target,
      targetEquation: equation,
      currentRow: 0,
      maxAttempts: config.attempts,
      gridSize: config.gridSize,
      guesses: Array(config.attempts).fill(null).map(() => Array(config.gridSize).fill('')),
      cellStates: Array(config.attempts).fill(null).map(() => Array(config.gridSize).fill('empty')),
      gameStatus: 'playing',
      hintsUsed: 0,
      isPracticeMode: practiceMode
    });
    setShowAnswer(false);
  };

  useEffect(() => {
    initializeGame(difficulty);
  }, []);

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    initializeGame(newDifficulty, gameState?.isPracticeMode || false);
  };

  const togglePracticeMode = () => {
    if (gameState) {
      initializeGame(difficulty, !gameState.isPracticeMode);
    }
  };

  const handleGuessSubmit = (guess: string[]) => {
    if (!gameState || gameState.gameStatus !== 'playing') return;

    const equation = guess.join('');
    const isValid = validateEquation(equation, gameState.targetNumber);
    
    console.log('Submitted equation:', equation, 'Valid:', isValid.valid, 'Error:', isValid.error);
    
    if (!isValid.valid) {
      // Show error for invalid equation (could add toast notification here)
      console.log('Invalid equation:', isValid.error);
      return;
    }

    // Calculate cell states
    const newCellStates = [...gameState.cellStates];
    const targetArray = gameState.targetEquation.split('');
    
    newCellStates[gameState.currentRow] = guess.map((char, index) => {
      if (char === targetArray[index]) {
        return 'correct';
      } else if (targetArray.includes(char)) {
        return 'partial';
      } else {
        return 'incorrect';
      }
    });

    const newGuesses = [...gameState.guesses];
    newGuesses[gameState.currentRow] = guess;

    const isWin = equation === gameState.targetEquation;
    const isLoss = !isWin && (gameState.currentRow + 1 >= gameState.maxAttempts) && !gameState.isPracticeMode;

    setGameState({
      ...gameState,
      guesses: newGuesses,
      cellStates: newCellStates,
      currentRow: isWin || isLoss ? gameState.currentRow : gameState.currentRow + 1,
      gameStatus: isWin ? 'won' : isLoss ? 'lost' : 'playing'
    });
  };

  const handleHint = () => {
    if (!gameState || gameState.hintsUsed >= 3 || gameState.gameStatus !== 'playing') return;

    const targetArray = gameState.targetEquation.split('');
    const currentGuess = [...gameState.guesses[gameState.currentRow]];
    
    console.log('Providing hint. Target:', gameState.targetEquation, 'Current guess:', currentGuess);
    
    // Find the first empty cell or incorrect cell to fill with a hint
    let hintIndex = -1;
    
    // First, try to find an empty cell
    for (let i = 0; i < targetArray.length; i++) {
      if (currentGuess[i] === '') {
        hintIndex = i;
        break;
      }
    }
    
    // If no empty cells, find an incorrect cell
    if (hintIndex === -1) {
      for (let i = 0; i < targetArray.length; i++) {
        if (currentGuess[i] !== targetArray[i]) {
          hintIndex = i;
          break;
        }
      }
    }
    
    // Apply the hint if we found a position
    if (hintIndex !== -1) {
      currentGuess[hintIndex] = targetArray[hintIndex];
      
      const newGuesses = [...gameState.guesses];
      newGuesses[gameState.currentRow] = currentGuess;

      console.log('Applied hint at index', hintIndex, 'with value', targetArray[hintIndex]);

      setGameState({
        ...gameState,
        guesses: newGuesses,
        hintsUsed: gameState.hintsUsed + 1
      });
    }
  };

  if (!gameState) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Math it
          </h1>
          {gameState.isPracticeMode && (
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mb-4">
              <span className="text-yellow-800 font-semibold">PRACTICE MODE</span>
              <span className="text-yellow-700 ml-2">Unlimited attempts</span>
            </div>
          )}
        </div>

        {/* Game Controls */}
        <GameControls
          difficulty={difficulty}
          onDifficultyChange={handleDifficultyChange}
          isPracticeMode={gameState.isPracticeMode}
          onTogglePracticeMode={togglePracticeMode}
          hintsUsed={gameState.hintsUsed}
          onHint={handleHint}
          canUseHint={gameState.gameStatus === 'playing' && gameState.hintsUsed < 3}
        />

        {/* Main Game Area */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Side - Game Board */}
          <div className="flex-1 lg:max-w-2xl">
            {/* Target Number Display */}
            <div className="text-center mb-6">
              <div className="text-xl text-gray-600">
                Find the hidden calculation that equals{' '}
                <span className="font-bold text-2xl text-indigo-600">
                  {gameState.targetNumber}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                ({gameState.gridSize} characters)
              </div>
            </div>

            {/* Game Board */}
            <GameBoard
              gameState={gameState}
              onGuessSubmit={handleGuessSubmit}
              onHintRequest={handleHint}
            />

            {/* Game Status */}
            {gameState.gameStatus !== 'playing' && (
              <Card className="mt-6 p-6 text-center">
                {gameState.gameStatus === 'won' ? (
                  <div>
                    <h2 className="text-2xl font-bold text-green-600 mb-2">Congratulations! 🎉</h2>
                    <p className="text-gray-600">You found the equation: {gameState.targetEquation}</p>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Game Over</h2>
                    <p className="text-gray-600">The equation was: {gameState.targetEquation}</p>
                  </div>
                )}
              </Card>
            )}

            {/* Bottom buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <Button
                onClick={() => initializeGame(difficulty, gameState.isPracticeMode)}
                className="px-8 py-3 text-lg"
              >
                New Game
              </Button>
              
              {/* Practice Mode Answer Button */}
              {gameState.isPracticeMode && (
                <Button
                  variant="outline"
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="px-8 py-3 text-lg"
                >
                  {showAnswer ? 'Hide' : 'Show'} Answer
                </Button>
              )}
            </div>

            {/* Show Answer Result */}
            {gameState.isPracticeMode && showAnswer && (
              <div className="text-center mt-4">
                <p className="text-lg font-mono bg-gray-100 p-2 rounded">
                  {gameState.targetEquation}
                </p>
              </div>
            )}
          </div>

          {/* Right Side - Instructions */}
          <div className="lg:w-80">
            <Card className="p-4 bg-blue-50 border-blue-200 h-fit">
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-3 text-lg">How to play:</p>
                <div className="space-y-3 text-sm">
                  <p>Enter a mathematical equation that equals the target number</p>
                  <p>Use numbers (0-9) and operators (+, -, ×, ÷)</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span>Correct position</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                      <span>Wrong position</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-500 rounded"></div>
                      <span>Not in equation</span>
                    </div>
                  </div>
                  <p>Follow order of operations (multiplication and division before addition and subtraction)</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
