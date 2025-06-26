
import React from 'react';
import { Card } from '@/components/ui/card';
import { PlayerProgress, Achievement } from '../types/GameTypes';

interface ProgressTrackerProps {
  progress: PlayerProgress;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  const xpToNextLevel = (progress.level * 100) - (progress.xp % (progress.level * 100));
  const xpProgress = (progress.xp % (progress.level * 100)) / (progress.level * 100) * 100;

  const recentBadges = progress.badges
    .filter(badge => badge.unlockedAt)
    .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
    .slice(0, 3);

  return (
    <Card className="bg-white border-3 border-indigo-300 shadow-lg p-4">
      <h3 className="text-lg font-bold text-indigo-800 mb-4 text-center">
        🎖️ Detective Progress
      </h3>

      {/* Level and XP */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Level {progress.level} Detective
          </span>
          <span className="text-xs text-gray-500">
            {progress.xp} XP
          </span>
        </div>
        <div className="bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${xpProgress}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {xpToNextLevel} XP to next level
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{progress.casesCompleted.length}</div>
          <div className="text-xs text-gray-600">Cases Solved</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{progress.perfectScores}</div>
          <div className="text-xs text-gray-600">Perfect Scores</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{progress.hiddenCluesFound}</div>
          <div className="text-xs text-gray-600">Hidden Clues</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{Math.floor(progress.totalPlayTime / 60)}</div>
          <div className="text-xs text-gray-600">Minutes Played</div>
        </div>
      </div>

      {/* Recent Badges */}
      {recentBadges.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-gray-700 mb-2">Recent Achievements</h4>
          <div className="space-y-1">
            {recentBadges.map((badge) => (
              <div key={badge.id} className="flex items-center space-x-2 bg-yellow-50 border border-yellow-200 rounded p-2">
                <span className="text-lg">{badge.icon}</span>
                <div>
                  <div className="text-xs font-medium text-yellow-800">{badge.name}</div>
                  <div className="text-xs text-yellow-600">{badge.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default ProgressTracker;
