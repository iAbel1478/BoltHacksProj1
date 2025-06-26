import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ArtStyleQuestion {
  style: string;
  description: string;
  example: string;
  options: string[];
  correct: string;
}

interface ArtStyleQuizProps {
  onAddScore: (points: number) => void;
}

export const ArtStyleQuiz: React.FC<ArtStyleQuizProps> = ({ onAddScore }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answerSelected, setAnswerSelected] = useState(false);

  const questions: ArtStyleQuestion[] = [
    {
      style: 'Cartoon',
      description: 'Bright colors, simple shapes, exaggerated features, and playful characters',
      example: '🎨 Think Disney movies or comic books!',
      options: ['Cartoon', 'Minimalistic', 'Retro', 'Abstract'],
      correct: 'Cartoon'
    },
    {
      style: 'Minimalistic',
      description: 'Simple lines, lots of white space, limited colors, and clean design',
      example: '📱 Think modern app icons or simple logos!',
      options: ['Baroque', 'Minimalistic', 'Cartoon', 'Surreal'],
      correct: 'Minimalistic'
    },
    {
      style: 'Retro',
      description: 'Vintage colors, old-fashioned fonts, and nostalgic design from the past',
      example: '📻 Think 80s neon signs or vintage posters!',
      options: ['Modern', 'Retro', 'Futuristic', 'Classical'],
      correct: 'Retro'
    },
    {
      style: 'Abstract',
      description: 'Non-realistic shapes, bold colors, and creative interpretations',
      example: '🌀 Think Picasso or colorful geometric patterns!',
      options: ['Realistic', 'Abstract', 'Portrait', 'Landscape'],
      correct: 'Abstract'
    },
    {
      style: 'Pop Art',
      description: 'Bold colors, celebrity images, and commercial art style like Andy Warhol',
      example: '💥 Think bright Campbell soup cans or colorful Marilyn Monroe!',
      options: ['Pop Art', 'Classical', 'Impressionist', 'Gothic'],
      correct: 'Pop Art'
    },
    {
      style: 'Impressionist',
      description: 'Soft brush strokes, light effects, and dreamy outdoor scenes',
      example: '🌸 Think Monet water lilies or sunny garden paintings!',
      options: ['Cubist', 'Impressionist', 'Surreal', 'Digital'],
      correct: 'Impressionist'
    },
    {
      style: 'Pixel Art',
      description: 'Made of tiny square pixels, like old video games and computer graphics',
      example: '🎮 Think Super Mario or Minecraft characters!',
      options: ['Pixel Art', 'Vector', 'Watercolor', 'Oil Painting'],
      correct: 'Pixel Art'
    },
    {
      style: 'Kawaii',
      description: 'Super cute Japanese style with big eyes, pastel colors, and adorable characters',
      example: '🐱 Think Hello Kitty or cute anime characters!',
      options: ['Gothic', 'Kawaii', 'Realistic', 'Industrial'],
      correct: 'Kawaii'
    },
    {
      style: 'Street Art',
      description: 'Bold graffiti style with spray paint effects and urban themes',
      example: '🏙️ Think colorful wall murals and graffiti tags!',
      options: ['Street Art', 'Renaissance', 'Baroque', 'Classical'],
      correct: 'Street Art'
    },
    {
      style: 'Doodle',
      description: 'Playful hand-drawn style with sketchy lines and fun characters',
      example: '✏️ Think notebook margin drawings or fun sketches!',
      options: ['Photorealistic', 'Doodle', 'Formal', 'Academic'],
      correct: 'Doodle'
    }
  ];

  const handleAnswer = (selectedAnswer: string) => {
    if (answerSelected) return; // Prevent multiple selections
    
    setAnswerSelected(true);
    const current = questions[currentQuestion];
    const isCorrect = selectedAnswer === current.correct;
    
    if (isCorrect) {
      toast.success('Excellent! You know your art styles! 🎨 +15 points!');
      onAddScore(15);
      setCorrectAnswers(prev => prev + 1);
    } else {
      toast.error(`Not quite! This is ${current.correct} style 🎭 -10 points`);
      onAddScore(-10);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswerSelected(false);
      } else {
        // Quiz finished
        const percentage = (correctAnswers + (isCorrect ? 1 : 0)) / questions.length * 100;
        let message = '';
        if (percentage >= 90) message = '🌟 Incredible! You\'re an art style expert! You have amazing artistic knowledge!';
        else if (percentage >= 70) message = '🎨 Fantastic work! You really understand different art styles! Keep exploring art!';
        else if (percentage >= 50) message = '😊 Good job! You\'re learning about art styles! Every artist grows with practice!';
        else message = '🌈 Great effort! Art has so many styles to discover! Keep looking at different artworks!';
        
        toast.success(message);
        setCurrentQuestion(0);
        setCorrectAnswers(0);
        setAnswerSelected(false);
      }
    }, 2000);
  };

  const question = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6 bg-white/95 backdrop-blur border-4 border-green-300 rounded-3xl shadow-2xl">
        <div className="mb-4">
          <div className="text-lg font-bold text-gray-700 mb-2 text-center"
               style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="text-8xl mb-4 text-center">🎨</div>
        <h2 className="text-3xl font-black mb-4 text-center text-green-800"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          What art style is this? ✨
        </h2>
        
        <div className="bg-gradient-to-r from-green-100 to-teal-100 p-6 rounded-3xl mb-6 border-3 border-green-200">
          <p className="text-xl text-gray-800 mb-2 font-bold text-center"
             style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            {question.description}
          </p>
          <p className="text-lg text-gray-700 text-center font-semibold"
             style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            {question.example}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={answerSelected}
              variant="outline"
              className={`p-4 text-lg font-bold border-3 border-green-300 hover:bg-green-100 hover:border-green-500 transition-all duration-200 rounded-2xl transform hover:scale-105 ${
                answerSelected ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              {option}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ArtStyleQuiz;
