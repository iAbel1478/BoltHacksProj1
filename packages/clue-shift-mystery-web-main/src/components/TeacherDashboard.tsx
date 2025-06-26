
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayerProgress } from '../types/GameTypes';

interface TeacherDashboardProps {
  studentProgress: PlayerProgress[];
  onClose: () => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ 
  studentProgress, 
  onClose 
}) => {
  const calculateClassAverage = () => {
    if (studentProgress.length === 0) return 0;
    const totalXP = studentProgress.reduce((sum, student) => sum + student.xp, 0);
    return Math.round(totalXP / studentProgress.length);
  };

  const getVocabularyStats = () => {
    const allWords = studentProgress.flatMap(student => student.vocabularyWords || []);
    const uniqueWords = [...new Set(allWords)];
    return {
      totalUniqueWords: uniqueWords.length,
      averageWordsPerStudent: Math.round(allWords.length / studentProgress.length) || 0
    };
  };

  const getSkillProgression = () => {
    const avgDifficulty = studentProgress.reduce((sum, student) => 
      sum + (student.adaptiveDifficulty || 1), 0) / studentProgress.length;
    
    return {
      averageDifficulty: Math.round(avgDifficulty * 10) / 10,
      studentsAtAdvanced: studentProgress.filter(s => (s.adaptiveDifficulty || 1) >= 2.5).length,
      studentsNeedingHelp: studentProgress.filter(s => (s.adaptiveDifficulty || 1) < 1.5).length
    };
  };

  const vocabStats = getVocabularyStats();
  const skillStats = getSkillProgression();

  return (
    <Card className="bg-white border-4 border-blue-300 shadow-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800">
          👩‍🏫 Teacher Dashboard
        </h2>
        <Button onClick={onClose} variant="outline">
          ✕ Close
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Class Overview */}
        <Card className="bg-blue-50 border-2 border-blue-200 p-4">
          <h3 className="font-bold text-blue-800 mb-2">📊 Class Overview</h3>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Students: </span>
              {studentProgress.length}
            </div>
            <div className="text-sm">
              <span className="font-medium">Avg XP: </span>
              {calculateClassAverage()}
            </div>
            <div className="text-sm">
              <span className="font-medium">Cases Completed: </span>
              {studentProgress.reduce((sum, s) => sum + s.casesCompleted.length, 0)}
            </div>
          </div>
        </Card>

        {/* Vocabulary Progress */}
        <Card className="bg-green-50 border-2 border-green-200 p-4">
          <h3 className="font-bold text-green-800 mb-2">📚 Vocabulary</h3>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Unique Words: </span>
              {vocabStats.totalUniqueWords}
            </div>
            <div className="text-sm">
              <span className="font-medium">Avg per Student: </span>
              {vocabStats.averageWordsPerStudent}
            </div>
            <div className="text-sm">
              <span className="font-medium">Learning Growth: </span>
              <span className="text-green-600">📈 Active</span>
            </div>
          </div>
        </Card>

        {/* Critical Thinking */}
        <Card className="bg-purple-50 border-2 border-purple-200 p-4">
          <h3 className="font-bold text-purple-800 mb-2">🧠 Critical Thinking</h3>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Avg Difficulty: </span>
              {skillStats.averageDifficulty}/3.0
            </div>
            <div className="text-sm">
              <span className="font-medium">Advanced: </span>
              {skillStats.studentsAtAdvanced} students
            </div>
            <div className="text-sm">
              <span className="font-medium">Need Support: </span>
              {skillStats.studentsNeedingHelp} students
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="bg-yellow-50 border-2 border-yellow-200 p-4">
          <h3 className="font-bold text-yellow-800 mb-2">🏆 Achievements</h3>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Perfect Scores: </span>
              {studentProgress.reduce((sum, s) => sum + s.perfectScores, 0)}
            </div>
            <div className="text-sm">
              <span className="font-medium">Hidden Clues: </span>
              {studentProgress.reduce((sum, s) => sum + s.hiddenCluesFound, 0)}
            </div>
            <div className="text-sm">
              <span className="font-medium">Total Badges: </span>
              {studentProgress.reduce((sum, s) => sum + s.badges.length, 0)}
            </div>
          </div>
        </Card>
      </div>

      {/* Individual Student Progress */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">👥 Individual Progress</h3>
        <div className="space-y-3">
          {studentProgress.map((student, index) => (
            <Card key={index} className="bg-gray-50 border border-gray-200 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Student {index + 1}</h4>
                  <div className="text-sm text-gray-600 mt-1">
                    Level {student.level} • {student.xp} XP • {student.casesCompleted.length} cases
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">
                    <span className="inline-block w-2 h-2 rounded-full mr-2 
                      ${student.adaptiveDifficulty >= 2.5 ? 'bg-green-500' : 
                        student.adaptiveDifficulty >= 1.5 ? 'bg-yellow-500' : 'bg-red-500'}">
                    </span>
                    {student.adaptiveDifficulty >= 2.5 ? 'Advanced' : 
                     student.adaptiveDifficulty >= 1.5 ? 'On Track' : 'Needs Support'}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {student.vocabularyWords?.length || 0} vocabulary words
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <Card className="bg-orange-50 border-2 border-orange-200 p-4">
        <h3 className="font-bold text-orange-800 mb-3">💡 Teaching Recommendations</h3>
        <div className="space-y-2 text-sm">
          {skillStats.studentsNeedingHelp > 0 && (
            <div className="flex items-center space-x-2">
              <span>🎯</span>
              <span>Consider providing additional hints for {skillStats.studentsNeedingHelp} students who may need extra support</span>
            </div>
          )}
          {skillStats.studentsAtAdvanced > 0 && (
            <div className="flex items-center space-x-2">
              <span>🚀</span>
              <span>Challenge advanced students with hard mode cases and collaborative problem-solving</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <span>📖</span>
            <span>Use vocabulary words from cases in other lessons to reinforce learning</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>👥</span>
            <span>Try collaborative mode to encourage peer learning and discussion</span>
          </div>
        </div>
      </Card>
    </Card>
  );
};

export default TeacherDashboard;
