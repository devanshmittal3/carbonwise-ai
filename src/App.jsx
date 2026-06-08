import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Calculator from './components/Calculator';
import Dashboard from './components/Dashboard';
import Challenges from './components/Challenges';
import Progress from './components/Progress';
import About from './components/About';
import Footer from './components/Footer';
import { calculateFootprint, getEcoBadge } from './utils/calculations';

const DEFAULT_INPUTS = {
  travelDistance: '',
  transportMode: 'walking',
  electricityUsage: '',
  dietType: 'mixed',
  shoppingFrequency: 'medium',
  wasteHabit: 'sometimesRecycles'
};

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return ['home', 'calculator', 'dashboard', 'challenges', 'progress', 'about'].includes(hash) ? hash : 'home';
  });

  // Inputs State
  const [inputs, setInputs] = useState(() => {
    try {
      const saved = localStorage.getItem('carbonwise_inputs');
      return saved ? JSON.parse(saved) : DEFAULT_INPUTS;
    } catch {
      return DEFAULT_INPUTS;
    }
  });

  // Calculation Results State
  const [results, setResults] = useState(() => {
    try {
      const saved = localStorage.getItem('carbonwise_results');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Date of calculation
  const [lastSavedDate, setLastSavedDate] = useState(() => {
    try {
      return localStorage.getItem('carbonwise_last_saved_date') || null;
    } catch {
      return null;
    }
  });

  // Green Points & Completed Challenges State
  const [greenPoints, setGreenPoints] = useState(() => {
    try {
      const saved = localStorage.getItem('carbonwise_green_points');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [completedChallenges, setCompletedChallenges] = useState(() => {
    try {
      const saved = localStorage.getItem('carbonwise_completed_challenges');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('carbonwise_dark_mode');
      if (saved !== null) {
        return saved === 'true';
      }
    } catch {
      // ignore
    }
    // Default to system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Synchronize Tab Hash with URL
  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  // Handle Hash Changes externally (e.g. back buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'calculator', 'dashboard', 'challenges', 'progress', 'about'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Save Inputs to LocalStorage on Change
  useEffect(() => {
    localStorage.setItem('carbonwise_inputs', JSON.stringify(inputs));
  }, [inputs]);

  // Synchronize Dark Mode CSS Class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('carbonwise_dark_mode', darkMode.toString());
  }, [darkMode]);

  // Save Points, Challenges, and Results on Change
  useEffect(() => {
    localStorage.setItem('carbonwise_green_points', greenPoints.toString());
  }, [greenPoints]);

  useEffect(() => {
    localStorage.setItem('carbonwise_completed_challenges', JSON.stringify(completedChallenges));
  }, [completedChallenges]);

  useEffect(() => {
    if (results) {
      localStorage.setItem('carbonwise_results', JSON.stringify(results));
    } else {
      localStorage.removeItem('carbonwise_results');
    }
  }, [results]);

  useEffect(() => {
    if (lastSavedDate) {
      localStorage.setItem('carbonwise_last_saved_date', lastSavedDate);
    } else {
      localStorage.removeItem('carbonwise_last_saved_date');
    }
  }, [lastSavedDate]);

  // Calculation Action
  const handleCalculate = () => {
    const footprint = calculateFootprint(inputs);
    setResults(footprint);
    const dateStr = new Date().toISOString();
    setLastSavedDate(dateStr);
    setActiveTab('dashboard');
  };

  // Reset/Recalculate Action
  const handleReset = () => {
    setResults(null);
    setLastSavedDate(null);
    setInputs(DEFAULT_INPUTS);
    setActiveTab('calculator');
  };

  // Complete Challenge Action
  const handleCompleteChallenge = (challengeId, points) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges(prev => [...prev, challengeId]);
      setGreenPoints(prev => prev + points);
    }
  };

  // Reset Challenges Action
  const handleResetChallenges = () => {
    if (window.confirm("Are you sure you want to reset all completed challenges and green points?")) {
      setCompletedChallenges([]);
      setGreenPoints(0);
    }
  };

  // Determine Eco Badge for Navbar/Progress
  const currentBadgeText = results ? getEcoBadge(results.ecoScore).text : 'High Carbon Lifestyle';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      
      {/* Navigation Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        greenPoints={greenPoints} 
        currentBadge={results ? currentBadgeText : null}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Pages Section Router */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'home' && (
          <Home setActiveTab={setActiveTab} />
        )}
        {activeTab === 'calculator' && (
          <Calculator 
            inputs={inputs} 
            setInputs={setInputs} 
            onCalculate={handleCalculate} 
          />
        )}
        {activeTab === 'dashboard' && (
          <Dashboard 
            results={results} 
            inputs={inputs} 
            onReset={handleReset} 
            setActiveTab={setActiveTab} 
          />
        )}
        {activeTab === 'challenges' && (
          <Challenges 
            completedIds={completedChallenges} 
            onCompleteChallenge={handleCompleteChallenge} 
            onResetChallenges={handleResetChallenges}
            greenPoints={greenPoints}
          />
        )}
        {activeTab === 'progress' && (
          <Progress 
            greenPoints={greenPoints} 
            completedChallengeCount={completedChallenges.length} 
            lastSavedResult={results} 
            lastSavedDate={lastSavedDate}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'about' && (
          <About />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
