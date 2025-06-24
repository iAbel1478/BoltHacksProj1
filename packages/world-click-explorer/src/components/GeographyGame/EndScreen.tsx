import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Trophy, RotateCcw, Target, Award } from 'lucide-react';

interface EndScreenProps {
  score: number;
  questionsAnswered: number;
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({
  score,
  questionsAnswered,
  onRestart
}) => {
  const getPerformanceRating = () => {
    const avgScore = questionsAnswered > 0 ? score / questionsAnswered : 0;
    if (avgScore >= 80) return { rating: 'Geography Master!', color: 'text-yellow-600', icon: Award };
    if (avgScore >= 60) return { rating: 'World Explorer!', color: 'text-green-600', icon: Trophy };
    if (avgScore >= 40) return { rating: 'Globe Trotter!', color: 'text-blue-600', icon: Target };
    return { rating: 'Keep Exploring!', color: 'text-gray-600', icon: Target };
  };

  const performance = getPerformanceRating();
  const PerformanceIcon = performance.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <Card className="w-full max-w-2xl mx-auto animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <PerformanceIcon className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">Game Complete!</CardTitle>
          <p className={`text-2xl font-semibold ${performance.color}`}>
            {performance.rating}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Trophy className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{score.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Final Score</div>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{questionsAnswered}</div>
              <div className="text-sm text-gray-600">Countries Found</div>
            </div>
            
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">
                {questionsAnswered > 0 ? Math.round(score / questionsAnswered) : 0}
              </div>
              <div className="text-sm text-gray-600">Avg. Accuracy</div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-gray-600">
              {score >= 1000 
                ? "Incredible geographic knowledge! You're a true world explorer!"
                : score >= 500
                ? "Great job! Your geography skills are impressive!"
                : "Good effort! Keep practicing to improve your world knowledge!"
              }
            </p>
            
            <Button 
              onClick={onRestart}
              size="lg"
              className="hover:scale-105 transition-transform duration-200"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EndScreen;
