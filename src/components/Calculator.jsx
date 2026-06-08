import React, { useState } from 'react';
import { 
  Footprints, Bike, Car, Bus, Train, Trash2, 
  ShoppingBag, Sparkles, AlertTriangle, ArrowRight, ArrowLeft,
  Flame, Leaf, Lightbulb, ChefHat, Check
} from 'lucide-react';

export default function Calculator({ inputs, setInputs, onCalculate }) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);

  const transportModes = [
    { id: 'walking', label: 'Walking', icon: <Footprints className="w-5 h-5" />, desc: '0.00 kg/km' },
    { id: 'bicycle', label: 'Bicycle', icon: <Bike className="w-5 h-5" />, desc: '0.00 kg/km' },
    { id: 'metro', label: 'Metro', icon: <Train className="w-5 h-5" />, desc: '0.04 kg/km' },
    { id: 'bus', label: 'Bus', icon: <Bus className="w-5 h-5" />, desc: '0.08 kg/km' },
    { id: 'bike', label: 'Bike', icon: <Bike className="w-5 h-5 text-indigo-400" />, desc: '0.10 kg/km' },
    { id: 'car', label: 'Car', icon: <Car className="w-5 h-5" />, desc: '0.21 kg/km' }
  ];

  const dietTypes = [
    { id: 'vegetarian', label: 'Vegetarian', icon: <Leaf className="w-5 h-5" />, desc: '1.7 kg CO2/day' },
    { id: 'mixed', label: 'Mixed Diet', icon: <ChefHat className="w-5 h-5" />, desc: '2.5 kg CO2/day' },
    { id: 'nonVegetarian', label: 'Non-Vegetarian', icon: <Flame className="w-5 h-5" />, desc: '3.3 kg CO2/day' }
  ];

  const shoppingFrequencies = [
    { id: 'low', label: 'Low', icon: <ShoppingBag className="w-5 h-5 text-green-500" />, desc: 'Essential buying (10 kg)' },
    { id: 'medium', label: 'Medium', icon: <ShoppingBag className="w-5 h-5 text-amber-500" />, desc: 'Regular shopping (25 kg)' },
    { id: 'high', label: 'High', icon: <ShoppingBag className="w-5 h-5 text-rose-500" />, desc: 'Frequent purchases (45 kg)' }
  ];

  const wasteHabits = [
    { id: 'recyclesOften', label: 'Recycles Often', icon: <Check className="w-5 h-5 text-green-500" />, desc: 'Saves paper/plastic (5 kg)' },
    { id: 'sometimesRecycles', label: 'Sometimes Recycles', icon: <Sparkles className="w-5 h-5 text-amber-500" />, desc: 'Moderate habits (12 kg)' },
    { id: 'rarelyRecycles', label: 'Rarely Recycles', icon: <Trash2 className="w-5 h-5 text-rose-500" />, desc: 'Throws everything (25 kg)' }
  ];

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    // Clear validation error on change
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (inputs.travelDistance === '' || inputs.travelDistance === null) {
        newErrors.travelDistance = 'Travel distance is required.';
      } else if (parseFloat(inputs.travelDistance) < 0) {
        newErrors.travelDistance = 'Distance cannot be negative.';
      }
    } else if (currentStep === 2) {
      if (inputs.electricityUsage === '' || inputs.electricityUsage === null) {
        newErrors.electricityUsage = 'Electricity usage is required.';
      } else if (parseFloat(inputs.electricityUsage) < 0) {
        newErrors.electricityUsage = 'Electricity usage cannot be negative.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setIsCalculating(true);
    // Simulate premium loader before pushing calculation results
    setTimeout(() => {
      setIsCalculating(false);
      onCalculate();
    }, 1500);
  };

  const progressPct = ((step - 1) / 3) * 100;

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 animate-slide-up">
      {/* Loading Overlay */}
      {isCalculating && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm">
            <div className="w-16 h-16 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2">Calculating Your Footprint...</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Analyzing emissions based on regional variables and local inputs.</p>
          </div>
        </div>
      )}

      {/* Progress Wizard */}
      <div className="mb-8">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
          <span>Step {step} of 4</span>
          <span>{Math.round(progressPct)}% Complete</span>
        </div>
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 rounded-full"
            style={{ width: `${((step) / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        
        {/* Step Header */}
        <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800/80 text-left">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {step === 1 && "Travel & Mobility"}
            {step === 2 && "Home Energy & Electricity"}
            {step === 3 && "Diet & Shopping Habits"}
            {step === 4 && "Waste & Recycling Habits"}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {step === 1 && "Input your typical commuting distance and primary transport mode."}
            {step === 2 && "Tell us about your home utility consumption patterns."}
            {step === 3 && "Select the diet and shopping profile that aligns with your household."}
            {step === 4 && "Indicate your recycling efforts and household waste practices."}
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8 text-left">
          
          {/* STEP 1: TRAVEL & MOBILITY */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Daily Distance input */}
              <div className="space-y-2">
                <label htmlFor="travelDistance" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Daily Commute Distance (km)
                </label>
                <div className="relative">
                  <input
                    id="travelDistance"
                    type="number"
                    step="any"
                    value={inputs.travelDistance}
                    onChange={(e) => handleInputChange('travelDistance', e.target.value)}
                    placeholder="e.g. 15"
                    className={`w-full px-4 py-3.5 rounded-2xl border bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 transition-all ${
                      errors.travelDistance 
                        ? 'border-rose-500 focus:ring-rose-500/20' 
                        : 'border-slate-200 dark:border-slate-850 focus:border-emerald-500 focus:ring-emerald-500/20'
                    }`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 dark:text-slate-500 font-medium">km/day</span>
                </div>
                {errors.travelDistance && (
                  <p className="flex items-center gap-1 text-xs text-rose-500 font-semibold mt-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {errors.travelDistance}
                  </p>
                )}
              </div>

              {/* Transport mode selector */}
              <div className="space-y-3">
                <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Primary Transport Mode
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {transportModes.map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => handleInputChange('transportMode', mode.id)}
                      className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-28 transition-all hover:scale-[1.02] cursor-pointer ${
                        inputs.transportMode === mode.id
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 ring-2 ring-emerald-500/20'
                          : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className={`p-2 rounded-xl w-fit ${inputs.transportMode === mode.id ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                        {mode.icon}
                      </div>
                      <div>
                        <span className="block font-bold text-xs text-slate-800 dark:text-slate-200">{mode.label}</span>
                        <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">{mode.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: HOME ENERGY */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="electricityUsage" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Monthly Electricity Usage (kWh / Units)
                </label>
                <div className="relative">
                  <input
                    id="electricityUsage"
                    type="number"
                    step="any"
                    value={inputs.electricityUsage}
                    onChange={(e) => handleInputChange('electricityUsage', e.target.value)}
                    placeholder="e.g. 200"
                    className={`w-full px-4 py-3.5 rounded-2xl border bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 transition-all ${
                      errors.electricityUsage 
                        ? 'border-rose-500 focus:ring-rose-500/20' 
                        : 'border-slate-200 dark:border-slate-850 focus:border-emerald-500 focus:ring-emerald-500/20'
                    }`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 dark:text-slate-500 font-medium font-mono">kWh</span>
                </div>
                {errors.electricityUsage && (
                  <p className="flex items-center gap-1 text-xs text-rose-500 font-semibold mt-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {errors.electricityUsage}
                  </p>
                )}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-slate-700 dark:text-slate-300 flex items-start gap-3 mt-4">
                  <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed">
                    Electricity emissions are calculated at a regional grid standard of <strong>0.82 kg CO2 per kWh</strong>. Reducing your grid usage immediately mitigates environmental load.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: LIFESTYLE & DIET */}
          {step === 3 && (
            <div className="space-y-8">
              {/* Diet Type */}
              <div className="space-y-3">
                <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Diet Type
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {dietTypes.map((diet) => (
                    <button
                      key={diet.id}
                      type="button"
                      onClick={() => handleInputChange('dietType', diet.id)}
                      className={`p-4 rounded-2xl border text-left flex items-start gap-4 transition-all hover:scale-[1.01] cursor-pointer ${
                        inputs.dietType === diet.id
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 ring-2 ring-emerald-500/20'
                          : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl ${inputs.dietType === diet.id ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                        {diet.icon}
                      </div>
                      <div>
                        <span className="block font-bold text-sm text-slate-800 dark:text-slate-200">{diet.label}</span>
                        <span className="block text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">{diet.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Shopping habits */}
              <div className="space-y-3">
                <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Monthly Shopping Habits
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {shoppingFrequencies.map((freq) => (
                    <button
                      key={freq.id}
                      type="button"
                      onClick={() => handleInputChange('shoppingFrequency', freq.id)}
                      className={`p-4 rounded-2xl border text-left flex items-start gap-4 transition-all hover:scale-[1.01] cursor-pointer ${
                        inputs.shoppingFrequency === freq.id
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 ring-2 ring-emerald-500/20'
                          : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 ${inputs.shoppingFrequency === freq.id ? 'bg-emerald-500/10' : ''}`}>
                        {freq.icon}
                      </div>
                      <div>
                        <span className="block font-bold text-sm text-slate-800 dark:text-slate-200">{freq.label}</span>
                        <span className="block text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">{freq.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: WASTE & RECYCLING */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Waste Disposal & Recycling Habit
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {wasteHabits.map((habit) => (
                    <button
                      key={habit.id}
                      type="button"
                      onClick={() => handleInputChange('wasteHabit', habit.id)}
                      className={`p-4 rounded-2xl border text-left flex items-start gap-4 transition-all hover:scale-[1.01] cursor-pointer ${
                        inputs.wasteHabit === habit.id
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 ring-2 ring-emerald-500/20'
                          : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 ${inputs.wasteHabit === habit.id ? 'bg-emerald-500/10' : ''}`}>
                        {habit.icon}
                      </div>
                      <div>
                        <span className="block font-bold text-sm text-slate-800 dark:text-slate-200">{habit.label}</span>
                        <span className="block text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">{habit.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6 mt-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3.5 rounded-2xl border border-slate-250 dark:border-slate-750 text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            ) : (
              <div></div> // Empty div to balance space
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-7 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
              >
                Next Step
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-500/15 cursor-pointer"
              >
                Calculate Emissions
                <Sparkles className="w-5 h-5" />
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
