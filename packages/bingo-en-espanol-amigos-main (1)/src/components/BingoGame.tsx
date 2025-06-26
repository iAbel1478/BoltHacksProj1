import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { PlayCircle, RotateCcw, HelpCircle } from 'lucide-react';
import { BingoBoard } from './BingoBoard';
import { DifficultySelector } from './DifficultySelector';
import { ThemeSelector } from './ThemeSelector';
import { TranslationDirectionSelector, TranslationDirection } from './TranslationDirectionSelector';
import { TranslationTooltip } from './TranslationTooltip';
import { vocabularyData } from '../data/vocabularyData';
import { toast } from '../hooks/use-toast';

export type Difficulty = 'easy' | 'medium' | 'hard';
export type Theme = 'animals' | 'food' | 'months' | 'clothing' | 'colors' | 'numbers' | 'sports' | 'transportation' | 'days' | 'house';

interface BingoCell {
  spanish: string;
  english: string;
  id: string;
  claimed: boolean;
}

const BingoGame = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [theme, setTheme] = useState<Theme>('animals');
  const [translationDirection, setTranslationDirection] = useState<TranslationDirection>('spanish-to-english');
  const [userBoard, setUserBoard] = useState<BingoCell[][]>([]);
  const [aiBoard, setAiBoard] = useState<BingoCell[][]>([]);
  const [currentWord, setCurrentWord] = useState<{spanish: string, english: string} | null>(null);
  const [calledWords, setCalledWords] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [userMadeMove, setUserMadeMove] = useState(false);
  const [aiMadeMove, setAiMadeMove] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Cross-language board checking helper function
  const checkWordInBoard = (board: BingoCell[][], currentWord: {spanish: string, english: string}) => {
    return board.some(row => 
      row.some(cell => {
        if (translationDirection === 'spanish-to-english') {
          // Current word is in English, check if Spanish translation exists on board
          return cell.spanish === currentWord.spanish && !cell.claimed;
        } else {
          // Current word is in Spanish, check if English translation exists on board
          return cell.english === currentWord.english && !cell.claimed;
        }
      })
    );
  };

  // Check if user has the current word on their board (cross-language aware)
  const userHasCurrentWord = currentWord ? checkWordInBoard(userBoard, currentWord) : false;

  // Get time limit based on difficulty
  const getTimeLimit = () => {
    switch (difficulty) {
      case 'easy': return 10;
      case 'medium': return 7;
      case 'hard': return 4;
      default: return 10;
    }
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      // Timer expired, move to next word
      setIsTimerActive(false);
      setCurrentWord(null);
      setUserMadeMove(false);
      setAiMadeMove(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timeLeft]);

  const generateBoard = () => {
    const words = vocabularyData[theme];
    const boardWords: BingoCell[] = [];
    
    // Select 25 words for the board, allowing some duplicates (max 2 per word)
    const selectedWords = [];
    const wordCounts: {[key: string]: number} = {};
    
    while (selectedWords.length < 25) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      if (!wordCounts[randomWord.spanish]) {
        wordCounts[randomWord.spanish] = 0;
      }
      if (wordCounts[randomWord.spanish] < 2) {
        selectedWords.push({...randomWord});
        wordCounts[randomWord.spanish]++;
      }
    }
    
    // Shuffle and create cells
    const shuffled = selectedWords.sort(() => Math.random() - 0.5);
    shuffled.forEach((word, index) => {
      boardWords.push({
        ...word,
        id: `${word.spanish}_${index}`,
        claimed: false
      });
    });
    
    // Convert to 5x5 grid
    const board: BingoCell[][] = [];
    for (let i = 0; i < 5; i++) {
      board.push(boardWords.slice(i * 5, (i + 1) * 5));
    }
    
    return board;
  };

  const startNewGame = () => {
    const newUserBoard = generateBoard();
    const newAiBoard = generateBoard();
    
    setUserBoard(newUserBoard);
    setAiBoard(newAiBoard);
    setCalledWords([]);
    setCurrentWord(null);
    setGameStarted(true);
    setWinner(null);
    setHintsUsed(0);
    setShowHint(false);
    setUserMadeMove(false);
    setAiMadeMove(false);
    setTimeLeft(0);
    setIsTimerActive(false);
    
    toast({
      title: "¡Nuevo juego iniciado!",
      description: "New game started! Good luck!",
    });
  };

  const endGame = () => {
    setGameStarted(false);
    setCurrentWord(null);
    setWinner(null);
    setIsTimerActive(false);
    setTimeLeft(0);
    setUserMadeMove(false);
    setAiMadeMove(false);
    
    toast({
      title: "Game Ended",
      description: "¡Juego terminado! You can now change settings.",
    });
  };

  const callNextWord = () => {
    const allWords = vocabularyData[theme];
    const availableWords = allWords.filter(word => !calledWords.includes(word.spanish));
    
    if (availableWords.length === 0) {
      toast({
        title: "All words have been called!",
        description: "¡Todas las palabras han sido llamadas!",
      });
      return;
    }
    
    const nextWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    setCurrentWord(nextWord);
    setCalledWords(prev => [...prev, nextWord.spanish]);
    setShowHint(false);
    setUserMadeMove(false);
    setAiMadeMove(false);
    
    // Check if user has the word on their board (cross-language aware)
    const userHasWord = checkWordInBoard(userBoard, nextWord);
    
    if (!userHasWord) {
      // User doesn't have the word, check if AI has it and auto-play
      const aiHasWord = checkWordInBoard(aiBoard, nextWord);
      
      if (aiHasWord) {
        // AI has the word, mark it and skip to next word immediately
        setTimeout(() => {
          makeAiMove(nextWord);
          setTimeout(() => {
            setCurrentWord(null);
            setUserMadeMove(false);
            setAiMadeMove(false);
            setIsTimerActive(false);
          }, 1500);
        }, 1000);
      } else {
        // Neither has the word, skip to next word immediately
        setTimeout(() => {
          setCurrentWord(null);
          setUserMadeMove(false);
          setAiMadeMove(false);
          setIsTimerActive(false);
        }, 1500);
      }
      return;
    }
    
    // User has the word, start timer
    const timeLimit = getTimeLimit();
    setTimeLeft(timeLimit);
    setIsTimerActive(true);
    
    // AI makes a move with some delay
    setTimeout(() => {
      makeAiMove(nextWord);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const makeAiMove = (word: {spanish: string, english: string}) => {
    setAiBoard(prev => {
      const newBoard = prev.map(row => 
        row.map(cell => {
          if (translationDirection === 'spanish-to-english') {
            // Current word is in English, match with Spanish on board
            return cell.spanish === word.spanish && !cell.claimed 
              ? { ...cell, claimed: true }
              : cell;
          } else {
            // Current word is in Spanish, match with English on board
            return cell.english === word.english && !cell.claimed 
              ? { ...cell, claimed: true }
              : cell;
          }
        })
      );
      
      const aiHasWord = checkWordInBoard(prev, word);
      if (aiHasWord) {
        setAiMadeMove(true);
      }
      
      // Check if AI won
      setTimeout(() => checkForWinner(newBoard, 'AI'), 100);
      
      return newBoard;
    });
  };

  const handleUserCellClick = (rowIndex: number, colIndex: number) => {
    if (!gameStarted || !currentWord || winner || !isTimerActive) return;
    
    const cell = userBoard[rowIndex][colIndex];
    let isCorrectCell = false;
    
    if (translationDirection === 'spanish-to-english') {
      // Current word is in English, check if clicked cell's Spanish matches
      isCorrectCell = cell.spanish === currentWord.spanish;
    } else {
      // Current word is in Spanish, check if clicked cell's English matches
      isCorrectCell = cell.english === currentWord.english;
    }
    
    if (!isCorrectCell || cell.claimed) return;
    
    setUserBoard(prev => {
      const newBoard = [...prev];
      newBoard[rowIndex][colIndex] = { ...cell, claimed: true };
      
      setUserMadeMove(true);
      
      // Check if user won
      setTimeout(() => checkForWinner(newBoard, 'User'), 100);
      
      return newBoard;
    });
  };

  const checkForWinner = (board: BingoCell[][], player: string) => {
    // Check rows
    for (let i = 0; i < 5; i++) {
      if (board[i].every(cell => cell.claimed)) {
        setWinner(player);
        return;
      }
    }
    
    // Check columns
    for (let j = 0; j < 5; j++) {
      if (board.every(row => row[j].claimed)) {
        setWinner(player);
        return;
      }
    }
    
    // Check diagonals
    if (board.every((row, i) => row[i].claimed) || 
        board.every((row, i) => row[4-i].claimed)) {
      setWinner(player);
    }
  };

  const handleHint = () => {
    if (hintsUsed >= 3 || !currentWord || !userHasCurrentWord) return;
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
  };

  // Continue game when both players have made their moves or timer expires
  useEffect(() => {
    if ((userMadeMove && aiMadeMove && currentWord) || (!isTimerActive && currentWord)) {
      setTimeout(() => {
        setCurrentWord(null);
        setUserMadeMove(false);
        setAiMadeMove(false);
        setIsTimerActive(false);
      }, 1500); // Give a moment to see the moves
    }
  }, [userMadeMove, aiMadeMove, currentWord, isTimerActive]);

  useEffect(() => {
    if (winner) {
      setIsTimerActive(false);
      toast({
        title: winner === 'User' ? 'You Won!' : 'Computer Won!',
        description: winner === 'User' ? '¡Ganaste!' : '¡La computadora ganó!',
        variant: winner === 'User' ? 'default' : 'destructive',
      });
    }
  }, [winner]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-orange-400 via-yellow-400 to-green-400 p-4">
      <div className="max-w-7xl mx-auto">
        <TranslationTooltip spanish="BINGO ESPAÑOL" english="SPANISH BINGO">
          <h1 className="text-6xl font-bold text-center text-white mb-8 drop-shadow-2xl font-mono tracking-wider cursor-help">
            🎲 SPANISH BINGO 🎲
          </h1>
        </TranslationTooltip>
        
        {/* Horizontal Configuration Panel */}
        <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 backdrop-blur-sm border-4 border-red-500 shadow-2xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
            <ThemeSelector theme={theme} setTheme={setTheme} />
            <TranslationDirectionSelector 
              direction={translationDirection} 
              setDirection={setTranslationDirection}
              disabled={gameStarted}
            />
            
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-amber-800 mb-3 font-mono">Action</h3>
              <div className="flex gap-2">
                <Button 
                  onClick={startNewGame}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 text-lg rounded-xl border-4 border-green-600 shadow-lg transform hover:scale-105 transition-all duration-200 flex-1"
                >
                  <PlayCircle className="mr-2" />
                  <TranslationTooltip spanish="¡Nuevo Juego!" english="New Game!">
                    <span className="cursor-help">New Game!</span>
                  </TranslationTooltip>
                </Button>
                
                {gameStarted && (
                  <Button 
                    onClick={endGame}
                    variant="outline"
                    className="border-2 border-red-500 text-red-600 hover:bg-red-100 font-bold py-3 text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <TranslationTooltip spanish="Terminar Juego" english="End Game">
                      <span className="cursor-help">End Game</span>
                    </TranslationTooltip>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {gameStarted && (
          <div className="space-y-8">
            {/* Current Word Panel - More Compact */}
            <Card className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 backdrop-blur-sm border-4 border-orange-500 shadow-2xl">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <TranslationTooltip spanish="Palabra Actual" english="Current Word">
                    <h3 className="text-lg font-bold text-orange-700 mb-2 font-mono cursor-help">Current Word</h3>
                  </TranslationTooltip>
                  
                  {currentWord ? (
                    <div className="flex items-center justify-center gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-600 font-mono">
                          {translationDirection === 'spanish-to-english' ? currentWord.english : currentWord.spanish}
                        </div>
                        {showHint && (
                          <div className="text-lg text-amber-700 mt-1">
                            ({translationDirection === 'spanish-to-english' ? currentWord.spanish : currentWord.english})
                          </div>
                        )}
                        {isTimerActive && (
                          <div className="text-lg font-bold text-blue-600 mt-2">
                            Time: {timeLeft}s
                          </div>
                        )}
                      </div>
                      
                      <Button
                        onClick={handleHint}
                        disabled={hintsUsed >= 3 || showHint || !userHasCurrentWord}
                        variant="outline"
                        size="sm"
                        className="border-2 border-blue-500 text-blue-600 hover:bg-blue-100 disabled:opacity-50"
                      >
                        <HelpCircle className="w-4 h-4 mr-1" />
                        Hint ({3 - hintsUsed} left)
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Button 
                        onClick={callNextWord}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-2 text-lg rounded-xl border-4 border-blue-600 shadow-lg transform hover:scale-105 transition-all duration-200"
                        disabled={winner !== null}
                      >
                        <TranslationTooltip spanish="Siguiente Palabra" english="Next Word">
                          <span className="cursor-help">Next Word</span>
                        </TranslationTooltip>
                      </Button>
                    </div>
                  )}
                </div>

                {winner && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 mb-2">
                      {winner === 'User' ? 'YOU WON! 🎉' : 'AI WON! 🤖'}
                    </div>
                    <Button 
                      onClick={startNewGame}
                      variant="outline"
                      className="border-2 border-red-500 text-red-600 hover:bg-red-100"
                    >
                      <RotateCcw className="mr-2" />
                      <TranslationTooltip spanish="Jugar de Nuevo" english="Play Again">
                        <span className="cursor-help">Play Again</span>
                      </TranslationTooltip>
                    </Button>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Bingo Boards - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <TranslationTooltip spanish="TU TABLERO" english="YOUR BOARD">
                  <h3 className="text-2xl font-bold text-white mb-4 text-center font-mono cursor-help">
                    🧑 YOUR BOARD
                  </h3>
                </TranslationTooltip>
                <BingoBoard 
                  board={userBoard}
                  onCellClick={handleUserCellClick}
                  isUserBoard={true}
                  currentWord={currentWord ? (translationDirection === 'spanish-to-english' ? currentWord.english : currentWord.spanish) : undefined}
                  translationDirection={translationDirection}
                  isBlurred={false}
                  userHasCurrentWord={userHasCurrentWord}
                />
              </div>
              
              <div>
                <TranslationTooltip spanish="TABLERO AI" english="AI BOARD">
                  <h3 className="text-2xl font-bold text-white mb-4 text-center font-mono cursor-help">
                    🤖 AI BOARD
                  </h3>
                </TranslationTooltip>
                <BingoBoard 
                  board={aiBoard}
                  onCellClick={() => {}}
                  isUserBoard={false}
                  currentWord={currentWord ? (translationDirection === 'spanish-to-english' ? currentWord.english : currentWord.spanish) : undefined}
                  translationDirection={translationDirection}
                  isBlurred={isTimerActive}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BingoGame;
