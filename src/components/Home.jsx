import React from 'react';
import { Calculator, Award, Lightbulb, Compass, BarChart3, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Home({ setActiveTab }) {
  
  const features = [
    {
      icon: <Calculator className="w-8 h-8 text-emerald-500" />,
      title: "Carbon Calculator",
      desc: "Calculate your footprint in minutes. Input your travel habits, electricity bills, food intake, and waste recycling."
    },
    {
      icon: <Award className="w-8 h-8 text-teal-500" />,
      title: "Smart Eco Score",
      desc: "Receive a real-time rating from 0 to 100 representing your lifestyle greenness. Climb from learner to Green Champion."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-amber-500" />,
      title: "Personalized Green Tips",
      desc: "Get actionable advice. Rule-based analysis figures out where you emit most and suggests specific changes."
    },
    {
      icon: <Compass className="w-8 h-8 text-indigo-500" />,
      title: "Eco Challenges",
      desc: "Put advice into practice. Complete real-world challenges, earn Green Points, and form lifetime green habits."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-rose-500" />,
      title: "Progress Dashboard",
      desc: "Visualize your footprint over time and track your green achievements, badges, and points statistics."
    }
  ];

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20 animate-slide-up">
      
      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between gap-12 pt-4">
        {/* Left Side: Copy */}
        <div className="flex-1 text-left space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            100% Free & Private • Privacy First
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Track. Understand. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Reduce Your Footprint.
            </span>
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Human activities generate greenhouse gases, driving global warming. Knowing your footprint is the first step toward change. <strong>CarbonWise AI</strong> makes it simple: calculate your monthly emissions, unlock custom reductions, and complete challenges to adopt a carbon-conscious lifestyle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => setActiveTab('calculator')}
              className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 flex items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              Start Tracking 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className="px-8 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Learn More
              <HelpCircle className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Right Side: Graphic Panel */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none flex justify-center relative">
          {/* Animated decorative shapes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-emerald-400/20 dark:bg-emerald-500/10 blur-3xl -z-10 animate-pulse-soft"></div>
          <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-teal-400/20 dark:bg-teal-500/10 blur-2xl -z-10 animate-float"></div>

          {/* Core Graphic Dashboard Container */}
          <div className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800/80 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="font-semibold text-slate-800 dark:text-slate-100">Global Emission Breakdown</span>
              <span className="text-xs bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded-md">Est. Monthly</span>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Travel & Mobility', pct: '40%', color: 'bg-emerald-500' },
                { name: 'Home Electricity', pct: '30%', color: 'bg-amber-500' },
                { name: 'Food Consumption', pct: '20%', color: 'bg-teal-500' },
                { name: 'Others (Shopping, Waste)', pct: '10%', color: 'bg-indigo-500' }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span>{item.name}</span>
                    <span>{item.pct}</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: item.pct }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div className="text-left">
                <span className="block text-xs font-semibold text-slate-800 dark:text-slate-200">Carbon Fact</span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  The average global carbon footprint per person is about 4 tons per year. To avoid global warming of 2°C, it needs to be under 2 tons.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Everything you need to live greener
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            A comprehensive footprint toolset right in your browser. All computations are local, anonymous, and educational.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 text-left rounded-2xl bg-white dark:bg-slate-900 hover:shadow-lg hover:shadow-slate-100/50 dark:hover:shadow-black/20 hover:border-emerald-500/20 dark:hover:border-emerald-500/10 border border-slate-100 dark:border-slate-800 transition-all group"
            >
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100/80 dark:border-slate-800/80 inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
