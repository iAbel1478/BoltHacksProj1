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
    title: "Daniel Tiger's Neighborhood Feelings Game",
    character: "Daniel Tiger",
    category: "Social-Emotional",
    image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Learn about emotions and how to express your feelings in a healthy way.",
    rating: 4.7,
    ageRange: "2-5",
    longDescription: "Join Daniel Tiger as he learns to identify and express different emotions. This interactive game helps young children understand feelings like happiness, sadness, anger, and excitement through engaging activities and songs.",
    learningObjectives: ["Emotional recognition", "Self-expression", "Empathy development", "Social skills"],
    skills: ["Emotional intelligence", "Communication", "Problem-solving"],
    gameplayDescription: "Children will help Daniel Tiger navigate different emotional situations, choose appropriate responses, and learn coping strategies through mini-games and interactive stories."
  },
  {
    id: 3,
    title: "Wild Kratts Creature Power Adventure",
    character: "Wild Kratts",
    category: "Science",
    image: "https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Activate creature powers and learn about amazing animals!",
    rating: 4.9,
    ageRange: "4-8",
    longDescription: "Explore the animal kingdom with Chris and Martin Kratt! Discover incredible animal abilities, activate creature powers, and learn fascinating facts about wildlife from around the world.",
    learningObjectives: ["Animal biology", "Habitat understanding", "Conservation awareness", "Scientific observation"],
    skills: ["Critical thinking", "Nature appreciation", "Research skills"],
    gameplayDescription: "Players will complete missions by using different animal powers, solve wildlife challenges, and explore various ecosystems while learning about animal adaptations and behaviors."
  }
]; 