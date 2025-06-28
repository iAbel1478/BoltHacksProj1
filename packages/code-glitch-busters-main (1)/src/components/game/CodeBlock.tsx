
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface CodeBlockProps {
  code: string;
  solution: string;
  onFix: (isCorrect: boolean) => void;
  isFixed: boolean;
  glitchLevel: number;
  language: string;
  showCorrectAnswer?: boolean;
}

export const CodeBlock = ({ 
  code, 
  solution, 
  onFix, 
  isFixed, 
  glitchLevel, 
  language,
  showCorrectAnswer = false
}: CodeBlockProps) => {
  const [userCode, setUserCode] = useState(code);
  const [isEditing, setIsEditing] = useState(false);

  // Reset when code changes (new level)
  useEffect(() => {
    setUserCode(code);
    setIsEditing(false);
  }, [code]);

  const handleSubmit = () => {
    const isCorrect = userCode.trim().toLowerCase() === solution.trim().toLowerCase();
    onFix(isCorrect);
    if (!isCorrect) {
      setUserCode(prev => prev + " // ⚡ GLITCH!");
    }
  };

  const getLanguageIcon = () => {
    switch (language.toLowerCase()) {
      case 'javascript': return '🟨';
      case 'python': return '🐍';
      case 'html': return '🌐';
      case 'css': return '🎨';
      case 'java': return '☕';
      case 'c#': return '🔷';
      case 'c++': return '⚡';
      default: return '💻';
    }
  };

  const getGlitchStyle = () => {
    // Don't apply glitch effects when editing or when showing correct answer
    if (isFixed || showCorrectAnswer || isEditing) return {};
    
    return {
      filter: `hue-rotate(${glitchLevel * 36}deg) saturate(${1 + glitchLevel * 0.2})`,
      textShadow: glitchLevel > 5 ? '2px 2px #ff0000, -2px -2px #00ffff' : 'none'
    };
  };

  const getBugIndicator = () => {
    if (isFixed) return '✅';
    if (showCorrectAnswer) return '💡';
    
    // Animated color-changing bug
    const colors = ['#ff0000', '#ff4500', '#ffa500', '#ff6347', '#dc143c'];
    const currentColor = colors[glitchLevel % colors.length];
    
    return (
      <span 
        style={{ color: currentColor }}
        className={isEditing ? '' : 'animate-pulse'}
      >
        🐞
      </span>
    );
  };

  const fileName = `buggy-code.${language === 'JavaScript' ? 'js' : language === 'Python' ? 'py' : language === 'HTML' ? 'html' : language === 'CSS' ? 'css' : 'txt'}`;

  const displayCode = showCorrectAnswer ? solution : userCode;

  return (
    <div className="bg-gray-900 rounded-lg border-2 border-red-400 overflow-hidden">
      {/* Code Editor Header */}
      <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-white text-sm ml-2 flex items-center">
            {getLanguageIcon()} {fileName}
          </span>
        </div>
        <div className="text-sm flex items-center space-x-2">
          {getBugIndicator()}
          <span className={`${isFixed ? 'text-green-400' : showCorrectAnswer ? 'text-blue-400' : 'text-red-400'}`}>
            {isFixed ? "FIXED" : showCorrectAnswer ? "SOLUTION" : "BUG DETECTED"}
          </span>
        </div>
      </div>

      {/* Code Content */}
      <div className="p-4">
        {isEditing && !showCorrectAnswer ? (
          <div className="space-y-4">
            <Textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="bg-gray-800 text-green-400 font-mono text-sm border-blue-400 min-h-[200px]"
              placeholder="Edit the code to fix the bug..."
            />
            <div className="flex space-x-2">
              <Button 
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={isFixed}
              >
                🔧 Test Fix
              </Button>
              <Button 
                onClick={() => {
                  setIsEditing(false);
                  setUserCode(code);
                }}
                variant="outline"
                className="border-gray-400 text-gray-300"
              >
                ↺ Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <pre 
              className={`font-mono text-sm whitespace-pre-wrap bg-gray-800 p-4 rounded ${
                showCorrectAnswer ? 'text-green-400' : 'text-green-400'
              }`}
              style={getGlitchStyle()}
            >
              {displayCode}
            </pre>
            {!showCorrectAnswer && !isFixed && (
              <Button 
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                ✏️ Edit Code
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Language Help */}
      <div className="bg-gray-800 px-4 py-2 border-t border-gray-700">
        <div className="text-xs text-gray-400">
          💡 {language} Tip: {getLanguageTip(language)}
        </div>
      </div>
    </div>
  );
};

function getLanguageTip(language: string): string {
  switch (language.toLowerCase()) {
    case 'javascript': return 'Most statements end with semicolons (;)';
    case 'python': return 'Indentation matters! Use 4 spaces.';
    case 'html': return 'Every opening tag needs a closing tag';
    case 'css': return 'Properties end with semicolons inside {}';
    case 'java': return 'Every statement ends with ; and code blocks use {}';
    case 'c#': return 'Case-sensitive language with strict typing';
    case 'c++': return 'Memory management and pointers are important';
    default: return 'Read the error messages carefully!';
  }
}
