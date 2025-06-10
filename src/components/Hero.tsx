import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredGames = [
    {
      title: "Elinor Wonders Why Nature Game",
      image: "/Screenshot 2025-06-09 181611.png",
      description: "Explore nature with Elinor and friends!"
    },
    {
      title: "Wild Kratts Creature Adventures",
      image: "https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Discover amazing animals around the world!"
    },
    {
      title: "Daniel Tiger's Neighborhood",
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Learn about feelings and friendship!"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredGames.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredGames.length) % featuredGames.length);
  };

  return (
    <section className="relative bg-gradient-to-b from-sky-200 to-green-200 min-h-[600px] overflow-hidden">
      {/* Main Hero Content */}
      <div className="relative h-[600px] flex items-center justify-center">
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
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white rounded-full p-3 shadow-lg transition-colors z-10"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white rounded-full p-3 shadow-lg transition-colors z-10"
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {featuredGames.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;