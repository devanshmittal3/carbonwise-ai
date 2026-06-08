// CarbonWise AI - Calculation Utilities

export const EMISSION_FACTORS = {
  transport: {
    walking: 0.00,
    bicycle: 0.00,
    metro: 0.04,
    bus: 0.08,
    bike: 0.10,
    car: 0.21
  },
  electricity: 0.82, // kg CO2 per kWh
  diet: {
    vegetarian: 1.7, // kg CO2 per day
    mixed: 2.5,
    nonVegetarian: 3.3
  },
  shopping: {
    low: 10, // kg CO2 per month
    medium: 25,
    high: 45
  },
  waste: {
    recyclesOften: 5, // kg CO2 per month
    sometimesRecycles: 12,
    rarelyRecycles: 25
  }
};

/**
 * Calculates monthly carbon footprint based on user inputs.
 * 
 * @param {Object} inputs
 * @param {number} inputs.travelDistance - Daily travel distance in km
 * @param {string} inputs.transportMode - Mode of transport (walking, bicycle, bike, car, bus, metro)
 * @param {number} inputs.electricityUsage - Monthly electricity usage in kWh
 * @param {string} inputs.dietType - Diet type (vegetarian, mixed, nonVegetarian)
 * @param {string} inputs.shoppingFrequency - Shopping frequency (low, medium, high)
 * @param {string} inputs.wasteHabit - Waste habit (recyclesOften, sometimesRecycles, rarelyRecycles)
 * 
 * @returns {Object} Calculated emissions per category, total, and eco score
 */
export function calculateFootprint(inputs) {
  const travelDistance = Math.max(0, parseFloat(inputs.travelDistance) || 0);
  const transportMode = inputs.transportMode || 'walking';
  const electricityUsage = Math.max(0, parseFloat(inputs.electricityUsage) || 0);
  const dietType = inputs.dietType || 'mixed';
  const shoppingFrequency = inputs.shoppingFrequency || 'medium';
  const wasteHabit = inputs.wasteHabit || 'sometimesRecycles';

  // Category-wise calculations
  const travelFactor = EMISSION_FACTORS.transport[transportMode] ?? 0;
  const travelEmissions = travelDistance * 30 * travelFactor;

  const electricityEmissions = electricityUsage * EMISSION_FACTORS.electricity;

  const dietFactor = EMISSION_FACTORS.diet[dietType] ?? 2.5;
  const foodEmissions = dietFactor * 30;

  const shoppingEmissions = EMISSION_FACTORS.shopping[shoppingFrequency] ?? 25;
  const wasteEmissions = EMISSION_FACTORS.waste[wasteHabit] ?? 12;

  const totalEmissions = travelEmissions + electricityEmissions + foodEmissions + shoppingEmissions + wasteEmissions;

  // Eco Score: max(0, 100 - totalEmission / 10), rounded to nearest integer
  const ecoScore = Math.round(Math.max(0, 100 - totalEmissions / 10));

  return {
    travel: parseFloat(travelEmissions.toFixed(2)),
    electricity: parseFloat(electricityEmissions.toFixed(2)),
    food: parseFloat(foodEmissions.toFixed(2)),
    shopping: parseFloat(shoppingEmissions.toFixed(2)),
    waste: parseFloat(wasteEmissions.toFixed(2)),
    total: parseFloat(totalEmissions.toFixed(2)),
    ecoScore
  };
}

/**
 * Returns badge classification based on Eco Score.
 * 
 * @param {number} score - Eco score (0 - 100)
 * @returns {Object} { text: string, color: string, description: string }
 */
export function getEcoBadge(score) {
  if (score >= 80) {
    return {
      text: 'Green Champion',
      color: 'from-emerald-500 to-green-600 text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900',
      badgeColor: 'bg-emerald-500',
      description: 'Superb! You maintain an exceptionally sustainable lifestyle and set a great example for others.'
    };
  } else if (score >= 60) {
    return {
      text: 'Eco Learner',
      color: 'from-teal-500 to-emerald-600 text-teal-800 dark:text-teal-200 bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-900',
      badgeColor: 'bg-teal-500',
      description: 'Good job! You are conscious of your impact and taking solid steps toward sustainability.'
    };
  } else if (score >= 40) {
    return {
      text: 'Needs Improvement',
      color: 'from-amber-500 to-orange-600 text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900',
      badgeColor: 'bg-amber-500',
      description: 'Moderately high impact. Look at your highest categories and try to adopt some greener habits.'
    };
  } else {
    return {
      text: 'High Carbon Lifestyle',
      color: 'from-rose-500 to-red-600 text-rose-800 dark:text-rose-200 bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900',
      badgeColor: 'bg-rose-500',
      description: 'Alert! Your carbon emissions are quite high. Starting some eco challenges can help you reduce it.'
    };
  }
}
