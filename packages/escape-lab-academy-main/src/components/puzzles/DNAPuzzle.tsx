
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface DNAPuzzleProps {
  onComplete: (points: number) => void;
}

const DNAPuzzle: React.FC<DNAPuzzleProps> = ({ onComplete }) => {
  const [selectedBases, setSelectedBases] = useState<{[key: number]: string}>({});
  const [attempts, setAttempts] = useState(0);

  // DNA sequence puzzle - complete the complementary strand
  const originalStrand = ['A', 'T', 'G', 'C', 'A', 'G', 'T', 'C'];
  const correctComplement = ['T', 'A', 'C', 'G', 'T', 'C', 'A', 'G'];
  
  const availableBases = ['A', 'T', 'G', 'C'];
  
  const baseColors = {
    'A': 'bg-red-500',
    'T': 'bg-blue-500',
    'G': 'bg-green-500',
    'C': 'bg-yellow-500'
  };

  const basePairs = {
    'A': 'T',
    'T': 'A',
    'G': 'C',
    'C': 'G'
  };

  const handleBaseSelection = (position: number, base: string) => {
    setSelectedBases({
      ...selectedBases,
      [position]: base
    });
  };

  const checkSequence = () => {
    setAttempts(attempts + 1);
    
    let correctCount = 0;
    for (let i = 0; i < originalStrand.length; i++) {
      if (selectedBases[i] === correctComplement[i]) {
        correctCount++;
      }
    }

    if (correctCount === originalStrand.length) {
      toast({
        title: "🧬 DNA Sequence Complete!",
        description: "Perfect! You've completed the complementary DNA strand!",
      });
      
      const points = Math.max(110 - (attempts * 5), 50);
      setTimeout(() => onComplete(points), 500);
    } else {
      toast({
        title: "🔬 Sequence Incomplete",
        description: `${correctCount}/${originalStrand.length} base pairs are correct. Keep trying!`,
        variant: "destructive"
      });
    }
  };

  const isPositionCorrect = (position: number) => {
    return selectedBases[position] === correctComplement[position];
  };

  const isSequenceComplete = () => {
    return Object.keys(selectedBases).length === originalStrand.length;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">🧬 DNA Sequencing Challenge</h2>
        <p className="text-white/80">Complete the complementary DNA strand using base pairing rules!</p>
        <Badge variant="secondary" className="mt-2">
          Attempts: {attempts}
        </Badge>
      </div>

      <Card className="p-8 bg-white/10 border-white/20">
        <h3 className="text-xl font-bold text-white mb-6 text-center">Double Helix Structure</h3>
        
        {/* Base Pairing Rules */}
        <Card className="p-4 bg-blue-500/20 border-blue-500/30 mb-6">
          <h4 className="font-bold text-white mb-3 text-center">Base Pairing Rules</h4>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
              <span className="text-white">pairs with</span>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">T</div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">G</div>
              <span className="text-white">pairs with</span>
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">C</div>
            </div>
          </div>
        </Card>

        {/* DNA Strands */}
        <div className="space-y-8">
          
          {/* Original Strand */}
          <div>
            <h4 className="text-lg font-bold text-white mb-3 text-center">Original DNA Strand (5' → 3')</h4>
            <div className="flex justify-center space-x-2">
              {originalStrand.map((base, index) => (
                <div key={`original-${index}`} className="text-center">
                  <div className={`w-12 h-12 ${baseColors[base]} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {base}
                  </div>
                  <div className="text-white text-xs mt-1">{index + 1}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Connection Lines */}
          <div className="flex justify-center">
            <div className="grid grid-cols-8 gap-2 w-max">
              {originalStrand.map((_, index) => (
                <div key={`connection-${index}`} className="flex justify-center">
                  <div className={`w-1 h-8 ${
                    selectedBases[index] && isPositionCorrect(index) 
                      ? 'bg-green-400' 
                      : selectedBases[index] 
                      ? 'bg-red-400' 
                      : 'bg-gray-400'
                  } rounded`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Complementary Strand */}
          <div>
            <h4 className="text-lg font-bold text-white mb-3 text-center">Complementary Strand (3' → 5')</h4>
            <div className="flex justify-center space-x-2">
              {originalStrand.map((originalBase, index) => (
                <div key={`complement-${index}`} className="text-center">
                  {selectedBases[index] ? (
                    <div 
                      className={`w-12 h-12 ${baseColors[selectedBases[index]]} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg cursor-pointer hover:scale-110 transition-transform ${
                        isPositionCorrect(index) ? 'ring-4 ring-green-400' : 'ring-4 ring-red-400'
                      }`}
                      onClick={() => handleBaseSelection(index, '')}
                    >
                      {selectedBases[index]}
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gray-600 border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center text-gray-400 text-xs">
                      ?
                    </div>
                  )}
                  <div className="text-white text-xs mt-1">{index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Base Selection */}
        <div className="mt-8">
          <h4 className="text-lg font-bold text-white mb-4 text-center">Select Bases</h4>
          <div className="flex justify-center space-x-4 mb-6">
            {availableBases.map((base) => (
              <div key={base} className="text-center">
                <div 
                  className={`w-16 h-16 ${baseColors[base]} rounded-full flex items-center justify-center text-white font-bold text-xl cursor-pointer hover:scale-110 transition-transform shadow-lg`}
                  onClick={() => {
                    const nextEmptyPosition = originalStrand.findIndex((_, index) => !selectedBases[index]);
                    if (nextEmptyPosition !== -1) {
                      handleBaseSelection(nextEmptyPosition, base);
                    }
                  }}
                >
                  {base}
                </div>
                <div className="text-white text-sm mt-2">
                  {base === 'A' && 'Adenine'}
                  {base === 'T' && 'Thymine'}
                  {base === 'G' && 'Guanine'}
                  {base === 'C' && 'Cytosine'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => {
              setSelectedBases({});
              setAttempts(attempts + 1);
            }}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            🔄 Clear Sequence
          </Button>
          
          <Button
            onClick={checkSequence}
            disabled={!isSequenceComplete()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
          >
            🔬 Check Sequence
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/70 text-sm">
            💡 Remember: A pairs with T, and G pairs with C in DNA!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default DNAPuzzle;
