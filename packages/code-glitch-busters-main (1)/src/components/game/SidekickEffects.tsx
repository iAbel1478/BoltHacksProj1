
import { useState, useEffect } from 'react';

interface Sidekick {
  name: string;
  emoji: string;
  type: string;
  description: string;
}

interface SidekickEffectsProps {
  sidekicks: Sidekick[];
  code: string;
  language: string;
}

export const SidekickEffects = ({ sidekicks, code, language }: SidekickEffectsProps) => {
  const [activeAdvice, setActiveAdvice] = useState<string[]>([]);

  useEffect(() => {
    const advice: string[] = [];
    
    sidekicks.forEach(sidekick => {
      switch (sidekick.name) {
        case 'Debugger the Bloodhound':
          // Execution flow analysis
          if (code.includes('for') && code.includes('i++') && !code.includes('i < ')) {
            advice.push('🐕 Bloodhound smells infinite loop - check your loop condition');
          }
          if (code.includes('while') && !code.includes('false')) {
            advice.push('🐕 Execution path warning - verify while loop exit condition');
          }
          if (code.includes('async') && !code.includes('await')) {
            advice.push('🐕 Race condition detected - missing await in async function');
          }
          break;
          
        case 'Tester the Chameleon':
          // Testing suggestions
          if (code.includes('function ') && !code.includes('test')) {
            advice.push('🦎 Chameleon suggests: This function needs comprehensive test cases');
          }
          if (code.includes('if ') && code.split('if ').length > 2) {
            advice.push('🦎 Edge case alert - multiple conditions need thorough testing');
          }
          if (code.includes('user input') || code.includes('prompt(')) {
            advice.push('🦎 Security test needed - validate and sanitize user input');
          }
          break;
          
        case 'Git the Elephant':
          // Version control insights
          if (code.includes('TODO') || code.includes('FIXME')) {
            advice.push('🐘 Elephant remembers: Similar TODO patterns caused bugs in past commits');
          }
          if (code.includes('console.log') || code.includes('print(')) {
            advice.push('🐘 Version history shows debug statements often left in production code');
          }
          if (code.includes('hardcoded') || /\b\d{4}-\d{2}-\d{2}\b/.test(code)) {
            advice.push('🐘 Bug DNA match: Hardcoded values caused similar issues before');
          }
          break;
      }
    });
    
    setActiveAdvice(advice);
  }, [sidekicks, code, language]);

  if (activeAdvice.length === 0) return null;

  return (
    <div className="bg-blue-600/20 rounded-lg p-3 border border-blue-400/50 mt-3">
      <h4 className="text-blue-400 font-semibold text-sm mb-2 flex items-center">
        👥 Sidekick Advice
      </h4>
      <div className="space-y-1">
        {activeAdvice.map((advice, index) => (
          <div key={index} className="text-blue-300 text-xs flex items-start">
            <span className="mr-2">•</span>
            {advice}
          </div>
        ))}
      </div>
    </div>
  );
};
