import React from 'react';
import { useGame } from '../context/GameContext';
import { 
  X, 
  MapPin, 
  Clock, 
  AlertCircle, 
  FileSearch, 
  Users, 
  Crosshair, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const CaseBriefingModal: React.FC = () => {
  const { briefingOpen, setBriefingOpen, activeCase, setActiveTab } = useGame();

  if (!briefingOpen || !activeCase) return null;

  const handleStartInvestigation = () => {
    sounds.playStampSound();
    setBriefingOpen(false);
    setActiveTab('corkboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl aged-paper rounded-xl border-4 border-[#5a381e] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Confidential Header */}
        <div className="p-4 bg-[#23150c] text-amber-100 flex items-center justify-between border-b-2 border-amber-900/60">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-red-400 font-bold block">
                POLICE DEPARTMENT • SPECIAL DATA DIVISION
              </span>
              <h3 className="text-lg font-black font-display tracking-wide text-amber-200">
                CASE #{String(activeCase.caseNumber).padStart(3, '0')}: {activeCase.title.toUpperCase()}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setBriefingOpen(false)}
            className="p-1 rounded text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-900 font-sans">
          {/* Incident Meta strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg bg-stone-200/80 border border-stone-300 text-xs font-mono">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-700" />
              <span><strong>Location:</strong> {activeCase.briefing.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-700" />
              <span><strong>Incident Time:</strong> {activeCase.briefing.incidentTime}</span>
            </div>
          </div>

          {/* Crime Description */}
          <div>
            <h4 className="text-xs uppercase font-bold text-stone-600 font-mono tracking-wider flex items-center gap-1.5 mb-1.5">
              <FileSearch className="w-4 h-4 text-stone-700" />
              <span>Incident Briefing & Narrative</span>
            </h4>
            <p className="text-sm leading-relaxed text-stone-900 font-serif bg-amber-50/70 p-4 rounded border border-amber-200/80">
              {activeCase.briefing.crimeDescription}
            </p>
          </div>

          {/* Initial Clues */}
          <div>
            <h4 className="text-xs uppercase font-bold text-stone-600 font-mono tracking-wider flex items-center gap-1.5 mb-2">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Initial Crime Scene Observations</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeCase.briefing.initialClues.map((clue, idx) => (
                <div key={idx} className="p-2.5 rounded bg-white/70 border border-stone-300 text-xs flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-800 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-stone-800">{clue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suspect Lineup Sneak Peek */}
          <div>
            <h4 className="text-xs uppercase font-bold text-stone-600 font-mono tracking-wider flex items-center gap-1.5 mb-2">
              <Users className="w-4 h-4 text-stone-700" />
              <span>Persons of Interest ({activeCase.suspects.length} Suspects)</span>
            </h4>
            <div className="flex flex-wrap gap-3">
              {activeCase.suspects.map(suspect => (
                <div 
                  key={suspect.id}
                  className="flex items-center gap-2.5 p-2 rounded-lg bg-stone-100 border border-stone-300 text-xs min-w-[170px] flex-1"
                >
                  <div 
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold font-mono text-xs shadow"
                    style={{ backgroundColor: suspect.avatarColor }}
                  >
                    {suspect.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block truncate">{suspect.name}</span>
                    <span className="text-[10px] text-stone-600 font-mono">{suspect.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Objective */}
          <div className="p-4 rounded-lg bg-red-950/10 border-2 border-red-800/40">
            <div className="flex items-center gap-2 text-red-900 font-bold text-xs uppercase font-mono tracking-wider mb-1">
              <Crosshair className="w-4 h-4 text-red-700" />
              <span>Mission Objective</span>
            </div>
            <p className="text-xs text-stone-900 font-medium">
              {activeCase.briefing.missionObjective}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-200/90 border-t border-stone-300 flex items-center justify-between">
          <div className="text-xs font-mono text-stone-600">
            Reward: <span className="font-bold text-amber-800">+{activeCase.rewardCoins} coins</span> | <span className="font-bold text-sky-800">+{activeCase.rewardXp} XP</span>
          </div>

          <button
            onClick={handleStartInvestigation}
            className="py-2.5 px-6 rounded-lg bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider font-display flex items-center gap-2 shadow-lg shadow-red-950/40 transition-all transform hover:scale-105"
          >
            <span>Start Investigation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
