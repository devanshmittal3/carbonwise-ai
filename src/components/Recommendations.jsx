import React from 'react';
import { 
  Car, Lightbulb, ChefHat, ShoppingBag, 
  Trash2, HelpCircle 
} from 'lucide-react';

export default function Recommendations({ results }) {
  if (!results) {
    return null;
  }

  const { travel, electricity, food, shopping, waste } = results;

  // Rule-based logic: find the highest category
  const categories = [
    { id: 'travel', value: travel, name: 'Travel & Mobility' },
    { id: 'electricity', value: electricity, name: 'Home Electricity' },
    { id: 'food', value: food, name: 'Diet & Food Consumption' },
    { id: 'shopping', value: shopping, name: 'Shopping & Purchases' },
    { id: 'waste', value: waste, name: 'Waste Habits' }
  ];

  // Sort categories by value desc
  const sorted = [...categories].sort((a, b) => b.value - a.value);
  const highestCategory = sorted[0];

  // Specific recommendations dictionary
  const recommendationsData = {
    travel: {
      title: "Transition to Green Transit",
      color: "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300",
      icon: <Car className="w-8 h-8 text-emerald-500" />,
      desc: "Travel is your highest emissions source. Transitioning your commuting style is the single most effective way to lower your carbon foot footprint.",
      actions: [
        "Use Public Transit: Opt for metro systems or buses instead of solo driving. It reduces per-passenger emissions by up to 80%.",
        "Active Transportation: For commutes under 5km, walk or use a bicycle. It is 100% emission-free and improves physical fitness.",
        "Carpooling & Ridesharing: Share rides with neighbors or co-workers to cut vehicle trips in half.",
        "Eco-Driving: Drive smoothly. Avoid rapid acceleration and excessive braking, which can improve fuel economy by up to 30%."
      ]
    },
    electricity: {
      title: "Optimize Home Power Intake",
      color: "border-amber-500 bg-amber-50/40 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300",
      icon: <Lightbulb className="w-8 h-8 text-amber-500" />,
      desc: "Electricity consumption is your primary emission source. Implementing power-efficient measures can reduce utility costs and carbon load.",
      actions: [
        "LED Lighting: Replace incandescent bulbs with LED alternatives. They consume up to 80% less energy and last 25 times longer.",
        "Unplug Phantom Loads: Appliances draw standby power even when turned off. Unplug chargers and utilize smart power strips.",
        "Optimized Climate Control: Set AC thermostats to 24-26°C. Every degree higher saves roughly 6% of cooling electricity.",
        "Energy Star Appliances: Look for high energy efficiency star ratings when upgrading heavy domestic appliances."
      ]
    },
    food: {
      title: "Adopt a Sustainable Diet",
      color: "border-teal-500 bg-teal-50/40 dark:bg-teal-950/20 text-teal-800 dark:text-teal-300",
      icon: <ChefHat className="w-8 h-8 text-teal-500" />,
      desc: "Food consumption dominates your emission profile. Meat production, especially beef, requires vast land, water, and generates heavy emissions.",
      actions: [
        "Plant-Based Meals: Introduce plant-based lunches or dinners once or twice a week. It dramatically decreases greenhouse gas impact.",
        "Reduce Food Waste: Plan meals, store food correctly, and compost scraps. Decomposing food in landfills releases potent methane gas.",
        "Eat Local & Seasonal: Select foods grown in your region. It removes long-distance transport logistics and refrigerated shipping.",
        "Minimize Packaging: Choose bulk items or raw products that bypass heavy commercial plastic packaging."
      ]
    },
    shopping: {
      title: "Practice Mindful Buying",
      color: "border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/20 text-indigo-800 dark:text-indigo-300",
      icon: <ShoppingBag className="w-8 h-8 text-indigo-500" />,
      desc: "Shopping habits represent your highest indirect carbon emission. Consumer manufacturing and global logistics draw heavy industrial power.",
      actions: [
        "Need vs. Want Rule: Before any purchase, wait 48 hours to evaluate if the item is necessary or just a transient want.",
        "Select Sustainable Brands: Purchase from brands that use recycled materials, organic threads, and carbon offset logistics.",
        "Buy Second-Hand: Rent, share, or purchase pre-owned clothing, books, and electronics to bypass the new manufacturing cycle.",
        "Quality Over Quantity: Invest in durable, high-quality items that last longer rather than cheap, disposable alternatives."
      ]
    },
    waste: {
      title: "Establish Circular Habits",
      color: "border-rose-500 bg-rose-50/40 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300",
      icon: <Trash2 className="w-8 h-8 text-rose-500" />,
      desc: "Waste management represents your highest carbon category. Landfill waste produces heavy greenhouse gases and pollutes local soil.",
      actions: [
        "Three-Bin Segregation: Separate wet kitchen waste, dry recyclables (paper, plastic, metal), and non-recyclable items.",
        "Composting at Home: Turn food scraps and vegetable peels into nutrient-rich compost for plants. Bypasses landfill methane production.",
        "Say No to Single-Use: Keep reusable canvas shopping bags and stainless steel water bottles in your car or backpack.",
        "Recycle Electronics: Never throw electronic items in normal trash. Take them to designated e-waste dropoff hubs."
      ]
    }
  };

  const currentRecommendation = recommendationsData[highestCategory.id];

  const generalTips = [
    {
      title: "Unplug Idle Devices",
      desc: "Phantom load refers to energy drawn by devices when in standby. Unplug chargers, routers, and microwave screens when leaving home."
    },
    {
      title: "Decrease Hot Water Usage",
      desc: "Heating water accounts for 18% of average home energy. Wash laundry in cold water and take shorter showers to conserve power."
    },
    {
      title: "Go Paperless & Digital",
      desc: "Request digital statements and bills. Opting out of physical catalog mailings saves trees and reduces heavy cargo delivery fuel."
    }
  ];

  return (
    <div className="space-y-8 text-left animate-slide-up">
      <div className="border-t border-slate-100 dark:border-slate-800 pt-8">
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Personalized Recommendations</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Rule-based analysis based on your highest emission category: <strong className="text-slate-700 dark:text-slate-350">{highestCategory.name}</strong>.
        </p>
      </div>

      {/* Highest Emission Category Alert & Action List */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${currentRecommendation.color} flex flex-col md:flex-row items-start gap-6`}>
        <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100/10 shadow-xs shrink-0">
          {currentRecommendation.icon}
        </div>
        <div className="space-y-4 flex-1">
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">{currentRecommendation.title}</h4>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 leading-relaxed">
              {currentRecommendation.desc}
            </p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {currentRecommendation.actions.map((act, idx) => {
              const [boldText, normalText] = act.split(': ');
              return (
                <li key={idx} className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/40 border border-white/40 dark:border-slate-800/40 flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" aria-hidden="true"></div>
                  <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>{boldText}</strong>: {normalText}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* General Tips Section */}
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <HelpCircle className="w-5 h-5 text-emerald-500" />
          General Carbon-Saving Tips
        </h4>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {generalTips.map((tip, idx) => (
            <li key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 hover:shadow-xs transition-all">
              <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">{tip.title}</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{tip.desc}</p>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
