import React, { useState, useMemo } from 'react';
import GameCard from './GameCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Game {
  id: number;
  title: string;
  character: string;
  category: string;
  image: string;
  description: string;
  rating: number;
  ageRange: string;
  isNew?: boolean;
}

interface GameGridProps {
  searchQuery: string;
  categoryFilter: string;
}

const originalGames: Game[] = [
    {
      id: 1,
      title: "Daniel Tiger's Neighborhood",
      character: "Daniel Tiger",
      category: "Social-Emotional",
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Learn about emotions and how to express your feelings in a healthy way.",
      rating: 4.7,
      ageRange: "2-5"
    },
    {
      id: 2,
      title: "Wild Kratts Creature Power",
      character: "Wild Kratts",
      category: "Science",
      image: "https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Activate creature powers and learn about amazing animals!",
      rating: 4.9,
      ageRange: "4-8"
    },
    {
      id: 3,
      title: "Curious George Math Adventures",
      character: "Curious George",
      category: "Math",
      image: "https://images.pexels.com/photos/714698/pexels-photo-714698.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Join George as he learns counting, shapes, and basic math concepts!",
      rating: 4.8,
      ageRange: "3-6",
      isNew: true
    },
    {
      id: 4,
      title: "Carl the Collector's Sorting Game",
      character: "Carl the Collector",
      category: "Logic",
      image: "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Help Carl organize and sort his amazing collection!",
      rating: 4.6,
      ageRange: "4-7"
    },
    {
      id: 5,
      title: "Lyla in the Loop Problem Solving",
      character: "Lyla in the Loop",
      category: "Problem Solving",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Join Lyla as she solves everyday problems with creativity!",
      rating: 4.5,
      ageRange: "5-8",
      isNew: true
    },
    {
      id: 6,
      title: "Arthur's Reading Adventures",
      character: "Arthur",
      category: "Reading",
      image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Practice reading skills with Arthur and his friends!",
      rating: 4.8,
      ageRange: "4-8"
  },
  {
    id: 7,
    title: "Elinor Wonders Why Nature Game",
    character: "Elinor Wonders Why",
    category: "Science",
    image: "https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=400",
    description: "Explore nature and science with Elinor and her friends!",
    rating: 4.7,
    ageRange: "3-7",
    isNew: true
  },
  {
    id: 8,
    title: "Rosie's Rules Adventure",
    character: "Rosie",
    category: "Problem Solving",
    image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Help Rosie solve fun challenges and learn new things!",
    rating: 4.6,
    ageRange: "4-8"
    }
  ];

const generatedGames: Game[] = Array.from({ length: 192 }, (_, i) => ({
  id: i + 9,
  title: `Game ${i + 9}`,
  character: `Character ${((i % 8) + 1)}`,
  category: [
    'Social-Emotional',
    'Science',
    'Math',
    'Logic',
    'Problem Solving',
    'Reading',
    'Nature',
    'Adventure',
  ][i % 8],
  image: `https://picsum.photos/seed/game${i + 9}/400/300`,
  description: `Description for Game ${i + 9}`,
  rating: 4.5 + ((i % 5) * 0.1),
  ageRange: `${2 + (i % 5)}-${5 + (i % 5)}`,
  isNew: (i + 9) % 7 === 0
}));

const allGames = [...originalGames, ...generatedGames];

const GameGrid: React.FC<GameGridProps> = ({ searchQuery, categoryFilter }) => {
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredGames = useMemo(() => {
    return allGames.filter(game => {
      const matchesSearch = searchQuery === '' || 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.character.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'All Games' || 
        game.character === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const visibleGames = filteredGames.slice(0, visibleCount);

  return (
    <div className="bg-white">
      {/* Featured Games Carousel */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Featured Games</h2>
            <div className="flex space-x-2">
              <button className="p-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {allGames.slice(0, 6).map(game => (
              <GameCard key={game.id} game={game} isCarousel={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Main Games Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              All Games
            </h2>
            <p className="text-lg text-gray-600">
              Educational games featuring your favorite Learning Leopards characters
            </p>
          </div>

          {visibleGames.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No games found. Try a different search or category!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}

          {visibleGames.length > 0 && visibleGames.length < filteredGames.length && (
            <div className="text-center mt-12">
              <button
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                onClick={() => setVisibleCount(c => Math.min(c + 8, filteredGames.length))}
              >
                Load More Games
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GameGrid;