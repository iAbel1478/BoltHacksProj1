import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';

interface GameItem {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

interface GameScenario {
  id: string;
  title: string;
  description: string;
  items: GameItem[];
  background: string;
  category?: string;
}

const gameScenarios: GameScenario[] = [
  {
    id: 'grocery',
    title: 'Grocery Shopping',
    description: 'Remember the items to buy at the store',
    background: 'bg-gradient-to-br from-orange-100 to-orange-200',
    category: 'daily-life',
    items: [
      { id: 'apples', name: 'Apples', emoji: '🍎', color: 'bg-red-400' },
      { id: 'milk', name: 'Milk', emoji: '🥛', color: 'bg-blue-100' },
      { id: 'bread', name: 'Bread', emoji: '🍞', color: 'bg-yellow-300' },
      { id: 'eggs', name: 'Eggs', emoji: '🥚', color: 'bg-yellow-100' },
      { id: 'cheese', name: 'Cheese', emoji: '🧀', color: 'bg-yellow-400' },
    ]
  },
  {
    id: 'flowers',
    title: 'Forest Flowers',
    description: 'Remember which flowers to pick in the forest',
    background: 'bg-gradient-to-br from-green-100 to-green-200',
    category: 'nature',
    items: [
      { id: 'rose', name: 'Rose', emoji: '🌹', color: 'bg-pink-400' },
      { id: 'sunflower', name: 'Sunflower', emoji: '🌻', color: 'bg-yellow-400' },
      { id: 'tulip', name: 'Tulip', emoji: '🌷', color: 'bg-purple-400' },
      { id: 'daisy', name: 'Daisy', emoji: '🌼', color: 'bg-white' },
      { id: 'blossom', name: 'Blossom', emoji: '🌸', color: 'bg-pink-200' },
    ]
  },
  {
    id: 'buttons',
    title: 'Button Sequence',
    description: 'Remember which colored buttons to press',
    background: 'bg-gradient-to-br from-blue-100 to-blue-200',
    category: 'pattern',
    items: [
      { id: 'red', name: 'Red', emoji: '🔴', color: 'bg-red-500' },
      { id: 'blue', name: 'Blue', emoji: '🔵', color: 'bg-blue-500' },
      { id: 'green', name: 'Green', emoji: '🟢', color: 'bg-green-500' },
      { id: 'yellow', name: 'Yellow', emoji: '🟡', color: 'bg-yellow-500' },
      { id: 'purple', name: 'Purple', emoji: '🟣', color: 'bg-purple-500' },
    ]
  },
  {
    id: 'levers',
    title: 'Lever Control',
    description: 'Remember which levers to pull in sequence',
    background: 'bg-gradient-to-br from-gray-100 to-gray-200',
    category: 'mechanical',
    items: [
      { id: 'lever1', name: 'Lever 1', emoji: '🎚️', color: 'bg-red-400' },
      { id: 'lever2', name: 'Lever 2', emoji: '🎚️', color: 'bg-blue-400' },
      { id: 'lever3', name: 'Lever 3', emoji: '🎚️', color: 'bg-green-400' },
      { id: 'lever4', name: 'Lever 4', emoji: '🎚️', color: 'bg-yellow-400' },
      { id: 'lever5', name: 'Lever 5', emoji: '🎚️', color: 'bg-purple-400' },
    ]
  },
  {
    id: 'lock',
    title: 'Lock Code',
    description: 'Remember the number sequence for the combination lock',
    background: 'bg-gradient-to-br from-amber-100 to-amber-200',
    category: 'numbers',
    items: [
      { id: '1', name: '1', emoji: '1️⃣', color: 'bg-slate-300' },
      { id: '2', name: '2', emoji: '2️⃣', color: 'bg-slate-300' },
      { id: '3', name: '3', emoji: '3️⃣', color: 'bg-slate-300' },
      { id: '4', name: '4', emoji: '4️⃣', color: 'bg-slate-300' },
      { id: '5', name: '5', emoji: '5️⃣', color: 'bg-slate-300' },
    ]
  },
  {
    id: 'cooking',
    title: 'Cooking Recipe',
    description: 'Remember ingredients to add in order',
    background: 'bg-gradient-to-br from-orange-100 to-red-100',
    category: 'food',
    items: [
      { id: 'salt', name: 'Salt', emoji: '🧂', color: 'bg-white' },
      { id: 'pepper', name: 'Pepper', emoji: '🌶️', color: 'bg-red-400' },
      { id: 'onion', name: 'Onion', emoji: '🧅', color: 'bg-yellow-200' },
      { id: 'garlic', name: 'Garlic', emoji: '🧄', color: 'bg-gray-200' },
      { id: 'herbs', name: 'Herbs', emoji: '🌿', color: 'bg-green-400' },
    ]
  },
  {
    id: 'animal-dance',
    title: 'Animal Dance',
    description: 'Watch the robot dance and copy the moves',
    background: 'bg-gradient-to-br from-pink-100 to-purple-200',
    category: 'movement',
    items: [
      { id: 'clap', name: 'Clap', emoji: '👏', color: 'bg-yellow-300' },
      { id: 'spin', name: 'Spin', emoji: '🌀', color: 'bg-blue-300' },
      { id: 'jump', name: 'Jump', emoji: '⬆️', color: 'bg-green-300' },
      { id: 'dab', name: 'Dab', emoji: '💪', color: 'bg-purple-300' },
      { id: 'wave', name: 'Wave', emoji: '👋', color: 'bg-pink-300' },
    ]
  },
  {
    id: 'birthday-cake',
    title: 'Birthday Cake Builder',
    description: 'Build the perfect birthday cake step by step',
    background: 'bg-gradient-to-br from-pink-100 to-yellow-200',
    category: 'celebration',
    items: [
      { id: 'base', name: 'Cake Base', emoji: '🍰', color: 'bg-yellow-200' },
      { id: 'frosting', name: 'Frosting', emoji: '🧁', color: 'bg-pink-200' },
      { id: 'sprinkles', name: 'Sprinkles', emoji: '🌈', color: 'bg-purple-200' },
      { id: 'candles', name: 'Candles', emoji: '🕯️', color: 'bg-orange-200' },
      { id: 'cherry', name: 'Cherry', emoji: '🍒', color: 'bg-red-300' },
    ]
  },
  {
    id: 'alien-translator',
    title: 'Alien Translator',
    description: 'Learn the alien language symbols',
    background: 'bg-gradient-to-br from-purple-100 to-indigo-200',
    category: 'space',
    items: [
      { id: 'star', name: 'Star', emoji: '⭐', color: 'bg-yellow-400' },
      { id: 'moon', name: 'Moon', emoji: '🌙', color: 'bg-blue-200' },
      { id: 'comet', name: 'Comet', emoji: '☄️', color: 'bg-orange-300' },
      { id: 'planet', name: 'Planet', emoji: '🪐', color: 'bg-purple-300' },
      { id: 'ufo', name: 'UFO', emoji: '🛸', color: 'bg-green-300' },
    ]
  },
  {
    id: 'backpack',
    title: 'Backpack Pack-Up',
    description: 'Pack your camping gear in the right order',
    background: 'bg-gradient-to-br from-brown-100 to-green-200',
    category: 'camping',
    items: [
      { id: 'tent', name: 'Tent', emoji: '⛺', color: 'bg-green-400' },
      { id: 'sleeping-bag', name: 'Sleeping Bag', emoji: '🛏️', color: 'bg-blue-400' },
      { id: 'flashlight', name: 'Flashlight', emoji: '🔦', color: 'bg-yellow-400' },
      { id: 'compass', name: 'Compass', emoji: '🧭', color: 'bg-red-400' },
      { id: 'marshmallow', name: 'Marshmallow', emoji: '🍡', color: 'bg-white' },
    ]
  },
  {
    id: 'costume-closet',
    title: 'Costume Closet',
    description: 'Dress up the character in the right order',
    background: 'bg-gradient-to-br from-rainbow-100 to-pink-200',
    category: 'dress-up',
    items: [
      { id: 'hat', name: 'Hat', emoji: '🎩', color: 'bg-black' },
      { id: 'boots', name: 'Boots', emoji: '👢', color: 'bg-brown-400' },
      { id: 'cape', name: 'Cape', emoji: '🦸', color: 'bg-red-400' },
      { id: 'glasses', name: 'Glasses', emoji: '🤓', color: 'bg-blue-400' },
      { id: 'gloves', name: 'Gloves', emoji: '🧤', color: 'bg-purple-400' },
    ]
  },
  {
    id: 'magic-potion',
    title: 'Magic Potion',
    description: 'Mix the magical ingredients in order',
    background: 'bg-gradient-to-br from-purple-100 to-green-200',
    category: 'magic',
    items: [
      { id: 'crystal', name: 'Magic Crystal', emoji: '💎', color: 'bg-blue-400' },
      { id: 'mushroom', name: 'Mushroom', emoji: '🍄', color: 'bg-red-400' },
      { id: 'feather', name: 'Phoenix Feather', emoji: '🪶', color: 'bg-orange-400' },
      { id: 'potion', name: 'Base Potion', emoji: '🧪', color: 'bg-green-400' },
      { id: 'sparkles', name: 'Magic Dust', emoji: '✨', color: 'bg-yellow-400' },
    ]
  },
  {
    id: 'music-memory',
    title: 'Music Memory',
    description: 'Piano keys light up and play notes - recreate the melody',
    background: 'bg-gradient-to-br from-purple-100 to-pink-200',
    category: 'music',
    items: [
      { id: 'c', name: 'C', emoji: '🎹', color: 'bg-white' },
      { id: 'd', name: 'D', emoji: '🎹', color: 'bg-gray-100' },
      { id: 'e', name: 'E', emoji: '🎹', color: 'bg-white' },
      { id: 'f', name: 'F', emoji: '🎹', color: 'bg-gray-100' },
      { id: 'g', name: 'G', emoji: '🎹', color: 'bg-white' },
    ]
  },
  {
    id: 'pet-parade',
    title: 'Pet Parade',
    description: 'Animals run past in sequence - drag them back in correct order',
    background: 'bg-gradient-to-br from-green-100 to-yellow-200',
    category: 'animals',
    items: [
      { id: 'dog', name: 'Dog', emoji: '🐕', color: 'bg-brown-300' },
      { id: 'cat', name: 'Cat', emoji: '🐱', color: 'bg-orange-300' },
      { id: 'rabbit', name: 'Rabbit', emoji: '🐰', color: 'bg-white' },
      { id: 'hamster', name: 'Hamster', emoji: '🐹', color: 'bg-yellow-300' },
      { id: 'bird', name: 'Bird', emoji: '🐦', color: 'bg-blue-300' },
    ]
  },
  {
    id: 'shadow-match',
    title: 'Shadow Match',
    description: 'Show shadow shapes briefly, then match real objects to shadows',
    background: 'bg-gradient-to-br from-gray-100 to-blue-200',
    category: 'shapes',
    items: [
      { id: 'tree', name: 'Tree', emoji: '🌳', color: 'bg-green-400' },
      { id: 'house', name: 'House', emoji: '🏠', color: 'bg-red-400' },
      { id: 'car', name: 'Car', emoji: '🚗', color: 'bg-blue-400' },
      { id: 'umbrella', name: 'Umbrella', emoji: '☂️', color: 'bg-purple-400' },
      { id: 'balloon', name: 'Balloon', emoji: '🎈', color: 'bg-pink-400' },
    ]
  },
  {
    id: 'story-recall',
    title: 'Story Recall',
    description: 'Short story plays, then quiz on key details',
    background: 'bg-gradient-to-br from-yellow-100 to-orange-200',
    category: 'story',
    items: [
      { id: 'character', name: 'Character', emoji: '👦', color: 'bg-pink-300' },
      { id: 'place', name: 'Place', emoji: '🏰', color: 'bg-blue-300' },
      { id: 'object', name: 'Object', emoji: '⚡', color: 'bg-yellow-300' },
      { id: 'action', name: 'Action', emoji: '🏃', color: 'bg-green-300' },
      { id: 'ending', name: 'Ending', emoji: '🌟', color: 'bg-purple-300' },
    ]
  },
  {
    id: 'laundry-line',
    title: 'Laundry Line',
    description: 'Clothes hang in sequence, wind blows them away - rehang in order',
    background: 'bg-gradient-to-br from-blue-100 to-white',
    category: 'daily-life',
    items: [
      { id: 'shirt', name: 'Shirt', emoji: '👕', color: 'bg-blue-300' },
      { id: 'pants', name: 'Pants', emoji: '👖', color: 'bg-indigo-300' },
      { id: 'socks', name: 'Socks', emoji: '🧦', color: 'bg-red-300' },
      { id: 'towel', name: 'Towel', emoji: '🛁', color: 'bg-white' },
      { id: 'dress', name: 'Dress', emoji: '👗', color: 'bg-pink-300' },
    ]
  }
];

const getTitleByScore = (score: number): string => {
  if (score >= 50) return 'Mind Reader';
  if (score >= 40) return 'Genius';
  if (score >= 30) return 'Smarty';
  if (score >= 20) return 'Thinker';
  return 'Newbie';
};

const MemoryGame: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState<GameScenario | null>(null);
  const [gamePhase, setGamePhase] = useState<'menu' | 'watching' | 'answering' | 'feedback' | 'loading'>('menu');
  const [sequence, setSequence] = useState<GameItem[]>([]);
  const [playerSequence, setPlayerSequence] = useState<GameItem[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [draggedItem, setDraggedItem] = useState<GameItem | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [playedScenarios, setPlayedScenarios] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const { toast } = useToast();

  const generateSequence = useCallback((scenario: GameScenario) => {
    const sequenceLength = Math.min(3 + Math.floor(score / 10), 5);
    const newSequence: GameItem[] = [];
    for (let i = 0; i < sequenceLength; i++) {
      const randomItem = scenario.items[Math.floor(Math.random() * scenario.items.length)];
      newSequence.push(randomItem);
    }
    return newSequence;
  }, [score]);

  const getRecommendedScenario = useCallback(() => {
    const unplayedScenarios = gameScenarios.filter(scenario => !playedScenarios.has(scenario.id));
    if (unplayedScenarios.length === 0) {
      // All scenarios played, recommend a random one
      return gameScenarios[Math.floor(Math.random() * gameScenarios.length)];
    }
    
    // Smart recommendation based on performance
    if (score >= 40) {
      // High performers get challenging scenarios
      const challengingScenarios = unplayedScenarios.filter(s => 
        ['alien-translator', 'magic-potion', 'story-recall', 'shadow-match'].includes(s.id)
      );
      if (challengingScenarios.length > 0) {
        return challengingScenarios[Math.floor(Math.random() * challengingScenarios.length)];
      }
    } else if (score >= 20) {
      // Medium performers get varied scenarios
      const mediumScenarios = unplayedScenarios.filter(s => 
        ['music-memory', 'pet-parade', 'costume-closet', 'birthday-cake'].includes(s.id)
      );
      if (mediumScenarios.length > 0) {
        return mediumScenarios[Math.floor(Math.random() * mediumScenarios.length)];
      }
    }
    
    // Default to any unplayed scenario
    return unplayedScenarios[Math.floor(Math.random() * unplayedScenarios.length)];
  }, [playedScenarios, score]);

  const startGame = (scenario: GameScenario) => {
    setIsLoading(true);
    setGamePhase('loading');
    
    setTimeout(() => {
      const newSequence = generateSequence(scenario);
      setCurrentScenario(scenario);
      setSequence(newSequence);
      setPlayerSequence([]);
      setCurrentStep(0);
      setGamePhase('watching');
      setFeedback('');
      setIsLoading(false);
    }, 500);
  };

  const showSequence = useCallback(() => {
    if (currentStep < sequence.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setGamePhase('answering');
      setTimeLeft(30);
    }
  }, [currentStep, sequence.length]);

  useEffect(() => {
    if (gamePhase === 'watching') {
      showSequence();
    }
  }, [gamePhase, showSequence]);

  useEffect(() => {
    if (gamePhase === 'answering' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      checkAnswer();
    }
  }, [gamePhase, timeLeft]);

  const checkAnswer = () => {
    const isCorrect = playerSequence.length === sequence.length &&
      playerSequence.every((item, index) => item.id === sequence[index].id);
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      setFeedback('Excellent! Well done! 🎉');
      setShowCelebration(true);
      
      // Mark scenario as played
      if (currentScenario) {
        setPlayedScenarios(prev => new Set([...prev, currentScenario.id]));
      }
      
      // Show success toast
      toast({
        title: "Great job!",
        description: "You got the sequence right! 🌟",
      });
      
      setTimeout(() => setShowCelebration(false), 2000);
    } else {
      setFeedback('Not quite right. Try again! 🤔');
      
      // Show encouragement toast
      toast({
        title: "Keep trying!",
        description: "You'll get it next time! 💪",
        variant: "default",
      });
    }
    setGamePhase('feedback');
  };

