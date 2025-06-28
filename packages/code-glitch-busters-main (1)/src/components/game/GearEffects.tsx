
import { useState, useEffect } from 'react';

interface Gear {
  name: string;
  emoji: string;
  type: string;
  description: string;
}

interface GearEffectsProps {
  gear: Gear[];
  code: string;
  onCodeHighlight?: (highlights: string[]) => void;
}

export const GearEffects = ({ gear, code, onCodeHighlight }: GearEffectsProps) => {
  const [activeEffects, setActiveEffects] = useState<string[]>([]);

  useEffect(() => {
    const effects: string[] = [];
    
    gear.forEach(item => {
      switch (item.name) {
        case 'Stack Trace Compass':
          // Points to root causes
          if (code.includes('function') && !code.includes('return')) {
            effects.push('🧭 Compass points to missing return statement');
          }
          if (code.includes('if') && !code.includes('{')) {
            effects.push('🧭 Execution flow error - missing brackets in conditional');
          }
          if (code.includes('undefined') || code.includes('not defined')) {
            effects.push('🧭 Root cause detected - variable not properly defined');
          }
          break;
          
        case 'Memory Leak Detector':
          // Check for memory issues
          if (code.includes('addEventListener') && !code.includes('removeEventListener')) {
            effects.push('📡 Memory leak detected - unremoved event listener');
          }
          if (code.includes('setInterval') && !code.includes('clearInterval')) {
            effects.push('📡 Timer not cleared - memory allocation issue');
          }
          if (code.includes('new ') && !code.includes('delete') && !code.includes('dispose')) {
            effects.push('📡 Object allocation without proper cleanup');
          }
          break;
          
        case 'Cross-Platform Translator':
          // Language-specific gotchas
          if (code.includes('var ') && code.includes('JavaScript')) {
            effects.push('🔄 Translation tip: Use "let" or "const" instead of "var" in modern JavaScript');
          }
          if (code.includes('\t') && code.includes('Python')) {
            effects.push('🔄 Python gotcha: Use spaces instead of tabs for indentation');
          }
          if (code.includes('==') && !code.includes('===')) {
            effects.push('🔄 Cross-platform warning: Use strict equality (===) for type safety');
          }
          break;
      }
    });
    
    setActiveEffects(effects);
    if (onCodeHighlight) onCodeHighlight(effects);
  }, [gear, code, onCodeHighlight]);

  if (activeEffects.length === 0) return null;

  return (
    <div className="bg-green-600/20 rounded-lg p-3 border border-green-400/50 mt-3">
      <h4 className="text-green-400 font-semibold text-sm mb-2 flex items-center">
        ⚙️ Gear Analysis
      </h4>
      <div className="space-y-1">
        {activeEffects.map((effect, index) => (
          <div key={index} className="text-green-300 text-xs flex items-start">
            <span className="mr-2">•</span>
            {effect}
          </div>
        ))}
      </div>
    </div>
  );
};
