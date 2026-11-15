import React, { createContext, useContext, useState, useEffect } from 'react';
import { PlayerProfile, CaseData, StringConnection, DetectiveRank, PlaytestEntry, EvidenceItem, Suspect } from '../types/game';
import { CASE_LIST } from '../data/cases';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export type ScreenType = 
  | 'main-menu' 
  | 'headquarters' 
  | 'case-select' 
  | 'investigation' 
  | 'how-to-play' 
  | 'profile' 
  | 'documentation';

export type InvestigationTab = 'corkboard' | 'datalab' | 'suspects' | 'accusation';

interface GameContextType {
  // Navigation & Screen State
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  activeTab: InvestigationTab;
  setActiveTab: (tab: InvestigationTab) => void;

  // Active Case State
  activeCase: CaseData | null;
  activeCaseId: string | null;
  startCase: (caseId: string) => void;
  closeActiveCase: () => void;

  // Player Profile
  profile: PlayerProfile;
  updatePlayerName: (name: string) => void;
  toggleSound: () => void;
  resetAllProgress: () => void;

  // Modals
  briefingOpen: boolean;
  setBriefingOpen: (open: boolean) => void;
  learningReportOpen: boolean;
  setLearningReportOpen: (open: boolean) => void;
  hintShopOpen: boolean;
  setHintShopOpen: (open: boolean) => void;
  inspectedEvidence: EvidenceItem | null;
  setInspectedEvidence: (ev: EvidenceItem | null) => void;

  // Investigation Corkboard Strings
  connections: StringConnection[];
  connectPins: (fromId: string, toId: string) => boolean;
  removeConnection: (fromId: string, toId: string) => void;
  clearConnections: () => void;

  // Data Science Task
  isDsTaskSolved: boolean;
  markDsTaskSolved: () => void;

  // Accusation & Case Resolution
  lastAccusationFeedback: { success: boolean; message: string; suspect?: Suspect } | null;
  submitAccusation: (suspectId: string) => { success: boolean; message: string };

  // Hint Purchasing
  purchaseHint: (hintId: string, cost: number) => boolean;
  hasHint: (hintId: string) => boolean;

  // Playtesting Log
  playtestEntries: PlaytestEntry[];
  addPlaytestEntry: (entry: Omit<PlaytestEntry, 'id' | 'timestamp'>) => void;
}

const STORAGE_KEY = 'data_detectives_v1_save';
const PLAYTEST_STORAGE_KEY = 'data_detectives_v1_playtest';

