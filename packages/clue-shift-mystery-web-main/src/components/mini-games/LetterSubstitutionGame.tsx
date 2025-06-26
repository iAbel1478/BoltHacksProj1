
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface LetterSubstitutionGameProps {
  onComplete: (success: boolean) => void;
  onClose: () => void;
  difficulty?: number;
}

const LetterSubstitutionGame: React.FC<LetterSubstitutionGameProps> = ({
  onComplete,
  onClose,
  difficulty = 1
}) => {
  const [currentPuzzle, setCurrentPuzzle] = useState<string>('');
  const [solution, setSolution] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [showHint, setShowHint] = useState(false);

  const puzzles = [
    // Easy puzzles (A=1, B=2, C=3)
    { encoded: '8-5-12-16', decoded: 'HELP', hint: 'H=8, E=5, L=12, P=16' },
    { encoded: '3-15-4-5', decoded: 'CODE', hint: 'C=3, O=15, D=4, E=5' },
    { encoded: '7-15-15-4', decoded: 'GOOD', hint: 'G=7, O=15, O=15, D=4' },
    
    // Medium puzzles
    { encoded: '13-25-19-20-5-18-25', decoded: 'MYSTERY', hint: 'M=13, Y=25, S=19...' },
    { encoded: '3-12-21-5-19', decoded: 'CLUES', hint: 'C=3, L=12, U=21...' },
    
    // Hard puzzles
    { encoded: '4-5-20-5-3-20-9-22-5', decoded: 'DETECTIVE', hint: 'D=4, E=5, T=20...' }
  ];

  useEffect(() => {
    const puzzle = puzzles[Math.min(difficulty - 1, puzzles.length - 1)];
    setCurrentPuzzle(puzzle.encoded);
    setSolution(puzzle.decoded);
  }, [difficulty]);

  const handleSubmit = () => {
    const isCorrect = userInput.toUpperCase().trim() === solution;
    onComplete(isCorrect);
  };

  const getAlphabetKey = () => {
    return Array.from({ length: 26 }, (_, i) => 
      `${String.fromCharCode(65 + i)}=${i + 1}`
    ).join(', ');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="bg-white p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-800">
            🔤 Letter Substitution Code
          </h2>
          <Button onClick={onClose} variant="outline" size="sm">
            ✕
          </Button>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Instructions:</h3>
            <p className="text-sm text-gray-700">
              Each number represents a letter of the alphabet (A=1, B=2, C=3, etc.). 
              Decode the message below!
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h4 className="font-bold mb-2">Coded Message:</h4>
            <div className="text-2xl font-mono bg-white p-3 rounded">
              {currentPuzzle}
            </div>
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
              <p className="text-sm text-yellow-700">
                A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8, I=9, J=10, K=11, L=12, M=13, 
                N=14, O=15, P=16, Q=17, R=18, S=19, T=20, U=21, V=22, W=23, X=24, Y=25, Z=26
              </p>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => setShowHint(!showHint)}
              variant="outline"
              className="bg-yellow-100 hover:bg-yellow-200 border-yellow-400"
            >
              💡 {showHint ? 'Hide' : 'Show'} Alphabet Key
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!userInput.trim()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8"
            >
              Submit Answer
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LetterSubstitutionGame;
