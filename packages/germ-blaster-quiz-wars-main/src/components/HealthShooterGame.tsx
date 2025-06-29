import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Volume2, VolumeX } from 'lucide-react';
import ParticleSystem from './ParticleSystem';
import HealthBar from './HealthBar';
import BossEnemy from './BossEnemy';
import { QUESTIONS, getRandomQuestion, Question } from '../data/questions';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
  type: 'fragment' | 'bubble' | 'shard' | 'spore' | 'smoke';
}

interface Enemy {
  id: number;
  x: number;
  y: number;
  type: 'virus' | 'bacteria' | 'fungus' | 'parasite' | 'germ';
  question: Question;
  size: number;
  speed: number;
  direction: number;
  isBoss?: boolean;
  hitsRemaining?: number;
  spawnTime?: number;
}

interface Level {
  name: string;
  background: string;
  enemyTypes: string[];
  spawnRate: number;
  description: string;
}

const LEVELS: Level[] = [
  {
    name: "The Classroom",
    background: "bg-gradient-to-b from-blue-100 to-blue-200",
    enemyTypes: ["virus", "bacteria", "germ"],
    spawnRate: 2000,
    description: "Defend the classroom from knowledge-blocking germs!"
  },
  {
    name: "The Cafeteria",
    background: "bg-gradient-to-b from-green-100 to-green-200",
    enemyTypes: ["bacteria", "fungus", "parasite", "germ"],
    spawnRate: 1800,
    description: "Keep the cafeteria clean and healthy!"
  },
  {
    name: "The Locker Room",
    background: "bg-gradient-to-b from-yellow-100 to-yellow-200",
    enemyTypes: ["virus", "bacteria", "fungus", "parasite", "germ"],
    spawnRate: 1500,
    description: "The ultimate germ battleground!"
  }
];

