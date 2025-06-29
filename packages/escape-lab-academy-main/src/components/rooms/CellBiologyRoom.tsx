import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CellBiologyRoomProps {
  onObjectiveComplete: (points: number) => void;
  completedObjectives: number;
}

const CellBiologyRoom: React.FC<CellBiologyRoomProps> = ({ onObjectiveComplete, completedObjectives }) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [placements, setPlacements] = useState<{[key: string]: string}>({});
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [questionAnswers, setQuestionAnswers] = useState<{[key: string]: boolean}>({});
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: string}>({});

  const organelles = [
    { 
      id: 'nucleus', 
      name: 'Nucleus', 
      emoji: '🧬',
      color: 'bg-blue-500',
      question: 'What is the primary function of the nucleus?',
      options: ['Controls cell activities and stores DNA', 'Produces energy', 'Makes proteins', 'Digests waste'],
      correct: 0
    },
    { 
      id: 'cytoplasm', 
      name: 'Cytoplasm', 
      emoji: '🧪',
      color: 'bg-teal-500',
      question: 'What role does cytoplasm play?',
      options: ['Provides structure only', 'Gel-like medium for reactions', 'Stores genetic material', 'Produces ATP'],
      correct: 1
    },
    { 
      id: 'membrane', 
      name: 'Cell Membrane', 
      emoji: '🧱',
      color: 'bg-purple-500',
      question: 'How does the cell membrane function?',
      options: ['Makes proteins', 'Stores water', 'Controls entry/exit of substances', 'Produces energy'],
      correct: 2
    },
    { 
      id: 'mitochondria', 
      name: 'Mitochondria', 
      emoji: '⚡',
      color: 'bg-red-500',
      question: 'Why is mitochondria the powerhouse?',
      options: ['Stores DNA', 'Makes proteins', 'Digests waste', 'Produces energy (ATP)'],
      correct: 3
    },
    { 
      id: 'golgi', 
      name: 'Golgi Apparatus', 
      emoji: '📦',
      color: 'bg-orange-500',
      question: 'What does Golgi apparatus do?',
      options: ['Modifies and packages proteins', 'Stores genetic material', 'Produces energy', 'Makes ribosomes'],
      correct: 0
    },
    { 
      id: 'er', 
      name: 'Endoplasmic Reticulum', 
      emoji: '🏗️',
      color: 'bg-indigo-500',
      question: 'What is the ER\'s main function?',
      options: ['Protein synthesis and transport', 'Energy production', 'Waste disposal', 'DNA storage'],
      correct: 0
    },
    { 
      id: 'ribosome', 
      name: 'Ribosomes', 
      emoji: '🔘',
      color: 'bg-green-500',
      question: 'What do ribosomes produce?',
      options: ['DNA', 'Proteins', 'Energy', 'Waste'],
      correct: 1
    },
    { 
      id: 'lysosome', 
      name: 'Lysosomes', 
      emoji: '♻️',
      color: 'bg-pink-500',
      question: 'How do lysosomes help?',
      options: ['Store water', 'Make proteins', 'Digest waste and worn parts', 'Produce energy'],
      correct: 2
    },
    { 
      id: 'vacuole', 
      name: 'Vacuoles', 
      emoji: '💧',
      color: 'bg-cyan-500',
      question: 'What do vacuoles store?',
      options: ['DNA', 'Proteins', 'Water and substances', 'Energy'],
      correct: 2
    }
  ];

  const dropZones = [
    { id: 'nucleus', position: { top: '45%', left: '50%' } },
    { id: 'membrane', position: { top: '10%', left: '10%' } },
    { id: 'cytoplasm', position: { top: '30%', left: '20%' } },
    { id: 'mitochondria', position: { top: '60%', left: '30%' } },
    { id: 'golgi', position: { top: '40%', left: '70%' } },
    { id: 'er', position: { top: '25%', left: '65%' } },
    { id: 'ribosome', position: { top: '70%', left: '60%' } },
    { id: 'lysosome', position: { top: '75%', left: '20%' } },
    { id: 'vacuole', position: { top: '20%', left: '35%' } }
  ];

  const quizQuestions = [
    {
      id: 'process1',
      question: 'Which process creates energy in cells?',
      options: ['Photosynthesis', 'Cellular respiration', 'Protein synthesis', 'DNA replication'],
      correct: 1
    },
    {
      id: 'process2',
      question: 'Where does protein synthesis begin?',
      options: ['Nucleus', 'Mitochondria', 'Ribosomes', 'Golgi apparatus'],
      correct: 2
    },
    {
      id: 'process3',
      question: 'What controls what enters and exits the cell?',
      options: ['Nucleus', 'Cell membrane', 'Cytoplasm', 'Vacuole'],
      correct: 1
    }
  ];

  const handleDragStart = (e: React.DragEvent, organelleId: string) => {
    setDraggedItem(organelleId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    
    if (draggedItem && completedObjectives < 1) {
      const newPlacements = { ...placements };
      
      // Remove previous placement
      Object.keys(newPlacements).forEach(key => {
        if (newPlacements[key] === draggedItem) {
          delete newPlacements[key];
        }
      });
      
      newPlacements[zoneId] = draggedItem;
      setPlacements(newPlacements);
      
      if (draggedItem === zoneId) {
        toast({
          title: "🎯 Perfect Placement!",
          description: "Organelle correctly positioned!",
        });
      }
      
      setDraggedItem(null);
      
      // Check if all placed correctly for objective 1
      if (Object.keys(newPlacements).length === organelles.length) {
        const allCorrect = Object.keys(newPlacements).every(key => newPlacements[key] === key);
        if (allCorrect && completedObjectives === 0) {
          onObjectiveComplete(50);
        }
      }
    }
  };

  const handleOrganelleClick = (zoneId: string) => {
    if (completedObjectives < 1 && placements[zoneId]) {
      const newPlacements = { ...placements };
      delete newPlacements[zoneId];
      setPlacements(newPlacements);
      
      toast({
        title: "🔄 Organelle Removed",
        description: "You can now drag it to a new position!",
      });
    }
  };

  const handleQuestionAnswer = (organelleId: string, answerIndex: number) => {
    if (completedObjectives < 2) {
      const organelle = organelles.find(o => o.id === organelleId);
      if (!organelle) return;

      const isCorrect = answerIndex === organelle.correct;
      const newAnswers = { ...questionAnswers };
      newAnswers[organelleId] = isCorrect;
      setQuestionAnswers(newAnswers);

      if (isCorrect) {
        toast({
          title: "🧠 Correct!",
          description: "Great understanding of organelle function!",
        });
      }

      // Check if all answered correctly for objective 2
      if (Object.keys(newAnswers).length === organelles.length) {
        const allCorrect = Object.values(newAnswers).every(answer => answer);
        if (allCorrect && completedObjectives === 1) {
          onObjectiveComplete(50);
        }
      }
    }
  };

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    if (completedObjectives < 3) {
      const newAnswers = { ...quizAnswers };
      newAnswers[questionId] = answerIndex.toString();
      setQuizAnswers(newAnswers);

      // Check if all quiz answered correctly for objective 3
      if (Object.keys(newAnswers).length === quizQuestions.length) {
        const allCorrect = quizQuestions.every(q => 
          newAnswers[q.id] === q.correct.toString()
        );
        if (allCorrect && completedObjectives === 2) {
          onObjectiveComplete(50);
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">🔬 Cell Biology Laboratory</h3>
        <div className="flex justify-center space-x-4">
          <Badge variant={completedObjectives >= 1 ? 'default' : 'outline'}>
            Objective 1: Position Organelles {completedObjectives >= 1 ? '✓' : ''}
          </Badge>
          <Badge variant={completedObjectives >= 2 ? 'default' : 'outline'}>
            Objective 2: Function Questions {completedObjectives >= 2 ? '✓' : ''}
          </Badge>
          <Badge variant={completedObjectives >= 3 ? 'default' : 'outline'}>
            Objective 3: Cell Process Quiz {completedObjectives >= 3 ? '✓' : ''}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cell Diagram */}
        <div className="lg:col-span-2">
          <Card className="p-4 bg-white/10 border-white/20">
            <h4 className="text-lg font-bold text-white mb-4 text-center">Animal Cell Diagram</h4>
            <div className="relative bg-gradient-to-br from-green-100 to-blue-200 rounded-lg h-80 overflow-hidden">
              <div className="absolute inset-2 border-4 border-purple-600 rounded-full bg-gradient-to-br from-cyan-50/80 to-blue-50/80">
                {dropZones.map((zone) => {
                  const placedOrganelle = placements[zone.id];
                  const organelle = organelles.find(o => o.id === placedOrganelle);
                  const isCorrect = placedOrganelle === zone.id;
                  
                  return (
                    <div
                      key={zone.id}
                      className={`absolute w-12 h-12 rounded-full border-2 border-dashed transition-all duration-300 flex items-center justify-center ${
                        organelle && isCorrect
                          ? 'border-green-500 bg-green-200'
                          : organelle
                          ? 'border-red-500 bg-red-200'
                          : 'border-gray-400 bg-white/50 hover:border-blue-500'
                      } ${organelle && completedObjectives < 1 ? 'cursor-pointer hover:scale-110' : ''}`}
                      style={zone.position}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, zone.id)}
                      onClick={() => handleOrganelleClick(zone.id)}
                    >
                      {organelle ? (
                        <div className="text-center">
                          <div className="text-lg">{organelle.emoji}</div>
                          {isCorrect && <CheckCircle2 className="w-3 h-3 mx-auto text-green-600" />}
                          {organelle && !isCorrect && <XCircle className="w-3 h-3 mx-auto text-red-600" />}
                        </div>
                      ) : (
                        <div className="text-xs text-gray-600">Drop</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {completedObjectives < 1 && (
              <p className="text-white/70 text-sm mt-2 text-center">
                💡 Tip: Click on placed organelles to remove and reposition them!
              </p>
            )}
          </Card>
        </div>

        {/* Controls Panel */}
        <div className="space-y-4">
          {completedObjectives < 1 && (
            <Card className="p-4 bg-white/10 border-white/20">
              <h4 className="text-lg font-bold text-white mb-4">Organelles</h4>
              <div className="grid grid-cols-2 gap-2">
                {organelles.map((organelle) => {
                  const isUsed = Object.values(placements).includes(organelle.id);
                  return (
                    <div
                      key={organelle.id}
                      className={`p-2 rounded-lg border-2 cursor-move transition-all text-center ${
                        isUsed 
                          ? 'opacity-50 bg-gray-500/20' 
                          : `${organelle.color} border-white/30 hover:scale-105`
                      }`}
                      draggable={!isUsed}
                      onDragStart={(e) => handleDragStart(e, organelle.id)}
                    >
                      <div className="text-xl">{organelle.emoji}</div>
                      <div className="text-white font-bold text-xs">{organelle.name}</div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {completedObjectives >= 1 && completedObjectives < 2 && (
            <Card className="p-4 bg-white/10 border-white/20">
              <h4 className="text-lg font-bold text-white mb-4">Function Questions</h4>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {organelles.map((organelle) => (
                  <div key={organelle.id} className={`p-2 rounded-lg border ${
                    questionAnswers[organelle.id] === true ? 'bg-green-500/20 border-green-500/50' : 'bg-white/10 border-white/20'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">{organelle.emoji}</span>
                      <span className="text-white font-semibold text-sm">{organelle.name}</span>
                    </div>
                    <p className="text-white/80 text-xs mb-2">{organelle.question}</p>
                    <div className="space-y-1">
                      {organelle.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuestionAnswer(organelle.id, index)}
                          className="w-full text-left p-1 rounded text-xs bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {completedObjectives >= 2 && completedObjectives < 3 && (
            <Card className="p-4 bg-white/10 border-white/20">
              <h4 className="text-lg font-bold text-white mb-4">Cell Process Quiz</h4>
              <div className="space-y-4">
                {quizQuestions.map((question) => (
                  <div key={question.id} className="p-3 rounded-lg bg-white/10 border border-white/20">
                    <p className="text-white font-semibold text-sm mb-2">{question.question}</p>
                    <div className="space-y-1">
                      {question.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuizAnswer(question.id, index)}
                          className={`w-full text-left p-2 rounded text-xs transition-colors ${
                            quizAnswers[question.id] === index.toString()
                              ? index === question.correct
                                ? 'bg-green-500/30 text-green-200'
                                : 'bg-red-500/30 text-red-200'
                              : 'bg-white/10 text-white/80 hover:bg-white/20'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CellBiologyRoom;
