import React from 'react';
import { useGame, InvestigationTab } from '../context/GameContext';
import { CorkboardView } from './CorkboardView';
import { DataLab } from './DataLab';
import { SuspectDossiers } from './SuspectDossiers';
import { AccusationModal } from './AccusationModal';
import { EvidenceInspectorModal } from './EvidenceInspectorModal';
import { HintShopModal } from './HintShopModal';
import { CaseBriefingModal } from './CaseBriefingModal';
import { LearningReportModal } from './LearningReportModal';
import { 
  Pin, 
  FlaskConical, 
  Users, 
  Gavel, 
  Key, 
  FileText, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldAlert,
  Coins
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const InvestigationView: React.FC = () => {
  const { 
    activeCase, 
    activeTab, 
    setActiveTab, 
    setBriefingOpen, 
    setHintShopOpen, 
    isDsTaskSolved,
    profile 
  } = useGame();

  if (!activeCase) return null;

  const tabs: { id: InvestigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'corkboard', label: 'Corkboard & Strings', icon: <Pin className="w-4 h-4 text-red-500" /> },
    { 
      id: 'datalab', 
      label: 'Data Science Lab', 
      icon: <FlaskConical className="w-4 h-4 text-amber-500" />,
      badge: isDsTaskSolved ? 'VERIFIED' : 'ACTIVE'
    },
    { id: 'suspects', label: 'Suspect Dossiers', icon: <Users className="w-4 h-4 text-blue-500" /> },
    { id: 'accusation', label: 'Accusation Chamber', icon: <Gavel className="w-4 h-4 text-purple-500" /> }
  ];

  return (
    <div className="min-h-screen bg-[#0e0b08] text-stone-200 pb-16">
      {/* Investigation Meta Sub-Header */}
      <div className="bg-[#1b120c] border-b border-[#3e2716] shadow-lg px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-300 font-mono text-xs font-bold">
                CASE #{String(activeCase.caseNumber).padStart(3, '0')}
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-mono text-xs font-bold">
                CHAPTER {activeCase.chapter}
              </span>
              <span className="text-xs text-stone-400 font-mono flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-500" /> {activeCase.briefing.location}
              </span>
            </div>
            <h2 className="text-2xl font-black text-amber-100 font-display">
              {activeCase.title}
            </h2>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                sounds.playPaperSound();
                setBriefingOpen(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#2b1c11] hover:bg-[#3d2719] border border-[#52341d] text-amber-200 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Case Briefing</span>
            </button>

            <button
              onClick={() => {
                sounds.playCoinSound();
                setHintShopOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-amber-900/60 hover:bg-amber-800/80 border border-amber-600/70 text-amber-200 text-xs font-mono font-bold flex items-center gap-1.5 shadow transition-colors"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>Hint Shop</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-950 text-amber-400 text-[10px]">
                {profile.unlockedHints[activeCase.id]?.length || 0} / 4
              </span>
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="max-w-7xl mx-auto mt-4 flex items-center gap-2 overflow-x-auto border-t border-[#331f12] pt-3">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playPaperSound();
                setActiveTab(tab.id);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-amber-700 text-white shadow-lg shadow-amber-950/50 border border-amber-500'
                  : 'bg-[#140e09] text-stone-400 hover:text-amber-200 hover:bg-[#24170e] border border-stone-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                  tab.badge === 'VERIFIED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-amber-950 text-amber-300'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Panel */}
      <main className="py-6">
        {activeTab === 'corkboard' && <CorkboardView />}
        {activeTab === 'datalab' && <DataLab />}
        {activeTab === 'suspects' && <SuspectDossiers />}
        {activeTab === 'accusation' && <AccusationModal />}
      </main>

      {/* Persistent Modals */}
      <EvidenceInspectorModal />
      <HintShopModal />
      <CaseBriefingModal />
      <LearningReportModal />
    </div>
  );
};
