import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clue, GameMode, Suspect } from '../types/GameTypes';

interface DeductionSlideProps {
  inventory: Clue[];
  onSubmit: (culprit: string, clues: string[]) => void;
  onHint: () => void;
  gameMode?: GameMode;
  suspects?: Suspect[];
}

const DeductionSlide: React.FC<DeductionSlideProps> = ({ 
  inventory, 
  onSubmit, 
  onHint, 
  gameMode = 'easy',
  suspects
}) => {
  const [selectedCulprit, setSelectedCulprit] = useState<string>('');
  const [selectedClues, setSelectedClues] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  // Easy mode suspects (keep existing code)
  const easySuspects = [
    {
      id: "tommy",
      name: "Tommy the Class Clown",
      description: "Loves making jokes and making people laugh",
      icon: "😂"
    },
    {
      id: "emma", 
      name: "Emma the Bookworm",
      description: "Always reading and loves the library",
      icon: "📚"
    },
    {
      id: "jake",
      name: "Jake the Athlete", 
      description: "Loves sports and playing outside",
      icon: "⚽"
    }
  ];

  const displaySuspects = gameMode === 'medium' && suspects ? 
    suspects.map(s => ({
      id: s.id,
      name: s.name,
      description: s.description,
      icon: s.avatar
    })) : easySuspects;

  const handleClueToggle = (clueId: string) => {
    if (selectedClues.includes(clueId)) {
      setSelectedClues(selectedClues.filter(id => id !== clueId));
    } else if (selectedClues.length < 3) {
      setSelectedClues([...selectedClues, clueId]);
    }
  };

  const handleHintClick = () => {
    setShowHint(true);
    onHint();
  };

  const handleSubmit = () => {  
    if (selectedCulprit && selectedClues.length >= 2) {
      onSubmit(selectedCulprit, selectedClues);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className={`border-4 shadow-2xl p-6 md:p-8 ${
        gameMode === 'medium'
          ? 'bg-gray-800 border-gray-600 text-white'
          : 'bg-white border-purple-300'
      }`}>
        <h2 className={`text-3xl font-bold mb-6 text-center ${
          gameMode === 'medium' ? 'text-gray-100' : 'text-purple-800'
        }`}>
          🧩 Time to Solve the Mystery!
        </h2>

        <div className="mb-8">
          <h3 className={`text-xl font-bold mb-4 ${
            gameMode === 'medium' ? 'text-gray-200' : 'text-gray-800'
          }`}>
            Who do you think {gameMode === 'medium' ? 'pulled the fire alarm' : 'took Mr. Peanuts'}?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {displaySuspects.map((suspect) => (
              <div
                key={suspect.id}
                className={`border-3 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                  selectedCulprit === suspect.id
                    ? gameMode === 'medium'
                      ? 'border-gray-400 bg-gray-700 shadow-lg transform scale-105'
                      : 'border-purple-500 bg-purple-100 shadow-lg transform scale-105'
                    : gameMode === 'medium'
                      ? 'border-gray-600 bg-gray-900 hover:border-gray-500 hover:bg-gray-800'
                      : 'border-gray-300 bg-gray-50 hover:border-purple-300 hover:bg-purple-50'
                }`}
                onClick={() => setSelectedCulprit(suspect.id)}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">{suspect.icon}</div>
                  <h4 className={`font-bold mb-2 ${
                    gameMode === 'medium' ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {suspect.name}
                  </h4>
                  <p className={`text-sm ${
                    gameMode === 'medium' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {suspect.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className={`text-xl font-bold mb-4 ${
            gameMode === 'medium' ? 'text-gray-200' : 'text-gray-800'
          }`}>
            Choose 2-3 clues that support your theory:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inventory.map((clue) => (
              <div
                key={clue.id}
                className={`border-3 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                  selectedClues.includes(clue.id)
                    ? 'border-green-500 bg-green-100 shadow-lg'
                    : gameMode === 'medium'
                      ? 'border-gray-600 bg-gray-900 hover:border-green-300 hover:bg-gray-800'
                      : 'border-gray-300 bg-gray-50 hover:border-green-300 hover:bg-green-50'
                } ${clue.isRedHerring ? 'border-red-300' : ''}`}
                onClick={() => handleClueToggle(clue.id)}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{clue.icon}</span>
                  <div>
                    <h4 className={`font-bold ${
                      gameMode === 'medium' ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      {clue.name}
                      {clue.isRedHerring && <span className="text-red-500 ml-2">⚠️</span>}
                    </h4>
                    <p className={`text-sm ${
                      gameMode === 'medium' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {clue.description}
                    </p>
                    {clue.category && (
                      <span className={`text-xs px-2 py-1 rounded ${
                        clue.category === 'physical' ? 'bg-blue-100 text-blue-800' :
                        clue.category === 'testimony' ? 'bg-purple-100 text-purple-800' :
                        clue.category === 'digital' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {clue.category}
                      </span>
                    )}
                  </div>
                  {selectedClues.includes(clue.id) && (
                    <div className="ml-auto text-green-600 text-xl">✓</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className={`text-sm mt-2 ${
            gameMode === 'medium' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Selected: {selectedClues.length}/3 clues
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Button
            onClick={handleHintClick}
            variant="outline"
            className={`font-bold ${
              gameMode === 'medium'
                ? 'bg-gray-700 hover:bg-gray-600 border-gray-500 text-gray-200'
                : 'bg-yellow-200 hover:bg-yellow-300 border-yellow-400 text-yellow-800'
            }`}
          >
            💡 Need a Hint?
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={!selectedCulprit || selectedClues.length < 2}
            className={`font-bold px-8 py-3 rounded-full transition-all duration-200 ${
              selectedCulprit && selectedClues.length >= 2
                ? gameMode === 'medium'
                  ? 'bg-gray-600 hover:bg-gray-500 text-white transform hover:scale-105'
                  : 'bg-purple-500 hover:bg-purple-600 text-white transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            🕵️ Reveal the Truth!
          </Button>
        </div>

        {showHint && (
          <div className={`mt-6 rounded-xl p-4 border-2 ${
            gameMode === 'medium'
              ? 'bg-gray-700 border-gray-500'
              : 'bg-blue-100 border-blue-300'
          }`}>
            <p className={`font-medium ${
              gameMode === 'medium' ? 'text-gray-200' : 'text-blue-800'
            }`}>
              💡 <strong>Hint:</strong> {gameMode === 'medium'
                ? 'Consider the motives and alibis. Who had both opportunity and reason? Look for evidence that contradicts their story!'
                : 'Think about what each clue tells you about the person who left it. The muddy footprint shows someone came from outside, the torn book page suggests someone who reads, the sports drink points to an athlete, and the joke book belongs to someone funny!'
              }
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DeductionSlide;
