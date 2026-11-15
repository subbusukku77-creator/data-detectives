import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { BADGES, RANKS } from '../data/achievements';
import { CASE_LIST } from '../data/cases';
import { 
  Shield, 
  Award, 
  Coins, 
  TrendingUp, 
  CheckCircle2, 
  Lock, 
  User, 
  Edit2, 
  Check, 
  Calendar,
  RotateCcw
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const DetectiveProfile: React.FC = () => {
  const { profile, updatePlayerName, resetAllProgress, startCase } = useGame();
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      updatePlayerName(nameInput.trim());
      setIsEditing(false);
      sounds.playTypewriter();
    }
  };

  const completedCount = profile.completedCases.length;
  const progressPercent = Math.round((completedCount / 15) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Top Banner */}
      <div className="text-center mb-8">
        <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/60 font-mono text-xs text-amber-300 font-bold uppercase tracking-widest inline-block mb-2">
          INVESTIGATOR DOSSIER & RECORD
        </span>
        <h2 className="text-3xl font-black text-amber-100 font-display">
          Detective Service Record
        </h2>
      </div>

      {/* Main ID Dossier Card */}
      <div className="aged-paper rounded-2xl p-6 md:p-8 border-4 border-[#52341d] shadow-2xl mb-10 text-stone-900 relative">
        {/* Top Pushpin */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-red-600 border-2 border-red-900 shadow-pin flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-red-200" />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b-2 border-stone-300 pb-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3b2314] to-[#1e120a] border-2 border-amber-700/60 flex items-center justify-center text-amber-300 shadow-xl">
              <Shield className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-stone-600 block">
                Official Credential No. #DS-{String(profile.coins).padStart(4, '0')}
              </span>
              {isEditing ? (
                <form onSubmit={handleSave} className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    className="px-2.5 py-1 text-sm bg-white border border-stone-500 rounded font-bold text-stone-900 focus:outline-none"
                    autoFocus
                  />
                  <button type="submit" className="p-1.5 rounded bg-amber-700 text-white hover:bg-amber-800">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <h3 className="text-2xl font-black text-stone-900 font-display">
                    {profile.name}
                  </h3>
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      sounds.playTypewriter();
                    }}
                    className="text-stone-500 hover:text-stone-800 p-1"
                    title="Edit Name"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
              <span className="text-xs font-mono font-bold text-amber-800 uppercase mt-0.5 block">
                Rank: {profile.rank}
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 font-mono text-center w-full md:w-auto">
            <div className="p-3 rounded-xl bg-stone-200/80 border border-stone-300">
              <span className="text-[10px] text-stone-600 block">Coin Wealth</span>
              <span className="text-sm font-black text-amber-900 flex items-center justify-center gap-1">
                <Coins className="w-3.5 h-3.5 text-amber-700" /> {profile.coins}c
              </span>
            </div>
            <div className="p-3 rounded-xl bg-stone-200/80 border border-stone-300">
              <span className="text-[10px] text-stone-600 block">Investigator XP</span>
              <span className="text-sm font-black text-sky-900">{profile.xp} XP</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-200/80 border border-stone-300">
              <span className="text-[10px] text-stone-600 block">Closed Cases</span>
              <span className="text-sm font-black text-emerald-900">{completedCount} / 15</span>
            </div>
          </div>
        </div>

        {/* Syllabus Mastery Progress */}
        <div className="mb-6">
          <div className="flex justify-between font-mono text-xs text-stone-700 mb-1.5 font-bold">
            <span>Overall Data Science Syllabus Mastery</span>
            <span>{progressPercent}% Complete</span>
          </div>
          <div className="w-full h-3 rounded-full bg-stone-300 overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Rank Hierarchy Tracker */}
        <div>
          <h4 className="text-xs uppercase font-bold font-mono tracking-wider text-stone-600 mb-3">
            Rank Promotion Ladder
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 font-mono text-xs">
            {RANKS.map((r, idx) => {
              const isCurrentRank = profile.rank === r.rank;
              const isAchieved = completedCount >= r.minCases;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border transition-all ${
                    isCurrentRank
                      ? 'bg-amber-900 text-amber-100 border-amber-600 shadow-md font-bold'
                      : isAchieved
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-stone-200/60 text-stone-400 border-stone-300'
                  }`}
                >
                  <span className="text-[10px] block opacity-80">{r.minCases}-{r.maxCases} Cases</span>
                  <span className="font-bold block mt-0.5">{r.rank}</span>
                  {isCurrentRank && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500 text-black font-bold uppercase mt-1 inline-block">
                      Active Rank
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Collectible Badge Showcase (15 Badges) */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-black text-amber-100 font-display flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Collectible Data Science Badges ({profile.badges.length} / 15 Unlocked)</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {BADGES.map(badge => {
            const isUnlocked = profile.badges.includes(badge.title);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border flex flex-col justify-between text-center transition-all ${
                  isUnlocked
                    ? 'bg-[#221810] border-amber-600/70 shadow-lg shadow-amber-950/40 text-stone-200'
                    : 'bg-[#140e08]/70 border-stone-800 text-stone-600'
                }`}
              >
                <div>
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 shadow ${
                    isUnlocked ? 'bg-amber-600/30 text-amber-400 border border-amber-500' : 'bg-stone-900 text-stone-700'
                  }`}>
                    {isUnlocked ? <Award className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                  </div>

                  <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest block">
                    Case #{badge.caseNumber}
                  </span>
                  <h4 className="text-xs font-bold text-amber-100 font-typewriter mt-1">
                    {badge.title}
                  </h4>
                  <p className="text-[11px] text-amber-300/70 font-sans mt-1">
                    {badge.concept}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-800">
                  {isUnlocked ? (
                    <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] text-stone-600 font-mono">
                      Complete Case #{badge.caseNumber}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case History & Accuracies Table */}
      <div className="p-6 rounded-2xl bg-[#1b120c] border border-[#3e2716] shadow-xl">
        <h3 className="text-lg font-black text-amber-100 font-display mb-4">
          Case Investigation Logbook
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#24170e] text-amber-200 border-b border-[#3e2716]">
              <tr>
                <th className="p-2.5">Case #</th>
                <th className="p-2.5">Title</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5">Attempts</th>
                <th className="p-2.5">Date Solved</th>
                <th className="p-2.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800 bg-[#120c08]">
              {CASE_LIST.map(c => {
                const isSolved = profile.completedCases.includes(c.id);
                const acc = profile.caseAccuracies[c.id];

                return (
                  <tr key={c.id}>
                    <td className="p-2.5 font-bold text-amber-400">#{c.caseNumber}</td>
                    <td className="p-2.5 text-stone-200">{c.title}</td>
                    <td className="p-2.5">
                      {isSolved ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Closed
                        </span>
                      ) : (
                        <span className="text-stone-500">Unresolved</span>
                      )}
                    </td>
                    <td className="p-2.5">{acc ? acc.attempts : '-'}</td>
                    <td className="p-2.5 text-stone-400">{acc?.date || '-'}</td>
                    <td className="p-2.5">
                      <button
                        onClick={() => {
                          sounds.playPaperSound();
                          startCase(c.id);
                        }}
                        className="px-2.5 py-1 rounded bg-[#2b1c11] hover:bg-[#3d2719] text-amber-300 font-bold text-[11px]"
                      >
                        {isSolved ? 'Review' : 'Open'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
