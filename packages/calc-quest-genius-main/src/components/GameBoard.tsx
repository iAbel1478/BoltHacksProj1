
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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

interface GameBoardProps {
  gameState: GameState;
  onGuessSubmit: (guess: string[]) => void;
  onHintRequest?: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, onGuessSubmit, onHintRequest }) => {
  const [currentInput, setCurrentInput] = useState<string[]>(
    Array(gameState.gridSize).fill('')
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset current input when starting a new row or game changes
  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      // Initialize with current row's guess if it exists, otherwise empty
      const currentGuess = gameState.guesses[gameState.currentRow] || Array(gameState.gridSize).fill('');
      setCurrentInput([...currentGuess]);
      
      // Focus first empty input
      setTimeout(() => {
        const firstEmptyIndex = currentGuess.findIndex(cell => cell === '');
        const indexToFocus = firstEmptyIndex >= 0 ? firstEmptyIndex : 0;
        if (inputRefs.current[indexToFocus]) {
          inputRefs.current[indexToFocus]?.focus();
        }
      }, 0);
    }
  }, [gameState.currentRow, gameState.gridSize, gameState.gameStatus]);

  // Update current input when hints are applied
  useEffect(() => {
    if (gameState.gameStatus === 'playing' && gameState.guesses[gameState.currentRow]) {
      const currentGuess = gameState.guesses[gameState.currentRow];
      setCurrentInput([...currentGuess]);
    }
  }, [gameState.guesses, gameState.currentRow, gameState.gameStatus]);

  const getCellColor = (state: CellState) => {
    switch (state) {
      case 'correct': return 'bg-green-500 text-white border-green-600';
      case 'partial': return 'bg-yellow-500 text-white border-yellow-600';
      case 'incorrect': return 'bg-gray-500 text-white border-gray-600';
      default: return 'bg-white border-gray-300';
    }
  };

  const convertSymbol = (value: string) => {
    // Convert * to × and / to ÷
    if (value === '*') return '×';
    if (value === '/') return '÷';
    return value;
  };

  const handleCellChange = (index: number, value: string) => {
    if (gameState.gameStatus !== 'playing') return;
    
    // Convert symbols automatically
    const convertedValue = convertSymbol(value);
    
    // Only allow numbers and operators
    if (convertedValue && !/^[0-9+\-×÷]$/.test(convertedValue)) return;
    
    const newInput = [...currentInput];
    newInput[index] = convertedValue;
    setCurrentInput(newInput);

    // Auto-advance to next cell if value was entered and not at last cell
    if (convertedValue && index < gameState.gridSize - 1) {
      setTimeout(() => {
        if (inputRefs.current[index + 1]) {
          inputRefs.current[index + 1]?.focus();
        }
      }, 0);
    }
  };

  const handleSubmit = () => {
    if (gameState.gameStatus !== 'playing') return;
    if (currentInput.some(cell => cell === '')) return;
    
    onGuessSubmit(currentInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      // Submit the guess if all cells are filled
      if (!currentInput.some(cell => cell === '')) {
        handleSubmit();
      }
    } else if (e.key === 'Backspace') {
      if (currentInput[index] === '') {
        // Move to previous cell if current is empty
        if (index > 0 && inputRefs.current[index - 1]) {
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        // Clear current cell
        const newInput = [...currentInput];
        newInput[index] = '';
        setCurrentInput(newInput);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < gameState.gridSize - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleInputClick = (index: number) => {
    // Focus the clicked input
    if (inputRefs.current[index]) {
      inputRefs.current[index]?.focus();
    }
  };

  const addSymbolToInput = (symbol: string) => {
    const emptyIndex = currentInput.findIndex(cell => cell === '');
    if (emptyIndex !== -1) {
      handleCellChange(emptyIndex, symbol);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-2">
        {Array.from({ length: gameState.maxAttempts }, (_, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 justify-center">
            {Array.from({ length: gameState.gridSize }, (_, colIndex) => {
              const isCurrentRow = rowIndex === gameState.currentRow;
              const isPastRow = rowIndex < gameState.currentRow;
              const cellValue = isCurrentRow 
                ? currentInput[colIndex] || ''
                : gameState.guesses[rowIndex][colIndex] || '';
              const cellState = gameState.cellStates[rowIndex][colIndex];

              return (
                <div key={colIndex} className="relative">
                  <input
                    ref={(el) => {
                      if (isCurrentRow) {
                        inputRefs.current[colIndex] = el;
                      }
                    }}
                    className={`
                      game-input w-12 h-12 text-center text-lg font-bold border-2 rounded-lg
                      transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400
                      ${getCellColor(cellState)}
                      ${isCurrentRow ? 'focus:scale-105 cursor-text' : 'cursor-default'}
                    `}
                    type="text"
                    maxLength={1}
                    value={cellValue}
                    onChange={(e) => isCurrentRow && handleCellChange(colIndex, e.target.value)}
                    onKeyDown={(e) => isCurrentRow && handleKeyDown(e, colIndex)}
                    onClick={() => isCurrentRow && handleInputClick(colIndex)}
                    disabled={!isCurrentRow || gameState.gameStatus !== 'playing'}
                    autoComplete="off"
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Input helpers */}
      <div className="mt-6 text-center">
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Quick input:</p>
          <div className="flex justify-center gap-2 flex-wrap">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '×', '÷'].map((symbol) => (
              <Button
                key={symbol}
                variant="outline"
                size="sm"
                className="w-10 h-10 p-0"
                onClick={() => addSymbolToInput(symbol)}
                disabled={gameState.gameStatus !== 'playing' || gameState.currentRow >= gameState.maxAttempts}
              >
                {symbol}
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={
            gameState.gameStatus !== 'playing' || 
            currentInput.some(cell => cell === '') ||
            gameState.currentRow >= gameState.maxAttempts
          }
          className="px-8 py-2"
        >
          Submit Guess (Press Enter)
        </Button>
      </div>
    </Card>
  );
};

export default GameBoard;
