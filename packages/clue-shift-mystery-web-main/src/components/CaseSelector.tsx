
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Case, GameMode, GradeLevel } from '../types/GameTypes';

interface CaseSelectorProps {
  onCaseSelect: (caseData: Case) => void;
  playerGrade?: GradeLevel;
}

const CaseSelector: React.FC<CaseSelectorProps> = ({ onCaseSelect, playerGrade = 'K-5' }) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(playerGrade);
  const [selectedDifficulty, setSelectedDifficulty] = useState<GameMode>('easy');

  const cases: Case[] = [
    // Elementary Cases (K-5)
    {
      id: 'missing-toy',
      title: 'The Missing Mr. Peanuts',
      description: 'Help find Sarah\'s beloved stuffed elephant!',
      difficulty: 'easy',
      gradeLevel: 'K-5',
      unlocked: true,
      completed: false,
      theme: 'playground',
      positiveOutcome: true
    },
    {
      id: 'pet-food-mystery',
      title: 'The Class Pet Food Mystery',
      description: 'Someone ate Nibbles the hamster\'s food!',
      difficulty: 'easy',
      gradeLevel: 'K-5',
      unlocked: true,
      completed: false,
      theme: 'school'
    },
    {
      id: 'muddy-footprints',
      title: 'The Muddy Footprint Trail',
      description: 'Who tracked mud through the clean hallway?',
      difficulty: 'medium',
      gradeLevel: 'K-5',
      unlocked: true,
      completed: false,
      theme: 'school'
    },
    {
      id: 'mixed-lunch-boxes',
      title: 'The Great Lunch Box Mix-Up',
      description: 'Everyone\'s lunch got switched around!',
      difficulty: 'medium',
      gradeLevel: 'K-5',
      unlocked: true,
      completed: false,
      theme: 'cafeteria',
      twistEnding: true
    },

    // Middle School Cases (6-8)
    {
      id: 'website-password',
      title: 'The School Website Password',
      description: 'Someone changed the student portal password!',
      difficulty: 'medium',
      gradeLevel: '6-8',
      unlocked: true,
      completed: false,
      theme: 'school'
    },
    {
      id: 'compliment-notes',
      title: 'The Anonymous Compliment Notes',
      description: 'Who\'s been leaving kind notes in lockers?',
      difficulty: 'medium',
      gradeLevel: '6-8',
      unlocked: true,
      completed: false,
      theme: 'school',
      positiveOutcome: true
    },
    {
      id: 'surprise-party',
      title: 'The Secret Surprise Party',
      description: 'Someone organized a party for the retiring teacher!',
      difficulty: 'hard',
      gradeLevel: '6-8',
      unlocked: true,
      completed: false,
      theme: 'school',
      positiveOutcome: true
    },
    {
      id: 'broken-project',
      title: 'The Broken Science Project',
      description: 'The volcano display was accidentally damaged.',
      difficulty: 'hard',
      gradeLevel: '6-8',
      unlocked: true,
      completed: false,
      theme: 'science',
      twistEnding: true
    },

    // High School Cases (9-12)
    {
      id: 'assembly-leak',
      title: 'The Assembly Leak',
      description: 'Someone revealed the surprise guest speaker!',
      difficulty: 'hard',
      gradeLevel: '9-12',
      unlocked: true,
      completed: false,
      theme: 'school'
    },
    {
      id: 'study-guide',
      title: 'The Anonymous Study Guide',
      description: 'Who created the helpful exam study materials?',
      difficulty: 'hard',
      gradeLevel: '9-12',
      unlocked: true,
      completed: false,
      theme: 'school',
      positiveOutcome: true
    },
    {
      id: 'fundraiser-donations',
      title: 'The Fundraiser Organizer',
      description: 'Someone secretly boosted the charity drive!',
      difficulty: 'hard',
      gradeLevel: '9-12',
      unlocked: true,
      completed: false,
      theme: 'school',
      positiveOutcome: true
    },
    {
      id: 'math-competition',
      title: 'The Math Competition Solution',
      description: 'Who solved the impossible bonus problem?',
      difficulty: 'hard',
      gradeLevel: '9-12',
      unlocked: true,
      completed: false,
      theme: 'school',
      positiveOutcome: true
    }
  ];

  const filteredCases = cases.filter(c => 
    c.gradeLevel === selectedGrade && 
    c.difficulty === selectedDifficulty
  );

  const getDifficultyColor = (difficulty: GameMode) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 border-green-300 text-green-800';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'hard': return 'bg-red-100 border-red-300 text-red-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case 'playground': return '🛝';
      case 'school': return '🏫';
      case 'cafeteria': return '🍽️';
      case 'library': return '📚';
      case 'science': return '🔬';
      case 'sports': return '⚽';
      case 'seasonal': return '🎃';
      default: return '🔍';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="bg-white border-4 border-blue-300 shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
          🕵️ Choose Your Mystery Case
        </h2>

        {/* Grade Level Selector */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3">Select Grade Level:</h3>
          <div className="flex flex-wrap gap-3">
            {(['K-5', '6-8', '9-12'] as GradeLevel[]).map((grade) => (
              <Button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`${
                  selectedGrade === grade 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Grades {grade}
              </Button>
            ))}
          </div>
        </div>

        {/* Difficulty Selector */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-3">Select Difficulty:</h3>
          <div className="flex flex-wrap gap-3">
            {(['easy', 'medium', 'hard'] as GameMode[]).map((diff) => (
              <Button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`${
                  selectedDifficulty === diff 
                    ? getDifficultyColor(diff)
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Case Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((caseData) => (
            <Card 
              key={caseData.id}
              className={`border-3 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer ${
                caseData.positiveOutcome 
                  ? 'border-green-300 bg-green-50' 
                  : caseData.twistEnding 
                    ? 'border-purple-300 bg-purple-50'
                    : 'border-blue-300 bg-blue-50'
              }`}
              onClick={() => onCaseSelect(caseData)}
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">
                  {getThemeIcon(caseData.theme || 'school')}
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  {caseData.title}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {caseData.description}
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(caseData.difficulty)}`}>
                    {caseData.difficulty.toUpperCase()}
                  </span>
                  {caseData.positiveOutcome && (
                    <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">
                      POSITIVE 💚
                    </span>
                  )}
                  {caseData.twistEnding && (
                    <span className="text-xs px-2 py-1 rounded bg-purple-100 text-purple-800">
                      TWIST 🌟
                    </span>
                  )}
                </div>
              </div>
              
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Start Case
              </Button>
            </Card>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">
              No cases available for this grade level and difficulty.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Try selecting different options above!
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CaseSelector;
