import React from 'react';
import { getEcoBadge } from '../utils/calculations';
import { Trophy, CheckCircle, Calendar, ArrowRight, Heart } from 'lucide-react';

export default function Progress({ greenPoints, completedChallengeCount, lastSavedResult, lastSavedDate, setActiveTab }) {
  const badge = getEcoBadge(lastSavedResult ? lastSavedResult.ecoScore : 50);

  const formatSavedDate = (dateStr) => {
    if (!dateStr) return 'No records';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' at ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 space-y-10 animate-slide-up text-left">
      
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">My Progress & Achievements</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Track your growth, points, and carbon offset milestones.</p>
      </div>

      {/* Grid: Badge status card vs. Stats grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Large Badge Showcase */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-md flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="block text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Your Current Level</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Eco Status</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Calculated based on your last carbon footprint evaluation.</p>
          </div>

          {/* Graphical badge pill */}
          <div className={`p-6 rounded-3xl bg-gradient-to-br ${badge.color} border flex flex-col items-center justify-center text-center space-y-4 shadow-xs`}>
            <div className="p-3 bg-white/20 dark:bg-black/20 rounded-full">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight">{badge.text}</span>
              <p className="text-xs mt-1.5 opacity-90 leading-relaxed max-w-xs">{badge.description}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 flex items-start gap-2.5">
            <Heart className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Every challenge you complete and every gram of carbon you mitigate is a direct contribution to preserving our biosphere. Great job!
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Stats Tally & Last Footprint */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Tally cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 bg-slate-900 dark:bg-slate-950 text-white rounded-3xl flex items-center justify-between shadow-md">
              <div className="space-y-1">
                <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Total Green Points</span>
                <span className="text-3xl font-extrabold font-mono">{greenPoints}</span>
              </div>
              <div className="p-3 bg-emerald-500 text-white rounded-2xl">
                <Trophy className="w-6 h-6" />
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-md flex items-center justify-between">
              <div className="space-y-1">
                <span className="block text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider font-sans">Completed Tasks</span>
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">{completedChallengeCount}</span>
              </div>
              <div className="p-3 bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 rounded-2xl">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Last Footprint block */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-50 dark:border-slate-850 pb-4">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Last Saved Footprint</h4>
                <div className="flex items-center gap-1 text-slate-400 dark:text-slate-550 text-xs mt-0.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatSavedDate(lastSavedDate)}</span>
                </div>
              </div>
              
              {lastSavedResult && (
                <div className="text-right">
                  <span className="block font-black text-xl text-slate-900 dark:text-white font-mono">{lastSavedResult.total} <span className="text-xs text-slate-400 font-bold">kg CO2</span></span>
                  <span className="block text-[10px] text-slate-400 dark:text-slate-550 font-bold uppercase tracking-wider">Score: {lastSavedResult.ecoScore}/100</span>
                </div>
              )}
            </div>

            {lastSavedResult ? (
              <div className="space-y-4">
                {/* Visual mini progress bars */}
                <ul className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { name: 'Travel', value: lastSavedResult.travel, color: 'bg-emerald-500', text: 'text-emerald-500' },
                    { name: 'Power', value: lastSavedResult.electricity, color: 'bg-amber-500', text: 'text-amber-500' },
                    { name: 'Food', value: lastSavedResult.food, color: 'bg-teal-500', text: 'text-teal-500' },
                    { name: 'Shopping', value: lastSavedResult.shopping, color: 'bg-indigo-500', text: 'text-indigo-500' },
                    { name: 'Waste', value: lastSavedResult.waste, color: 'bg-rose-500', text: 'text-rose-500' }
                  ].map((item, idx) => (
                    <li key={idx} className="p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-800/50 rounded-2xl flex flex-col justify-between">
                      <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">{item.name}</span>
                      <span className="block font-extrabold text-sm text-slate-800 dark:text-slate-200 mt-1 font-mono">{item.value} <span className="text-[9px] font-bold text-slate-400">kg</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="p-8 text-center space-y-4 bg-slate-50 dark:bg-slate-950/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">No carbon footprint logs saved yet.</p>
                <button
                  onClick={() => setActiveTab('calculator')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1.5 transition-all w-fit mx-auto cursor-pointer"
                >
                  Start Calculator
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Sustainable Benchmark Comparisons Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-md space-y-6">
        <h4 className="font-bold text-slate-900 dark:text-white text-base">Carbon Footprint Benchmarks</h4>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed">
          How does your footprint compare to critical baselines? The global average needs to drop significantly to combat catastrophic warming.
        </p>

        <ul className="space-y-6 pt-2">
          {[
            { 
              name: 'Sustainable Climate Standard Target', 
              val: '150 kg CO2 / month', 
              desc: 'The ideal target footprint per person to limit global temperature rise to under 1.5°C.',
              width: '25%', 
              color: 'bg-emerald-500'
            },
            { 
              name: 'Your Last Footprint Result', 
              val: lastSavedResult ? `${lastSavedResult.total} kg CO2 / month` : 'N/A', 
              desc: 'Your last carbon computation based on daily habits and utility consumption.',
              width: lastSavedResult ? `${Math.min(100, (lastSavedResult.total / 800) * 100)}%` : '0%',
              color: 'bg-indigo-500'
            },
            { 
              name: 'Global Average Footprint (Per Person)', 
              val: '333 kg CO2 / month', 
              desc: 'The current average monthly footprint per person worldwide (~4,000 kg annually).',
              width: '55%', 
              color: 'bg-amber-500'
            },
            { 
              name: 'Typical High Carbon Footprint', 
              val: '650+ kg CO2 / month', 
              desc: 'Typical of individuals residing in developed nations with heavy solo commuting and energy use.',
              width: '90%', 
              color: 'bg-rose-500'
            }
          ].map((bench, idx) => (
            <li key={idx} className="space-y-1">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center text-xs font-semibold text-slate-700 dark:text-slate-350">
                <span>{bench.name}</span>
                <span className="font-mono text-slate-900 dark:text-white">{bench.val}</span>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-snug">{bench.desc}</p>
              <div className="w-full h-2 bg-slate-50 dark:bg-slate-950 border border-slate-100/50 dark:border-slate-800/60 rounded-full overflow-hidden mt-1">
                <div className={`h-full ${bench.color} rounded-full`} style={{ width: bench.width }}></div>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
