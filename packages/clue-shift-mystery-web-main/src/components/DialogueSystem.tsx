
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DialogueNode, DialogueChoice, Suspect } from '../types/GameTypes';

interface DialogueSystemProps {
  suspect: Suspect;
  onComplete: (cluesRevealed: string[]) => void;
  onClose: () => void;
  playerClues: string[];
}

const DialogueSystem: React.FC<DialogueSystemProps> = ({ 
  suspect, 
  onComplete, 
  onClose, 
  playerClues 
}) => {
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [revealedClues, setRevealedClues] = useState<string[]>([]);
  const [suspicion, setSuspicion] = useState(suspect.nervousness);

  // Sample dialogue tree
  const dialogueNodes: Record<string, DialogueNode> = {
    start: {
      id: 'start',
      text: `Hey there! I heard you're investigating the fire alarm incident. I'm ${suspect.name}. What do you want to know?`,
      speaker: suspect.name,
      choices: [
        {
          id: 'alibi',
          text: "Where were you when the alarm went off?",
          nextNodeId: 'alibi'
        },
        {
          id: 'motive',
          text: "Did you have any reason to pull the alarm?",
          nextNodeId: 'motive'
        },
        {
          id: 'evidence',
          text: "Do you recognize this evidence?",
          nextNodeId: 'evidence',
          requiresClue: 'fingerprint'
        }
      ]
    },
    alibi: {
      id: 'alibi',
      text: suspect.alibi,
      speaker: suspect.name,
      choices: [
        {
          id: 'alibi_doubt',
          text: "Are you sure about that?",
          nextNodeId: 'alibi_doubt',
          suspicionIncrease: 2
        },
        {
          id: 'back',
          text: "I see. Let me ask something else.",
          nextNodeId: 'start'
        }
      ]
    },
    motive: {
      id: 'motive',
      text: suspect.motive,
      speaker: suspect.name,
      choices: [
        {
          id: 'motive_press',
          text: "That sounds like a good reason to cause a distraction.",
          nextNodeId: 'motive_press',
          suspicionIncrease: 3
        },
        {
          id: 'back',
          text: "Okay, I understand.",
          nextNodeId: 'start'
        }
      ]
    },
    evidence: {
      id: 'evidence',
      text: "Oh wow, is that a fingerprint? I... I mean, lots of people touch things around school, right?",
      speaker: suspect.name,
      choices: [
        {
          id: 'evidence_press',
          text: "This was found right by the fire alarm.",
          nextNodeId: 'evidence_reveal',
          suspicionIncrease: 4
        }
      ],
      clueRevealed: 'nervous_reaction'
    },
    alibi_doubt: {
      id: 'alibi_doubt',
      text: "Well... I mean... I was definitely there! Ask anyone!",
      speaker: suspect.name,
      choices: [
        {
          id: 'end',
          text: "I think I have enough information.",
          nextNodeId: 'end'
        }
      ]
    },
    motive_press: {
      id: 'motive_press',
      text: "I would never do something like that! The fire department came and everything!",
      speaker: suspect.name,
      choices: [
        {
          id: 'end',
          text: "I'll make note of that.",
          nextNodeId: 'end'
        }
      ]
    },
    evidence_reveal: {
      id: 'evidence_reveal',
      text: "Okay, okay! I was near there earlier, but I didn't pull it! I was just... checking if anyone was around!",
      speaker: suspect.name,
      choices: [
        {
          id: 'end',
          text: "Interesting. That's all for now.",
          nextNodeId: 'end'
        }
      ],
      clueRevealed: 'admission_nearby'
    },
    end: {
      id: 'end',
      text: "Well... I should get going. Good luck with your investigation!",
      speaker: suspect.name,
      choices: []
    }
  };

  const currentNode = dialogueNodes[currentNodeId];

  const handleChoice = (choice: DialogueChoice) => {
    if (choice.requiresClue && !playerClues.includes(choice.requiresClue)) {
      return; // Can't select this choice without the required clue
    }

    if (choice.suspicionIncrease) {
      setSuspicion(Math.min(10, suspicion + choice.suspicionIncrease));
    }

    if (currentNode.clueRevealed && !revealedClues.includes(currentNode.clueRevealed)) {
      setRevealedClues([...revealedClues, currentNode.clueRevealed]);
    }

    if (choice.nextNodeId) {
      setCurrentNodeId(choice.nextNodeId);
    } else {
      onComplete(revealedClues);
    }
  };

  const getSuspicionColor = () => {
    if (suspicion <= 3) return 'text-green-600';
    if (suspicion <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <Card className="bg-white border-4 border-purple-400 shadow-2xl p-6 max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{suspect.avatar}</div>
            <div>
              <h3 className="text-xl font-bold text-purple-800">{suspect.name}</h3>
              <p className="text-sm text-gray-600">{suspect.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Suspicion Level</div>
            <div className={`font-bold ${getSuspicionColor()}`}>
              {suspicion}/10
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="text-gray-800 italic">"{currentNode.text}"</p>
        </div>

        <div className="space-y-3">
          {currentNode.choices.map((choice) => {
            const isDisabled = choice.requiresClue && !playerClues.includes(choice.requiresClue);
            
            return (
              <Button
                key={choice.id}
                onClick={() => handleChoice(choice)}
                disabled={isDisabled}
                variant={isDisabled ? "ghost" : "outline"}
                className={`w-full text-left justify-start h-auto p-4 ${
                  isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-50'
                }`}
              >
                <div>
                  <div className="font-medium">{choice.text}</div>
                  {choice.requiresClue && (
                    <div className="text-xs text-gray-500 mt-1">
                      {isDisabled ? `Requires: ${choice.requiresClue}` : '🔍 Evidence-based question'}
                    </div>
                  )}
                </div>
              </Button>
            );
          })}
        </div>

        {currentNode.choices.length === 0 && (
          <Button
            onClick={() => onComplete(revealedClues)}
            className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white"
          >
            End Conversation
          </Button>
        )}

        <Button
          onClick={onClose}
          variant="ghost"
          className="w-full mt-2 text-gray-600"
        >
          Close
        </Button>
      </Card>
    </div>
  );
};

export default DialogueSystem;
