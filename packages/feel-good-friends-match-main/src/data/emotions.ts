
// Easy Level - Basic Emotions
const easyEmotions = [
  {
    emotion: 'happy',
    emoji: '😀',
    color: 'bg-green-100',
    borderColor: 'border-green-400',
    stories: [
      'Your mom made your favorite cookies',
      'You got to play with your best friend today',
      'It\'s a sunny day and you can go outside'
    ]
  },
  {
    emotion: 'sad',
    emoji: '😢',
    color: 'bg-blue-100',
    borderColor: 'border-blue-400',
    stories: [
      'Your ice cream fell on the ground',
      'Your friend moved to a different school',
      'You can\'t find your favorite stuffed animal'
    ]
  },
  {
    emotion: 'angry',
    emoji: '😠',
    color: 'bg-red-100',
    borderColor: 'border-red-400',
    stories: [
      'Someone took your toy without asking',
      'Your little brother broke your Lego creation',
      'You have to clean your room instead of playing'
    ]
  },
  {
    emotion: 'scared',
    emoji: '😨',
    color: 'bg-purple-100',
    borderColor: 'border-purple-400',
    stories: [
      'You hear thunder during a storm',
      'There\'s a big dog barking loudly',
      'The lights went out in your room'
    ]
  },
  {
    emotion: 'sleepy',
    emoji: '😴',
    color: 'bg-slate-100',
    borderColor: 'border-slate-400',
    stories: [
      'You stayed up late watching movies',
      'You played outside all day long',
      'It\'s past your bedtime'
    ]
  },
  {
    emotion: 'surprised',
    emoji: '😮',
    color: 'bg-pink-100',
    borderColor: 'border-pink-400',
    stories: [
      'Someone threw you a surprise party',
      'You found a $5 bill in your pocket',
      'Your dad came home early from work'
    ]
  }
];

// Intermediate Level - More Complex Emotions
const intermediateEmotions = [
  {
    emotion: 'worried',
    emoji: '😰',
    color: 'bg-gray-100',
    borderColor: 'border-gray-400',
    stories: [
      'You forgot to do your homework assignment',
      'Your pet hamster isn\'t eating his food',
      'Your mom is late picking you up from school'
    ]
  },
  {
    emotion: 'embarrassed',
    emoji: '😳',
    color: 'bg-rose-100',
    borderColor: 'border-rose-400',
    stories: [
      'You tripped and fell in front of everyone',
      'Your stomach growled loudly during quiet time',
      'You forgot the words to your song in the school play'
    ]
  },
  {
    emotion: 'frustrated',
    emoji: '😤',
    color: 'bg-orange-100',
    borderColor: 'border-orange-400',
    stories: [
      'You can\'t solve a puzzle you\'ve been working on',
      'Your computer game keeps freezing',
      'You keep missing the basketball hoop'
    ]
  },
  {
    emotion: 'disappointed',
    emoji: '😔',
    color: 'bg-cyan-100',
    borderColor: 'border-cyan-400',
    stories: [
      'The movie you wanted to see was sold out',
      'Your soccer game got cancelled because of rain',
      'Your friend couldn\'t come to your sleepover'
    ]
  },
  {
    emotion: 'grateful',
    emoji: '🥰',
    color: 'bg-teal-100',
    borderColor: 'border-teal-400',
    stories: [
      'Your teacher helped you understand math',
      'Your neighbor brought soup when you were sick',
      'Your grandma sent you a surprise package'
    ]
  },
  {
    emotion: 'proud',
    emoji: '😏',
    color: 'bg-indigo-100',
    borderColor: 'border-indigo-400',
    stories: [
      'You learned to ride your bike without training wheels',
      'You got an A on your spelling test',
      'You helped your mom cook dinner all by yourself'
    ]
  }
];

// Hard Level - Complex Emotions
const hardEmotions = [
  {
    emotion: 'peaceful',
    emoji: '😌',
    color: 'bg-sky-100',
    borderColor: 'border-sky-400',
    stories: [
      'You\'re reading quietly in your favorite spot',
      'You\'re watching the sunset with your family',
      'You finished all your chores and can finally relax'
    ]
  },
  {
    emotion: 'overwhelmed',
    emoji: '😩',
    color: 'bg-purple-200',
    borderColor: 'border-purple-500',
    stories: [
      'You have three tests, a book report, and soccer practice this week',
      'Your room is so messy you don\'t know where to start cleaning',
      'Everyone is asking you to do different things at the same time'
    ]
  },
  {
    emotion: 'lonely',
    emoji: '🥺',
    color: 'bg-blue-200',
    borderColor: 'border-blue-500',
    stories: [
      'All your friends are busy and can\'t play today',
      'You\'re the new kid at school and don\'t know anyone yet',
      'Your family went somewhere and you had to stay with a babysitter'
    ]
  },
  {
    emotion: 'suspicious',
    emoji: '🤨',
    color: 'bg-yellow-200',
    borderColor: 'border-yellow-500',
    stories: [
      'Your friends are whispering and stop when you walk by',
      'Your parents are hiding something behind their backs',
      'Your brother is being unusually nice to you'
    ]
  },
  {
    emotion: 'relieved',
    emoji: '😮‍💨',
    color: 'bg-green-200',
    borderColor: 'border-green-500',
    stories: [
      'You thought you lost your homework but found it in your backpack',
      'The doctor said your broken arm is healing perfectly',
      'You were worried about the test but it was easier than expected'
    ]
  },
  {
    emotion: 'amazed',
    emoji: '🤯',
    color: 'bg-yellow-300',
    borderColor: 'border-yellow-600',
    stories: [
      'You saw a magic trick and couldn\'t figure out how it worked',
      'Your little sister said her first word',
      'You discovered a hidden room in your house'
    ]
  }
];

