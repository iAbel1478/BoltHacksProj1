export interface Game {
  id: number;
  title: string;
  character: string;
  category: string;
  image: string;
  description: string;
  rating: number;
  ageRange: string;
  isNew?: boolean;
  longDescription: string;
  learningObjectives: string[];
  skills: string[];
  gameplayDescription: string;
}

export const allGames: Game[] = [
  {
    id: 1,
    title: "World Click Explorer",
    character: "Geography Explorer",
    category: "Geography",
    image: "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Explore the world map and learn about countries, capitals, and geography!",
    rating: 4.9,
    ageRange: "6-12",
    isNew: true,
    longDescription: "Embark on an interactive journey around the world! Click on countries to learn about their capitals, landmarks, and fascinating facts. Test your geography knowledge with fun challenges and become a world explorer.",
    learningObjectives: ["World geography", "Country recognition", "Capital cities", "Global awareness"],
    skills: ["Geographic literacy", "Memory", "Spatial awareness"],
    gameplayDescription: "Players will click on different countries on an interactive world map, learn about capitals and landmarks, complete geography challenges, and build their knowledge of world geography through engaging gameplay."
  },
  {
    id: 2,
    title: "Quite Artsy Quiz Palooza",
    character: "Art Explorer",
    category: "Art & Creativity",
    image: "https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Explore colors, art styles, and unleash your creativity through fun quizzes and drawing!",
    rating: 4.8,
    ageRange: "5-12",
    isNew: true,
    longDescription: "Dive into a colorful world of artistic expression! Test your knowledge of colors, identify different art styles, and create amazing drawings. This interactive art adventure combines learning with creativity in a fun, engaging way.",
    learningObjectives: ["Color theory", "Art style recognition", "Creative expression", "Visual literacy"],
    skills: ["Artistic creativity", "Color perception", "Visual analysis", "Fine motor skills"],
    gameplayDescription: "Players will take color quizzes, identify different art styles, and use a digital drawing canvas to create artwork. The game features three main modes: Color Quest, Style Detective, and Art Studio."
  },
  {
    id: 3,
    title: "Calc Quest Genius",
    character: "Math Adventurer",
    category: "Math & Logic",
    image: "https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Crack the code! Build equations to match the target number in this math puzzle adventure.",
    rating: 4.7,
    ageRange: "7-14",
    isNew: true,
    longDescription: "Challenge your math skills in Calc Quest Genius! Create equations using numbers and operators to match the target number. Choose your difficulty, use hints, and practice as much as you want. Each guess gives you color-coded feedback—green for correct, yellow for misplaced, gray for not in the equation. Can you solve the puzzle before you run out of attempts?",
    learningObjectives: ["Equation building", "Order of operations", "Arithmetic skills", "Logical reasoning"],
    skills: ["Math fluency", "Problem-solving", "Pattern recognition", "Strategic thinking"],
    gameplayDescription: "Players enter equations using numbers and operators (+, -, ×, ÷) to match a target number. Each guess is checked for correctness and position, with color feedback. Multiple difficulty levels, hints, and practice mode included."
  }
]; 