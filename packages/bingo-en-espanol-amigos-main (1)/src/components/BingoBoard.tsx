
import React from 'react';
import { cn } from '@/lib/utils';
import { TranslationTooltip } from './TranslationTooltip';
import { TranslationDirection } from './TranslationDirectionSelector';

interface BingoCell {
  spanish: string;
  english: string;
  id: string;
  claimed: boolean;
}

interface BingoBoardProps {
  board: BingoCell[][];
  onCellClick: (row: number, col: number) => void;
  isUserBoard: boolean;
  currentWord?: string;
  translationDirection: TranslationDirection;
  isBlurred?: boolean;
  userHasCurrentWord?: boolean;
}

export const BingoBoard: React.FC<BingoBoardProps> = ({ 
  board, 
  onCellClick, 
  isUserBoard,
  currentWord,
  translationDirection,
  isBlurred = false,
  userHasCurrentWord = false
}) => {
  if (!board.length) return null;

  // Find which row contains the current word (if any)
  const currentWordRowIndex = currentWord ? board.findIndex(row => 
    row.some(cell => {
      const boardText = translationDirection === 'spanish-to-english' ? cell.spanish : cell.english;
      return boardText === currentWord;
    })
  ) : -1;

  // Automatically highlight row if user has the current word
  const shouldHighlightRow = isUserBoard && userHasCurrentWord && currentWordRowIndex !== -1;

  return (
    <div className={cn(
      "bg-gradient-to-br from-amber-50 to-orange-50 backdrop-blur-sm p-4 rounded-2xl border-4 border-red-500 shadow-2xl transition-all duration-300",
      isBlurred ? "blur-sm opacity-75" : ""
    )}>
      <div className="grid grid-cols-5 gap-2">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const boardText = translationDirection === 'spanish-to-english' ? cell.spanish : cell.english;
            const isCurrentWord = currentWord === boardText;
            const isInHighlightedRow = shouldHighlightRow && rowIndex === currentWordRowIndex;
            
            return (
              <TranslationTooltip 
                key={cell.id}
                spanish={cell.spanish}
                english={cell.english}
                showSpanish={translationDirection === 'spanish-to-english'}
              >
                <button
                  onClick={() => onCellClick(rowIndex, colIndex)}
                  disabled={!isUserBoard || cell.claimed || isBlurred}
                  className={cn(
                    "aspect-square p-2 rounded-xl border-3 font-bold text-sm transition-all duration-200 transform hover:scale-105 shadow-lg font-mono cursor-help relative",
                    cell.claimed 
                      ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white border-green-600 shadow-green-300" 
                      : isInHighlightedRow
                        ? "bg-gradient-to-br from-yellow-300 to-amber-300 text-black border-yellow-500 shadow-yellow-200 animate-pulse ring-4 ring-yellow-400 shadow-2xl"
                        : "bg-gradient-to-br from-orange-200 to-red-200 text-red-800 border-red-400 hover:from-orange-300 hover:to-red-300",
                    isUserBoard && !cell.claimed && !isBlurred
                      ? "cursor-pointer" 
                      : !isUserBoard || cell.claimed || isBlurred
                        ? "cursor-not-allowed opacity-75"
                        : "cursor-pointer hover:shadow-xl"
                  )}
                >
                  <div className="text-center">
                    <div className="text-xs leading-tight break-words">
                      {boardText}
                    </div>
                  </div>
                  {cell.claimed && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-2xl">✓</div>
                    </div>
                  )}
                </button>
              </TranslationTooltip>
            );
          })
        )}
      </div>
    </div>
  );
};
