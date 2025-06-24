
export type GameState = 'start' | 'playing' | 'end';
export type Difficulty = 1 | 2 | 3 | 4 | 5 | 6;

export interface Country {
  id: string;
  name: string;
  x: number; // SVG coordinates
  y: number; // SVG coordinates
  difficulty: Difficulty;
  region: string;
  realWorldCoords: {
    lat: number;
    lng: number;
  };
  funFacts: string[];
  size: 'large' | 'medium' | 'small' | 'tiny';
}

export interface GameStats {
  score: number;
  lives: number;
  questionsAnswered: number;
}

export interface ClickFeedback {
  userClick: { x: number; y: number };
  correctLocation: { x: number; y: number };
  distance: number; // in kilometers
  accuracy: number; // percentage
  isCorrect: boolean;
}
