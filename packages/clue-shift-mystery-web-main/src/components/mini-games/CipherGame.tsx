
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface CipherGameProps {
  onComplete: (success: boolean) => void;
  onClose: () => void;
}

const CipherGame: React.FC<CipherGameProps> = ({ onComplete, onClose }) => {
  const [userInput, setUserInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  
  const cipherText = "ILCRT EOGD RBYA";
  const solution = "FIRE ALARM CODE";
  const shift = 5; // Caesar cipher shift
  
  const hints = [
    "This is a Caesar cipher - each letter is shifted by the same amount!",
    "Try shifting each letter back by 5 positions in the alphabet.",
    "I becomes D, L becomes G, C becomes X... wait, that's not right. Try the other direction!"
  ];

  const checkAnswer = () => {
    setAttempts(attempts + 1);
    if (userInput.toUpperCase().replace(/\s+/g, ' ').trim() === solution) {
      onComplete(true);
    } else if (attempts >= 2) {
      onComplete(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="bg-white border-4 border-red-400 shadow-2xl p-6 max-w-md mx-4">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🔐</div>
          <h3 className="text-xl font-bold text-red-700">Decode the Secret Message</h3>
          <p className="text-sm text-gray-600">Found on a crumpled note!</p>
        </div>

        <div className="bg-gray-100 border-2 border-gray-300 rounded p-4 mb-4 text-center">
          <div className="font-mono text-lg tracking-wider font-bold">
            {cipherText}
          </div>
        </div>

        <div className="space-y-4">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter decoded message..."
            className="text-center"
          />

          <div className="flex gap-2">
            <Button
              onClick={checkAnswer}
              disabled={!userInput.trim()}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white"
            >
              Decode! 🔓
            </Button>
            <Button
              onClick={() => setShowHint(true)}
              variant="outline"
              className="bg-yellow-100 border-yellow-400"
            >
              💡
            </Button>
          </div>

          {showHint && (
            <div className="bg-blue-50 border-2 border-blue-300 rounded p-3">
              <p className="text-sm text-blue-800">
                <strong>Hint:</strong> {hints[Math.min(attempts, hints.length - 1)]}
              </p>
            </div>
          )}

          <p className="text-xs text-gray-500 text-center">
            Attempts: {attempts}/3
          </p>
        </div>

        <Button
          onClick={onClose}
          variant="ghost"
          className="w-full mt-4 text-gray-600"
        >
          Close
        </Button>
      </Card>
    </div>
  );
};

export default CipherGame;
