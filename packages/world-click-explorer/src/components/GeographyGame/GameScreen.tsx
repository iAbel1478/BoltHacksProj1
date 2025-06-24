import React, { useState, useEffect, useRef } from 'react';
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import WorldMap from './WorldMap';
import FeedbackOverlay from './FeedbackOverlay';
import BonusQuestionOverlay from './BonusQuestionOverlay';
import { Country, Difficulty, ClickFeedback } from './types';
import { calculateRealWorldDistance } from './countries';
import { Heart, Target, Trophy } from 'lucide-react';

interface GameScreenProps {
  question: Country;
  score: number;
  lives: number;
  difficulty: Difficulty;
  onAnswer: (isCorrect: boolean, accuracy: number) => void;
  questionsAnswered: number;
}

const GameScreen: React.FC<GameScreenProps> = ({
  question,
  score,
  lives,
  difficulty,
  onAnswer,
  questionsAnswered
}) => {
  const [timeLeft, setTimeLeft] = useState(15);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<ClickFeedback | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showBonusQuestion, setShowBonusQuestion] = useState(false);
  const [bonusTimeLeft, setBonusTimeLeft] = useState(10);
  const timerRef = useRef<NodeJS.Timeout>();
  const bonusTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setTimeLeft(15);
    setIsAnswered(false);
    setFeedback(null);
    setShowFeedback(false);
    setShowBonusQuestion(false);
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (bonusTimerRef.current) {
        clearInterval(bonusTimerRef.current);
      }
    };
  }, [question]);

  const handleTimeout = () => {
    if (!isAnswered && !showBonusQuestion) {
      setIsAnswered(true);
      const timeoutFeedback: ClickFeedback = {
        userClick: { x: -100, y: -100 },
        correctLocation: { x: question.x, y: question.y },
        distance: 0,
        accuracy: 0,
        isCorrect: false
      };
      setFeedback(timeoutFeedback);
      setShowFeedback(true);
      onAnswer(false, 0);
    }
  };

  const handleMapClick = (clickX: number, clickY: number) => {
    if (isAnswered || showBonusQuestion) return;

    setIsAnswered(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Calculate distance and accuracy
    const pixelDistance = Math.sqrt(
      Math.pow(clickX - question.x, 2) + Math.pow(clickY - question.y, 2)
    );
    
    const realWorldDistance = calculateRealWorldDistance(
      { x: clickX, y: clickY },
      { x: question.x, y: question.y },
      question
    );
    
    // Accuracy based on country size and difficulty
    const toleranceRadius = question.size === 'large' ? 80 : 
                           question.size === 'medium' ? 60 :
                           question.size === 'small' ? 40 : 25;
    
    const maxDistance = toleranceRadius * 2;
    const accuracy = Math.max(0, 1 - (pixelDistance / maxDistance));
    
    // Distance-based scoring system - updated threshold to 5000km
    let isCorrect = false;
    let triggerBonus = false;
    
    if (realWorldDistance <= 500) {
      isCorrect = true;
    } else if (realWorldDistance <= 5000) {
      triggerBonus = true;
    }

    const clickFeedback: ClickFeedback = {
      userClick: { x: clickX, y: clickY },
      correctLocation: { x: question.x, y: question.y },
      distance: realWorldDistance,
      accuracy,
      isCorrect: isCorrect || triggerBonus
    };

    setFeedback(clickFeedback);
    
    if (triggerBonus) {
      setShowBonusQuestion(true);
      setBonusTimeLeft(10);
      startBonusTimer();
    } else {
      setShowFeedback(true);
      onAnswer(isCorrect, accuracy);
    }
  };

  const startBonusTimer = () => {
    bonusTimerRef.current = setInterval(() => {
      setBonusTimeLeft(prev => {
        if (prev <= 1) {
          handleBonusTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleBonusTimeout = () => {
    if (bonusTimerRef.current) {
      clearInterval(bonusTimerRef.current);
    }
    setShowBonusQuestion(false);
    setShowFeedback(true);
    onAnswer(false, 0.5); // Reduced points for bonus timeout
  };

  const handleBonusAnswer = (isCorrect: boolean) => {
    if (bonusTimerRef.current) {
      clearInterval(bonusTimerRef.current);
    }
    setShowBonusQuestion(false);
    setShowFeedback(true);
    onAnswer(isCorrect, isCorrect ? 0.7 : 0); // Reduced points for bonus questions
  };

  const handleFeedbackComplete = () => {
    setShowFeedback(false);
  };

  const getDifficultyName = () => {
    const names = ['Explorer', 'Navigator', 'Cartographer', 'Geographer', 'Explorer Pro', 'Globe Master'];
    return names[difficulty - 1];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <span className="font-bold text-lg">{score.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Heart
                    key={i}
                    className={`w-5 h-5 ${i < lives ? 'text-red-500 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-600">{getDifficultyName()} - Question {questionsAnswered + 1}/10</div>
              <div className="text-2xl font-bold text-blue-600">Find: {question.name}</div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Time Left</div>
                <div className="text-xl font-bold text-orange-600">
                  {showBonusQuestion ? `${bonusTimeLeft}s (Bonus)` : `${timeLeft}s`}
                </div>
              </div>
              <div className="w-24">
                <Progress 
                  value={showBonusQuestion ? (bonusTimeLeft / 10) * 100 : (timeLeft / 15) * 100} 
                  className="h-2" 
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Map Area */}
      <div className="max-w-7xl mx-auto">
        <Card className="p-4 relative overflow-hidden">
          <WorldMap
            onMapClick={handleMapClick}
            zoomLevel={1}
            targetCountry={question}
            showTarget={false}
            disabled={isAnswered}
          />
          
          {/* Enhanced Feedback Overlay */}
          {feedback && (
            <FeedbackOverlay
              feedback={feedback}
              country={question}
              show={showFeedback}
              onComplete={handleFeedbackComplete}
            />
          )}

          {/* Bonus Question Overlay */}
          {showBonusQuestion && feedback && (
            <BonusQuestionOverlay
              country={question}
              timeLeft={bonusTimeLeft}
              onAnswer={handleBonusAnswer}
              onTimeout={handleBonusTimeout}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default GameScreen;
