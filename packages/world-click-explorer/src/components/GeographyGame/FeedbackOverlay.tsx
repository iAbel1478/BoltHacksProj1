import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Country, ClickFeedback } from './types';

interface FeedbackOverlayProps {
  feedback: ClickFeedback;
  country: Country;
  show: boolean;
  onComplete: () => void;
}

const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({
  feedback,
  country,
  show,
  onComplete
}) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [showCircles, setShowCircles] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (show) {
      // Reset animations
      setShowCircles(false);
      setShowLine(false);
      setShowText(false);
      
      // Animate sequence
      setTimeout(() => setShowCircles(true), 100);
      setTimeout(() => setShowLine(true), 300);
      setTimeout(() => setShowText(true), 500);
      
      // Rotate through facts
      setCurrentFactIndex(Math.floor(Math.random() * country.funFacts.length));
      
      // Complete after 3 seconds
      setTimeout(onComplete, 3000);
    }
  }, [show, country.funFacts.length, onComplete]);

  if (!show) return null;

  const getAccuracyMessage = () => {
    if (feedback.distance <= 500) {
      return "Excellent! Perfect location!";
    } else if (feedback.distance <= 1000) {
      return "Close! Bonus question triggered";
    } else {
      return `Keep trying! ${feedback.distance}km from target`;
    }
  };

  const getAccuracyColor = () => {
    if (feedback.distance <= 500) return "text-green-600";
    if (feedback.distance <= 1000) return "text-yellow-600";
    return "text-red-600";
  };

  const getUserClickColor = () => {
    if (feedback.distance <= 500) return "bg-green-500";
    if (feedback.distance <= 1000) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getLineColor = () => {
    if (feedback.distance <= 500) return "#10B981";
    if (feedback.distance <= 1000) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {/* User Click Circle - Color based on distance */}
      <div
        className={`absolute w-4 h-4 ${getUserClickColor()} rounded-full border-2 border-white transform -translate-x-2 -translate-y-2 transition-all duration-300 ${
          showCircles ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
        style={{
          left: feedback.userClick.x,
          top: feedback.userClick.y,
        }}
      />

      {/* Correct Location Circle (Always Green) */}
      <div
        className={`absolute w-5 h-5 bg-green-500 rounded-full border-2 border-white transform -translate-x-2.5 -translate-y-2.5 transition-all duration-300 delay-200 ${
          showCircles ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
        style={{
          left: feedback.correctLocation.x,
          top: feedback.correctLocation.y,
        }}
      />

      {/* Connecting Line - Color based on distance */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      >
        <line
          x1={feedback.userClick.x}
          y1={feedback.userClick.y}
          x2={feedback.correctLocation.x}
          y2={feedback.correctLocation.y}
          stroke={getLineColor()}
          strokeWidth="2"
          strokeDasharray="5,5"
          className={`transition-all duration-500 ${
            showLine ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </svg>

      {/* Feedback Text - Top Right Corner */}
      <div 
        className={`absolute top-5 right-5 transform transition-all duration-300 ${
          showText ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
        }`}
      >
        <Card className="p-3 bg-white/95 backdrop-blur-sm shadow-lg">
          <div className="text-right space-y-1">
            <div className={`text-lg font-bold ${getAccuracyColor()}`}>
              {getAccuracyMessage()}
            </div>
            <div className="text-sm text-gray-600">
              Distance: {feedback.distance}km
            </div>
            {feedback.distance <= 500 && (
              <div className="text-sm text-green-600 font-semibold">
                +{Math.round(feedback.accuracy * 100)} points
              </div>
            )}
            {feedback.distance > 500 && feedback.distance <= 1000 && (
              <div className="text-sm text-yellow-600 font-semibold">
                Answer bonus to save heart!
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Educational Fact - Bottom Center */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-300 delay-300 ${
          showText ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <Card className="p-4 bg-blue-50/95 backdrop-blur-sm shadow-lg max-w-md">
          <div className="text-center">
            <div className="text-sm font-semibold text-blue-800 mb-1">
              Did you know?
            </div>
            <div className="text-sm text-blue-700">
              {country.funFacts[currentFactIndex]}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackOverlay;
