
import { useState, useEffect } from 'react';
import { GameBoard } from '../components/game/GameBoard';
import { Hero } from '../components/game/Hero';
import { Inventory } from '../components/game/Inventory';
import { StoryModal } from '../components/game/StoryModal';
import { LanguageSelector } from '../components/game/LanguageSelector';
import { Button } from '../components/ui/button';
import { getRandomizedProblems } from '../data/problemLibrary';
import { titleProgression, gear as availableGear, sidekicks as availableSidekicks } from '../data/gameData';

const Index = () => {
  const [problems, setProblems] = useState<any[]>([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [heroStats, setHeroStats] = useState({
    name: "CodeHero",
    level: 1,
    experience: 0,
    gear: [],
    sidekicks: [],
    equippedGear: [],
    equippedSidekicks: []
  });
  const [showStory, setShowStory] = useState(false);
  const [gameState, setGameState] = useState<'selecting' | 'playing' | 'victory' | 'defeat'>('selecting');

  const getCurrentTitle = () => {
    const currentTitle = titleProgression
      .slice()
      .reverse()
      .find(title => heroStats.level >= title.level);
    return currentTitle || titleProgression[0];
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    // Filter problems by selected language and randomize
    const allProblems = getRandomizedProblems(50);
    const filteredProblems = allProblems.filter(problem => problem.language === language);
    setProblems(filteredProblems);
    setGameState('playing');
    setShowStory(true);
  };

  const handleLevelComplete = (reward: any) => {
    const newExperience = heroStats.experience + 100;
    const experienceNeeded = heroStats.level * 200;
    const shouldLevelUp = newExperience >= experienceNeeded;
    
    // Add functional gear and sidekicks based on reward type
    const newGear = [...heroStats.gear];
    const newSidekicks = [...heroStats.sidekicks];
    
    if (reward.type === 'gear') {
      newGear.push(reward);
    } else if (reward.type === 'sidekick') {
      newSidekicks.push(reward);
    }
    
    setHeroStats(prev => ({
      ...prev,
      experience: newExperience,
      gear: newGear,
      sidekicks: newSidekicks,
      level: shouldLevelUp ? prev.level + 1 : prev.level
    }));
    
    if (currentLevel < problems.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setShowStory(true);
    } else {
      setGameState('victory');
    }
  };

  const handleEquipGear = (item: any) => {
    setHeroStats(prev => ({
      ...prev,
      equippedGear: [...prev.equippedGear, item]
    }));
  };

  const handleUnequipGear = (item: any) => {
    setHeroStats(prev => ({
      ...prev,
      equippedGear: prev.equippedGear.filter(g => g.name !== item.name)
    }));
  };

  const handleEquipSidekick = (item: any) => {
    setHeroStats(prev => ({
      ...prev,
      equippedSidekicks: [...prev.equippedSidekicks, item]
    }));
  };

  const handleUnequipSidekick = (item: any) => {
    setHeroStats(prev => ({
      ...prev,
      equippedSidekicks: prev.equippedSidekicks.filter(s => s.name !== item.name)
    }));
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setSelectedLanguage('');
    setProblems([]);
    setHeroStats({
      name: "CodeHero",
      level: 1,
      experience: 0,
      gear: [],
      sidekicks: [],
      equippedGear: [],
      equippedSidekicks: []
    });
    setGameState('selecting');
    setShowStory(false);
  };

  // Language Selection Screen
  if (gameState === 'selecting') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mb-4">
              🦸‍♂️ CODE HERO
            </h1>
            <p className="text-2xl text-white mb-2">Debug the Digital World!</p>
            <p className="text-lg text-gray-300">Choose your programming language and start your debugging adventure</p>
          </div>
          
          <LanguageSelector 
            onLanguageSelect={handleLanguageSelect}
            selectedLanguage={selectedLanguage}
          />
        </div>
      </div>
    );
  }

  // Loading State
  if (problems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading {selectedLanguage} Challenges...</div>
      </div>
    );
  }

  // Victory Screen
  if (gameState === 'victory') {
    const finalTitle = getCurrentTitle();
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-200 via-orange-300 to-red-400 flex items-center justify-center">
        <div className="text-center bg-white/90 p-8 rounded-3xl shadow-2xl border-4 border-yellow-400">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            🎉 VICTORY! 🎉
          </h1>
          <div className="text-3xl mb-4">{finalTitle.title}</div>
          <p className="text-2xl text-gray-800 mb-2">
            You mastered {selectedLanguage} debugging!
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Final Level: {heroStats.level} • Problems Solved: {currentLevel + 1}
          </p>
          <div className="flex space-x-4 justify-center">
            <Button onClick={resetGame} className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xl px-8 py-4">
              🔄 New Language
            </Button>
            <Button 
              onClick={() => handleLanguageSelect(selectedLanguage)} 
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl px-8 py-4"
            >
              🔁 Play Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentProblem = problems[currentLevel];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute top-32 right-20 w-6 h-6 bg-green-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-32 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
              🦸‍♂️ CODE HERO
            </h1>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white text-lg">{selectedLanguage} Problem {currentLevel + 1}/{problems.length}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-white text-right">
              <div className="text-yellow-400 font-bold">{getCurrentTitle().title}</div>
              <div>Level: {heroStats.level} • XP: {heroStats.experience}</div>
            </div>
            <Button onClick={resetGame} variant="outline" className="text-white border-white/50">
              🔄 Change Language
            </Button>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Hero Display */}
          <div className="lg:col-span-1">
            <Hero stats={heroStats} />
            <div className="mt-4">
              <Inventory 
                gear={heroStats.gear} 
                sidekicks={heroStats.sidekicks}
                equippedGear={heroStats.equippedGear}
                equippedSidekicks={heroStats.equippedSidekicks}
                onEquipGear={handleEquipGear}
                onUnequipGear={handleUnequipGear}
                onEquipSidekick={handleEquipSidekick}
                onUnequipSidekick={handleUnequipSidekick}
              />
            </div>
          </div>

          {/* Game Board */}
          <div className="lg:col-span-3">
            <GameBoard 
              level={currentProblem}
              onComplete={handleLevelComplete}
              onDefeat={() => setGameState('defeat')}
              gear={heroStats.equippedGear}
              sidekicks={heroStats.equippedSidekicks}
            />
          </div>
        </div>
      </div>

      {/* Story Modal */}
      {showStory && (
        <StoryModal 
          level={currentProblem}
          onClose={() => setShowStory(false)}
        />
      )}
    </div>
  );
};

export default Index;
