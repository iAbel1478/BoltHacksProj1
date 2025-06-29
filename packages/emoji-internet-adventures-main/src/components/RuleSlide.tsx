
import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RuleSlideProps {
  character: string;
  characterName: string;
  story: string;
  title: string;
  ruleNumber: number;
  onPrevious: () => void;
  onNext: () => void;
  onReset: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  isLastSlide: boolean;
  isFirstSevenComplete: boolean;
}

const RuleSlide = ({ 
  character, 
  characterName, 
  story, 
  title, 
  ruleNumber,
  onPrevious,
  onNext,
  onReset,
  canGoPrevious,
  canGoNext,
  isLastSlide,
  isFirstSevenComplete
}: RuleSlideProps) => {
  return (
    <Card className="h-full bg-gradient-to-br from-yellow-50 to-orange-50 backdrop-blur-sm border-4 border-amber-300 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
      <CardHeader className="text-center bg-gradient-to-r from-amber-200 to-yellow-200 rounded-t-2xl border-b-4 border-amber-400 pb-4">
        <div className="text-5xl mb-3 animate-bounce drop-shadow-lg">{character}</div>
        <CardTitle className="text-xl text-amber-800 font-bold tracking-wide drop-shadow-md font-mono">
          🎪 {title} 🎪
        </CardTitle>
        <div className="text-base font-bold text-orange-700 bg-white/60 px-3 py-1 rounded-full border-2 border-orange-300">
          🌟 Meet {characterName}! 🌟
        </div>
      </CardHeader>
      
      <CardContent className="p-4 flex flex-col h-[calc(100%-200px)]">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border-4 border-green-300 mb-4 flex-grow">
          <p className="text-gray-800 text-base leading-relaxed font-medium">
            💬 "{story}"
          </p>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl border-4 border-orange-400 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🏆</span>
            <h3 className="font-bold text-orange-800 text-lg font-mono tracking-wide">
              {ruleNumber <= 7 ? `Tech-7 Rule #${ruleNumber}` : `Bonus Rule #${ruleNumber - 7}`}
            </h3>
          </div>
          <p className="text-orange-700 font-bold bg-white/70 px-3 py-2 rounded-lg border-2 border-orange-300">
            🎯 Remember: {title}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            variant="outline"
            size="sm"
            className="bg-amber-600 border-amber-700 hover:bg-amber-700 text-white"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          
          {!isLastSlide ? (
            <Button 
              onClick={onNext} 
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              {isFirstSevenComplete && ruleNumber === 7 ? "More Rules" : "Next Animal"}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button 
              onClick={onReset} 
              size="sm" 
              className="bg-orange-600 hover:bg-orange-700"
            >
              Start Over
              <RotateCcw className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RuleSlide;
