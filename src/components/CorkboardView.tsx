import React, { useState, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { EvidenceItem } from '../types/game';
import { 
  Pin, 
  Search, 
  Trash2, 
  Sparkles, 
  Info, 
  Camera, 
  FileText, 
  Video, 
  Map, 
  MessageSquare, 
  Fingerprint,
  Link2,
  CheckCircle2
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const CorkboardView: React.FC = () => {
  const { 
    activeCase, 
    setInspectedEvidence, 
    connections, 
    connectPins, 
    removeConnection, 
    clearConnections 
  } = useGame();

  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  if (!activeCase) return null;

  // Icon selector based on evidence type
  const getEvidenceIcon = (type: EvidenceItem['type']) => {
    switch (type) {
      case 'photo': return <Camera className="w-3.5 h-3.5 text-blue-600" />;
      case 'cctv': return <Video className="w-3.5 h-3.5 text-red-600" />;
      case 'document': return <FileText className="w-3.5 h-3.5 text-stone-700" />;
      case 'map': return <Map className="w-3.5 h-3.5 text-emerald-600" />;
      case 'witness': return <MessageSquare className="w-3.5 h-3.5 text-amber-600" />;
      case 'biometric': return <Fingerprint className="w-3.5 h-3.5 text-purple-600" />;
      default: return <FileText className="w-3.5 h-3.5 text-stone-700" />;
    }
  };

  const handlePinClick = (e: React.MouseEvent, evId: string) => {
    e.stopPropagation();
    sounds.playPinSound();

    if (!selectedPinId) {
      setSelectedPinId(evId);
    } else if (selectedPinId === evId) {
      setSelectedPinId(null); // Deselect
    } else {
      // Connect selectedPinId to evId
      connectPins(selectedPinId, evId);
      setSelectedPinId(null);
    }
  };

  const handleCardClick = (ev: EvidenceItem) => {
    sounds.playPaperSound();
    setInspectedEvidence(ev);
  };

  // Helper to find evidence coordinate by id
  const getEvidenceById = (id: string) => activeCase.evidenceList.find(e => e.id === id);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Top Instructions Banner */}
      <div className="w-full max-w-6xl mb-3 flex flex-wrap items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#27190f] border border-[#4d321d] text-xs font-mono text-amber-300 font-bold">
            <Link2 className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>RED STRING INVESTIGATION BOARD</span>
          </span>
          <span className="text-xs text-stone-400 hidden sm:inline font-sans">
            Click pins (🔴) to string clues together. Click documents to inspect through magnifying glass.
          </span>
        </div>

        {/* Clear Strings Button */}
        {connections.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400">
              {connections.length} String{connections.length > 1 ? 's' : ''} Connected
            </span>
            <button
              onClick={() => {
                sounds.playPaperSound();
                clearConnections();
              }}
              className="px-2.5 py-1 rounded bg-red-950/80 hover:bg-red-900 border border-red-800 text-[11px] text-red-200 font-mono flex items-center gap-1 transition-colors"
              title="Remove All Red Strings"
            >
              <Trash2 className="w-3 h-3" />
              <span>Cut All Strings</span>
            </button>
          </div>
        )}
      </div>

      {/* The Master Investigation Corkboard */}
      <div 
        ref={boardRef}
        className="relative w-full max-w-6xl h-[650px] corkboard-pattern wood-frame rounded-2xl overflow-hidden select-none shadow-2xl"
      >
        {/* Ambient Desk Lamp Light Beam Effect */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-amber-400/15 rounded-full blur-[90px] pointer-events-none" />

        {/* SVG Canvas for Red Yarn Strings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
          <defs>
            <filter id="stringShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.6" />
            </filter>
          </defs>

          {connections.map((conn, idx) => {
            const fromEv = getEvidenceById(conn.fromId);
            const toEv = getEvidenceById(conn.toId);
            if (!fromEv || !toEv) return null;

            // Generate slight quadratic curve for natural thread sag
            const midX = (fromEv.x + toEv.x) / 2;
            const midY = (fromEv.y + toEv.y) / 2 + 3; // 3% sag

            return (
              <g key={idx}>
                {/* String shadow */}
                <path
                  d={`M ${fromEv.x}% ${fromEv.y}% Q ${midX}% ${midY}% ${toEv.x}% ${toEv.y}%`}
                  fill="none"
                  stroke="#1c0707"
                  strokeWidth="3.5"
                  opacity="0.4"
                />
                {/* Red thread */}
                <path
                  d={`M ${fromEv.x}% ${fromEv.y}% Q ${midX}% ${midY}% ${toEv.x}% ${toEv.y}%`}
                  fill="none"
                  stroke={conn.isCorrect ? '#dc2626' : '#ef4444'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  filter="url(#stringShadow)"
                />
              </g>
            );
          })}
        </svg>

        {/* Evidence Items Pinned onto Corkboard */}
        {activeCase.evidenceList.map(ev => {
          const isSelected = selectedPinId === ev.id;
          const hasConnections = connections.some(c => c.fromId === ev.id || c.toId === ev.id);

          return (
            <div
              key={ev.id}
              onClick={() => handleCardClick(ev)}
              style={{
                left: `${ev.x}%`,
                top: `${ev.y}%`,
                transform: `translate(-50%, -50%) rotate(${ev.rotation}deg)`
              }}
              className={`absolute z-30 cursor-pointer group transition-transform duration-200 hover:scale-105 hover:z-40 ${
                isSelected ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-transparent' : ''
              }`}
            >
              {/* Pushpin at top center of item */}
              <button
                onClick={(e) => handlePinClick(e, ev.id)}
                className={`absolute -top-3 left-1/2 -translate-x-1/2 z-40 w-6 h-6 rounded-full border-2 shadow-pin flex items-center justify-center transition-transform hover:scale-125 ${
                  isSelected 
                    ? 'bg-amber-400 border-white ring-4 ring-red-500 animate-bounce' 
                    : 'bg-red-600 border-red-900'
                }`}
                title={isSelected ? 'Click another pin to tie red string' : 'Click to start red string'}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-900' : 'bg-red-200'}`} />
              </button>

              {/* Physical Evidence Card Layout */}
              <div className="w-56 aged-paper rounded-lg p-3 border border-[#b89f74] shadow-xl hover:shadow-2xl text-stone-900">
                {/* Header Tag */}
                <div className="flex items-center justify-between border-b border-stone-300 pb-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    {getEvidenceIcon(ev.type)}
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-600 font-mono">
                      {ev.tag || ev.type}
                    </span>
                  </div>
                  <Search className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-800 transition-colors" />
                </div>

                {/* Title */}
                <h4 className="text-xs font-bold font-typewriter text-stone-900 leading-tight">
                  {ev.title}
                </h4>

                {/* Short Excerpt */}
                <p className="mt-1 text-[11px] text-stone-700 line-clamp-2 leading-relaxed">
                  {ev.shortDesc}
                </p>

                {/* Bottom interactive hint */}
                <div className="mt-2 pt-1 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-500 font-mono">
                  <span>Click to inspect</span>
                  {hasConnections && (
                    <span className="text-red-700 font-bold flex items-center gap-0.5">
                      <Link2 className="w-3 h-3" /> Tied
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Decorative Tape and Stamp Accents */}
        <div className="absolute top-4 right-4 stamp-confidential px-3 py-1 text-xs font-bold pointer-events-none">
          EVIDENCE ROOM NO. 7
        </div>
        <div className="absolute bottom-4 left-4 font-mono text-[11px] text-amber-200/60 bg-[#160d07]/70 px-3 py-1 rounded border border-[#3e2716] pointer-events-none">
          Active Case: {activeCase.title}
        </div>
      </div>
    </div>
  );
};