const INITIAL_PROFILE: PlayerProfile = {
  name: 'Junior Detective',
  rank: 'Junior Detective',
  coins: 100, // Standard prompt requirement: starting balance 100 coins
  xp: 0,
  completedCases: [],
  caseAccuracies: {},
  unlockedHints: {},
  badges: [],
  activeCaseId: null,
  soundEnabled: true,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(() => {
    try {
      const hasSeen = localStorage.getItem('data_detectives_seen_guide');
      return hasSeen ? 'main-menu' : 'how-to-play';
    } catch {
      return 'how-to-play';
    }
  });
  const [activeTab, setActiveTab] = useState<InvestigationTab>('corkboard');
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);

  // Modals
  const [briefingOpen, setBriefingOpen] = useState<boolean>(false);
  const [learningReportOpen, setLearningReportOpen] = useState<boolean>(false);
  const [hintShopOpen, setHintShopOpen] = useState<boolean>(false);
  const [inspectedEvidence, setInspectedEvidence] = useState<EvidenceItem | null>(null);

  // Red String Connections for active case
  const [connections, setConnections] = useState<StringConnection[]>([]);
  // DS Task completion for active case
  const [isDsTaskSolved, setIsDsTaskSolved] = useState<boolean>(false);
  // Accusation result feedback
  const [lastAccusationFeedback, setLastAccusationFeedback] = useState<{ success: boolean; message: string; suspect?: Suspect } | null>(null);

  // Profile
  const [profile, setProfile] = useState<PlayerProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved state', e);
    }
    return INITIAL_PROFILE;
  });

  // Playtest entries
  const [playtestEntries, setPlaytestEntries] = useState<PlaytestEntry[]>(() => {
    try {
      const saved = localStorage.getItem(PLAYTEST_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'pt-demo-1',
        testerName: 'Aditya Rao (IDSE Peer)',
        role: 'Data Science Undergraduate',
        caseTested: 'Case 006: The Impossible Getaway',
        easeOfUseRating: 5,
        learningRating: 5,
        enjoymentRating: 5,
        feedback: 'The radar speed array task clearly demonstrated how a single extreme supercar outlier dragged the Mean upwards while the Median stayed true to the getaway van. Outstanding detective atmosphere!',
        timestamp: '2026-11-14 14:30'
      },
      {
        id: 'pt-demo-2',
        testerName: 'Priya Sharma (IDSE Peer)',
        role: 'Machine Learning Student',
        caseTested: 'Case 009: The Hidden Groups',
        easeOfUseRating: 5,
        learningRating: 5,
        enjoymentRating: 5,
        feedback: 'Watching the K-Means 2D algorithm shift centroids across the city harbor and reveal the luxury smuggling ringleader at the centroid was much more intuitive than textbook equations!',
        timestamp: '2026-11-14 16:45'
      }
    ];
  });

  // Persist Profile
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Storage error', e);
    }
  }, [profile]);

  // Persist Playtests
  useEffect(() => {
    try {
      localStorage.setItem(PLAYTEST_STORAGE_KEY, JSON.stringify(playtestEntries));
    } catch (e) {
      console.error('Storage error', e);
    }
  }, [playtestEntries]);

  // Sync sound setting
  useEffect(() => {
    sounds.enabled = profile.soundEnabled;
  }, [profile.soundEnabled]);

  const activeCase = activeCaseId ? CASE_LIST.find(c => c.id === activeCaseId) || null : null;

  // Calculate Rank dynamically based on completed cases
  const computeRank = (completedCount: number): DetectiveRank => {
    if (completedCount >= 15) return 'Master Detective';
    if (completedCount >= 12) return 'Chief Detective';
    if (completedCount >= 8) return 'Senior Investigator';
    if (completedCount >= 4) return 'Field Investigator';
    return 'Junior Detective';
  };

  const startCase = (caseId: string) => {
    sounds.playPaperSound();
    setActiveCaseId(caseId);
    setActiveTab('corkboard');
    setConnections([]);
    setIsDsTaskSolved(false);
    setLastAccusationFeedback(null);
    setBriefingOpen(true);
    setCurrentScreen('investigation');

    setProfile(prev => ({
      ...prev,
      activeCaseId: caseId
    }));
  };

  const closeActiveCase = () => {
    sounds.playPaperSound();
    setCurrentScreen('headquarters');
    setActiveCaseId(null);
    setBriefingOpen(false);
    setLearningReportOpen(false);
    setInspectedEvidence(null);
  };

  const updatePlayerName = (name: string) => {
    setProfile(prev => ({ ...prev, name }));
  };

  const toggleSound = () => {
    setProfile(prev => {
      const next = !prev.soundEnabled;
      sounds.enabled = next;
      if (next) sounds.playPinSound();
      return { ...prev, soundEnabled: next };
    });
  };

  const resetAllProgress = () => {
    sounds.playPaperSound();
    localStorage.removeItem(STORAGE_KEY);
    setProfile(INITIAL_PROFILE);
    setActiveCaseId(null);
    setCurrentScreen('main-menu');
  };

  // Red String Connections
  const connectPins = (fromId: string, toId: string): boolean => {
    if (fromId === toId) return false;
    // Check if connection already exists
    const exists = connections.some(
      c => (c.fromId === fromId && c.toId === toId) || (c.fromId === toId && c.toId === fromId)
    );
    if (exists) return false;

    // Check if this connection matches a correct link in active case
    const isCorrect = activeCase?.correctConnections.some(
      cc => (cc.from === fromId && cc.to === toId) || (cc.from === toId && cc.to === fromId)
    );

    sounds.playStringSound();

    const newConnection: StringConnection = {
      fromId,
      toId,
      isCorrect: !!isCorrect
    };

    setConnections(prev => [...prev, newConnection]);
    return true;
  };

  const removeConnection = (fromId: string, toId: string) => {
    sounds.playPaperSound();
    setConnections(prev =>
      prev.filter(
        c => !( (c.fromId === fromId && c.toId === toId) || (c.fromId === toId && c.toId === fromId) )
      )
    );
  };

  const clearConnections = () => {
    sounds.playPaperSound();
    setConnections([]);
  };

  const markDsTaskSolved = () => {
    if (isDsTaskSolved) return;
    sounds.playSuccessFanfare();
    setIsDsTaskSolved(true);
  };

  // Accusation logic
  const submitAccusation = (suspectId: string): { success: boolean; message: string } => {
    if (!activeCase) return { success: false, message: 'No active case found.' };

    const suspect = activeCase.suspects.find(s => s.id === suspectId);
    if (!suspect) return { success: false, message: 'Suspect not found.' };

    // Update attempts record
    const existingAccuracy = profile.caseAccuracies[activeCase.id] || { attempts: 0, solved: false, date: '' };
    const newAttempts = existingAccuracy.attempts + 1;

    if (suspect.isCulprit) {
      sounds.playStampSound();
      sounds.playSuccessFanfare();

      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}

      // Calculate rewards
      const alreadyCompleted = profile.completedCases.includes(activeCase.id);
      const earnedCoins = alreadyCompleted ? 0 : activeCase.rewardCoins;
      const earnedXp = alreadyCompleted ? 0 : activeCase.rewardXp;

      const newCompleted = alreadyCompleted ? profile.completedCases : [...profile.completedCases, activeCase.id];
      const newBadges = profile.badges.includes(activeCase.learningReport.badgeTitle)
        ? profile.badges
        : [...profile.badges, activeCase.learningReport.badgeTitle];

      const newRank = computeRank(newCompleted.length);

      setProfile(prev => ({
        ...prev,
        coins: prev.coins + earnedCoins,
        xp: prev.xp + earnedXp,
        completedCases: newCompleted,
        badges: newBadges,
        rank: newRank,
        caseAccuracies: {
          ...prev.caseAccuracies,
          [activeCase.id]: {
            attempts: newAttempts,
            solved: true,
            date: new Date().toISOString().split('T')[0]
          }
        }
      }));

      const feedback = {
        success: true,
        message: `CASE CLOSED! ${suspect.name} is the perpetrator! ${suspect.contradiction}`,
        suspect
      };
      setLastAccusationFeedback(feedback);
      setLearningReportOpen(true);
      return feedback;
    } else {
      sounds.playErrorSound();
      const feedback = {
        success: false,
        message: `CONTRADICTION FOUND! ${suspect.name} could not have committed this crime. ${suspect.contradiction}`,
        suspect
      };
      setLastAccusationFeedback(feedback);
      setProfile(prev => ({
        ...prev,
        caseAccuracies: {
          ...prev.caseAccuracies,
          [activeCase.id]: {
            ...existingAccuracy,
            attempts: newAttempts
          }
        }
      }));
      return feedback;
    }
  };

  // Hint Purchasing
  const purchaseHint = (hintId: string, cost: number): boolean => {
    if (!activeCase) return false;
    if (profile.coins < cost) {
      sounds.playErrorSound();
      return false;
    }

    const currentCaseHints = profile.unlockedHints[activeCase.id] || [];
    if (currentCaseHints.includes(hintId)) return true; // already bought

    sounds.playCoinSound();
    setProfile(prev => ({
      ...prev,
      coins: prev.coins - cost,
      unlockedHints: {
        ...prev.unlockedHints,
        [activeCase.id]: [...currentCaseHints, hintId]
      }
    }));
    return true;
  };

  const hasHint = (hintId: string): boolean => {
    if (!activeCase) return false;
    const currentCaseHints = profile.unlockedHints[activeCase.id] || [];
    return currentCaseHints.includes(hintId);
  };

  const addPlaytestEntry = (entry: Omit<PlaytestEntry, 'id' | 'timestamp'>) => {
    sounds.playPaperSound();
    const newEntry: PlaytestEntry = {
      ...entry,
      id: `pt-${Date.now()}`,
      timestamp: new Date().toLocaleString()
    };
    setPlaytestEntries(prev => [newEntry, ...prev]);
  };

  return (
    <GameContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        activeTab,
        setActiveTab,
        activeCase,
        activeCaseId,
        startCase,
        closeActiveCase,
        profile,
        updatePlayerName,
        toggleSound,
        resetAllProgress,
        briefingOpen,
        setBriefingOpen,
        learningReportOpen,
        setLearningReportOpen,
        hintShopOpen,
        setHintShopOpen,
        inspectedEvidence,
        setInspectedEvidence,
        connections,
        connectPins,
        removeConnection,
        clearConnections,
        isDsTaskSolved,
        markDsTaskSolved,
        lastAccusationFeedback,
        submitAccusation,
        purchaseHint,
        hasHint,
        playtestEntries,
        addPlaytestEntry
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};
