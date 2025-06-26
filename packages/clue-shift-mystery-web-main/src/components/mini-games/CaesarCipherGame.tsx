
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CaesarCipherGameProps {
  onComplete: (success: boolean) => void;
  onClose: () => void;
  difficulty?: number;
}

const CaesarCipherGame: React.FC<CaesarCipherGameProps> = ({
  onComplete,
  onClose,
  difficulty = 1
}) => {
  const [currentPuzzle, setCurrentPuzzle] = useState<string>('');
  const [solution, setSolution] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [shift, setShift] = useState<number>(0);
  const [showHint, setShowHint] = useState(false);

  const puzzles = [
    // Easy puzzles (shift by 1)
    { message: 'IFMQ', decoded: 'HELP', shift: 1 },
    { message: 'DPEF', decoded: 'CODE', shift: 1 },
    { message: 'HPPE', decoded: 'GOOD', shift: 1 },
    
    // Medium puzzles (shift by 2-3)
    { message: 'PAVE VGT', decoded: 'MYSTERY', shift: 2 },
    { message: 'EOXHV', decoded: 'CLUES', shift: 2 },
    
    // Hard puzzles (shift by 3+)
    { message: 'GHWHFWLYH', decoded: 'DETECTIVE', shift: 3 }
  ];

  useEffect(() => {
    const puzzle = puzzles[Math.min(difficulty - 1, puzzles.length - 1)];
    setCurrentPuzzle(puzzle.message);
    setSolution(puzzle.decoded);
    setShift(puzzle.shift);
  }, [difficulty]);

  const handleSubmit = () => {
    const isCorrect = userInput.toUpperCase().trim() === solution;
    onComplete(isCorrect);
  };

  const decodeExample = (letter: string, shiftAmount: number) => {
    const code = letter.charCodeAt(0);
    if (code >= 65 && code <= 90) { // A-Z
      return String.fromCharCode(((code - 65 - shiftAmount + 26) % 26) + 65);
    }
    return letter;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="bg-white p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-800">
            🏛️ Caesar Cipher Challenge
          </h2>
          <Button onClick={onClose} variant="outline" size="sm">
            ✕
          </Button>
        </div>

        <div className="space-y-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Instructions:</h3>
            <p className="text-sm text-gray-700">
              In a Caesar cipher, each letter is shifted by a fixed number of positions in the alphabet. 
              For example, with a shift of 1: A becomes B, B becomes C, etc.
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h4 className="font-bold mb-2">Encoded Message:</h4>
            <div className="text-2xl font-mono bg-white p-3 rounded">
              {currentPuzzle}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Shift: {shift} position{shift !== 1 ? 's' : ''} backward
            </p>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="font-bold">Your Answer:</span>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full mt-1 p-3 border rounded-lg text-center uppercase"
                placeholder="Enter decoded message..."
              />
            </label>
          </div>

          {showHint && (
            <div className="bg-yellow-50 border-2 border-yellow-300 p-4 rounded-lg">
              <h4 className="font-bold text-yellow-800 mb-2">💡 Hint:</h4>
              <p className="text-sm text-yellow-700 mb-2">
                To decode, shift each letter backward by {shift} position{shift !== 1 ? 's' : ''}:
              </p>
              <div className="text-sm font-mono bg-white p-2 rounded">
                Example: {currentPuzzle.charAt(0)} → {decodeExample(currentPuzzle.charAt(0), shift)}
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => setShowHint(!showHint)}
              variant="outline"
              className="bg-yellow-100 hover:bg-yellow-200 border-yellow-400"
            >
              💡 {showHint ? 'Hide' : 'Show'} Hint
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!userInput.trim()}
              className="bg-purple-500 hover:bg-purple-600 text-white px-8"
            >
              Submit Answer
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CaesarCipherGame;
