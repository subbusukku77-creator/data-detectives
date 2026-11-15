import React from 'react';
import { useGame } from '../context/GameContext';
import { 
  X, 
  Coins, 
  HelpCircle, 
  Sparkles, 
  Check, 
  Lock, 
  Key, 
  Lightbulb,
  AlertCircle
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const HintShopModal: React.FC = () => {
  const { hintShopOpen, setHintShopOpen, activeCase, profile, purchaseHint, hasHint } = useGame();

  if (!hintShopOpen || !activeCase) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl aged-paper rounded-2xl border-4 border-[#4a2e19] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Top Header */}
        <div className="p-4 bg-[#23150c] text-amber-100 flex items-center justify-between border-b border-[#4d321d]">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-400" />
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold block">
                INVESTIGATOR HINT VAULT
              </span>
              <h3 className="text-sm font-bold font-typewriter text-amber-200">
                Case #{activeCase.caseNumber}: Informant Network
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Coin Balance */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-amber-950/80 border border-amber-600/60 font-mono text-xs text-amber-300 font-bold shadow">
              <Coins className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
              <span>{profile.coins}c Available</span>
            </div>

            <button
              onClick={() => setHintShopOpen(false)}
              className="p-1 rounded text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hints List */}
        <div className="p-6 overflow-y-auto space-y-4 text-stone-900 font-sans">
          <div className="text-xs text-stone-600 font-serif italic mb-2">
            "Every clue comes at a price. Spend hard-earned coins to consult undercover informants without spoiling the mystery."
          </div>

          {activeCase.hints.map(hint => {
            const isUnlocked = hasHint(hint.id);
            const canAfford = profile.coins >= hint.cost;

            return (
              <div
                key={hint.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isUnlocked
                    ? 'bg-amber-50/90 border-amber-500 shadow-md'
                    : 'bg-white/80 border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-stone-800 text-amber-300 text-xs font-mono font-bold flex items-center justify-center">
                      {hint.id === 'small' ? '1' : hint.id === 'highlight' ? '2' : hint.id === 'step' ? '3' : '4'}
                    </span>
                    <h4 className="text-sm font-bold font-typewriter text-stone-900">
                      {hint.title}
                    </h4>
                  </div>

                  {isUnlocked ? (
                    <span className="px-2.5 py-1 rounded bg-emerald-100 border border-emerald-400 text-emerald-800 text-[10px] font-mono font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Unlocked
                    </span>
                  ) : (
                    <button
                      onClick={() => purchaseHint(hint.id, hint.cost)}
                      disabled={!canAfford}
                      className={`px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
                        canAfford
                          ? 'bg-amber-700 hover:bg-amber-800 text-white shadow'
                          : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                      }`}
                    >
                      <Coins className="w-3.5 h-3.5" />
                      <span>{hint.cost} Coins</span>
                    </button>
                  )}
                </div>

                <p className="text-xs text-stone-600 font-serif mb-2">
                  {hint.description}
                </p>

                {/* Hint Text if Unlocked */}
                {isUnlocked ? (
                  <div className="p-3 rounded bg-amber-100/80 border border-amber-300 text-xs font-typewriter text-amber-950 font-bold animate-in fade-in">
                    🔍 Informant Report: "{hint.text}"
                  </div>
                ) : (
                  <div className="p-2.5 rounded bg-stone-100 border border-stone-200 text-[11px] font-mono text-stone-400 flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Purchase to reveal confidential intelligence</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-200 border-t border-stone-300 flex justify-between items-center text-xs font-mono text-stone-600">
          <span>Complete cases without hints to maximize score accuracy!</span>
          <button
            onClick={() => setHintShopOpen(false)}
            className="py-1 px-4 rounded bg-stone-800 text-amber-200 hover:bg-stone-900 font-bold"
          >
            Close Vault
          </button>
        </div>
      </div>
    </div>
  );
};
