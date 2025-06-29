
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CircuitEngineeringRoomProps {
  onObjectiveComplete: (points: number) => void;
  completedObjectives: number;
}

const CircuitEngineeringRoom: React.FC<CircuitEngineeringRoomProps> = ({ onObjectiveComplete, completedObjectives }) => {
  const [currentCircuit, setCurrentCircuit] = useState(0);
  const [connections, setConnections] = useState<string[]>([]);

  const components = {
    basic: [
      { id: 'battery', name: 'Battery 9V', emoji: '🔋', position: { top: '20%', left: '10%' } },
      { id: 'switch', name: 'Switch', emoji: '🎚️', position: { top: '20%', left: '40%' } },
      { id: 'resistor', name: 'Resistor', emoji: '⚡', position: { top: '20%', left: '70%' } },
      { id: 'led', name: 'LED', emoji: '🔴', position: { top: '60%', left: '40%' } }
    ],
    parallel: [
      { id: 'battery', name: 'Battery', emoji: '🔋', position: { top: '20%', left: '10%' } },
      { id: 'switch', name: 'Switch', emoji: '🎚️', position: { top: '20%', left: '30%' } },
      { id: 'led1', name: 'LED 1', emoji: '🔴', position: { top: '40%', left: '60%' } },
      { id: 'led2', name: 'LED 2', emoji: '🔵', position: { top: '60%', left: '60%' } },
      { id: 'led3', name: 'LED 3', emoji: '🟢', position: { top: '80%', left: '60%' } }
    ],
    complex: [
      { id: 'battery', name: 'Battery', emoji: '🔋', position: { top: '15%', left: '10%' } },
      { id: 'variable', name: 'Variable Resistor', emoji: '🎛️', position: { top: '30%', left: '40%' } },
      { id: 'transistor', name: 'Transistor', emoji: '🔺', position: { top: '50%', left: '70%' } },
      { id: 'led', name: 'LED', emoji: '🟢', position: { top: '70%', left: '40%' } }
    ]
  };

  const circuits = [
    {
      name: 'Basic LED Circuit',
      components: components.basic,
      correctPath: ['battery', 'switch', 'resistor', 'led'],
      description: 'Build a simple LED circuit with switch control'
    },
    {
      name: 'Parallel LED Circuit',
      components: components.parallel,
      correctPath: ['battery', 'switch', 'led1', 'led2', 'led3'],
      description: 'Create a parallel circuit with multiple LEDs'
    },
    {
      name: 'Variable Brightness Circuit',
      components: components.complex,
      correctPath: ['battery', 'variable', 'transistor', 'led'],
      description: 'Build a circuit with adjustable LED brightness'
    }
  ];

  const handleComponentClick = (componentId: string) => {
    if (completedObjectives > currentCircuit) return;

    const newConnections = [...connections];
    
    if (newConnections.includes(componentId)) {
      const index = newConnections.indexOf(componentId);
      newConnections.splice(index, 1);
    } else {
      newConnections.push(componentId);
    }
    
    setConnections(newConnections);

    const currentCircuitData = circuits[currentCircuit];
    
    if (newConnections.length === currentCircuitData.correctPath.length) {
      const isCorrect = newConnections.every((conn, index) => 
        conn === currentCircuitData.correctPath[index]
      );
      
      if (isCorrect) {
        toast({
          title: "⚡ Circuit Complete!",
          description: `${currentCircuitData.name} working perfectly!`,
        });
        
        onObjectiveComplete(50);
        
        setTimeout(() => {
          if (currentCircuit < 2) {
            setCurrentCircuit(currentCircuit + 1);
            setConnections([]);
          }
        }, 2000);
      } else {
        toast({
          title: "🔧 Circuit Error",
          description: "Check your connections!",
          variant: "destructive"
        });
        setConnections([]);
      }
    }
  };

  const currentCircuitData = circuits[Math.min(currentCircuit, 2)];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">⚡ Circuit Engineering Laboratory</h3>
        <div className="flex justify-center space-x-4">
          <Badge variant={completedObjectives >= 1 ? 'default' : 'outline'}>
            Objective 1: Basic LED Circuit {completedObjectives >= 1 ? '✓' : ''}
          </Badge>
          <Badge variant={completedObjectives >= 2 ? 'default' : 'outline'}>
            Objective 2: Parallel Circuit {completedObjectives >= 2 ? '✓' : ''}
          </Badge>
          <Badge variant={completedObjectives >= 3 ? 'default' : 'outline'}>
            Objective 3: Variable Brightness {completedObjectives >= 3 ? '✓' : ''}
          </Badge>
        </div>
      </div>

      <Card className="p-6 bg-white/10 border-white/20">
        <h4 className="text-xl font-bold text-white mb-4 text-center">
          {currentCircuitData.name}
        </h4>
        <p className="text-white/80 text-center mb-6">{currentCircuitData.description}</p>
        
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
          {currentCircuitData.components.map((component, index) => {
            const connectionNum = connections.indexOf(component.id) + 1;
            const connected = connections.includes(component.id);
            
            return (
              <div
                key={component.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
                style={component.position}
                onClick={() => handleComponentClick(component.id)}
              >
                <div className={`relative p-3 rounded-lg border-2 ${
                  connected 
                    ? 'bg-yellow-500/30 border-yellow-400 shadow-lg' 
                    : 'bg-gray-700/50 border-gray-500 hover:border-white'
                }`}>
                  <div className="text-center">
                    <div className="text-2xl mb-1">{component.emoji}</div>
                    <div className="text-xs text-white font-bold">{component.name}</div>
                  </div>
                  
                  {connectionNum > 0 && (
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
                const fromComponent = currentCircuitData.components.find(c => c.id === fromId);
                const toComponent = currentCircuitData.components.find(c => c.id === connections[index + 1]);
                
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
                    stroke="#fbbf24"
                    strokeWidth="3"
                    className="animate-pulse"
                  />
                );
              })}
            </svg>
          )}
        </div>

        <div className="mt-4 text-center">
          <Button
            onClick={() => setConnections([])}
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

export default CircuitEngineeringRoom;
