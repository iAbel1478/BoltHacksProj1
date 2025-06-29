import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Beaker, Lock, Unlock, Star, Clock, HelpCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import GameTimer from '@/components/GameTimer';
import AIAssistant from '@/components/AIAssistant';
import CellBiologyRoom from '@/components/rooms/CellBiologyRoom';
import CircuitEngineeringRoom from '@/components/rooms/CircuitEngineeringRoom';
import ChemicalBalancingRoom from '@/components/rooms/ChemicalBalancingRoom';
import DNASequencingRoom from '@/components/rooms/DNASequencingRoom';

type GameState = 'menu' | 'playing' | 'completed' | 'timeUp';
type RoomType = 'cell' | 'circuit' | 'chemistry' | 'dna';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [currentRoom, setCurrentRoom] = useState<RoomType>('cell');
  const [unlockedRooms, setUnlockedRooms] = useState<RoomType[]>(['cell']);
  const [completedObjectives, setCompletedObjectives] = useState<{[key: string]: number}>({
    cell: 0, circuit: 0, chemistry: 0, dna: 0
  });
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const rooms = [
    { id: 'cell' as RoomType, name: 'Cell Biology', icon: '🔬', color: 'bg-green-500' },
    { id: 'circuit' as RoomType, name: 'Circuit Engineering', icon: '⚡', color: 'bg-blue-500' },
    { id: 'chemistry' as RoomType, name: 'Chemical Balancing', icon: '🧪', color: 'bg-purple-500' },
    { id: 'dna' as RoomType, name: 'DNA Sequencing', icon: '🧬', color: 'bg-red-500' }
  ];

  const startGame = () => {
    setGameState('playing');
    setTimeLeft(600);
    setUnlockedRooms(['cell']);
    setCompletedObjectives({ cell: 0, circuit: 0, chemistry: 0, dna: 0 });
    setCurrentRoom('cell');
    setScore(0);
    toast({
      title: "🧪 Lab Lockdown Initiated!",
      description: "10 minutes to escape! Complete all objectives in sequence!",
    });
  };

  const completeObjective = (roomId: RoomType, points: number) => {
    const newCompleted = { ...completedObjectives };
    newCompleted[roomId] += 1;
    setCompletedObjectives(newCompleted);
    
    const timeBonus = Math.floor(timeLeft / 20);
    const totalPoints = points + timeBonus;
    setScore(score + totalPoints);
    
    toast({
      title: "🎯 Objective Complete!",
      description: `+${points} points + ${timeBonus} time bonus!`,
    });

    // Check if room is complete (3 objectives)
    if (newCompleted[roomId] === 3) {
      const roomIndex = rooms.findIndex(r => r.id === roomId);
      const nextRoom = rooms[roomIndex + 1];
      
      if (nextRoom && !unlockedRooms.includes(nextRoom.id)) {
        setUnlockedRooms([...unlockedRooms, nextRoom.id]);
        toast({
          title: "🔓 Room Unlocked!",
          description: `${nextRoom.name} is now accessible!`,
        });
      }
      
      // Check if all rooms complete
      if (Object.values(newCompleted).every(count => count >= 3)) {
        setGameState('completed');
        toast({
          title: "🏆 Laboratory Escaped!",
          description: "All objectives completed! You're free!",
        });
      }
    }
  };

  const getTotalProgress = () => {
    const totalObjectives = Object.values(completedObjectives).reduce((sum, count) => sum + count, 0);
    return (totalObjectives / 12) * 100;
  };

  const renderCurrentRoom = () => {
    switch (currentRoom) {
      case 'cell':
        return <CellBiologyRoom onObjectiveComplete={(points) => completeObjective('cell', points)} completedObjectives={completedObjectives.cell} />;
      case 'circuit':
        return <CircuitEngineeringRoom onObjectiveComplete={(points) => completeObjective('circuit', points)} completedObjectives={completedObjectives.circuit} />;
      case 'chemistry':
        return <ChemicalBalancingRoom onObjectiveComplete={(points) => completeObjective('chemistry', points)} completedObjectives={completedObjectives.chemistry} />;
      case 'dna':
        return <DNASequencingRoom onObjectiveComplete={(points) => completeObjective('dna', points)} completedObjectives={completedObjectives.dna} />;
      default:
        return null;
    }
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl p-8 bg-white/10 backdrop-blur-lg border border-white/20">
          <div className="text-center space-y-6">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Beaker className="w-16 h-16 text-cyan-400" />
              <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Science Escape Lab
              </h1>
            </div>
            
            <p className="text-xl text-white/80 leading-relaxed">
              🚨 LABORATORY LOCKDOWN PROTOCOL ACTIVATED 🚨<br/>
              Complete all 12 scientific objectives across 4 specialized labs to escape!
            </p>
            
            <div className="grid grid-cols-2 gap-4 my-8">
              {rooms.map((room, index) => (
                <div key={room.id} className="bg-white/10 rounded-lg p-4 border border-white/20">
                  <div className="text-4xl mb-2">{room.icon}</div>
                  <h3 className="font-semibold text-white">{room.name}</h3>
                  <p className="text-xs text-white/60">3 Objectives • Sequential Unlock</p>
                </div>
              ))}
            </div>
            
            <div className="bg-red-500/20 rounded-lg p-4 border border-red-500/30">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="w-6 h-6 text-red-400" />
                <span className="text-red-400 font-bold text-lg">10 MINUTE COUNTDOWN</span>
              </div>
              <p className="text-sm text-white/70">
                Navigate through Cell Biology → Circuit Engineering → Chemical Balancing → DNA Sequencing
              </p>
            </div>
            
            <Button 
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🚀 INITIATE ESCAPE SEQUENCE
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (gameState === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-8 bg-white/10 backdrop-blur-lg border border-white/20 text-center">
          <div className="space-y-6">
            <div className="flex justify-center items-center space-x-2">
              <Star className="w-20 h-20 text-yellow-400 animate-pulse" />
              <h1 className="text-7xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                ESCAPED!
              </h1>
              <Star className="w-20 h-20 text-yellow-400 animate-pulse" />
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
            
            <Button 
              onClick={() => {
                setGameState('menu');
                setCurrentRoom('cell');
                setUnlockedRooms(['cell']);
                setCompletedObjectives({ cell: 0, circuit: 0, chemistry: 0, dna: 0 });
                setScore(0);
              }}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
            >
              🔄 New Escape Attempt
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (gameState === 'timeUp') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-8 bg-white/10 backdrop-blur-lg border border-white/20 text-center">
          <div className="space-y-6">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              TIME'S UP!
            </h1>
            <p className="text-2xl text-white/90">
              ⏰ The laboratory remains locked!
            </p>
            <div className="bg-white/10 rounded-lg p-6">
              <div className="text-3xl font-bold text-orange-400">{score} Points</div>
              <div className="text-sm text-white/70">
                Progress: {Object.values(completedObjectives).reduce((sum, count) => sum + count, 0)}/12 objectives
              </div>
            </div>
            <Button 
              onClick={() => {
                setGameState('menu');
                setCurrentRoom('cell');
                setUnlockedRooms(['cell']);
                setCompletedObjectives({ cell: 0, circuit: 0, chemistry: 0, dna: 0 });
                setScore(0);
              }}
              size="lg"
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
            >
              🔄 Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
              <Beaker className="w-8 h-8 text-cyan-400" />
              <span>Science Escape Lab</span>
            </h1>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              Score: {score}
            </Badge>
          </div>
          
          <GameTimer 
            timeLeft={timeLeft} 
            onTimeUp={() => setGameState('timeUp')}
            setTimeLeft={setTimeLeft}
          />
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-semibold">Escape Progress</span>
            <span className="text-white/70">
              {Object.values(completedObjectives).reduce((sum, count) => sum + count, 0)}/12 objectives completed
            </span>
          </div>
          <Progress value={getTotalProgress()} className="h-3" />
        </div>

        {/* Room Navigation */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {rooms.map((room) => {
            const isUnlocked = unlockedRooms.includes(room.id);
            const isActive = currentRoom === room.id;
            const completed = completedObjectives[room.id];
            
            return (
              <Card 
                key={room.id}
                className={`p-4 cursor-pointer transition-all duration-300 border-2 ${
                  isActive 
                    ? 'bg-blue-500/30 border-blue-500/70 scale-105' 
                    : isUnlocked 
                    ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                    : 'bg-gray-500/10 border-gray-500/30 opacity-50'
                }`}
                onClick={() => isUnlocked && setCurrentRoom(room.id)}
              >
                <div className="text-center space-y-2">
                  <div className="text-3xl">{room.icon}</div>
                  <h3 className="text-white font-bold text-sm">{room.name}</h3>
                  <div className="flex items-center justify-center space-x-1">
                    {isUnlocked ? <Unlock className="w-4 h-4 text-green-400" /> : <Lock className="w-4 h-4 text-gray-500" />}
                    <span className="text-xs text-white/70">{completed}/3</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Current Room */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {rooms.find(r => r.id === currentRoom)?.name} Laboratory
            </h2>
            <Button 
              onClick={() => setShowHint(!showHint)}
              variant="outline"
              className="bg-yellow-500/20 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/30"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              {showHint ? 'Hide Hint' : 'Dr. Nova Help'}
            </Button>
          </div>
          
          {renderCurrentRoom()}
        </div>

        <AIAssistant 
          currentRoom={currentRoom} 
          showHint={showHint}
          completedObjectives={Object.values(completedObjectives).reduce((sum, count) => sum + count, 0)}
        />
      </div>
    </div>
  );
};

export default Index;
