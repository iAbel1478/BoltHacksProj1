
import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface GameTimerProps {
  timeLeft: number;
  onTimeUp: () => void;
  setTimeLeft: (time: number) => void;
}

const GameTimer: React.FC<GameTimerProps> = ({ timeLeft, onTimeUp, setTimeLeft }) => {
  const [extensionUsed, setExtensionUsed] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp, setTimeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // Color changes for 10-minute timer: green > 6 min, yellow 3-6 min, red < 3 min
  const isUrgent = timeLeft <= 180; // Last 3 minutes (red)
  const isWarning = timeLeft <= 360 && timeLeft > 180; // 3-6 minutes (yellow)
  const isGood = timeLeft > 360; // > 6 minutes (green)

  const canUseExtension = timeLeft <= 60 && !extensionUsed; // Only when 1 minute or less left

  const handleExtension = () => {
    if (canUseExtension) {
      setTimeLeft(timeLeft + 300); // Add 5 minutes (300 seconds)
      setExtensionUsed(true);
      toast({
        title: "⏰ Time Extended!",
        description: "+5 minutes added to your escape time!",
      });
    }
  };

  const getTimerStyle = () => {
    if (isUrgent) return 'bg-red-500/20 border-red-500/50';
    if (isWarning) return 'bg-yellow-500/20 border-yellow-500/50';
    return 'bg-green-500/20 border-green-500/50';
  };

  const getTextColor = () => {
    if (isUrgent) return 'text-red-400';
    if (isWarning) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getIconColor = () => {
    if (isUrgent) return 'text-red-400';
    if (isWarning) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <Card className={`p-4 ${getTimerStyle()}`}>
      <div className="flex items-center space-x-2">
        {isUrgent ? (
          <AlertTriangle className={`w-6 h-6 ${getIconColor()} animate-pulse`} />
        ) : (
          <Clock className={`w-6 h-6 ${getIconColor()}`} />
        )}
        <div className="text-center">
          <div className={`text-2xl font-bold ${getTextColor()}`}>
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-white/70">
            {isUrgent ? 'URGENT!' : isWarning ? 'Hurry Up!' : 'Time Remaining'}
          </div>
        </div>
        {canUseExtension && (
          <Button
            onClick={handleExtension}
            size="sm"
            className="bg-yellow-500/30 border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/50 animate-pulse"
          >
            <Plus className="w-4 h-4 mr-1" />
            +5 min
          </Button>
        )}
      </div>
    </Card>
  );
};

export default GameTimer;
