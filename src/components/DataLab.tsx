import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { 
  calculateMean, 
  calculateMedian, 
  calculateMode, 
  calculateIQR, 
  calculatePearsonCorrelation, 
  runKMeans2D, 
  calculateBiasVariance,
  Point2D
} from '../utils/dsMath';
import { sounds } from '../utils/soundEffects';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  Sliders, 
  Filter, 
  BarChart2, 
  Activity, 
  Cpu, 
  PieChart, 
  Layers,
  HelpCircle,
  Database
} from 'lucide-react';

export const DataLab: React.FC = () => {
  const { activeCase, isDsTaskSolved, markDsTaskSolved, setActiveTab } = useGame();

  if (!activeCase) return null;

  const dataset = activeCase.dataset;

  // -------------------------------------------------------------
  // STATE PER CASE TASK TYPE
  // -------------------------------------------------------------

  // Case 1: Structuring, Table Creation & Interactive Row Tagging
  const [c1TableCreated, setC1TableCreated] = useState<boolean>(false);
  const [c1SelectedColumn, setC1SelectedColumn] = useState<'none' | 'exitTime' | 'capacity'>('none');
  const [c1TimeCondition, setC1TimeCondition] = useState<'all' | 'before230' | 'window' | 'after245'>('all');
  const [c1SizeCondition, setC1SizeCondition] = useState<'all' | 'small' | 'large'>('all');
  const [c1RowTags, setC1RowTags] = useState<Record<string, 'neutral' | 'cleared' | 'suspicious' | 'check'>>({});
  const [c1ActiveSelectedRow, setC1ActiveSelectedRow] = useState<string | null>(null);

  // Case 2: Filtering
  const [c2MinHeight, setC2MinHeight] = useState<number>(170);
  const [c2Coat, setC2Coat] = useState<string>('all');
  const [c2Watch, setC2Watch] = useState<string>('all');
  const [c2Sort, setC2Sort] = useState<'asc' | 'desc'>('desc');

  // Case 3: De-duplication
  const [c3Deduplicated, setC3Deduplicated] = useState<boolean>(false);
  const [c3SelectedRow, setC3SelectedRow] = useState<number | null>(null);

  // Case 4: Imputation
  const [c4ImputationMethod, setC4ImputationMethod] = useState<'none' | 'zero' | 'mean' | 'interpolate'>('none');

  // Case 5: Frequency
  const [c5Sorted, setC5Sorted] = useState<boolean>(false);

  // Case 6: Central Tendency
  const [c6IncludeOutlier, setC6IncludeOutlier] = useState<boolean>(true);

  // Case 7: Outliers & IQR
  const [c7Multiplier, setC7Multiplier] = useState<number>(1.5);

  // Case 8: Correlation
  const [c8SelectedVar, setC8SelectedVar] = useState<'iceCream' | 'temp' | 'grid'>('grid');

  // Case 9: K-Means Clustering
  const [c9K, setC9K] = useState<number>(3);
  const [c9Iteration, setC9Iteration] = useState<number>(0);
  const [c9ClusterState, setC9ClusterState] = useState<any>(null);

  // Case 10: Misleading Graphs
  const [c10ZeroBaseline, setC10ZeroBaseline] = useState<boolean>(false);

  // Case 11: Machine Learning Classifier
  const [c11WeatherRule, setC11WeatherRule] = useState<string>('Foggy');
  const [c11GuardsRule, setC11GuardsRule] = useState<number>(3);
  const [c11InferenceTarget, setC11InferenceTarget] = useState<string | null>(null);

  // Case 12: Sampling Bias
  const [c12SampleType, setC12SampleType] = useState<'biased' | 'representative'>('biased');

  // Case 13: Overfitting
  const [c13Degree, setC13Degree] = useState<number>(8);

  // Case 14: Bias-Variance Tradeoff
  const [c14Capacity, setC14Capacity] = useState<number>(1);

  // Case 15: Mastermind Pipeline
  const [c15Stages, setC15Stages] = useState<boolean[]>([false, false, false, false, false]);

  // Helper when user solves task
  const handleCompleteTask = () => {
    markDsTaskSolved();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Concept Instructions Banner */}
      <div className="mb-6 p-5 rounded-xl bg-gradient-to-r from-[#2a1c12] via-[#20140c] to-[#170e08] border-2 border-[#54351d] shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded bg-amber-900/80 border border-amber-700/60 text-amber-200 font-mono text-xs font-bold uppercase tracking-wider">
                DATA SCIENCE LABORATORY
              </span>
              <span className="text-xs font-bold text-amber-400 font-mono">
                {activeCase.dsConcept.name}
              </span>
            </div>
            <h3 className="text-xl font-black text-amber-100 font-display">
              {activeCase.title}: Investigation Workbench
            </h3>
            <p className="mt-1 text-xs text-amber-200/80 font-serif leading-relaxed max-w-3xl">
              {activeCase.dsConcept.instructions}
            </p>
          </div>

          {/* Task Status */}
          <div className="flex items-center gap-2">
            {isDsTaskSolved ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-600/80 text-emerald-300 font-mono text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>DATA ANALYSIS VERIFIED</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-600/60 text-amber-300 font-mono text-xs font-bold">
                <Activity className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>INTERACTIVE ANALYSIS REQUIRED</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* WORKBENCH BODY (Dynamic per Case) */}
      <div className="p-6 rounded-2xl bg-[#1c130d] border border-[#3e2716] shadow-2xl text-stone-200">
        
        {/* ==================================================== */}
        {/* CASE 1: DATA COLLECTION, STRUCTURING & QUERYING */}
        {/* ==================================================== */}
        {activeCase.caseNumber === 1 && (() => {
          const allRows = [
            { id: 'r1', name: 'Marcus Vance', entry: '2:05 PM', exit: '2:20 PM', item: 'Notebook', capacity: 'Small (< 20cm)', minutes: 140 },
            { id: 'r2', name: 'Leo Sterling', entry: '2:10 PM', exit: '2:40 PM', item: 'Gym Duffel', capacity: 'Large (≥ 50cm)', minutes: 160 },
            { id: 'r3', name: 'Sarah Jenkins', entry: '2:15 PM', exit: '3:10 PM', item: 'None', capacity: 'None (0cm)', minutes: 190 },
            { id: 'r4', name: 'Elena Rostova', entry: '2:30 PM', exit: '2:45 PM', item: 'Camera', capacity: 'Small (< 15cm)', minutes: 165 },
            { id: 'r5', name: 'Arthur Pendelton', entry: '2:20 PM', exit: '2:55 PM', item: 'Umbrella', capacity: 'Narrow (< 10cm)', minutes: 175 }
          ];

          // Filter by time condition
          const timeMatches = (r: typeof allRows[0]) => {
            if (c1TimeCondition === 'all') return true;
            if (c1TimeCondition === 'before230') return r.minutes < 150;
            if (c1TimeCondition === 'window') return r.minutes >= 150 && r.minutes <= 165; // 2:30 to 2:45
            if (c1TimeCondition === 'after245') return r.minutes > 165;
            return true;
          };

          // Filter by size condition
          const sizeMatches = (r: typeof allRows[0]) => {
            if (c1SizeCondition === 'all') return true;
            if (c1SizeCondition === 'small') return r.capacity.includes('Small') || r.capacity.includes('Narrow') || r.capacity.includes('None');
            if (c1SizeCondition === 'large') return r.capacity.includes('Large');
            return true;
          };

          const handleTagRow = (rowId: string, tag: 'cleared' | 'suspicious' | 'check' | 'neutral') => {
            sounds.playPinSound();
            setC1RowTags(prev => ({
              ...prev,
              [rowId]: tag
            }));
          };

          const isBothPredicatesActive = c1TimeCondition === 'window' && c1SizeCondition === 'large';

          return (
            <div className="space-y-6">
              {/* Concept Walkthrough Card */}
              <div className="p-4 rounded-xl bg-[#140e09] border border-amber-900/40 text-xs font-mono space-y-2">
                <span className="text-amber-300 font-bold flex items-center gap-2 uppercase">
                  <Database className="w-4 h-4 text-amber-500" />
                  <span>Hands-on Investigation Studio: Unstructured Notes → Database Query</span>
                </span>
                <p className="text-stone-300 font-sans leading-relaxed">
                  Raw crime notes are messy sentences. First, <strong>click "Create Structured Dataset Table"</strong> to parse them into standardized columns. Then, <strong>select query conditions</strong> (Crime Time Window & Container Size) and <strong>click rows to tag suspects by color</strong> (Green = Cleared, Red = Suspicious)!
                </p>
              </div>

              {/* Step 1: Raw Notepad vs Table Generator */}
              {!c1TableCreated ? (
                <div className="p-6 rounded-2xl bg-[#140e09] border-2 border-dashed border-[#54351d] text-center space-y-4">
                  <div>
                    <h4 className="text-sm font-bold font-mono text-amber-300 uppercase tracking-wider mb-2">
                      Step 1: Raw Unstructured Notepad
                    </h4>
                    <p className="text-xs text-stone-400 font-serif max-w-lg mx-auto">
                      The guard scribbled 5 raw observation fragments. They are plain unstructured sentences.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-w-4xl mx-auto text-left font-typewriter text-xs text-stone-300">
                    {dataset.rawSnippets.map((snip: any, idx: number) => (
                      <div key={idx} className="p-3 rounded-lg bg-stone-900/80 border border-stone-800">
                        "{snip.text}"
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        sounds.playTypewriter();
                        setC1TableCreated(true);
                      }}
                      className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-display font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-950/60 inline-flex items-center gap-2"
                    >
                      <Database className="w-4 h-4" />
                      <span>Create Structured Dataset Table</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Step 2: Interactive Query Builder & Color Palette */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Condition 1: Exit Time */}
                    <div className="p-4 rounded-xl bg-[#140e09] border border-stone-800 font-mono text-xs space-y-2">
                      <span className="text-stone-400 font-bold block text-[11px] uppercase">
                        Query Condition A: Exit Time Window
                      </span>
                      <select
                        value={c1TimeCondition}
                        onChange={(e) => {
                          sounds.playPaperSound();
                          setC1TimeCondition(e.target.value as any);
                        }}
                        className="w-full p-2 rounded bg-stone-900 border border-stone-700 text-amber-200 font-bold focus:outline-none"
                      >
                        <option value="all">Show All Exit Times (No Filter)</option>
                        <option value="before230">Before 2:30 PM (Pre-Theft)</option>
                        <option value="window">2:30 PM – 2:45 PM (Crime Window: Janitor Heard Clanking)</option>
                        <option value="after245">After 2:45 PM (Late Departures)</option>
                      </select>
                      <span className="text-[10px] text-stone-500 block">
                        Crime window: Janitor Frank saw suspect at ~2:42 PM.
                      </span>
                    </div>

                    {/* Condition 2: Container Capacity */}
                    <div className="p-4 rounded-xl bg-[#140e09] border border-stone-800 font-mono text-xs space-y-2">
                      <span className="text-stone-400 font-bold block text-[11px] uppercase">
                        Query Condition B: Container Capacity
                      </span>
                      <select
                        value={c1SizeCondition}
                        onChange={(e) => {
                          sounds.playPaperSound();
                          setC1SizeCondition(e.target.value as any);
                        }}
                        className="w-full p-2 rounded bg-stone-900 border border-stone-700 text-amber-200 font-bold focus:outline-none"
                      >
                        <option value="all">Any Container Size (No Filter)</option>
                        <option value="small">Small Items (&lt; 20cm: Notebook / Camera / None)</option>
                        <option value="large">Large Containers (≥ 40cm: Trophy Concealment)</option>
                      </select>
                      <span className="text-[10px] text-stone-500 block">
                        Golden trophy height: 40cm. Requires large bag.
                      </span>
                    </div>

                    {/* Color Tagging Legend */}
                    <div className="p-4 rounded-xl bg-[#140e09] border border-stone-800 font-mono text-xs space-y-2">
                      <span className="text-stone-400 font-bold block text-[11px] uppercase">
                        Detective Color Tagging Legend
                      </span>
                      <div className="flex flex-wrap gap-2 text-[10px]">
                        <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold">
                          🟢 Cleared / Alibi Valid
                        </span>
                        <span className="px-2 py-1 rounded bg-red-950 text-red-300 border border-red-700 font-bold">
                          🔴 Flagged Suspicious
                        </span>
                        <span className="px-2 py-1 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold">
                          🟡 Inconclusive
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-500 block">
                        Click the colored tags on any row below to mark suspects!
                      </span>
                    </div>
                  </div>

                  {/* Step 3: Interactive Table with Row Color Coding */}
                  <div className="overflow-x-auto rounded-xl border border-stone-800">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#24170e] text-amber-200 border-b border-[#3e2716]">
                        <tr>
                          <th className="p-3">Visitor Name</th>
                          <th className="p-3">Entry Time</th>
                          <th className="p-3">Exit Time</th>
                          <th className="p-3">Item Carried</th>
                          <th className="p-3">Container Capacity</th>
                          <th className="p-3">Condition Status</th>
                          <th className="p-3">Tag with Color</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-800 bg-[#120c08]">
                        {allRows.map(row => {
                          const matchesTime = timeMatches(row);
                          const matchesSize = sizeMatches(row);
                          const isFullyMatching = matchesTime && matchesSize && isBothPredicatesActive;
                          const isEliminated = (!matchesTime || !matchesSize) && (c1TimeCondition !== 'all' || c1SizeCondition !== 'all');
                          const rowTag = c1RowTags[row.id] || 'neutral';

                          let rowClass = 'hover:bg-stone-900/60 transition-colors ';
                          if (rowTag === 'cleared') {
                            rowClass += 'bg-emerald-950/40 text-emerald-200 border-l-4 border-emerald-500 ';
                          } else if (rowTag === 'suspicious') {
                            rowClass += 'bg-red-950/60 text-red-200 font-bold border-l-4 border-red-500 ';
                          } else if (rowTag === 'check') {
                            rowClass += 'bg-amber-950/40 text-amber-200 border-l-4 border-amber-500 ';
                          } else if (isFullyMatching) {
                            rowClass += 'bg-red-950/70 text-red-100 font-bold ring-2 ring-red-500 ';
                          } else if (isEliminated) {
                            rowClass += 'opacity-40 bg-stone-950 text-stone-600 line-through ';
                          }

                          return (
                            <tr key={row.id} className={rowClass}>
                              <td className="p-3 font-bold">{row.name}</td>
                              <td className="p-3">{row.entry}</td>
                              <td className="p-3">
                                <span className={c1TimeCondition === 'window' && matchesTime ? 'text-amber-300 font-black' : ''}>
                                  {row.exit}
                                </span>
                              </td>
                              <td className="p-3">{row.item}</td>
                              <td className="p-3">
                                <span className={c1SizeCondition === 'large' && matchesSize ? 'text-red-400 font-black' : 'text-stone-400'}>
                                  {row.capacity}
                                </span>
                              </td>
                              <td className="p-3">
                                {isFullyMatching ? (
                                  <span className="px-2 py-0.5 rounded bg-red-700 text-white font-bold animate-pulse">
                                    MATCHES ALL CRITERIA
                                  </span>
                                ) : isEliminated ? (
                                  <span className="text-stone-500 text-[10px]">Eliminated by Query</span>
                                ) : (
                                  <span className="text-stone-400 text-[10px]">Neutral / Unchecked</span>
                                )}
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => handleTagRow(row.id, 'cleared')}
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                      rowTag === 'cleared' ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-stone-400 hover:text-emerald-300'
                                    }`}
                                    title="Tag as Cleared (Green)"
                                  >
                                    🟢 Cleared
                                  </button>
                                  <button
                                    onClick={() => handleTagRow(row.id, 'suspicious')}
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                      rowTag === 'suspicious' ? 'bg-red-600 text-white' : 'bg-stone-800 text-stone-400 hover:text-red-300'
                                    }`}
                                    title="Tag as Suspicious (Red)"
                                  >
                                    🔴 Suspicious
                                  </button>
                                  <button
                                    onClick={() => handleTagRow(row.id, 'neutral')}
                                    className="p-1 rounded text-stone-600 hover:text-stone-400 text-[10px]"
                                    title="Reset Tag"
                                  >
                                    ✕
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Verification & Lock Findings Bar */}
                  {isBothPredicatesActive ? (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-red-950 via-amber-950 to-emerald-950 border-2 border-emerald-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <span className="font-bold text-emerald-300 block text-sm font-mono flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Deductive Query Successfully Isolated Sole Suspect!</span>
                        </span>
                        <p className="text-xs text-stone-200 font-sans mt-0.5">
                          By filtering for (Exit Time == 2:30–2:45 PM) AND (Container ≥ 40cm), Marcus, Sarah, Arthur, and Elena are eliminated. <strong>Leo Sterling</strong> is the only person matching both conditions.
                        </p>
                      </div>

                      <button
                        onClick={handleCompleteTask}
                        className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-display font-bold text-xs uppercase tracking-wider shadow-lg shrink-0"
                      >
                        Verify & Lock Findings
                      </button>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between text-xs font-mono text-stone-400">
                      <span>Tip: Set Exit Time to "2:30–2:45 PM" and Container to "Large Containers (≥ 40cm)" to filter suspects.</span>
                      <button
                        onClick={() => {
                          sounds.playPaperSound();
                          setC1TimeCondition('window');
                          setC1SizeCondition('large');
                        }}
                        className="py-1 px-3 rounded bg-amber-800 hover:bg-amber-700 text-amber-100 font-bold text-[11px]"
                      >
                        Auto-Select Known Crime Conditions
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })()}

        {/* ==================================================== */}
        {/* CASE 2: SORTING & MULTI-ATTRIBUTE FILTERING */}
        {/* ==================================================== */}
        {activeCase.caseNumber === 2 && (() => {
          const records = dataset.records;
          const filtered = records
            .filter((r: any) => {
              if (r.height < c2MinHeight) return false;
              if (c2Coat !== 'all' && r.coat.toLowerCase() !== c2Coat.toLowerCase()) return false;
              if (c2Watch !== 'all' && !r.watch.toLowerCase().includes(c2Watch.toLowerCase())) return false;
              return true;
            })
            .sort((a: any, b: any) => c2Sort === 'desc' ? b.height - a.height : a.height - b.height);

          return (
            <div className="space-y-6">
              {/* Interactive Controls Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#140e09] border border-stone-800 text-xs font-mono">
                <div>
                  <label className="text-stone-400 block mb-1">Min Height: {c2MinHeight} cm</label>
                  <input
                    type="range"
                    min="170"
                    max="190"
                    value={c2MinHeight}
                    onChange={(e) => setC2MinHeight(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-stone-400 block mb-1">Coat Color</label>
                  <select
                    value={c2Coat}
                    onChange={(e) => setC2Coat(e.target.value)}
                    className="w-full p-1.5 rounded bg-stone-900 border border-stone-700 text-amber-200"
                  >
                    <option value="all">All Colors</option>
                    <option value="Navy">Navy Blue</option>
                    <option value="Black">Black</option>
                    <option value="Brown">Brown</option>
                    <option value="Grey">Grey</option>
                  </select>
                </div>

                <div>
                  <label className="text-stone-400 block mb-1">Watch Accessory</label>
                  <select
                    value={c2Watch}
                    onChange={(e) => setC2Watch(e.target.value)}
                    className="w-full p-1.5 rounded bg-stone-900 border border-stone-700 text-amber-200"
                  >
                    <option value="all">Any Watch</option>
                    <option value="Gold">Gold Watch</option>
                    <option value="Silver">Silver Watch</option>
                  </select>
                </div>

                <div>
                  <label className="text-stone-400 block mb-1">Sort Height</label>
                  <button
                    onClick={() => setC2Sort(prev => prev === 'desc' ? 'asc' : 'desc')}
                    className="w-full p-1.5 rounded bg-[#2a1c12] border border-[#482c19] text-amber-300 font-bold"
                  >
                    Height: {c2Sort === 'desc' ? 'High → Low' : 'Low → High'}
                  </button>
                </div>
              </div>

              {/* Filtered Results Table */}
              <div className="overflow-x-auto rounded-xl border border-stone-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#24170e] text-amber-200 border-b border-[#3e2716]">
                    <tr>
                      <th className="p-2.5">Visitor ID</th>
                      <th className="p-2.5">Name</th>
                      <th className="p-2.5">Height (cm)</th>
                      <th className="p-2.5">Coat Color</th>
                      <th className="p-2.5">Watch Accessory</th>
                      <th className="p-2.5">Filter Match</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 bg-[#120c08]">
                    {filtered.map((r: any) => (
                      <tr key={r.id} className={r.name === 'Victor Crane' ? 'bg-red-950/50 text-red-200 font-bold' : ''}>
                        <td className="p-2.5">{r.badge}</td>
                        <td className="p-2.5">{r.name}</td>
                        <td className="p-2.5">{r.height} cm</td>
                        <td className="p-2.5">{r.coat}</td>
                        <td className="p-2.5">{r.watch}</td>
                        <td className="p-2.5">
                          {r.name === 'Victor Crane' ? (
                            <span className="px-2 py-0.5 rounded bg-red-700 text-white font-bold">EXACT WITNESS MATCH</span>
                          ) : (
                            <span className="text-stone-500">Partial</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filtered.length === 1 && filtered[0].name === 'Victor Crane' && (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-700/80 text-emerald-300 text-xs font-mono flex items-center justify-between">
                  <span>Filtered down to 1 exact suspect: Victor Crane satisfies all 3 witness parameters!</span>
                  <button
                    onClick={handleCompleteTask}
                    className="py-1 px-3 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold"
                  >
                    Confirm Match
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* ==================================================== */}
        {/* CASE 3: DUPLICATE DATA CLEANING */}
        {/* ==================================================== */}
        {activeCase.caseNumber === 3 && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-[#140e09] border border-stone-800">
              <div>
                <span className="text-xs font-bold text-amber-300 block font-mono">RFID Electronic Gate Sensor Stream</span>
                <span className="text-[11px] text-stone-400">Sensor bounce generated redundant duplicates. Detect and deduplicate.</span>
              </div>
              <button
                onClick={() => {
                  sounds.playTypewriter();
                  setC3Deduplicated(true);
                }}
                className="px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 text-white font-mono text-xs font-bold tracking-wider uppercase transition-colors"
              >
                {c3Deduplicated ? 'Sensor Bounces Removed' : 'Run De-Duplication Algorithm'}
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-stone-800">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#24170e] text-amber-200 border-b border-[#3e2716]">
                  <tr>
                    <th className="p-2.5">Log ID</th>
                    <th className="p-2.5">Badge ID</th>
                    <th className="p-2.5">Registered Holder</th>
                    <th className="p-2.5">Timestamp</th>
                    <th className="p-2.5">Gate</th>
                    <th className="p-2.5">Integrity Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800 bg-[#120c08]">
                  {dataset.records
                    .filter((r: any) => !c3Deduplicated || !r.isExactDup)
                    .map((r: any) => (
                      <tr 
                        key={r.id} 
                        className={
                          r.isClone 
                            ? 'bg-red-950/60 text-red-200 font-bold border-l-4 border-red-500' 
                            : r.isExactDup 
                            ? 'opacity-40 line-through bg-stone-900' 
                            : ''
                        }
                      >
                        <td className="p-2.5">#{r.id}</td>
                        <td className="p-2.5">{r.badge}</td>
                        <td className="p-2.5">{r.holder}</td>
                        <td className="p-2.5">{r.time}</td>
                        <td className="p-2.5">{r.gate}</td>
                        <td className="p-2.5">
                          {r.isClone ? (
                            <span className="px-2 py-0.5 rounded bg-red-700 text-white font-bold">CLONED BADGE DETECTED</span>
                          ) : r.isExactDup ? (
                            <span className="text-stone-500">Duplicate (Bounce)</span>
                          ) : (
                            <span className="text-emerald-400">Verified Unique</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {c3Deduplicated && (
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-600/60 flex items-center justify-between text-xs font-mono">
                <span className="text-amber-200">
                  Deduplication complete: Exact bounces purged. Notice Badge #402 was swiped at Gate A (03:15:00) and Gate F (03:15:10) — 400 meters away! Clara Oswald swiped the clone!
                </span>
                <button
                  onClick={handleCompleteTask}
                  className="py-1.5 px-4 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold uppercase tracking-wider shrink-0"
                >
                  Verify Anomaly
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* CASE 4: MISSING VALUE IMPUTATION */}
        {/* ==================================================== */}
        {activeCase.caseNumber === 4 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#140e09] border border-stone-800 text-xs font-mono">
              <button
                onClick={() => setC4ImputationMethod('zero')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  c4ImputationMethod === 'zero' ? 'bg-amber-800/40 border-amber-500 text-amber-200' : 'bg-stone-900 border-stone-800 text-stone-400'
                }`}
              >
                <div className="font-bold">1. Zero Fill Imputation</div>
                <div className="text-[10px] text-stone-400 mt-1">Replaces NULL with 0 Watts.</div>
              </button>
              <button
                onClick={() => setC4ImputationMethod('mean')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  c4ImputationMethod === 'mean' ? 'bg-amber-800/40 border-amber-500 text-amber-200' : 'bg-stone-900 border-stone-800 text-stone-400'
                }`}
              >
                <div className="font-bold">2. Mean Imputation</div>
                <div className="text-[10px] text-stone-400 mt-1">Replaces NULL with mean (119W).</div>
              </button>
              <button
                onClick={() => setC4ImputationMethod('interpolate')}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  c4ImputationMethod === 'interpolate' ? 'bg-emerald-800/40 border-emerald-500 text-emerald-200' : 'bg-stone-900 border-stone-800 text-stone-400'
                }`}
              >
                <div className="font-bold">3. Breaker Circuit Reconstruct</div>
                <div className="text-[10px] text-stone-400 mt-1">Uses breaker voltage to prove true 0W drop.</div>
              </button>
            </div>

            {/* Imputation Table */}
            <div className="overflow-x-auto rounded-xl border border-stone-800">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#24170e] text-amber-200 border-b border-[#3e2716]">
                  <tr>
                    <th className="p-2.5">Timestamp</th>
                    <th className="p-2.5">Raw Laser Power</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5">Imputed Value</th>
                    <th className="p-2.5">Laser Physical State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800 bg-[#120c08]">
                  {dataset.rows.map((r: any, idx: number) => {
                    let imputedDisplay: string | number = r.power !== null ? `${r.power} W` : 'NULL (Corrupted)';
                    let state = 'Active Grid (Armed)';

                    if (r.isMissing) {
                      if (c4ImputationMethod === 'zero' || c4ImputationMethod === 'interpolate') {
                        imputedDisplay = '0 W';
                        state = 'BLACKOUT / DISABLED';
                      } else if (c4ImputationMethod === 'mean') {
                        imputedDisplay = '119 W (Artificial Mean)';
                        state = 'Assumed Armed';
                      }
                    }

                    return (
                      <tr key={idx} className={r.isMissing ? 'bg-amber-950/30' : ''}>
                        <td className="p-2.5">{r.time}</td>
                        <td className="p-2.5">{r.power !== null ? `${r.power} W` : <span className="text-red-400 font-bold">NULL / NaN</span>}</td>
                        <td className="p-2.5">{r.status}</td>
                        <td className="p-2.5 font-bold text-amber-300">{imputedDisplay}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            state.includes('BLACKOUT') ? 'bg-red-700 text-white animate-pulse' : 'bg-emerald-950 text-emerald-300'
                          }`}>
                            {state}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {c4ImputationMethod === 'interpolate' && (
              <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-600/70 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-200">
                  Ground truth restored: The laser grid dropped to 0W during the missing 2-minute blackout, refuting Mason's alibi!
                </span>
                <button
                  onClick={handleCompleteTask}
                  className="py-1.5 px-4 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold"
                >
                  Verify Power Outage
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* CASE 5: FREQUENCY DISTRIBUTION & AGGREGATIONS */}
        {/* ==================================================== */}
        {activeCase.caseNumber === 5 && (() => {
          const freqs = dataset.frequencies;
          const displayFreqs = c5Sorted ? [...freqs].sort((a: any, b: any) => b.count - a.count) : freqs;

          return (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-amber-300">
                  Aggregated Weekend Badge Entries (Population Mean: μ = 0.8)
                </span>
                <button
                  onClick={() => setC5Sorted(prev => !prev)}
                  className="px-3 py-1.5 rounded bg-[#2b1c11] border border-[#4f321d] text-amber-200 text-xs font-mono font-bold"
                >
                  {c5Sorted ? 'Original Order' : 'Sort by Frequency Descending'}
                </button>
              </div>

              {/* Bar Chart Visualization */}
              <div className="p-5 rounded-xl bg-[#140e09] border border-stone-800 space-y-3 font-mono text-xs">
                {displayFreqs.map((item: any, idx: number) => {
                  const widthPercent = (item.count / 20) * 100;
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-stone-300">
                        <span className="font-bold">{item.name} ({item.department})</span>
                        <span className={item.suspicious ? 'text-red-400 font-black' : 'text-stone-400'}>
                          {item.count} Entries
                        </span>
                      </div>
                      <div className="w-full h-5 rounded bg-stone-900 overflow-hidden flex items-center">
                        <div
                          style={{ width: `${Math.max(5, widthPercent)}%` }}
                          className={`h-full transition-all duration-500 rounded ${
                            item.suspicious ? 'bg-gradient-to-r from-red-600 to-red-500 animate-pulse' : 'bg-amber-600/60'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-600/60 flex items-center justify-between text-xs font-mono">
                <span className="text-amber-200">
                  Statistical frequency analysis complete: Roland Price’s 18 weekend visits depart wildly from the normal baseline of 1.
                </span>
                <button
                  onClick={handleCompleteTask}
                  className="py-1.5 px-4 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold"
                >
                  Confirm Frequency Anomaly
                </button>
              </div>
            </div>
          );
        })()}

        {/* ==================================================== */}
        {/* CASE 6: MEAN, MEDIAN, MODE */}
        {/* ==================================================== */}
        {activeCase.caseNumber === 6 && (() => {
          const speeds: number[] = c6IncludeOutlier ? dataset.speeds : dataset.inliers;
          const meanVal = calculateMean(speeds);
          const medianVal = calculateMedian(speeds);
          const modeVal = calculateMode(speeds);

          return (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-[#140e09] border border-stone-800">
                <div className="font-mono text-xs">
                  <span className="text-stone-400 block">Radar Speed Array (km/h):</span>
                  <span className="text-amber-300 font-bold tracking-wider">
                    [{speeds.join(', ')}]
                  </span>
                </div>
                <button
                  onClick={() => {
                    sounds.playTypewriter();
                    setC6IncludeOutlier(prev => !prev);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-colors ${
                    c6IncludeOutlier ? 'bg-red-950 text-red-300 border border-red-700' : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                  }`}
                >
                  {c6IncludeOutlier ? 'Isolate & Remove 148 km/h Outlier' : 'Re-insert 148 km/h Outlier'}
                </button>
              </div>

              {/* Statistics Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                <div className="p-4 rounded-xl bg-[#170e08] border border-amber-600/30 text-center">
                  <span className="text-stone-400 text-xs block uppercase">Arithmetic Mean (μ)</span>
                  <span className="text-2xl font-black text-amber-300 block my-1">{meanVal} km/h</span>
                  <span className="text-[11px] text-stone-500">
                    {c6IncludeOutlier ? 'Severely skewed by 148 km/h!' : 'Unskewed average'}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#170e08] border border-emerald-600/40 text-center">
                  <span className="text-stone-400 text-xs block uppercase">Median (50th Percentile)</span>
                  <span className="text-2xl font-black text-emerald-300 block my-1">{medianVal} km/h</span>
                  <span className="text-[11px] text-emerald-400 font-bold">
                    Robust to outlier! Matches getaway van.
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#170e08] border border-stone-700 text-center">
                  <span className="text-stone-400 text-xs block uppercase">Mode (Most Frequent)</span>
                  <span className="text-2xl font-black text-sky-300 block my-1">
                    {modeVal.length > 0 ? modeVal.join(', ') : 'None'}
                  </span>
                  <span className="text-[11px] text-stone-500">Frequency = 1 for each</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-600/60 flex items-center justify-between text-xs font-mono">
                <span className="text-amber-200">
                  Deduction: The Median of 74.5 km/h reveals the true steady cruising speed of Garrison Cole’s Ford Transit van!
                </span>
                <button
                  onClick={handleCompleteTask}
                  className="py-1.5 px-4 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold"
                >
                  Confirm Statistical Deductions
                </button>
              </div>
            </div>
          );
        })()}

        {/* ==================================================== */}
        {/* CASE 7: OUTLIER DETECTION & IQR */}
        {/* ==================================================== */}
        {activeCase.caseNumber === 7 && (() => {
          const values: number[] = dataset.values;
          const iqrRes = calculateIQR(values, c7Multiplier);

          return (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#140e09] border border-stone-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                <div>
                  <span className="text-stone-400 block">Tukey Boxplot Fence Multiplier: k = {c7Multiplier}</span>
                  <span className="text-amber-300">Upper Fence = Q3 + {c7Multiplier} × IQR = ${iqrRes.upperFence}k</span>
                </div>
                <div className="w-48">
                  <input
                    type="range"
                    min="1.0"
                    max="2.5"
                    step="0.1"
                    value={c7Multiplier}
                    onChange={(e) => setC7Multiplier(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Boxplot Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center text-xs">
                <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                  <span className="text-stone-500 block">Q1 (25th%)</span>
                  <span className="text-amber-200 font-bold text-base">${iqrRes.q1}k</span>
                </div>
                <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                  <span className="text-stone-500 block">Q3 (75th%)</span>
                  <span className="text-amber-200 font-bold text-base">${iqrRes.q3}k</span>
                </div>
                <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                  <span className="text-stone-500 block">IQR (Spread)</span>
                  <span className="text-amber-200 font-bold text-base">${iqrRes.iqr}k</span>
                </div>
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-700/80">
                  <span className="text-red-300 block font-bold">Outliers Flagged</span>
                  <span className="text-red-400 font-black text-base">{iqrRes.outliers.length}</span>
                </div>
              </div>

              {/* Transactions List */}
              <div className="p-4 rounded-xl bg-[#140e09] border border-stone-800 font-mono text-xs">
                <div className="text-stone-400 mb-2">Quarterly Transactions ($k):</div>
                <div className="flex flex-wrap gap-2">
                  {values.map((val, idx) => {
                    const isOutlier = val > iqrRes.upperFence;
                    return (
                      <span
                        key={idx}
                        className={`px-3 py-1.5 rounded-lg border font-bold ${
                          isOutlier
                            ? 'bg-red-700 text-white border-red-500 animate-pulse'
                            : 'bg-stone-900 text-stone-300 border-stone-800'
                        }`}
                      >
                        ${val}k {isOutlier ? '⚠️ OUTLIER' : ''}
                      </span>
                    );
                  })}
                </div>
              </div>

              {iqrRes.outliers.includes(84.5) && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-200">
                    The $84.5k wire transfer mathematically exceeds the statistical threshold! CFO Arthur Sterling is uncovered!
                  </span>
                  <button
                    onClick={handleCompleteTask}
                    className="py-1.5 px-4 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold"
                  >
                    Confirm Outlier Evidence
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* ==================================================== */}
        {/* CASE 8: CORRELATION VS CAUSATION */}
        {/* ==================================================== */}
        {activeCase.caseNumber === 8 && (() => {
          const rIceCream = dataset.rIceCreamBurglaries;
          const rTemp = dataset.rTempBurglaries;
          const rGrid = dataset.rGridBurglaries;

          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <button
                  onClick={() => setC8SelectedVar('iceCream')}
                  className={`p-3.5 rounded-xl border text-left transition-colors ${
                    c8SelectedVar === 'iceCream' ? 'bg-amber-800/40 border-amber-500 text-amber-200' : 'bg-stone-900 border-stone-800 text-stone-400'
                  }`}
                >
                  <div className="font-bold">Ice Cream vs Burglaries</div>
                  <div className="text-base font-black my-1 text-amber-400">r = {rIceCream}</div>
                  <div className="text-[10px] text-stone-400">Spurious Correlation (Lurking Heatwave)</div>
                </button>

                <button
                  onClick={() => setC8SelectedVar('temp')}
                  className={`p-3.5 rounded-xl border text-left transition-colors ${
                    c8SelectedVar === 'temp' ? 'bg-amber-800/40 border-amber-500 text-amber-200' : 'bg-stone-900 border-stone-800 text-stone-400'
                  }`}
                >
                  <div className="font-bold">Temperature vs Burglaries</div>
                  <div className="text-base font-black my-1 text-amber-400">r = {rTemp}</div>
                  <div className="text-[10px] text-stone-400">Confounding / Lurking Variable</div>
                </button>

                <button
                  onClick={() => setC8SelectedVar('grid')}
                  className={`p-3.5 rounded-xl border text-left transition-colors ${
                    c8SelectedVar === 'grid' ? 'bg-emerald-800/40 border-emerald-500 text-emerald-200' : 'bg-stone-900 border-stone-800 text-stone-400'
                  }`}
                >
                  <div className="font-bold">Grid Drops vs Burglaries</div>
                  <div className="text-base font-black my-1 text-emerald-400">r = {rGrid}</div>
                  <div className="text-[10px] text-emerald-400 font-bold">TRUE CAUSAL MECHANISM</div>
                </button>
              </div>

              {/* Explanatory Box */}
              <div className="p-4 rounded-xl bg-[#140e09] border border-stone-800 font-mono text-xs space-y-2">
                <span className="text-stone-400 block font-bold uppercase">Causal Analysis Insight:</span>
                <p className="text-stone-300 leading-relaxed font-sans">
                  {c8SelectedVar === 'iceCream' && (
                    "High correlation (r = 0.912) between ice cream and burglaries is SPURIOUS. Ice cream does not pick locks! Both are driven by summer heat causing residents to open windows."
                  )}
                  {c8SelectedVar === 'temp' && (
                    "Temperature correlates with both ice cream sales and open windows. It is the confounding third variable."
                  )}
                  {c8SelectedVar === 'grid' && (
                    "Transformer Grid Drops have r = 0.984 AND a direct causal mechanism: Lineman Garret Sparks intentionally tripped circuits to kill security alarms during break-ins!"
                  )}
                </p>
              </div>

              {c8SelectedVar === 'grid' && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-200">
                    Causality proven! Lineman Garret Sparks tripped the power grid to execute burglaries.
                  </span>
                  <button
                    onClick={handleCompleteTask}
                    className="py-1.5 px-4 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold"
                  >
                    Confirm Causal Link
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* ==================================================== */}
        {/* CASE 9: K-MEANS CLUSTERING */}
        {/* ==================================================== */}
        {activeCase.caseNumber === 9 && (() => {
          const points: Point2D[] = dataset.points;
          const kResult = c9ClusterState || runKMeans2D(points, c9K, 1);

          const handleIterate = () => {
            sounds.playPinSound();
            const nextResult = runKMeans2D(points, c9K, (c9Iteration + 1) * 2);
            setC9ClusterState(nextResult);
            setC9Iteration(prev => prev + 1);
          };

          const clusterColors = ['#0284c7', '#d97706', '#9333ea', '#10b981'];

          return (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#140e09] border border-stone-800 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span>Number of Clusters (K):</span>
                  {[2, 3, 4].map(kVal => (
                    <button
                      key={kVal}
                      onClick={() => {
                        setC9K(kVal);
                        setC9Iteration(0);
                        setC9ClusterState(runKMeans2D(points, kVal, 1));
                      }}
                      className={`px-2.5 py-1 rounded font-bold ${
                        c9K === kVal ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-300'
                      }`}
                    >
                      K = {kVal}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-stone-400">Iterations: {c9Iteration}</span>
                  <button
                    onClick={handleIterate}
                    className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Run K-Means Iteration</span>
                  </button>
                </div>
              </div>

              {/* 2D Scatter Grid of Clusters */}
              <div className="relative w-full h-80 rounded-xl bg-[#120c08] border border-stone-800 p-4 overflow-hidden font-mono text-[10px]">
                <div className="absolute top-2 left-2 text-stone-500">Y: Contraband Value ($k)</div>
                <div className="absolute bottom-2 right-2 text-stone-500">X: Harbor Distance (km)</div>

                {/* SVG Point plot */}
                <svg className="w-full h-full">
                  {/* Grid Lines */}
                  <line x1="0" y1="90%" x2="100%" y2="90%" stroke="#261b13" strokeWidth="1" />
                  <line x1="10%" y1="0" x2="10%" y2="100%" stroke="#261b13" strokeWidth="1" />

                  {/* Render Cluster Centroids */}
                  {kResult.centroids.map((c: any, cIdx: number) => {
                    const cx = `${(c.x / 30) * 85 + 10}%`;
                    const cy = `${90 - (c.y / 100) * 80}%`;
                    return (
                      <g key={cIdx}>
                        <circle cx={cx} cy={cy} r="10" fill="none" stroke={clusterColors[cIdx]} strokeWidth="2.5" strokeDasharray="3 3" />
                        <text x={cx} y={cy} fill={clusterColors[cIdx]} fontSize="9" textAnchor="middle" dy="3" fontWeight="bold">
                          C{cIdx + 1}
                        </text>
                      </g>
                    );
                  })}

                  {/* Render Points */}
                  {points.map((p, idx) => {
                    // Find assigned cluster
                    let assignedCluster = 0;
                    Object.entries(kResult.clusters).forEach(([cIdx, pts]: [string, any]) => {
                      if (pts.some((pt: any) => pt.id === p.id)) assignedCluster = Number(cIdx);
                    });

                    const px = `${(p.x / 30) * 85 + 10}%`;
                    const py = `${90 - (p.y / 100) * 80}%`;

                    return (
                      <g key={idx}>
                        <circle cx={px} cy={py} r="6" fill={clusterColors[assignedCluster]} />
                        <text x={px} y={py} dx="8" dy="3" fill="#cbd5e1" fontSize="9">
                          {p.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {c9K === 3 && c9Iteration >= 2 && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-200">
                    K-Means converged! The luxury high-value ring (Cluster 3) is operated by Madame Vivienne Vane at its center!
                  </span>
                  <button
                    onClick={handleCompleteTask}
                    className="py-1.5 px-4 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold"
                  >
                    Confirm Ring Leader
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* ==================================================== */}
        {/* CASE 10: DATA VISUALIZATION ETHICS */}
        {/* ==================================================== */}
        {activeCase.caseNumber === 10 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#140e09] border border-stone-800 font-mono text-xs">
              <span className="text-stone-300">
                Current View: <strong className={c10ZeroBaseline ? 'text-emerald-400' : 'text-red-400'}>
                  {c10ZeroBaseline ? 'Honest Scale (Zero Baseline 0-110 PPM)' : 'Deceptive Scale (Truncated Y-Axis 90-105 PPM)'}
                </strong>
              </span>
              <button
                onClick={() => {
                  sounds.playTypewriter();
                  setC10ZeroBaseline(prev => !prev);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-600 text-white font-bold uppercase tracking-wider"
              >
                {c10ZeroBaseline ? 'Show Manipulated Court Chart' : 'Restore Zero Baseline'}
              </button>
            </div>

            {/* Dynamic Graph */}
            <div className="h-64 rounded-xl bg-[#120c08] border border-stone-800 p-6 flex flex-col justify-between font-mono text-xs">
              <div className="flex justify-between text-stone-500 text-[10px]">
                <span>Y-Axis: {c10ZeroBaseline ? '0 to 110 PPM' : '90 to 105 PPM (TRUNCATED)'}</span>
                <span>Threshold Safe Limit: 25 PPM</span>
              </div>

              {/* Bar comparison */}
              <div className="h-44 flex items-end justify-between gap-4 pt-4 border-b border-stone-700">
                {dataset.months.map((m: string, idx: number) => {
                  const ppm = dataset.actualPPM[idx];
                  let barHeightPercent = 0;
                  if (c10ZeroBaseline) {
                    barHeightPercent = (ppm / 110) * 100;
                  } else {
                    barHeightPercent = Math.max(5, ((ppm - 90) / 15) * 100);
                  }

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <span className="text-[10px] text-stone-400">{ppm} PPM</span>
                      <div
                        style={{ height: `${barHeightPercent}%` }}
                        className={`w-full rounded-t transition-all duration-500 ${
                          ppm > 25 ? 'bg-red-600' : 'bg-emerald-600'
                        }`}
                      />
                      <span className="text-[11px] text-stone-300 font-bold">{m}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {c10ZeroBaseline && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/60 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-200">
                  Deception exposed! Restoring the zero baseline reveals toxic effluent surged by 400% in June! Harold Sterling's defense is demolished.
                </span>
                <button
                  onClick={handleCompleteTask}
                  className="py-1.5 px-4 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold"
                >
                  Indict Harold Sterling
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* CASE 11: MACHINE LEARNING CLASSIFIER */}
        {/* ==================================================== */}
        {activeCase.caseNumber === 11 && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-[#140e09] border border-stone-800 font-mono text-xs space-y-3">
              <span className="text-amber-300 font-bold block uppercase">Decision Rule Classification Model</span>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <span>If Weather ==</span>
                  <select
                    value={c11WeatherRule}
                    onChange={(e) => setC11WeatherRule(e.target.value)}
                    className="p-1.5 rounded bg-stone-900 border border-stone-700 text-amber-200"
                  >
                    <option value="Foggy">Foggy</option>
                    <option value="Rainy">Rainy</option>
                    <option value="Clear">Clear</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span>AND Guards &lt;</span>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={c11GuardsRule}
                    onChange={(e) => setC11GuardsRule(Number(e.target.value))}
                    className="w-16 p-1 rounded bg-stone-900 border border-stone-700 text-amber-200"
                  />
                </div>

                <span className="text-emerald-400 font-bold">→ Strike Target = YES</span>
              </div>
            </div>

            {/* Test Candidates */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              {dataset.testCandidates.map((cand: any) => {
                const isMatch = cand.weather === c11WeatherRule && cand.guards < c11GuardsRule;

                return (
                  <div
                    key={cand.id}
                    onClick={() => setC11InferenceTarget(cand.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      cand.id === 'Target-B' && isMatch
                        ? 'bg-red-950/70 border-red-500 text-red-200 ring-2 ring-red-500'
                        : 'bg-stone-900 border-stone-800 text-stone-300'
                    }`}
                  >
                    <div className="font-bold text-sm text-amber-200 mb-1">{cand.name}</div>
                    <div>Weather: {cand.weather}</div>
                    <div>Guards: {cand.guards}</div>
                    <div>Alarm: {cand.alarm}</div>
                    <div className="mt-2 pt-2 border-t border-stone-800 font-bold">
                      Predicted: <span className={isMatch ? 'text-red-400' : 'text-stone-500'}>{isMatch ? 'HIGH STRIKE PROBABILITY' : 'Low Risk'}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {c11WeatherRule === 'Foggy' && c11GuardsRule === 3 && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/60 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-200">
                  Classifier Prediction Verified: Target B (City Gold Exchange) is predicted for tonight's heist! Deploy ambush!
                </span>
                <button
                  onClick={handleCompleteTask}
                  className="py-1.5 px-4 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold"
                >
                  Deploy Ambush at Target B
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* CASE 12: SAMPLING BIAS */}
        {/* ==================================================== */}
        {activeCase.caseNumber === 12 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#140e09] border border-stone-800 font-mono text-xs">
              <span className="text-stone-300">
                Active Dataset: <strong className={c12SampleType === 'representative' ? 'text-emerald-400' : 'text-red-400'}>
                  {c12SampleType === 'representative' ? 'Stratified Random Tollway Sample (N=1,000)' : 'Gate 4 Convenience Survey (N=100 Fans)'}
                </strong>
              </span>
              <button
                onClick={() => {
                  sounds.playTypewriter();
                  setC12SampleType(prev => prev === 'biased' ? 'representative' : 'biased');
                }}
                className="px-3.5 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-600 text-white font-bold uppercase tracking-wider"
              >
                {c12SampleType === 'biased' ? 'Switch to Stratified Random Tollway Sample' : 'Switch back to Biased Convenience Sample'}
              </button>
            </div>

            {/* Distribution View */}
            <div className="p-5 rounded-xl bg-[#120c08] border border-stone-800 font-mono text-xs space-y-3">
              {(c12SampleType === 'biased' ? dataset.biasedSample : dataset.representativeSample).map((row: any, idx: number) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-stone-300">{row.color}</span>
                    <span className="text-amber-400 font-bold">{row.percentage} ({row.count})</span>
                  </div>
                  <div className="w-full h-4 rounded bg-stone-900 overflow-hidden">
                    <div
                      style={{ width: row.percentage }}
                      className={`h-full ${row.color.includes('Red') ? 'bg-red-600' : 'bg-sky-600'}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {c12SampleType === 'representative' && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/60 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-200">
                  Sampling bias eliminated! The representative data proves red sports cars make up only 5% of traffic, while Midnight Black SUVs account for 45%, matching Senator Hayes!
                </span>
                <button
                  onClick={handleCompleteTask}
                  className="py-1.5 px-4 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold"
                >
                  Clear Innocent Red Car
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* CASE 13: OVERFITTING & GENERALIZATION */}
        {/* ==================================================== */}
        {activeCase.caseNumber === 13 && (() => {
          const currentConfig = dataset.degrees.find((d: any) => d.degree === c13Degree) || dataset.degrees[1];

          return (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#140e09] border border-stone-800 font-mono text-xs space-y-3">
                <div className="flex justify-between">
                  <span className="text-stone-400">Polynomial Model Complexity: Degree {c13Degree}</span>
                  <span className={c13Degree === 2 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                    {currentConfig.status}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={c13Degree}
                  onChange={(e) => {
                    const closest = [1, 2, 3, 5, 8].reduce((prev, curr) => 
                      Math.abs(curr - Number(e.target.value)) < Math.abs(prev - Number(e.target.value)) ? curr : prev
                    );
                    setC13Degree(closest);
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Loss Metrics */}
              <div className="grid grid-cols-2 gap-4 font-mono text-center">
                <div className="p-4 rounded-xl bg-[#170e08] border border-stone-800">
                  <span className="text-xs text-stone-500 block uppercase">Training Error (On Past Data)</span>
                  <span className="text-2xl font-black text-amber-300 block my-1">{currentConfig.trainError}%</span>
                  <span className="text-[10px] text-stone-400">Memorizing historical noise</span>
                </div>
                <div className="p-4 rounded-xl bg-[#170e08] border border-stone-800">
                  <span className="text-xs text-stone-500 block uppercase">Real-World Test Error (On Intruder)</span>
                  <span className={`text-2xl font-black block my-1 ${
                    currentConfig.testError <= 15 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {currentConfig.testError}%
                  </span>
                  <span className="text-[10px] text-stone-400">Generalization performance</span>
                </div>
              </div>

              {c13Degree === 2 && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-200">
                    Optimal generalization achieved! Lowering complexity to Degree 2 minimised real-world test error and caught Lucas Bennett!
                  </span>
                  <button
                    onClick={handleCompleteTask}
                    className="py-1.5 px-4 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold"
                  >
                    Confirm Model Fix
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* ==================================================== */}
        {/* CASE 14: BIAS-VARIANCE TRADEOFF */}
        {/* ==================================================== */}
        {activeCase.caseNumber === 14 && (() => {
          const bv = calculateBiasVariance(c14Capacity);

          return (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#140e09] border border-stone-800 font-mono text-xs space-y-3">
                <div className="flex justify-between">
                  <span className="text-stone-400">Model Capacity Slider: {c14Capacity}</span>
                  <span className={c14Capacity === 5 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {bv.status}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={c14Capacity}
                  onChange={(e) => setC14Capacity(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Bias-Variance Decomposed Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-center text-xs">
                <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                  <span className="text-stone-500 block">Bias² (Underfitting)</span>
                  <span className="text-base font-bold text-amber-300">{bv.biasSq}</span>
                </div>
                <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                  <span className="text-stone-500 block">Variance (Sensitivity)</span>
                  <span className="text-base font-bold text-sky-300">{bv.variance}</span>
                </div>
                <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                  <span className="text-stone-500 block">Irreducible Noise (σ²)</span>
                  <span className="text-base font-bold text-stone-400">{bv.noise}</span>
                </div>
                <div className={`p-3 rounded-lg border ${
                  c14Capacity === 5 ? 'bg-emerald-950 border-emerald-600 text-emerald-300' : 'bg-red-950 border-red-700 text-red-300'
                }`}>
                  <span className="block font-bold">Total Error</span>
                  <span className="text-base font-black">{bv.totalError}</span>
                </div>
              </div>

              {c14Capacity === 5 && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-200">
                    Tradeoff Sweet Spot Located! Total Error reaches its minimum at Capacity 5, neutralizing Ivan Morozov's disguise attack!
                  </span>
                  <button
                    onClick={handleCompleteTask}
                    className="py-1.5 px-4 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold"
                  >
                    Lock Optimal Capacity
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* ==================================================== */}
        {/* CASE 15: THE MASTERMIND (5-STAGE PIPELINE) */}
        {/* ==================================================== */}
        {activeCase.caseNumber === 15 && (
          <div className="space-y-6 font-mono text-xs">
            <span className="text-amber-300 font-bold block uppercase">
              End-to-End Data Science Investigation Pipeline
            </span>

            <div className="space-y-3">
              {dataset.pipelineStages.map((st: any, idx: number) => {
                const isCompleted = c15Stages[idx];

                return (
                  <div
                    key={st.id}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                      isCompleted ? 'bg-emerald-950/40 border-emerald-600 text-emerald-200' : 'bg-stone-900 border-stone-800 text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-stone-800 flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="font-bold block text-sm">{st.title}</span>
                        <span className="text-[11px] text-stone-400">{st.task}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        sounds.playPinSound();
                        setC15Stages(prev => {
                          const next = [...prev];
                          next[idx] = true;
                          return next;
                        });
                      }}
                      className={`px-3 py-1.5 rounded font-bold uppercase tracking-wider ${
                        isCompleted ? 'bg-emerald-800 text-white cursor-default' : 'bg-amber-700 hover:bg-amber-600 text-white'
                      }`}
                    >
                      {isCompleted ? 'Verified ✓' : 'Execute Stage'}
                    </button>
                  </div>
                );
              })}
            </div>

            {c15Stages.every(Boolean) && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-red-950 to-amber-950 border border-red-600 flex items-center justify-between text-xs">
                <span className="text-amber-200 font-bold">
                  All 5 Data Science Pipeline stages verified! Lord Sterling Thorne is unequivocally identified as "The Cipher"!
                </span>
                <button
                  onClick={handleCompleteTask}
                  className="py-2 px-5 rounded-lg bg-red-700 hover:bg-red-600 text-white font-bold uppercase tracking-wider shadow-lg"
                >
                  Unmask The Cipher
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Accusation Callout */}
      {isDsTaskSolved && (
        <div className="mt-6 p-4 rounded-xl bg-[#24170e] border border-[#4d321d] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Data Analysis verified! Proceed to the Accusation Chamber to make your formal indictment.</span>
          </div>
          <button
            onClick={() => setActiveTab('accusation')}
            className="py-2 px-4 rounded-lg bg-red-700 hover:bg-red-600 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
          >
            <span>Go to Accusation Chamber</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
