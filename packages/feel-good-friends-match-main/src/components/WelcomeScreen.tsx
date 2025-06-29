
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Smile, Star } from 'lucide-react';

interface WelcomeScreenProps {
  onStartGame: () => void;
}

const WelcomeScreen = ({ onStartGame }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 text-center bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <div className="mb-6">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
            <Smile className="w-10 h-10 text-yellow-400" />
            <Star className="w-8 h-8 text-blue-400 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-gray-700 mb-2">
            Feelings Friends
          </h1>
          <p className="text-xl text-gray-600">
            Let's learn about emotions together!
          </p>
        </div>
        
        <div className="mb-8">
          <p className="text-lg text-gray-600 mb-4">
            Match the faces with their feelings and discover how wonderful it is to understand emotions!
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="bg-yellow-100 p-4 rounded-full">
              <div className="text-4xl">😊</div>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <div className="text-4xl">😢</div>
            </div>
            <div className="bg-red-100 p-4 rounded-full">
              <div className="text-4xl">😠</div>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={onStartGame}
          className="text-xl px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white border-0 shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          Let's Play! 🌟
        </Button>
        
        <p className="text-sm text-gray-500 mt-6">
          Remember: All feelings are okay and normal! 💝
        </p>
      </Card>
    </div>
  );
};

export default WelcomeScreen;
