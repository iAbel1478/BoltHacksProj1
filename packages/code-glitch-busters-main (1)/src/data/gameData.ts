export const titleProgression = [
  // Beginner Titles
  { level: 1, title: "Bug Spotter", description: "You can spot the obvious bugs!" },
  { level: 2, title: "Syntax Solver", description: "Semicolons fear you!" },
  { level: 3, title: "Logic Detective", description: "You solve the mysteries of code!" },
  
  // Intermediate Titles
  { level: 4, title: "Code Guardian", description: "Protector of clean code!" },
  { level: 5, title: "Debug Master", description: "Master of the debugging arts!" },
  { level: 6, title: "Algorithm Ace", description: "Algorithms bend to your will!" },
  
  // Advanced Titles
  { level: 7, title: "Digital Defender", description: "Defender of all digital realms!" },
  { level: 8, title: "System Savior", description: "Savior of corrupted systems!" },
  { level: 9, title: "Cyber Champion", description: "Champion of the cyber world!" },
  
  // Expert Titles
  { level: 10, title: "Code Crusader", description: "Crusader against all bugs!" },
  { level: 12, title: "Syntax Sage", description: "Wise in the ways of code structure!" },
  { level: 15, title: "Binary Boss", description: "Master of ones and zeros!" },
  { level: 18, title: "Logic Legend", description: "Legendary problem solver!" },
  { level: 20, title: "Ultimate Programmer", description: "The ultimate coding hero!" },
  
  // Master Titles
  { level: 25, title: "Code Wizard", description: "Magic flows through your keyboard!" },
  { level: 30, title: "Digital Deity", description: "You transcend mortal coding limits!" },
  { level: 35, title: "Omniprogrammer", description: "You speak all programming languages!" },
  { level: 40, title: "The Code Chosen One", description: "Destined to debug the universe!" }
];

export const sidekicks = [
  { 
    name: "Debugger the Bloodhound", 
    emoji: "🐕", 
    type: "sidekick",
    description: "Follows execution paths step-by-step through complex code flows. Can 'smell' when variables change unexpectedly or when control flow takes wrong turns. Specializes in tracking down race conditions and timing-related bugs that are hard to reproduce."
  },
  { 
    name: "Tester the Chameleon", 
    emoji: "🦎", 
    type: "sidekick",
    description: "Automatically adapts to any testing framework and generates comprehensive test cases. Creates edge case scenarios that expose hidden bugs developers didn't think to test. Can simulate different environments (mobile, web, desktop) to catch platform-specific issues."
  },
  { 
    name: "Git the Elephant", 
    emoji: "🐘", 
    type: "sidekick",
    description: "Uses version history to pinpoint exactly when bugs were introduced through bisect operations. Compares current broken code with previous working versions to highlight what changed. Maintains a 'bug DNA database' to recognize similar patterns from past fixes."
  }
];

export const gear = [
  { 
    name: "Stack Trace Compass", 
    emoji: "🧭", 
    type: "gear",
    description: "Cuts through misleading error messages to point directly at the true root cause of bugs. Ignores surface-level symptoms and traces execution flow backwards to find where things actually went wrong. Shows the exact sequence of function calls that led to the error."
  },
  { 
    name: "Memory Leak Detector", 
    emoji: "📡", 
    type: "gear",
    description: "Visualizes memory allocation patterns in real-time across different languages. Identifies objects, variables, and resources that should have been freed but are still consuming memory. Shows reference chains that prevent garbage collection from working properly."
  },
  { 
    name: "Cross-Platform Translator", 
    emoji: "🔄", 
    type: "gear",
    description: "Instantly converts code logic between different programming languages while preserving functionality. Highlights language-specific gotchas when porting (like Python's indentation vs JavaScript's braces). Suggests equivalent libraries and functions across language ecosystems."
  }
];

// Keep the original gameData structure for backwards compatibility
export const gameData = {
  levels: [] // This will be replaced by the new problem library system
};
