import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Country } from './types';
import { getBonusQuestions, BonusQuestion } from './countries';
import { Clock, HelpCircle } from 'lucide-react';

interface BonusQuestionOverlayProps {
  country: Country;
  timeLeft: number;
  onAnswer: (isCorrect: boolean) => void;
  onTimeout: () => void;
}

const BonusQuestionOverlay: React.FC<BonusQuestionOverlayProps> = ({
  country,
  timeLeft,
  onAnswer,
  onTimeout
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<BonusQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const questions = getBonusQuestions(country);
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(randomQuestion);
  }, [country]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
    }
  }, [timeLeft, onTimeout]);

  const handleAnswerClick = (answerIndex: number) => {
    if (selectedAnswer !== null || showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const isCorrect = answerIndex === currentQuestion?.correctAnswer;
    
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1500);
  };

  if (!currentQuestion) return null;

  const getButtonVariant = (index: number) => {
    if (!showResult) return 'outline';
    if (index === currentQuestion.correctAnswer) return 'default';
    if (index === selectedAnswer && index !== currentQuestion.correctAnswer) return 'destructive';
    return 'outline';
  };

  const getButtonClassName = (index: number) => {
    let baseClass = "w-full text-left justify-start transition-all duration-200 ";
    if (!showResult) {
      baseClass += "hover:bg-blue-50 hover:border-blue-300";
    }
    if (showResult && index === currentQuestion.correctAnswer) {
      baseClass += "bg-green-500 text-white border-green-500";
    }
    if (showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer) {
      baseClass += "bg-red-500 text-white border-red-500";
    }
    return baseClass;
  };

  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-30 p-4">
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-2xl">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <HelpCircle className="w-6 h-6" />
              <span className="text-lg font-semibold">Bonus Question</span>
            </div>
            <div className="text-sm text-gray-600">
              You clicked within 500-5000km of {country.name}! Answer correctly to avoid losing a heart.
            </div>
          </div>

          {/* Timer */}
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2 text-orange-600">
              <Clock className="w-5 h-5" />
              <span className="font-bold">{timeLeft} seconds remaining</span>
            </div>
            <Progress value={(timeLeft / 10) * 100} className="h-2" />
          </div>

          {/* Question */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={getButtonVariant(index)}
                className={getButtonClassName(index)}
                onClick={() => handleAnswerClick(index)}
                disabled={showResult}
              >
                <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </div>

          {/* Result Message */}
          {showResult && (
            <div className="text-center mt-4">
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <div className="text-green-600 font-semibold">
                  ✅ Correct! Heart saved!
                </div>
              ) : (
                <div className="text-red-600 font-semibold">
                  ❌ Incorrect. You lose a heart.
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default BonusQuestionOverlay;
