
import React from 'react';
import { Button } from '@/components/ui/button';

interface IntroSlideProps {
  onStart: () => void;
}

const IntroSlide: React.FC<IntroSlideProps> = ({ onStart }) => {
  // Array of different mystery scenarios to randomize
  const mysteryScenarios = [
    {
      title: "The Case of the Missing Art Supplies!",
      emoji: "🎨",
      situation: "The art teacher's special paintbrushes have disappeared from the art room!",
      details: "Ms. Rodriguez's favorite set of brushes that she uses for demonstrations has vanished. The art room was locked overnight, but someone had access. Three students stayed after school yesterday to help clean up.",
      suspects: "three helpful students who stayed after school"
    },
    {
      title: "The Mystery of the Classroom Pet!",
      emoji: "🐹",
      situation: "Nibbles the hamster's favorite wheel has been moved to a strange location!",
      details: "When Mrs. Chen arrived this morning, Nibbles' exercise wheel was sitting on top of the bookshelf instead of in his cage. How did it get there? Who would move it and why?",
      suspects: "the students who have permission to help care for Nibbles"
    },
    {
      title: "The Puzzle of the Library Books!",
      emoji: "📚",
      situation: "Someone has been secretly organizing books by color instead of the library system!",
      details: "Ms. Kim discovered that an entire section of picture books had been rearranged by color, creating a beautiful rainbow display. It's actually quite lovely, but who did it and why?",
      suspects: "students who love spending time in the library"
    },
    {
      title: "The Case of the Musical Instruments!",
      emoji: "🎵",
      situation: "The tambourines have been mysteriously arranged in a perfect circle!",
      details: "Mr. Johnson found all the tambourines from music class arranged in a perfect circle in the middle of the room this morning. They even had little paper flowers attached to them!",
      suspects: "students from yesterday's music class"
    }
  ];

  // Randomly select a scenario (but deterministic for the session)
  const selectedScenario = mysteryScenarios[Math.floor(Math.random() * mysteryScenarios.length)];

  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-yellow-300">
        <div className="mb-8">
          <div className="text-8xl mb-4">{selectedScenario.emoji}</div>
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">
            {selectedScenario.title}
          </h2>
        </div>
        
        <div className="bg-blue-50 rounded-2xl p-6 mb-8 text-left">
          <p className="text-lg text-gray-800 leading-relaxed">
            <strong>The Mystery:</strong> {selectedScenario.situation}
          </p>
          <p className="text-lg text-gray-800 leading-relaxed mt-4">
            {selectedScenario.details}
          </p>
          <p className="text-lg text-gray-800 leading-relaxed mt-4">
            Can you help Detective Puppy figure out which of the {selectedScenario.suspects} is responsible?
          </p>
        </div>

        <div className="bg-green-50 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-green-700 mb-3">🎯 Your Detective Mission:</h3>
          <ul className="text-left text-gray-800 space-y-2">
            <li>• 🔍 Search multiple locations for clues</li>
            <li>• 📝 Collect evidence in your detective notebook</li>
            <li>• 🧩 Solve mini-puzzles to unlock hidden clues</li>
            <li>• 🤔 Use logical thinking to identify the responsible person</li>
            <li>• 🏆 Discover that sometimes mysteries have happy endings!</li>
          </ul>
        </div>

        <Button 
          onClick={onStart}
          className="bg-blue-500 hover:bg-blue-600 text-white text-xl px-8 py-4 rounded-full font-bold transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Start Detective Mission! 🕵️‍♀️
        </Button>
      </div>
    </div>
  );
};

export default IntroSlide;
