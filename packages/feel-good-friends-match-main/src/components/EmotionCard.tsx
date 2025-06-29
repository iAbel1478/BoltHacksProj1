
import React from 'react';
import { Card } from '@/components/ui/card';

interface EmotionCardProps {
  card: {
    id: number;
    emotion: string;
    emoji: string;
    color: string;
    borderColor: string;
    description?: string;
    isWord?: boolean;
  };
  isSelected: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const EmotionCard = ({ card, isSelected, isMatched, onClick }: EmotionCardProps) => {
  return (
    <Card
      className={`
        aspect-square flex items-center justify-center cursor-pointer
        transition-all duration-300 border-4 hover:shadow-lg
        ${isSelected ? `ring-4 ring-blue-300 ${card.borderColor}` : 'border-gray-200'}
        ${isMatched ? `${card.color} ${card.borderColor} ring-4 ring-green-200` : 'hover:scale-105 bg-white'}
      `}
      onClick={onClick}
      style={{ fontFamily: 'Comic Sans MS, cursive' }}
    >
      {card.isWord ? (
        <div className="text-center p-2">
          <p className="font-bold text-gray-700 text-xs md:text-sm leading-tight">
            {card.description}
          </p>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-3xl md:text-4xl">
            {card.emoji}
          </div>
        </div>
      )}
    </Card>
  );
};

export default EmotionCard;
