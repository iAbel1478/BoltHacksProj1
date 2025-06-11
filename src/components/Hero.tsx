import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const originalGames = [
  {
    id: 1,
    title: "Daniel Tiger's Neighborhood",
    image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 2,
    title: "Wild Kratts Creature Power",
    image: "https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 3,
    title: "Curious George Math Adventures",
    image: "https://images.pexels.com/photos/714698/pexels-photo-714698.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 4,
    title: "Carl the Collector's Sorting Game",
    image: "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 5,
    title: "Lyla in the Loop Problem Solving",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 6,
    title: "Arthur's Reading Adventures",
    image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 7,
    title: "Elinor Wonders Why Nature Game",
    image: "https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 8,
    title: "Rosie's Rules Adventure",
    image: "https://images.pexels.com/photos/3661350/pexels-photo-3661350.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 9,
    title: "Math Magic with Numbers",
    image: "https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 10,
    title: "Science Explorer Lab",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 11,
    title: "Art & Colors Studio",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 12,
    title: "Music Maker Workshop",
    image: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 13,
    title: "Space Adventure Quest",
    image: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 14,
    title: "Ocean Discovery",
    image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 15,
    title: "Dinosaur Explorer",
    image: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 16,
    title: "Weather Watchers",
    image: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 17,
    title: "Coding for Kids",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 18,
    title: "World Geography Explorer",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 19,
    title: "Animal Kingdom Safari",
    image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 20,
    title: "Story Time Adventures",
    image: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 21,
    title: "Math Puzzle Challenge",
    image: "https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 22,
    title: "Science Lab Experiments",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 23,
    title: "Art History Journey",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 24,
    title: "Musical Instruments",
    image: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 25,
    title: "Solar System Explorer",
    image: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 26,
    title: "Marine Life Discovery",
    image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 27,
    title: "Prehistoric World",
    image: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 28,
    title: "Weather Science",
    image: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 29,
    title: "Robot Programming",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 30,
    title: "World Cultures",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 31,
    title: "Language Learning Lab",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 32,
    title: "Chemistry for Kids",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 33,
    title: "Geometry Shapes",
    image: "https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 34,
    title: "World History Time Machine",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 35,
    title: "Nature Explorer",
    image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 36,
    title: "Phonics Fun",
    image: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 37,
    title: "Logic Puzzles",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 38,
    title: "Music Theory",
    image: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 39,
    title: "Astronomy Adventure",
    image: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 40,
    title: "Ocean Science",
    image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 41,
    title: "Dinosaur Discovery",
    image: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 42,
    title: "Weather Patterns",
    image: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 43,
    title: "Coding Basics",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 44,
    title: "World Maps",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 45,
    title: "Animal Science",
    image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 46,
    title: "Reading Comprehension",
    image: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 47,
    title: "Math Word Problems",
    image: "https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 48,
    title: "Science Fair Projects",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 49,
    title: "Art Techniques",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 50,
    title: "Musical Notes",
    image: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 51,
    title: "Planet Explorer",
    image: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 52,
    title: "Deep Sea Discovery",
    image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 53,
    title: "Fossil Hunters",
    image: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 54,
    title: "Climate Science",
    image: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 55,
    title: "Game Development",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 56,
    title: "Cultural Studies",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 57,
    title: "Wildlife Safari",
    image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 58,
    title: "Creative Writing",
    image: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 59,
    title: "Algebra Adventure",
    image: "https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 60,
    title: "Physics Playground",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 61,
    title: "Digital Art Studio",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 62,
    title: "Rhythm & Beats",
    image: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 63,
    title: "Space Station",
    image: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 64,
    title: "Coral Reef Explorer",
    image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 65,
    title: "Ancient Civilizations",
    image: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 66,
    title: "Weather Science Lab",
    image: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 67,
    title: "Web Development",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 68,
    title: "World Landmarks",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 69,
    title: "Animal Behavior",
    image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 70,
    title: "Poetry Workshop",
    image: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 71,
    title: "Fractions Fun",
    image: "https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 72,
    title: "Biology Lab",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 73,
    title: "Sculpture Studio",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 74,
    title: "Orchestra Explorer",
    image: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 75,
    title: "Solar System Tour",
    image: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 76,
    title: "Marine Biology",
    image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 77,
    title: "Paleontology Quest",
    image: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 78,
    title: "Meteorology Lab",
    image: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 79,
    title: "App Development",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 80,
    title: "World Capitals",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 81,
    title: "Ecosystem Explorer",
    image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 82,
    title: "Grammar Galaxy",
    image: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 83,
    title: "Statistics Safari",
    image: "https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 84,
    title: "Chemistry Lab",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 85,
    title: "Digital Design",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 86,
    title: "Music Composition",
    image: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 87,
    title: "Astronomy Lab",
    image: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 88,
    title: "Oceanography",
    image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 89,
    title: "Dinosaur World",
    image: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 90,
    title: "Weather Station",
    image: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 91,
    title: "Python Programming",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 92,
    title: "World Rivers",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 93,
    title: "Rainforest Explorer",
    image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 94,
    title: "Story Writing",
    image: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 95,
    title: "Calculus Quest",
    image: "https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 96,
    title: "Genetics Lab",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 97,
    title: "Animation Studio",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 98,
    title: "Jazz Workshop",
    image: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 99,
    title: "Galaxy Explorer",
    image: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 100,
    title: "Coral Reef Lab",
    image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 101,
    title: "Ancient Egypt",
    image: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 102,
    title: "Climate Lab",
    image: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 103,
    title: "Game Design",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 104,
    title: "World Mountains",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 105,
    title: "Wildlife Lab",
    image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 106,
    title: "Novel Writing",
    image: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 107,
    title: "Algebra 2",
    image: "https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 108,
    title: "Physics Lab",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 109,
    title: "Digital Art",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 110,
    title: "Music Theory 2",
    image: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 111,
    title: "Space Station",
    image: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 112,
    title: "Ocean Explorer",
    image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 113,
    title: "Dinosaur Lab",
    image: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 114,
    title: "Weather Science",
    image: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 115,
    title: "Web Design",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 116,
    title: "World Cultures",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 117,
    title: "Animal Kingdom",
    image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 118,
    title: "Creative Writing",
    image: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 119,
    title: "Math Challenge",
    image: "https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 120,
    title: "Science Lab",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 121,
    title: "Art Studio",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 122,
    title: "Music Lab",
    image: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 123,
    title: "Space Explorer",
    image: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 124,
    title: "Marine Science",
    image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 125,
    title: "Fossil Lab",
    image: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 126,
    title: "Climate Explorer",
    image: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 127,
    title: "Coding Lab",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 128,
    title: "Geography Lab",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 129,
    title: "Wildlife Explorer",
    image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 130,
    title: "Writing Lab",
    image: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 131,
    title: "Algebra Adventure",
    image: "https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 132,
    title: "Biology Explorer",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 133,
    title: "Digital Art Lab",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 134,
    title: "Music Theory Lab",
    image: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 135,
    title: "Astronomy Lab",
    image: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 136,
    title: "Oceanography Lab",
    image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 137,
    title: "Paleontology Lab",
    image: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 138,
    title: "Meteorology Lab",
    image: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 139,
    title: "Programming Lab",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 140,
    title: "World Geography",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 141,
    title: "Ecosystem Lab",
    image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 142,
    title: "Grammar Lab",
    image: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 143,
    title: "Statistics Lab",
    image: "https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 144,
    title: "Chemistry Lab",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 145,
    title: "Design Studio",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 146,
    title: "Composition Lab",
    image: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 147,
    title: "Space Science",
    image: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 148,
    title: "Marine Lab",
    image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 149,
    title: "Dinosaur World",
    image: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 150,
    title: "Weather Lab",
    image: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 151,
    title: "Python Programming",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 152,
    title: "World Rivers",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 153,
    title: "Rainforest Explorer",
    image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 154,
    title: "Story Writing",
    image: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 155,
    title: "Calculus Quest",
    image: "https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 156,
    title: "Genetics Lab",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 157,
    title: "Animation Studio",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 158,
    title: "Jazz Workshop",
    image: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 159,
    title: "Galaxy Explorer",
    image: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 160,
    title: "Coral Reef Lab",
    image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 161,
    title: "Ancient Egypt",
    image: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 162,
    title: "Climate Lab",
    image: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 163,
    title: "Game Design",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 164,
    title: "World Mountains",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 165,
    title: "Wildlife Lab",
    image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 166,
    title: "Novel Writing",
    image: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 167,
    title: "Algebra 2",
    image: "https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 168,
    title: "Physics Lab",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 169,
    title: "Digital Art",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 170,
    title: "Music Theory 2",
    image: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 171,
    title: "Space Station",
    image: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 172,
    title: "Ocean Explorer",
    image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 173,
    title: "Dinosaur Lab",
    image: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 174,
    title: "Weather Science",
    image: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 175,
    title: "Web Design",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 176,
    title: "World Cultures",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 177,
    title: "Animal Kingdom",
    image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 178,
    title: "Creative Writing",
    image: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 179,
    title: "Math Challenge",
    image: "https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 180,
    title: "Science Lab",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 181,
    title: "Art Studio",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 182,
    title: "Music Lab",
    image: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 183,
    title: "Space Explorer",
    image: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 184,
    title: "Marine Science",
    image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 185,
    title: "Fossil Lab",
    image: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 186,
    title: "Climate Explorer",
    image: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 187,
    title: "Coding Lab",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 188,
    title: "Geography Lab",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 189,
    title: "Wildlife Explorer",
    image: "https://images.pexels.com/photos/247376/pexels-photo-247376.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 190,
    title: "Writing Lab",
    image: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 191,
    title: "Algebra Adventure",
    image: "https://images.pexels.com/photos/5905708/pexels-photo-5905708.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 192,
    title: "Biology Explorer",
    image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 193,
    title: "Digital Art Lab",
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 194,
    title: "Music Theory Lab",
    image: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 195,
    title: "Astronomy Lab",
    image: "https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 196,
    title: "Oceanography Lab",
    image: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 197,
    title: "Paleontology Lab",
    image: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 198,
    title: "Meteorology Lab",
    image: "https://images.pexels.com/photos/2098427/pexels-photo-2098427.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 199,
    title: "Programming Lab",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 200,
    title: "World Geography",
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=400",
  }
];

