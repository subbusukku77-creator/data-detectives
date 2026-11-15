import React from 'react';
import { useGame } from '../context/GameContext';
import { CASE_LIST } from '../data/cases';
import { 
  FolderLock, 
  FolderCheck, 
  Play, 
  Lock, 
  Award, 
  Coins, 
  TrendingUp, 
  BookOpen, 
  Compass, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const Headquarters: React.FC = () => {
  const { profile, startCase, setCurrentScreen } = useGame();

  const completedCount = profile.completedCases.length;

  const chapters = [
    {
      id: 1,
      name: 'Chapter 1: Junior Detective',
      subtitle: 'Data Collection, Cleaning & Basic Analytics',
      cases: CASE_LIST.filter(c => c.chapter === 1),
      requiredToUnlock: 0,
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/30'
    },
    {
      id: 2,
      name: 'Chapter 2: Senior Detective',
      subtitle: 'Statistics, Outliers, Correlation & Clustering',
      cases: CASE_LIST.filter(c => c.chapter === 2),
      requiredToUnlock: 4, // Unlocks after Case 4 is completed
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/30'
    },
    {
      id: 3,
      name: 'Chapter 3: Master Detective',
      subtitle: 'Machine Learning, Bias-Variance & The Mastermind',
      cases: CASE_LIST.filter(c => c.chapter === 3),
      requiredToUnlock: 9, // Unlocks after Case 9 is completed
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/30'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Desk Lamp Ambient Glow Header */}
      <div className="relative mb-8 p-6 rounded-2xl bg-gradient-to-r from-[#2a1b12] via-[#21140c] to-[#180e08] border border-[#482c19] shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded bg-amber-900/60 border border-amber-700/60 text-amber-200 text-xs font-mono font-bold uppercase tracking-wider">
                Headquarters Office
              </span>
              <span className="text-xs text-stone-400 font-mono">
                Investigator Desk: {profile.name}
              </span>
            </div>
            <h2 className="text-3xl font-black text-amber-100 font-display tracking-wide">
              Detective Command Center
            </h2>
            <p className="mt-1 text-sm text-amber-300/80 font-typewriter max-w-xl">
              Select an available case file to inspect the crime scene, examine raw evidence, and utilize Data Science to unmask the perpetrator.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 rounded-xl bg-[#170e08]/80 border border-[#3e2716] text-center">
              <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-bold">Investigator Rank</span>
              <span className="text-sm font-black text-amber-300 font-mono">{profile.rank}</span>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-[#170e08]/80 border border-[#3e2716] text-center">
              <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-bold">Coin Balance</span>
              <span className="text-sm font-black text-amber-400 font-mono flex items-center justify-center gap-1">
                <Coins className="w-3.5 h-3.5" /> {profile.coins}c
              </span>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-[#170e08]/80 border border-[#3e2716] text-center">
              <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-bold">Cases Closed</span>
              <span className="text-sm font-black text-emerald-400 font-mono">{completedCount} / 15</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Sections */}
      <div className="space-y-10">
        {chapters.map(chapter => {
          const isChapterUnlocked = completedCount >= chapter.requiredToUnlock;

          return (
            <div key={chapter.id} className="relative">
              {/* Chapter Header */}
              <div className="flex items-center justify-between mb-4 border-b border-[#3e2716] pb-3">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider font-mono ${chapter.badgeColor}`}>
                    {chapter.name}
                  </span>
                  <span className="hidden sm:inline text-xs text-stone-400 font-typewriter">
                    {chapter.subtitle}
                  </span>
                </div>
                {!isChapterUnlocked && (
                  <div className="flex items-center gap-1.5 text-xs text-amber-500/90 font-mono">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Complete {chapter.requiredToUnlock} cases to unlock</span>
                  </div>
                )}
              </div>

              {/* Case Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {chapter.cases.map(c => {
                  const isCompleted = profile.completedCases.includes(c.id);
                  // Case is unlocked if previous case is completed or if it is case 1
                  const isUnlocked = isChapterUnlocked && (c.caseNumber === 1 || profile.completedCases.includes(`case-${String(c.caseNumber - 1).padStart(3, '0')}`));

                  return (
                    <div
                      key={c.id}
                      className={`relative rounded-xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                        isCompleted
                          ? 'bg-[#1b1915]/95 border-emerald-900/60 shadow-lg shadow-emerald-950/20'
                          : isUnlocked
                          ? 'bg-[#221810]/95 border-[#4a2e19] shadow-xl hover:border-amber-500/60 hover:-translate-y-1'
                          : 'bg-[#140e0a]/80 border-stone-900 opacity-60'
                      }`}
                    >
                      {/* Top folder tab banner */}
                      <div className="px-4 py-2.5 bg-[#17100b] border-b border-[#331f11] flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-amber-400">
                          CASE #{String(c.caseNumber).padStart(3, '0')}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                            c.difficulty === 'Easy' 
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                              : c.difficulty === 'Intermediate' 
                              ? 'bg-amber-950 text-amber-300 border border-amber-800' 
                              : 'bg-purple-950 text-purple-300 border border-purple-800'
                          }`}>
                            {c.difficulty}
                          </span>
                          {isCompleted ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                            </span>
                          ) : isUnlocked ? (
                            <span className="text-[11px] font-bold text-amber-400">Available</span>
                          ) : (
                            <span className="flex items-center gap-1 text-[11px] text-stone-500 font-mono">
                              <Lock className="w-3 h-3" /> Locked
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-4 flex-1">
                        <h4 className="text-base font-bold text-amber-100 font-typewriter tracking-wide line-clamp-1">
                          {c.title}
                        </h4>
                        <p className="mt-1 text-xs text-amber-300/70 font-sans italic line-clamp-2">
                          {c.subtitle}
                        </p>

                        {/* DS Concept Pill */}
                        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#2d1e13] border border-[#4d321d] text-[11px] text-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span className="font-semibold truncate max-w-[200px]">{c.dsConcept.name}</span>
                        </div>

                        {/* Rewards */}
                        <div className="mt-3 flex items-center gap-3 text-xs text-stone-400 font-mono">
                          <span className="flex items-center gap-1 text-amber-400 font-bold">
                            <Coins className="w-3.5 h-3.5" /> +{c.rewardCoins}c
                          </span>
                          <span className="text-sky-400 font-bold">+{c.rewardXp} XP</span>
                        </div>
                      </div>

                      {/* Footer Launch Button */}
                      <div className="p-4 pt-0">
                        {isUnlocked ? (
                          <button
                            onClick={() => {
                              sounds.playPaperSound();
                              startCase(c.id);
                            }}
                            className={`w-full py-2 px-3 rounded-lg text-xs font-bold font-display uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                              isCompleted
                                ? 'bg-[#292218] hover:bg-[#382f22] text-amber-200 border border-[#52412d]'
                                : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-md shadow-amber-950/40'
                            }`}
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>{isCompleted ? 'Re-investigate Case' : 'Open Investigation'}</span>
                          </button>
                        ) : (
                          <div className="w-full py-2 px-3 rounded-lg bg-stone-900/60 text-stone-500 text-xs font-mono text-center flex items-center justify-center gap-1.5 cursor-not-allowed">
                            <Lock className="w-3 h-3" />
                            <span>Complete Case #{c.caseNumber - 1} First</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
