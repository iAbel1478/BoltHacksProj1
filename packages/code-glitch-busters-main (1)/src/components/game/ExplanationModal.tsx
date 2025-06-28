
import { Button } from '../ui/button';

interface ExplanationModalProps {
  level: any;
  onClose: () => void;
}

export const ExplanationModal = ({ level, onClose }: ExplanationModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-green-900 to-blue-900 rounded-3xl p-8 max-w-2xl w-full border-4 border-green-400 relative overflow-hidden">
        {/* Success effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-green-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-400 rounded-full animate-bounce"></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-green-400 mb-2">
              🎉 Bug Fixed! 🎉
            </h2>
            <div className="text-lg text-white opacity-80">
              {level.language} Master in Training
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
            <h3 className="text-yellow-400 font-bold mb-3">🧠 Why This Works:</h3>
            <p className="text-white text-lg leading-relaxed mb-4">
              {level.explanation}
            </p>
            
            <h3 className="text-blue-400 font-bold mb-3">🌍 Real-World Context:</h3>
            <p className="text-white leading-relaxed">
              {level.realWorldContext}
            </p>
          </div>

          {/* Reward Display */}
          <div className="bg-yellow-400/20 rounded-xl p-4 mb-6 border-l-4 border-yellow-400">
            <h3 className="text-yellow-400 font-bold mb-2">🎁 Reward Unlocked:</h3>
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{level.reward.emoji}</div>
              <div>
                <div className="text-white font-bold">{level.reward.name}</div>
                <div className="text-gray-300 text-sm">{level.reward.description}</div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-xl px-8 py-4 rounded-xl font-bold shadow-lg"
            >
              🚀 Continue Adventure
            </Button>
          </div>
        </div>

        {/* Celebration effects */}
        <div className="absolute top-4 right-4 text-6xl opacity-20 rotate-12 select-none animate-bounce">
          ✨
        </div>
        <div className="absolute bottom-4 left-4 text-4xl opacity-30 -rotate-12 select-none animate-pulse">
          🎊
        </div>
      </div>
    </div>
  );
};
