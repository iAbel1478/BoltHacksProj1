
import { useState } from 'react';
import { Button } from '../ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface HintSystemProps {
  hints: string[];
  isOpen: boolean;
  onToggle: () => void;
}

export const HintSystem = ({ hints, isOpen, onToggle }: HintSystemProps) => {
  const [revealedHints, setRevealedHints] = useState<boolean[]>(new Array(hints.length).fill(false));

  const revealHint = (index: number) => {
    setRevealedHints(prev => {
      const newRevealed = [...prev];
      newRevealed[index] = true;
      return newRevealed;
    });
  };

  const revealAllHints = () => {
    setRevealedHints(new Array(hints.length).fill(true));
  };

  return (
    <div className="relative">
      <Button
        onClick={onToggle}
        variant="outline"
        className="bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-400 flex items-center space-x-2"
      >
        <span>💡 Hints</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-gradient-to-r from-yellow-600/90 to-orange-600/90 backdrop-blur-sm rounded-lg p-4 border-2 border-yellow-400/50 shadow-xl z-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-yellow-100 flex items-center">
              💡 Debug Hints
            </h3>
            <Button
              onClick={revealAllHints}
              variant="outline"
              size="sm"
              className="bg-orange-500 hover:bg-orange-600 text-white border-orange-400 text-xs"
            >
              🔓 Reveal All
            </Button>
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {hints.map((hint, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="text-yellow-200 font-bold min-w-[1.5rem] text-sm">
                  {index + 1}.
                </div>
                <div className="flex-1">
                  {revealedHints[index] ? (
                    <div className="text-white bg-black/30 p-2 rounded border-l-2 border-yellow-400 text-sm">
                      {hint}
                    </div>
                  ) : (
                    <Button
                      onClick={() => revealHint(index)}
                      variant="outline"
                      size="sm"
                      className="bg-yellow-400 hover:bg-yellow-500 text-black border-yellow-300 text-xs h-8"
                    >
                      🔍 Hint {index + 1}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 text-xs text-yellow-200 opacity-75 border-t border-yellow-400/30 pt-2">
            💡 Pro tip: Try solving on your own first, then use hints if stuck!
          </div>
        </div>
      )}
    </div>
  );
};
