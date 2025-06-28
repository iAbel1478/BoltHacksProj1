
import { useState } from 'react';
import { Button } from '../ui/button';

interface Language {
  name: string;
  icon: string;
  description: string;
  rules: string[];
  commonProblems: string[];
}

const languages: Language[] = [
  {
    name: 'JavaScript',
    icon: '🟨',
    description: 'Dynamic scripting language for web development',
    rules: [
      'Statements end with semicolons (;)',
      'Variables declared with let, const, or var',
      'Functions defined with function keyword or arrow syntax',
      'Objects use curly braces {}'
    ],
    commonProblems: [
      'Missing semicolons',
      'Undefined variables',
      'Incorrect function syntax',
      'Mismatched brackets'
    ]
  },
  {
    name: 'Python',
    icon: '🐍',
    description: 'High-level programming language with clean syntax',
    rules: [
      'Indentation matters (use 4 spaces)',
      'Code blocks end with colons (:)',
      'No semicolons needed',
      'Variables are dynamically typed'
    ],
    commonProblems: [
      'Incorrect indentation',
      'Missing colons after if/for/def',
      'Mixing tabs and spaces',
      'Undefined variables'
    ]
  },
  {
    name: 'HTML',
    icon: '🌐',
    description: 'Markup language for web content structure',
    rules: [
      'Tags come in pairs: <tag></tag>',
      'Attributes go inside opening tags',
      'Self-closing tags end with />',
      'Proper nesting is required'
    ],
    commonProblems: [
      'Unclosed tags',
      'Improper nesting',
      'Missing quotes in attributes',
      'Invalid tag names'
    ]
  },
  {
    name: 'CSS',
    icon: '🎨',
    description: 'Stylesheet language for web design',
    rules: [
      'Properties end with semicolons (;)',
      'Values in curly braces {}',
      'Selectors target HTML elements',
      'Comments use /* */'
    ],
    commonProblems: [
      'Missing semicolons',
      'Typos in property names',
      'Invalid values',
      'Missing closing braces'
    ]
  },
  {
    name: 'Java',
    icon: '☕',
    description: 'Object-oriented programming language',
    rules: [
      'Class names start with capital letters',
      'Statements end with semicolons',
      'Code blocks use curly braces',
      'Variables must be declared with type'
    ],
    commonProblems: [
      'Missing semicolons',
      'Incorrect class naming',
      'Type mismatches',
      'Missing imports'
    ]
  },
  {
    name: 'C#',
    icon: '🔷',
    description: 'Microsoft\'s object-oriented language',
    rules: [
      'Case-sensitive language',
      'Main method signature is specific',
      'Namespaces organize code',
      'Strong typing required'
    ],
    commonProblems: [
      'Incorrect Main method case',
      'Missing using statements',
      'Type conversion errors',
      'Access modifier issues'
    ]
  }
];

interface LanguageSelectorProps {
  onLanguageSelect: (language: string) => void;
  selectedLanguage?: string;
}

export const LanguageSelector = ({ onLanguageSelect, selectedLanguage }: LanguageSelectorProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const selectedLang = languages.find(lang => lang.name === selectedLanguage);

  return (
    <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-6 border-2 border-purple-400/50 mb-6">
      <h2 className="text-2xl font-bold text-purple-400 mb-4 flex items-center">
        🎯 Choose Your Debugging Language
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {languages.map((lang) => (
          <Button
            key={lang.name}
            onClick={() => onLanguageSelect(lang.name)}
            variant={selectedLanguage === lang.name ? "default" : "outline"}
            className={`p-4 h-auto flex flex-col items-center space-y-2 ${
              selectedLanguage === lang.name 
                ? 'bg-purple-600 hover:bg-purple-700 text-white border-purple-400' 
                : 'bg-white/10 hover:bg-white/20 text-white border-purple-400/50'
            }`}
          >
            <div className="text-2xl">{lang.icon}</div>
            <div className="text-sm font-semibold">{lang.name}</div>
          </Button>
        ))}
      </div>

      {selectedLang && (
        <div className="bg-black/20 rounded-lg p-4 border border-purple-400/30">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-purple-300 flex items-center">
              {selectedLang.icon} {selectedLang.name} Guide
            </h3>
            <Button
              onClick={() => setShowDetails(!showDetails)}
              variant="outline"
              size="sm"
              className="bg-purple-500 hover:bg-purple-600 text-white border-purple-400"
            >
              {showDetails ? '👁️ Hide' : '📖 Show'} Rules
            </Button>
          </div>
          
          <p className="text-purple-200 text-sm mb-3">{selectedLang.description}</p>
          
          {showDetails && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-green-400 mb-2">✅ Syntax Rules</h4>
                <ul className="text-sm text-green-300 space-y-1">
                  {selectedLang.rules.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-400 mb-2">⚠️ Common Problems</h4>
                <ul className="text-sm text-red-300 space-y-1">
                  {selectedLang.commonProblems.map((problem, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      {problem}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
