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
    character: "Math Whiz",
    category: "Math & Logic",
    image: "https://images.pexels.com/photos/4145196/pexels-photo-4145196.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Solve math puzzles and equations in a fun, challenging quest!",
    rating: 4.7,
    ageRange: "7-14",
    isNew: true,
    longDescription: "Sharpen your math skills with Calc Quest Genius! Tackle a variety of math puzzles, equations, and logic challenges designed to make learning math fun and engaging. Perfect for aspiring math whizzes and puzzle lovers.",
    learningObjectives: ["Arithmetic operations", "Equation solving", "Logical reasoning", "Pattern recognition"],
    skills: ["Math fluency", "Problem solving", "Critical thinking", "Attention to detail"],
    gameplayDescription: "Players must solve equations and math puzzles to reach the target number. Use logic and math skills to progress through increasingly challenging levels. Hints and practice mode available for extra help!"
  },
  {
    id: 4,
    title: "Camp Memory Trails",
    character: "Memory Explorer",
    category: "Memory & Matching",
    image: "https://images.pexels.com/photos/163036/memory-memory-game-concentration-play-163036.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Test and train your memory with fun matching challenges in a camp setting!",
    rating: 4.6,
    ageRange: "5-12",
    isNew: true,
    longDescription: "Join the adventure at Camp Memory Trails! Flip cards, find pairs, and complete memory challenges in a cozy camp environment. Perfect for kids and families looking to boost memory and concentration skills while having fun.",
    learningObjectives: ["Memory recall", "Pattern recognition", "Concentration", "Visual matching"],
    skills: ["Short-term memory", "Attention to detail", "Visual processing", "Problem solving"],
    gameplayDescription: "Players flip cards to find matching pairs, complete memory challenges, and progress through levels of increasing difficulty. The game features a camp theme and rewards for quick and accurate matches!"
  },
  {
    id: 5,
    title: "Clue Shift Mystery Web",
    character: "Detective",
    category: "Logic & Deduction",
    image: "https://images.pexels.com/photos/1704120/pexels-photo-1704120.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Solve mysteries, crack ciphers, and deduce the culprit in this interactive detective adventure!",
    rating: 4.9,
    ageRange: "8-16",
    isNew: true,
    longDescription: "Step into the shoes of a detective! Investigate cases, gather clues, interview suspects, and solve logic puzzles and ciphers. Each case is a new challenge that will test your reasoning and deduction skills.",
    learningObjectives: ["Critical thinking", "Deductive reasoning", "Pattern recognition", "Problem solving"],
    skills: ["Logic", "Attention to detail", "Memory", "Communication"],
    gameplayDescription: "Players select a case, gather clues, solve mini-games (like ciphers), and use deduction to identify the culprit. Features interactive dialogue, inventory management, and adaptive difficulty for different grade levels."
  },
  {
    id: 6,
    title: "Bingo en Español Amigos",
    character: "Language Explorer",
    category: "Language Learning",
    image: "https://images.pexels.com/photos/4778664/pexels-photo-4778664.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Learn Spanish vocabulary and phrases through fun bingo games with friends!",
    rating: 4.8,
    ageRange: "6-14",
    isNew: true,
    longDescription: "¡Hola amigos! Join the fun with Bingo en Español! Learn Spanish vocabulary, practice pronunciation, and build language skills through interactive bingo games. Perfect for beginners and intermediate Spanish learners.",
    learningObjectives: ["Spanish vocabulary", "Language comprehension", "Pronunciation practice", "Cultural awareness"],
    skills: ["Language learning", "Memory", "Listening", "Social interaction"],
    gameplayDescription: "Players select difficulty levels and translation directions, then play bingo with Spanish words and phrases. Features audio pronunciation, translation tooltips, and multiple game modes for different learning styles."
  },
  {
    id: 7,
    title: "Code Glitch Busters",
    character: "Code Detective",
    category: "Programming & Logic",
    image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Debug code, fix bugs, and learn programming concepts through interactive challenges!",
    rating: 4.9,
    ageRange: "8-16",
    isNew: true,
    longDescription: "Become a Code Glitch Buster! Debug programs, fix bugs, and learn essential programming concepts through hands-on challenges. Perfect for young coders who want to develop logical thinking and problem-solving skills.",
    learningObjectives: ["Debugging skills", "Programming logic", "Problem identification", "Code analysis"],
    skills: ["Logical thinking", "Attention to detail", "Problem solving", "Computational thinking"],
    gameplayDescription: "Players will identify and fix bugs in code snippets, learn programming concepts, and solve coding challenges. The game features multiple difficulty levels and covers various programming topics suitable for beginners."
  },
  {
    id: 8,
    title: "Cosmic Constellation Cruiser",
    character: "Space Explorer",
    category: "Science & Astronomy",
    image: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=400",
    description: "Navigate through space, learn about constellations, and explore the cosmos!",
    rating: 4.8,
    ageRange: "7-14",
    isNew: true,
    longDescription: "Embark on an interstellar adventure with Cosmic Constellation Cruiser! Navigate through space, learn about different constellations, and discover fascinating facts about the universe. Perfect for young astronomers and space enthusiasts.",
    learningObjectives: ["Constellation recognition", "Space navigation", "Astronomical knowledge", "Spatial reasoning"],
    skills: ["Astronomy", "Navigation", "Pattern recognition", "Scientific curiosity"],
    gameplayDescription: "Players will pilot their cruiser through space, identify constellations, learn about stars and planets, and complete space exploration missions. Features beautiful space visuals and educational content about our universe."
  }
]; 