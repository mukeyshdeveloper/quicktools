export interface HealthInputs {
  heightCm: number;
  weightKg: number;
  age: number;
  gender: 'male' | 'female';
  neckCm?: number;
  waistCm?: number;
  hipCm?: number;
}

export interface HealthResults {
  bmi: number;
  bmiCategory: string;
  bodyFatNavy?: number | undefined;
  bodyFatYMCA?: number | undefined;
  idealWeightDevine: number;
  idealWeightRobinson: number;
  idealWeightMiller: number;
}

export function calculateBMI(heightCm: number, weightKg: number): number {
  const h = heightCm / 100;
  return Math.round((weightKg / (h * h)) * 10) / 10;
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export function calculateBodyFatNavy(inputs: HealthInputs): number | null {
  const { heightCm, neckCm, waistCm, hipCm, gender } = inputs;
  if (!neckCm || !waistCm || (gender === 'female' && !hipCm)) return null;

  const h = Math.log10(heightCm);
  if (gender === 'male') {
    const val = 86.010 * Math.log10(waistCm - neckCm) - 70.041 * h + 36.76;
    return Math.round(val * 10) / 10;
  } else {
    const val = 163.205 * Math.log10(waistCm + (hipCm || 0) - neckCm) - 97.684 * h - 78.387;
    return Math.round(val * 10) / 10;
  }
}

export function calculateBodyFatYMCA(weightKg: number, waistCm: number, gender: 'male' | 'female'): number {
  if (gender === 'male') {
    return Math.round(((-98.42 + (4.15 * waistCm) - (0.082 * weightKg * 1000 / weightKg)) / 2.2) * 10) / 10; // simplified
  }
  // Approximate YMCA
  return Math.round(((-76.76 + (4.15 * waistCm) - (0.082 * weightKg * 1000 / weightKg)) / 2.2) * 10) / 10;
}

export function calculateIdealWeightDevine(heightCm: number, gender: 'male' | 'female'): number {
  const inches = heightCm / 2.54;
  if (gender === 'male') return Math.round((50 + 2.3 * (inches - 60)) * 10) / 10;
  return Math.round((45.5 + 2.3 * (inches - 60)) * 10) / 10;
}

export function calculateIdealWeightRobinson(heightCm: number, gender: 'male' | 'female'): number {
  const inches = heightCm / 2.54;
  if (gender === 'male') return Math.round((52 + 1.9 * (inches - 60)) * 10) / 10;
  return Math.round((49 + 1.7 * (inches - 60)) * 10) / 10;
}

export function calculateIdealWeightMiller(heightCm: number, gender: 'male' | 'female'): number {
  const inches = heightCm / 2.54;
  if (gender === 'male') return Math.round((56.2 + 1.41 * (inches - 60)) * 10) / 10;
  return Math.round((53.1 + 1.36 * (inches - 60)) * 10) / 10;
}

export function calculateAll(inputs: HealthInputs): HealthResults {
  const bmi = calculateBMI(inputs.heightCm, inputs.weightKg);
  const bodyFatNavy = calculateBodyFatNavy(inputs) || undefined;
  const bodyFatYMCA = calculateBodyFatYMCA(inputs.weightKg, inputs.waistCm || 0, inputs.gender);

  return {
    bmi,
    bmiCategory: getBMICategory(bmi),
    bodyFatNavy,
    bodyFatYMCA: Math.round(bodyFatYMCA * 10) / 10,
    idealWeightDevine: calculateIdealWeightDevine(inputs.heightCm, inputs.gender),
    idealWeightRobinson: calculateIdealWeightRobinson(inputs.heightCm, inputs.gender),
    idealWeightMiller: calculateIdealWeightMiller(inputs.heightCm, inputs.gender),
  };
}
