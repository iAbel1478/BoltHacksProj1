
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GameMode, PlayerProgress, Case } from '../types/GameTypes';

interface ResultSlideProps {
  selectedCulprit: string;
  selectedClues: string[];
  hintsUsed: number;
  onRestart: () => void;
  gameMode?: GameMode;
  playerProgress?: PlayerProgress;
  selectedCase?: Case | null;
}

const ResultSlide: React.FC<ResultSlideProps> = ({ 
  selectedCulprit, 
  selectedClues, 
  hintsUsed, 
  onRestart,
  gameMode = 'easy',
  playerProgress,
  selectedCase
}) => {
  const getCorrectCulprit = () => {
    if (gameMode === 'easy') return "tommy";
    if (selectedCase?.gradeLevel === 'K-5') return 'alex';
    if (selectedCase?.gradeLevel === '6-8') return 'riley';
    return 'casey';
  };

  const getCorrectClues = () => {
    if (gameMode === 'easy') return ["muddy-footprint", "joke-book"];
    if (gameMode === 'medium') return ["fingerprint", "decoded_message"];
    return ["digital_evidence", "witness_testimony", "timeline_clue"];
  };

  const correctCulprit = getCorrectCulprit();
  const correctClues = getCorrectClues();
  
  const isCorrectCulprit = selectedCulprit === correctCulprit;
  const correctClueCount = selectedClues.filter(clue => correctClues.includes(clue)).length;
  
  const baseScore = gameMode === 'hard' ? 150 : gameMode === 'medium' ? 100 : 75;
  const score = (isCorrectCulprit ? baseScore * 0.6 : 0) + (correctClueCount * (baseScore * 0.3 / correctClues.length)) - (hintsUsed * 10);
  const finalScore = Math.max(0, Math.round(score));

  const getDetectiveRank = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 95) return { name: "Master Detective", icon: "🏆", description: "Perfect deduction skills!" };
    if (percentage >= 85) return { name: "Expert Sleuth", icon: "⭐", description: "Outstanding detective work!" };
    if (percentage >= 75) return { name: "Skilled Investigator", icon: "🎯", description: "Excellent problem solving!" };
    if (percentage >= 60) return { name: "Detective", icon: "🔍", description: "Good observation skills!" };
    if (percentage >= 40) return { name: "Junior Detective", icon: "🕵️", description: "Keep practicing!" };
    return { name: "Detective in Training", icon: "🤝", description: "Great effort - try again!" };
  };

  const rank = getDetectiveRank(finalScore, baseScore);

  const getExplanation = () => {
    if (selectedCase) {
      // Dynamic explanation based on selected case
      return {
        culprit: getCulpritName(),
        reason: getCaseExplanation(),
        evidence: getCaseEvidence()
      };
    }
    
    // Default easy mode explanation
    return {
      culprit: "Tommy the Class Clown",
      reason: "Tommy took Mr. Peanuts as a harmless prank but felt bad when he saw Sarah was upset. He was planning to return it after making everyone laugh.",
      evidence: [
        "🦶 The muddy footprint shows Tommy came in from the playground",
        "😂 The joke book proves Tommy was looking for new material",
        "📄 The torn book page was from Emma chasing Tommy",
        "🥤 The sports drink belonged to Jake after soccer"
      ]
    };
  };

  const getCulpritName = () => {
    if (selectedCase?.gradeLevel === 'K-5') return 'Alex';
    if (selectedCase?.gradeLevel === '6-8') return 'Riley Park';
    return 'Casey Rodriguez';
  };

  const getCaseExplanation = () => {
    if (selectedCase?.gradeLevel === 'K-5') {
      return "Alex was trying to help by giving the class pet extra food, but didn't realize it was too much. They meant well but got nervous when questioned.";
    }
    if (selectedCase?.gradeLevel === '6-8') {
      return "Riley organized the surprise event to make everyone feel appreciated. They kept it secret because they wanted it to be a genuine surprise!";
    }
    return "Casey created the study materials anonymously because they wanted to help classmates succeed without taking credit. Their goal was simply to support everyone's learning.";
  };

  const getCaseEvidence = () => {
    if (selectedCase?.gradeLevel === 'K-5') {
      return [
        "🐹 Food container found near Alex's backpack",
        "📝 Alex's handwriting on a care schedule",
        "👀 Witness saw Alex near the pet area",
        "💝 Alex's kind intentions revealed through questioning"
      ];
    }
    if (selectedCase?.gradeLevel === '6-8') {
      return [
        "🎨 Art supplies traced to Riley's art class schedule",
        "📱 Digital footprint from planning messages",
        "👥 Multiple students confirmed Riley's helpful nature",
        "🎉 Riley's confession revealed positive motives"
      ];
    }
    return [
      "💻 Digital signature analysis from uploaded study guides",
      "⏰ Timeline matching Casey's free periods",
      "📚 Academic expertise consistent with study guide quality",
      "🤝 Casey's history of anonymous helping behavior"
    ];
  };

  const explanation = getExplanation();
  const xpGained = isCorrectCulprit ? (gameMode === 'hard' ? 75 : 50) : 25;

  return (
    <div className="max-w-4xl mx-auto">
      <Card className={`border-4 shadow-2xl p-6 md:p-8 ${
        gameMode === 'hard'
          ? 'bg-slate-800 border-purple-600 text-white'
          : gameMode === 'medium'
            ? 'bg-gray-800 border-gray-600 text-white'
            : 'bg-white border-blue-300'
      }`}>
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">
            {isCorrectCulprit ? "🎉" : "🤔"}
          </div>
          <h2 className={`text-3xl font-bold mb-4 ${
            gameMode === 'medium' || gameMode === 'hard' ? 'text-gray-100' : 'text-blue-800'
          }`}>
            {isCorrectCulprit ? "Mystery Solved!" : "Case Closed!"}
          </h2>
          {selectedCase && (
            <p className={`text-lg ${
              gameMode === 'medium' || gameMode === 'hard' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {selectedCase.title}
            </p>
          )}
        </div>

        {/* Case Explanation */}
        <div className={`border-2 rounded-xl p-6 mb-8 ${
          gameMode === 'hard'
            ? 'bg-slate-700 border-purple-500'
            : gameMode === 'medium'
              ? 'bg-gray-700 border-gray-500'
              : 'bg-yellow-50 border-yellow-300'
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${
            gameMode === 'medium' || gameMode === 'hard' ? 'text-gray-200' : 'text-yellow-800'
          }`}>
            🕵️ The Truth Revealed
          </h3>
          <div className={`text-lg space-y-3 ${
            gameMode === 'medium' || gameMode === 'hard' ? 'text-gray-300' : 'text-gray-800'
          }`}>
            <p><strong>The person responsible was:</strong> {explanation.culprit}</p>
            <p><strong>What happened:</strong> {explanation.reason}</p>
            {selectedCase?.positiveOutcome && (
              <div className="bg-green-100 border border-green-300 rounded p-3 mt-4">
                <p className="text-green-800">
                  <strong>💚 Positive Outcome:</strong> This case shows how good intentions can sometimes lead to misunderstandings. Great detective work uncovering the truth!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Evidence Analysis */}
        <div className={`border-2 rounded-xl p-6 mb-8 ${
          gameMode === 'hard'
            ? 'bg-slate-700 border-purple-500'
            : gameMode === 'medium'
              ? 'bg-gray-700 border-gray-500'
              : 'bg-blue-50 border-blue-300'
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${
            gameMode === 'medium' || gameMode === 'hard' ? 'text-gray-200' : 'text-blue-800'
          }`}>
            🔍 Evidence Analysis
          </h3>
          <ul className="space-y-2">
            {explanation.evidence.map((item, index) => (
              <li key={index} className={gameMode === 'medium' || gameMode === 'hard' ? 'text-gray-300' : 'text-gray-800'}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Performance Score */}
        <div className={`border-2 rounded-xl p-6 mb-8 ${
          gameMode === 'hard'
            ? 'bg-slate-700 border-purple-500'
            : gameMode === 'medium'
              ? 'bg-gray-700 border-gray-500'
              : 'bg-green-50 border-green-300'
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${
            gameMode === 'medium' || gameMode === 'hard' ? 'text-gray-200' : 'text-green-800'
          }`}>
            📊 Your Detective Performance
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Correct Culprit:</span>
              <span className={`font-bold ${isCorrectCulprit ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrectCulprit ? '✓ Yes' : '✗ No'} ({isCorrectCulprit ? Math.round(baseScore * 0.6) : 0} points)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Evidence Analysis:</span>
              <span className="font-bold text-blue-600">
                {correctClueCount}/{correctClues.length} correct (+{Math.round(correctClueCount * (baseScore * 0.3 / correctClues.length))} points)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Hints Used:</span>
              <span className="font-bold text-orange-600">
                {hintsUsed} (-{hintsUsed * 10} points)
              </span>
            </div>
            {(gameMode === 'medium' || gameMode === 'hard') && (
              <div className="flex justify-between items-center">
                <span>XP Gained:</span>
                <span className="font-bold text-purple-600">+{xpGained} XP</span>
              </div>
            )}
            <hr className="border-gray-400" />
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Final Score:</span>
              <span className="text-purple-600">{finalScore}/{baseScore}</span>
            </div>
          </div>
        </div>

        {/* Detective Rank */}
        <div className={`border-2 rounded-xl p-6 text-center mb-8 ${
          gameMode === 'hard'
            ? 'bg-slate-700 border-purple-500'
            : gameMode === 'medium'
              ? 'bg-gray-700 border-gray-500'
              : 'bg-purple-50 border-purple-300'
        }`}>
          <div className="text-4xl mb-2">{rank.icon}</div>
          <h3 className={`text-2xl font-bold mb-2 ${
            gameMode === 'medium' || gameMode === 'hard' ? 'text-gray-200' : 'text-purple-800'
          }`}>
            Detective Rank: {rank.name}
          </h3>
          <p className={gameMode === 'medium' || gameMode === 'hard' ? 'text-gray-300' : 'text-purple-700'}>
            {rank.description}
          </p>
          
          {playerProgress && (
            <div className="mt-4">
              <div className={`text-sm ${gameMode === 'medium' || gameMode === 'hard' ? 'text-gray-400' : 'text-gray-600'}`}>
                Level: {playerProgress.level} | Total XP: {playerProgress.xp} | Vocabulary: {playerProgress.vocabularyWords?.length || 0} words
              </div>
            </div>
          )}
        </div>

        {/* Achievement Unlock */}
        {finalScore >= (baseScore * 0.85) && (
          <div className="border-2 rounded-xl p-4 mb-6 text-center bg-yellow-100 border-yellow-400">
            <div className="text-2xl mb-2">🏅</div>
            <h4 className="font-bold text-yellow-800">Achievement Unlocked!</h4>
            <p className="text-sm text-yellow-700">
              {finalScore === baseScore ? 'Perfect Detective - No mistakes!' : 
               gameMode === 'hard' ? 'Master Investigator - Complex case solved!' :
               'Expert Sleuth - Outstanding work!'}
            </p>
          </div>
        )}

        {/* Continue Playing */}
        <div className="text-center">
          <Button
            onClick={onRestart}
            className={`text-xl px-8 py-4 rounded-full font-bold transform hover:scale-105 transition-all duration-200 shadow-lg ${
              gameMode === 'hard'
                ? 'bg-purple-600 hover:bg-purple-500 text-white'
                : gameMode === 'medium'
                  ? 'bg-gray-600 hover:bg-gray-500 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            🔄 {gameMode === 'hard' ? 'Master Another Case!' : 
                 gameMode === 'medium' ? 'Solve Another Mystery!' : 
                 'Play Another Case!'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ResultSlide;
