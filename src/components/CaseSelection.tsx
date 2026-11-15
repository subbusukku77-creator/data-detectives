import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { CASE_LIST } from '../data/cases';
import { 
  FolderLock, 
  FolderCheck, 
  Lock, 
  Play, 
  Search, 
  CheckCircle2, 
  Coins, 
  BookOpen, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const CaseSelection: React.FC = () => {
  const { profile, startCase } = useGame();
  const [filterChapter, setFilterChapter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCases = CASE_LIST.filter(c => {
    if (filterChapter !== 'all' && c.chapter !== filterChapter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.dsConcept.name.toLowerCase().includes(q) ||
        String(c.caseNumber).includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Title & Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#2a1c12] border border-[#482c19] text-xs font-mono text-amber-300 font-bold mb-1">
            <FolderLock className="w-3.5 h-3.5 text-amber-400" />
            <span>ARCHIVE OF 15 CRIMINAL DOSSIERS</span>
          </div>
          <h2 className="text-3xl font-black text-amber-100 font-display">
            The Evidence Archives
          </h2>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search case, clue or concept..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-[#1a120c] border border-[#3e2716] text-amber-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Chapter Filter Pills */}
          <div className="flex items-center gap-1 bg-[#170e08] p-1 rounded-lg border border-[#382213]">
            <button
              onClick={() => setFilterChapter('all')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                filterChapter === 'all' ? 'bg-amber-700 text-white font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterChapter(1)}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                filterChapter === 1 ? 'bg-blue-700 text-white font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Ch 1
            </button>
            <button
              onClick={() => setFilterChapter(2)}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                filterChapter === 2 ? 'bg-amber-700 text-white font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Ch 2
            </button>
            <button
              onClick={() => setFilterChapter(3)}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                filterChapter === 3 ? 'bg-purple-700 text-white font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Ch 3
            </button>
          </div>
        </div>
      </div>

      {/* Case Folders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map(c => {
          const isCompleted = profile.completedCases.includes(c.id);
          const isUnlocked = c.caseNumber === 1 || profile.completedCases.includes(`case-${String(c.caseNumber - 1).padStart(3, '0')}`);

          return (
            <div
              key={c.id}
              className={`group relative rounded-xl border flex flex-col justify-between transition-all duration-300 transform ${
                isCompleted
                  ? 'manilla-folder border-[#b09b6d] text-stone-900 shadow-xl'
                  : isUnlocked
                  ? 'aged-paper border-[#c9b486] text-stone-900 shadow-2xl hover:-translate-y-1 hover:shadow-amber-950/30'
                  : 'bg-[#18110c] border-[#2d1b0f] text-stone-500 shadow-md opacity-60'
              }`}
            >
              {/* Folder Top Tab */}
              <div className="px-4 py-3 border-b border-stone-300/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-stone-800 text-amber-200">
                    DOSSIER #{String(c.caseNumber).padStart(3, '0')}
                  </span>
                  <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                    CH {c.chapter}
                  </span>
                </div>

                {isCompleted ? (
                  <span className="stamp-solved px-2 py-0.5 text-xs font-black">
                    SOLVED
                  </span>
                ) : isUnlocked ? (
                  <span className="stamp-confidential px-2 py-0.5 text-[11px] font-bold">
                    CLASSIFIED
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-mono text-stone-500">
                    <Lock className="w-3 h-3" /> LOCKED
                  </span>
                )}
              </div>

              {/* Folder Body */}
              <div className="p-5 flex-1">
                <h3 className="text-lg font-bold font-typewriter tracking-tight text-stone-900">
                  {c.title}
                </h3>
                <p className="mt-1 text-xs text-stone-700 italic font-serif">
                  {c.subtitle}
                </p>

                {/* Concept Box */}
                <div className="mt-4 p-2.5 rounded bg-stone-200/70 border border-stone-300 text-stone-900">
                  <div className="text-[10px] uppercase font-bold text-stone-600 tracking-wider">
                    Data Science Concept:
                  </div>
                  <div className="text-xs font-black text-amber-950 font-mono mt-0.5">
                    {c.dsConcept.name}
                  </div>
                  <div className="text-[11px] text-stone-700 mt-1 line-clamp-2">
                    {c.dsConcept.description}
                  </div>
                </div>

                {/* Evidence count & rewards */}
                <div className="mt-4 flex items-center justify-between text-xs text-stone-700 font-mono">
                  <span>{c.evidenceList.length} Crime Scene Clues</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-800 flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5" /> +{c.rewardCoins}c
                    </span>
                    <span className="font-bold text-sky-800">+{c.rewardXp} XP</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 border-t border-stone-300/80 bg-stone-100/50 rounded-b-xl">
                {isUnlocked ? (
                  <button
                    onClick={() => {
                      sounds.playPaperSound();
                      startCase(c.id);
                    }}
                    className="w-full py-2.5 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-200 font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <span>{isCompleted ? 'Reopen Case File' : 'Open Investigation'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="text-center text-xs font-mono text-stone-500 py-1 flex items-center justify-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Complete Case #{c.caseNumber - 1} to Unlock</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
