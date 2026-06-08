import React from 'react';
import { Leaf, Code2, Globe } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 py-8 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-emerald-500" />
          <span className="font-bold text-base text-slate-800 dark:text-slate-200">CarbonWise AI</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
          <button onClick={() => setActiveTab('home')} className="hover:text-emerald-500 transition-colors cursor-pointer">Home</button>
          <button onClick={() => setActiveTab('calculator')} className="hover:text-emerald-500 transition-colors cursor-pointer">Calculator</button>
          <button onClick={() => setActiveTab('challenges')} className="hover:text-emerald-500 transition-colors cursor-pointer">Challenges</button>
          <button onClick={() => setActiveTab('about')} className="hover:text-emerald-500 transition-colors cursor-pointer">About</button>
        </div>

        {/* Info & GitHub */}
        <div className="flex flex-col items-center md:items-end gap-2 text-xs text-slate-400 dark:text-slate-500">
          <span>&copy; {new Date().getFullYear()} CarbonWise AI. Developed for PromptWars Challenge 3.</span>
          <div className="flex gap-3 mt-1">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 dark:hover:text-slate-350 transition-colors" title="Source Code">
              <Code2 className="w-4 h-4" />
            </a>
            <a href="https://hack2skill.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 dark:hover:text-slate-350 transition-colors">
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
