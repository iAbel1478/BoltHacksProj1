
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface BreathingExerciseProps {
  onComplete: () => void;
  level: number;
}

const BreathingExercise = ({ onComplete, level }: BreathingExerciseProps) => {
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [cycleCount, setCycleCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const totalCycles = 3;

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setPhase(currentPhase => {
        if (currentPhase === 'inhale') {
          return 'exhale';
        } else {
          setCycleCount(prev => prev + 1);
          return 'inhale';
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (cycleCount >= totalCycles && isActive) {
      setIsActive(false);
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  }, [cycleCount, isActive, onComplete]);

  const startBreathing = () => {
    setIsActive(true);
    setCycleCount(0);
    setPhase('inhale');
  };

  const skipBreathing = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 text-center bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          Great Job! 🌟
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          You completed Level {level}! Let's take some calming breaths together.
        </p>

        <div className="mb-8">
          <div 
            className={`
              w-32 h-32 mx-auto rounded-full transition-all duration-3000 ease-in-out
              ${phase === 'inhale' ? 'scale-100' : 'scale-75'}
              ${isActive ? 'bg-gradient-to-r from-blue-300 to-purple-300' : 'bg-gradient-to-r from-green-300 to-blue-300'}
            `}
            style={{
              transform: phase === 'inhale' && isActive ? 'scale(1.2)' : 'scale(0.8)',
              transition: 'transform 3s ease-in-out'
            }}
          />
          
          <div className="mt-4">
            {isActive ? (
              <div>
                <p className="text-xl font-semibold text-gray-700 capitalize">
                  {phase}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Breath {cycleCount + 1} of {totalCycles}
                </p>
              </div>
            ) : cycleCount >= totalCycles ? (
              <p className="text-lg font-semibold text-green-600">
                Wonderful! You're ready for the next level! 🎉
              </p>
            ) : (
              <p className="text-gray-600">
                Click the button below to begin
              </p>
            )}
          </div>
        </div>

        {!isActive && cycleCount === 0 && (
          <div className="space-y-3">
            <Button
              onClick={startBreathing}
              className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white border-0 shadow-lg"
            >
              Start Breathing Exercise 🫁
            </Button>
            <Button
              onClick={skipBreathing}
              variant="ghost"
              className="w-full text-gray-500"
            >
              Skip to Next Level
            </Button>
          </div>
        )}

        {cycleCount >= totalCycles && !isActive && (
          <Button
            onClick={onComplete}
            className="w-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white border-0 shadow-lg"
          >
            Continue to Level {level + 1} ➡️
          </Button>
        )}
      </Card>
    </div>
  );
};

export default BreathingExercise;
