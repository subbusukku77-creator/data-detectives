import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Header } from './components/Header';
import { MainMenu } from './components/MainMenu';
import { Headquarters } from './components/Headquarters';
import { CaseSelection } from './components/CaseSelection';
import { InvestigationView } from './components/InvestigationView';
import { HowToPlay } from './components/HowToPlay';
import { DetectiveProfile } from './components/DetectiveProfile';
import { Documentation } from './components/Documentation';

const MainContent: React.FC = () => {
  const { currentScreen } = useGame();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0e0b08]">
      <Header />

      <main className="flex-1">
        {currentScreen === 'main-menu' && <MainMenu />}
        {currentScreen === 'headquarters' && <Headquarters />}
        {currentScreen === 'case-select' && <CaseSelection />}
        {currentScreen === 'investigation' && <InvestigationView />}
        {currentScreen === 'how-to-play' && <HowToPlay />}
        {currentScreen === 'profile' && <DetectiveProfile />}
        {currentScreen === 'documentation' && <Documentation />}
      </main>

      {/* Global Academic & Noir Footer */}
      <footer className="bg-[#140e09] border-t border-[#311d10] py-3 px-4 text-center text-xs font-mono text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>THE DATA DETECTIVES • College-Level IDSE Academic Game Project</span>
          <span className="text-amber-400/80 italic font-typewriter">"Every Case Has a Secret. Every Clue Has Data."</span>
          <span>15 Fully Functional Interactive Cases</span>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <GameProvider>
      <MainContent />
    </GameProvider>
  );
};

export default App;
