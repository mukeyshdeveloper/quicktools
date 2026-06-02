export type Gender = 'male' | 'female';
export type TestType = 'rockport' | 'nonexercise';

export interface Vo2Inputs {
  testType: TestType;
  gender: Gender;
  age: number;
  weightKg: number;
  // Rockport
  walkTimeMin?: number | undefined; // minutes for 1 mile
  walkHr?: number | undefined; // ending HR
  // Non-exercise
  activityLevel?: 1 | 2 | 3 | 4 | 5 | undefined; // PA-R scale approx
}

export interface Vo2Result {
  vo2: number;
  category: string;
  categoryColor: string;
  percentile: string;
  method: string;
}

function getCategory(vo2: number, gender: Gender): { cat: string; color: string; pct: string } {
  // Approximate ACSM / normative tables (simplified)

  if (gender === 'male') {
    if (vo2 >= 55) return { cat: 'Superior', color: 'text-emerald-600', pct: '95th+' };
    if (vo2 >= 49) return { cat: 'Excellent', color: 'text-emerald-600', pct: '80–94th' };
    if (vo2 >= 42) return { cat: 'Good', color: 'text-green-600', pct: '60–79th' };
    if (vo2 >= 36) return { cat: 'Fair / Average', color: 'text-amber-600', pct: '40–59th' };
    if (vo2 >= 30) return { cat: 'Below Average', color: 'text-orange-600', pct: '20–39th' };
    return { cat: 'Poor', color: 'text-rose-600', pct: '<20th' };
  } else {
    if (vo2 >= 45) return { cat: 'Superior', color: 'text-emerald-600', pct: '95th+' };
    if (vo2 >= 39) return { cat: 'Excellent', color: 'text-emerald-600', pct: '80–94th' };
    if (vo2 >= 34) return { cat: 'Good', color: 'text-green-600', pct: '60–79th' };
    if (vo2 >= 29) return { cat: 'Fair / Average', color: 'text-amber-600', pct: '40–59th' };
    if (vo2 >= 24) return { cat: 'Below Average', color: 'text-orange-600', pct: '20–39th' };
    return { cat: 'Poor', color: 'text-rose-600', pct: '<20th' };
  }
}

export function calculateVo2Max(inputs: Vo2Inputs): Vo2Result | null {
  const { testType, gender, age, weightKg } = inputs;
  if (!age || !weightKg || age < 15 || age > 85) return null;

  let vo2: number;
  let method = '';

  if (testType === 'rockport' && inputs.walkTimeMin && inputs.walkHr) {
    // Rockport 1-mile walk test (validated)
    // VO2 = 132.853 − (0.0769 × weight_lbs) − (0.3877 × age) + (6.315 × gender) − (3.2649 × time) − (0.1565 × HR)
    const weightLbs = weightKg * 2.20462;
    const genderVal = gender === 'male' ? 1 : 0;
    vo2 = 132.853 - (0.0769 * weightLbs) - (0.3877 * age) + (6.315 * genderVal) - (3.2649 * inputs.walkTimeMin) - (0.1565 * inputs.walkHr);
    method = 'Rockport 1-Mile Walk Test';
  } else if (testType === 'nonexercise' && inputs.activityLevel) {
    // Simple non-exercise estimate (Jackson / non-exercise prediction)
    // Rough: VO2 ≈ 56.363 + 1.921*PA - 0.381*age - 0.754*genderCode? (male 0 female 1) + adjustments
    const pa = inputs.activityLevel;
    const g = gender === 'male' ? 0 : 1;
    vo2 = 45 + (pa - 3) * 3.2 - (age - 35) * 0.22 - g * 4.5;
    method = 'Non-Exercise Questionnaire';
  } else {
    return null;
  }

  vo2 = Math.max(15, Math.min(75, Math.round(vo2 * 10) / 10));

  const { cat, color, pct } = getCategory(vo2, gender);

  return {
    vo2,
    category: cat,
    categoryColor: color,
    percentile: pct,
    method,
  };
}

export const activityOptions = [
  { value: 1, label: 'Sedentary — little or no regular exercise' },
  { value: 2, label: 'Light — 1–2 light sessions per week' },
  { value: 3, label: 'Moderate — 3+ sessions or active job' },
  { value: 4, label: 'Active — 5+ hard sessions or serious training' },
  { value: 5, label: 'Very Active — competitive athlete / daily intense' },
] as const;
