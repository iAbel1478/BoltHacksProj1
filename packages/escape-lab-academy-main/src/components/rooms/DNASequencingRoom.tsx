
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface DNASequencingRoomProps {
  onObjectiveComplete: (points: number) => void;
  completedObjectives: number;
}

const DNASequencingRoom: React.FC<DNASequencingRoomProps> = ({ onObjectiveComplete, completedObjectives }) => {
  const [currentTask, setCurrentTask] = useState(0);
  const [userInput, setUserInput] = useState<string>('');
  const [mutationInput, setMutationInput] = useState<string>('');

  const tasks = [
    {
      name: 'DNA Base Pairing',
      type: 'pairing',
      sequence: 'ATCGTATGCC',
      correct: 'TAGCATACGG',
      description: 'Complete the complementary DNA strand (A-T, G-C)'
    },
    {
      name: 'DNA to RNA Transcription',
      type: 'transcription',
      sequence: 'ATCGTATGCC',
      correct: 'UAGCAUACGG',
      description: 'Transcribe DNA to RNA (A-U, T-A, G-C, C-G)'
    },
    {
      name: 'Mutation Correction',
      type: 'mutation',
      sequence: 'ATCGXATGCC',
      correct: 'ATCGTATGCC',
      description: 'Fix the mutation (X should be T to maintain proper sequence)'
    }
  ];

  const basePairs = {
    'A': { complement: 'T', rna: 'U', color: 'bg-red-500', name: 'Adenine' },
    'T': { complement: 'A', rna: 'A', color: 'bg-blue-500', name: 'Thymine' },
    'G': { complement: 'C', rna: 'C', color: 'bg-green-500', name: 'Guanine' },
    'C': { complement: 'G', rna: 'G', color: 'bg-yellow-500', name: 'Cytosine' },
    'U': { complement: 'A', rna: 'U', color: 'bg-purple-500', name: 'Uracil' }
  };

  const handleBaseClick = (base: string) => {
    if (completedObjectives > currentTask) return;

    const currentTaskData = tasks[currentTask];
    
    if (currentTaskData.type === 'mutation') {
      const newInput = mutationInput + base;
      setMutationInput(newInput);
      
      if (newInput.length === currentTaskData.correct.length) {
        checkAnswer(newInput);
      }
    } else {
      const newInput = userInput + base;
      setUserInput(newInput);
      
      if (newInput.length === currentTaskData.correct.length) {
        checkAnswer(newInput);
      }
    }
  };

  const checkAnswer = (answer: string) => {
    const currentTaskData = tasks[currentTask];
    
    if (answer === currentTaskData.correct) {
      toast({
        title: "🧬 Perfect Match!",
        description: `${currentTaskData.name} completed correctly!`,
      });
      
      onObjectiveComplete(50);
      
      setTimeout(() => {
        if (currentTask < 2) {
          setCurrentTask(currentTask + 1);
          setUserInput('');
          setMutationInput('');
        }
      }, 2000);
    } else {
      toast({
        title: "🔬 Sequence Error",
        description: "Check your base pairing rules!",
        variant: "destructive"
      });
      setUserInput('');
      setMutationInput('');
    }
  };

  const resetSequence = () => {
    setUserInput('');
    setMutationInput('');
  };

  const currentTaskData = tasks[Math.min(currentTask, 2)];
  const inputToShow = currentTaskData.type === 'mutation' ? mutationInput : userInput;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">🧬 DNA Sequencing Laboratory</h3>
        <div className="flex justify-center space-x-4">
          <Badge variant={completedObjectives >= 1 ? 'default' : 'outline'}>
            Objective 1: Base Pairing {completedObjectives >= 1 ? '✓' : ''}
          </Badge>
          <Badge variant={completedObjectives >= 2 ? 'default' : 'outline'}>
            Objective 2: RNA Transcription {completedObjectives >= 2 ? '✓' : ''}
          </Badge>
          <Badge variant={completedObjectives >= 3 ? 'default' : 'outline'}>
            Objective 3: Mutation Repair {completedObjectives >= 3 ? '✓' : ''}
          </Badge>
        </div>
      </div>

      <Card className="p-6 bg-white/10 border-white/20">
        <h4 className="text-xl font-bold text-white mb-4 text-center">
          {currentTaskData.name}
        </h4>
        <p className="text-white/80 text-center mb-6">{currentTaskData.description}</p>
        
        <div className="bg-gradient-to-r from-blue-900/50 to-green-900/50 p-6 rounded-lg border border-white/20">
          <div className="space-y-4">
            {/* Original Sequence */}
            <div className="text-center">
              <h5 className="text-white font-bold mb-2">
                {currentTaskData.type === 'transcription' ? 'DNA Template' : 'Original Sequence'}
              </h5>
              <div className="flex justify-center space-x-2">
                {currentTaskData.sequence.split('').map((base, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      base === 'X' ? 'bg-red-500 animate-pulse' : basePairs[base as keyof typeof basePairs]?.color || 'bg-gray-500'
                    }`}
                  >
                    {base}
                  </div>
                ))}
              </div>
            </div>

            {/* User Input */}
            <div className="text-center">
              <h5 className="text-white font-bold mb-2">
                {currentTaskData.type === 'transcription' ? 'RNA Sequence' : 
                 currentTaskData.type === 'mutation' ? 'Corrected Sequence' : 'Complementary Strand'}
              </h5>
              <div className="flex justify-center space-x-2">
                {Array.from({ length: currentTaskData.correct.length }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-dashed ${
                      inputToShow[index] 
                        ? `${basePairs[inputToShow[index] as keyof typeof basePairs]?.color || 'bg-gray-500'} border-transparent`
                        : 'bg-white/20 border-white/50'
                    }`}
                  >
                    {inputToShow[index] || '?'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Base Selection */}
        <div className="mt-6">
          <h5 className="text-white font-bold mb-4 text-center">Select Bases</h5>
          <div className="grid grid-cols-5 gap-4 max-w-md mx-auto">
            {Object.entries(basePairs).map(([base, info]) => (
              <button
                key={base}
                onClick={() => handleBaseClick(base)}
                className={`w-16 h-16 rounded-full ${info.color} text-white font-bold text-xl hover:scale-110 transition-transform shadow-lg`}
                disabled={completedObjectives > currentTask}
              >
                {base}
              </button>
            ))}
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/10 p-3 rounded-lg">
              <h6 className="text-white font-bold mb-2">DNA Base Pairs</h6>
              <div className="text-white/80">
                A ↔ T<br/>
                G ↔ C
              </div>
            </div>
            <div className="bg-white/10 p-3 rounded-lg">
              <h6 className="text-white font-bold mb-2">RNA Transcription</h6>
              <div className="text-white/80">
                A → U<br/>
                T → A<br/>
                G → C<br/>
                C → G
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button
            onClick={resetSequence}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            disabled={completedObjectives > currentTask}
          >
            🔄 Reset Sequence
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DNASequencingRoom;
