import { Country, Difficulty } from './types';

export const COUNTRIES: Country[] = [
  // Explorer Mode (Difficulty 1)
  { 
    id: 'us', 
    name: 'United States', 
    x: 200, 
    y: 180, 
    difficulty: 1, 
    region: 'North America',
    realWorldCoords: { lat: 39.8283, lng: -98.5795 },
    size: 'large',
    funFacts: [
      'Has 50 states and covers 6 time zones!',
      'The Grand Canyon is 277 miles long and up to 18 miles wide!',
      'Alaska was purchased from Russia in 1867 for $7.2 million!'
    ]
  },
  { 
    id: 'canada', 
    name: 'Canada', 
    x: 180, 
    y: 120, 
    difficulty: 1, 
    region: 'North America',
    realWorldCoords: { lat: 56.1304, lng: -106.3468 },
    size: 'large',
    funFacts: [
      'Second largest country in the world by land area!',
      'Has more lakes than the rest of the world combined!',
      'The national animal is the beaver!'
    ]
  },
  { 
    id: 'brazil', 
    name: 'Brazil', 
    x: 320, 
    y: 280, 
    difficulty: 1, 
    region: 'South America',
    realWorldCoords: { lat: -14.2350, lng: -51.9253 },
    size: 'large',
    funFacts: [
      'Contains 60% of the Amazon rainforest!',
      'Home to over 2,500 species of fish in the Amazon River!',
      'The only South American country that speaks Portuguese!'
    ]
  },
  { 
    id: 'russia', 
    name: 'Russia', 
    x: 550, 
    y: 120, 
    difficulty: 1, 
    region: 'Europe/Asia',
    realWorldCoords: { lat: 61.5240, lng: 105.3188 },
    size: 'large',
    funFacts: [
      'Largest country in the world, spanning 11 time zones!',
      'Contains about 20% of the world\'s fresh water in Lake Baikal!',
      'The Trans-Siberian Railway is 5,772 miles long!'
    ]
  },
  { 
    id: 'china', 
    name: 'China', 
    x: 600, 
    y: 200, 
    difficulty: 1, 
    region: 'Asia',
    realWorldCoords: { lat: 35.8617, lng: 104.1954 },
    size: 'large',
    funFacts: [
      'Most populous country with over 1.4 billion people!',
      'The Great Wall is over 13,000 miles long!',
      'Home to giant pandas, found nowhere else in the wild!'
    ]
  },
  { 
    id: 'india', 
    name: 'India', 
    x: 570, 
    y: 220, 
    difficulty: 1, 
    region: 'Asia',
    realWorldCoords: { lat: 20.5937, lng: 78.9629 },
    size: 'large',
    funFacts: [
      'Home to over 1,600 languages and dialects!',
      'The game of chess was invented here!',
      'Has the world\'s largest postal system!'
    ]
  },
  { 
    id: 'australia', 
    name: 'Australia', 
    x: 680, 
    y: 380, 
    difficulty: 1, 
    region: 'Oceania',
    realWorldCoords: { lat: -25.2744, lng: 133.7751 },
    size: 'large',
    funFacts: [
      'Home to unique animals like kangaroos and koalas!',
      'The Great Barrier Reef is visible from space!',
      'Has more species of venomous snakes than any other country!'
    ]
  },
  { 
    id: 'egypt', 
    name: 'Egypt', 
    x: 480, 
    y: 220, 
    difficulty: 1, 
    region: 'Africa',
    realWorldCoords: { lat: 26.8206, lng: 30.8025 },
    size: 'large',
    funFacts: [
      'Home to the ancient pyramids of Giza!',
      'The Nile River is the longest river in the world!',
      'Ancient Egyptians invented paper, ink, and the calendar!'
    ]
  },
  { 
    id: 'south-africa', 
    name: 'South Africa', 
    x: 480, 
    y: 340, 
    difficulty: 1, 
    region: 'Africa',
    realWorldCoords: { lat: -30.5595, lng: 22.9375 },
    size: 'large',
    funFacts: [
      'Has 11 official languages!',
      'The deepest gold mine reaches 2.5 miles underground!',
      'Home to the world\'s largest diamond ever found!'
    ]
  },
  { 
    id: 'mexico', 
    name: 'Mexico', 
    x: 150, 
    y: 220, 
    difficulty: 1, 
    region: 'North America',
    realWorldCoords: { lat: 23.6345, lng: -102.5528 },
    size: 'large',
    funFacts: [
      'Chocolate was invented by the ancient Aztecs!',
      'Mexico City is built on an ancient lake bed!',
      'Has 67 national languages!'
    ]
  },

  // Navigator Mode (Difficulty 2)
  { 
    id: 'france', 
    name: 'France', 
    x: 440, 
    y: 160, 
    difficulty: 2, 
    region: 'Europe',
    realWorldCoords: { lat: 46.6034, lng: 1.8883 },
    size: 'medium',
    funFacts: [
      'Most visited country in the world!',
      'Invented the hot air balloon!',
      'Has over 400 types of cheese!'
    ]
  },
  { 
    id: 'germany', 
    name: 'Germany', 
    x: 450, 
    y: 150, 
    difficulty: 2, 
    region: 'Europe',
    realWorldCoords: { lat: 51.1657, lng: 10.4515 },
    size: 'medium',
    funFacts: [
      'Invented the printing press and the automobile!',
      'Has over 1,500 breweries!',
      'The Berlin Wall fell in 1989!'
    ]
  },
  { 
    id: 'japan', 
    name: 'Japan', 
    x: 680, 
    y: 180, 
    difficulty: 2, 
    region: 'Asia',
    realWorldCoords: { lat: 36.2048, lng: 138.2529 },
    size: 'medium',
    funFacts: [
      'Has over 6,800 islands, but only 430 are inhabited!',
      'Home to the world\'s fastest trains!',
      'Vending machines outnumber people 23 to 1!'
    ]
  },
  { 
    id: 'uk', 
    name: 'United Kingdom', 
    x: 430, 
    y: 140, 
    difficulty: 2, 
    region: 'Europe',
    realWorldCoords: { lat: 55.3781, lng: -3.4360 },
    size: 'medium',
    funFacts: [
      'Big Ben is actually the name of the bell, not the tower!',
      'Has no point more than 75 miles from the sea!',
      'The Queen owns all the dolphins in British waters!'
    ]
  },
  { 
    id: 'turkey', 
    name: 'Turkey', 
    x: 480, 
    y: 180, 
    difficulty: 2, 
    region: 'Europe/Asia',
    realWorldCoords: { lat: 38.9637, lng: 35.2433 },
    size: 'medium',
    funFacts: [
      'Istanbul is the only city on two continents!',
      'Turkeys (the bird) were named after this country!',
      'Has underground cities that housed 20,000 people!'
    ]
  },
  { 
    id: 'iran', 
    name: 'Iran', 
    x: 520, 
    y: 200, 
    difficulty: 2, 
    region: 'Asia',
    realWorldCoords: { lat: 32.4279, lng: 53.6880 },
    size: 'medium',
    funFacts: [
      'Home to the world\'s oldest windmill!',
      'Invented ice cream around 400 BC!',
      'Has a rich history spanning over 3,000 years!'
    ]
  },
  { 
    id: 'thailand', 
    name: 'Thailand', 
    x: 600, 
    y: 250, 
    difficulty: 2, 
    region: 'Asia',
    realWorldCoords: { lat: 15.8700, lng: 100.9925 },
    size: 'medium',
    funFacts: [
      'Land of smiles with over 40,000 temples!',
      'The only Southeast Asian country never colonized!',
      'Home to the world\'s smallest mammal, the bumblebee bat!'
    ]
  },
  { 
    id: 'argentina', 
    name: 'Argentina', 
    x: 310, 
    y: 380, 
    difficulty: 2, 
    region: 'South America',
    realWorldCoords: { lat: -38.4161, lng: -63.6167 },
    size: 'medium',
    funFacts: [
      'Invented the tango dance!',
      'Has the world\'s widest avenue - 9 de Julio!',
      'Home to the highest peak in the Americas!'
    ]
  },
  { 
    id: 'nigeria', 
    name: 'Nigeria', 
    x: 450, 
    y: 260, 
    difficulty: 2, 
    region: 'Africa',
    realWorldCoords: { lat: 9.0820, lng: 8.6753 },
    size: 'medium',
    funFacts: [
      'Most populous country in Africa!',
      'Has over 250 ethnic groups!',
      'Nollywood produces more movies than Hollywood!'
    ]
  },
  { 
    id: 'kazakhstan', 
    name: 'Kazakhstan', 
    x: 540, 
    y: 160, 
    difficulty: 2, 
    region: 'Asia',
    realWorldCoords: { lat: 48.0196, lng: 66.9237 },
    size: 'medium',
    funFacts: [
      'World\'s largest landlocked country!',
      'Apples originated here!',
      'Has the world\'s oldest space launch facility!'
    ]
  },

  // Cartographer Mode (Difficulty 3)
  { 
    id: 'netherlands', 
    name: 'Netherlands', 
    x: 445, 
    y: 145, 
    difficulty: 3, 
    region: 'Europe',
    realWorldCoords: { lat: 52.1326, lng: 5.2913 },
    size: 'small',
    funFacts: [
      'Has more bikes than residents!',
      'About 26% of the country is below sea level!',
      'Invented the stock market in 1602!'
    ]
  },
  { 
    id: 'switzerland', 
    name: 'Switzerland', 
    x: 448, 
    y: 155, 
    difficulty: 3, 
    region: 'Europe',
    realWorldCoords: { lat: 46.8182, lng: 8.2275 },
    size: 'small',
    funFacts: [
      'Has 7,000 lakes and 48 peaks over 4,000m!',
      'Invented milk chocolate and the computer mouse!',
      'Has been neutral for over 500 years!'
    ]
  },
  { 
    id: 'czech-republic', 
    name: 'Czech Republic', 
    x: 455, 
    y: 150, 
    difficulty: 3, 
    region: 'Europe',
    realWorldCoords: { lat: 49.8175, lng: 15.4730 },
    size: 'small',
    funFacts: [
      'Drinks the most beer per capita in the world!',
      'Prague has been called "City of a Hundred Spires"!',
      'The soft contact lens was invented here!'
    ]
  },
  { 
    id: 'bangladesh', 
    name: 'Bangladesh', 
    x: 580, 
    y: 230, 
    difficulty: 3, 
    region: 'Asia',
    realWorldCoords: { lat: 23.6850, lng: 90.3563 },
    size: 'small',
    funFacts: [
      'Has the world\'s largest river delta!',
      'More people than Russia in an area the size of Illinois!',
      'The Royal Bengal Tiger is the national animal!'
    ]
  },
  { 
    id: 'vietnam', 
    name: 'Vietnam', 
    x: 610, 
    y: 240, 
    difficulty: 3, 
    region: 'Asia',
    realWorldCoords: { lat: 14.0583, lng: 108.2772 },
    size: 'small',
    funFacts: [
      'Shaped like an "S" and over 2,000 miles long!',
      'Has the world\'s largest cave passage!',
      'Produces the second most coffee in the world!'
    ]
  },
  { 
    id: 'ghana', 
    name: 'Ghana', 
    x: 430, 
    y: 270, 
    difficulty: 3, 
    region: 'Africa',
    realWorldCoords: { lat: 7.9465, lng: -1.0232 },
    size: 'small',
    funFacts: [
      'First African country to gain independence!',
      'Produces about 20% of the world\'s gold!',
      'Lake Volta is one of the world\'s largest artificial lakes!'
    ]
  },
  { 
    id: 'peru', 
    name: 'Peru', 
    x: 290, 
    y: 320, 
    difficulty: 3, 
    region: 'South America',
    realWorldCoords: { lat: -9.1900, lng: -75.0152 },
    size: 'small',
    funFacts: [
      'Home to Machu Picchu, one of the New Seven Wonders!',
      'Has over 3,000 varieties of potatoes!',
      'The Amazon River starts in the Peruvian Andes!'
    ]
  },
  { 
    id: 'morocco', 
    name: 'Morocco', 
    x: 420, 
    y: 200, 
    difficulty: 3, 
    region: 'Africa',
    realWorldCoords: { lat: 31.7917, lng: -7.0926 },
    size: 'small',
    funFacts: [
      'Only African country with Atlantic and Mediterranean coasts!',
      'Has the world\'s oldest university still operating!',
      'Produces most of the world\'s argan oil!'
    ]
  },
  { 
    id: 'nepal', 
    name: 'Nepal', 
    x: 575, 
    y: 220, 
    difficulty: 3, 
    region: 'Asia',
    realWorldCoords: { lat: 28.3949, lng: 84.1240 },
    size: 'small',
    funFacts: [
      'Home to Mount Everest, the world\'s highest peak!',
      'Has a non-rectangular flag!',
      'Birthplace of Buddha!'
    ]
  },
  { 
    id: 'sri-lanka', 
    name: 'Sri Lanka', 
    x: 575, 
    y: 260, 
    difficulty: 3, 
    region: 'Asia',
    realWorldCoords: { lat: 7.8731, lng: 80.7718 },
    size: 'small',
    funFacts: [
      'Has the highest biodiversity per square kilometer!',
      'Invented coconut oil and cinnamon!',
      'The first country to have a female prime minister!'
    ]
  },

  // Geographer Mode (Difficulty 4)
  { 
    id: 'belgium', 
    name: 'Belgium', 
    x: 442, 
    y: 148, 
    difficulty: 4, 
    region: 'Europe',
    realWorldCoords: { lat: 50.5039, lng: 4.4699 },
    size: 'tiny',
    funFacts: [
      'Invented french fries and has over 800 beer varieties!',
      'Produces 220,000 tons of chocolate per year!',
      'Has the world\'s first shopping mall!'
    ]
  },
  { 
    id: 'denmark', 
    name: 'Denmark', 
    x: 450, 
    y: 135, 
    difficulty: 4, 
    region: 'Europe',
    realWorldCoords: { lat: 56.2639, lng: 9.5018 },
    size: 'tiny',
    funFacts: [
      'Happiest country in the world!',
      'Invented LEGO bricks!',
      'Has more pigs than people!'
    ]
  },
  { 
    id: 'tunisia', 
    name: 'Tunisia', 
    x: 450, 
    y: 195, 
    difficulty: 4, 
    region: 'Africa',
    realWorldCoords: { lat: 33.8869, lng: 9.5375 },
    size: 'tiny',
    funFacts: [
      'Where the Star Wars desert scenes were filmed!',
      'Has Africa\'s northernmost point!',
      'The ancient city of Carthage was located here!'
    ]
  },
  { 
    id: 'uruguay', 
    name: 'Uruguay', 
    x: 320, 
    y: 390, 
    difficulty: 4, 
    region: 'South America',
    realWorldCoords: { lat: -32.5228, lng: -55.7658 },
    size: 'tiny',
    funFacts: [
      'First country to legalize same-sex marriage in Latin America!',
      'Has more cattle than people!',
      'Won the first FIFA World Cup in 1930!'
    ]
  },
  { 
    id: 'guatemala', 
    name: 'Guatemala', 
    x: 180, 
    y: 250, 
    difficulty: 4, 
    region: 'Central America',
    realWorldCoords: { lat: 15.7835, lng: -90.2308 },
    size: 'tiny',
    funFacts: [
      'Has 37 volcanoes, 3 are still active!',
      'The quetzal bird is both currency and national symbol!',
      'Ancient Mayan civilization flourished here!'
    ]
  },
  { 
    id: 'jordan', 
    name: 'Jordan', 
    x: 490, 
    y: 200, 
    difficulty: 4, 
    region: 'Asia',
    realWorldCoords: { lat: 30.5852, lng: 36.2384 },
    size: 'tiny',
    funFacts: [
      'Home to Petra, one of the New Seven Wonders!',
      'Has the lowest point on Earth at the Dead Sea!',
      'More than 80% is desert!'
    ]
  },
  { 
    id: 'latvia', 
    name: 'Latvia', 
    x: 465, 
    y: 130, 
    difficulty: 4, 
    region: 'Europe',
    realWorldCoords: { lat: 56.8796, lng: 24.6032 },
    size: 'tiny',
    funFacts: [
      'Has the widest waterfall in Europe!',
      'Invented the Christmas tree tradition!',
      'Has more women than men in the population!'
    ]
  },
  { 
    id: 'cyprus', 
    name: 'Cyprus', 
    x: 485, 
    y: 190, 
    difficulty: 4, 
    region: 'Europe',
    realWorldCoords: { lat: 35.1264, lng: 33.4299 },
    size: 'tiny',
    funFacts: [
      'Birthplace of Aphrodite, the goddess of love!',
      'Has 340 days of sunshine per year!',
      'Copper gets its name from this island!'
    ]
  },
  { 
    id: 'fiji', 
    name: 'Fiji', 
    x: 750, 
    y: 320, 
    difficulty: 4, 
    region: 'Oceania',
    realWorldCoords: { lat: -16.5780, lng: 179.4144 },
    size: 'tiny',
    funFacts: [
      'Consists of 333 islands, only 110 are inhabited!',
      'Is the soft coral capital of the world!',
      'Traditional bose (fijian greeting) involves clapping hands!'
    ]
  },
  { 
    id: 'jamaica', 
    name: 'Jamaica', 
    x: 220, 
    y: 260, 
    difficulty: 4, 
    region: 'Caribbean',
    realWorldCoords: { lat: 18.1096, lng: -77.2975 },
    size: 'tiny',
    funFacts: [
      'Birthplace of reggae music and Bob Marley!',
      'Has the fastest runners in the world!',
      'Blue Mountain Coffee is among the world\'s most expensive!'
    ]
  },

  // Explorer Pro Mode (Difficulty 5)
  { 
    id: 'slovenia', 
    name: 'Slovenia', 
    x: 452, 
    y: 158, 
    difficulty: 5, 
    region: 'Europe',
    realWorldCoords: { lat: 46.1512, lng: 14.9955 },
    size: 'tiny',
    funFacts: [
      'Has Lake Bled with a church on an island!',
      'More than half the country is forest!',
      'Has the world\'s oldest vine, over 400 years old!'
    ]
  },
  { 
    id: 'estonia', 
    name: 'Estonia', 
    x: 465, 
    y: 125, 
    difficulty: 5, 
    region: 'Europe',
    realWorldCoords: { lat: 58.5953, lng: 25.0136 },
    size: 'tiny',
    funFacts: [
      'Most digitally advanced country in the world!',
      'Created Skype!',
      'Has over 1,500 islands!'
    ]
  },
  { 
    id: 'rwanda', 
    name: 'Rwanda', 
    x: 485, 
    y: 300, 
    difficulty: 5, 
    region: 'Africa',
    realWorldCoords: { lat: -1.9403, lng: 29.8739 },
    size: 'tiny',
    funFacts: [
      'Known as the "Land of a Thousand Hills"!',
      'First country where women hold majority in parliament!',
      'Plastic bags are banned!'
    ]
  },
  { 
    id: 'bhutan', 
    name: 'Bhutan', 
    x: 580, 
    y: 215, 
    difficulty: 5, 
    region: 'Asia',
    realWorldCoords: { lat: 27.5142, lng: 90.4336 },
    size: 'tiny',
    funFacts: [
      'Measures Gross National Happiness instead of GDP!',
      'Carbon negative country!',
      'Television was only introduced in 1999!'
    ]
  },
  { 
    id: 'moldova', 
    name: 'Moldova', 
    x: 470, 
    y: 160, 
    difficulty: 5, 
    region: 'Europe',
    realWorldCoords: { lat: 47.4116, lng: 28.3699 },
    size: 'tiny',
    funFacts: [
      'Has the world\'s largest wine cellar!',
      'Least visited country in Europe!',
      'No mountains - highest point is only 429m!'
    ]
  },
  { 
    id: 'montenegro', 
    name: 'Montenegro', 
    x: 460, 
    y: 170, 
    difficulty: 5, 
    region: 'Europe',
    realWorldCoords: { lat: 42.7087, lng: 19.3744 },
    size: 'tiny',
    funFacts: [
      'Name means "Black Mountain"!',
      'Has the deepest canyon in Europe!',
      'Declared independence in 2006!'
    ]
  },
  { 
    id: 'luxembourg', 
    name: 'Luxembourg', 
    x: 444, 
    y: 150, 
    difficulty: 5, 
    region: 'Europe',
    realWorldCoords: { lat: 49.8153, lng: 6.1296 },
    size: 'tiny',
    funFacts: [
      'Richest country in the world per capita!',
      'Has three official languages!',
      'Smaller than Rhode Island!'
    ]
  },
  { 
    id: 'brunei', 
    name: 'Brunei', 
    x: 630, 
    y: 280, 
    difficulty: 5, 
    region: 'Asia',
    realWorldCoords: { lat: 4.5353, lng: 114.7277 },
    size: 'tiny',
    funFacts: [
      'Sultan owns over 7,000 cars!',
      'No personal income tax!',
      'Rainforest covers 70% of the country!'
    ]
  },
  { 
    id: 'malta', 
    name: 'Malta', 
    x: 452, 
    y: 185, 
    difficulty: 5, 
    region: 'Europe',
    realWorldCoords: { lat: 35.9375, lng: 14.3754 },
    size: 'tiny',
    funFacts: [
      'Smallest EU country!',
      'Has been ruled by Romans, Arabs, Normans, and British!',
      'Azure Window from Game of Thrones was here!'
    ]
  },
  { 
    id: 'belize', 
    name: 'Belize', 
    x: 185, 
    y: 245, 
    difficulty: 5, 
    region: 'Central America',
    realWorldCoords: { lat: 17.1899, lng: -88.4976 },
    size: 'tiny',
    funFacts: [
      'Has the second largest coral reef in the world!',
      'English is the official language!',
      'Home to the famous Blue Hole!'
    ]
  },

  // Globe Master Mode (Difficulty 6)
  { 
    id: 'vatican', 
    name: 'Vatican City', 
    x: 450, 
    y: 175, 
    difficulty: 6, 
    region: 'Europe',
    realWorldCoords: { lat: 41.9029, lng: 12.4534 },
    size: 'tiny',
    funFacts: [
      'Smallest country at only 0.17 square miles!',
      'Has its own postal system and railway station!',
      'The Sistine Chapel ceiling has 5,000 square feet of frescoes!'
    ]
  },
  { 
    id: 'san-marino', 
    name: 'San Marino', 
    x: 451, 
    y: 173, 
    difficulty: 6, 
    region: 'Europe',
    realWorldCoords: { lat: 43.9424, lng: 12.4578 },
    size: 'tiny',
    funFacts: [
      'World\'s oldest republic, founded in 301 AD!',
      'Completely surrounded by Italy!',
      'Has more vehicles than people!'
    ]
  },
  { 
    id: 'liechtenstein', 
    name: 'Liechtenstein', 
    x: 448, 
    y: 153, 
    difficulty: 6, 
    region: 'Europe',
    realWorldCoords: { lat: 47.1660, lng: 9.5554 },
    size: 'tiny',
    funFacts: [
      'You can rent the entire country for $70,000 per night!',
      'Produces the most false teeth per capita!',
      'The prince\'s castle overlooks the capital!'
    ]
  },
  { 
    id: 'monaco', 
    name: 'Monaco', 
    x: 443, 
    y: 167, 
    difficulty: 6, 
    region: 'Europe',
    realWorldCoords: { lat: 43.7384, lng: 7.4246 },
    size: 'tiny',
    funFacts: [
      'Second smallest country in the world!',
      'No personal income tax for residents!',
      'Famous for Monte Carlo Casino and Formula 1!'
    ]
  },
  { 
    id: 'andorra', 
    name: 'Andorra', 
    x: 438, 
    y: 168, 
    difficulty: 6, 
    region: 'Europe',
    realWorldCoords: { lat: 42.5462, lng: 1.6016 },
    size: 'tiny',
    funFacts: [
      'Has no army but has been at peace for 700 years!',
      'Co-ruled by France and Spain!',
      'Life expectancy is among world\'s highest!'
    ]
  },
  { 
    id: 'nauru', 
    name: 'Nauru', 
    x: 720, 
    y: 310, 
    difficulty: 6, 
    region: 'Oceania',
    realWorldCoords: { lat: -0.5228, lng: 166.9315 },
    size: 'tiny',
    funFacts: [
      'Third smallest country in the world!',
      'Made of phosphate from bird droppings!',
      'Has no official capital city!'
    ]
  },
  { 
    id: 'tuvalu', 
    name: 'Tuvalu', 
    x: 740, 
    y: 320, 
    difficulty: 6, 
    region: 'Oceania',
    realWorldCoords: { lat: -7.1095, lng: 177.6493 },
    size: 'tiny',
    funFacts: [
      'Fourth smallest country in the world!',
      'Highest point is only 15 feet above sea level!',
      'Makes money by selling its internet domain .tv!'
    ]
  },
  { 
    id: 'palau', 
    name: 'Palau', 
    x: 680, 
    y: 270, 
    difficulty: 6, 
    region: 'Oceania',
    realWorldCoords: { lat: 7.5150, lng: 134.5825 },
    size: 'tiny',
    funFacts: [
      'Has a jellyfish lake where you can swim safely!',
      'First country to ban reef-toxic sunscreen!',
      'Has over 500 islands but only 9 are inhabited!'
    ]
  },
  { 
    id: 'marshall-islands', 
    name: 'Marshall Islands', 
    x: 700, 
    y: 290, 
    difficulty: 6, 
    region: 'Oceania',
    realWorldCoords: { lat: 7.1315, lng: 171.1845 },
    size: 'tiny',
    funFacts: [
      'Consists of 29 atolls and 5 islands!',
      'Average elevation is only 7 feet above sea level!',
      'Traditional navigation uses stick charts!'
    ]
  },
  { 
    id: 'comoros', 
    name: 'Comoros', 
    x: 510, 
    y: 320, 
    difficulty: 6, 
    region: 'Africa',
    realWorldCoords: { lat: -11.6455, lng: 43.3333 },
    size: 'tiny',
    funFacts: [
      'Known as the "Perfume Islands"!',
      'Produces 80% of the world\'s ylang-ylang!',
      'Has had over 20 coups since independence!'
    ]
  }
];

