
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BlackboardProps {
  rules: string[];
  currentRule?: string;
}

const Blackboard = ({ rules, currentRule }: BlackboardProps) => {
  // Add current rule to display if provided
  const displayRules = currentRule && !rules.includes(currentRule) ? [...rules, currentRule] : rules;

  return (
    <Card className="h-full bg-gradient-to-b from-slate-800 to-slate-900 border-8 border-amber-600 shadow-2xl rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-amber-800 to-yellow-700 text-center rounded-t-2xl border-b-4 border-amber-500">
        <CardTitle className="text-xl text-yellow-100 font-bold font-mono tracking-wider drop-shadow-lg">
          🎪 ZOO SAFETY BOARD 🎪
        </CardTitle>
        <p className="text-yellow-200 font-semibold">🌟 What We've Learned 🌟</p>
      </CardHeader>
      
      <CardContent className="bg-slate-800 p-4 min-h-[420px]">
        <div className="space-y-3">
          {displayRules.length === 0 ? (
            <div className="text-center">
              <p className="text-yellow-100 text-lg font-bold">
                🎯 Ready for your zoo safety adventure?
              </p>
              <p className="text-yellow-200 mt-2">
                Meet all 12 animal friends and learn their safety tips!
              </p>
              <div className="mt-4 text-5xl opacity-30">
                🦁
              </div>
            </div>
          ) : (
            displayRules.map((rule, index) => (
              <div 
                key={index}
                className={`transform transition-all duration-500 ${
                  rule === currentRule ? 'animate-pulse scale-105' : ''
                }`}
              >
                <div className="flex items-start gap-3 p-2 rounded-lg bg-slate-700/60 border-2 border-amber-400/30">
                  <span className="text-yellow-300 text-lg flex-shrink-0">🎪</span>
                  <p className={`text-yellow-100 leading-relaxed text-sm ${
                    rule === currentRule ? 'font-bold text-yellow-200' : ''
                  }`}>
                    {rule}
                  </p>
                </div>
              </div>
            ))
          )}
          
          {displayRules.length === 12 && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-700 to-emerald-700 rounded-xl border-4 border-yellow-400">
              <div className="text-center">
                <div className="text-3xl mb-2">🎉🦁🎉</div>
                <p className="text-yellow-100 font-bold text-base">
                  AMAZING! You've completed the Zoo Safety Adventure!
                </p>
                <p className="text-yellow-200 mt-2 text-sm">
                  🌟 You've met all 12 animal friends and learned their safety secrets! 🌟
                </p>
                <p className="text-yellow-300 mt-1 text-sm font-bold">
                  🎪 You're now a certified Internet Safety Explorer! 🎪
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Blackboard;
