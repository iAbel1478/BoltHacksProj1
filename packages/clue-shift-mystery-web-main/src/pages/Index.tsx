
import React, { useState } from 'react';
import GameModeSelector from '../components/GameModeSelector';
import CaseSelector from '../components/CaseSelector';
import IntroSlide from '../components/IntroSlide';
import ClueSlide from '../components/ClueSlide';
import InventoryPanel from '../components/InventoryPanel';
import DeductionSlide from '../components/DeductionSlide';
import ResultSlide from '../components/ResultSlide';
import DialogueSystem from '../components/DialogueSystem';
import CipherGame from '../components/mini-games/CipherGame';
import LetterSubstitutionGame from '../components/mini-games/LetterSubstitutionGame';
import CaesarCipherGame from '../components/mini-games/CaesarCipherGame';
import ProgressTracker from '../components/ProgressTracker';
import TeacherDashboard from '../components/TeacherDashboard';
import { Clue, GameState, GameMode, Suspect, PlayerProgress, MiniGameType, Case, GradeLevel } from '../types/GameTypes';

const Index = () => {
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [playerGrade, setPlayerGrade] = useState<GradeLevel>('K-5');
  const [gameState, setGameState] = useState<GameState>('intro');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [inventory, setInventory] = useState<Clue[]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [selectedCulprit, setSelectedCulprit] = useState<string>('');
  const [selectedClues, setSelectedClues] = useState<string[]>([]);
  const [showMiniGame, setShowMiniGame] = useState<MiniGameType | null>(null);
  const [showDialogue, setShowDialogue] = useState<Suspect | null>(null);
  const [showTeacherDashboard, setShowTeacherDashboard] = useState(false);
  const [startTime] = useState(Date.now());

  // Enhanced player progress with all required properties
  const [playerProgress, setPlayerProgress] = useState<PlayerProgress>({
    xp: 275,
    level: 3,
    badges: [
      {
        id: 'first_case',
        name: 'First Case',
        description: 'Solved your first mystery!',
        icon: '🏆',
        unlockedAt: new Date(),
        gradeLevel: playerGrade
      }
    ],
    casesCompleted: ['toy_mystery'],
    perfectScores: 1,
    hiddenCluesFound: 3,
    totalPlayTime: 1200,
    gradeLevel: playerGrade,
    adaptiveDifficulty: 1,
    vocabularyWords: ['detective', 'clue', 'mystery', 'deduction'],
    collaborativeMode: false
  });

  // Dynamic suspects based on selected case and difficulty
  const getSuspectsForCase = (caseData: Case): Suspect[] => {
    if (caseData.gradeLevel === 'K-5') {
      return [
        {
          id: 'alex',
          name: 'Alex',
          description: 'Helpful student who loves animals',
          avatar: '😊',
          motive: 'Wanted to help feed the class pet extra food',
          alibi: 'I was reading in the library corner',
          nervousness: 2,
          credibility: 9,
          dialogueUnlocked: true,
          gradeAppropriate: ['K-5']
        },
        {
          id: 'jordan',
          name: 'Jordan',
          description: 'Energetic kid who plays outside a lot',
          avatar: '⚽',
          motive: 'Was playing and might have gotten distracted',
          alibi: 'I was on the playground the whole time',
          nervousness: 4,
          credibility: 7,
          dialogueUnlocked: true,
          gradeAppropriate: ['K-5']
        }
      ];
    } else if (caseData.gradeLevel === '6-8') {
      return [
        {
          id: 'sam',
          name: 'Sam Chen',
          description: 'Tech-savvy student who helps with computer issues',
          avatar: '💻',
          motive: 'Knows all the school systems and passwords',
          alibi: 'I was in computer lab working on my project',
          nervousness: 6,
          credibility: 8,
          dialogueUnlocked: true,
          gradeAppropriate: ['6-8']
        },
        {
          id: 'riley',
          name: 'Riley Park',
          description: 'Kind student who always helps others',
          avatar: '😇',
          motive: 'Wanted to do something nice for everyone',
          alibi: 'I was in the art room working on posters',
          nervousness: 3,
          credibility: 9,
          dialogueUnlocked: true,
          gradeAppropriate: ['6-8']
        }
      ];
    } else {
      return [
        {
          id: 'taylor',
          name: 'Taylor Williams',
          description: 'Student council member with access to information',
          avatar: '📋',
          motive: 'Has access to school announcements and events',
          alibi: 'I was in a student council meeting',
          nervousness: 5,
          credibility: 7,
          dialogueUnlocked: true,
          gradeAppropriate: ['9-12']
        },
        {
          id: 'casey',
          name: 'Casey Rodriguez',
          description: 'Honor student who excels in academics',
          avatar: '🎓',
          motive: 'Always wants to help other students succeed',
          alibi: 'I was tutoring in the math help center',
          nervousness: 2,
          credibility: 10,
          dialogueUnlocked: true,
          gradeAppropriate: ['9-12']
        }
      ];
    }
  };

  const addToInventory = (clue: Clue) => {
    if (!inventory.find(item => item.id === clue.id)) {
      setInventory([...inventory, clue]);
      
      // Award XP and track vocabulary
      if (clue.category === 'physical') {
        awardXP(15);
      }
      
      // Add vocabulary words from clue descriptions
      const newWords = extractVocabularyWords(clue.description);
      if (newWords.length > 0) {
        setPlayerProgress(prev => ({
          ...prev,
          vocabularyWords: [...new Set([...prev.vocabularyWords, ...newWords])]
        }));
      }
    }
  };

  const extractVocabularyWords = (text: string): string[] => {
    const vocabularyWords = [
      'evidence', 'suspect', 'alibi', 'motive', 'investigation', 
      'deduction', 'fingerprint', 'testimony', 'witness', 'analysis'
    ];
    return vocabularyWords.filter(word => 
      text.toLowerCase().includes(word.toLowerCase())
    );
  };

  const useHint = () => {
    setHintsUsed(hintsUsed + 1);
  };

  const awardXP = (amount: number) => {
    setPlayerProgress(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      
      // Adjust adaptive difficulty based on performance
      const newAdaptiveDifficulty = newLevel > prev.level ? 
        Math.min(prev.adaptiveDifficulty + 0.1, 3) : prev.adaptiveDifficulty;
      
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        adaptiveDifficulty: newAdaptiveDifficulty
      };
    });
  };

  const nextSlide = () => {
    const maxSlides = getMaxSlidesForMode();
    
    if (gameMode === 'hard' && currentSlide === 1) {
      // Trigger mini-game in hard mode
      setShowMiniGame('letter-substitution');
      return;
    }
    
    if (currentSlide < maxSlides) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setGameState('deduction');
    }
  };

  const getMaxSlidesForMode = () => {
    switch (gameMode) {
      case 'easy': return 3;
      case 'medium': return 5;
      case 'hard': return 7;
      default: return 3;
    }
  };

  const startGame = () => {
    if (!gameMode) {
      setGameState('intro');
      return;
    }
    if (!selectedCase && gameMode !== 'easy') {
      setGameState('case-select');
      return;
    }
    setGameState('clues');
    setCurrentSlide(0);
  };

  const selectGameMode = (mode: GameMode) => {
    setGameMode(mode);
    if (mode === 'easy') {
      // Easy mode uses default case
      setGameState('intro');
    } else {
      setGameState('case-select');
    }
  };

  const selectCase = (caseData: Case) => {
    setSelectedCase(caseData);
    setPlayerGrade(caseData.gradeLevel);
    setGameState('intro');
  };

  const makeDeduction = (culprit: string, clues: string[]) => {
    setSelectedCulprit(culprit);
    setSelectedClues(clues);
    setGameState('result');
    
    // Enhanced XP calculation based on difficulty and performance
    const baseXP = gameMode === 'hard' ? 100 : gameMode === 'medium' ? 75 : 50;
    const correctCulprit = getCorrectCulprit();
    const isCorrect = culprit === correctCulprit;
    const finalXP = isCorrect ? baseXP : baseXP / 2;
    awardXP(finalXP - (hintsUsed * 5));
    
    // Update case completion
    if (selectedCase && isCorrect) {
      setPlayerProgress(prev => ({
        ...prev,
        casesCompleted: [...prev.casesCompleted, selectedCase.id],
        perfectScores: hintsUsed === 0 ? prev.perfectScores + 1 : prev.perfectScores
      }));
    }
  };

  const getCorrectCulprit = () => {
    if (gameMode === 'easy') return 'tommy';
    if (selectedCase?.gradeLevel === 'K-5') return 'alex';
    if (selectedCase?.gradeLevel === '6-8') return 'riley';
    return 'casey';
  };

  const restartGame = () => {
    setGameMode(null);
    setSelectedCase(null);
    setGameState('intro');
    setCurrentSlide(0);
    setInventory([]);
    setHintsUsed(0);
    setSelectedCulprit('');
    setSelectedClues([]);
    setShowMiniGame(null);
    setShowDialogue(null);
  };

  const handleMiniGameComplete = (success: boolean) => {
    if (success) {
      const bonusClue: Clue = {
        id: 'decoded_message',
        name: 'Decoded Message',
        description: 'The secret message reveals important information about the case!',
        icon: '🔓',
        slideFound: currentSlide,
        category: 'digital',
        difficulty: gameMode === 'hard' ? 3 : 2
      };
      addToInventory(bonusClue);
      awardXP(25);
    }
    setShowMiniGame(null);
    nextSlide();
  };

  const handleDialogueComplete = (cluesRevealed: string[]) => {
    cluesRevealed.forEach(clueId => {
      const newClue: Clue = {
        id: clueId,
        name: 'Dialogue Clue',
        description: 'Information revealed during questioning',
        icon: '💬',
        slideFound: -1,
        category: 'testimony'
      };
      addToInventory(newClue);
    });
    setShowDialogue(null);
    awardXP(20);
  };

  const getBackgroundStyle = () => {
    if (gameMode === 'hard') {
      return 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800';
    } else if (gameMode === 'medium') {
      return 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900';
    }
    return 'bg-gradient-to-br from-blue-100 via-yellow-50 to-green-100';
  };

  const getTextStyle = () => {
    return gameMode === 'medium' || gameMode === 'hard' ? 'text-gray-100' : 'text-blue-800';
  };

  return (
    <div className={`min-h-screen ${getBackgroundStyle()}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className={`text-4xl md:text-6xl font-bold mb-2 font-comic ${getTextStyle()}`}>
            🔍 ClueShift: Web of Whodunits 🔍
          </h1>
          <p className={`text-lg font-medium ${
            gameMode === 'medium' || gameMode === 'hard' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Can you solve the mystery?
          </p>
          
          {/* Teacher Dashboard Button */}
          <button
            onClick={() => setShowTeacherDashboard(!showTeacherDashboard)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            👩‍🏫 Teacher Dashboard
          </button>
        </header>

        {showTeacherDashboard && (
          <div className="mb-8">
            <TeacherDashboard 
              studentProgress={[playerProgress]}
              onClose={() => setShowTeacherDashboard(false)}
            />
          </div>
        )}

        {!gameMode && <GameModeSelector onModeSelect={selectGameMode} />}
        
        {gameMode && gameState === 'case-select' && (
          <CaseSelector 
            onCaseSelect={selectCase} 
            playerGrade={playerGrade}
          />
        )}
        
        {gameMode && gameState === 'intro' && <IntroSlide onStart={startGame} />}
        
        {gameState === 'clues' && (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <ClueSlide 
                slideNumber={currentSlide} 
                onClueFound={addToInventory}
                onNext={nextSlide}
                onHint={useHint}
                gameMode={gameMode}
                onMiniGame={() => setShowMiniGame(gameMode === 'hard' ? 'letter-substitution' : 'cipher')}
                onDialogue={(suspect) => setShowDialogue(suspect)}
                suspects={selectedCase ? getSuspectsForCase(selectedCase) : []}
                selectedCase={selectedCase}
              />
            </div>
            <div className="lg:w-80 space-y-4">
              <InventoryPanel inventory={inventory} />
              <ProgressTracker progress={playerProgress} />
            </div>
          </div>
        )}

        {gameState === 'deduction' && (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <DeductionSlide 
                inventory={inventory}
                onSubmit={makeDeduction}
                onHint={useHint}
                gameMode={gameMode}
                suspects={selectedCase ? getSuspectsForCase(selectedCase) : undefined}
              />
            </div>
            <div className="lg:w-80 space-y-4">
              <InventoryPanel inventory={inventory} />
              <ProgressTracker progress={playerProgress} />
            </div>
          </div>
        )}

        {gameState === 'result' && (
          <ResultSlide 
            selectedCulprit={selectedCulprit}
            selectedClues={selectedClues}
            hintsUsed={hintsUsed}
            onRestart={restartGame}
            gameMode={gameMode}
            playerProgress={playerProgress}
            selectedCase={selectedCase}
          />
        )}

        {/* Mini-games */}
        {showMiniGame === 'cipher' && (
          <CipherGame
            onComplete={handleMiniGameComplete}
            onClose={() => setShowMiniGame(null)}
          />
        )}
        
        {showMiniGame === 'letter-substitution' && (
          <LetterSubstitutionGame
            onComplete={handleMiniGameComplete}
            onClose={() => setShowMiniGame(null)}
          />
        )}
        
        {showMiniGame === 'caesar-cipher' && (
          <CaesarCipherGame
            onComplete={handleMiniGameComplete}
            onClose={() => setShowMiniGame(null)}
          />
        )}

        {/* Dialogue System */}
        {showDialogue && (
          <DialogueSystem
            suspect={showDialogue}
            onComplete={handleDialogueComplete}
            onClose={() => setShowDialogue(null)}
            playerClues={inventory.map(clue => clue.id)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
