
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Lightbulb } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CircuitPuzzleProps {
  onComplete: (points: number) => void;
}

const CircuitPuzzle: React.FC<CircuitPuzzleProps> = ({ onComplete }) => {
  const [connections, setConnections] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const components = [
    { id: 'battery-pos', type: 'battery', label: 'Battery (+)', position: { top: '20%', left: '10%' } },
    { id: 'battery-neg', type: 'battery', label: 'Battery (-)', position: { top: '20%', left: '30%' } },
    { id: 'switch', type: 'switch', label: 'Switch', position: { top: '20%', left: '50%' } },
    { id: 'resistor', type: 'resistor', label: 'Resistor', position: { top: '20%', left: '70%' } },
    { id: 'bulb', type: 'bulb', label: 'Light Bulb', position: { top: '60%', left: '40%' } }
  ];

  const correctPath = ['battery-pos', 'switch', 'resistor', 'bulb', 'battery-neg'];

  const handleComponentClick = (componentId: string) => {
    if (isComplete) return;

    const newConnections = [...connections];
    
    if (newConnections.includes(componentId)) {
      // Remove connection if already connected
      const index = newConnections.indexOf(componentId);
      newConnections.splice(index, 1);
    } else {
      // Add connection
      newConnections.push(componentId);
    }
    
    setConnections(newConnections);
    setAttempts(attempts + 1);

    // Check if circuit is complete
    if (newConnections.length === correctPath.length) {
      const isCorrect = newConnections.every((conn, index) => conn === correctPath[index]);
      
      if (isCorrect) {
        setIsComplete(true);
        toast({
          title: "⚡ Circuit Complete!",
          description: "The light bulb is now glowing! Well done!",
        });
        
        const points = Math.max(120 - (attempts * 3), 60);
        setTimeout(() => onComplete(points), 1000);
      } else {
        toast({
          title: "🔧 Circuit Incomplete",
          description: "The current path isn't quite right. Try again!",
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
        <h2 className="text-3xl font-bold text-white mb-2">⚡ Electric Circuit Challenge</h2>
        <p className="text-white/80">Click the components in the correct order to complete the circuit!</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Badge variant="secondary">Attempts: {attempts}</Badge>
          <Badge variant={isComplete ? "default" : "outline"}>
            {isComplete ? "✓ Complete" : "Building..."}
          </Badge>
        </div>
      </div>

      <Card className="p-8 bg-white/10 border-white/20">
        <h3 className="text-xl font-bold text-white mb-6 text-center">Circuit Board</h3>
        
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg h-96 border-4 border-gray-600">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-10 grid-rows-8 h-full">
              {Array.from({ length: 80 }).map((_, i) => (
                <div key={i} className="border border-gray-700"></div>
              ))}
            </div>
          </div>

          {/* Components */}
          {components.map((component, index) => {
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
                <div className={`relative p-4 rounded-lg border-2 ${
                  connected 
                    ? 'bg-yellow-500/30 border-yellow-400 shadow-lg shadow-yellow-400/50' 
                    : 'bg-gray-700/50 border-gray-500 hover:border-white hover:bg-gray-600/50'
                }`}>
                  
                  {/* Component icon */}
                  <div className="text-center">
                    {component.type === 'battery' && (
                      <div className={`w-8 h-12 mx-auto ${component.id.includes('pos') ? 'bg-red-500' : 'bg-black'} rounded`}></div>
                    )}
                    {component.type === 'switch' && (
                      <div className="w-12 h-6 bg-gray-400 rounded mx-auto"></div>
                    )}
                    {component.type === 'resistor' && (
                      <div className="w-12 h-4 bg-brown-500 rounded mx-auto"></div>
                    )}
                    {component.type === 'bulb' && (
                      <Lightbulb className={`w-8 h-8 mx-auto ${isComplete ? 'text-yellow-400' : 'text-gray-400'}`} />
                    )}
                  </div>
                  
                  <div className="text-xs text-white mt-2 text-center font-bold">
                    {component.label}
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
                const fromComponent = components.find(c => c.id === fromId);
                const toComponent = components.find(c => c.id === connections[index + 1]);
                
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
                    stroke={isComplete ? "#fbbf24" : "#60a5fa"}
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
            💡 Remember: Electricity flows from positive (+) to negative (-) terminal
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

export default CircuitPuzzle;
