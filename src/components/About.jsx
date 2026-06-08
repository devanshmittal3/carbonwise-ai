import React from 'react';
import { ShieldAlert, BookOpen, Compass, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 space-y-12 animate-slide-up text-left">
      
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">About CarbonWise AI</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Understanding our impact and moving toward a zero-carbon future.</p>
      </div>

      {/* Hero card details */}
      <div className="p-6 sm:p-8 rounded-3xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/15 space-y-4">
        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <Heart className="w-6 h-6 text-emerald-500" />
          Our Mission
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          At CarbonWise AI, we believe that climate action starts with awareness. By simplifying the tracking of daily choices, we empower individuals to identify high-emission areas in their lives, make informed adjustments, and adopt carbon-conscious habits. Small daily shifts collectively create massive global impact.
        </p>
      </div>

      {/* Why Carbon Footprint Matters */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-slate-400 dark:text-slate-500" />
          Why Carbon Footprints Matter
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-400">
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">The Greenhouse Effect</h4>
            <p className="leading-relaxed">
              Greenhouse gases (mostly carbon dioxide and methane) trap solar heat in our atmosphere, keeping the Earth warm. However, industrial, agricultural, and transport actions have increased these gases to record levels, causing global warming.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">Climate Impact</h4>
            <p className="leading-relaxed">
              Rising temperatures drive extreme weather events, threaten agricultural cycles, cause glaciers to melt, and elevate ocean levels. Lowering individual footprints helps mitigate the severity of these environmental impacts.
            </p>
          </div>
        </div>
      </div>

      {/* How This App Helps */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Compass className="w-5 h-5 text-slate-400 dark:text-slate-500" />
          How CarbonWise AI Works
        </h3>
        <ol className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-left">
          {[
            {
              num: '01',
              title: 'Calculate Footprint',
              desc: 'Using standard emission factors, we convert your travel distance, electricity bills, meals, and recycling habits into concrete carbon metrics.'
            },
            {
              num: '02',
              title: 'Learn & Adapt',
              desc: 'Our rule-based recommendation engine identifies your highest emissions source and provides custom actions to address it.'
            },
            {
              num: '03',
              title: 'Form New Habits',
              desc: 'Take on active eco challenges, earn green points, track your achievements, and see your score improve over time.'
            }
          ].map((step, idx) => (
            <li key={idx} className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl space-y-3">
              <span className="text-xs font-bold text-emerald-500 font-mono tracking-widest">{step.num}</span>
              <h4 className="font-bold text-slate-800 dark:text-slate-200">{step.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Educational Disclaimer */}
      <div className="p-5 sm:p-6 rounded-3xl border border-rose-200 dark:border-rose-950/40 bg-rose-50/40 dark:bg-rose-950/10 text-rose-800 dark:text-rose-300 flex items-start gap-4">
        <ShieldAlert className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">Educational Estimate Disclaimer</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            The calculations provided by CarbonWise AI are estimates intended for educational, awareness, and promotional purposes only. Carbon emissions vary widely based on regional grid infrastructure, vehicle make/model, localized manufacturing chains, and municipal waste treatment standards. The emission factors utilized represent standard global averages and should not be used for official regulatory or scientific reporting.
          </p>
        </div>
      </div>

    </div>
  );
}
