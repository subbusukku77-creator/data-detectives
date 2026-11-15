import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { 
  FileText, 
  BookOpen, 
  GraduationCap, 
  Code2, 
  CheckCircle2, 
  Layers, 
  Activity, 
  Cpu, 
  Plus, 
  MessageSquare,
  Award,
  Download
} from 'lucide-react';
import { CASE_LIST } from '../data/cases';
import { sounds } from '../utils/soundEffects';

export const Documentation: React.FC = () => {
  const { playtestEntries, addPlaytestEntry } = useGame();

  const [activeDocTab, setActiveDocTab] = useState<'overview' | 'syllabus' | 'math' | 'playtesting'>('overview');

  // Playtest Form state
  const [testerName, setTesterName] = useState('');
  const [testerRole, setTesterRole] = useState('Data Science Student');
  const [caseTested, setCaseTested] = useState('Case 001: The Missing Trophy');
  const [easeRating, setEaseRating] = useState(5);
  const [learningRating, setLearningRating] = useState(5);
  const [enjoymentRating, setEnjoymentRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmitPlaytest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testerName.trim() || !feedbackText.trim()) return;

    addPlaytestEntry({
      testerName: testerName.trim(),
      role: testerRole,
      caseTested,
      easeOfUseRating: easeRating,
      learningRating,
      enjoymentRating,
      feedback: feedbackText.trim()
    });

    setFormSubmitted(true);
    setTesterName('');
    setFeedbackText('');
    sounds.playTypewriter();
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <span className="px-3 py-1 rounded-full bg-sky-950/80 border border-sky-600/60 font-mono text-xs text-sky-300 font-bold uppercase tracking-widest inline-block mb-2">
          COLLEGE-LEVEL IDSE ACADEMIC REPORT
        </span>
        <h2 className="text-3xl font-black text-amber-100 font-display">
          Academic Documentation & Specifications
        </h2>
        <p className="mt-1 text-xs text-stone-400 font-mono">
          Project: The Data Detectives | Interdisciplinary Data Science & Educational Game Engineering
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 border-b border-[#3e2716] pb-4">
        {[
          { id: 'overview', label: '1. Project Overview & Architecture', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'syllabus', label: '2. 15-Level Learning Objectives', icon: <GraduationCap className="w-4 h-4" /> },
          { id: 'math', label: '3. Data Science Computations & Math', icon: <Code2 className="w-4 h-4" /> },
          { id: 'playtesting', label: '4. Playtesting Feedback Log', icon: <MessageSquare className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sounds.playPaperSound();
              setActiveDocTab(tab.id as any);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-colors ${
              activeDocTab === tab.id
                ? 'bg-amber-700 text-white shadow-md'
                : 'bg-[#18110b] text-stone-400 hover:text-amber-200 hover:bg-[#25180f]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Project Overview */}
      {activeDocTab === 'overview' && (
        <div className="space-y-6 text-stone-300 font-sans leading-relaxed">
          <div className="p-6 rounded-2xl bg-[#1b120c] border border-[#3e2716] shadow-xl">
            <h3 className="text-lg font-black text-amber-200 font-display mb-3">
              1. Project Overview & Educational Philosophy
            </h3>
            <p className="text-xs text-stone-300 mb-4">
              <strong>"THE DATA DETECTIVES"</strong> is an interactive 2D educational mystery game engineered for college-level Interdisciplinary Data Science and Engineering (IDSE) curricula. Unlike traditional quiz systems or passive e-learning websites, this game embeds Data Science algorithms into the diegetic core of criminal investigations.
            </p>
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-600/50 font-serif italic text-amber-200 text-xs">
              "Central Thesis: Don't teach the player Data Science and then ask them to solve a mystery. Make them solve the mystery, and through that process, teach them Data Science."
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#1b120c] border border-[#3e2716] shadow-xl">
              <h4 className="text-sm font-bold font-mono text-amber-300 uppercase mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Core Game Mechanics</span>
              </h4>
              <ul className="text-xs space-y-2 text-stone-300 list-disc list-inside">
                <li><strong>Interactive Corkboard & Red Strings:</strong> Visual evidence board allowing players to inspect clues and link related nodes using SVG yarn lines.</li>
                <li><strong>Interactive Data Science Lab:</strong> Real-time computing environment executing JavaScript-based algorithmic routines.</li>
                <li><strong>Suspect Cross-Examination:</strong> Cross-referencing physical testimonies against mathematical truths.</li>
                <li><strong>Accusation & Contradiction System:</strong> Formal warrant submission evaluating deductive consistency.</li>
                <li><strong>Incentive Economy:</strong> Persistent coins (100 starting balance) and tiered informant clues.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-[#1b120c] border border-[#3e2716] shadow-xl">
              <h4 className="text-sm font-bold font-mono text-sky-300 uppercase mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sky-400" />
                <span>Technologies & Architecture</span>
              </h4>
              <ul className="text-xs space-y-2 text-stone-300 list-disc list-inside">
                <li><strong>Frontend Framework:</strong> React 19 + TypeScript with component-driven architecture.</li>
                <li><strong>Styling & Theming:</strong> Tailwind CSS with custom textures (corkboard, aged paper, pushed pins).</li>
                <li><strong>Audio Synthesis:</strong> Pure Web Audio API synthesized procedural sounds (no missing external audio files).</li>
                <li><strong>Data Processing:</strong> Real numerical arrays, statistical algorithms, and 2D K-Means in pure TypeScript.</li>
                <li><strong>Persistence:</strong> Automatic local storage state synchronization.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 15-Level Syllabus */}
      {activeDocTab === 'syllabus' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#1b120c] border border-[#3e2716] mb-4">
            <h3 className="text-base font-black text-amber-200 font-display">
              Curriculum Roadmap: 15 Cases Across 3 Difficulty Chapters
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Carefully structured pedagogical curve transitioning from basic observation to advanced supervised/unsupervised machine learning.
            </p>
          </div>

          <div className="space-y-3">
            {CASE_LIST.map(c => (
              <div key={c.id} className="p-4 rounded-xl bg-[#140e08] border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-700 flex items-center justify-center font-bold text-amber-400 shrink-0">
                    {c.caseNumber}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-200 text-sm">{c.title}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.chapter === 1 ? 'bg-blue-950 text-blue-300' : c.chapter === 2 ? 'bg-amber-950 text-amber-300' : 'bg-purple-950 text-purple-300'
                      }`}>
                        CH {c.chapter} • {c.difficulty}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 font-sans">
                      <strong>Concept:</strong> {c.dsConcept.name} — {c.dsConcept.description}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-emerald-400 font-bold block">
                    Badge: {c.learningReport.badgeTitle}
                  </span>
                  <span className="text-[10px] text-amber-400">+{c.rewardCoins} coins / +{c.rewardXp} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Mathematical Computations */}
      {activeDocTab === 'math' && (
        <div className="space-y-6 text-stone-300 font-sans text-xs">
          <div className="p-6 rounded-2xl bg-[#1b120c] border border-[#3e2716] shadow-xl">
            <h3 className="text-lg font-black text-amber-200 font-display mb-2">
              Mathematical Formulations & Algorithmic Implementation
            </h3>
            <p className="text-stone-400 mb-6 font-mono text-[11px]">
              Every case executes mathematically sound data operations computed client-side.
            </p>

            <div className="space-y-6">
              {/* Formula 1: Mean vs Median */}
              <div className="p-4 rounded-xl bg-[#140e08] border border-stone-800 font-mono">
                <h4 className="text-amber-400 font-bold text-xs uppercase mb-1">
                  1. Measures of Central Tendency & Outlier Sensitivity
                </h4>
                <p className="text-[11px] text-stone-400 mb-2">
                  Arithmetic Mean: μ = (1/n) Σ x_i. Median: Middle value of ordered set.
                </p>
                <div className="p-2.5 rounded bg-black/60 text-amber-200 text-[11px]">
                  Sensitivity Theorem: When an extreme value x_outlier &gt;&gt; μ is introduced, Δμ = (x_outlier - μ_prev) / n, whereas ΔMedian ≈ 0 if n is sufficiently large.
                </div>
              </div>

              {/* Formula 2: IQR */}
              <div className="p-4 rounded-xl bg-[#140e08] border border-stone-800 font-mono">
                <h4 className="text-amber-400 font-bold text-xs uppercase mb-1">
                  2. Tukey's Interquartile Range (IQR) Outlier Fences
                </h4>
                <p className="text-[11px] text-stone-400 mb-2">
                  IQR = Q3 - Q1 (Difference between 75th and 25th percentiles).
                </p>
                <div className="p-2.5 rounded bg-black/60 text-amber-200 text-[11px]">
                  Upper Fence = Q3 + 1.5 × IQR | Lower Fence = Q1 - 1.5 × IQR. Any observation x &gt; Upper Fence is a statistical outlier.
                </div>
              </div>

              {/* Formula 3: Pearson r */}
              <div className="p-4 rounded-xl bg-[#140e08] border border-stone-800 font-mono">
                <h4 className="text-amber-400 font-bold text-xs uppercase mb-1">
                  3. Pearson Product-Moment Correlation (r)
                </h4>
                <p className="text-[11px] text-stone-400 mb-2">
                  Linear association between paired continuous variables X and Y.
                </p>
                <div className="p-2.5 rounded bg-black/60 text-amber-200 text-[11px]">
                  r = [ Σ(x_i - x̄)(y_i - ȳ) ] / [ √(Σ(x_i - x̄)²) · √(Σ(y_i - ȳ)²) ], with -1 ≤ r ≤ +1.
                </div>
              </div>

              {/* Formula 4: K-Means */}
              <div className="p-4 rounded-xl bg-[#140e08] border border-stone-800 font-mono">
                <h4 className="text-amber-400 font-bold text-xs uppercase mb-1">
                  4. K-Means Clustering Objective Function
                </h4>
                <p className="text-[11px] text-stone-400 mb-2">
                  Minimizes within-cluster sum of squares (WCSS).
                </p>
                <div className="p-2.5 rounded bg-black/60 text-amber-200 text-[11px]">
                  J = Σ_(k=1)^K Σ_(x ∈ S_k) || x - μ_k ||². Centroid update: μ_k = (1/|S_k|) Σ_(x ∈ S_k) x.
                </div>
              </div>

              {/* Formula 5: Bias-Variance */}
              <div className="p-4 rounded-xl bg-[#140e08] border border-stone-800 font-mono">
                <h4 className="text-amber-400 font-bold text-xs uppercase mb-1">
                  5. The Bias-Variance Error Decomposition
                </h4>
                <p className="text-[11px] text-stone-400 mb-2">
                  Expected Generalization Error of a statistical regression or classification estimator.
                </p>
                <div className="p-2.5 rounded bg-black/60 text-amber-200 text-[11px]">
                  E[(y - f̂(x))²] = (Bias[f̂(x)])² + Var[f̂(x)] + σ²_noise.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Playtesting Feedback Log */}
      {activeDocTab === 'playtesting' && (
        <div className="space-y-6">
          {/* Submission Form */}
          <div className="aged-paper rounded-2xl p-6 border-4 border-[#52341d] text-stone-900 shadow-xl">
            <h3 className="text-base font-black font-typewriter text-stone-900 mb-1 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-800" />
              <span>Submit College Playtesting Evaluation</span>
            </h3>
            <p className="text-xs text-stone-600 mb-4 font-serif">
              Document playtest feedback from classmates and peers who tested "The Data Detectives".
            </p>

            {formSubmitted && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-100 border border-emerald-400 text-emerald-900 text-xs font-mono font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Playtesting feedback recorded successfully into academic ledger!</span>
              </div>
            )}

            <form onSubmit={handleSubmitPlaytest} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-stone-700 block mb-1 font-bold">Tester Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Verma"
                    value={testerName}
                    onChange={e => setTesterName(e.target.value)}
                    className="w-full p-2 rounded bg-white border border-stone-400 text-stone-900"
                  />
                </div>

                <div>
                  <label className="text-stone-700 block mb-1 font-bold">Role / Major</label>
                  <select
                    value={testerRole}
                    onChange={e => setTesterRole(e.target.value)}
                    className="w-full p-2 rounded bg-white border border-stone-400 text-stone-900"
                  >
                    <option value="Data Science Student">Data Science Student</option>
                    <option value="IDSE Peer">IDSE Peer</option>
                    <option value="Computer Science Undergrad">Computer Science Undergrad</option>
                    <option value="Faculty / Instructor">Faculty / Instructor</option>
                  </select>
                </div>

                <div>
                  <label className="text-stone-700 block mb-1 font-bold">Case Tested</label>
                  <select
                    value={caseTested}
                    onChange={e => setCaseTested(e.target.value)}
                    className="w-full p-2 rounded bg-white border border-stone-400 text-stone-900"
                  >
                    {CASE_LIST.map(c => (
                      <option key={c.id} value={`Case ${String(c.caseNumber).padStart(3, '0')}: ${c.title}`}>
                        Case {String(c.caseNumber).padStart(3, '0')}: {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3 Rating Scales */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded bg-stone-200/70 border border-stone-300">
                  <label className="text-stone-700 block font-bold mb-1">Ease of Use: {easeRating}/5</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={easeRating}
                    onChange={e => setEaseRating(Number(e.target.value))}
                    className="w-full accent-amber-700 cursor-pointer"
                  />
                </div>

                <div className="p-3 rounded bg-stone-200/70 border border-stone-300">
                  <label className="text-stone-700 block font-bold mb-1">Learning Value: {learningRating}/5</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={learningRating}
                    onChange={e => setLearningRating(Number(e.target.value))}
                    className="w-full accent-amber-700 cursor-pointer"
                  />
                </div>

                <div className="p-3 rounded bg-stone-200/70 border border-stone-300">
                  <label className="text-stone-700 block font-bold mb-1">Enjoyment / Mystery: {enjoymentRating}/5</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={enjoymentRating}
                    onChange={e => setEnjoymentRating(Number(e.target.value))}
                    className="w-full accent-amber-700 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-700 block mb-1 font-bold">Detailed Qualitative Feedback</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your investigative experience, clarity of data science concepts, and visual immersion..."
                  value={feedbackText}
                  onChange={e => setFeedbackText(e.target.value)}
                  className="w-full p-2.5 rounded bg-white border border-stone-400 text-stone-900 font-sans"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-6 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-200 font-bold uppercase tracking-wider font-display transition-colors"
              >
                Log Playtest Feedback
              </button>
            </form>
          </div>

          {/* Log Table of Recorded Playtests */}
          <div className="p-6 rounded-2xl bg-[#1b120c] border border-[#3e2716] shadow-xl">
            <h3 className="text-base font-black text-amber-200 font-display mb-3">
              Recorded Playtesting Logs ({playtestEntries.length} Evaluations)
            </h3>

            <div className="space-y-3 font-mono text-xs">
              {playtestEntries.map(entry => (
                <div key={entry.id} className="p-4 rounded-xl bg-[#140e08] border border-stone-800 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-300 text-sm">{entry.testerName}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-400">{entry.role}</span>
                    </div>
                    <span className="text-[10px] text-stone-500">{entry.timestamp}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-400">
                    <span><strong>Case:</strong> {entry.caseTested}</span>
                    <span>Ease: <strong className="text-amber-400">{entry.easeOfUseRating}/5</strong></span>
                    <span>Learning: <strong className="text-emerald-400">{entry.learningRating}/5</strong></span>
                    <span>Mystery: <strong className="text-sky-400">{entry.enjoymentRating}/5</strong></span>
                  </div>

                  <p className="text-stone-300 font-sans text-xs italic">
                    "{entry.feedback}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
