
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type TranslationDirection = 'spanish-to-english' | 'english-to-spanish';

interface TranslationDirectionSelectorProps {
  direction: TranslationDirection;
  setDirection: (direction: TranslationDirection) => void;
  disabled?: boolean;
}

export const TranslationDirectionSelector: React.FC<TranslationDirectionSelectorProps> = ({ 
  direction, 
  setDirection,
  disabled = false
}) => {
  const directions: { value: TranslationDirection; label: string; flag: string }[] = [
    { value: 'spanish-to-english', label: 'ES→US', flag: '🇪🇸→🇺🇸' },
    { value: 'english-to-spanish', label: 'US→ES', flag: '🇺🇸→🇪🇸' },
  ];

  return (
    <div className="flex-1">
      <h3 className="text-lg font-bold text-amber-800 mb-3 font-mono">Direction</h3>
      <div className="grid grid-cols-2 gap-2">
        {directions.map(({ value, label, flag }) => (
          <Button
            key={value}
            onClick={() => setDirection(value)}
            disabled={disabled}
            className={cn(
              "font-bold text-white border-2 rounded-lg transition-all duration-200 transform hover:scale-105 font-mono text-sm px-2 py-2",
              direction === value 
                ? "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 border-red-600 ring-2 ring-offset-2 ring-amber-400 scale-105" 
                : "bg-gradient-to-r from-red-400 to-orange-400 hover:from-red-500 hover:to-orange-500 border-red-500 opacity-70",
              disabled && "opacity-50 cursor-not-allowed hover:scale-100"
            )}
          >
            <div className="text-center">
              <div className="text-lg">{flag}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};
