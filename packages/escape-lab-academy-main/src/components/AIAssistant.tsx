
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Beaker, MessageCircle, X, Lightbulb, Star, BookOpen } from 'lucide-react';

type RoomType = 'cell' | 'circuit' | 'chemistry' | 'dna';

interface AIAssistantProps {
  currentRoom: RoomType | null;
  showHint: boolean;
  completedObjectives: number;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ currentRoom, showHint, completedObjectives }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [hintLevel, setHintLevel] = useState(0);

  const progressiveHints = {
    cell: [
      "🔬 Start by dragging organelles to their correct positions in the cell diagram!",
      "🧬 The nucleus goes in the center, and the membrane forms the outer boundary.",
      "💡 Each organelle has a specific job - read the function questions carefully!"
    ],
    circuit: [
      "⚡ Build circuits step by step: Battery → Switch → Components → back to Battery",
      "🔋 Click components in the correct order to create electrical pathways.",
      "🔌 For parallel circuits, all LEDs should light up simultaneously."
    ],
    chemistry: [
      "⚖️ Balance equations by making sure atoms are equal on both sides!",
      "🧪 Start with the most complex molecule, then adjust the simpler ones.",
      "⚛️ Use the smallest whole number coefficients that balance the equation."
    ],
    dna: [
      "🧬 Remember: A pairs with T, G pairs with C in DNA!",
      "🔗 For RNA transcription: A→U, T→A, G→C, C→G",
      "📏 Fix mutations by replacing incorrect bases with the right ones."
    ]
  };

  const educationalFacts = [
    "🧬 Amazing! Your DNA contains about 3 billion base pairs!",
    "⚡ Fun fact: Your brain uses electrical signals to communicate!",
    "🧪 Cool! Water is the only substance that naturally exists as solid, liquid, and gas!",
    "🔬 Incredible: Mitochondria have their own DNA separate from the nucleus!",
    "⚛️ Wow! 99% of your body's mass comes from just 6 elements!",
    "🧬 Fascinating: If stretched out, your DNA would reach the sun and back 600 times!"
  ];

  const congratulatoryMessages = [
    "🎉 Outstanding work! You're thinking like a real scientist!",
    "⭐ Excellent! Your problem-solving skills are impressive!",
    "🏆 Fantastic job! You're mastering these concepts!",
    "🧠 Brilliant! Your scientific reasoning is spot-on!",
    "🎯 Perfect! Keep up the great work!",
    "🌟 Superb! Your knowledge is growing stronger!"
  ];

  useEffect(() => {
    // Show congratulatory messages
    if (completedObjectives > 0 && completedObjectives % 3 === 0) {
      const randomCongrats = congratulatoryMessages[Math.floor(Math.random() * congratulatoryMessages.length)];
      setCurrentMessage(randomCongrats);
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 4000);
    }
  }, [completedObjectives]);

  useEffect(() => {
    // Show educational facts periodically
    if (!currentRoom && Math.random() > 0.7) {
      const interval = setInterval(() => {
        const randomFact = educationalFacts[Math.floor(Math.random() * educationalFacts.length)];
        setCurrentMessage(randomFact);
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 6000);
      }, 25000);

      return () => clearInterval(interval);
    }
  }, [currentRoom]);

  useEffect(() => {
    if (showHint && currentRoom) {
      const roomHints = progressiveHints[currentRoom];
      if (roomHints) {
        setCurrentMessage(roomHints[hintLevel]);
        setIsVisible(true);
        setHintLevel((prev) => (prev + 1) % roomHints.length);
      }
    } else {
      setIsVisible(false);
      setHintLevel(0);
    }
  }, [showHint, currentRoom]);

  if (!isVisible) return null;

  const isHintMessage = showHint && currentRoom;
  const isEducationalFact = educationalFacts.includes(currentMessage);
  const isCongratulatory = congratulatoryMessages.includes(currentMessage);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="max-w-sm p-4 bg-gradient-to-r from-cyan-500/90 to-blue-500/90 backdrop-blur-lg border border-white/20 shadow-xl animate-scale-in">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              {isHintMessage ? (
                <Lightbulb className="w-6 h-6 text-yellow-300 animate-pulse" />
              ) : isCongratulatory ? (
                <Star className="w-6 h-6 text-yellow-300 animate-pulse" />
              ) : (
                <BookOpen className="w-6 h-6 text-white animate-pulse" />
              )}
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>Dr. Nova</span>
                {isHintMessage && (
                  <Badge className="text-xs bg-yellow-500/30 text-yellow-200">
                    Hint Lv.{hintLevel + 1}
                  </Badge>
                )}
              </h4>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-white/70 hover:text-white hover:bg-white/20"
                onClick={() => setIsVisible(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-sm text-white/90 leading-relaxed">
              {currentMessage}
            </p>

            {isHintMessage && (
              <div className="text-xs text-yellow-200/80">
                💡 Need more help? Click the hint button again for the next level!
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIAssistant;
