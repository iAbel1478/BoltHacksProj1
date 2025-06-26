
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TranslationTooltip } from './TranslationTooltip';

export type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({ 
  difficulty, 
  setDifficulty 
}) => {
  const difficulties: { value: Difficulty; label: string; color: string; spanish: string }[] = [
    { value: 'easy', label: 'Easy', color: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 border-green-600', spanish: 'Fácil' },
    { value: 'medium', label: 'Medium', color: 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 border-yellow-600', spanish: 'Medio' },
    { value: 'hard', label: 'Hard', color: 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 border-red-600', spanish: 'Difícil' },
  ];

  return (
    <div className="flex-1">
      <TranslationTooltip spanish="Dificultad" english="Difficulty">
        <h3 className="text-lg font-bold text-amber-800 mb-3 font-mono cursor-help">Difficulty</h3>
      </TranslationTooltip>
      <div className="grid grid-cols-3 gap-2">
        {difficulties.map(({ value, label, color, spanish }) => (
          <TranslationTooltip key={value} spanish={spanish} english={label}>
            <Button
              onClick={() => setDifficulty(value)}
              className={cn(
                "font-bold text-white border-2 rounded-lg transition-all duration-200 transform hover:scale-105 font-mono cursor-help",
                difficulty === value 
                  ? `${color} ring-2 ring-offset-2 ring-amber-400 scale-105` 
                  : `${color} opacity-70`
              )}
            >
              {label}
            </Button>
          </TranslationTooltip>
        ))}
      </div>
    </div>
  );
};
