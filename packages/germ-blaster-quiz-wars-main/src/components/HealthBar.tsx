
import React from 'react';
import { Heart } from 'lucide-react';

interface HealthBarProps {
  health: number;
  maxHealth: number;
  isLowHealth: boolean;
}

const HealthBar: React.FC<HealthBarProps> = ({ health, maxHealth, isLowHealth }) => {
  return (
    <div className="flex items-center space-x-0.5 flex-wrap max-w-md">
      {[...Array(maxHealth)].map((_, i) => (
        <Heart 
          key={i} 
          className={`w-3 h-3 transition-all duration-300 ${
            i < health 
              ? `text-red-500 fill-current ${isLowHealth ? 'animate-pulse scale-110' : ''}` 
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default HealthBar;