const HealthShooterGame = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver'>('menu');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(50);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [selectedEnemy, setSelectedEnemy] = useState<Enemy | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [enemyCounter, setEnemyCounter] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [particleCounter, setParticleCounter] = useState(0);
  const [screenShake, setScreenShake] = useState(false);
  const [healthDecreaseTimer, setHealthDecreaseTimer] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [answerFeedback, setAnswerFeedback] = useState<'correct' | 'wrong' | null>(null);

  const maxHealth = 50;
  const isLowHealth = health <= 10;

  // Health decrease timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const healthTimer = setInterval(() => {
      setHealthDecreaseTimer(prev => {
        if (prev >= 2000) { // 2 seconds
          setHealth(current => Math.max(0, current - 1));
          return 0;
        }
        return prev + 100;
      });
    }, 100);

    return () => clearInterval(healthTimer);
  }, [gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameInterval = setInterval(() => {
      setEnemies(prevEnemies => {
        return prevEnemies.map(enemy => ({
          ...enemy,
          y: enemy.y + enemy.speed,
          x: enemy.x + Math.sin(enemy.y * 0.01) * enemy.direction
        })).filter(enemy => {
          if (enemy.y > 600) {
            // Only inflict damage if enemy has been alive for more than 10 seconds
            const enemyAge = Date.now() - (enemy.spawnTime || 0);
            if (enemyAge > 10000) { // 10 seconds instead of 5
              setHealth(prev => Math.max(0, prev - (enemy.isBoss ? 2 : 1)));
              triggerScreenShake();
            }
            return false;
          }
          return true;
        });
      });
    }, 50);

    return () => clearInterval(gameInterval);
  }, [gameState]);

  // Spawn enemies
  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawnInterval = setInterval(() => {
      const isBoss = Math.random() < 0.1; // 10% chance for boss
      const enemyType = LEVELS[currentLevel].enemyTypes[Math.floor(Math.random() * LEVELS[currentLevel].enemyTypes.length)];
      
      const newEnemy: Enemy = {
        id: enemyCounter,
        x: Math.random() * 700 + 50,
        y: -50,
        type: enemyType as any,
        question: getRandomQuestion(enemyType),
        size: isBoss ? 100 : Math.random() * 30 + 40,
        speed: isBoss ? 0.5 : Math.random() * 2 + 1,
        direction: (Math.random() - 0.5) * 2,
        isBoss,
        hitsRemaining: isBoss ? 3 : 1,
        spawnTime: Date.now()
      };

      setEnemies(prev => [...prev, newEnemy]);
      setEnemyCounter(prev => prev + 1);
    }, LEVELS[currentLevel].spawnRate);

    return () => clearInterval(spawnInterval);
  }, [gameState, currentLevel, enemyCounter]);

  // Check game over
  useEffect(() => {
    if (health <= 0) {
      setGameState('gameOver');
    }
  }, [health]);

  const triggerScreenShake = () => {
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 200);
  };

  const createParticles = (x: number, y: number, enemyType: string) => {
    const newParticles: Particle[] = [];
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = Math.random() * 5 + 2;
      
      let particleType: Particle['type'] = 'fragment';
      let color = '#ff6b6b';
      
      switch (enemyType) {
        case 'bacteria':
          particleType = 'bubble';
          color = '#4ecdc4';
          break;
        case 'virus':
          particleType = 'shard';
          color = '#ff6b6b';
          break;
        case 'fungus':
          particleType = 'spore';
          color = '#9b59b6';
          break;
        case 'parasite':
          particleType = 'smoke';
          color = '#f39c12';
          break;
        default:
          color = '#3498db';
      }
      
      newParticles.push({
        id: particleCounter + i,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        color,
        size: Math.random() * 8 + 4,
        life: 60,
        maxLife: 60,
        type: particleType
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    setParticleCounter(prev => prev + particleCount);
  };

  const handleParticleComplete = (id: number) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  };

  const playSound = (type: 'correct' | 'wrong' | 'blast' | 'boss-kill') => {
    if (!soundEnabled) return;
    console.log(`Playing ${type} sound effect`);
  };

  const handleEnemyClick = (enemy: Enemy) => {
    setSelectedEnemy(enemy);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!selectedEnemy) return;

    setSelectedAnswerIndex(answerIndex);
    const isCorrect = answerIndex === selectedEnemy.question.correctAnswer;
    setAnswerFeedback(isCorrect ? 'correct' : 'wrong');
    
    // Show feedback for a moment before proceeding
    setTimeout(() => {
      if (isCorrect) {
        playSound('correct');
        
        // Add 3 hearts for correct answer
        setHealth(prev => Math.min(maxHealth, prev + 3));
        
        if (selectedEnemy.isBoss) {
          const newHitsRemaining = (selectedEnemy.hitsRemaining || 1) - 1;
          
          if (newHitsRemaining <= 0) {
            // Boss defeated - removed screen shake
            playSound('boss-kill');
            setScore(prev => prev + 500);
            setHealth(prev => Math.min(maxHealth, prev + 2)); // Bonus hearts
            createParticles(selectedEnemy.x + selectedEnemy.size/2, selectedEnemy.y + selectedEnemy.size/2, selectedEnemy.type);
            setEnemies(prev => prev.filter(e => e.id !== selectedEnemy.id));
          } else {
            // Boss still alive, reduce hits remaining
            setEnemies(prev => prev.map(e => 
              e.id === selectedEnemy.id 
                ? { ...e, hitsRemaining: newHitsRemaining }
                : e
            ));
            setScore(prev => prev + 100);
          }
        } else {
          // Regular enemy defeated - removed screen shake
          playSound('blast');
          setScore(prev => prev + 100);
          createParticles(selectedEnemy.x + selectedEnemy.size/2, selectedEnemy.y + selectedEnemy.size/2, selectedEnemy.type);
          setEnemies(prev => prev.filter(e => e.id !== selectedEnemy.id));
        }
      } else {
        playSound('wrong');
        // Make enemy grow larger and faster (but not bosses)
        if (!selectedEnemy.isBoss) {
          setEnemies(prev => prev.map(e => 
            e.id === selectedEnemy.id 
              ? { ...e, size: e.size * 1.2, speed: e.speed * 1.1 }
              : e
          ));
        }
      }

      // Reset feedback and close modal
      setSelectedEnemy(null);
      setSelectedAnswerIndex(null);
      setAnswerFeedback(null);
    }, 800); // Show feedback for 800ms
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setHealth(50);
    setEnemies([]);
    setCurrentLevel(0);
    setSelectedEnemy(null);
    setParticles([]);
    setHealthDecreaseTimer(0);
    setSelectedAnswerIndex(null);
    setAnswerFeedback(null);
  };

  const nextLevel = () => {
    if (currentLevel < LEVELS.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setEnemies([]);
    }
  };

  const getEnemyEmoji = (type: string) => {
    switch (type) {
      case 'virus': return '🦠';
      case 'bacteria': return '🔬';
      case 'fungus': return '🍄';
      case 'parasite': return '🪱';
      default: return '💊';
    }
  };

  const getEnemyColor = (type: string) => {
    switch (type) {
      case 'virus': return 'bg-red-400';
      case 'bacteria': return 'bg-green-400';
      case 'fungus': return 'bg-purple-400';
      case 'parasite': return 'bg-orange-400';
      default: return '💊';
    }
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md w-full">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-purple-800 mb-2">🦠 Germ Blaster 🎯</h1>
            <p className="text-gray-600">Learn health facts while blasting germs!</p>
          </div>
          
          <div className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">How to Play:</h2>
            <ul className="text-left text-sm space-y-2">
              <li>🎯 Click on germs to see health questions</li>
              <li>✅ Choose the correct answer to blast them</li>
              <li>❌ Wrong answers make germs grow stronger</li>
              <li>👑 Defeat BOSS enemies for bonus hearts!</li>
              <li>💖 Health slowly decreases - keep fighting!</li>
            </ul>
          </div>

          <Button onClick={startGame} className="w-full text-lg">
            Start Game! 🚀
          </Button>
        </Card>
      </div>
    );
  }

  if (gameState === 'gameOver') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md w-full">
          <h1 className="text-3xl font-bold text-red-800 mb-4">Game Over! 💀</h1>
          <p className="text-xl mb-4">Final Score: {score}</p>
          <p className="text-gray-600 mb-6">The germs have taken over! Try again to save the school!</p>
          <Button onClick={startGame} className="w-full">
            Play Again 🔄
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${LEVELS[currentLevel].background} relative overflow-hidden ${screenShake ? 'animate-bounce-intense' : ''}`}>
      {/* HUD */}
      <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="text-lg px-3 py-1">
            Score: {score}
          </Badge>
          <HealthBar health={health} maxHealth={maxHealth} isLowHealth={isLowHealth} />
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="px-3 py-1">
            {LEVELS[currentLevel].name}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Game Area */}
      <div className="pt-20 h-screen relative">
        {/* Regular Enemies */}
        {enemies.filter(enemy => !enemy.isBoss).map(enemy => (
          <div
            key={enemy.id}
            className={`absolute cursor-pointer transform transition-transform hover:scale-110 ${getEnemyColor(enemy.type)} rounded-full flex items-center justify-center shadow-lg animate-pulse`}
            style={{
              left: `${enemy.x}px`,
              top: `${enemy.y}px`,
              width: `${enemy.size}px`,
              height: `${enemy.size}px`,
              willChange: 'transform'
            }}
            onClick={() => handleEnemyClick(enemy)}
          >
            <span className="text-2xl">{getEnemyEmoji(enemy.type)}</span>
          </div>
        ))}

        {/* Boss Enemies */}
        {enemies.filter(enemy => enemy.isBoss).map(enemy => (
          <BossEnemy
            key={enemy.id}
            boss={enemy}
            onClick={() => handleEnemyClick(enemy)}
            getGermEmoji={getEnemyEmoji}
            getGermColor={getEnemyColor}
          />
        ))}

        {/* Particle System */}
        <ParticleSystem particles={particles} onParticleComplete={handleParticleComplete} />

        {/* Crosshair */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <Target className="w-8 h-8 text-white opacity-50" />
        </div>
      </div>

      {/* Question Modal */}
      {selectedEnemy && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
          <Card className="p-6 max-w-md w-full animate-scale-in" style={{ willChange: 'transform' }}>
            <div className="text-center mb-4">
              <div className="text-4xl mb-2 flex items-center justify-center">
                {getEnemyEmoji(selectedEnemy.type)}
                {selectedEnemy.isBoss && <span className="ml-2 text-2xl">👑</span>}
              </div>
              <h3 className="text-lg font-semibold">{selectedEnemy.question.question}</h3>
              {selectedEnemy.isBoss && (
                <p className="text-sm text-yellow-600 mt-2">
                  Boss Enemy! Hits remaining: {selectedEnemy.hitsRemaining}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              {selectedEnemy.question.options.map((option, index) => {
                let buttonVariant: "outline" | "default" | "destructive" = "outline";
                let buttonClassName = "w-full text-left justify-start hover:bg-blue-50 transition-colors";
                
                if (selectedAnswerIndex === index && answerFeedback) {
                  if (answerFeedback === 'correct') {
                    buttonClassName = "w-full text-left justify-start bg-green-500 text-white hover:bg-green-600 transition-colors";
                  } else if (answerFeedback === 'wrong') {
                    buttonClassName = "w-full text-left justify-start bg-red-500 text-white hover:bg-red-600 transition-colors";
                  }
                }
                
                return (
                  <Button
                    key={index}
                    variant={buttonVariant}
                    className={buttonClassName}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={answerFeedback !== null}
                    style={{ willChange: 'transform' }}
                  >
                    {option}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="ghost"
              className="w-full mt-4"
              onClick={() => {
                setSelectedEnemy(null);
                setSelectedAnswerIndex(null);
                setAnswerFeedback(null);
              }}
              disabled={answerFeedback !== null}
            >
              Cancel
            </Button>
          </Card>
        </div>
      )}

      {/* Level Complete */}
      {score > 0 && score % 1000 === 0 && currentLevel < LEVELS.length - 1 && (
        <div className="absolute inset-0 bg-green-500 bg-opacity-90 flex items-center justify-center z-20">
          <Card className="p-8 text-center animate-scale-in" style={{ willChange: 'transform' }}>
            <h2 className="text-2xl font-bold text-green-800 mb-4">Level Complete! 🎉</h2>
            <p className="mb-4">Ready for the next level?</p>
            <Button onClick={nextLevel}>
              Next Level: {LEVELS[currentLevel + 1]?.name} ➡️
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HealthShooterGame;
