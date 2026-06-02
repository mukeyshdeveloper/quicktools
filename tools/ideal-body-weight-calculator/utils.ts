export type Gender = 'male' | 'female';
export type UnitSystem = 'metric' | 'imperial';
export type Formula = 'devine' | 'robinson' | 'miller';

export interface IbwInputs {
  gender: Gender;
  unitSystem: UnitSystem;
  heightCm: number;
}

export interface IbwResult {
  devine: number; // kg
  robinson: number;
  miller: number;
  average: number;
  rangeLow: number;
  rangeHigh: number;
}

function inchesToCm(inches: number): number {
  return inches * 2.54;
}
function cmToInches(cm: number): number {
  return cm / 2.54;
}

export function calculateIbw(inputs: IbwInputs): IbwResult | null {
  const { gender, unitSystem, heightCm } = inputs;
  if (!heightCm || heightCm < 100) return null; // unrealistic below ~3'3"

  // Work in inches for formulas (original derivations)
  const heightIn = unitSystem === 'metric' ? cmToInches(heightCm) : heightCm;

  if (heightIn < 58 || heightIn > 90) return null; // guard

  let devineKg: number;
  let robinsonKg: number;
  let millerKg: number;

  if (gender === 'male') {
    devineKg = 50 + 2.3 * (heightIn - 60);
    robinsonKg = 52 + 1.9 * (heightIn - 60);
    millerKg = 56.2 + 1.41 * (heightIn - 60);
  } else {
    devineKg = 45.5 + 2.3 * (heightIn - 60);
    robinsonKg = 49 + 1.7 * (heightIn - 60);
    millerKg = 53.1 + 1.36 * (heightIn - 60);
  }

  const devine = Math.round(devineKg * 10) / 10;
  const robinson = Math.round(robinsonKg * 10) / 10;
  const miller = Math.round(millerKg * 10) / 10;

  const average = Math.round(((devine + robinson + miller) / 3) * 10) / 10;
  const rangeLow = Math.min(devine, robinson, miller);
  const rangeHigh = Math.max(devine, robinson, miller);

  return { devine, robinson, miller, average, rangeLow, rangeHigh };
}

export function formatWeight(kg: number, unit: UnitSystem): string {
  if (unit === 'metric') return `${kg.toFixed(1)} kg`;
  const lbs = Math.round(kg * 2.20462 * 10) / 10;
  return `${lbs} lbs`;
}

export const formulaNames: Record<Formula, string> = {
  devine: 'Devine (most used in medicine)',
  robinson: 'Robinson',
  miller: 'Miller',
};

export const formulaDescriptions: Record<Formula, string> = {
  devine: 'Developed in 1974. Still the most widely referenced in clinical settings and drug dosing.',
  robinson: 'A 1983 modification that produces slightly lower values for shorter people.',
  miller: 'Another 1983 revision, tends to give higher estimates especially for taller individuals.',
};
