import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Suspect } from '../types/game';
import { 
  Gavel, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowLeft, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const AccusationModal: React.FC = () => {
  const { 
    activeCase, 
    submitAccusation, 
    lastAccusationFeedback, 
    setActiveTab, 
    setHintShopOpen, 
    isDsTaskSolved 
  } = useGame();

  const [selectedSuspectId, setSelectedSuspectId] = useState<string | null>(null);

  if (!activeCase) return null;

  const handleAccuse = () => {
    if (!selectedSuspectId) return;
    submitAccusation(selectedSuspectId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800 text-xs font-mono text-red-300 font-bold mb-2">
          <Gavel className="w-3.5 h-3.5 text-red-500" />
          <span>FORMAL INDICTMENT CHAMBER</span>
        </div>
        <h2 className="text-3xl font-black text-amber-100 font-display">
          Identify the Perpetrator
        </h2>
        <p className="mt-1 text-xs text-amber-300/80 font-typewriter max-w-lg mx-auto">
          Review all evidence, red string connections, and Data Science calculations. Issue an official arrest warrant.
        </p>
      </div>

      {/* Warning if DS task not verified */}
      {!isDsTaskSolved && (
        <div className="mb-6 p-4 rounded-xl bg-amber-950/50 border border-amber-600/70 flex items-center justify-between text-xs font-mono text-amber-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Notice: You have not verified the Data Science Task in the Data Lab yet. We recommend verifying the data analysis first!</span>
          </div>
          <button
            onClick={() => setActiveTab('datalab')}
            className="py-1 px-3 rounded bg-amber-700 hover:bg-amber-600 text-white font-bold shrink-0 ml-2"
          >
            Go to Data Lab
          </button>
        </div>
      )}

      {/* Feedback Banner if submitted */}
      {lastAccusationFeedback && (
        <div className={`mb-6 p-5 rounded-xl border-2 font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          lastAccusationFeedback.success 
            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-xl shadow-emerald-950/40' 
            : 'bg-red-950/80 border-red-500 text-red-200 shadow-xl shadow-red-950/40'
        }`}>
          <div className="flex items-start gap-3">
            {lastAccusationFeedback.success ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-bold text-sm block mb-1 uppercase tracking-wide">
                {lastAccusationFeedback.success ? 'ARREST WARRANT CONFIRMED • CASE CLOSED!' : 'EVIDENCE CONTRADICTION DETECTED!'}
              </span>
              <p className="font-sans leading-relaxed text-stone-200">
                {lastAccusationFeedback.message}
              </p>
            </div>
          </div>

          {!lastAccusationFeedback.success && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setHintShopOpen(true)}
                className="py-1.5 px-3 rounded bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs font-mono"
              >
                Buy Hint
              </button>
              <button
                onClick={() => setActiveTab('corkboard')}
                className="py-1.5 px-3 rounded bg-stone-800 hover:bg-stone-700 text-amber-200 font-bold text-xs font-mono"
              >
                Inspect Corkboard
              </button>
            </div>
          )}
        </div>
      )}

      {/* Suspect Selection Lineup */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {activeCase.suspects.map(suspect => {
          const isSelected = selectedSuspectId === suspect.id;

          return (
            <div
              key={suspect.id}
              onClick={() => {
                sounds.playPinSound();
                setSelectedSuspectId(suspect.id);
              }}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#2f1f14] border-red-600 shadow-xl shadow-red-950/50 ring-2 ring-red-500/50 scale-[1.02]'
                  : 'bg-[#1a120c] border-[#382213] hover:border-amber-600/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold font-mono text-base shadow"
                  style={{ backgroundColor: suspect.avatarColor }}
                >
                  {suspect.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-amber-100 font-typewriter">
                      {suspect.name}
                    </h4>
                    <span className="text-[11px] font-mono text-stone-400">
                      Age: {suspect.age}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-stone-400">{suspect.role}</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-stone-800 text-xs font-serif text-stone-300 italic line-clamp-2">
                Alibi: "{suspect.alibi}"
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Warrant Button */}
      <div className="flex justify-center">
        <button
          onClick={handleAccuse}
          disabled={!selectedSuspectId}
          className={`py-3.5 px-8 rounded-xl font-display font-bold text-sm uppercase tracking-wider flex items-center gap-2 shadow-2xl transition-all ${
            selectedSuspectId
              ? 'bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white cursor-pointer transform hover:scale-105 shadow-red-950/80'
              : 'bg-stone-900 border border-stone-800 text-stone-600 cursor-not-allowed'
          }`}
        >
          <Gavel className="w-4 h-4" />
          <span>Issue Official Arrest Warrant</span>
        </button>
      </div>
    </div>
  );
};
