
import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TranslationTooltipProps {
  spanish: string;
  english: string;
  children: React.ReactNode;
  showSpanish?: boolean;
}

export const TranslationTooltip: React.FC<TranslationTooltipProps> = ({ 
  spanish, 
  english, 
  children,
  showSpanish = true 
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          className="bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-400 text-amber-900 font-bold shadow-lg rounded-lg px-3 py-2 font-mono text-sm"
          sideOffset={5}
        >
          <div className="text-center">
            <div className="text-xs text-amber-700 mb-1">
              {showSpanish ? 'English:' : 'Español:'}
            </div>
            <div className="font-bold">
              {showSpanish ? english : spanish}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
