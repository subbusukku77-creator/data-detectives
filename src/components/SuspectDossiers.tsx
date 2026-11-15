import React from 'react';
import { useGame } from '../context/GameContext';
import { Suspect } from '../types/game';
import { 
  Users, 
  ShieldAlert, 
  HelpCircle, 
  Fingerprint, 
  CheckCircle, 
  ArrowRight,
  Gavel
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const SuspectDossiers: React.FC = () => {
  const { activeCase, setActiveTab } = useGame();

  if (!activeCase) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top Banner */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#2a1c12] border border-[#482c19] text-xs font-mono text-amber-300 font-bold mb-1">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>SUSPECT LINEUP ({activeCase.suspects.length} PERSONS OF INTEREST)</span>
          </div>
          <h3 className="text-2xl font-black text-amber-100 font-display">
            Criminal Dossiers & Statements
          </h3>
        </div>

        <button
          onClick={() => {
            sounds.playPaperSound();
            setActiveTab('accusation');
          }}
          className="py-2.5 px-4 rounded-lg bg-red-700 hover:bg-red-600 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-red-950/40"
        >
          <Gavel className="w-4 h-4" />
          <span>Accusation Chamber</span>
        </button>
      </div>

      {/* Suspects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeCase.suspects.map(suspect => (
          <div
            key={suspect.id}
            className="aged-paper rounded-xl border-2 border-[#b59868] shadow-xl overflow-hidden flex flex-col justify-between text-stone-900"
          >
            {/* Header / Mugshot Area */}
            <div className="p-4 bg-stone-200/80 border-b border-stone-300 flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-xl border-2 border-stone-700 flex items-center justify-center text-white text-xl font-bold font-mono shadow-md"
                style={{ backgroundColor: suspect.avatarColor }}
              >
                {suspect.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-black font-typewriter tracking-wide text-stone-900">
                    {suspect.name}
                  </h4>
                  <span className="font-mono text-xs text-stone-600 font-bold">
                    Age: {suspect.age}
                  </span>
                </div>
                <p className="text-xs font-mono text-stone-600 font-semibold uppercase">
                  {suspect.role}
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {suspect.traits.map((trait, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2 py-0.5 rounded bg-stone-300/80 text-[10px] font-mono text-stone-800 font-bold"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Dossier Body */}
            <div className="p-5 space-y-3 font-serif flex-1">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-stone-600 block">
                  Official Alibi Statement:
                </span>
                <p className="text-xs italic text-stone-800 bg-white/70 p-2.5 rounded border border-stone-300">
                  "{suspect.alibi}"
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-stone-600 block">
                  Potential Motive:
                </span>
                <p className="text-xs text-stone-800">
                  {suspect.motive}
                </p>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="p-3 bg-stone-100/90 border-t border-stone-300 flex items-center justify-between text-[11px] font-mono text-stone-600">
              <span className="flex items-center gap-1">
                <Fingerprint className="w-3.5 h-3.5 text-stone-500" />
                <span>Forensic Record Logged</span>
              </span>
              <button
                onClick={() => {
                  sounds.playPaperSound();
                  setActiveTab('accusation');
                }}
                className="text-red-800 hover:text-red-950 font-bold flex items-center gap-1"
              >
                <span>Accuse Suspect</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
