import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Globe, Target, Timer, Trophy } from 'lucide-react';
import { Difficulty } from './types';

interface StartScreenProps {
  onStart: (difficulty: Difficulty) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const difficultyLevels = [
    { level: 1 as Difficulty, name: 'Explorer', description: 'Large countries (USA, Brazil, Russia)', countries: '10 questions' },
    { level: 2 as Difficulty, name: 'Navigator', description: 'Major countries (France, Japan, UK)', countries: '10 questions' },
    { level: 3 as Difficulty, name: 'Cartographer', description: 'Medium countries (Netherlands, Nepal)', countries: '10 questions' },
    { level: 4 as Difficulty, name: 'Geographer', description: 'Smaller countries (Belgium, Jamaica)', countries: '10 questions' },
    { level: 5 as Difficulty, name: 'Explorer Pro', description: 'Tiny countries (Estonia, Bhutan)', countries: '10 questions' },
    { level: 6 as Difficulty, name: 'Globe Master', description: 'Micro nations (Vatican, Monaco)', countries: '10 questions' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <Card className="w-full max-w-5xl mx-auto animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Globe className="w-12 h-12 text-blue-600 animate-pulse" />
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Globe Geography Game
            </CardTitle>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Test your world geography knowledge! Click on countries as accurately as possible. 
            Get instant feedback with real distances and learn fascinating facts about each country!
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <Target className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-semibold">Real Distance Feedback</h3>
                <p className="text-sm text-gray-600">See exactly how close you were in kilometers</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <Timer className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold">Educational Facts</h3>
                <p className="text-sm text-gray-600">Learn amazing trivia about each country</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
              <Trophy className="w-8 h-8 text-orange-600" />
              <div>
                <h3 className="font-semibold">Progressive Difficulty</h3>
                <p className="text-sm text-gray-600">From large countries to tiny nations</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-center mb-6">Choose Your Challenge</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {difficultyLevels.map((level) => (
                <Button
                  key={level.level}
                  onClick={() => onStart(level.level)}
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:scale-105 transition-transform duration-200"
                  variant={level.level <= 2 ? "default" : level.level <= 4 ? "secondary" : "outline"}
                >
                  <span className="font-bold text-lg">{level.name}</span>
                  <span className="text-sm opacity-80">{level.description}</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">{level.countries}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StartScreen;
