import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Difficulty = 'easy' | 'medium' | 'hard' | 'killer';

interface GameControlsProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  isPracticeMode: boolean;
  onTogglePracticeMode: () => void;
  hintsUsed: number;
  onHint: () => void;
  canUseHint: boolean;
}

const difficultyLabels = {
  easy: { label: 'Easy', grid: '5×5', attempts: 4, range: '5-25' },
  medium: { label: 'Medium', grid: '6×6', attempts: 5, range: '20-99' },
  hard: { label: 'Hard', grid: '7×7', attempts: 6, range: '50-200' },
  killer: { label: 'Killer', grid: '8×8', attempts: 7, range: '100-500' }
};

const GameControls: React.FC<GameControlsProps> = ({
  difficulty,
  onDifficultyChange,
  isPracticeMode,
  onTogglePracticeMode,
  hintsUsed,
  onHint,
  canUseHint
}) => {
  return (
    <div className="space-y-4 mb-6">
      {/* Difficulty Selection */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-3 text-center">Game Mode</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {(Object.keys(difficultyLabels) as Difficulty[]).map((diff) => {
            const config = difficultyLabels[diff];
            return (
              <Button
                key={diff}
                variant={difficulty === diff ? "default" : "outline"}
                onClick={() => onDifficultyChange(diff)}
                className="flex flex-col h-auto py-3 px-2"
              >
                <div className="font-semibold">{config.label}</div>
                <div className="text-xs opacity-75">{config.grid} grid</div>
                <div className="text-xs opacity-75">{config.attempts} attempts</div>
                <div className="text-xs opacity-75">{config.range}</div>
              </Button>
            );
          })}
        </div>
      </Card>

      {/* Game Options */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Practice Mode Toggle */}
          <div className="flex items-center gap-3">
            <Button
              variant={isPracticeMode ? "default" : "outline"}
              onClick={onTogglePracticeMode}
              className="flex items-center gap-2"
            >
              {isPracticeMode ? "Exit Practice" : "Practice Mode"}
            </Button>
            {isPracticeMode && (
              <Badge variant="secondary">Unlimited attempts</Badge>
            )}
          </div>

          {/* Hints */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onHint}
              disabled={!canUseHint}
              className="flex items-center gap-2"
            >
              💡 Hint ({3 - hintsUsed} left)
            </Button>
          </div>
        </div>
      </Card>

      {/* Instructions */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="text-sm text-blue-800">
          <p className="font-semibold mb-2">How to play:</p>
          <ul className="space-y-1 text-xs">
            <li>• Enter a mathematical equation that equals the target number</li>
            <li>• Use numbers (0-9) and operators (+, -, ×, ÷)</li>
            <li>• Green = correct position, Yellow = wrong position, Gray = not in equation</li>
            <li>• Follow order of operations (multiplication and division before addition and subtraction)</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default GameControls;
