import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const featuredGames = Array.from({ length: 100 }, (_, i) => ({
  title: `Learning Leopards Adventure ${i + 1}`,
  image: "learning-leopard2.jpeg",
  description: "Join the Learning Leopards on an exciting educational journey!"
}));

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animDirection, setAnimDirection] = useState<'left' | 'right' | null>(null);
  const [pendingPage, setPendingPage] = useState<number | null>(null);
  const thumbRowRef = useRef<HTMLDivElement>(null);
  const [isSliding, setIsSliding] = useState(false);
  const [targetPage, setTargetPage] = useState(0);

  const thumbsPerPage = 12;
  const totalPages = Math.ceil(featuredGames.length / thumbsPerPage);
  const currentPage = Math.floor(currentSlide / thumbsPerPage);

  const goPage = (direction: 'left' | 'right') => {
    if (isSliding) return;
    let newPage = currentPage;
    if (direction === 'left') newPage = Math.max(currentPage - 1, 0);
    if (direction === 'right') newPage = Math.min(currentPage + 1, totalPages - 1);
    if (newPage !== currentPage) {
      setIsSliding(true);
      setTargetPage(newPage);
      setTimeout(() => {
        setCurrentSlide(newPage * thumbsPerPage);
        setIsSliding(false);
      }, 400);
    }
  };

  // Calculate translateX for the sliding effect
  const slideIndex = isSliding ? targetPage : currentPage;
  const translateX = `-${slideIndex * (100 / thumbsPerPage)}%`;

  // After animation, update the page
  React.useEffect(() => {
    if (animDirection && pendingPage !== null) {
      const timer = setTimeout(() => {
        setCurrentSlide(pendingPage * thumbsPerPage);
        setAnimDirection(null);
        setPendingPage(null);
      }, 350); // match CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [animDirection, pendingPage]);

  const nextSlide = () => goPage('right');
  const prevSlide = () => goPage('left');

  return (
    <section className="relative bg-gradient-to-b from-sky-200 to-green-200 min-h-[900px] overflow-hidden">
      {/* Main Hero Content */}
      <div className="relative h-[900px] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={featuredGames[currentSlide].image}
            alt={featuredGames[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl p-6 transition-colors z-10 disabled:opacity-40"
          aria-label="Previous"
          disabled={currentPage === 0}
          style={{ height: '88px' }}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl p-6 transition-colors z-10 disabled:opacity-40"
          aria-label="Next"
          disabled={currentPage === totalPages - 1}
          style={{ height: '88px' }}
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Play Button */}
        <div className="absolute bottom-20 right-20 z-10">
          <button className="bg-white hover:bg-gray-100 text-purple-600 font-bold py-4 px-8 rounded-full text-2xl shadow-lg transition-colors transform hover:scale-105">
            PLAY
          </button>
        </div>

        {/* Slide Indicators */}
        {/* Removed the slide indicator circles */}
      </div>
      {/* Thumbnails Row */}
      <div className="flex items-center justify-center gap-2 mt-[-60px] relative z-20 select-none" style={{ overflow: 'hidden' }}>
        <div
          className="relative w-full"
          style={{ maxWidth: '1800px', minWidth: '1200px', height: '88px', overflow: 'hidden' }}
        >
          <div
            className="flex gap-4 px-2 transition-transform duration-500 ease-in-out"
            style={{
              width: `${(featuredGames.length / thumbsPerPage) * 100}%`,
              transform: `translateX(${translateX})`,
            }}
          >
            {featuredGames.map((game, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`transition-transform duration-200 ${i === currentSlide ? 'scale-110' : 'opacity-80 hover:opacity-100'}`}
                style={{ width: 'calc(100% / 12)', minWidth: '120px', maxWidth: '150px', background: 'transparent' }}
              >
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-20 object-cover rounded-2xl shadow-lg border-4 border-white"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;