import React, { useState, useEffect } from 'react';

type GameState = 'menu' | 'playing' | 'completed' | 'timeUp';
type RoomType = 'cell' | 'circuit' | 'chemistry' | 'dna';

const EscapeLabAcademyEmbed: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [currentRoom, setCurrentRoom] = useState<RoomType>('cell');
  const [unlockedRooms, setUnlockedRooms] = useState<RoomType[]>(['cell']);
  const [completedObjectives, setCompletedObjectives] = useState<{[key: string]: number}>({
    cell: 0, circuit: 0, chemistry: 0, dna: 0
  });
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Cell Biology Game State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [placements, setPlacements] = useState<{[key: string]: string}>({});
  const [questionAnswers, setQuestionAnswers] = useState<{[key: string]: boolean}>({});
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: string}>({});

  // Circuit Engineering Room State
  const [circuitPlacements, setCircuitPlacements] = useState<{[key: string]: string}>({});
  const [circuitQuestionAnswers, setCircuitQuestionAnswers] = useState<{[key: string]: boolean}>({});
  const [circuitQuizAnswers, setCircuitQuizAnswers] = useState<{[key: string]: string}>({});
  const [circuitDraggedItem, setCircuitDraggedItem] = useState<string | null>(null);

  const rooms = [
    { id: 'cell' as RoomType, name: 'Cell Biology', icon: '🔬', color: 'bg-green-500' },
    { id: 'circuit' as RoomType, name: 'Circuit Engineering', icon: '⚡', color: 'bg-blue-500' },
    { id: 'chemistry' as RoomType, name: 'Chemical Balancing', icon: '🧪', color: 'bg-purple-500' },
    { id: 'dna' as RoomType, name: 'DNA Sequencing', icon: '🧬', color: 'bg-red-500' }
  ];

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

  const circuitComponents = [
    { id: 'battery', name: 'Battery', emoji: '🔋', color: 'bg-yellow-500' },
    { id: 'wire1', name: 'Wire 1', emoji: '➖', color: 'bg-gray-400' },
    { id: 'bulb', name: 'Bulb', emoji: '💡', color: 'bg-yellow-300' },
    { id: 'wire2', name: 'Wire 2', emoji: '➖', color: 'bg-gray-400' },
    { id: 'switch', name: 'Switch', emoji: '🔘', color: 'bg-blue-400' }
  ];
  const circuitDropZones = [
    { id: 'battery', position: { top: '60%', left: '10%' } },
    { id: 'wire1', position: { top: '60%', left: '30%' } },
    { id: 'bulb', position: { top: '60%', left: '50%' } },
    { id: 'wire2', position: { top: '60%', left: '70%' } },
    { id: 'switch', position: { top: '60%', left: '90%' } }
  ];
  const circuitQuestions = [
    {
      id: 'q1',
      question: 'What happens if the switch is open?',
      options: ['The bulb lights up', 'The circuit is incomplete', 'The battery explodes', 'Nothing changes'],
      correct: 1
    },
    {
      id: 'q2',
      question: 'Which component provides energy?',
      options: ['Bulb', 'Wire', 'Battery', 'Switch'],
      correct: 2
    },
    {
      id: 'q3',
      question: 'What is the function of the bulb?',
      options: ['Store energy', 'Produce light', 'Open the circuit', 'Conduct electricity'],
      correct: 1
    }
  ];
  const circuitQuiz = [
    {
      id: 's1',
      question: 'Which symbol represents a battery?',
      options: ['||', 'O', '---', '⎓'],
      correct: 3
    },
    {
      id: 's2',
      question: 'Which symbol represents a closed switch?',
      options: ['/', '⎔', '⏚', '⎋'],
      correct: 1
    },
    {
      id: 's3',
      question: 'Which symbol represents a bulb?',
      options: ['💡', '⏚', '⎓', 'O'],
      correct: 3
    }
  ];

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('timeUp');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, timeLeft]);

  const startGame = () => {
    setGameState('playing');
    setTimeLeft(600);
    setUnlockedRooms(['cell']);
    setCompletedObjectives({ cell: 0, circuit: 0, chemistry: 0, dna: 0 });
    setCurrentRoom('cell');
    setScore(0);
    setPlacements({});
    setQuestionAnswers({});
    setQuizAnswers({});
    setCircuitPlacements({});
    setCircuitQuestionAnswers({});
    setCircuitQuizAnswers({});
  };

  // Cell Biology Game Functions
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
    
    if (draggedItem && completedObjectives.cell < 1) {
      const newPlacements = { ...placements };
      
      // Remove previous placement
      Object.keys(newPlacements).forEach(key => {
        if (newPlacements[key] === draggedItem) {
          delete newPlacements[key];
        }
      });
      
      newPlacements[zoneId] = draggedItem;
      setPlacements(newPlacements);
      
      setDraggedItem(null);
      
      // Check if all placed correctly for objective 1
      if (Object.keys(newPlacements).length === organelles.length) {
        const allCorrect = Object.keys(newPlacements).every(key => newPlacements[key] === key);
        if (allCorrect && completedObjectives.cell === 0) {
          completeObjective('cell', 50);
        }
      }
    }
  };

  const handleOrganelleClick = (zoneId: string) => {
    if (completedObjectives.cell < 1 && placements[zoneId]) {
      const newPlacements = { ...placements };
      delete newPlacements[zoneId];
      setPlacements(newPlacements);
    }
  };

  const handleQuestionAnswer = (organelleId: string, answerIndex: number) => {
    if (completedObjectives.cell < 2) {
      const organelle = organelles.find(o => o.id === organelleId);
      if (!organelle) return;

      const isCorrect = answerIndex === organelle.correct;
      const newAnswers = { ...questionAnswers };
      newAnswers[organelleId] = isCorrect;
      setQuestionAnswers(newAnswers);

      // Check if all answered correctly for objective 2
      if (Object.keys(newAnswers).length === organelles.length) {
        const allCorrect = Object.values(newAnswers).every(answer => answer);
        if (allCorrect && completedObjectives.cell === 1) {
          completeObjective('cell', 50);
        }
      }
    }
  };

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    if (completedObjectives.cell < 3) {
      const newAnswers = { ...quizAnswers };
      newAnswers[questionId] = answerIndex.toString();
      setQuizAnswers(newAnswers);

      // Check if all quiz answered correctly for objective 3
      if (Object.keys(newAnswers).length === quizQuestions.length) {
        const allCorrect = quizQuestions.every(q => 
          newAnswers[q.id] === q.correct.toString()
        );
        if (allCorrect && completedObjectives.cell === 2) {
          completeObjective('cell', 50);
        }
      }
    }
  };

  // Circuit Engineering Room Handlers
  const handleCircuitDragStart = (e: React.DragEvent, componentId: string) => {
    setCircuitDraggedItem(componentId);
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleCircuitDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  const handleCircuitDrop = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    if (circuitDraggedItem && completedObjectives.circuit < 1) {
      const newPlacements = { ...circuitPlacements };
      Object.keys(newPlacements).forEach(key => {
        if (newPlacements[key] === circuitDraggedItem) {
          delete newPlacements[key];
        }
      });
      newPlacements[zoneId] = circuitDraggedItem;
      setCircuitPlacements(newPlacements);
      setCircuitDraggedItem(null);
      if (Object.keys(newPlacements).length === circuitComponents.length) {
        const allCorrect = Object.keys(newPlacements).every(key => newPlacements[key] === key);
        if (allCorrect && completedObjectives.circuit === 0) {
          completeObjective('circuit', 50);
        }
      }
    }
  };
  const handleCircuitComponentClick = (zoneId: string) => {
    if (completedObjectives.circuit < 1 && circuitPlacements[zoneId]) {
      const newPlacements = { ...circuitPlacements };
      delete newPlacements[zoneId];
      setCircuitPlacements(newPlacements);
    }
  };
  const handleCircuitQuestionAnswer = (questionId: string, answerIndex: number) => {
    if (completedObjectives.circuit < 2) {
      const question = circuitQuestions.find(q => q.id === questionId);
      if (!question) return;
      const isCorrect = answerIndex === question.correct;
      const newAnswers = { ...circuitQuestionAnswers };
      newAnswers[questionId] = isCorrect;
      setCircuitQuestionAnswers(newAnswers);
      if (Object.keys(newAnswers).length === circuitQuestions.length) {
        const allCorrect = Object.values(newAnswers).every(answer => answer);
        if (allCorrect && completedObjectives.circuit === 1) {
          completeObjective('circuit', 50);
        }
      }
    }
  };
  const handleCircuitQuizAnswer = (quizId: string, answerIndex: number) => {
    if (completedObjectives.circuit < 3) {
      const newAnswers = { ...circuitQuizAnswers };
      newAnswers[quizId] = answerIndex.toString();
      setCircuitQuizAnswers(newAnswers);
      if (Object.keys(newAnswers).length === circuitQuiz.length) {
        const allCorrect = circuitQuiz.every(q => newAnswers[q.id] === q.correct.toString());
        if (allCorrect && completedObjectives.circuit === 2) {
          completeObjective('circuit', 50);
        }
      }
    }
  };

  const completeObjective = (roomId: RoomType, points: number) => {
    const newCompleted = { ...completedObjectives };
    newCompleted[roomId] += 1;
    setCompletedObjectives(newCompleted);
    
    const timeBonus = Math.floor(timeLeft / 20);
    const totalPoints = points + timeBonus;
    setScore(score + totalPoints);

    // Check if room is complete (3 objectives)
    if (newCompleted[roomId] === 3) {
      const roomIndex = rooms.findIndex(r => r.id === roomId);
      const nextRoom = rooms[roomIndex + 1];
      
      if (nextRoom && !unlockedRooms.includes(nextRoom.id)) {
        setUnlockedRooms([...unlockedRooms, nextRoom.id]);
      }
      
      // Check if all rooms complete
      if (Object.values(newCompleted).every(count => count >= 3)) {
        setGameState('completed');
      }
    }
  };

  const getTotalProgress = () => {
    const totalObjectives = Object.values(completedObjectives).reduce((sum, count) => sum + count, 0);
    return (totalObjectives / 12) * 100;
  };

  const renderCellBiologyRoom = () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-2">🔬 Cell Biology Laboratory</h3>
          <div className="flex justify-center space-x-4">
            <div className={`px-3 py-1 rounded-full text-sm ${
              completedObjectives.cell >= 1 ? 'bg-green-500 text-white' : 'bg-white/20 text-white/80 border border-white/30'
            }`}>
              Objective 1: Position Organelles {completedObjectives.cell >= 1 ? '✓' : ''}
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${
              completedObjectives.cell >= 2 ? 'bg-green-500 text-white' : 'bg-white/20 text-white/80 border border-white/30'
            }`}>
              Objective 2: Function Questions {completedObjectives.cell >= 2 ? '✓' : ''}
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${
              completedObjectives.cell >= 3 ? 'bg-green-500 text-white' : 'bg-white/20 text-white/80 border border-white/30'
            }`}>
              Objective 3: Cell Process Quiz {completedObjectives.cell >= 3 ? '✓' : ''}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cell Diagram */}
          <div className="lg:col-span-2">
            <div className="p-4 bg-white/10 border border-white/20 rounded-lg">
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
                        } ${organelle && completedObjectives.cell < 1 ? 'cursor-pointer hover:scale-110' : ''}`}
                        style={zone.position}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, zone.id)}
                        onClick={() => handleOrganelleClick(zone.id)}
                      >
                        {organelle ? (
                          <div className="text-center">
                            <div className="text-lg">{organelle.emoji}</div>
                            {isCorrect && <div className="text-green-600 text-xs">✓</div>}
                            {organelle && !isCorrect && <div className="text-red-600 text-xs">✗</div>}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-600">Drop</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              {completedObjectives.cell < 1 && (
                <p className="text-white/70 text-sm mt-2 text-center">
                  💡 Tip: Click on placed organelles to remove and reposition them!
                </p>
              )}
            </div>
          </div>

          {/* Controls Panel - always visible in right column */}
          <div className="space-y-4">
            {completedObjectives.cell < 1 && (
              <div className="p-4 bg-white/10 border border-white/20 rounded-lg">
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
              </div>
            )}

            {completedObjectives.cell >= 1 && completedObjectives.cell < 2 && (
              <div className="p-4 bg-white/10 border border-white/20 rounded-lg">
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
              </div>
            )}

            {completedObjectives.cell >= 2 && completedObjectives.cell < 3 && (
              <div className="p-4 bg-white/10 border border-white/20 rounded-lg">
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
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Circuit Engineering Room UI
  const renderCircuitEngineeringRoom = () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-2">⚡ Circuit Engineering Laboratory</h3>
          <div className="flex justify-center space-x-4">
            <div className={`px-3 py-1 rounded-full text-sm ${completedObjectives.circuit >= 1 ? 'bg-green-500 text-white' : 'bg-white/20 text-white/80 border border-white/30'}`}>Objective 1: Build Circuit {completedObjectives.circuit >= 1 ? '✓' : ''}</div>
            <div className={`px-3 py-1 rounded-full text-sm ${completedObjectives.circuit >= 2 ? 'bg-green-500 text-white' : 'bg-white/20 text-white/80 border border-white/30'}`}>Objective 2: Circuit Questions {completedObjectives.circuit >= 2 ? '✓' : ''}</div>
            <div className={`px-3 py-1 rounded-full text-sm ${completedObjectives.circuit >= 3 ? 'bg-green-500 text-white' : 'bg-white/20 text-white/80 border border-white/30'}`}>Objective 3: Circuit Quiz {completedObjectives.circuit >= 3 ? '✓' : ''}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Circuit Diagram */}
          <div className="lg:col-span-2">
            <div className="p-4 bg-white/10 border border-white/20 rounded-lg">
              <h4 className="text-lg font-bold text-white mb-4 text-center">Build the Circuit</h4>
              <div className="relative bg-gradient-to-br from-yellow-50 to-blue-100 rounded-lg h-48 overflow-hidden">
                <div className="absolute inset-2 border-4 border-yellow-600 rounded-lg bg-gradient-to-br from-yellow-50/80 to-blue-50/80">
                  {circuitDropZones.map((zone) => {
                    const placedComponent = circuitPlacements[zone.id];
                    const component = circuitComponents.find(c => c.id === placedComponent);
                    const isCorrect = placedComponent === zone.id;
                    return (
                      <div
                        key={zone.id}
                        className={`absolute w-12 h-12 rounded-full border-2 border-dashed transition-all duration-300 flex items-center justify-center ${component && isCorrect ? 'border-green-500 bg-green-200' : component ? 'border-red-500 bg-red-200' : 'border-gray-400 bg-white/50 hover:border-blue-500'} ${component && completedObjectives.circuit < 1 ? 'cursor-pointer hover:scale-110' : ''}`}
                        style={zone.position}
                        onDragOver={handleCircuitDragOver}
                        onDrop={(e) => handleCircuitDrop(e, zone.id)}
                        onClick={() => handleCircuitComponentClick(zone.id)}
                      >
                        {component ? (
                          <div className="text-center">
                            <div className="text-lg">{component.emoji}</div>
                            {isCorrect && <div className="text-green-600 text-xs">✓</div>}
                            {component && !isCorrect && <div className="text-red-600 text-xs">✗</div>}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-600">Drop</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              {completedObjectives.circuit < 1 && (
                <p className="text-white/70 text-sm mt-2 text-center">💡 Tip: Click on placed components to remove and reposition them!</p>
              )}
            </div>
          </div>
          {/* Controls Panel */}
          <div className="space-y-4">
            {completedObjectives.circuit < 1 && (
              <div className="p-4 bg-white/10 border border-white/20 rounded-lg">
                <h4 className="text-lg font-bold text-white mb-4">Components</h4>
                <div className="grid grid-cols-2 gap-2">
                  {circuitComponents.map((component) => {
                    const isUsed = Object.values(circuitPlacements).includes(component.id);
                    return (
                      <div
                        key={component.id}
                        className={`p-2 rounded-lg border-2 cursor-move transition-all text-center ${isUsed ? 'opacity-50 bg-gray-500/20' : `${component.color} border-white/30 hover:scale-105`}`}
                        draggable={!isUsed}
                        onDragStart={(e) => handleCircuitDragStart(e, component.id)}
                      >
                        <div className="text-xl">{component.emoji}</div>
                        <div className="text-white font-bold text-xs">{component.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {completedObjectives.circuit >= 1 && completedObjectives.circuit < 2 && (
              <div className="p-4 bg-white/10 border border-white/20 rounded-lg">
                <h4 className="text-lg font-bold text-white mb-4">Circuit Questions</h4>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {circuitQuestions.map((q) => (
                    <div key={q.id} className={`p-2 rounded-lg border ${circuitQuestionAnswers[q.id] === true ? 'bg-green-500/20 border-green-500/50' : 'bg-white/10 border-white/20'}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">⚡</span>
                        <span className="text-white font-semibold text-sm">Question</span>
                      </div>
                      <p className="text-white/80 text-xs mb-2">{q.question}</p>
                      <div className="space-y-1">
                        {q.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleCircuitQuestionAnswer(q.id, index)}
                            className="w-full text-left p-1 rounded text-xs bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {completedObjectives.circuit >= 2 && completedObjectives.circuit < 3 && (
              <div className="p-4 bg-white/10 border border-white/20 rounded-lg">
                <h4 className="text-lg font-bold text-white mb-4">Circuit Symbols Quiz</h4>
                <div className="space-y-4">
                  {circuitQuiz.map((q) => (
                    <div key={q.id} className="p-3 rounded-lg bg-white/10 border border-white/20">
                      <p className="text-white font-semibold text-sm mb-2">{q.question}</p>
                      <div className="space-y-1">
                        {q.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleCircuitQuizAnswer(q.id, index)}
                            className={`w-full text-left p-2 rounded text-xs transition-colors ${circuitQuizAnswers[q.id] === index.toString() ? index === q.correct ? 'bg-green-500/30 text-green-200' : 'bg-red-500/30 text-red-200' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Placeholder for other rooms
  const renderSimpleRoom = (roomId: RoomType, roomName: string, emoji: string) => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-5xl mb-4">{emoji}</div>
        <h2 className="text-3xl font-bold text-white mb-4">{roomName} Room</h2>
        <p className="text-white/80 mb-6">Complete this room to progress!</p>
        {completedObjectives[roomId] < 3 ? (
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg"
            onClick={() => completeObjective(roomId, 100)}
          >
            ✅ Complete Room
          </button>
        ) : (
          <div className="text-green-400 text-2xl font-bold">Room Completed!</div>
        )}
      </div>
    );
  };

  const renderCurrentRoom = () => {
    switch (currentRoom) {
      case 'cell':
        return renderCellBiologyRoom();
      case 'circuit':
        return renderCircuitEngineeringRoom();
      case 'chemistry':
        return renderSimpleRoom('chemistry', 'Chemical Balancing', '🧪');
      case 'dna':
        return renderSimpleRoom('dna', 'DNA Sequencing', '🧬');
      default:
        return null;
    }
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg">
          <div className="text-center space-y-6">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="w-16 h-16 text-cyan-400 text-4xl">🧪</div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Science Escape Lab
              </h1>
            </div>
            
            <p className="text-xl text-white/80 leading-relaxed">
              🚨 LABORATORY LOCKDOWN PROTOCOL ACTIVATED 🚨<br/>
              Complete all 12 scientific objectives across 4 specialized labs to escape!
            </p>
            
            <div className="grid grid-cols-2 gap-4 my-8">
              {rooms.map((room) => (
                <div key={room.id} className="bg-white/10 rounded-lg p-4 border border-white/20">
                  <div className="text-4xl mb-2">{room.icon}</div>
                  <h3 className="font-semibold text-white">{room.name}</h3>
                  <p className="text-xs text-white/60">3 Objectives • Sequential Unlock</p>
                </div>
              ))}
            </div>
            
            <div className="bg-red-500/20 rounded-lg p-4 border border-red-500/30">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-6 h-6 text-red-400">⏰</div>
                <span className="text-red-400 font-bold text-lg">10 MINUTE COUNTDOWN</span>
              </div>
              <p className="text-sm text-white/70">
                Navigate through Cell Biology → Circuit Engineering → Chemical Balancing → DNA Sequencing
              </p>
            </div>
            
            <button 
              onClick={startGame}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🚀 INITIATE ESCAPE SEQUENCE
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl p-8 bg-white/10 backdrop-blur-lg border border-white/20 text-center rounded-lg">
          <div className="space-y-6">
            <div className="flex justify-center items-center space-x-2">
              <div className="w-20 h-20 text-yellow-400 text-6xl animate-pulse">⭐</div>
              <h1 className="text-7xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                ESCAPED!
              </h1>
              <div className="w-20 h-20 text-yellow-400 text-6xl animate-pulse">⭐</div>
            </div>
            
            <p className="text-3xl text-white/90">
              🎉 Laboratory Escape Successful! 🎉
            </p>
            
            <div className="bg-white/10 rounded-lg p-6 space-y-4">
              <h3 className="text-2xl font-semibold text-white">Mission Report</h3>
              <div className="text-5xl font-bold text-yellow-400">{score} Points</div>
              <div className="text-lg text-white/70">
                Time Remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>
              <div className="text-sm text-green-400">
                All 12 objectives completed across 4 specialized laboratories!
              </div>
            </div>
            
            <button 
              onClick={() => {
                setGameState('menu');
                setCurrentRoom('cell');
                setUnlockedRooms(['cell']);
                setCompletedObjectives({ cell: 0, circuit: 0, chemistry: 0, dna: 0 });
                setScore(0);
              }}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg"
            >
              🔄 New Escape Attempt
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'timeUp') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-red-800 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl p-8 bg-white/10 backdrop-blur-lg border border-white/20 text-center rounded-lg">
          <div className="space-y-6">
            <div className="text-8xl mb-4">⏰</div>
            <h1 className="text-6xl font-bold text-red-400">TIME'S UP!</h1>
            <p className="text-2xl text-white/80">
              The laboratory lockdown has failed. Try again!
            </p>
            <div className="bg-white/10 rounded-lg p-6">
              <p className="text-lg text-white/70">Final Score: {score} Points</p>
              <p className="text-sm text-white/60">
                Progress: {Object.values(completedObjectives).reduce((sum, count) => sum + count, 0)}/12 objectives
              </p>
            </div>
            <button 
              onClick={() => {
                setGameState('menu');
                setCurrentRoom('cell');
                setUnlockedRooms(['cell']);
                setCompletedObjectives({ cell: 0, circuit: 0, chemistry: 0, dna: 0 });
                setScore(0);
              }}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg"
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">🧪 Science Escape Lab</h1>
            <div className="text-white/80">Score: {score}</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-red-400 font-bold">
              ⏰ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <div className="w-32 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getTotalProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Room Navigation */}
      <div className="bg-white/5 border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex space-x-2">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setCurrentRoom(room.id)}
              disabled={!unlockedRooms.includes(room.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentRoom === room.id 
                  ? 'bg-white/20 text-white' 
                  : unlockedRooms.includes(room.id)
                    ? 'bg-white/10 text-white/80 hover:bg-white/15'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span className="text-xl">{room.icon}</span>
              <span className="font-medium">{room.name}</span>
              <span className="text-sm">
                ({completedObjectives[room.id]}/3)
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Game Content */}
      <div className="max-w-7xl mx-auto p-6">
        {renderCurrentRoom()}
      </div>
    </div>
  );
};

export default EscapeLabAcademyEmbed; 