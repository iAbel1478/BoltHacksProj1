import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Star, Clock, Users, BookOpen, Target } from 'lucide-react';
import { allGames } from '../data/games-with-geography';
import GeographyGameEmbed from './GeographyGameEmbed';
import ArtsyQuizEmbed from './ArtsyQuizEmbed';
import CalcQuestGeniusEmbed from './CalcQuestGeniusEmbed';
import CampMemoryTrailsEmbed from './CampMemoryTrailsEmbed';
import ClueShiftMysteryEmbed from './ClueShiftMysteryEmbed';
import BingoEnEspanolEmbed from './BingoEnEspanolEmbed';
import CodeGlitchBustersEmbed from './CodeGlitchBustersEmbed';
import CosmicConstellationEmbed from './CosmicConstellationEmbed';
import BallCityBounceEmbed from './BallCityBounceEmbed';
import EmojiInternetAdventuresEmbed from './EmojiInternetAdventuresEmbed';
import EscapeLabAcademyEmbed from './EscapeLabAcademyEmbed';

const GamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const game = allGames.find(g => g.id === parseInt(id || '0'));

  // If it's the World Click Explorer game (ID 1), render the embedded game
  if (game?.id === 1) {
    return <GeographyGameEmbed />;
  }

  // If it's the Artsy Quiz Palooza game (ID 2), render the embedded game
  if (game?.id === 2) {
    return <ArtsyQuizEmbed />;
  }

  // If it's the Calc Quest Genius game (ID 3), render the embedded game
  if (game?.id === 3) {
    return <CalcQuestGeniusEmbed />;
  }

  // If it's the Camp Memory Trails game (ID 4), render the embedded game
  if (game?.id === 4) {
    return <CampMemoryTrailsEmbed />;
  }

  // If it's the Clue Shift Mystery Web game (ID 5), render the embedded game
  if (game?.id === 5) {
    return <ClueShiftMysteryEmbed />;
  }

  // If it's the Bingo en Español Amigos game (ID 6), render the embedded game
  if (game?.id === 6) {
    return <BingoEnEspanolEmbed />;
  }

  // If it's the Code Glitch Busters game (ID 7), render the embedded game
  if (game?.id === 7) {
    return <CodeGlitchBustersEmbed />;
  }

  // If it's the Cosmic Constellation Cruiser game (ID 8), render the embedded game
  if (game?.id === 8) {
    return <CosmicConstellationEmbed />;
  }

  // If it's the Ball City Bounce game (ID 9), render the embedded game
  if (game?.id === 9) {
    return <BallCityBounceEmbed />;
  }

  // If it's the Emoji Internet Adventures game (ID 10), render the embedded game
  if (game?.id === 10) {
    return <EmojiInternetAdventuresEmbed />;
  }

  // If it's the Escape Lab Academy game (ID 11), render the embedded game
  if (game?.id === 11) {
    return <EscapeLabAcademyEmbed />;
  }

  const handlePlayClick = () => {
    // For other games, you can add actual game logic here
    alert('Game launching...');
  };

  if (!game) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Game Not Found</h1>
          <Link 
            to="/" 
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Games
          </Link>
        </div>
      </div>
    );
  }

  const getCharacterColor = (character: string) => {
    const colors = {
      'Daniel Tiger': 'bg-red-400',
      'Wild Kratts': 'bg-green-500',
      'Curious George': 'bg-yellow-400',
      'Carl the Collector': 'bg-gray-600',
      'Lyla in the Loop': 'bg-purple-500',
      'Arthur': 'bg-blue-500',
      'Elinor Wonders Why': 'bg-teal-500',
      'Learning Leopards': 'bg-orange-500',
      'Code Detective': 'bg-indigo-500',
      'Space Explorer': 'bg-purple-600',
      'Basketball': 'bg-orange-600',
    };
    return colors[character as keyof typeof colors] || 'bg-gray-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Games
          </Link>
        </div>
      </header>

      {/* Game Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Game Image and Play Section */}
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <button 
                  onClick={handlePlayClick}
                  className="bg-white/95 hover:bg-white rounded-full p-6 transition-all duration-200 transform hover:scale-110 shadow-lg cursor-pointer"
                >
                  <Play className="w-12 h-12 text-purple-600 ml-1" />
                </button>
              </div>
              {game.isNew && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  NEW!
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-gray-800">{game.rating}</span>
                </div>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold text-gray-800">Ages {game.ageRange}</span>
                </div>
                <p className="text-sm text-gray-600">Age Range</p>
              </div>
            </div>
          </div>

          {/* Game Details */}
          <div className="space-y-6">
            {/* Title and Character */}
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <span className={`${getCharacterColor(game.character)} text-white text-sm font-bold px-3 py-1 rounded-full`}>
                  {game.character}
                </span>
                <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                  {game.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{game.title}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{game.longDescription}</p>
            </div>

            {/* Learning Objectives */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-bold text-gray-800">Learning Objectives</h3>
              </div>
              <ul className="space-y-2">
                {game.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills Developed */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-bold text-gray-800">Skills Developed</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {game.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Gameplay Description */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center space-x-2 mb-4">
                <Play className="w-6 h-6 text-purple-500" />
                <h3 className="text-xl font-bold text-gray-800">How to Play</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">{game.gameplayDescription}</p>
            </div>

            {/* Play Button */}
            <button 
              onClick={handlePlayClick}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all duration-200 transform hover:scale-105 shadow-lg cursor-pointer"
            >
              Start Playing Now!
            </button>
          </div>
        </div>

        {/* Related Games */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">More Games You Might Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allGames
              .filter(g => g.id !== game.id && (g.character === game.character || g.category === game.category))
              .slice(0, 4)
              .map(relatedGame => (
                <Link 
                  key={relatedGame.id} 
                  to={`/game/${relatedGame.id}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={relatedGame.image}
                    alt={relatedGame.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2">
                      {relatedGame.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className={`${getCharacterColor(relatedGame.character)} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                        {relatedGame.character}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{relatedGame.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default GamePage;