// Helper function to get countries by difficulty mode
export const getCountriesByDifficulty = (difficulty: Difficulty): Country[] => {
  return COUNTRIES.filter(country => country.difficulty === difficulty);
};

// Helper function to calculate real-world distance between two coordinates
export const calculateRealWorldDistance = (
  click: { x: number; y: number },
  target: { x: number; y: number },
  country: Country
): number => {
  // Calculate pixel distance
  const pixelDistance = Math.sqrt(
    Math.pow(click.x - target.x, 2) + Math.pow(click.y - target.y, 2)
  );
  
  // Convert to approximate real-world distance
  // This is a simplified conversion - in a real app you'd use proper map projection math
  const kmPerPixel = country.size === 'large' ? 50 : 
                    country.size === 'medium' ? 25 :
                    country.size === 'small' ? 15 : 8;
  
  return Math.round(pixelDistance * kmPerPixel);
};

// Bonus questions database
export interface BonusQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export const getBonusQuestions = (country: Country): BonusQuestion[] => {
  const questions: Record<string, BonusQuestion[]> = {
    'us': [
      {
        question: 'What is the capital of the United States?',
        options: ['New York', 'Washington D.C.', 'Los Angeles', 'Chicago'],
        correctAnswer: 1
      },
      {
        question: 'Which continent is the United States located in?',
        options: ['South America', 'Europe', 'North America', 'Asia'],
        correctAnswer: 2
      },
      {
        question: 'What is the official language of the United States?',
        options: ['Spanish', 'French', 'English', 'No official language'],
        correctAnswer: 3
      }
    ],
    'france': [
      {
        question: 'What is the capital of France?',
        options: ['Lyon', 'Marseille', 'Paris', 'Nice'],
        correctAnswer: 2
      },
      {
        question: 'Which famous landmark is located in France?',
        options: ['Big Ben', 'Eiffel Tower', 'Colosseum', 'Statue of Liberty'],
        correctAnswer: 1
      },
      {
        question: 'What is the official language of France?',
        options: ['Spanish', 'French', 'Italian', 'German'],
        correctAnswer: 1
      }
    ],
    'japan': [
      {
        question: 'What is the capital of Japan?',
        options: ['Osaka', 'Kyoto', 'Tokyo', 'Hiroshima'],
        correctAnswer: 2
      },
      {
        question: 'Which continent is Japan located in?',
        options: ['Europe', 'Asia', 'North America', 'Africa'],
        correctAnswer: 1
      },
      {
        question: 'What is Japan famous for?',
        options: ['Pizza', 'Sushi', 'Tacos', 'Hamburgers'],
        correctAnswer: 1
      }
    ],
    'brazil': [
      {
        question: 'What is the capital of Brazil?',
        options: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'],
        correctAnswer: 2
      },
      {
        question: 'Which continent is Brazil located in?',
        options: ['North America', 'South America', 'Africa', 'Asia'],
        correctAnswer: 1
      },
      {
        question: 'What is the official language of Brazil?',
        options: ['Spanish', 'Portuguese', 'English', 'French'],
        correctAnswer: 1
      }
    ],
    'germany': [
      {
        question: 'What is the capital of Germany?',
        options: ['Munich', 'Hamburg', 'Berlin', 'Frankfurt'],
        correctAnswer: 2
      },
      {
        question: 'Which continent is Germany located in?',
        options: ['Europe', 'Asia', 'North America', 'Africa'],
        correctAnswer: 0
      },
      {
        question: 'What is Germany famous for?',
        options: ['Beer and cars', 'Rice and tea', 'Pasta and wine', 'Tacos and sombreros'],
        correctAnswer: 0
      }
    ]
  };

  // Return questions for the specific country, or default questions if not found
  return questions[country.id] || [
    {
      question: `Which continent is ${country.name} located in?`,
      options: ['Africa', 'Asia', 'Europe', 'North America'],
      correctAnswer: country.region === 'Africa' ? 0 : 
                    country.region === 'Asia' ? 1 : 
                    country.region === 'Europe' ? 2 : 3
    },
    {
      question: `What region is ${country.name} in?`,
      options: [country.region, 'Antarctica', 'Arctic', 'Pacific Ocean'],
      correctAnswer: 0
    },
    {
      question: `${country.name} is classified as which size?`,
      options: ['tiny', 'small', 'medium', 'large'],
      correctAnswer: country.size === 'tiny' ? 0 : 
                    country.size === 'small' ? 1 : 
                    country.size === 'medium' ? 2 : 3
    }
  ];
};
