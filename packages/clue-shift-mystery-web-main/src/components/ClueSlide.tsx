
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clue, GameMode, Suspect, Case, SlideData } from '../types/GameTypes';

interface ClueSlideProps {
  slideNumber: number;
  onClueFound: (clue: Clue) => void;
  onNext: () => void;
  onHint: () => void;
  gameMode?: GameMode;
  onMiniGame?: () => void;
  onDialogue?: (suspect: Suspect) => void;
  suspects?: Suspect[];
  selectedCase?: Case | null;
}

const ClueSlide: React.FC<ClueSlideProps> = ({ 
  slideNumber, 
  onClueFound, 
  onNext, 
  onHint, 
  gameMode = 'easy',
  onMiniGame,
  onDialogue,
  suspects = [],
  selectedCase
}) => {
  const [foundClues, setFoundClues] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  // Easy mode slides (default)
  const easySlides: SlideData[] = [
    {
      title: "The Classroom 📚",
      background: "bg-yellow-100",
      description: "Look around the classroom where the children were learning before recess.",
      clues: [
        {
          id: "muddy-footprint",
          name: "Muddy Footprint",
          description: "A muddy footprint by the cubbies - someone came in from outside!",
          icon: "👣",
          slideFound: 0,
          position: "bottom-20 left-20",
          category: "physical"
        }
      ],
      hint: "Look down low near where the cubbies are - what did someone track in?",
      objects: [
        { id: "desk", emoji: "🪑", position: "top-32 left-32" },
        { id: "board", emoji: "📋", position: "top-20 right-32" },
        { id: "books", emoji: "📚", position: "bottom-32 right-20" }
      ]
    },
    {
      title: "The Library Corner 📖",
      background: "bg-green-100",
      description: "Check the cozy reading corner where students go to read quietly.",
      clues: [
        {
          id: "torn-page",
          name: "Torn Paper",
          description: "A small piece of torn paper with doodles on it!",
          icon: "📄",
          slideFound: 1,
          position: "top-32 right-20",
          category: "physical"
        }
      ],
      hint: "Sometimes when people are nervous, they doodle or tear paper. Look carefully!",
      objects: [
        { id: "shelves", emoji: "📚", position: "top-20 left-20" },
        { id: "cushions", emoji: "🛋️", position: "bottom-32 right-32" },
        { id: "plant", emoji: "🌱", position: "bottom-20 left-32" }
      ]
    },
    {
      title: "The Art Corner 🎨",
      background: "bg-blue-100",
      description: "Search the art area where children create their masterpieces.",
      clues: [
        {
          id: "paint-smudge",
          name: "Paint Smudge",
          description: "Someone left a colorful paint smudge on the table!",
          icon: "🎨",
          slideFound: 2,
          position: "bottom-20 right-20",
          category: "physical"
        }
      ],
      hint: "Art time can be messy - what colors do you see?",
      objects: [
        { id: "easel", emoji: "🖼️", position: "bottom-20 left-32" },
        { id: "brushes", emoji: "🖌️", position: "top-20 left-20" },
        { id: "supplies", emoji: "✏️", position: "bottom-32 right-32" }
      ]
    }
  ];

  // Hard mode slides with sophisticated environments
  const hardSlides: SlideData[] = [
    {
      title: "🏫 School Administration Office",
      background: "bg-gradient-to-br from-slate-800 to-purple-900",
      description: "The heart of school operations. Multiple monitors display security feeds, and filing cabinets contain sensitive information.",
      clues: [
        {
          id: "digital_evidence",
          name: "System Access Log",
          description: "Computer logs show unauthorized access to the announcement system at 2:47 PM.",
          icon: "💻",
          slideFound: 0,
          position: "top-20 left-32",
          category: "digital",
          difficulty: 3
        },
        {
          id: "keycard_trace",
          name: "Security Badge Scan",
          description: "A student ID was scanned near the office during lunch period.",
          icon: "🏷️",
          slideFound: 0,
          position: "bottom-32 right-24",
          category: "physical",
          difficulty: 2,
          isRedHerring: true
        }
      ],
      hint: "Technology leaves digital footprints. Check the computer systems for unusual activity.",
      objects: [
        { id: "computer", emoji: "🖥️", position: "top-32 left-20" },
        { id: "filing", emoji: "🗄️", position: "bottom-20 left-40" },
        { id: "camera", emoji: "📹", position: "top-20 right-20" },
        { id: "printer", emoji: "🖨️", position: "bottom-32 right-32" }
      ],
      interactives: [
        { 
          id: "decode_puzzle", 
          emoji: "🔐", 
          position: "top-40 left-60",
          action: "minigame",
          title: "Decode Access Log"
        }
      ]
    },
    {
      title: "📚 Advanced Learning Center",
      background: "bg-gradient-to-br from-indigo-900 to-slate-800",
      description: "Where high-achieving students gather for academic competitions and advanced studies.",
      clues: [
        {
          id: "academic_work",
          name: "Anonymous Study Materials",
          description: "High-quality study guides posted anonymously on the class portal. The academic level suggests an honor student.",
          icon: "📑",
          slideFound: 1,
          position: "top-24 right-32",
          category: "circumstantial",
          difficulty: 3
        },
        {
          id: "timeline_clue",
          name: "Tutoring Schedule",
          description: "The schedule shows someone had free periods exactly when the helpful materials were posted.",
          icon: "⏰",
          slideFound: 1,
          position: "bottom-20 left-28",
          category: "circumstantial",
          difficulty: 2
        }
      ],
      hint: "Consider who has both the knowledge AND the opportunity. Academic excellence requires dedication and specific skills.",
      objects: [
        { id: "whiteboard", emoji: "📊", position: "top-20 left-20" },
        { id: "awards", emoji: "🏆", position: "top-32 right-20" },
        { id: "books_adv", emoji: "📚", position: "bottom-32 left-32" },
        { id: "calculator", emoji: "🧮", position: "bottom-20 right-40" }
      ]
    }
  ];

  // Get slides based on game mode and selected case
  const getSlides = (): SlideData[] => {
    if (gameMode === 'hard') {
      return hardSlides;
    }
    
    if (selectedCase) {
      return generateCaseSlides(selectedCase);
    }
    
    return easySlides;
  };

  const generateCaseSlides = (caseData: Case): SlideData[] => {
    const baseSlides: SlideData[] = [
      {
        title: getCaseLocationTitle(caseData),
        background: getCaseBackground(caseData),
        description: getCaseDescription(caseData),
        clues: generateCaseClues(caseData, 0),
        hint: getCaseHint(caseData, 0),
        objects: getCaseObjects(caseData)
      }
    ];
    
    return baseSlides;
  };

  const getCaseLocationTitle = (caseData: Case) => {
    const themeMap: { [key: string]: string } = {
      'playground': '🛝 School Playground',
      'school': '🏫 Main Hallway',
      'cafeteria': '🍽️ School Cafeteria',
      'library': '📚 School Library',
      'science': '🔬 Science Laboratory'
    };
    return themeMap[caseData.theme || 'school'] || '🏫 School Area';
  };

  const getCaseBackground = (caseData: Case) => {
    if (caseData.gradeLevel === '9-12') return "bg-gradient-to-br from-slate-700 to-blue-900";
    if (caseData.gradeLevel === '6-8') return "bg-gradient-to-br from-gray-600 to-purple-800";
    return "bg-gradient-to-br from-blue-100 to-green-100";
  };

  const getCaseDescription = (caseData: Case) => {
    const descriptions: { [key: string]: string } = {
      'missing-toy': "The classroom where the special class project was last seen.",
      'pet-food-mystery': "The corner where Nibbles the hamster's food dish sits empty.",
      'website-password': "The computer lab where someone changed the student portal access.",
      'compliment-notes': "The hallway where kind notes have been appearing in lockers.",
      'study-guide': "The learning center where helpful study materials mysteriously appeared."
    };
    return descriptions[caseData.id] || "An important location in our mystery.";
  };

  const generateCaseClues = (caseData: Case, slideNum: number): Clue[] => {
    const clueExamples: Clue[] = [
      {
        id: `${caseData.id}_clue_1`,
        name: "Key Evidence",
        description: `Important evidence related to ${caseData.title}`,
        icon: "🔍",
        slideFound: slideNum,
        position: "bottom-20 left-20",
        category: "physical"
      }
    ];
    return clueExamples;
  };

  const getCaseHint = (caseData: Case, slideNum: number) => {
    return `Look carefully around the area - what clues might tell us about ${caseData.title}?`;
  };

  const getCaseObjects = (caseData: Case): Array<{id: string; emoji: string; position: string}> => {
    const objectSets: { [key: string]: Array<{id: string; emoji: string; position: string}> } = {
      'playground': [
        { id: "swing", emoji: "🌳", position: "bottom-20 left-32" },
        { id: "slide", emoji: "🛝", position: "top-20 left-20" },
        { id: "bench", emoji: "🪑", position: "bottom-32 right-32" }
      ],
      'school': [
        { id: "locker", emoji: "🗄️", position: "bottom-32 right-20" },
        { id: "bulletin", emoji: "📋", position: "top-20 right-32" },
        { id: "water", emoji: "🚰", position: "bottom-20 left-40" }
      ]
    };
    return objectSets[caseData.theme || 'school'] || objectSets['school'];
  };

  const slides = getSlides();
  const currentSlideData = slides[slideNumber] || slides[0];

  const handleClueClick = (clue: Clue) => {
    if (!foundClues.includes(clue.id)) {
      setFoundClues([...foundClues, clue.id]);
      onClueFound(clue);
    }
  };

  const handleHintClick = () => {
    setShowHint(true);
    onHint();
  };

  const getBackgroundClass = () => {
    if (gameMode === 'hard') return currentSlideData.background;
    if (gameMode === 'medium') return "bg-gray-800 border-gray-600";
    return currentSlideData.background;
  };

  const getTextClass = () => {
    if (gameMode === 'hard' || gameMode === 'medium') return "text-white";
    return "text-gray-800";
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className={`min-h-96 ${getBackgroundClass()} border-4 ${
        gameMode === 'hard' ? 'border-purple-600' : 
        gameMode === 'medium' ? 'border-gray-600' : 'border-blue-300'
      } rounded-xl shadow-2xl p-8 relative overflow-hidden`}>
        
        <div className="relative z-10">
          <h2 className={`text-3xl font-bold mb-4 ${getTextClass()}`}>
            {currentSlideData.title}
          </h2>
          <p className={`text-lg mb-8 ${
            gameMode === 'hard' || gameMode === 'medium' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {currentSlideData.description}
          </p>

          <div className="relative h-64 mb-8 bg-black/10 rounded-lg overflow-hidden">
            {/* Background Objects */}
            {currentSlideData.objects?.map((obj) => (
              <div
                key={obj.id}
                className={`absolute text-4xl cursor-pointer hover:scale-110 transition-transform ${obj.position}`}
                style={{ userSelect: 'none' }}
              >
                {obj.emoji}
              </div>
            ))}

            {/* Clues */}
            {currentSlideData.clues?.map((clue: Clue) => (
              <div
                key={clue.id}
                className={`absolute text-4xl cursor-pointer hover:scale-125 transition-all duration-200 ${clue.position} ${
                  foundClues.includes(clue.id) ? 'animate-bounce opacity-50' : 'animate-pulse'
                }`}
                onClick={() => handleClueClick(clue)}
                title={foundClues.includes(clue.id) ? "Already found!" : "Click to investigate"}
              >
                {foundClues.includes(clue.id) ? '✅' : clue.icon}
              </div>
            ))}

            {/* Interactive Elements */}
            {currentSlideData.interactives?.map((interactive) => (
              <div
                key={interactive.id}
                className={`absolute text-4xl cursor-pointer hover:scale-125 transition-all duration-200 ${interactive.position} animate-pulse`}
                onClick={onMiniGame}
                title={interactive.title}
              >
                {interactive.emoji}
              </div>
            ))}
          </div>

          {/* Found Clues Display */}
          {foundClues.length > 0 && (
            <div className={`mb-6 p-4 rounded-lg ${
              gameMode === 'hard' ? 'bg-purple-900/50' :
              gameMode === 'medium' ? 'bg-gray-900/50' : 'bg-blue-100'
            }`}>
              <h3 className={`font-bold mb-2 ${getTextClass()}`}>🔍 Clues Found:</h3>
              <div className="space-y-2">
                {currentSlideData.clues
                  ?.filter((clue: Clue) => foundClues.includes(clue.id))
                  .map((clue: Clue) => (
                    <div key={clue.id} className={`flex items-center space-x-3 p-2 rounded ${
                      gameMode === 'hard' || gameMode === 'medium' ? 'bg-black/20' : 'bg-white/80'
                    }`}>
                      <span className="text-2xl">{clue.icon}</span>
                      <div>
                        <div className={`font-medium ${getTextClass()}`}>{clue.name}</div>
                        <div className={`text-sm ${
                          gameMode === 'hard' || gameMode === 'medium' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {clue.description}
                        </div>
                        {clue.difficulty && gameMode === 'hard' && (
                          <div className="text-xs text-purple-400">
                            Difficulty: {'⭐'.repeat(clue.difficulty)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Button
              onClick={handleHintClick}
              variant="outline"
              className={`font-bold ${
                gameMode === 'hard'
                  ? 'bg-purple-700 hover:bg-purple-600 border-purple-500 text-white'
                  : gameMode === 'medium'
                    ? 'bg-gray-700 hover:bg-gray-600 border-gray-500 text-gray-200'
                    : 'bg-yellow-200 hover:bg-yellow-300 border-yellow-400 text-yellow-800'
              }`}
            >
              💡 Need a Hint?
            </Button>

            <Button
              onClick={onNext}
              className={`font-bold px-8 py-3 rounded-full transition-all duration-200 transform hover:scale-105 ${
                gameMode === 'hard'
                  ? 'bg-purple-600 hover:bg-purple-500 text-white'
                  : gameMode === 'medium'
                    ? 'bg-gray-600 hover:bg-gray-500 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {slideNumber < slides.length - 1 ? '➡️ Next Location' : '🕵️ Make Your Deduction'}
            </Button>
          </div>

          {/* Hint Display */}
          {showHint && (
            <div className={`mt-6 rounded-xl p-4 border-2 ${
              gameMode === 'hard'
                ? 'bg-purple-900/50 border-purple-500'
                : gameMode === 'medium'
                  ? 'bg-gray-700 border-gray-500'
                  : 'bg-blue-100 border-blue-300'
            }`}>
              <p className={`font-medium ${
                gameMode === 'hard' || gameMode === 'medium' ? 'text-gray-200' : 'text-blue-800'
              }`}>
                💡 <strong>Hint:</strong> {currentSlideData.hint}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClueSlide;
