// Types for The Data Detectives game

export type ChapterId = 1 | 2 | 3;

export type Difficulty = 'Easy' | 'Intermediate' | 'Advanced';

export type DetectiveRank = 
  | 'Junior Detective' 
  | 'Field Investigator' 
  | 'Senior Investigator' 
  | 'Chief Detective' 
  | 'Master Detective';

export interface EvidenceItem {
  id: string;
  title: string;
  type: 'photo' | 'cctv' | 'document' | 'map' | 'witness' | 'note' | 'biometric';
  x: number; // percentage on corkboard
  y: number; // percentage on corkboard
  rotation: number; // slight rotation degrees for realism
  thumbnail?: string;
  shortDesc: string;
  content: string;
  details?: Record<string, string | number>;
  tag?: string;
  isUnlocked?: boolean;
}

export interface StringConnection {
  fromId: string;
  toId: string;
  label?: string;
  isCorrect?: boolean;
}

export interface Suspect {
  id: string;
  name: string;
  age: number;
  role: string;
  avatarColor: string;
  alibi: string;
  motive: string;
  traits: string[];
  isCulprit: boolean;
  contradiction: string; // Explained when user accuses incorrectly or correctly
}

export interface HintTier {
  id: 'small' | 'highlight' | 'step' | 'advanced';
  title: string;
  cost: number;
  description: string;
  text: string;
}

export interface LearningReport {
  whatHappened: string;
  whatDiscovered: string;
  conceptName: string;
  conceptDefinition: string;
  realWorldApplication: string;
  formulaOrRule?: string;
  badgeTitle: string;
  badgeIcon: string;
}

export interface CaseData {
  id: string;
  caseNumber: number;
  chapter: ChapterId;
  title: string;
  subtitle: string;
  difficulty: Difficulty;
  rewardCoins: number;
  rewardXp: number;
  briefing: {
    crimeDescription: string;
    location: string;
    incidentTime: string;
    initialClues: string[];
    missionObjective: string;
  };
  evidenceList: EvidenceItem[];
  suspects: Suspect[];
  correctConnections: { from: string; to: string }[];
  dsConcept: {
    name: string;
    description: string;
    instructions: string;
  };
  hints: HintTier[];
  learningReport: LearningReport;
  // Specific dataset payload for the interactive Data Science task
  dataset: any;
}

export interface PlayerProfile {
  name: string;
  rank: DetectiveRank;
  coins: number;
  xp: number;
  completedCases: string[];
  caseAccuracies: Record<string, { attempts: number; solved: boolean; date: string }>;
  unlockedHints: Record<string, string[]>; // caseId -> array of hint ids
  badges: string[];
  activeCaseId: string | null;
  soundEnabled: boolean;
}

export interface PlaytestEntry {
  id: string;
  testerName: string;
  role: string;
  caseTested: string;
  easeOfUseRating: number; // 1-5
  learningRating: number; // 1-5
  enjoymentRating: number; // 1-5
  feedback: string;
  timestamp: string;
}
