export type Gender = 'male' | 'female';
export type UnitSystem = 'metric' | 'imperial';

export interface BodyFatInputs {
  gender: Gender;
  unitSystem: UnitSystem;
  height: number; // cm or inches
  neck: number; // cm or inches
  waist: number; // cm or inches
  hip: number; // cm or inches (women only, ignored for men)
  weight: number; // kg or lbs for YMCA
}

export interface BodyFatResult {
  navy: number | null; // percent
  ymca: number | null; // percent
  average: number | null;
  fatMassKg: number | null;
  leanMassKg: number | null;
  category: string;
  categoryColor: string;
}

function toInches(val: number, from: UnitSystem): number {
  return from === 'metric' ? val / 2.54 : val;
}

function toCm(val: number, from: UnitSystem): number {
  return from === 'metric' ? val : val * 2.54;
}

function toKg(val: number, from: UnitSystem): number {
  return from === 'metric' ? val : val / 2.20462;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

// US Navy (metric formula variant) — most widely used
function calculateNavyBF(gender: Gender, heightCm: number, neckCm: number, waistCm: number, hipCm: number): number | null {
  if (heightCm <= 0 || neckCm <= 0 || waistCm <= 0) return null;
  if (gender === 'female' && hipCm <= 0) return null;

  let bf: number;

  if (gender === 'male') {
    // Metric Navy formula
    const denom = 1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm);
    if (denom <= 0) return null;
    bf = 495 / denom - 450;
  } else {
    const sum = waistCm + hipCm - neckCm;
    if (sum <= 0) return null;
    const denom = 1.29579 - 0.35004 * Math.log10(sum) + 0.22100 * Math.log10(heightCm);
    if (denom <= 0) return null;
    bf = 495 / denom - 450;
  }

  bf = clamp(bf, 3, 60); // realistic bounds
  return Math.round(bf * 10) / 10;
}

// YMCA formula (converted from lbs/inches source)
function calculateYmcaBF(gender: Gender, weightKg: number, waistCm: number): number | null {
  if (weightKg <= 0 || waistCm <= 0) return null;

  const weightLbs = weightKg * 2.20462;
  const waistIn = waistCm / 2.54;

  let bf: number;
  if (gender === 'male') {
    // ((4.15 × waist - 0.082 × weight - 98.42) / weight) × 100
    bf = ((4.15 * waistIn - 0.082 * weightLbs - 98.42) / weightLbs) * 100;
  } else {
    bf = ((4.15 * waistIn - 0.082 * weightLbs - 76.76) / weightLbs) * 100;
  }

  bf = clamp(bf, 3, 60);
  return Math.round(bf * 10) / 10;
}

function getCategory(bf: number, gender: Gender): { category: string; color: string } {
  if (gender === 'male') {
    if (bf < 6) return { category: 'Essential Fat', color: 'text-sky-600' };
    if (bf < 14) return { category: 'Athlete', color: 'text-emerald-600' };
    if (bf < 18) return { category: 'Fitness', color: 'text-green-600' };
    if (bf < 25) return { category: 'Average', color: 'text-amber-600' };
    return { category: 'Obese', color: 'text-rose-600' };
  } else {
    if (bf < 12) return { category: 'Essential Fat', color: 'text-sky-600' };
    if (bf < 21) return { category: 'Athlete', color: 'text-emerald-600' };
    if (bf < 25) return { category: 'Fitness', color: 'text-green-600' };
    if (bf < 32) return { category: 'Average', color: 'text-amber-600' };
    return { category: 'Obese', color: 'text-rose-600' };
  }
}

export function calculateBodyFat(inputs: BodyFatInputs): BodyFatResult | null {
  const { gender, unitSystem, height, neck, waist, hip, weight } = inputs;

  if (!gender || height <= 0 || waist <= 0) return null;

  const heightCm = toCm(height, unitSystem);
  const neckCm = toCm(neck, unitSystem);
  const waistCm = toCm(waist, unitSystem);
  const hipCm = toCm(hip, unitSystem);
  const weightKg = toKg(weight, unitSystem);

  const navy = calculateNavyBF(gender, heightCm, neckCm, waistCm, hipCm);
  const ymca = calculateYmcaBF(gender, weightKg, waistCm);

  const valid = [navy, ymca].filter((v): v is number => v !== null);
  const average = valid.length > 0 ? Math.round((valid.reduce((a, b) => a + b, 0) / valid.length) * 10) / 10 : null;

  let fatMassKg: number | null = null;
  let leanMassKg: number | null = null;
  if (average !== null && weightKg > 0) {
    fatMassKg = Math.round((weightKg * (average / 100)) * 10) / 10;
    leanMassKg = Math.round((weightKg - fatMassKg) * 10) / 10;
  }

  const { category, color } = average !== null ? getCategory(average, gender) : { category: '—', color: 'text-muted' };

  return {
    navy,
    ymca,
    average,
    fatMassKg,
    leanMassKg,
    category,
    categoryColor: color,
  };
}

export function formatBf(bf: number | null): string {
  return bf === null ? '—' : `${bf.toFixed(1)}%`;
}
