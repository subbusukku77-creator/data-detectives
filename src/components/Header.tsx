import React from 'react';
import { useGame, ScreenType } from '../context/GameContext';
import { 
  Shield, 
  Coins, 
  Award, 
  Volume2, 
  VolumeX, 
  FolderLock, 
  BookOpen, 
  User, 
  FileText,
  Compass,
  ArrowLeft
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentScreen, 
    setCurrentScreen, 
    profile, 
    toggleSound, 
    activeCase,
    closeActiveCase
  } = useGame();

  const navItems: { label: string; screen: ScreenType; icon: React.ReactNode }[] = [
    { label: 'Headquarters', screen: 'headquarters', icon: <Compass className="w-4 h-4" /> },
    { label: 'Case Files', screen: 'case-select', icon: <FolderLock className="w-4 h-4" /> },
    { label: 'Profile', screen: 'profile', icon: <User className="w-4 h-4" /> },
    { label: 'How to Play', screen: 'how-to-play', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Academic Docs', screen: 'documentation', icon: <FileText className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#16110d]/95 border-b border-[#3e2716] shadow-xl backdrop-blur-md px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Active Case indicator */}
        <div className="flex items-center gap-3">
          {currentScreen === 'investigation' ? (
            <button
              onClick={closeActiveCase}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2a1c12] hover:bg-[#3d2719] border border-[#52341d] text-amber-200 text-xs font-semibold tracking-wide transition-colors"
              title="Return to Headquarters"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>Leave Case</span>
            </button>
          ) : (
            <button 
              onClick={() => setCurrentScreen('main-menu')}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-600 to-amber-900 border border-amber-500/50 flex items-center justify-center shadow-lg shadow-amber-950/40 group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5 text-amber-100" />
              </div>
              <div>
                <h1 className="text-base font-black tracking-wider text-amber-100 uppercase font-display leading-none group-hover:text-amber-300 transition-colors">
                  The Data Detectives
                </h1>
                <p className="text-[10px] text-amber-400/80 font-mono tracking-tight">
                  Bureau of Data Investigations
                </p>
              </div>
            </button>
          )}

          {activeCase && currentScreen === 'investigation' && (
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-[#3e2716]">
              <span className="px-2 py-0.5 rounded bg-red-950/80 border border-red-800 text-red-300 font-mono text-[11px] font-bold">
                CASE #{String(activeCase.caseNumber).padStart(3, '0')}
              </span>
              <span className="text-xs font-bold text-amber-100 font-typewriter truncate max-w-[200px]">
                {activeCase.title}
              </span>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        {currentScreen !== 'main-menu' && (
          <nav className="flex items-center gap-1 overflow-x-auto py-1">
            {navItems.map(item => (
              <button
                key={item.screen}
                onClick={() => setCurrentScreen(item.screen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  currentScreen === item.screen
                    ? 'bg-amber-600/30 text-amber-200 border border-amber-500/50 shadow-inner'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/40'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        )}

        {/* Player Status (Rank, Coins, XP, Audio) */}
        <div className="flex items-center gap-3">
          {/* Rank Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#24170e] border border-[#482c19] text-xs">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-stone-400 text-[11px]">Rank:</span>
            <span className="font-bold text-amber-300 text-[11px] font-mono">{profile.rank}</span>
          </div>

          {/* Coins Balance */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-950/40 border border-amber-600/40 text-xs shadow-sm">
            <Coins className="w-4 h-4 text-amber-400 fill-amber-400/20 animate-pulse" />
            <span className="font-mono font-bold text-amber-300 text-xs">{profile.coins}</span>
            <span className="text-[10px] text-amber-500 font-semibold uppercase">c</span>
          </div>

          {/* XP */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded bg-sky-950/40 border border-sky-700/40 text-xs">
            <span className="text-[10px] text-sky-400 font-bold">XP</span>
            <span className="font-mono font-bold text-sky-300 text-xs">{profile.xp}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-1.5 rounded border transition-colors ${
              profile.soundEnabled
                ? 'bg-[#2a1c12] border-[#52341d] text-amber-300 hover:bg-[#3d2719]'
                : 'bg-stone-900 border-stone-800 text-stone-500 hover:text-stone-400'
            }`}
            title={profile.soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
          >
            {profile.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
