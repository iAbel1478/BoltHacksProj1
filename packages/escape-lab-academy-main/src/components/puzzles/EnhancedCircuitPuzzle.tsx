
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Lightbulb, Volume2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EnhancedCircuitPuzzleProps {
  onComplete: (points: number) => void;
}

const EnhancedCircuitPuzzle: React.FC<EnhancedCircuitPuzzleProps> = ({ onComplete }) => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [connections, setConnections] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<boolean[]>([false, false, false]);

  const components = {
    basic: [
      { id: 'battery-9v', type: 'battery', label: 'Battery 9V', emoji: '🔋', position: { top: '20%', left: '10%' } },
      { id: 'led-red', type: 'led', label: 'Red LED', emoji: '🔴', position: { top: '60%', left: '40%' } },
      { id: 'switch-toggle', type: 'switch', label: 'Toggle Switch', emoji: '🎚️', position: { top: '20%', left: '70%' } },
      { id: 'resistor-220', type: 'resistor', label: '220Ω Resistor', emoji: '⚡', position: { top: '60%', left: '70%' } }
    ],
    parallel: [
      { id: 'battery-9v', type: 'battery', label: 'Battery 9V', emoji: '🔋', position: { top: '20%', left: '10%' } },
      { id: 'led-red', type: 'led', label: 'Red LED', emoji: '🔴', position: { top: '40%', left: '50%' } },
      { id: 'led-blue', type: 'led', label: 'Blue LED', emoji: '🔵', position: { top: '60%', left: '50%' } },
      { id: 'buzzer', type: 'buzzer', label: 'Buzzer', emoji: '🔊', position: { top: '80%', left: '50%' } },
      { id: 'switch-push', type: 'switch', label: 'Push Button', emoji: '🔘', position: { top: '20%', left: '70%' } }
    ],
    complex: [
      { id: 'battery-9v', type: 'battery', label: 'Battery 9V', emoji: '🔋', position: { top: '15%', left: '10%' } },
      { id: 'variable-resistor', type: 'resistor', label: 'Variable Resistor', emoji: '🎛️', position: { top: '30%', left: '30%' } },
      { id: 'led-green', type: 'led', label: 'Green LED', emoji: '🟢', position: { top: '50%', left: '60%' } },
      { id: 'capacitor', type: 'capacitor', label: 'Capacitor', emoji: '⚙️', position: { top: '70%', left: '40%' } },
      { id: 'transistor', type: 'transistor', label: 'Transistor', emoji: '🔺', position: { top: '40%', left: '80%' } }
    ]
  };

  const challenges = [
    {
      name: 'Basic LED Circuit',
      description: 'Build a simple circuit to light up an LED with switch control',
      components: components.basic,
      correctPath: ['battery-9v', 'switch-toggle', 'resistor-220', 'led-red'],
      hint: 'Connect: Battery → Switch → Resistor → LED → Back to Battery'
    },
    {
      name: 'Parallel Circuit',
      description: 'Create a parallel circuit powering multiple components',
      components: components.parallel,
      correctPath: ['battery-9v', 'switch-push', 'led-red', 'led-blue', 'buzzer'],
      hint: 'All components should receive power simultaneously when switch is pressed'
    },
    {
      name: 'Variable Brightness Circuit',
      description: 'Build a complex circuit with adjustable LED brightness',
      components: components.complex,
      correctPath: ['battery-9v', 'variable-resistor', 'transistor', 'led-green', 'capacitor'],
      hint: 'Use the variable resistor to control current flow through the transistor'
    }
  ];

  const currentChallengeData = challenges[currentChallenge];

  const handleComponentClick = (componentId: string) => {
    if (completedChallenges[currentChallenge]) return;

    const newConnections = [...connections];
    
    if (newConnections.includes(componentId)) {
      const index = newConnections.indexOf(componentId);
      newConnections.splice(index, 1);
    } else {
      newConnections.push(componentId);
    }
    
    setConnections(newConnections);
    setAttempts(attempts + 1);

    // Check if circuit is complete
    if (newConnections.length === currentChallengeData.correctPath.length) {
      const isCorrect = newConnections.every((conn, index) => 
        conn === currentChallengeData.correctPath[index]
      );
      
      if (isCorrect) {
        const newCompleted = [...completedChallenges];
        newCompleted[currentChallenge] = true;
        setCompletedChallenges(newCompleted);
        
        toast({
          title: "⚡ Circuit Complete!",
          description: `${currentChallengeData.name} working perfectly!`,
        });

        // Check if all challenges completed
        if (newCompleted.every(c => c)) {
          const points = Math.max(180 - (attempts * 2), 100);
          setTimeout(() => onComplete(points), 1000);
        } else {
          setTimeout(() => {
            setCurrentChallenge(currentChallenge + 1);
            setConnections([]);
          }, 2000);
        }
      } else {
        toast({
          title: "🔧 Circuit Error",
          description: "Check your connections. Something's not quite right!",
          variant: "destructive"
        });
        setConnections([]);
      }
    }
  };

  const getConnectionNumber = (componentId: string) => {
    const index = connections.indexOf(componentId);
    return index >= 0 ? index + 1 : null;
  };

  const isConnected = (componentId: string) => connections.includes(componentId);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">⚡ Advanced Electric Circuit Challenge</h2>
        <p className="text-white/80">Complete all three circuit engineering challenges!</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Badge variant="secondary">Attempts: {attempts}</Badge>
          <Badge variant="outline">Challenge: {currentChallenge + 1}/3</Badge>
        </div>
      </div>

      {/* Challenge Progress */}
      <div className="grid grid-cols-3 gap-2">
        {challenges.map((challenge, index) => (
          <Card key={index} className={`p-3 text-center ${
            completedChallenges[index] 
              ? 'bg-green-500/20 border-green-500/50' 
              : index === currentChallenge 
              ? 'bg-blue-500/20 border-blue-500/50' 
              : 'bg-gray-500/20 border-gray-500/50'
          }`}>
            <div className="text-white font-bold text-sm">{challenge.name}</div>
            <div className="text-xs text-white/70">{challenge.description}</div>
            {completedChallenges[index] && <div className="text-green-400 mt-1">✓ Complete</div>}
          </Card>
        ))}
      </div>

      <Card className="p-8 bg-white/10 border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 text-center">
          {currentChallengeData.name}
        </h3>
        <p className="text-white/80 text-center mb-6">{currentChallengeData.description}</p>
        
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg h-96 border-4 border-gray-600">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-12 grid-rows-10 h-full">
              {Array.from({ length: 120 }).map((_, i) => (
                <div key={i} className="border border-gray-700"></div>
              ))}
            </div>
          </div>

          {/* Components */}
          {currentChallengeData.components.map((component) => {
            const connectionNum = getConnectionNumber(component.id);
            const connected = isConnected(component.id);
            
            return (
              <div
                key={component.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                  connected ? 'scale-110' : 'hover:scale-105'
                }`}
                style={component.position}
                onClick={() => handleComponentClick(component.id)}
              >
                <div className={`relative p-3 rounded-lg border-2 ${
                  connected 
                    ? 'bg-yellow-500/30 border-yellow-400 shadow-lg shadow-yellow-400/50' 
                    : 'bg-gray-700/50 border-gray-500 hover:border-white hover:bg-gray-600/50'
                }`}>
                  
                  {/* Component icon */}
                  <div className="text-center">
                    <div className="text-2xl mb-1">{component.emoji}</div>
                    <div className="text-xs text-white font-bold">{component.label}</div>
                  </div>
                  
                  {/* Connection number */}
                  {connectionNum && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center text-sm font-bold">
                      {connectionNum}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Connection lines */}
          {connections.length > 1 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {connections.slice(0, -1).map((fromId, index) => {
                const fromComponent = currentChallengeData.components.find(c => c.id === fromId);
                const toComponent = currentChallengeData.components.find(c => c.id === connections[index + 1]);
                
                if (!fromComponent || !toComponent) return null;
                
                const fromX = parseFloat(fromComponent.position.left) / 100 * 100;
                const fromY = parseFloat(fromComponent.position.top) / 100 * 100;
                const toX = parseFloat(toComponent.position.left) / 100 * 100;
                const toY = parseFloat(toComponent.position.top) / 100 * 100;
                
                return (
                  <line
                    key={`${fromId}-${connections[index + 1]}`}
                    x1={`${fromX}%`}
                    y1={`${fromY}%`}
                    x2={`${toX}%`}
                    y2={`${toY}%`}
                    stroke={completedChallenges[currentChallenge] ? "#22c55e" : "#fbbf24"}
                    strokeWidth="3"
                    className="animate-pulse"
                  />
                );
              })}
            </svg>
          )}
        </div>

        <div className="mt-6 text-center space-y-2">
          <p className="text-white/80 text-sm">
            💡 Hint: {currentChallengeData.hint}
          </p>
          <Button
            onClick={() => {
              setConnections([]);
              setAttempts(attempts + 1);
            }}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            🔄 Reset Circuit
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EnhancedCircuitPuzzle;
