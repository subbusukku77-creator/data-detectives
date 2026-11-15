import React from 'react';
import { useGame } from '../context/GameContext';
import { 
  X, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  Coins, 
  TrendingUp, 
  Lightbulb, 
  Globe, 
  FileCode,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const LearningReportModal: React.FC = () => {
  const { learningReportOpen, setLearningReportOpen, activeCase, closeActiveCase, profile } = useGame();

  if (!learningReportOpen || !activeCase) return null;

  const report = activeCase.learningReport;

  const handleReturnToHQ = () => {
    sounds.playPaperSound();
    setLearningReportOpen(false);
    closeActiveCase();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl aged-paper rounded-2xl border-4 border-[#3e2716] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header Stamp */}
        <div className="p-5 bg-gradient-to-r from-[#24170e] via-[#1c120a] to-[#24170e] text-amber-100 flex items-center justify-between border-b-2 border-emerald-700/60">
          <div className="flex items-center gap-3">
            <div className="stamp-solved px-3 py-1 text-sm font-black bg-emerald-950/60 rounded">
              CASE CLOSED!
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold block">
                OFFICIAL CASE RESOLUTION REPORT
              </span>
              <h3 className="text-lg font-black font-display text-amber-200">
                CASE #{String(activeCase.caseNumber).padStart(3, '0')}: {activeCase.title.toUpperCase()}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setLearningReportOpen(false)}
            className="p-1.5 rounded text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Report Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-stone-900 font-sans">
          
          {/* Rewards Celebration Strip */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-100 via-amber-50 to-emerald-100 border-2 border-amber-400/60 shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-lg">
                <Award className="w-7 h-7 text-amber-100" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-amber-900 block">
                  New Collectible Badge Unlocked!
                </span>
                <h4 className="text-base font-black text-stone-900 font-display">
                  {report.badgeTitle}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs font-bold">
              <span className="px-3 py-1.5 rounded-lg bg-amber-900 text-amber-200 flex items-center gap-1.5 shadow">
                <Coins className="w-4 h-4 text-amber-400" /> +{activeCase.rewardCoins} Coins
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-sky-900 text-sky-200 shadow">
                +{activeCase.rewardXp} XP
              </span>
            </div>
          </div>

          {/* Section 1: What happened in the case? */}
          <div className="p-4 rounded-xl bg-stone-100/90 border border-stone-300">
            <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-stone-600 flex items-center gap-1.5 mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>1. What Happened in the Case?</span>
            </h4>
            <p className="text-xs text-stone-800 font-serif leading-relaxed">
              {report.whatHappened}
            </p>
          </div>

          {/* Section 2: What did the player discover? */}
          <div className="p-4 rounded-xl bg-stone-100/90 border border-stone-300">
            <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-stone-600 flex items-center gap-1.5 mb-1.5">
              <Lightbulb className="w-4 h-4 text-amber-700" />
              <span>2. What Did You Discover?</span>
            </h4>
            <p className="text-xs text-stone-800 font-serif leading-relaxed">
              {report.whatDiscovered}
            </p>
          </div>

          {/* Section 3 & 4: Which concept was used & what does it mean? */}
          <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-300">
            <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-amber-900 flex items-center gap-1.5 mb-1">
              <BookOpen className="w-4 h-4 text-amber-800" />
              <span>3 & 4. Data Science Concept: {report.conceptName}</span>
            </h4>
            <p className="text-xs text-stone-800 leading-relaxed font-sans mb-3">
              {report.conceptDefinition}
            </p>
            {report.formulaOrRule && (
              <div className="p-2.5 rounded bg-stone-900 text-amber-300 font-mono text-[11px] border border-stone-700">
                <span className="text-stone-400 block text-[10px] uppercase">Mathematical Formulation / Logic Rule:</span>
                <code>{report.formulaOrRule}</code>
              </div>
            )}
          </div>

          {/* Section 5: Where is it used in real life? */}
          <div className="p-4 rounded-xl bg-sky-50/90 border border-sky-300">
            <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-sky-900 flex items-center gap-1.5 mb-1.5">
              <Globe className="w-4 h-4 text-sky-700" />
              <span>5. Where Is This Used in Real Life?</span>
            </h4>
            <p className="text-xs text-stone-800 font-sans leading-relaxed">
              {report.realWorldApplication}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-200/90 border-t border-stone-300 flex items-center justify-between">
          <span className="text-xs font-mono text-stone-600">
            Current Rank: <strong className="text-stone-900">{profile.rank}</strong>
          </span>

          <button
            onClick={handleReturnToHQ}
            className="py-2.5 px-6 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-200 font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
          >
            <span>Return to Headquarters</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
