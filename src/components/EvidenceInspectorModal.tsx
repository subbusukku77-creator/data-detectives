import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  Share2, 
  FileText, 
  Clock, 
  Tag, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const EvidenceInspectorModal: React.FC = () => {
  const { inspectedEvidence, setInspectedEvidence, activeCase } = useGame();
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  if (!inspectedEvidence) return null;

  const handleZoomIn = () => {
    sounds.playMagnifySound();
    setZoomLevel(prev => Math.min(prev + 0.25, 1.75));
  };

  const handleZoomOut = () => {
    sounds.playMagnifySound();
    setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl aged-paper rounded-xl border-4 border-[#4a2e19] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Top Header */}
        <div className="p-4 bg-[#21140b] text-amber-100 flex items-center justify-between border-b border-[#4d321d]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-amber-300 font-bold">
              MAGNIFYING INSPECTION: {inspectedEvidence.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomIn}
              className="p-1 rounded bg-[#311f12] text-amber-200 hover:bg-[#4a2f1b] transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1 rounded bg-[#311f12] text-amber-200 hover:bg-[#4a2f1b] transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sounds.playPaperSound();
                setInspectedEvidence(null);
              }}
              className="p-1 rounded text-stone-400 hover:text-white hover:bg-stone-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Inspection Panel Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-stone-900 font-sans">
          {/* Tag & Meta strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-300 pb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-stone-800 text-amber-200 font-mono text-[11px] font-bold">
                CLUE #{inspectedEvidence.id.toUpperCase()}
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-900/20 text-amber-900 font-mono text-[11px] font-bold">
                {inspectedEvidence.tag || inspectedEvidence.type}
              </span>
            </div>
            <span className="text-xs text-stone-600 font-serif italic">
              {inspectedEvidence.shortDesc}
            </span>
          </div>

          {/* Document Content with Zoom scaling */}
          <div 
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
            className="transition-transform duration-200 p-6 rounded-lg bg-stone-100/90 border border-stone-300 shadow-inner font-serif"
          >
            <div className="stamp-confidential inline-block px-2 py-0.5 text-[10px] font-bold mb-3">
              EXHIBIT A-7
            </div>

            <p className="text-sm leading-relaxed text-stone-900 font-medium">
              {inspectedEvidence.content}
            </p>

            {inspectedEvidence.details && (
              <div className="mt-4 pt-4 border-t border-stone-300 grid grid-cols-2 gap-2 text-xs font-mono">
                {Object.entries(inspectedEvidence.details).map(([key, val]) => (
                  <div key={key} className="bg-stone-200/60 p-2 rounded">
                    <span className="text-stone-500 uppercase block text-[10px]">{key}</span>
                    <span className="font-bold text-stone-900">{String(val)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detective Analytical Insight note */}
          <div className="p-3.5 rounded bg-amber-100/70 border border-amber-300/80 text-xs font-serif text-amber-950 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block font-mono text-[11px] uppercase tracking-wider text-amber-900">
                Detective's Investigative Note
              </span>
              <span>
                Examine how this clue correlates with the Data Science Task in the Data Lab tab. Connect this piece of evidence to other related clues on the Corkboard using red strings.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-200 border-t border-stone-300 flex justify-end">
          <button
            onClick={() => {
              sounds.playPaperSound();
              setInspectedEvidence(null);
            }}
            className="py-1.5 px-4 rounded bg-stone-800 hover:bg-stone-900 text-amber-100 font-bold text-xs uppercase tracking-wider font-mono transition-colors"
          >
            Close Clue
          </button>
        </div>
      </div>
    </div>
  );
};
