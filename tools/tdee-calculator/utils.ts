export interface TdeeResult {
  bmr: number;
  tdee: number;
  macros: {
    maintenance: { carbs: number; protein: number; fat: number };
    cutting: { calories: number; carbs: number; protein: number; fat: number };
    bulking: { calories: number; carbs: number; protein: number; fat: number };
  };
}

export function calculateTdee(
  gender: 'male' | 'female',
  age: number,
  weightKg: number,
  heightCm: number,
  activityLevel: number
): TdeeResult | null {
  if (!age || !weightKg || !heightCm) return null;
  if (age <= 0 || weightKg <= 0 || heightCm <= 0) return null;

  // Mifflin-St Jeor Equation
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  bmr += gender === 'male' ? 5 : -161;
  bmr = Math.round(bmr);

  const tdee = Math.round(bmr * activityLevel);

  // General macro split: 30% Protein, 35% Fat, 35% Carbs
  const getMacros = (cals: number) => ({
    protein: Math.round((cals * 0.3) / 4), // 4 cals per g
    fat: Math.round((cals * 0.35) / 9),    // 9 cals per g
    carbs: Math.round((cals * 0.35) / 4),  // 4 cals per g
  });

  const cuttingCals = tdee - 500; // standard 500 cal deficit
  const bulkingCals = tdee + 500; // standard 500 cal surplus

  return {
    bmr,
    tdee,
    macros: {
      maintenance: getMacros(tdee),
      cutting: { calories: cuttingCals, ...getMacros(cuttingCals) },
      bulking: { calories: bulkingCals, ...getMacros(bulkingCals) },
    },
  };
}
