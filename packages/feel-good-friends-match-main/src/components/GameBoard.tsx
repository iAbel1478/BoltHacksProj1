import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import EmotionCard from './EmotionCard';
import { getEmotionsByLevel } from '../data/emotions';
import { ArrowLeft, Star } from 'lucide-react';

interface GameBoardProps {
  level: number;
  onLevelComplete: () => void;
  onBackToMenu: () => void;
}

const GameBoard = ({ level, onLevelComplete, onBackToMenu }: GameBoardProps) => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [isHardMode, setIsHardMode] = useState(false);
  const [showHardModePrompt, setShowHardModePrompt] = useState(false);

  // Use useMemo to ensure emotions only change when level or isHardMode changes
  const levelEmotions = useMemo(() => {
    return getEmotionsByLevel(level, isHardMode);
  }, [level, isHardMode]);
  
  const emojiCards = levelEmotions.map((emotion, index) => ({
    ...emotion,
    id: index,
    isWord: false
  }));
  
  const wordCards = levelEmotions.map((emotion, index) => ({
    ...emotion,
    id: index + levelEmotions.length,
    isWord: true
  }));

  const allCards = [...emojiCards, ...wordCards];

  const getDifficultyName = () => {
    if (isHardMode) return '"Who Knows What" Mode! 🎓';
    if (level <= 2) return 'Easy Level';
    if (level <= 4) return 'Easy Level';
    if (level <= 6) return 'Intermediate Level';
    if (level <= 8) return 'Intermediate Level';
    if (level <= 10) return 'Hard Level';
    return 'Hard Level';
  };

  const handleCardClick = (cardId: number) => {
    if (selectedCards.length === 2 || selectedCards.includes(cardId) || matchedPairs.includes(cardId)) {
      return;
    }

    const newSelected = [...selectedCards, cardId];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setAttempts(prev => prev + 1);
      const [first, second] = newSelected;
      const firstCard = allCards.find(c => c.id === first);
      const secondCard = allCards.find(c => c.id === second);

      if (firstCard && secondCard && 
          firstCard.emotion === secondCard.emotion && 
          firstCard.isWord !== secondCard.isWord) {
        // Correct match
        setMatchedPairs(prev => [...prev, first, second]);
        setSelectedCards([]);
        setShowEncouragement(true);
        setTimeout(() => setShowEncouragement(false), 2000);
      } else {
        // Incorrect match - clear after delay
        setTimeout(() => {
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (matchedPairs.length === allCards.length) {
      setTimeout(() => {
        if (!isHardMode && level >= 5) {
          setShowHardModePrompt(true);
        } else {
          onLevelComplete();
        }
      }, 1500);
    }
  }, [matchedPairs, allCards.length, onLevelComplete, isHardMode, level]);

  const startHardMode = () => {
    setIsHardMode(true);
    setShowHardModePrompt(false);
    setMatchedPairs([]);
    setSelectedCards([]);
    setAttempts(0);
  };

  const skipHardMode = () => {
    setShowHardModePrompt(false);
    onLevelComplete();
  };

  const encouragingMessages = [
    "Great job! 🌟",
    "You're learning so well! 💫",
    "Wonderful match! 🎉",
    "Keep going! You're amazing! ✨",
    "Perfect! You understand feelings! 🎈"
  ];

  return (
    <div className="min-h-screen p-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={onBackToMenu}
            variant="ghost"
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu
          </Button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-700">
              Level {level} - {getDifficultyName()}
            </h2>
            <div className="flex items-center gap-1 justify-center mt-1">
              {Array.from({ length: level }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-600">Matches: {matchedPairs.length / 2}/{levelEmotions.length}</p>
          </div>
        </div>

        {showEncouragement && (
          <div className="text-center mb-4">
            <Card className="inline-block p-4 bg-green-100 border-green-200">
              <p className="text-lg font-bold text-green-700">
                {encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)]}
              </p>
            </Card>
          </div>
        )}

        {showHardModePrompt && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="p-8 bg-gradient-to-r from-purple-100 to-pink-100 border-0 shadow-xl max-w-md mx-4">
              <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">
                Amazing Work! 🎉
              </h3>
              <p className="text-lg text-gray-600 mb-6 text-center">
                Ready to try some really tricky emotions? This is the "Who Knows What" level!
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={startHardMode}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold"
                >
                  Challenge Me! 🎓
                </Button>
                <Button
                  onClick={skipHardMode}
                  variant="outline"
                  className="font-bold"
                >
                  Next Level Instead
                </Button>
              </div>
            </Card>
          </div>
        )}

        <div className="space-y-8">
          {/* Emoji Cards Section */}
          <div>
            <h3 className="text-xl font-bold text-center mb-4 text-purple-600">
              Match the Emojis! 😊
            </h3>
            <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
              {emojiCards.map((card) => (
                <EmotionCard
                  key={card.id}
                  card={card}
                  isSelected={selectedCards.includes(card.id)}
                  isMatched={matchedPairs.includes(card.id)}
                  onClick={() => handleCardClick(card.id)}
                />
              ))}
            </div>
          </div>

          {/* Text Cards Section */}
          <div>
            <h3 className="text-xl font-bold text-center mb-4 text-blue-600">
              To the Stories! 📖
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {wordCards.map((card) => (
                <EmotionCard
                  key={card.id}
                  card={card}
                  isSelected={selectedCards.includes(card.id)}
                  isMatched={matchedPairs.includes(card.id)}
                  onClick={() => handleCardClick(card.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {matchedPairs.length === allCards.length && !showHardModePrompt && (
          <div className="text-center mt-8">
            <Card className="inline-block p-6 bg-gradient-to-r from-yellow-100 to-pink-100 border-0 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                {isHardMode ? 'Incredible! You\'re an Emotion Expert! 🏆' : 'Level Complete! 🎉'}
              </h3>
              <p className="text-lg text-gray-600">
                You matched all the feelings! Let's take a calming breath together.
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