const generatedGames = Array.from({ length: 50 }, (_, i) => ({
  id: i + 151,
  title: `Game ${i + 151}`,
  image: `https://picsum.photos/seed/learning${i + 151}/400/300`,
}));

const allGames = [...originalGames, ...generatedGames];

const featuredGames = allGames.map(game => ({
  title: game.title,
  image: game.image,
  description: "Join the Learning Leopards on an exciting educational journey!"
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
    <section className="relative min-h-[900px] overflow-hidden bg-gradient-to-b from-sky-200 to-green-200">
      {/* Background Image */}
      <img
        src="learning-leopard2.jpeg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'brightness(0.95)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-0" />

      {/* Top Row: Logo and Buttons */}
      <div className="absolute top-8 left-8 flex items-center space-x-8 z-20">
        {/* Circular Logo */}
        <div className="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-blue-400">
          <span className="text-blue-600 font-extrabold text-3xl leading-none">LL</span>
          <span className="text-green-600 font-bold text-xs mt-1">Learning<br/>Leopards</span>
        </div>
        {/* GAMES & VIDEOS Buttons */}
        <div className="flex space-x-6">
          <button className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-lg border-2 border-purple-400 hover:bg-purple-50 transition">
            <span className="text-purple-600 text-3xl mb-1">🎮</span>
            <span className="text-purple-700 font-bold text-lg">GAMES</span>
          </button>
          <button className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-lg border-2 border-purple-400 hover:bg-purple-50 transition">
            <span className="text-purple-600 text-3xl mb-1">▶</span>
            <span className="text-purple-700 font-bold text-lg">VIDEOS</span>
          </button>
        </div>
      </div>
      {/* Top Right Logo */}
      <div className="absolute top-10 right-12 z-20 flex items-center space-x-4">
        <span className="text-black font-extrabold text-2xl tracking-tight">WETA</span>
        <span className="text-blue-700 font-extrabold text-2xl tracking-tight">LL</span>
      </div>

      {/* Hero Carousel */}
      <div className="absolute top-52 right-3 z-10 flex flex-col items-center">
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-white p-4 flex flex-col items-center w-[500px] max-w-full">
          <img
            src={featuredGames[currentSlide].image}
            alt={featuredGames[currentSlide].title}
            className="rounded-2xl w-full h-[280px] object-cover border-2 border-gray-200"
          />
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-extrabold text-purple-700 mb-2">{featuredGames[currentSlide].title}</h2>
            <p className="text-gray-700 text-lg">{featuredGames[currentSlide].description}</p>
          </div>
        </div>
        {/* Slide Indicators */}
        <div className="flex space-x-2 mt-4 justify-center w-[500px]">
          {Array.from({ length: totalSections }).map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === currentSection ? 'bg-purple-500' : 'bg-gray-300'} transition`}
            />
          ))}
        </div>
        {/* Play Button Centered */}
        <div className="flex justify-center w-[500px]">
          <button className="mt-4 bg-white hover:bg-gray-100 text-purple-600 font-bold py-3 px-10 rounded-full text-xl shadow-lg transition-colors transform hover:scale-105">
            PLAY
          </button>
        </div>
      </div>

      {/* Bottom Thumbnails Carousel */}
      <div className="absolute left-0 right-0 bottom-8 flex items-center justify-center z-20">
        <button
          onClick={prevSlide}
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 mx-2 shadow-lg transition-colors"
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
              className="overflow-hidden bg-white/80 rounded-2xl shadow-lg border border-gray-200 px-4 py-2"
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
                    className={`transition-transform duration-200 ${i === currentSlide ? 'scale-110' : 'opacity-80 hover:opacity-100'}`}
                    style={{ width: `${cardWidth}px`, minWidth: `${cardWidth}px`, maxWidth: `${cardWidth}px`, background: 'transparent' }}
                  >
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-16 object-cover rounded-xl border-2 border-white shadow"
                    />
                  </button>
                ))}
              </div>
            </div>
          );
        })()}
        <button
          onClick={nextSlide}
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 mx-2 shadow-lg transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;