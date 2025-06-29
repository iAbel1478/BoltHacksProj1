
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface ChemicalBalancingRoomProps {
  onObjectiveComplete: (points: number) => void;
  completedObjectives: number;
}

const ChemicalBalancingRoom: React.FC<ChemicalBalancingRoomProps> = ({ onObjectiveComplete, completedObjectives }) => {
  const [currentEquation, setCurrentEquation] = useState(0);
  const [coefficients, setCoefficients] = useState<{[key: string]: number}>({});

  const equations = [
    {
      name: 'Methane Combustion',
      type: 'combustion',
      reactants: [
        { formula: 'CH₄', name: 'Methane', key: 'CH4' },
        { formula: 'O₂', name: 'Oxygen', key: 'O2' }
      ],
      products: [
        { formula: 'CO₂', name: 'Carbon Dioxide', key: 'CO2' },
        { formula: 'H₂O', name: 'Water', key: 'H2O' }
      ],
      correct: { CH4: 1, O2: 2, CO2: 1, H2O: 2 }
    },
    {
      name: 'Acid-Base Neutralization',
      type: 'acid-base',
      reactants: [
        { formula: 'HCl', name: 'Hydrochloric Acid', key: 'HCl' },
        { formula: 'NaOH', name: 'Sodium Hydroxide', key: 'NaOH' }
      ],
      products: [
        { formula: 'NaCl', name: 'Sodium Chloride', key: 'NaCl' },
        { formula: 'H₂O', name: 'Water', key: 'H2O' }
      ],
      correct: { HCl: 1, NaOH: 1, NaCl: 1, H2O: 1 }
    },
    {
      name: 'Iron Oxide Formation',
      type: 'synthesis',
      reactants: [
        { formula: 'Fe', name: 'Iron', key: 'Fe' },
        { formula: 'O₂', name: 'Oxygen', key: 'O2' }
      ],
      products: [
        { formula: 'Fe₂O₃', name: 'Iron Oxide', key: 'Fe2O3' }
      ],
      correct: { Fe: 4, O2: 3, Fe2O3: 2 }
    }
  ];

  const handleCoefficientChange = (key: string, value: number) => {
    if (completedObjectives > currentEquation) return;

    const newCoefficients = { ...coefficients };
    newCoefficients[key] = Math.max(1, value);
    setCoefficients(newCoefficients);
  };

  const checkBalance = () => {
    const currentEq = equations[currentEquation];
    const isCorrect = Object.keys(currentEq.correct).every(key => 
      coefficients[key] === currentEq.correct[key]
    );

    if (isCorrect) {
      toast({
        title: "⚖️ Equation Balanced!",
        description: `${currentEq.name} correctly balanced!`,
      });
      
      onObjectiveComplete(50);
      
      setTimeout(() => {
        if (currentEquation < 2) {
          setCurrentEquation(currentEquation + 1);
          setCoefficients({});
        }
      }, 2000);
    } else {
      toast({
        title: "🧪 Not Balanced",
        description: "Check your coefficients - atoms must be equal on both sides!",
        variant: "destructive"
      });
    }
  };

  const currentEq = equations[Math.min(currentEquation, 2)];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">🧪 Chemical Balancing Laboratory</h3>
        <div className="flex justify-center space-x-4">
          <Badge variant={completedObjectives >= 1 ? 'default' : 'outline'}>
            Objective 1: Combustion {completedObjectives >= 1 ? '✓' : ''}
          </Badge>
          <Badge variant={completedObjectives >= 2 ? 'default' : 'outline'}>
            Objective 2: Acid-Base {completedObjectives >= 2 ? '✓' : ''}
          </Badge>
          <Badge variant={completedObjectives >= 3 ? 'default' : 'outline'}>
            Objective 3: Synthesis {completedObjectives >= 3 ? '✓' : ''}
          </Badge>
        </div>
      </div>

      <Card className="p-6 bg-white/10 border-white/20">
        <h4 className="text-xl font-bold text-white mb-4 text-center">
          {currentEq.name}
        </h4>
        
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 rounded-lg border border-white/20">
          <div className="flex items-center justify-center space-x-4 text-2xl text-white">
            {/* Reactants */}
            {currentEq.reactants.map((reactant, index) => (
              <React.Fragment key={reactant.key}>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    max="9"
                    value={coefficients[reactant.key] || 1}
                    onChange={(e) => handleCoefficientChange(reactant.key, parseInt(e.target.value) || 1)}
                    className="w-12 h-12 text-center bg-white/20 border border-white/30 rounded text-white font-bold"
                    disabled={completedObjectives > currentEquation}
                  />
                  <span className="font-mono">{reactant.formula}</span>
                </div>
                {index < currentEq.reactants.length - 1 && <span className="text-yellow-400">+</span>}
              </React.Fragment>
            ))}
            
            <span className="text-4xl text-green-400 mx-4">→</span>
            
            {/* Products */}
            {currentEq.products.map((product, index) => (
              <React.Fragment key={product.key}>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    max="9"
                    value={coefficients[product.key] || 1}
                    onChange={(e) => handleCoefficientChange(product.key, parseInt(e.target.value) || 1)}
                    className="w-12 h-12 text-center bg-white/20 border border-white/30 rounded text-white font-bold"
                    disabled={completedObjectives > currentEquation}
                  />
                  <span className="font-mono">{product.formula}</span>
                </div>
                {index < currentEq.products.length - 1 && <span className="text-yellow-400">+</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white/10 p-4 rounded-lg">
            <h5 className="text-white font-bold mb-2">Reactants</h5>
            {currentEq.reactants.map((reactant) => (
              <div key={reactant.key} className="text-white/80 text-sm">
                {reactant.formula} - {reactant.name}
              </div>
            ))}
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <h5 className="text-white font-bold mb-2">Products</h5>
            {currentEq.products.map((product) => (
              <div key={product.key} className="text-white/80 text-sm">
                {product.formula} - {product.name}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center space-y-2">
          <Button
            onClick={checkBalance}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            disabled={completedObjectives > currentEquation}
          >
            ⚖️ Check Balance
          </Button>
          <p className="text-white/70 text-sm">
            💡 Remember: The number of each type of atom must be equal on both sides!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ChemicalBalancingRoom;
