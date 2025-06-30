import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { allGames } from '../data/games-with-geography';

const featuredGames = allGames.map(game => ({
  title: game.title,
  image: game.image,
  description: game.description || "Join the Learning Leopards on an exciting educational journey!"
}));

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animDirection, setAnimDirection] = useState<'left' | 'right' | null>(null);
  const [pendingPage, setPendingPage] = useState<number | null>(null);
  const thumbRowRef = useRef<HTMLDivElement>(null);
  const [isSliding, setIsSliding] = useState(false);
  const [targetPage, setTargetPage] = useState(0);
  const [loadedSections, setLoadedSections] = useState(1);

  const gamesPerSection = 50;
  const totalSections = 4;
  const currentSection = Math.floor(currentSlide / gamesPerSection);

  const loadMoreGames = () => {
    if (loadedSections < totalSections) {
      setLoadedSections(prev => prev + 1);
    }
  };

  const goPage = (direction: 'left' | 'right') => {
    if (isSliding) return;
    
    let newSlide;
    if (direction === 'left') {
      newSlide = currentSlide === 0 ? currentGames.length - 1 : currentSlide - 1;
    } else {
      newSlide = currentSlide === currentGames.length - 1 ? 0 : currentSlide + 1;
    }
    
    setIsSliding(true);
    setCurrentSlide(newSlide);
    setTimeout(() => setIsSliding(false), 400);
  };

  // Calculate translateX for the sliding effect
  const translateX = `-${currentSlide * (100 / gamesPerSection)}%`;

  // After animation, update the page
  React.useEffect(() => {
    if (animDirection && pendingPage !== null) {
      const timer = setTimeout(() => {
        setCurrentSlide(pendingPage);
        setAnimDirection(null);
        setPendingPage(null);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [animDirection, pendingPage]);

  const nextSlide = () => goPage('right');
  const prevSlide = () => goPage('left');

  // Get the current section of games
  const currentGames = featuredGames.slice(0, loadedSections * gamesPerSection);

  return (
    <section className="relative min-h-[900px] overflow-hidden bg-gradient-to-br from-orange-300 via-yellow-300 to-pink-300">
      {/* Background Image */}
      <img
        src="learning-leopard2.jpeg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'brightness(0.9) saturate(1.2)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/30 via-transparent to-transparent z-0" />

      {/* Top Row: Logo and Buttons */}
      <div className="absolute top-8 left-8 flex items-center space-x-8 z-20">
        {/* Circular Logo with overlayed LL */}
        <div className="relative w-28 h-28 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-yellow-300 overflow-hidden">
          <img src="learning-leopard2.jpeg" alt="Learning Leopards Logo" className="w-full h-full object-cover" />
          <span className="absolute inset-0 flex items-center justify-center text-6xl font-extrabold" style={{ color: 'black', fontFamily: 'Impact, Arial Black, sans-serif', textShadow: '2px 2px 8px #fff, 0 0 2px #fff', opacity: 0.5 }}>LL</span>
        </div>
        {/* GAMES & VIDEOS Buttons */}
        <div className="flex space-x-6">
          <button className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-yellow-300 hover:scale-110 transition-all duration-300 transform">
            <span className="text-white text-3xl mb-1 drop-shadow-lg">🎮</span>
            <span className="text-white font-black text-lg drop-shadow-lg">GAMES</span>
          </button>
          <button className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-yellow-300 hover:scale-110 transition-all duration-300 transform">
            <span className="text-white text-3xl mb-1 drop-shadow-lg">▶</span>
            <span className="text-white font-black text-lg drop-shadow-lg">VIDEOS</span>
          </button>
        </div>
      </div>
      {/* Top Right Logo */}
      <div className="absolute top-10 right-12 z-20 flex items-center space-x-4">
        {/* Removed LL badge for cleaner look */}
      </div>

      {/* Hero Carousel */}
      <div className="absolute top-52 right-3 z-10 flex flex-col items-center">
        <div className="bg-gradient-to-br from-white via-yellow-50 to-orange-50 rounded-3xl shadow-2xl border-4 border-yellow-300 p-6 flex flex-col items-center w-[500px] max-w-full transform hover:scale-105 transition-transform duration-300">
          <div className="relative w-full">
            <img
              src={featuredGames[currentSlide].image}
              alt={featuredGames[currentSlide].title}
              className="rounded-2xl w-full h-[280px] object-cover border-4 border-orange-200 shadow-lg"
            />
            <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg">
              NEW!
            </div>
          </div>
          <div className="mt-6 text-center">
            <h2 className="text-3xl font-black text-orange-600 mb-3 drop-shadow-sm" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              {featuredGames[currentSlide].title}
            </h2>
            <p className="text-gray-700 text-lg font-semibold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              {featuredGames[currentSlide].description}
            </p>
          </div>
        </div>
        {/* Slide Indicators */}
        <div className="flex space-x-3 mt-6 justify-center w-[500px]">
          {Array.from({ length: totalSections }).map((_, idx) => (
            <span
              key={idx}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${idx === currentSection ? 'bg-gradient-to-r from-orange-500 to-red-500 shadow-lg' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Thumbnails Carousel */}
      <div className="absolute left-0 right-0 bottom-8 flex items-center justify-center z-20">
        <button
          onClick={prevSlide}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full p-4 mx-2 shadow-xl transition-all duration-300 transform hover:scale-110 border-2 border-yellow-300"
          aria-label="Previous"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        {/* Card and gap sizes */}
        {(() => {
          const cardWidth = 80;
          const cardGap = 16;
          const visibleCards = gamesPerSection;
          const paddingX = 16;

          const visibleContainerWidth = (visibleCards * cardWidth) + ((visibleCards - 1) * cardGap) + (2 * paddingX);
          const totalContentWidth = (currentGames.length * cardWidth) + ((currentGames.length - 1) * cardGap);
          const offset = currentSlide * cardWidth + (currentSlide * cardGap);

          return (
            <div
              className="overflow-hidden bg-gradient-to-r from-white/90 to-yellow-50/90 rounded-2xl shadow-2xl border-4 border-yellow-300 px-4 py-2"
              style={{ width: `${visibleContainerWidth}px` }}
            >
              <div
                className="flex gap-4 transition-transform duration-500 ease-in-out"
                style={{
                  width: `${totalContentWidth}px`,
                  transform: `translateX(-${offset}px)`,
                }}
              >
                {currentGames.map((game, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`transition-all duration-300 ${i === currentSlide ? 'scale-125 shadow-2xl' : 'opacity-80 hover:opacity-100 hover:scale-110'}`}
                    style={{ width: `${cardWidth}px`, minWidth: `${cardWidth}px`, maxWidth: `${cardWidth}px`, background: 'transparent' }}
                  >
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-16 object-cover rounded-xl border-4 border-yellow-300 shadow-lg"
                    />
                  </button>
                ))}
              </div>
            </div>
          );
        })()}
        <button
          onClick={nextSlide}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full p-4 mx-2 shadow-xl transition-all duration-300 transform hover:scale-110 border-2 border-yellow-300"
          aria-label="Next"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;