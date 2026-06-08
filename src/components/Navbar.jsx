import React from 'react';
import { Leaf, Trophy, Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, greenPoints, currentBadge, darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'calculator', label: 'Calculator' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'challenges', label: 'Eco Challenges' },
    { id: 'progress', label: 'My Progress' },
    { id: 'about', label: 'About' }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 border-b border-slate-200/80 dark:border-slate-800/80 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo / Branding */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
              <Leaf className="w-6 h-6 animate-pulse-soft" />
            </div>
            <span className="font-bold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              CarbonWise AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'text-slate-600 hover:text-emerald-500 hover:bg-slate-100/50 dark:text-slate-300 dark:hover:text-emerald-400 dark:hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions: Points & Badge Indicator, Dark Mode Toggle */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Green Points Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-sm font-semibold select-none">
              <Trophy className="w-4 h-4 text-emerald-500" />
              <span>{greenPoints} Pts</span>
            </div>

            {/* Current Badge Pill */}
            {currentBadge && (
              <div className="hidden md:flex items-center px-3 py-1 rounded-full text-xs font-bold border bg-gradient-to-r shadow-xs">
                <span>{currentBadge}</span>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-500" />}
            </button>
          </div>

          {/* Mobile Hamburger & Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden animate-slide-up bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="px-4 pt-2 pb-6 space-y-1.5 shadow-lg">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium text-base transition-all ${
                  activeTab === item.id
                    ? 'bg-emerald-500 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Tally details */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-4">
              <div className="flex items-center gap-1.5">
                <Trophy className="w-5 h-5 text-emerald-500" />
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {greenPoints} Green Points
                </span>
              </div>
              {currentBadge && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200">
                  {currentBadge}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
