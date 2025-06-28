
import { useState } from 'react';
import { Button } from '../ui/button';

interface MultipleChoiceProps {
  options: string[];
  onSelect: (index: number) => void;
  disabled: boolean;
}

export const MultipleChoice = ({ options, onSelect, disabled }: MultipleChoiceProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (disabled) return;
    setSelectedIndex(index);
    setTimeout(() => {
      onSelect(index);
      setSelectedIndex(null);
    }, 500);
  };

  return (
    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 border-2 border-purple-400/50">
      <h4 className="text-lg font-bold text-purple-400 mb-3 flex items-center">
        🎯 Choose the Fix
      </h4>
      
      <div className="space-y-3">
        {options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={disabled}
            variant="outline"
            className={`w-full text-left justify-start p-4 transition-all duration-300 ${
              selectedIndex === index 
                ? 'bg-yellow-500 text-black border-yellow-400 animate-pulse' 
                : 'bg-gray-800 hover:bg-gray-700 text-white border-gray-600'
            }`}
          >
            <span className="font-bold mr-3 text-yellow-400">
              {String.fromCharCode(65 + index)}.
            </span>
            {option}
          </Button>
        ))}
      </div>
      
      <div className="mt-3 text-xs text-purple-300 opacity-75">
        💡 Select the option that best fixes the bug in the code above
      </div>
    </div>
  );
};
