import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Star, Rocket, RotateCcw, Fuel, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface Point {
  x: number;
  y: number;
}

interface Constellation {
  name: string;
  stars: Point[];
  connections: [number, number][];
  description: string;
  difficulty: number;
}

interface SpaceshipSkin {
  id: string;
  name: string;
  cost: number;
  colors: {
    body: string;
    nose: string;
    wings: string;
    glow: string;
  };
  gradient?: string;
}

const spaceshipSkins: SpaceshipSkin[] = [
  {
    id: 'default',
    name: 'Standard',
    cost: 0,
    colors: {
      body: '#C0C0C0',
      nose: '#FFFFFF',
      wings: '#808080',
      glow: '#00BFFF'
    }
  },
  {
    id: 'nasa-blue',
    name: 'NASA Blue',
    cost: 5000,
    colors: {
      body: '#0B3D91',
      nose: '#FC3D21',
      wings: '#002147',
      glow: '#4A90E2'
    }
  },
  {
    id: 'mars-red',
    name: 'Mars Explorer',
    cost: 7000,
    colors: {
      body: '#CD5C5C',
      nose: '#FFD700',
      wings: '#B22222',
      glow: '#FF6B35'
    }
  },
  {
    id: 'apollo-gold',
    name: 'Apollo Gold',
    cost: 9000,
    colors: {
      body: '#FFD700',
      nose: '#FFA500',
      wings: '#DAA520',
      glow: '#FFFF00'
    }
  },
  {
    id: 'nebula-purple',
    name: 'Nebula Purple',
    cost: 12000,
    colors: {
      body: '#663399',
      nose: '#9966CC',
      wings: '#4B0082',
      glow: '#8A2BE2'
    }
  }
];

