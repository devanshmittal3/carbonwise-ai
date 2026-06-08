import React from 'react';
import { getEcoBadge } from '../utils/calculations';
import { 
  Car, Lightbulb, ChefHat, ShoppingBag, 
  Trash2, Trophy, ArrowRight, RefreshCw, Compass
} from 'lucide-react';
import Recommendations from './Recommendations';

export default function Dashboard({ results, inputs, onReset, setActiveTab }) {
  if (!results) {
    return (
      <div className="flex-1 w-full max-w-md mx-auto px-4 py-20 text-center space-y-6 animate-slide-up">
        <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 w-fit mx-auto">
          <Car className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">No Footprint Saved</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Please fill out the Carbon Footprint Calculator first to generate your eco stats.
        </p>
        <button
          onClick={() => setActiveTab('calculator')}
          className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold shadow-md hover:bg-emerald-600 transition-all cursor-pointer inline-flex items-center gap-1.5"
        >
          Go to Calculator
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const { travel, electricity, food, shopping, waste, total, ecoScore } = results;
  const badge = getEcoBadge(ecoScore);

  // SVG Gauge calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (ecoScore / 100) * circumference;

  const categories = [
    { name: 'Travel & Commute', value: travel, color: 'bg-emerald-500', text: 'text-emerald-500', icon: <Car className="w-5 h-5" /> },
    { name: 'Home Electricity', value: electricity, color: 'bg-amber-500', text: 'text-amber-500', icon: <Lightbulb className="w-5 h-5" /> },
    { name: 'Diet & Nutrition', value: food, color: 'bg-teal-500', text: 'text-teal-500', icon: <ChefHat className="w-5 h-5" /> },
    { name: 'Shopping & Goods', value: shopping, color: 'bg-indigo-500', text: 'text-indigo-500', icon: <ShoppingBag className="w-5 h-5" /> },
    { name: 'Waste Disposal', value: waste, color: 'bg-rose-500', text: 'text-rose-500', icon: <Trash2 className="w-5 h-5" /> }
  ];

  // Find maximum category value for relative bar widths
  const maxVal = Math.max(...categories.map(c => c.value), 1);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 space-y-10 animate-slide-up">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="text-left">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Eco Footprint Dashboard</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Real-time category breakdown and sustainability scoring.</p>
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all flex items-center gap-2 text-sm cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Recalculate
        </button>
      </div>

      {/* Grid: Gauge score card vs. Category breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Radial Score Gauge Card */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-md flex flex-col items-center justify-center text-center space-y-6">
          <span className="font-bold text-slate-800 dark:text-slate-100 text-lg">Your Eco Score</span>

          {/* Radial Circle Progress */}
          <div className="relative flex items-center justify-center">
            {/* SVG circle */}
            <svg className="w-40 h-40 transform -rotate-90">
              {/* Background track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Active track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-emerald-500 transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{ecoScore}</span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-0.5">out of 100</span>
            </div>
          </div>

          {/* Badge indicator banner */}
          <div className={`w-full p-4 rounded-2xl border text-center ${badge.color}`}>
            <span className="block text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Current Classification</span>
            <span className="text-lg font-bold block">{badge.text}</span>
            <p className="text-xs mt-2 leading-relaxed opacity-90">{badge.description}</p>
          </div>

          {/* Net Carbon total */}
          <div className="w-full pt-4 border-t border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm flex justify-between items-center">
            <span>Net Monthly Emissions:</span>
            <span className="font-extrabold text-slate-900 dark:text-white text-base font-mono">{total} kg CO2</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Category Breakdown */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Category-wise Footprint</h3>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Normalized vs. Highest category</span>
          </div>

          <ul className="space-y-6">
            {categories.map((cat, idx) => {
              const percentage = total > 0 ? Math.round((cat.value / total) * 100) : 0;
              const relativeBarWidth = Math.max(5, (cat.value / maxVal) * 100);

              return (
                <li key={idx} className="group space-y-2 text-left">
                  {/* Category Details */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100/50 dark:border-slate-850 ${cat.text}`} aria-hidden="true">
                        {cat.icon}
                      </div>
                      <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{cat.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white font-mono">{cat.value} <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">kg</span></span>
                      <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-semibold">{percentage}% of total</span>
                    </div>
                  </div>
                  
                  {/* Horizontal Bar Chart representation */}
                  <div className="w-full h-3 bg-slate-50 dark:bg-slate-950 border border-slate-100/30 dark:border-slate-850 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${cat.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${relativeBarWidth}%` }}
                    ></div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Prompt action to Eco Challenges */}
          <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-left mt-4">
            <div className="space-y-1">
              <span className="block font-bold text-sm text-emerald-800 dark:text-emerald-300">Ready to shrink your footprint?</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Complete daily challenges to earn green points and level up your badge.</span>
            </div>
            <button
              onClick={() => setActiveTab('challenges')}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              Start Challenges
              <Compass className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* RECOMMENDATIONS SUB-SECTION (Page Requirements Section 4) */}
      <Recommendations results={results} />

    </div>
  );
}
