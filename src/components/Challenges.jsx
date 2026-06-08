import React from 'react';
import { CheckCircle2, Award, Zap, RotateCcw, AlertCircle } from 'lucide-react';

export default function Challenges({ completedIds, onCompleteChallenge, onResetChallenges, greenPoints }) {
  const [filter, setFilter] = React.useState('all'); // all, active, completed
  const [toastMessage, setToastMessage] = React.useState(null);

  const challenges = [
    {
      id: 'public-transport',
      title: "Use public transport twice this week",
      desc: "Swap solo car driving with bus, metro, or shared pooling twice.",
      difficulty: 'Medium',
      points: 100
    },
    {
      id: 'switch-lights',
      title: "Switch off unused lights daily",
      desc: "Form a habit of shutting down bulbs/fans when exiting unoccupied rooms.",
      difficulty: 'Easy',
      points: 50
    },
    {
      id: 'reusable-bottle',
      title: "Carry a reusable water bottle",
      desc: "Keep a stainless steel or glass bottle with you to bypass buying plastic bottles.",
      difficulty: 'Easy',
      points: 40
    },
    {
      id: 'avoid-bags',
      title: "Avoid plastic bags for 7 days",
      desc: "Bring canvas totes or net bags for grocery shopping for a week.",
      difficulty: 'Medium',
      points: 150
    },
    {
      id: 'plant-based-meal',
      title: "Eat one plant-based meal",
      desc: "Replace meat/dairy in a main meal with beans, tofu, or grains.",
      difficulty: 'Easy',
      points: 60
    },
    {
      id: 'recycle-waste',
      title: "Recycle paper and plastic waste",
      desc: "Clean, dry, and segregate recyclable items instead of disposing in trash bins.",
      difficulty: 'Medium',
      points: 80
    }
  ];

  const handleComplete = (id, points, title) => {
    onCompleteChallenge(id, points);
    setToastMessage(`Completed: "${title}" (+${points} Pts)`);
    
    // Clear toast after 3 seconds
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const completedCount = challenges.filter(c => completedIds.includes(c.id)).length;
  const totalPointsPotential = challenges.reduce((acc, c) => acc + c.points, 0);

  const filteredChallenges = challenges.filter(c => {
    const isCompleted = completedIds.includes(c.id);
    if (filter === 'active') return !isCompleted;
    if (filter === 'completed') return isCompleted;
    return true;
  });

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 space-y-8 animate-slide-up relative">
      
      {/* Toast Notification for completes */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-slide-up flex items-center gap-2.5 px-4 py-3 bg-slate-900 dark:bg-slate-950 text-white rounded-2xl shadow-xl border border-slate-800">
          <Award className="w-5 h-5 text-emerald-400 animate-bounce" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6 text-left">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Eco Challenges</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Complete real-world tasks to lower emissions and build sustainable habits.
          </p>
        </div>

        <button
          onClick={onResetChallenges}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all flex items-center gap-1.5 text-xs w-fit cursor-pointer"
          title="Reset completed challenges state and points"
          aria-label="Reset completed challenges state and points"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Challenges
        </button>
      </div>

      {/* Stats Summary Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-xs flex items-center gap-4 text-left">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Completed Tasks</span>
            <span className="text-2xl font-extrabold text-slate-950 dark:text-white font-mono">{completedCount} <span className="text-xs text-slate-400 font-normal">/ {challenges.length}</span></span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-xs flex items-center gap-4 text-left">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Green Points Earned</span>
            <span className="text-2xl font-extrabold text-slate-950 dark:text-white font-mono">{greenPoints} <span className="text-xs text-slate-400 font-normal">Pts</span></span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-xs flex items-center gap-4 text-left">
          <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Available Potential</span>
            <span className="text-2xl font-extrabold text-slate-950 dark:text-white font-mono">{totalPointsPotential} <span className="text-xs text-slate-400 font-normal">total</span></span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 border-b border-slate-100 dark:border-slate-850 pb-2" role="tablist" aria-label="Filter challenges">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            role="tab"
            aria-selected={filter === f}
            aria-label={`Show ${f} challenges`}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              filter === f
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {f} ({
              f === 'all' ? challenges.length : 
              f === 'active' ? challenges.length - completedCount : 
              completedCount
            })
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredChallenges.length === 0 && (
        <div className="p-16 text-center space-y-4 bg-slate-50 dark:bg-slate-950/20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 max-w-md mx-auto">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h4 className="text-lg font-bold text-slate-800 dark:text-slate-350">No Challenges Found</h4>
          <p className="text-xs text-slate-500">
            {filter === 'completed' ? "You haven't completed any challenges yet. Start doing them!" : "Hurrah! You have completed all available challenges!"}
          </p>
        </div>
      )}

      {/* Challenges Grid */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((item) => {
          const isDone = completedIds.includes(item.id);
          return (
            <li 
              key={item.id}
              className={`p-6 text-left rounded-3xl border bg-white dark:bg-slate-900 flex flex-col justify-between h-64 transition-all duration-300 ${
                isDone 
                  ? 'border-emerald-500/30 bg-emerald-500/[0.01] dark:border-emerald-500/20' 
                  : 'border-slate-100 dark:border-slate-800 hover:shadow-lg hover:border-slate-200 dark:hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                {/* Meta details */}
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    item.difficulty === 'Easy' 
                      ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300' 
                      : 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                  }`}>
                    {item.difficulty}
                  </span>
                  <span className="text-xs font-bold text-emerald-500 font-mono">
                    +{item.points} Pts
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-slate-950 dark:text-white leading-snug line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-50 dark:border-slate-850/60 mt-4">
                {isDone ? (
                  <div className="w-full py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-950 text-emerald-600 dark:text-emerald-300 flex items-center justify-center gap-1.5 text-sm font-semibold select-none">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Completed & Claimed
                  </div>
                ) : (
                  <button
                    onClick={() => handleComplete(item.id, item.points, item.title)}
                    aria-label={`Mark "${item.title}" challenge as complete`}
                    className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-emerald-500 text-white hover:text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    Mark as Complete
                  </button>
                )}
              </div>

            </li>
          );
        })}
      </ul>

    </div>
  );
}
