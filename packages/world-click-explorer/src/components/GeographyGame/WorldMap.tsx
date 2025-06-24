
import React, { useRef, useState } from 'react';
import { Country } from './types';

interface WorldMapProps {
  onMapClick: (x: number, y: number) => void;
  zoomLevel: number;
  targetCountry: Country;
  showTarget: boolean;
  disabled: boolean;
}

const WorldMap: React.FC<WorldMapProps> = ({
  onMapClick,
  zoomLevel,
  targetCountry,
  showTarget,
  disabled
}) => {
  const mapRef = useRef<SVGSVGElement>(null);
  const [crosshair, setCrosshair] = useState({ x: 0, y: 0, show: false });

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (disabled) return;
    
    const svg = mapRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setCrosshair({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setCrosshair(prev => ({ ...prev, show: false }));
  };

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    if (disabled) return;
    
    const svg = mapRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const x = (event.clientX - rect.left) / zoomLevel;
    const y = (event.clientY - rect.top) / zoomLevel;
    
    onMapClick(x, y);
  };

  return (
    <div className="relative w-full h-96 md:h-[600px] overflow-hidden rounded-lg bg-blue-100">
      <svg
        ref={mapRef}
        width="100%"
        height="100%"
        viewBox="0 0 800 400"
        className={`${disabled ? 'cursor-not-allowed' : 'cursor-crosshair'} transition-transform duration-300`}
        style={{ transform: `scale(${zoomLevel})` }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {/* Ocean Background */}
        <rect width="800" height="400" fill="#3B82F6" />
        
        {/* Continents with Accurate Positioning */}
        <g fill="#10b981" stroke="#059669" strokeWidth="1">
          {/* North America - More accurate shape and position */}
          <polygon points="60,90 90,80 120,85 150,90 180,95 220,100 250,110 280,120 300,140 320,160 310,180 290,200 270,210 250,220 220,210 190,200 160,190 130,180 100,170 80,150 70,130 65,110" 
                   className="hover:fill-green-400 transition-colors duration-200" />
          
          {/* South America - Better proportions */}
          <polygon points="270,250 290,240 310,245 325,260 335,280 340,300 345,320 350,340 345,360 340,380 330,390 315,385 300,380 285,370 275,350 270,330 265,310 265,290 268,270"
                   className="hover:fill-green-400 transition-colors duration-200" />
          
          {/* Europe - More detailed coastline */}
          <polygon points="400,110 420,105 440,108 460,115 480,120 500,125 490,140 485,155 480,170 470,175 460,180 450,175 440,170 430,165 420,160 410,155 405,140 402,125"
                   className="hover:fill-green-400 transition-colors duration-200" />
          
          {/* Africa - Characteristic shape */}
          <polygon points="420,190 440,185 460,190 480,200 495,220 500,240 505,260 500,280 495,300 485,320 475,335 465,345 450,350 435,345 425,335 420,320 415,300 418,280 422,260 425,240 423,220 421,200"
                   className="hover:fill-green-400 transition-colors duration-200" />
          
          {/* Asia - Spanning large area */}
          <polygon points="500,90 530,85 560,90 590,95 620,100 650,105 680,110 700,120 720,135 730,150 725,170 720,190 710,210 700,225 680,235 660,240 640,235 620,230 600,220 580,210 560,200 540,185 520,170 510,155 505,140 502,125 501,110"
                   className="hover:fill-green-400 transition-colors duration-200" />
          
          {/* Australia - Island continent */}
          <polygon points="650,330 680,325 710,330 730,340 740,355 735,370 725,380 710,385 695,385 680,380 665,375 655,365 650,350"
                   className="hover:fill-green-400 transition-colors duration-200" />
          
          {/* Greenland */}
          <polygon points="320,60 340,55 355,60 365,70 360,85 350,95 340,90 330,85 325,75"
                   className="hover:fill-green-400 transition-colors duration-200" />
        </g>

        {/* Country markers - positioned more accurately */}
        <g>
          {/* Major population centers as visual guides */}
          <circle cx="200" cy="180" r="3" fill="#1E40AF" opacity="0.6" />
          <circle cx="320" cy="280" r="3" fill="#1E40AF" opacity="0.6" />
          <circle cx="440" cy="160" r="3" fill="#1E40AF" opacity="0.6" />
          <circle cx="480" cy="220" r="3" fill="#1E40AF" opacity="0.6" />
          <circle cx="600" cy="200" r="3" fill="#1E40AF" opacity="0.6" />
          <circle cx="680" cy="360" r="3" fill="#1E40AF" opacity="0.6" />
        </g>

        {/* Target country indicator */}
        {showTarget && (
          <g>
            <circle
              cx={targetCountry.x}
              cy={targetCountry.y}
              r="20"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              className="animate-pulse"
            />
            <circle
              cx={targetCountry.x}
              cy={targetCountry.y}
              r="8"
              fill="#ef4444"
            />
          </g>
        )}
      </svg>

      {/* Crosshair */}
      {crosshair.show && !disabled && (
        <div
          className="absolute pointer-events-none z-10"
          style={{
            left: crosshair.x - 10,
            top: crosshair.y - 10,
            width: 20,
            height: 20
          }}
        >
          <div className="w-full h-full relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-500"></div>
            <div className="absolute left-1/2 top-0 w-0.5 h-full bg-red-500"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorldMap;
