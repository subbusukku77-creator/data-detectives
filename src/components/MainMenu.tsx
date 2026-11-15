import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { 
  Play, 
  RotateCcw, 
  FolderLock, 
  User, 
  HelpCircle, 
  FileText, 
  Coins, 
  Award, 
  Sparkles,
  Edit2,
  Check,
  Search,
  BookOpen
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const MainMenu: React.FC = () => {
  const { 
    setCurrentScreen, 
    profile, 
    updatePlayerName, 
    startCase, 
    resetAllProgress 
  } = useGame();

  const [isEditingName, setIsEditingName] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState(profile.name);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerNameInput.trim()) {
      updatePlayerName(playerNameInput.trim());
      setIsEditingName(false);
      sounds.playTypewriter();
    }
  };

  const completedCount = profile.completedCases.length;
  const progressPercent = Math.round((completedCount / 15) * 100);

  // Determine next case to continue
  const nextCaseId = `case-${String(Math.min(15, completedCount + 1)).padStart(3, '0')}`;

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col justify-center items-center px-4 py-12 overflow-hidden bg-[#0d0a08]">
      {/* Ambient warm desk lamp overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none ambient-lamp" />
      <div className="absolute -bottom-20 right-0 w-[500px] h-[350px] bg-red-950/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative vintage detective desk assets in background */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center">
        
        {/* Badge & Stamp Header */}
        <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#24170e]/90 border border-amber-600/40 shadow-lg shadow-black/50 backdrop-blur-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
          <span className="font-mono text-xs tracking-widest text-amber-300 uppercase font-semibold">
            Confidential Bureau of Data Science Inquiries
          </span>
        </div>

        {/* Title & Tagline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-600 font-display drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
          THE DATA DETECTIVES
        </h1>

        <p className="mt-3 text-lg sm:text-xl font-typewriter text-amber-300/90 tracking-wide max-w-xl mx-auto italic">
          "Every Case Has a Secret. Every Clue Has Data."
        </p>

        {/* Detective ID Card Badge */}
        <div className="mt-8 w-full max-w-md aged-paper rounded-lg p-5 border-2 border-[#b59868] shadow-2xl relative rotate-[-0.5deg] hover:rotate-0 transition-transform">
          {/* Top pin */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-red-600 border-2 border-red-800 shadow-pin flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-red-200" />
          </div>

          <div className="flex items-center justify-between border-b border-stone-400 pb-3 mb-3">
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-600">Investigator ID Dossier</span>
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-1.5 mt-0.5">
                  <input
                    type="text"
                    value={playerNameInput}
                    onChange={(e) => setPlayerNameInput(e.target.value)}
                    className="px-2 py-0.5 text-xs bg-stone-100 border border-stone-500 rounded font-bold text-stone-900 focus:outline-none"
                    autoFocus
                  />
                  <button type="submit" className="p-1 rounded bg-amber-700 text-white hover:bg-amber-800">
                    <Check className="w-3 h-3" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-stone-900 font-mono">{profile.name}</h3>
                  <button
                    onClick={() => {
                      setIsEditingName(true);
                      sounds.playTypewriter();
                    }}
                    className="text-stone-500 hover:text-stone-800 p-0.5"
                    title="Edit Name"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-600">Rank</span>
              <p className="text-xs font-black text-amber-900 uppercase font-mono">{profile.rank}</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 text-center py-2 bg-stone-200/60 rounded border border-stone-300">
            <div>
              <span className="text-[10px] text-stone-600 block">Funds</span>
              <span className="text-xs font-black text-amber-800 flex items-center justify-center gap-1">
                <Coins className="w-3 h-3 text-amber-600" /> {profile.coins}c
              </span>
            </div>
            <div>
              <span className="text-[10px] text-stone-600 block">Experience</span>
              <span className="text-xs font-black text-sky-800">{profile.xp} XP</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-600 block">Cases Solved</span>
              <span className="text-xs font-black text-emerald-800">{completedCount} / 15</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex justify-between text-[10px] font-mono text-stone-600 mb-1">
              <span>Syllabus Mastery</span>
              <span>{progressPercent}% Complete</span>
            </div>
            <div className="w-full h-2 rounded-full bg-stone-300 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-600 to-emerald-600 transition-all duration-500" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Action Buttons Menu */}
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 w-full max-w-xl">
          {completedCount > 0 ? (
            <button
              onClick={() => {
                sounds.playPaperSound();
                startCase(nextCaseId);
              }}
              className="w-full sm:w-auto flex-1 min-w-[200px] py-3.5 px-6 rounded-lg bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-sm tracking-wider uppercase font-display border border-emerald-500/50 shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 group transition-all transform hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
              <span>Continue Case #{completedCount + 1}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                sounds.playPaperSound();
                startCase('case-001');
              }}
              className="w-full sm:w-auto flex-1 min-w-[200px] py-3.5 px-6 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm tracking-wider uppercase font-display border border-amber-400/50 shadow-lg shadow-amber-950/60 flex items-center justify-center gap-2 group transition-all transform hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
              <span>Start Investigation</span>
            </button>
          )}

          <button
            onClick={() => {
              sounds.playPaperSound();
              setCurrentScreen('case-select');
            }}
            className="w-full sm:w-auto flex-1 min-w-[180px] py-3.5 px-5 rounded-lg bg-[#271b12] hover:bg-[#382619] text-amber-200 font-bold text-sm tracking-wider uppercase font-display border border-[#543822] shadow-md flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <FolderLock className="w-4 h-4 text-amber-400" />
            <span>Case Files (15)</span>
          </button>
        </div>

        {/* Secondary Navigation Row */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5 w-full max-w-xl">
          <button
            onClick={() => {
              sounds.playPaperSound();
              setCurrentScreen('profile');
            }}
            className="px-4 py-2 rounded bg-[#1c130c] hover:bg-[#2b1c11] text-xs font-semibold text-stone-300 hover:text-amber-200 border border-[#402715] flex items-center gap-1.5 transition-colors"
          >
            <User className="w-3.5 h-3.5 text-amber-400" />
            <span>Detective Profile</span>
          </button>

          <button
            onClick={() => {
              sounds.playPaperSound();
              setCurrentScreen('how-to-play');
            }}
            className="px-4 py-2 rounded bg-[#1c130c] hover:bg-[#2b1c11] text-xs font-semibold text-stone-300 hover:text-amber-200 border border-[#402715] flex items-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>How to Play</span>
          </button>

          <button
            onClick={() => {
              sounds.playPaperSound();
              setCurrentScreen('documentation');
            }}
            className="px-4 py-2 rounded bg-[#1c130c] hover:bg-[#2b1c11] text-xs font-semibold text-stone-300 hover:text-amber-200 border border-[#402715] flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>Academic Docs & Playtesting</span>
          </button>

          {completedCount > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Reset all cases and progress back to Junior Detective?')) {
                  resetAllProgress();
                }
              }}
              className="px-3 py-2 rounded bg-stone-900 hover:bg-red-950 text-[11px] font-semibold text-stone-500 hover:text-red-400 border border-stone-800 transition-colors flex items-center gap-1"
              title="Reset All Progress"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Academic Note Footer */}
        <div className="mt-12 text-stone-500 text-xs font-mono max-w-lg mx-auto">
          <p>College-level IDSE Academic Project | Interactive Educational Game</p>
          <p className="mt-1 text-[11px] text-stone-600">Built with React, TypeScript & Data Science Algorithms</p>
        </div>

      </div>
    </div>
  );
};
