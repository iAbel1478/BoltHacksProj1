
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Cross, Heart, Star } from 'lucide-react';

const GameHeader: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-wood-600 via-wood-500 to-wood-600 py-6 px-4 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Cross className="w-8 h-8 text-biblical-gold animate-bounce-gentle" />
            <h1 className="bubble-text text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              LFC
            </h1>
            <Cross className="w-8 h-8 text-biblical-gold animate-bounce-gentle" />
          </div>
          <h2 className="bubble-text text-xl md:text-2xl text-biblical-cream mb-2">
            Living for Christ
          </h2>
          <p className="text-wood-100 text-sm md:text-base max-w-2xl mx-auto">
            Test your knowledge of God's Word and learn how to live for Jesus every day!
          </p>
        </div>
        
        <Card className="mt-6 scroll-border bg-biblical-cream/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-6 text-biblical-dark-brown">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="font-semibold">Learn</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-biblical-gold" />
                <span className="font-semibold">Grow</span>
              </div>
              <div className="flex items-center gap-2">
                <Cross className="w-5 h-5 text-biblical-sage" />
                <span className="font-semibold">Follow</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GameHeader;