// Who Knows What Level - Very Complex/Subtle Emotions
const complexEmotions = [
  {
    emotion: 'ambivalent',
    emoji: '🫤',
    color: 'bg-stone-200',
    borderColor: 'border-stone-500',
    stories: [
      'You\'re excited about moving to a new house but sad to leave your friends',
      'You want to grow up but also want to stay little',
      'You love your new baby sister but miss having all of mom\'s attention'
    ]
  },
  {
    emotion: 'bittersweet',
    emoji: '🥲',
    color: 'bg-amber-200',
    borderColor: 'border-amber-500',
    stories: [
      'Looking at photos from when your grandpa was alive',
      'Your older sibling is going to college and you\'re proud but will miss them',
      'Finishing a really good book series and being happy but sad it\'s over'
    ]
  },
  {
    emotion: 'apathetic',
    emoji: '😑',
    color: 'bg-gray-200',
    borderColor: 'border-gray-500',
    stories: [
      'Everyone is excited about the school assembly but you don\'t really care',
      'Your friends are arguing about which game to play and you\'re fine with anything',
      'It\'s your birthday but you don\'t feel like celebrating'
    ]
  },
  {
    emotion: 'conflicted',
    emoji: '🤫',
    color: 'bg-indigo-200',
    borderColor: 'border-indigo-500',
    stories: [
      'You saw your friend cheat on a test but don\'t want to get them in trouble',
      'You want to tell the truth but you\'re afraid you\'ll get in big trouble',
      'You found money on the ground and don\'t know if you should keep it or turn it in'
    ]
  },
  {
    emotion: 'contemplative',
    emoji: '🤔',
    color: 'bg-violet-200',
    borderColor: 'border-violet-500',
    stories: [
      'You\'re thinking about what you want to be when you grow up',
      'You\'re wondering why some people are mean and others are kind',
      'You\'re looking at the stars and thinking about how big the universe is'
    ]
  },
  {
    emotion: 'ironic',
    emoji: '🙃',
    color: 'bg-pink-200',
    borderColor: 'border-pink-500',
    stories: [
      'You studied all night for a test and then the teacher got sick so it was cancelled',
      'You finally got brave enough to go on the big roller coaster and it broke down',
      'You saved up for months to buy something and then got it as a surprise gift'
    ]
  }
];

// Helper function to get a random story for an emotion
const getRandomStory = (emotion: any) => {
  const randomIndex = Math.floor(Math.random() * emotion.stories.length);
  return emotion.stories[randomIndex];
};

// Helper function to prepare emotions with random stories - now takes a seed for consistency
const prepareEmotionsWithRandomStories = (emotions: any[], seed?: number) => {
  // Use seed to make randomization consistent for the same level
  if (seed !== undefined) {
    // Simple seeded random function
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    return emotions.map((emotion, index) => {
      const randomIndex = Math.floor(seededRandom(seed + index) * emotion.stories.length);
      return {
        ...emotion,
        description: emotion.stories[randomIndex]
      };
    });
  }
  
  return emotions.map(emotion => ({
    ...emotion,
    description: getRandomStory(emotion)
  }));
};

export const getEmotionsByLevel = (level: number, isHardMode: boolean = false, seed?: number) => {
  const useSeed = seed !== undefined ? seed : level; // Use level as seed if no seed provided
  
  if (isHardMode) {
    // Hard mode: use complex emotions
    return prepareEmotionsWithRandomStories(complexEmotions, useSeed);
  }
  
  // Regular progression based on level
  if (level <= 2) {
    return prepareEmotionsWithRandomStories(easyEmotions.slice(0, 4), useSeed); // 4 basic emotions
  } else if (level <= 4) {
    return prepareEmotionsWithRandomStories(easyEmotions, useSeed); // All 6 easy emotions
  } else if (level <= 6) {
    return prepareEmotionsWithRandomStories(intermediateEmotions.slice(0, 4), useSeed); // 4 intermediate emotions
  } else if (level <= 8) {
    return prepareEmotionsWithRandomStories(intermediateEmotions, useSeed); // All 6 intermediate emotions  
  } else if (level <= 10) {
    return prepareEmotionsWithRandomStories(hardEmotions.slice(0, 4), useSeed); // 4 hard emotions
  } else {
    return prepareEmotionsWithRandomStories(hardEmotions, useSeed); // All 6 hard emotions
  }
};

// Export individual emotion sets for reference
export { easyEmotions, intermediateEmotions, hardEmotions, complexEmotions };
