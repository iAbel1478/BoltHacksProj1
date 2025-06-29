
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface ChemistryPuzzleProps {
  onComplete: (points: number) => void;
}

const ChemistryPuzzle: React.FC<ChemistryPuzzleProps> = ({ onComplete }) => {
  const [coefficients, setCoefficients] = useState<{[key: string]: string}>({
    h2: '',
    o2: '',
    h2o: ''
  });
  const [attempts, setAttempts] = useState(0);
  const [showHints, setShowHints] = useState(false);

  const correctAnswer = { h2: '2', o2: '1', h2o: '2' };

  const handleCoefficientChange = (molecule: string, value: string) => {
    if (value === '' || /^[1-9]$/.test(value)) {
      setCoefficients({
        ...coefficients,
        [molecule]: value
      });
    }
  };

  const checkBalance = () => {
    setAttempts(attempts + 1);
    
    const h2Val = coefficients.h2 || '1';
    const o2Val = coefficients.o2 || '1';
    const h2oVal = coefficients.h2o || '1';

    // Check if coefficients match correct answer
    const isCorrect = h2Val === correctAnswer.h2 && 
                     o2Val === correctAnswer.o2 && 
                     h2oVal === correctAnswer.h2o;

    if (isCorrect) {
      toast({
        title: "🧪 Perfect Balance!",
        description: "You've successfully balanced the chemical equation!",
      });
      
      const points = Math.max(100 - (attempts * 8), 40);
      setTimeout(() => onComplete(points), 500);
    } else {
      toast({
        title: "⚖️ Not Quite Balanced",
        description: "Check your coefficients. Remember: atoms in = atoms out!",
        variant: "destructive"
      });
    }
  };

  const getAtomCount = (molecule: string, atom: string) => {
    const coeff = parseInt(coefficients[molecule] || '1');
    
    if (molecule === 'h2' && atom === 'H') return coeff * 2;
    if (molecule === 'o2' && atom === 'O') return coeff * 2;
    if (molecule === 'h2o' && atom === 'H') return coeff * 2;
    if (molecule === 'h2o' && atom === 'O') return coeff * 1;
    
    return 0;
  };

  const getTotalAtoms = (atom: string, side: 'reactants' | 'products') => {
    if (side === 'reactants') {
      if (atom === 'H') return getAtomCount('h2', 'H');
      if (atom === 'O') return getAtomCount('o2', 'O');
    } else {
      if (atom === 'H') return getAtomCount('h2o', 'H');
      if (atom === 'O') return getAtomCount('h2o', 'O');
    }
    return 0;
  };

  const isAtomBalanced = (atom: string) => {
    return getTotalAtoms(atom, 'reactants') === getTotalAtoms(atom, 'products');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">🧪 Chemical Equation Balance</h2>
        <p className="text-white/80">Balance the equation by adding the correct coefficients!</p>
        <Badge variant="secondary" className="mt-2">
          Attempts: {attempts}
        </Badge>
      </div>

      <Card className="p-8 bg-white/10 border-white/20">
        <h3 className="text-xl font-bold text-white mb-6 text-center">Water Formation Reaction</h3>
        
        {/* Chemical Equation */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-8 mb-6">
          <div className="flex items-center justify-center space-x-4 text-2xl font-mono">
            
            {/* Reactants */}
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={coefficients.h2}
                onChange={(e) => handleCoefficientChange('h2', e.target.value)}
                className="w-12 h-12 text-center text-xl font-bold bg-white/20 border-white/30 text-white"
                placeholder="?"
              />
              <span className="text-white font-bold">H₂</span>
            </div>

            <span className="text-white font-bold text-3xl">+</span>

            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={coefficients.o2}
                onChange={(e) => handleCoefficientChange('o2', e.target.value)}
                className="w-12 h-12 text-center text-xl font-bold bg-white/20 border-white/30 text-white"
                placeholder="?"
              />
              <span className="text-white font-bold">O₂</span>
            </div>

            <span className="text-white font-bold text-3xl">→</span>

            {/* Products */}
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={coefficients.h2o}
                onChange={(e) => handleCoefficientChange('h2o', e.target.value)}
                className="w-12 h-12 text-center text-xl font-bold bg-white/20 border-white/30 text-white"
                placeholder="?"
              />
              <span className="text-white font-bold">H₂O</span>
            </div>
          </div>
        </div>

        {/* Atom Counter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="p-4 bg-blue-500/20 border-blue-500/30">
            <h4 className="font-bold text-white mb-3 text-center">Reactants (Left Side)</h4>
            <div className="space-y-2">
              <div className={`flex justify-between items-center p-2 rounded ${
                isAtomBalanced('H') ? 'bg-green-500/30' : 'bg-red-500/20'
              }`}>
                <span className="text-white">Hydrogen (H):</span>
                <Badge variant={isAtomBalanced('H') ? "default" : "destructive"}>
                  {getTotalAtoms('H', 'reactants')}
                </Badge>
              </div>
              <div className={`flex justify-between items-center p-2 rounded ${
                isAtomBalanced('O') ? 'bg-green-500/30' : 'bg-red-500/20'
              }`}>
                <span className="text-white">Oxygen (O):</span>
                <Badge variant={isAtomBalanced('O') ? "default" : "destructive"}>
                  {getTotalAtoms('O', 'reactants')}
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-purple-500/20 border-purple-500/30">
            <h4 className="font-bold text-white mb-3 text-center">Products (Right Side)</h4>
            <div className="space-y-2">
              <div className={`flex justify-between items-center p-2 rounded ${
                isAtomBalanced('H') ? 'bg-green-500/30' : 'bg-red-500/20'
              }`}>
                <span className="text-white">Hydrogen (H):</span>
                <Badge variant={isAtomBalanced('H') ? "default" : "destructive"}>
                  {getTotalAtoms('H', 'products')}
                </Badge>
              </div>
              <div className={`flex justify-between items-center p-2 rounded ${
                isAtomBalanced('O') ? 'bg-green-500/30' : 'bg-red-500/20'
              }`}>
                <span className="text-white">Oxygen (O):</span>
                <Badge variant={isAtomBalanced('O') ? "default" : "destructive"}>
                  {getTotalAtoms('O', 'products')}
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Hint Section */}
        {showHints && (
          <Card className="p-4 bg-yellow-500/20 border-yellow-500/30 mb-4">
            <h4 className="font-bold text-yellow-400 mb-2">💡 Balancing Tips:</h4>
            <ul className="text-yellow-200 text-sm space-y-1">
              <li>• Count atoms on both sides of the equation</li>
              <li>• H₂ means 2 hydrogen atoms, O₂ means 2 oxygen atoms</li>
              <li>• H₂O means 2 hydrogen atoms and 1 oxygen atom</li>
              <li>• The coefficient multiplies the entire molecule</li>
              <li>• Start with the most complex molecule (H₂O)</li>
            </ul>
          </Card>
        )}

        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => setShowHints(!showHints)}
            variant="outline"
            className="bg-yellow-500/20 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/30"
          >
            {showHints ? 'Hide Hints' : '💡 Show Hints'}
          </Button>
          
          <Button
            onClick={checkBalance}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          >
            ⚖️ Check Balance
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ChemistryPuzzle;
