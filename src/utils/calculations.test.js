import { describe, it, expect } from 'vitest';
import { calculateFootprint, getEcoBadge, EMISSION_FACTORS } from './calculations';

describe('CarbonWise AI - Calculation Utilities Tests', () => {
  
  describe('calculateFootprint', () => {
    
    it('should calculate emissions correctly for a standard Mixed diet, medium shopping, and moderate recycling profile', () => {
      const inputs = {
        travelDistance: 10,
        transportMode: 'car',
        electricityUsage: 150,
        dietType: 'mixed',
        shoppingFrequency: 'medium',
        wasteHabit: 'sometimesRecycles'
      };

      const result = calculateFootprint(inputs);

      // Travel: 10km * 30 days * 0.21 = 63
      // Electricity: 150kWh * 0.82 = 123
      // Diet: mixed (2.5) * 30 days = 75
      // Shopping: medium = 25
      // Waste: sometimes = 12
      // Total: 63 + 123 + 75 + 25 + 12 = 298
      // Eco Score: 100 - (298 / 10) = 100 - 29.8 = 70.2 -> rounded to 70

      expect(result.travel).toBe(63);
      expect(result.electricity).toBe(123);
      expect(result.food).toBe(75);
      expect(result.shopping).toBe(25);
      expect(result.waste).toBe(12);
      expect(result.total).toBe(298);
      expect(result.ecoScore).toBe(70);
    });

    it('should handle zero or negative input values gracefully by defaulting to 0', () => {
      const inputs = {
        travelDistance: -50,
        transportMode: 'bus',
        electricityUsage: -200,
        dietType: 'vegetarian',
        shoppingFrequency: 'low',
        wasteHabit: 'recyclesOften'
      };

      const result = calculateFootprint(inputs);

      // Negative distance/electricity should be parsed as Math.max(0, val) = 0
      // Travel: 0
      // Electricity: 0
      // Diet: vegetarian (1.7) * 30 days = 51
      // Shopping: low = 10
      // Waste: recyclesOften = 5
      // Total: 51 + 10 + 5 = 66
      // Eco Score: 100 - (66 / 10) = 100 - 6.6 = 93.4 -> rounded to 93

      expect(result.travel).toBe(0);
      expect(result.electricity).toBe(0);
      expect(result.food).toBe(51);
      expect(result.shopping).toBe(10);
      expect(result.waste).toBe(5);
      expect(result.total).toBe(66);
      expect(result.ecoScore).toBe(93);
    });

    it('should fallback to mixed diet and medium shopping/waste if invalid strings are provided', () => {
      const inputs = {
        travelDistance: 10,
        transportMode: 'invalid_mode',
        electricityUsage: 100,
        dietType: 'invalid_diet',
        shoppingFrequency: 'invalid_freq',
        wasteHabit: 'invalid_waste'
      };

      const result = calculateFootprint(inputs);

      // transportMode defaults to 'walking' -> factor 0 -> travel = 0
      // electricity: 100 * 0.82 = 82
      // diet: invalid defaults to 'mixed' factor 2.5 -> food = 75
      // shopping: invalid defaults to 'medium' -> shopping = 25
      // waste: invalid defaults to 'sometimesRecycles' -> waste = 12
      // Total: 0 + 82 + 75 + 25 + 12 = 194
      // Eco Score: 100 - 19.4 = 80.6 -> rounded to 81

      expect(result.travel).toBe(0);
      expect(result.electricity).toBe(82);
      expect(result.food).toBe(75);
      expect(result.shopping).toBe(25);
      expect(result.waste).toBe(12);
      expect(result.total).toBe(194);
      expect(result.ecoScore).toBe(81);
    });
  });

  describe('getEcoBadge', () => {
    it('should return Green Champion badge for score >= 80', () => {
      const badge = getEcoBadge(85);
      expect(badge.text).toBe('Green Champion');
      expect(badge.badgeColor).toBe('bg-emerald-500');
    });

    it('should return Eco Learner badge for score between 60 and 79', () => {
      const badge = getEcoBadge(70);
      expect(badge.text).toBe('Eco Learner');
      expect(badge.badgeColor).toBe('bg-teal-500');
    });

    it('should return Needs Improvement badge for score between 40 and 59', () => {
      const badge = getEcoBadge(45);
      expect(badge.text).toBe('Needs Improvement');
      expect(badge.badgeColor).toBe('bg-amber-500');
    });

    it('should return High Carbon Lifestyle badge for score below 40', () => {
      const badge = getEcoBadge(20);
      expect(badge.text).toBe('High Carbon Lifestyle');
      expect(badge.badgeColor).toBe('bg-rose-500');
    });
  });

});
