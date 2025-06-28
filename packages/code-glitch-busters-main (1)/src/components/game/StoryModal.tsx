
import { Button } from '../ui/button';

interface StoryModalProps {
  level: any;
  onClose: () => void;
}

export const StoryModal = ({ level, onClose }: StoryModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl p-8 max-w-2xl w-full border-4 border-yellow-400 relative overflow-hidden">
        {/* Comic book style background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-red-400 rounded-full"></div>
        </div>

        <div className="relative z-10">
          {/* Story Header */}
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-yellow-400 mb-2">
              {level.storyTitle || level.title}
            </h2>
            <div className="text-lg text-white opacity-80">
              Chapter {level.chapter || 1}
            </div>
          </div>

          {/* Story Content */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
            <div className="text-white text-lg leading-relaxed">
              {level.story || level.description}
            </div>
          </div>

          {/* Mission Objective */}
          <div className="bg-yellow-400/20 rounded-xl p-4 mb-6 border-l-4 border-yellow-400">
            <h3 className="text-yellow-400 font-bold mb-2">🎯 Mission Objective:</h3>
            <p className="text-white">{level.objective}</p>
          </div>

          {/* Boss Warning */}
          {level.isBoss && (
            <div className="bg-red-500/20 rounded-xl p-4 mb-6 border-l-4 border-red-500 animate-pulse">
              <h3 className="text-red-400 font-bold mb-2">⚠️ BOSS BATTLE ALERT!</h3>
              <p className="text-white">This is a powerful glitch boss. Be extra careful!</p>
            </div>
          )}

          {/* Continue Button */}
          <div className="text-center">
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-xl px-8 py-4 rounded-xl font-bold shadow-lg"
            >
              🚀 Start Mission
            </Button>
          </div>
        </div>

        {/* Comic book "POW!" effect */}
        <div className="absolute top-4 right-4 text-6xl opacity-20 rotate-12 select-none">
          💥
        </div>
      </div>
    </div>
  );
};