  const handleDragStart = (item: GameItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItem && index < sequence.length) {
      const newPlayerSequence = [...playerSequence];
      newPlayerSequence[index] = draggedItem;
      setPlayerSequence(newPlayerSequence);
      setDraggedItem(null);
    }
  };

  const removeFromSequence = (index: number) => {
    const newPlayerSequence = [...playerSequence];
    newPlayerSequence.splice(index, 1);
    setPlayerSequence(newPlayerSequence);
  };

  const goToMainMenu = () => {
    setGamePhase('menu');
    setCurrentScenario(null);
    setSequence([]);
    setPlayerSequence([]);
    setCurrentStep(0);
    setFeedback('');
    setTimeLeft(30);
  };

  if (gamePhase === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-200 via-orange-100 to-brown-200 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🏕️</div>
          <p className="text-2xl font-bold text-brown-800">Loading adventure...</p>
        </div>
      </div>
    );
  }

  if (gamePhase === 'menu') {
    const completedCount = playedScenarios.size;
    const totalScenarios = gameScenarios.length;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-200 via-orange-100 to-brown-200 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="absolute top-4 right-4 bg-white/80 rounded-lg px-4 py-2 shadow-lg border-2 border-brown-300">
              <p className="text-lg font-bold text-brown-800">Score: {score}</p>
              <p className="text-sm text-brown-600">{getTitleByScore(score)}</p>
            </div>
            
            <div className="absolute top-4 left-4 bg-white/80 rounded-lg px-4 py-2 shadow-lg border-2 border-brown-300">
              <p className="text-sm font-bold text-brown-800">Progress</p>
              <p className="text-lg text-brown-600">{completedCount}/{totalScenarios}</p>
              <div className="w-20 bg-brown-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedCount / totalScenarios) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-brown-800 mb-4 text-shadow-lg">
              🏕️ Camp Memory Challenge
            </h1>
            <p className="text-xl text-brown-700 mb-8">
              Test your memory skills with these camping survival challenges!
            </p>
            
            {completedCount > 0 && (
              <div className="mb-6 p-4 bg-green-100 rounded-2xl border-2 border-green-300">
                <p className="text-green-800 font-bold">
                  🌟 You've completed {completedCount} challenges! Keep going!
                </p>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {gameScenarios.map((scenario) => {
              const isCompleted = playedScenarios.has(scenario.id);
              return (
                <Card 
                  key={scenario.id}
                  className={`${scenario.background} p-4 border-2 border-brown-300 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 relative ${
                    isCompleted ? 'ring-2 ring-green-500' : ''
                  }`}
                  onClick={() => startGame(scenario)}
                >
                  {isCompleted && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg">
                      ✓
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-brown-800 mb-2">
                    {scenario.title}
                  </h3>
                  <p className="text-brown-700 mb-3 text-xs">
                    {scenario.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {scenario.items.slice(0, 3).map((item) => (
                      <span 
                        key={item.id}
                        className="text-xl"
                      >
                        {item.emoji}
                      </span>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
          
          {completedCount === totalScenarios && (
            <div className="text-center mt-8 p-6 bg-yellow-100 rounded-2xl border-2 border-yellow-300">
              <h2 className="text-3xl font-bold text-yellow-800 mb-2">🏆 Congratulations!</h2>
              <p className="text-yellow-700">You've mastered all camping challenges!</p>
              <Button 
                onClick={() => setPlayedScenarios(new Set())}
                className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                Start Fresh Adventure
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (gamePhase === 'watching') {
    return (
      <div className={`min-h-screen ${currentScenario?.background} p-8`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="absolute top-4 right-4 bg-white/80 rounded-lg px-4 py-2 shadow-lg border-2 border-brown-300">
            <p className="text-lg font-bold text-brown-800">Score: {score}</p>
            <p className="text-sm text-brown-600">{getTitleByScore(score)}</p>
          </div>
          
          <h2 className="text-4xl font-bold text-brown-800 mb-4">
            {currentScenario?.title}
          </h2>
          <p className="text-xl text-brown-700 mb-8">
            Watch carefully and remember the sequence!
          </p>
          
          <div className="flex justify-center items-center gap-4 mb-8">
            {sequence.map((item, index) => (
              <div
                key={index}
                className={`w-24 h-24 ${item.color} rounded-2xl border-2 border-brown-300 flex flex-col items-center justify-center shadow-lg transition-all duration-500 ${
                  index < currentStep 
                    ? 'scale-110 shadow-2xl' 
                    : index === currentStep 
                    ? 'scale-125 shadow-2xl animate-pulse' 
                    : 'blur-sm opacity-50'
                }`}
              >
                <span className="text-3xl mb-1">{item.emoji}</span>
                <span className="text-xs font-bold text-brown-800">{item.name}</span>
              </div>
            ))}
          </div>
          
          <p className="text-lg text-brown-700">
            Step {currentStep} of {sequence.length}
          </p>
        </div>
      </div>
    );
  }

  if (gamePhase === 'answering') {
    return (
      <div className={`min-h-screen ${currentScenario?.background} p-8`}>
        <div className="max-w-4xl mx-auto">
          <div className="absolute top-4 right-4 bg-white/80 rounded-lg px-4 py-2 shadow-lg border-2 border-brown-300">
            <p className="text-lg font-bold text-brown-800">Score: {score}</p>
            <p className="text-sm text-brown-600">{getTitleByScore(score)}</p>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-brown-800 mb-4">
              Now it's your turn!
            </h2>
            <p className="text-xl text-brown-700 mb-4">
              Drag the items to recreate the sequence
            </p>
            <div className="bg-red-400 text-white px-4 py-2 rounded-lg font-bold text-xl">
              Time: {timeLeft}s
            </div>
          </div>

          {/* Available items */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-brown-800 mb-4 text-center">Available Items:</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              {currentScenario?.items.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  className={`w-20 h-20 ${item.color} rounded-2xl border-2 border-brown-300 flex flex-col items-center justify-center shadow-lg cursor-grab hover:scale-105 transition-transform`}
                >
                  <span className="text-2xl mb-1">{item.emoji}</span>
                  <span className="text-xs font-bold text-brown-800">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Drop zones */}
          <div className="flex justify-center gap-4 flex-wrap">
            {sequence.map((_, index) => (
              <div
                key={index}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onClick={() => playerSequence[index] && removeFromSequence(index)}
                className="w-24 h-24 border-4 border-dashed border-brown-400 rounded-2xl flex flex-col items-center justify-center bg-white/50 shadow-lg relative cursor-pointer"
              >
                {playerSequence[index] ? (
                  <div className={`w-full h-full ${playerSequence[index].color} rounded-xl flex flex-col items-center justify-center`}>
                    <span className="text-2xl mb-1">{playerSequence[index].emoji}</span>
                    <span className="text-xs font-bold text-brown-800">{playerSequence[index].name}</span>
                  </div>
                ) : (
                  <span className="text-brown-600 font-bold">{index + 1}</span>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              onClick={checkAnswer}
              disabled={playerSequence.length !== sequence.length}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-xl rounded-2xl border-2 border-brown-300"
            >
              Check Answer
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gamePhase === 'feedback') {
    const recommendedScenario = getRecommendedScenario();
    
    return (
      <div className={`min-h-screen ${currentScenario?.background} p-8`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="absolute top-4 right-4 bg-white/80 rounded-lg px-4 py-2 shadow-lg border-2 border-brown-300">
            <p className="text-lg font-bold text-brown-800">Score: {score}</p>
            <p className="text-sm text-brown-600">{getTitleByScore(score)}</p>
          </div>
          
          <div className={`bg-white/80 rounded-3xl p-8 shadow-2xl border-2 border-brown-300 mb-8 ${
            showCelebration ? 'animate-pulse bg-green-100' : ''
          }`}>
            <h2 className="text-4xl font-bold text-brown-800 mb-4">
              {feedback}
            </h2>
            
            {showCelebration && (
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
            )}
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-brown-800 mb-4">The correct sequence was:</h3>
              <div className="flex justify-center gap-4 flex-wrap">
                {sequence.map((item, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 ${item.color} rounded-2xl border-2 border-brown-300 flex flex-col items-center justify-center shadow-lg`}
                  >
                    <span className="text-2xl mb-1">{item.emoji}</span>
                    <span className="text-xs font-bold text-brown-800">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <Button 
              onClick={() => startGame(currentScenario!)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-xl rounded-2xl border-2 border-brown-300"
            >
              Try Again
            </Button>
            
            {recommendedScenario && recommendedScenario.id !== currentScenario?.id && (
              <Button 
                onClick={() => startGame(recommendedScenario)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-xl rounded-2xl border-2 border-brown-300"
              >
                Try {recommendedScenario.title}
              </Button>
            )}
            
            <Button 
              onClick={goToMainMenu}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-xl rounded-2xl border-2 border-brown-300"
            >
              Main Menu
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-white/60 rounded-2xl border-2 border-brown-300">
            <p className="text-brown-700">
              Progress: {playedScenarios.size}/{gameScenarios.length} scenarios completed
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MemoryGame;
