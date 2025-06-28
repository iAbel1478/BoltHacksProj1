
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { CodeBlock } from './CodeBlock';
import { HintSystem } from './HintSystem';
import { MultipleChoice } from './MultipleChoice';
import { ExplanationModal } from './ExplanationModal';
import { GearEffects } from './GearEffects';
import { SidekickEffects } from './SidekickEffects';
import { toast } from 'sonner';

interface GameBoardProps {
  level: any;
  onComplete: (reward: any) => void;
  onDefeat: () => void;
  gear: any[];
  sidekicks: any[];
}

export const GameBoard = ({ level, onComplete, onDefeat, gear, sidekicks }: GameBoardProps) => {
  const [attempts, setAttempts] = useState(3);
  const [showHints, setShowHints] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  // Reset state when level changes
  useEffect(() => {
    setAttempts(3);
    setIsFixed(false);
    setShowExplanation(false);
    setShowCorrectAnswer(false);
    setShowHints(false);
  }, [level]);

  const handleCodeFix = (isCorrect: boolean) => {
    if (isCorrect) {
      setIsFixed(true);
      toast.success("🎉 Bug fixed! Moving to next challenge!");
      setShowExplanation(true);
      setTimeout(() => {
        onComplete(level.reward);
      }, 2000);
    } else {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      toast.error(`❌ That didn't work! ${newAttempts} attempts remaining`);
      
      if (newAttempts <= 0) {
        setShowCorrectAnswer(true);
        toast.info("💡 Showing correct answer! Study it and move to the next challenge.");
        setTimeout(() => {
          onComplete(level.reward);
        }, 3000);
      }
    }
  };

  const handleMultipleChoice = (selectedIndex: number) => {
    const isCorrect = selectedIndex === level.correctChoice;
    handleCodeFix(isCorrect);
  };

  const handleSkip = () => {
    toast.info("⏭️ Skipping to next challenge!");
    setTimeout(() => {
      onComplete(level.reward);
    }, 1000);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20">
      {/* Level Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">{level.title}</h2>
          <div className="text-yellow-400 text-sm mt-1">
            {level.language} • {level.digitalWorld}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-white flex items-center space-x-2">
            <span>❤️ Lives: {attempts}</span>
          </div>
          <HintSystem 
            hints={level.hints} 
            isOpen={showHints}
            onToggle={() => setShowHints(!showHints)}
          />
          <Button 
            onClick={handleSkip}
            variant="outline"
            className="bg-blue-500 hover:bg-blue-600 text-white border-blue-400"
          >
            ⏭️ Skip
          </Button>
        </div>
      </div>

      {/* Story Description */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 mb-6 border-l-4 border-blue-400">
        <p className="text-white text-lg">{level.description}</p>
      </div>

      {/* Main Game Area */}
      <div className="space-y-6">
        {/* Code Challenge */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-yellow-400 flex items-center">
            🔧 Debug the {level.language} Code
          </h3>
          <CodeBlock 
            code={level.buggyCode}
            solution={level.solution}
            onFix={handleCodeFix}
            isFixed={isFixed}
            glitchLevel={attempts}
            language={level.language}
            showCorrectAnswer={showCorrectAnswer}
          />
          
          {/* Gear Effects */}
          <GearEffects 
            gear={gear} 
            code={level.buggyCode}
          />
          
          {/* Sidekick Effects */}
          <SidekickEffects 
            sidekicks={sidekicks}
            code={level.buggyCode}
            language={level.language}
          />
          
          {/* Multiple Choice Options */}
          {level.multipleChoice && !isFixed && !showCorrectAnswer && (
            <MultipleChoice 
              options={level.multipleChoice}
              onSelect={handleMultipleChoice}
              disabled={false}
            />
          )}

          {/* Show correct answer when out of lives */}
          {showCorrectAnswer && !isFixed && (
            <div className="bg-green-600/20 rounded-lg p-4 border-2 border-green-400/50">
              <h4 className="text-lg font-bold text-green-400 mb-3 flex items-center">
                💡 Correct Answer
              </h4>
              <div className="text-white mb-3">
                <strong>Fix:</strong> {level.multipleChoice[level.correctChoice]}
              </div>
              <div className="text-green-300 text-sm">
                {level.explanation}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Explanation Modal */}
      {showExplanation && (
        <ExplanationModal 
          level={level}
          onClose={() => setShowExplanation(false)}
        />
      )}
    </div>
  );
};
