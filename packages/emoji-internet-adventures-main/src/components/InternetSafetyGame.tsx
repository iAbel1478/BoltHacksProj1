
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import RuleSlide from './RuleSlide';
import Blackboard from './Blackboard';

const safetyRules = [
  {
    id: 1,
    title: "Never Share Personal Information",
    character: "🐱",
    characterName: "Whiskers the Cat",
    story: "Hi there, friend! I'm Whiskers, and I love exploring! I once shared my home address while playing an online game because I was so excited to make new friends. But my mom explained that keeping personal information private helps keep me safe, just like how cats keep their favorite hiding spots secret!",
    rule: "Rule 1: Never share personal information online"
  },
  {
    id: 2,
    title: "Don't Download Things Alone",
    character: "🐶",
    characterName: "Buddy the Puppy",
    story: "Woof woof! I'm Buddy, your friendly pup! I once saw a super cool game and downloaded it without asking. It made our computer feel sick with a virus! Now I always ask my humans before downloading anything - they help me find the best and safest games to play!",
    rule: "Rule 2: Always ask an adult before downloading anything"
  },
  {
    id: 3,
    title: "Don't Respond to Bullies",
    character: "🐰",
    characterName: "Hopscotch the Bunny",
    story: "Hello, I'm Hopscotch! I love hopping around and making friends. When someone was unkind to me online, I felt sad and wanted to hop away. My teacher taught me that telling a grown-up is much better than arguing back. Now I know how to stay happy and safe!",
    rule: "Rule 3: Don't respond to cyberbullies - tell an adult instead"
  },
  {
    id: 4,
    title: "Tell an Adult if Something Makes You Uncomfortable",
    character: "🐧",
    characterName: "Pippin the Penguin",
    story: "Slide on over, I'm Pippin! Sometimes while swimming through the internet, I come across things that make me feel worried or confused. I learned that telling my family right away helps me feel better and keeps me safe, just like how penguins look out for each other!",
    rule: "Rule 4: If something online makes you uncomfortable, tell an adult immediately"
  },
  {
    id: 5,
    title: "Only Talk to People You Know in Real Life",
    character: "🦊",
    characterName: "Rusty the Fox",
    story: "Hey there! I'm Rusty, and I'm pretty clever! I once thought I made a new friend online, but they weren't telling the truth about who they were. Now I stick to chatting with friends I know from school and family. Real friends are the most fun friends!",
    rule: "Rule 5: Only talk to people online that you know in real life"
  },
  {
    id: 6,
    title: "Use Strong Passwords and Keep Them Private",
    character: "🐨",
    characterName: "Koby the Koala",
    story: "G'day mate! I'm Koby, and I love climbing high in my eucalyptus tree! I used to use simple passwords like '123456', but someone guessed them and got into my accounts. Now I use strong passwords with letters, numbers, and symbols - they're like secret codes that keep my stuff safe up in my tree!",
    rule: "Rule 6: Use strong passwords and keep them private"
  },
  {
    id: 7,
    title: "Think Before You Click",
    character: "🦉",
    characterName: "Olive the Owl",
    story: "Hoot hoot! I'm Olive, and I'm very wise! I used to click on everything that looked interesting, like a shiny button that said 'Click me!' But I learned that taking a moment to think first helps me avoid tricky websites. Being patient and careful is always the wisest choice!",
    rule: "Rule 7: Always think before you click on links or buttons"
  },
  {
    id: 8,
    title: "Log Out When You're Done on Shared Devices",
    character: "🐒",
    characterName: "Mango the Monkey",
    story: "Ooh ooh! I'm Mango, and I love swinging from branch to branch! I once forgot to log out of my account on the library computer, and the next person could see all my stuff! Now I always remember to log out when I'm done, just like how I always swing back to my favorite tree at the end of the day!",
    rule: "Rule 8: Always log out when finished using shared devices"
  },
  {
    id: 9,
    title: "Don't Click on Pop-up Ads or Suspicious Links",
    character: "🦓",
    characterName: "Ziggy the Zebra",
    story: "Neigh there! I'm Ziggy with my awesome stripes! I once saw a flashy pop-up that said 'You won a million bananas!' It looked so exciting, but my dad explained that real prizes don't come from pop-ups. Now I close those tricky ads and stick to websites I trust!",
    rule: "Rule 9: Avoid clicking on pop-up ads or suspicious links"
  },
  {
    id: 10,
    title: "Ask Permission Before Posting Pictures of Others",
    character: "🦒",
    characterName: "Stretchy the Giraffe",
    story: "Hello from up high! I'm Stretchy, and I can see everything from way up here! I love taking photos with my friends, but I learned it's important to ask before sharing pictures of them online. Everyone deserves to choose if their photo gets shared, just like how I choose which leaves to eat from the tallest trees!",
    rule: "Rule 10: Always ask permission before posting pictures of others"
  },
  {
    id: 11,
    title: "Keep Device Software and Apps Up to Date",
    character: "🐢",
    characterName: "Shelly the Turtle",
    story: "Hi friend! I'm Shelly, and I take things nice and slow. I used to ignore those update notifications on my devices, but I learned that updates help keep my shell - I mean my devices - strong and protected! Now I update regularly, because slow and steady keeps me safe and secure!",
    rule: "Rule 11: Keep your device software and apps up to date"
  },
  {
    id: 12,
    title: "Be Kind and Respectful in All Online Interactions",
    character: "🐘",
    characterName: "Ellie the Elephant",
    story: "Hello there, little one! I'm Ellie, and I have a big heart and a long memory. I always remember to be kind online, just like I am with my elephant family. Being respectful and caring makes the internet a happier place for everyone, and that makes my big elephant heart very happy!",
    rule: "Rule 12: Always be kind and respectful in your online interactions"
  }
];