const constellations: Constellation[] = [
  // Beginner Level (1-5)
  {
    name: "Orion's Belt",
    stars: [
      { x: 300, y: 200 },
      { x: 420, y: 220 },
      { x: 540, y: 240 }
    ],
    connections: [[0, 1], [1, 2]],
    description: "Draw a line through the three stars of Orion's Belt",
    difficulty: 1
  },
  {
    name: "Southern Cross",
    stars: [
      { x: 350, y: 150 },
      { x: 380, y: 230 },
      { x: 320, y: 280 },
      { x: 280, y: 210 }
    ],
    connections: [[0, 1], [1, 2], [1, 3]],
    description: "Trace the Southern Cross constellation",
    difficulty: 1
  },
  {
    name: "Big Dipper",
    stars: [
      { x: 180, y: 150 },
      { x: 260, y: 140 },
      { x: 340, y: 130 },
      { x: 420, y: 135 },
      { x: 460, y: 200 },
      { x: 400, y: 270 },
      { x: 320, y: 240 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
    description: "Trace the Big Dipper constellation",
    difficulty: 2
  },
  {
    name: "Cassiopeia",
    stars: [
      { x: 150, y: 200 },
      { x: 230, y: 140 },
      { x: 320, y: 180 },
      { x: 410, y: 120 },
      { x: 490, y: 160 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4]],
    description: "Draw the distinctive W shape of Cassiopeia",
    difficulty: 2
  },
  {
    name: "Corona Borealis",
    stars: [
      { x: 250, y: 180 },
      { x: 320, y: 150 },
      { x: 400, y: 140 },
      { x: 480, y: 150 },
      { x: 550, y: 180 },
      { x: 520, y: 230 },
      { x: 280, y: 230 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]],
    description: "Create the Northern Crown",
    difficulty: 2
  },
  
  // Intermediate Level (6-15)
  {
    name: "Leo",
    stars: [
      { x: 160, y: 180 },
      { x: 220, y: 140 },
      { x: 300, y: 130 },
      { x: 380, y: 150 },
      { x: 440, y: 200 },
      { x: 420, y: 280 },
      { x: 340, y: 260 },
      { x: 260, y: 240 },
      { x: 200, y: 220 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 0]],
    description: "Trace the majestic lion Leo",
    difficulty: 3
  },
  {
    name: "Cygnus",
    stars: [
      { x: 350, y: 80 },
      { x: 350, y: 160 },
      { x: 350, y: 240 },
      { x: 350, y: 320 },
      { x: 270, y: 180 },
      { x: 430, y: 180 },
      { x: 200, y: 200 },
      { x: 500, y: 200 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [1, 4], [1, 5], [4, 6], [5, 7]],
    description: "Draw the Northern Cross (Cygnus)",
    difficulty: 3
  },
  {
    name: "Scorpius",
    stars: [
      { x: 200, y: 150 },
      { x: 280, y: 140 },
      { x: 360, y: 160 },
      { x: 420, y: 200 },
      { x: 460, y: 260 },
      { x: 480, y: 340 },
      { x: 460, y: 420 },
      { x: 420, y: 480 },
      { x: 360, y: 460 },
      { x: 300, y: 440 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]],
    description: "Trace the scorpion's curved tail",
    difficulty: 3
  },
  {
    name: "Draco",
    stars: [
      { x: 120, y: 100 },
      { x: 200, y: 120 },
      { x: 280, y: 110 },
      { x: 360, y: 130 },
      { x: 440, y: 140 },
      { x: 520, y: 160 },
      { x: 580, y: 200 },
      { x: 620, y: 260 },
      { x: 600, y: 340 },
      { x: 560, y: 420 },
      { x: 500, y: 460 },
      { x: 420, y: 480 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11]],
    description: "Trace the winding dragon Draco",
    difficulty: 4
  },
  {
    name: "Boötes",
    stars: [
      { x: 300, y: 120 },
      { x: 260, y: 180 },
      { x: 240, y: 260 },
      { x: 280, y: 340 },
      { x: 340, y: 380 },
      { x: 400, y: 340 },
      { x: 440, y: 260 },
      { x: 420, y: 180 },
      { x: 380, y: 120 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 0]],
    description: "Draw the Herdsman constellation",
    difficulty: 3
  },
  {
    name: "Aquarius",
    stars: [
      { x: 180, y: 160 },
      { x: 240, y: 140 },
      { x: 320, y: 130 },
      { x: 400, y: 140 },
      { x: 480, y: 160 },
      { x: 360, y: 200 },
      { x: 280, y: 240 },
      { x: 340, y: 280 },
      { x: 420, y: 300 },
      { x: 500, y: 320 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 6], [6, 7], [7, 8], [8, 9]],
    description: "Create the Water Bearer",
    difficulty: 4
  },
  {
    name: "Pegasus",
    stars: [
      { x: 200, y: 180 },
      { x: 320, y: 160 },
      { x: 440, y: 180 },
      { x: 420, y: 300 },
      { x: 240, y: 320 },
      { x: 360, y: 240 },
      { x: 480, y: 120 },
      { x: 540, y: 200 },
      { x: 160, y: 120 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 5], [2, 6], [6, 7], [0, 8]],
    description: "Draw the flying horse Pegasus",
    difficulty: 4
  },
  {
    name: "Andromeda",
    stars: [
      { x: 180, y: 150 },
      { x: 260, y: 140 },
      { x: 340, y: 145 },
      { x: 420, y: 135 },
      { x: 500, y: 150 },
      { x: 320, y: 200 },
      { x: 380, y: 240 },
      { x: 440, y: 280 },
      { x: 280, y: 260 },
      { x: 240, y: 300 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 6], [6, 7], [5, 8], [8, 9]],
    description: "Draw the princess constellation Andromeda",
    difficulty: 4
  },
  {
    name: "Perseus",
    stars: [
      { x: 160, y: 120 },
      { x: 220, y: 110 },
      { x: 280, y: 130 },
      { x: 340, y: 140 },
      { x: 400, y: 160 },
      { x: 380, y: 220 },
      { x: 320, y: 200 },
      { x: 260, y: 180 },
      { x: 200, y: 160 },
      { x: 460, y: 180 },
      { x: 500, y: 240 },
      { x: 140, y: 180 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 0], [4, 9], [9, 10], [0, 11]],
    description: "Create the hero Perseus constellation",
    difficulty: 5
  },
  {
    name: "Hercules",
    stars: [
      { x: 200, y: 120 },
      { x: 280, y: 100 },
      { x: 360, y: 120 },
      { x: 440, y: 140 },
      { x: 480, y: 220 },
      { x: 460, y: 300 },
      { x: 400, y: 360 },
      { x: 320, y: 380 },
      { x: 240, y: 360 },
      { x: 180, y: 300 },
      { x: 160, y: 220 },
      { x: 300, y: 200 },
      { x: 380, y: 260 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 5]],
    description: "Draw the mighty Hercules",
    difficulty: 5
  },
  
  // Advanced Level (16-25)
  {
    name: "Ophiuchus",
    stars: [
      { x: 180, y: 140 },
      { x: 240, y: 120 },
      { x: 320, y: 110 },
      { x: 400, y: 120 },
      { x: 460, y: 140 },
      { x: 480, y: 200 },
      { x: 460, y: 260 },
      { x: 420, y: 320 },
      { x: 360, y: 360 },
      { x: 280, y: 380 },
      { x: 220, y: 360 },
      { x: 180, y: 320 },
      { x: 160, y: 260 },
      { x: 140, y: 200 },
      { x: 320, y: 240 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 0], [2, 14], [14, 7]],
    description: "Create the Serpent Bearer",
    difficulty: 5
  },
  {
    name: "Lyra",
    stars: [
      { x: 300, y: 160 },
      { x: 260, y: 200 },
      { x: 240, y: 260 },
      { x: 280, y: 320 },
      { x: 340, y: 340 },
      { x: 400, y: 320 },
      { x: 440, y: 260 },
      { x: 420, y: 200 },
      { x: 380, y: 160 },
      { x: 340, y: 180 },
      { x: 320, y: 220 },
      { x: 360, y: 240 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 0], [0, 9], [9, 10], [10, 11], [11, 5]],
    description: "Draw the Harp constellation",
    difficulty: 5
  },
  {
    name: "Aquila",
    stars: [
      { x: 320, y: 120 },
      { x: 280, y: 160 },
      { x: 240, y: 220 },
      { x: 220, y: 280 },
      { x: 240, y: 340 },
      { x: 280, y: 380 },
      { x: 340, y: 400 },
      { x: 400, y: 380 },
      { x: 440, y: 340 },
      { x: 460, y: 280 },
      { x: 440, y: 220 },
      { x: 400, y: 160 },
      { x: 360, y: 120 },
      { x: 340, y: 200 },
      { x: 320, y: 260 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 0], [1, 13], [13, 14], [14, 8]],
    description: "Create the Eagle soaring high",
    difficulty: 6
  },
  {
    name: "Delphinus",
    stars: [
      { x: 280, y: 180 },
      { x: 320, y: 160 },
      { x: 380, y: 170 },
      { x: 440, y: 200 },
      { x: 480, y: 250 },
      { x: 460, y: 310 },
      { x: 420, y: 350 },
      { x: 360, y: 360 },
      { x: 300, y: 350 },
      { x: 260, y: 310 },
      { x: 240, y: 250 },
      { x: 260, y: 220 },
      { x: 340, y: 240 },
      { x: 400, y: 280 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 0], [1, 12], [12, 13], [13, 5]],
    description: "Draw the playful Dolphin",
    difficulty: 6
  },
  {
    name: "Capricornus",
    stars: [
      { x: 200, y: 200 },
      { x: 260, y: 180 },
      { x: 340, y: 170 },
      { x: 420, y: 180 },
      { x: 480, y: 220 },
      { x: 520, y: 280 },
      { x: 500, y: 340 },
      { x: 460, y: 380 },
      { x: 400, y: 400 },
      { x: 320, y: 390 },
      { x: 260, y: 360 },
      { x: 220, y: 320 },
      { x: 180, y: 260 },
      { x: 360, y: 240 },
      { x: 280, y: 300 },
      { x: 440, y: 300 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 0], [2, 13], [13, 14], [14, 10], [3, 15], [15, 7]],
    description: "Create the Sea Goat constellation",
    difficulty: 6
  },
  {
    name: "Corvus",
    stars: [
      { x: 260, y: 180 },
      { x: 340, y: 160 },
      { x: 420, y: 180 },
      { x: 480, y: 240 },
      { x: 460, y: 320 },
      { x: 400, y: 380 },
      { x: 320, y: 400 },
      { x: 240, y: 380 },
      { x: 200, y: 320 },
      { x: 180, y: 240 },
      { x: 300, y: 220 },
      { x: 380, y: 280 },
      { x: 280, y: 340 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 0], [1, 10], [10, 11], [11, 4], [7, 12], [12, 9]],
    description: "Draw the mystical Raven",
    difficulty: 6
  },
  {
    name: "Vulpecula",
    stars: [
      { x: 240, y: 160 },
      { x: 300, y: 140 },
      { x: 380, y: 150 },
      { x: 460, y: 180 },
      { x: 520, y: 240 },
      { x: 540, y: 320 },
      { x: 520, y: 400 },
      { x: 480, y: 460 },
      { x: 420, y: 500 },
      { x: 340, y: 480 },
      { x: 280, y: 440 },
      { x: 240, y: 380 },
      { x: 220, y: 320 },
      { x: 200, y: 240 },
      { x: 340, y: 220 },
      { x: 420, y: 300 },
      { x: 300, y: 360 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 0], [1, 14], [14, 15], [15, 6], [10, 16], [16, 12]],
    description: "Create the cunning Fox",
    difficulty: 7
  },
  {
    name: "Sagitta",
    stars: [
      { x: 200, y: 220 },
      { x: 280, y: 200 },
      { x: 360, y: 190 },
      { x: 440, y: 200 },
      { x: 520, y: 220 },
      { x: 580, y: 260 },
      { x: 520, y: 300 },
      { x: 440, y: 280 },
      { x: 360, y: 270 },
      { x: 280, y: 280 },
      { x: 200, y: 260 },
      { x: 160, y: 240 },
      { x: 320, y: 240 },
      { x: 480, y: 240 },
      { x: 400, y: 230 },
      { x: 240, y: 250 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 0], [2, 12], [12, 8], [3, 13], [13, 7], [12, 14], [14, 13], [10, 15], [15, 1]],
    description: "Draw the Arrow constellation",
    difficulty: 7
  },
  {
    name: "Lacerta",
    stars: [
      { x: 180, y: 140 },
      { x: 240, y: 120 },
      { x: 320, y: 110 },
      { x: 400, y: 120 },
      { x: 480, y: 140 },
      { x: 540, y: 180 },
      { x: 580, y: 240 },
      { x: 560, y: 320 },
      { x: 520, y: 380 },
      { x: 460, y: 420 },
      { x: 380, y: 440 },
      { x: 300, y: 420 },
      { x: 240, y: 380 },
      { x: 200, y: 320 },
      { x: 180, y: 240 },
      { x: 160, y: 180 },
      { x: 280, y: 200 },
      { x: 420, y: 220 },
      { x: 480, y: 300 },
      { x: 320, y: 340 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 0], [1, 16], [16, 17], [17, 4], [8, 18], [18, 11], [16, 19], [19, 13]],
    description: "Create the Lizard constellation",
    difficulty: 7
  },
  {
    name: "Triangulum",
    stars: [
      { x: 200, y: 160 },
      { x: 320, y: 120 },
      { x: 480, y: 140 },
      { x: 540, y: 220 },
      { x: 520, y: 320 },
      { x: 460, y: 400 },
      { x: 380, y: 460 },
      { x: 280, y: 480 },
      { x: 200, y: 460 },
      { x: 140, y: 400 },
      { x: 100, y: 320 },
      { x: 120, y: 220 },
      { x: 180, y: 140 },
      { x: 300, y: 200 },
      { x: 420, y: 240 },
      { x: 460, y: 340 },
      { x: 340, y: 380 },
      { x: 220, y: 340 },
      { x: 180, y: 240 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 0], [1, 13], [13, 14], [14, 3], [5, 15], [15, 16], [16, 7], [9, 17], [17, 18], [18, 11], [13, 18], [14, 15], [16, 17]],
    description: "Draw the Triangle constellation",
    difficulty: 8
  },
  
  // Expert Level (26-35)
  {
    name: "Eridanus",
    stars: [
      { x: 120, y: 100 },
      { x: 180, y: 120 },
      { x: 240, y: 110 },
      { x: 320, y: 100 },
      { x: 400, y: 110 },
      { x: 480, y: 130 },
      { x: 540, y: 170 },
      { x: 580, y: 230 },
      { x: 600, y: 300 },
      { x: 580, y: 380 },
      { x: 540, y: 440 },
      { x: 480, y: 480 },
      { x: 400, y: 500 },
      { x: 320, y: 480 },
      { x: 240, y: 460 },
      { x: 180, y: 420 },
      { x: 140, y: 360 },
      { x: 120, y: 280 },
      { x: 100, y: 200 },
      { x: 80, y: 140 },
      { x: 200, y: 200 },
      { x: 360, y: 220 },
      { x: 520, y: 300 },
      { x: 420, y: 380 },
      { x: 220, y: 340 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17], [17, 18], [18, 19], [19, 0], [2, 20], [20, 17], [4, 21], [21, 9], [7, 22], [22, 11], [13, 23], [23, 15], [20, 24], [24, 16]],
    description: "Trace the winding River constellation",
    difficulty: 8
  },
  {
    name: "Hydra",
    stars: [
      { x: 100, y: 150 },
      { x: 160, y: 140 },
      { x: 220, y: 130 },
      { x: 280, y: 125 },
      { x: 340, y: 130 },
      { x: 400, y: 140 },
      { x: 460, y: 155 },
      { x: 520, y: 175 },
      { x: 570, y: 200 },
      { x: 610, y: 235 },
      { x: 640, y: 280 },
      { x: 650, y: 330 },
      { x: 640, y: 380 },
      { x: 620, y: 425 },
      { x: 580, y: 460 },
      { x: 530, y: 480 },
      { x: 470, y: 490 },
      { x: 410, y: 485 },
      { x: 350, y: 470 },
      { x: 300, y: 445 },
      { x: 260, y: 410 },
      { x: 230, y: 365 },
      { x: 210, y: 315 },
      { x: 200, y: 265 },
      { x: 180, y: 220 },
      { x: 140, y: 190 },
      { x: 180, y: 160 },
      { x: 260, y: 170 },
      { x: 380, y: 200 },
      { x: 500, y: 240 },
      { x: 580, y: 320 },
      { x: 520, y: 400 },
      { x: 400, y: 430 },
      { x: 280, y: 380 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17], [17, 18], [18, 19], [19, 20], [20, 21], [21, 22], [22, 23], [23, 24], [24, 25], [25, 0], [1, 26], [26, 24], [3, 27], [27, 23], [6, 28], [28, 20], [9, 29], [29, 17], [12, 30], [30, 15], [19, 31], [31, 14], [27, 32], [32, 21], [28, 33], [33, 22]],
    description: "Draw the massive Water Snake",
    difficulty: 9
  },
  {
    name: "Ursa Major",
    stars: [
      { x: 120, y: 140 },
      { x: 180, y: 120 },
      { x: 240, y: 110 },
      { x: 300, y: 115 },
      { x: 360, y: 125 },
      { x: 420, y: 140 },
      { x: 480, y: 160 },
      { x: 520, y: 200 },
      { x: 540, y: 260 },
      { x: 520, y: 320 },
      { x: 480, y: 370 },
      { x: 420, y: 400 },
      { x: 360, y: 410 },
      { x: 300, y: 400 },
      { x: 240, y: 380 },
      { x: 180, y: 350 },
      { x: 140, y: 310 },
      { x: 110, y: 260 },
      { x: 100, y: 200 },
      { x: 110, y: 140 },
      { x: 200, y: 180 },
      { x: 320, y: 200 },
      { x: 460, y: 240 },
      { x: 480, y: 320 },
      { x: 380, y: 360 },
      { x: 260, y: 340 },
      { x: 160, y: 280 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17], [17, 18], [18, 19], [19, 0], [1, 20], [20, 17], [3, 21], [21, 15], [6, 22], [22, 12], [9, 23], [23, 11], [13, 24], [24, 16], [20, 25], [25, 14], [21, 26], [26, 18]],
    description: "Create the Great Bear constellation",
    difficulty: 9
  },
  {
    name: "Centaurus",
    stars: [
      { x: 150, y: 120 },
      { x: 210, y: 110 },
      { x: 280, y: 105 },
      { x: 350, y: 110 },
      { x: 420, y: 120 },
      { x: 480, y: 140 },
      { x: 530, y: 170 },
      { x: 570, y: 210 },
      { x: 590, y: 260 },
      { x: 580, y: 320 },
      { x: 550, y: 370 },
      { x: 500, y: 410 },
      { x: 440, y: 440 },
      { x: 370, y: 450 },
      { x: 300, y: 440 },
      { x: 240, y: 420 },
      { x: 190, y: 390 },
      { x: 150, y: 350 },
      { x: 120, y: 300 },
      { x: 110, y: 240 },
      { x: 120, y: 180 },
      { x: 200, y: 160 },
      { x: 320, y: 170 },
      { x: 460, y: 200 },
      { x: 540, y: 260 },
      { x: 520, y: 340 },
      { x: 440, y: 390 },
      { x: 320, y: 400 },
      { x: 200, y: 380 },
      { x: 140, y: 320 },
      { x: 160, y: 240 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17], [17, 18], [18, 19], [19, 20], [20, 0], [1, 21], [21, 19], [3, 22], [22, 17], [5, 23], [23, 15], [8, 24], [24, 12], [11, 25], [25, 16], [21, 26], [26, 14], [22, 27], [27, 25], [26, 28], [28, 18], [21, 29], [29, 20], [22, 30], [30, 19]],
    description: "Draw the mythical Centaur",
    difficulty: 10
  },
  {
    name: "Fornax",
    stars: [
      { x: 180, y: 150 },
      { x: 240, y: 130 },
      { x: 320, y: 120 },
      { x: 400, y: 130 },
      { x: 480, y: 150 },
      { x: 540, y: 190 },
      { x: 580, y: 240 },
      { x: 600, y: 300 },
      { x: 580, y: 360 },
      { x: 540, y: 410 },
      { x: 480, y: 450 },
      { x: 400, y: 470 },
      { x: 320, y: 480 },
      { x: 240, y: 470 },
      { x: 180, y: 450 },
      { x: 140, y: 410 },
      { x: 100, y: 360 },
      { x: 80, y: 300 },
      { x: 100, y: 240 },
      { x: 140, y: 190 },
      { x: 260, y: 200 },
      { x: 360, y: 180 },
      { x: 460, y: 220 },
      { x: 520, y: 280 },
      { x: 500, y: 360 },
      { x: 440, y: 420 },
      { x: 360, y: 440 },
      { x: 260, y: 420 },
      { x: 200, y: 360 },
      { x: 180, y: 280 },
      { x: 220, y: 220 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17], [17, 18], [18, 19], [19, 0], [1, 20], [20, 18], [3, 21], [21, 16], [5, 22], [22, 14], [7, 23], [23, 12], [9, 24], [24, 15], [11, 25], [25, 17], [13, 26], [26, 19], [20, 27], [27, 24], [21, 28], [28, 25], [22, 29], [29, 26], [20, 30], [30, 19]],
    description: "Create the Furnace constellation",
    difficulty: 10
  }
];

export const ConstellationGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [shipPosition, setShipPosition] = useState<Point>({ x: 100, y: 300 });
  const [targetPosition, setTargetPosition] = useState<Point>({ x: 100, y: 300 });
  const [shipRotation, setShipRotation] = useState(0);
  const [fuel, setFuel] = useState(100);
  const [drawnPath, setDrawnPath] = useState<Point[]>([]);
  const [completedConnections, setCompletedConnections] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'completed' | 'levelComplete'>('playing');
  const [backgroundStars, setBackgroundStars] = useState<Point[]>([]);
  const [starTwinkles, setStarTwinkles] = useState<Map<number, number>>(new Map());
  const [currentSkin, setCurrentSkin] = useState<string>('default');
  const [ownedSkins, setOwnedSkins] = useState<Set<string>>(new Set(['default']));
  const [currentConnection, setCurrentConnection] = useState<number>(0);

  const currentConstellation = constellations[currentLevel];
  const currentSpaceshipSkin = spaceshipSkins.find(skin => skin.id === currentSkin) || spaceshipSkins[0];
  const isNumberedLevel = currentLevel >= 14; // Levels 15-30 (index 14-29)

  // Generate background stars with twinkle animation
  useEffect(() => {
    const stars: Point[] = [];
    const twinkles = new Map<number, number>();
    for (let i = 0; i < 500; i++) {
      stars.push({
        x: Math.random() * 1200,
        y: Math.random() * 800
      });
      twinkles.set(i, Math.random() * Math.PI * 2);
    }
    setBackgroundStars(stars);
    setStarTwinkles(twinkles);
  }, []);

  // Update twinkle animation
  useEffect(() => {
    const interval = setInterval(() => {
      setStarTwinkles(prev => {
        const newTwinkles = new Map(prev);
        for (let i = 0; i < backgroundStars.length; i++) {
          newTwinkles.set(i, (newTwinkles.get(i) || 0) + 0.1);
        }
        return newTwinkles;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [backgroundStars.length]);

  // Smooth spaceship movement with precise cursor tracking
  useEffect(() => {
    const animate = () => {
      setShipPosition(current => {
        // Make spaceship position match cursor exactly
        const dx = targetPosition.x - current.x;
        const dy = targetPosition.y - current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 1) {
          // Much faster movement for precise tracking
          const speed = Math.min(distance, 15);
          const newX = current.x + (dx / distance) * speed;
          const newY = current.y + (dy / distance) * speed;
          
          // Calculate rotation towards target
          const angle = Math.atan2(dy, dx);
          setShipRotation(angle);
          
          // Consume fuel much faster when drawing
          if (isDrawing) {
            setFuel(prev => Math.max(0, prev - .5));
          }
          
          return { x: newX, y: newY };
        }
        return current;
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetPosition, isDrawing]);

  // Regenerate fuel over time
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDrawing) {
        setFuel(prev => Math.min(100, prev + 1.5));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isDrawing]);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with deep space gradient
    const gradient = ctx.createRadialGradient(600, 400, 0, 600, 400, 800);
    gradient.addColorStop(0, '#000428');
    gradient.addColorStop(1, '#004e92');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw twinkling background stars
    backgroundStars.forEach((star, index) => {
      const twinkle = starTwinkles.get(index) || 0;
      const brightness = 0.3 + 0.7 * (Math.sin(twinkle) * 0.5 + 0.5);
      ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw constellation stars with golden twinkle effect
    currentConstellation.stars.forEach((star, index) => {
      const isConnected = currentConstellation.connections.some(([start, end]) => 
        (start === index || end === index) && 
        (completedConnections.has(`${start}-${end}`) || completedConnections.has(`${end}-${start}`))
      );
      
      if (isConnected) {
        // Twinkling golden effect for completed stars
        const twinkle = Date.now() * 0.005 + index;
        const brightness = 0.6 + 0.4 * Math.sin(twinkle);
        ctx.fillStyle = `rgba(255, 215, 0, ${brightness})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#FFD700';
      } else {
        ctx.fillStyle = '#ffff00';
        ctx.shadowBlur = 0;
      }
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, 6, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw star glow
      ctx.fillStyle = isConnected ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 255, 0, 0.3)';
      ctx.beginPath();
      ctx.arc(star.x, star.y, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw numbers for levels 15-30
      if (isNumberedLevel) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText((index + 1).toString(), star.x, star.y);
      }
    });

    // Draw completed connections with golden glow
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#FFD700';
    currentConstellation.connections.forEach(([startIdx, endIdx]) => {
      const connectionKey = `${startIdx}-${endIdx}`;
      const reverseKey = `${endIdx}-${startIdx}`;
      if (completedConnections.has(connectionKey) || completedConnections.has(reverseKey)) {
        const start = currentConstellation.stars[startIdx];
        const end = currentConstellation.stars[endIdx];
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }
    });
    ctx.shadowBlur = 0;

    // Draw current path
    if (drawnPath.length > 0 && fuel > 0) {
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 5;
      ctx.shadowColor = '#00ffff';
      ctx.beginPath();
      ctx.moveTo(drawnPath[0].x, drawnPath[0].y);
      drawnPath.forEach(point => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Draw cartoonish spaceship with rotation
    ctx.save();
    ctx.translate(shipPosition.x, shipPosition.y);
    ctx.rotate(shipRotation);
    
    // Ship body (metallic gray)
    ctx.fillStyle = currentSpaceshipSkin.colors.body;
    ctx.beginPath();
    ctx.ellipse(0, 0, 15, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Ship nose (bright white)
    ctx.fillStyle = currentSpaceshipSkin.colors.nose;
    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(8, -5);
    ctx.lineTo(8, 5);
    ctx.closePath();
    ctx.fill();
    
    // Ship wings
    ctx.fillStyle = currentSpaceshipSkin.colors.wings;
    ctx.beginPath();
    ctx.moveTo(-8, -8);
    ctx.lineTo(-15, -12);
    ctx.lineTo(-12, -5);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(-8, 8);
    ctx.lineTo(-15, 12);
    ctx.lineTo(-12, 5);
    ctx.closePath();
    ctx.fill();
    
    // Engine glow when drawing
    if (isDrawing && fuel > 0) {
      ctx.fillStyle = currentSpaceshipSkin.colors.glow;
      ctx.shadowBlur = 15;
      ctx.shadowColor = currentSpaceshipSkin.colors.glow;
      ctx.beginPath();
      ctx.ellipse(-18, 0, 8, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    
    ctx.restore();
  }, [shipPosition, shipRotation, drawnPath, completedConnections, currentConstellation, backgroundStars, starTwinkles, isDrawing, fuel, currentSpaceshipSkin, isNumberedLevel]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setTargetPosition({ x, y });

    if (isDrawing && fuel > 0) {
      setDrawnPath(prev => [...prev, { x, y }]);
      checkConnectionCompletion({ x, y });
    }
  };

  const handleMouseDown = () => {
    if (fuel > 0) {
      setIsDrawing(true);
      setDrawnPath([targetPosition]);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setDrawnPath([]);
  };

  const checkConnectionCompletion = (currentPos: Point) => {
    if (isNumberedLevel) {
      // For numbered levels, check connections in order
      if (currentConnection >= currentConstellation.connections.length) return;
      
      const [startIdx, endIdx] = currentConstellation.connections[currentConnection];
      const connectionKey = `${startIdx}-${endIdx}`;
      
      if (completedConnections.has(connectionKey)) return;

      const start = currentConstellation.stars[startIdx];
      const end = currentConstellation.stars[endIdx];

      // Check if the drawn path passes through both stars with adjusted tolerance for difficulty
      const tolerance = Math.max(15, 25 - currentConstellation.difficulty);
      const pathPassesStart = drawnPath.some(point => 
        Math.sqrt((point.x - start.x) ** 2 + (point.y - start.y) ** 2) < tolerance
      );
      const pathPassesEnd = Math.sqrt((currentPos.x - end.x) ** 2 + (currentPos.y - end.y) ** 2) < tolerance;

      if (pathPassesStart && pathPassesEnd) {
        setCompletedConnections(prev => new Set([...prev, connectionKey]));
        setScore(prev => prev + (100 * currentConstellation.difficulty));
        setCurrentConnection(prev => prev + 1);
      }
    } else {
      // Original logic for non-numbered levels
      currentConstellation.connections.forEach(([startIdx, endIdx]) => {
        const connectionKey = `${startIdx}-${endIdx}`;
        const reverseKey = `${endIdx}-${startIdx}`;
        if (completedConnections.has(connectionKey) || completedConnections.has(reverseKey)) return;

        const start = currentConstellation.stars[startIdx];
        const end = currentConstellation.stars[endIdx];

        // Check if the drawn path passes through both stars with adjusted tolerance for difficulty
        const tolerance = Math.max(15, 25 - currentConstellation.difficulty);
        const pathPassesStart = drawnPath.some(point => 
          Math.sqrt((point.x - start.x) ** 2 + (point.y - start.y) ** 2) < tolerance
        );
        const pathPassesEnd = Math.sqrt((currentPos.x - end.x) ** 2 + (currentPos.y - end.y) ** 2) < tolerance;

        if (pathPassesStart && pathPassesEnd) {
          setCompletedConnections(prev => new Set([...prev, connectionKey]));
          setScore(prev => prev + (100 * currentConstellation.difficulty));
        }
      });
    }
  };

  const checkLevelCompletion = () => {
    if (completedConnections.size === currentConstellation.connections.length) {
      setGameState('levelComplete');
      const bonus = 500 * currentConstellation.difficulty;
      setScore(prev => prev + bonus);
      toast.success(`${currentConstellation.name} completed! +${bonus} bonus points`);
      
      // Auto-advance to next level after 2 seconds
      setTimeout(() => {
        nextLevel();
      }, 2000);
    }
  };

  useEffect(() => {
    checkLevelCompletion();
  }, [completedConnections]);

  const nextLevel = () => {
    if (currentLevel < constellations.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setCompletedConnections(new Set());
      setDrawnPath([]);
      setGameState('playing');
      setShipPosition({ x: 100, y: 300 });
      setTargetPosition({ x: 100, y: 300 });
      setFuel(100);
      setCurrentConnection(0);
    } else {
      setGameState('completed');
      toast.success('Congratulations! All constellations completed!');
    }
  };

  const resetLevel = () => {
    setCompletedConnections(new Set());
    setDrawnPath([]);
    setShipPosition({ x: 100, y: 300 });
    setTargetPosition({ x: 100, y: 300 });
    setFuel(100);
    setGameState('playing');
    setCurrentConnection(0);
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setCompletedConnections(new Set());
    setDrawnPath([]);
    setShipPosition({ x: 100, y: 300 });
    setTargetPosition({ x: 100, y: 300 });
    setFuel(100);
    setGameState('playing');
    setCurrentConnection(0);
  };

  const buySkin = (skinId: string) => {
    const skin = spaceshipSkins.find(s => s.id === skinId);
    if (!skin || ownedSkins.has(skinId) || score < skin.cost) return;

    setScore(prev => prev - skin.cost);
    setOwnedSkins(prev => new Set([...prev, skinId]));
    toast.success(`${skin.name} purchased!`);
  };

  const selectSkin = (skinId: string) => {
    if (ownedSkins.has(skinId)) {
      setCurrentSkin(skinId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-indigo-900 text-white p-2 sm:p-4">
      <div className="max-w-full 2xl:max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <Rocket className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Constellation Creation
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-xl font-bold">{score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Fuel className="w-5 h-5 text-cyan-400" />
              <div className="w-20 h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                  style={{ width: `${fuel}%` }}
                />
              </div>
              <span className="text-sm">{Math.round(fuel)}%</span>
            </div>
            <Button 
              onClick={resetLevel} 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
              size="sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Level
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-4 items-start">
          {/* Canvas Area - dominant */}
          <div className="w-full flex justify-center items-center">
            <div className="w-full flex justify-center items-center">
              <canvas
                ref={canvasRef}
                width={900}
                height={600}
                style={{
                  width: '100%',
                  maxWidth: '900px',
                  height: 'auto',
                  aspectRatio: '3/2',
                  background: 'transparent',
                  display: 'block',
                  borderRadius: '0.75rem',
                  border: '2px solid rgba(96,165,250,0.3)',
                }}
                className="bg-transparent shadow-xl"
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 w-full max-w-full">
            <Card className="p-4 bg-gradient-to-br from-slate-800/50 to-blue-900/50 border-blue-500/30 backdrop-blur-sm">
              <h3 className="text-lg font-bold mb-2 text-cyan-300">
                Level {currentLevel + 1}: {currentConstellation.name}
              </h3>
              <div className="text-xs text-cyan-400 mb-2">
                Difficulty: {Array.from({ length: currentConstellation.difficulty }, (_, i) => '★').join('')}
              </div>
              <p className="text-sm text-blue-200 mb-4">
                {currentConstellation.description}
                {isNumberedLevel && " Connect stars in numerical order (1 → 2 → 3...)"}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress:</span>
                  <span>{completedConnections.size}/{currentConstellation.connections.length}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(completedConnections.size / currentConstellation.connections.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-slate-800/50 to-blue-900/50 border-blue-500/30 backdrop-blur-sm">
              <h4 className="font-bold mb-2 text-cyan-300">Mission Control</h4>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• Navigate your spaceship with the mouse</li>
                <li>• Hold left mouse button to draw constellation lines</li>
                <li>• Connect all stars to complete the mission</li>
                <li>• Monitor your fuel levels carefully</li>
                <li>• Higher levels require more precision</li>
                {isNumberedLevel && <li>• Connect stars in numerical order!</li>}
              </ul>
            </Card>

            <Card className="p-3 bg-gradient-to-br from-slate-800/50 to-blue-900/50 border-blue-500/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingBag className="w-4 h-4 text-cyan-400" />
                <h4 className="font-bold text-cyan-300">Spaceship Shop</h4>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {spaceshipSkins.map((skin) => (
                  <div key={skin.id} className="flex items-center justify-between p-2 bg-slate-700/50 rounded text-xs">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-2 rounded" 
                        style={{ backgroundColor: skin.colors.body }}
                      />
                      <span className="text-blue-200">{skin.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {skin.cost > 0 && (
                        <span className="text-yellow-400 text-xs">{skin.cost}</span>
                      )}
                      {ownedSkins.has(skin.id) ? (
                        <Button
                          size="sm"
                          className={`h-6 px-2 text-xs ${currentSkin === skin.id ? 'bg-green-600' : 'bg-blue-600'}`}
                          onClick={() => selectSkin(skin.id)}
                        >
                          {currentSkin === skin.id ? 'Active' : 'Select'}
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="h-6 px-2 text-xs bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                          onClick={() => buySkin(skin.id)}
                          disabled={score < skin.cost}
                        >
                          Buy
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {gameState === 'completed' && (
              <Card className="p-4 bg-gradient-to-r from-green-900/50 to-blue-900/50 border-green-500/50 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-2 text-green-300">Mission Complete!</h3>
                <p className="text-sm text-green-200 mb-4">
                  You've successfully mapped all constellations in the galaxy!
                </p>
                <Button 
                  onClick={resetGame} 
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  New Mission
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
