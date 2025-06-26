import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Toaster } from './ui/toaster';
import { TooltipProvider } from './ui/tooltip';
import { Palette, Brush, Brain, Trophy, Star } from 'lucide-react';

type GameMode = 'menu' | 'colorQuiz' | 'artStyleQuiz' | 'drawing';

// Color Quiz Component
const ColorQuiz: React.FC<{ onAddScore: (points: number) => void }> = ({ onAddScore }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "What color do you get when you mix red and blue?",
      options: ["Green", "Purple", "Orange", "Yellow"],
      correct: 1
    },
    {
      question: "What is the opposite of green on the color wheel?",
      options: ["Blue", "Red", "Purple", "Orange"],
      correct: 1
    },
    {
      question: "What color represents #FF0000 in hex?",
      options: ["Blue", "Green", "Red", "Yellow"],
      correct: 2
    }
  ];

  const handleAnswer = (selected: number) => {
    if (selected === questions[currentQuestion].correct) {
      setScore(score + 10);
      onAddScore(10);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="text-center p-8">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">Quiz Complete!</h2>
        <p className="text-xl text-purple-600 mb-4">Your score: {score}/{questions.length * 10}</p>
        <Button onClick={() => setShowResult(false)} className="bg-purple-600 hover:bg-purple-700">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Color Quest</h2>
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h3>
        <div className="grid grid-cols-2 gap-4">
          {questions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-4 h-auto"
            >
              {option}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

// Art Style Quiz Component
const ArtStyleQuiz: React.FC<{ onAddScore: (points: number) => void }> = ({ onAddScore }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "Which art style uses bright, bold colors and simple shapes?",
      options: ["Realism", "Pop Art", "Impressionism", "Abstract"],
      correct: 1
    },
    {
      question: "What style is known for its dreamlike, surreal imagery?",
      options: ["Cubism", "Surrealism", "Minimalism", "Baroque"],
      correct: 1
    },
    {
      question: "Which style focuses on capturing light and movement?",
      options: ["Impressionism", "Gothic", "Renaissance", "Modernism"],
      correct: 0
    }
  ];

  const handleAnswer = (selected: number) => {
    if (selected === questions[currentQuestion].correct) {
      setScore(score + 10);
      onAddScore(10);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="text-center p-8">
        <h2 className="text-3xl font-bold text-green-700 mb-4">Quiz Complete!</h2>
        <p className="text-xl text-green-600 mb-4">Your score: {score}/{questions.length * 10}</p>
        <Button onClick={() => setShowResult(false)} className="bg-green-600 hover:bg-green-700">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">Style Detective</h2>
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h3>
        <div className="grid grid-cols-2 gap-4">
          {questions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              className="bg-green-100 hover:bg-green-200 text-green-800 p-4 h-auto"
            >
              {option}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

// Drawing Canvas Component
const DrawingCanvas: React.FC<{ onAddScore: (points: number) => void }> = ({ onAddScore }) => {
  const [drawing, setDrawing] = useState<string>('');

  const handleSave = () => {
    onAddScore(5);
    alert('Drawing saved! +5 points');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Art Studio</h2>
      <Card className="p-6">
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg h-64 mb-4 flex items-center justify-center">
          <p className="text-gray-500">Drawing canvas would go here</p>
        </div>
        <div className="flex gap-4">
          <Button onClick={handleSave} className="bg-pink-600 hover:bg-pink-700">
            Save Drawing
          </Button>
          <Button variant="outline">Clear Canvas</Button>
        </div>
      </Card>
    </div>
  );
};

// Main Artsy Quiz Component
const QuiteArtsy: React.FC = () => {
  const [gameMode, setGameMode] = useState<GameMode>('menu');
  const [score, setScore] = useState(0);

  const handleModeSelect = (mode: GameMode) => {
    setGameMode(mode);
  };

  const handleBackToMenu = () => {
    setGameMode('menu');
  };

  const addScore = (points: number) => {
    setScore(prev => prev + points);
  };

  if (gameMode === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-3 bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200">
        <div className="text-center mb-6">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 mb-2 drop-shadow-lg transform -rotate-1"
              style={{
                fontFamily: 'Comic Sans MS, cursive',
                textShadow: '3px 3px 0 rgba(0,0,0,0.1)',
                letterSpacing: '2px'
              }}>
            Quite Artsy
          </h1>
          <p className="text-xl md:text-2xl text-purple-700 font-bold mb-4 italic transform rotate-1"
             style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            A peaceful mess of color and expression
          </p>
          <div className="flex items-center justify-center gap-3 text-2xl font-bold text-purple-700 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <Trophy size={32} className="text-yellow-500" />
            <Star size={24} className="text-yellow-400" />
            <span style={{ fontFamily: 'Comic Sans MS, cursive' }}>Score: {score}</span>
            <Star size={24} className="text-yellow-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl w-full px-4">
          <Card className="p-4 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 cursor-pointer bg-gradient-to-br from-blue-100 to-blue-200 border-4 border-blue-300 rounded-3xl"
                onClick={() => handleModeSelect('colorQuiz')}>
            <Palette className="mx-auto mb-3 text-blue-600 drop-shadow-md" size={56} />
            <h2 className="text-2xl md:text-3xl font-black text-blue-800 mb-2 transform -rotate-1"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}>Color Quest</h2>
            <p className="text-blue-700 font-semibold text-sm"
               style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Mix colors, crack hex codes, and find opposites!
            </p>
          </Card>

          <Card className="p-4 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 cursor-pointer bg-gradient-to-br from-green-100 to-green-200 border-4 border-green-300 rounded-3xl"
                onClick={() => handleModeSelect('artStyleQuiz')}>
            <Brain className="mx-auto mb-3 text-green-600 drop-shadow-md" size={56} />
            <h2 className="text-2xl md:text-3xl font-black text-green-800 mb-2 transform rotate-1"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}>Style Detective</h2>
            <p className="text-green-700 font-semibold text-sm"
               style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Spot cartoon, retro, and artistic styles!
            </p>
          </Card>

          <Card className="p-4 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 cursor-pointer bg-gradient-to-br from-pink-100 to-pink-200 border-4 border-pink-300 rounded-3xl"
                onClick={() => handleModeSelect('drawing')}>
            <Brush className="mx-auto mb-3 text-pink-600 drop-shadow-md" size={56} />
            <h2 className="text-2xl md:text-3xl font-black text-pink-800 mb-2 transform -rotate-1"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}>Art Studio</h2>
            <p className="text-pink-700 font-semibold text-sm"
               style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Draw amazing emojis and unleash creativity!
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-3 bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Button 
            onClick={handleBackToMenu}
            variant="outline"
            className="bg-white/90 hover:bg-white border-3 border-purple-400 text-purple-700 font-bold rounded-full px-6 py-3 text-lg shadow-lg transform hover:scale-105 transition-all"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            ← Back to Menu
          </Button>
          <div className="flex items-center gap-3 text-xl font-bold text-purple-700 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <Trophy size={28} className="text-yellow-500" />
            <Star size={20} className="text-yellow-400" />
            <span style={{ fontFamily: 'Comic Sans MS, cursive' }}>Score: {score}</span>
            <Star size={20} className="text-yellow-400" />
          </div>
        </div>

        {gameMode === 'colorQuiz' && <ColorQuiz onAddScore={addScore} />}
        {gameMode === 'artStyleQuiz' && <ArtStyleQuiz onAddScore={addScore} />}
        {gameMode === 'drawing' && <DrawingCanvas onAddScore={addScore} />}
      </div>
    </div>
  );
};

const ArtsyQuizEmbed: React.FC = () => {
  return (
    <TooltipProvider>
      <QuiteArtsy />
      <Toaster />
    </TooltipProvider>
  );
};

export default ArtsyQuizEmbed;