const InternetSafetyGame = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [learnedRules, setLearnedRules] = useState<string[]>([]);

  const handleNext = () => {
    if (currentSlide < safetyRules.length - 1) {
      // Add the current rule to learned rules if not already added
      const currentRule = safetyRules[currentSlide].rule;
      if (!learnedRules.includes(currentRule)) {
        setLearnedRules([...learnedRules, currentRule]);
      }
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleReset = () => {
    // Add the final rule to learned rules before reset
    const currentRule = safetyRules[currentSlide].rule;
    if (!learnedRules.includes(currentRule)) {
      setLearnedRules([...learnedRules, currentRule]);
    }
    // Reset to beginning
    setCurrentSlide(0);
    setLearnedRules([]);
  };

  const isLastSlide = currentSlide === safetyRules.length - 1;
  const isFirstSevenComplete = currentSlide >= 6;
  const currentRuleData = safetyRules[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-green-100 to-orange-100 p-3">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-amber-800 mb-2 font-mono tracking-wider">
            🦁 TECH-7: INTERNET SAFETY RULES 🦁
          </h1>
          <p className="text-lg text-green-700 font-semibold">
            🎪 Master the 7 essential rules with bonus animal friends! 🎪
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Story Slide */}
          <div className="h-full">
            <RuleSlide
              character={currentRuleData.character}
              characterName={currentRuleData.characterName}
              story={currentRuleData.story}
              title={currentRuleData.title}
              ruleNumber={currentSlide + 1}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onReset={handleReset}
              canGoPrevious={currentSlide > 0}
              canGoNext={currentSlide < safetyRules.length - 1}
              isLastSlide={isLastSlide}
              isFirstSevenComplete={isFirstSevenComplete}
            />
          </div>

          {/* Blackboard */}
          <div>
            <Blackboard 
              rules={learnedRules} 
              currentRule={currentSlide === safetyRules.length - 1 && learnedRules.length === safetyRules.length ? safetyRules[currentSlide].rule : undefined}
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-amber-200 rounded-full h-2 border border-amber-400">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentSlide + 1) / safetyRules.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-center text-sm text-green-700 mt-2 font-semibold">
            🌟 Adventure Progress: {currentSlide + 1}/{safetyRules.length} animals visited 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default InternetSafetyGame;
