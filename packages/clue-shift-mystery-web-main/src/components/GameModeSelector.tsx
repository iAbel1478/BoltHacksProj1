
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GameMode } from '../types/GameTypes';

interface GameModeSelectorProps {
  onModeSelect: (mode: GameMode) => void;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ onModeSelect }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <Card className="bg-white border-4 border-indigo-300 shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-8">
          🕵️ Choose Your Detective Challenge
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Easy Mode */}
          <div className="bg-blue-50 border-3 border-blue-300 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">😊</div>
              <h3 className="text-2xl font-bold text-blue-700">Easy Mode</h3>
              <p className="text-blue-600 text-sm">Perfect for young detectives!</p>
            </div>
            
            <ul className="text-sm text-gray-700 space-y-2 mb-6">
              <li>• Bright, colorful graphics</li>
              <li>• Simple storylines</li>
              <li>• 3-4 obvious clues</li>
              <li>• Helpful hints available</li>
              <li>• Ages 5-8</li>
            </ul>
            
            <Button 
              onClick={() => onModeSelect('easy')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold"
            >
              Start Easy Case 🧸
            </Button>
          </div>

          {/* Medium Mode */}
          <div className="bg-gray-100 border-3 border-gray-400 rounded-xl p-6 hover:shadow-lg transition-all duration-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 to-black/20"></div>
            <div className="relative z-10">
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">🎩</div>
                <h3 className="text-2xl font-bold text-gray-800">Medium Mode</h3>
                <p className="text-gray-600 text-sm">For experienced detectives!</p>
              </div>
              
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                <li>• Noir comic book style</li>
                <li>• Complex mysteries</li>
                <li>• 5-6 clues with red herrings</li>
                <li>• Mini-games & puzzles</li>
                <li>• Dialogue with suspects</li>
                <li>• Ages 9-12</li>
              </ul>
              
              <Button 
                onClick={() => onModeSelect('medium')}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold"
              >
                Start Mystery Case 🔍
              </Button>
            </div>
          </div>

          {/* Hard Mode */}
          <div className="bg-gradient-to-br from-purple-100 to-slate-100 border-3 border-purple-400 rounded-xl p-6 hover:shadow-lg transition-all duration-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-slate-900/20"></div>
            <div className="relative z-10">
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">🎯</div>
                <h3 className="text-2xl font-bold text-purple-800">Hard Mode</h3>
                <p className="text-purple-600 text-sm">Master detective level!</p>
              </div>
              
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                <li>• Sophisticated environments</li>
                <li>• Complex multi-step cases</li>
                <li>• 6-8 clues with red herrings</li>
                <li>• Advanced decoding puzzles</li>
                <li>• Twist endings & surprises</li>
                <li>• Ages 12+</li>
              </ul>
              
              <Button 
                onClick={() => onModeSelect('hard')}
                className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold"
              >
                Master Detective Case 🏆
              </Button>
            </div>
          </div>
        </div>

        {/* Educational Benefits */}
        <div className="mt-8 bg-green-50 border-2 border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-green-800 mb-3 text-center">
            🎓 Educational Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">🧠</div>
              <div className="font-medium text-green-700">Critical Thinking</div>
              <div className="text-green-600">Logical deduction and problem-solving</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📚</div>
              <div className="font-medium text-green-700">Vocabulary Building</div>
              <div className="text-green-600">Context clues and new word discovery</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">👥</div>
              <div className="font-medium text-green-700">Collaboration</div>
              <div className="text-green-600">Teamwork and communication skills</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GameModeSelector;
