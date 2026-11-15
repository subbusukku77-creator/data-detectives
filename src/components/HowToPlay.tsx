import React from 'react';
import { useGame } from '../context/GameContext';
import { 
  Compass, 
  Search, 
  Link2, 
  FlaskConical, 
  Gavel, 
  Coins, 
  Award,
  ArrowRight,
  Play,
  Shield,
  CheckCircle2
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const HowToPlay: React.FC = () => {
  const { setCurrentScreen, startCase } = useGame();

  const handleStartFirstCase = () => {
    sounds.playPaperSound();
    try {
      localStorage.setItem('data_detectives_seen_guide', 'true');
    } catch {}
    startCase('case-001');
  };

  const handleEnterHQ = () => {
    sounds.playPaperSound();
    try {
      localStorage.setItem('data_detectives_seen_guide', 'true');
    } catch {}
    setCurrentScreen('headquarters');
  };

  const handleGoToMenu = () => {
    sounds.playPaperSound();
    try {
      localStorage.setItem('data_detectives_seen_guide', 'true');
    } catch {}
    setCurrentScreen('main-menu');
  };

  const steps = [
    {
      num: '01',
      title: 'Receive Briefing & Open Case',
      desc: 'Select an available case from the Headquarters desk or Case Files. Read the confidential incident narrative, crime location, timestamps, and suspect profiles.',
      icon: <Compass className="w-6 h-6 text-amber-500" />
    },
    {
      num: '02',
      title: 'Inspect Crime Scene Clues',
      desc: 'On the interactive Corkboard, click any pinned photo, CCTV tape, visitor log, or floorplan. Use the magnifying glass inspector to examine fine forensic details and alibi contradictions.',
      icon: <Search className="w-6 h-6 text-sky-500" />
    },
    {
      num: '03',
      title: 'String Clues Together with Red Yarn',
      desc: 'Click the pushpin (🔴) on one piece of evidence, then click another to stretch a red string! Connecting related items links timelines and reveals breakthroughs.',
      icon: <Link2 className="w-6 h-6 text-red-500" />
    },
    {
      num: '04',
      title: 'Build Tables & Query in Data Science Lab',
      desc: 'In the Data Science Lab, click "Create Dataset Table" to turn raw unstructured notes into rows and columns. Apply query conditions (time windows, container sizes, outlier fences, clustering) and color-code rows to isolate suspects!',
      icon: <FlaskConical className="w-6 h-6 text-emerald-500" />
    },
    {
      num: '05',
      title: 'Issue Official Arrest Warrant',
      desc: 'In the Accusation Chamber, cross-examine the suspect lineup. Select the suspect whose alibi is refuted by your data analysis. If wrong, the bureau explains the contradiction; if right, the case is closed!',
      icon: <Gavel className="w-6 h-6 text-purple-500" />
    },
    {
      num: '06',
      title: 'Earn Badges, Coins & Rank Promotions',
      desc: 'Every closed case awards coins, XP, and collectible badges while unlocking the next investigation. Promote your rank from Junior Detective to Master Detective!',
      icon: <Award className="w-6 h-6 text-amber-400" />
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Welcome Banner for First-Time Players */}
      <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-amber-950 via-[#27190f] to-[#1c120a] border-2 border-amber-600/70 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-600/30 border border-amber-500 flex items-center justify-center text-amber-300 shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-amber-400 block">
              ACADEMY RECRUIT INDUCTION
            </span>
            <h3 className="text-xl font-black text-amber-100 font-display">
              Welcome to The Data Detectives Field Manual
            </h3>
            <p className="text-xs text-stone-300 font-serif">
              Read these 6 investigative rules, or jump straight into Case #001 to begin!
            </p>
          </div>
        </div>

        {/* Quick Start Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={handleStartFirstCase}
            className="flex-1 md:flex-none py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-950/60"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Start Case 001</span>
          </button>

          <button
            onClick={handleEnterHQ}
            className="flex-1 md:flex-none py-2.5 px-4 rounded-xl bg-[#2b1c11] hover:bg-[#3d2719] border border-[#52341d] text-amber-200 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
          >
            <span>Headquarters Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 6 Step Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {steps.map(step => (
          <div
            key={step.num}
            className="aged-paper rounded-xl p-6 border-2 border-[#b59868] shadow-xl relative flex flex-col justify-between text-stone-900"
          >
            <div className="flex items-center justify-between border-b border-stone-300 pb-3 mb-3">
              <span className="font-mono text-2xl font-black text-stone-400">{step.num}</span>
              <div className="p-2 rounded-lg bg-stone-200/80 shadow-inner">
                {step.icon}
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-base font-bold font-typewriter text-stone-900 mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed font-sans">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Economy & Hints Quick Guide */}
      <div className="p-6 rounded-2xl bg-[#1b120c] border border-[#3e2716] shadow-xl mb-8">
        <h3 className="text-lg font-black text-amber-200 font-display mb-3 flex items-center gap-2">
          <Coins className="w-5 h-5 text-amber-400" />
          <span>The Coin Economy & Informant Network</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-3 rounded-lg bg-[#140e08] border border-stone-800">
            <span className="text-stone-400 block font-bold">Starting Funds</span>
            <span className="text-amber-300 font-bold text-sm">100 Coins</span>
            <p className="text-[11px] text-stone-500 mt-1">Given to all junior recruits.</p>
          </div>
          <div className="p-3 rounded-lg bg-[#140e08] border border-stone-800">
            <span className="text-stone-400 block font-bold">Case Rewards</span>
            <span className="text-emerald-400 font-bold text-sm">150 - 500 Coins</span>
            <p className="text-[11px] text-stone-500 mt-1">Awarded upon closing cases.</p>
          </div>
          <div className="p-3 rounded-lg bg-[#140e08] border border-stone-800">
            <span className="text-stone-400 block font-bold">Informant Tiers</span>
            <span className="text-amber-300 font-bold text-sm">10c / 25c / 40c / 60c</span>
            <p className="text-[11px] text-stone-500 mt-1">Buy clues without spoilers.</p>
          </div>
          <div className="p-3 rounded-lg bg-[#140e08] border border-stone-800">
            <span className="text-stone-400 block font-bold">Data Science Mastery</span>
            <span className="text-sky-400 font-bold text-sm">15 Badges</span>
            <p className="text-[11px] text-stone-500 mt-1">Collect all curriculum badges.</p>
          </div>
        </div>
      </div>

      {/* Bottom Launch CTA */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleStartFirstCase}
          className="py-3 px-8 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-display font-bold text-sm uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-amber-950/60"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Start Case 001 Now</span>
        </button>

        <button
          onClick={handleEnterHQ}
          className="py-3 px-6 rounded-xl bg-[#24170e] hover:bg-[#382417] text-amber-200 border border-[#52341d] font-display font-bold text-sm uppercase tracking-wider flex items-center gap-2"
        >
          <span>Report to Headquarters</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={handleGoToMenu}
          className="py-3 px-5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 font-mono text-xs uppercase"
        >
          Main Menu
        </button>
      </div>
    </div>
  );
};
