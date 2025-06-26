
export type GameState = 'intro' | 'clues' | 'deduction' | 'result' | 'mini-game' | 'dialogue' | 'profile' | 'case-select';
export type GameMode = 'easy' | 'medium' | 'hard';
export type GradeLevel = 'K-5' | '6-8' | '9-12';
export type MiniGameType = 'cipher' | 'logic-grid' | 'hidden-object' | 'timeline' | 'photo-analysis' | 'letter-substitution' | 'caesar-cipher' | 'symbol-decode' | 'backwards-text';

export interface Clue {
  id: string;
  name: string;
  description: string;
  icon: string;
  slideFound: number;
  isRedHerring?: boolean;
  category?: 'physical' | 'testimony' | 'digital' | 'circumstantial';
  difficulty?: number; // 1-5 scale for adaptive difficulty
  position?: string; // CSS position for interactive placement
}

export interface Suspect {
  id: string;
  name: string;
  description: string;
  avatar: string;
  motive: string;
  alibi: string;
  nervousness: number; // 1-10 scale
  credibility: number; // 1-10 scale
  dialogueUnlocked: boolean;
  gradeAppropriate?: GradeLevel[];
}

export interface Case {
  id: string;
  title: string;
  description: string;
  difficulty: GameMode;
  gradeLevel: GradeLevel;
  unlocked: boolean;
  completed: boolean;
  bestScore?: number;
  theme?: 'school' | 'playground' | 'cafeteria' | 'library' | 'science' | 'sports' | 'seasonal';
  twistEnding?: boolean;
  positiveOutcome?: boolean; // For cases that end positively
}

export interface SlideData {
  title: string;
  background: string;
  description: string;
  clues: Clue[];
  hint: string;
  objects: Array<{
    id: string;
    emoji: string;
    position: string;
  }>;
  interactives?: Array<{
    id: string;
    emoji: string;
    position: string;
    action: string;
    title: string;
  }>;
}

export interface DetectiveRank {
  name: string;
  icon: string;
  description: string;
  minScore: number;
}

export interface MiniGame {
  id: string;
  type: MiniGameType;
  title: string;
  description: string;
  completed: boolean;
  reward?: Clue;
  difficulty?: number;
}

export interface PlayerProgress {
  xp: number;
  level: number;
  badges: Achievement[];
  casesCompleted: string[];
  perfectScores: number;
  hiddenCluesFound: number;
  totalPlayTime: number;
  gradeLevel?: GradeLevel;
  adaptiveDifficulty: number; // Tracks success rate for adaptive difficulty
  vocabularyWords: string[]; // Words learned through context
  collaborativeMode?: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  gradeLevel?: GradeLevel;
}

export interface DialogueNode {
  id: string;
  text: string;
  speaker: string;
  choices: DialogueChoice[];
  clueRevealed?: string;
  vocabularyHint?: string; // For educational context
}

export interface DialogueChoice {
  id: string;
  text: string;
  nextNodeId?: string;
  requiresClue?: string;
  suspicionIncrease?: number;
  difficulty?: number;
}

export interface DailyChallenge {
  id: string;
  date: string;
  case: Case;
  bonusReward: Achievement;
  completed: boolean;
}

export interface TeacherDashboard {
  studentProgress: PlayerProgress[];
  classAverageScore: number;
  vocabularyProgress: { [studentId: string]: string[] };
  collaborativeGroups: { [groupId: string]: string[] };
}
