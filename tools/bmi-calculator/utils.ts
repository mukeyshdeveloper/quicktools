export type BmiUnitSystem = 'metric' | 'imperial';
export type BmiCategory = 'Underweight' | 'Normal weight' | 'Overweight' | 'Obese';

export interface BmiInput {
  unitSystem: BmiUnitSystem;
  weight: number;
  height: number;
}

export interface BmiResult {
  bmi: number;
  category: BmiCategory;
  categoryColor: string;
  indicatorPercent: number;
  idealWeightMinKg: number;
  idealWeightMaxKg: number;
  weightKg: number;
  heightCm: number;
}

const poundsToKilograms = 0.453592;
const inchesToCentimeters = 2.54;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function getCategory(bmi: number): Pick<
  BmiResult,
  'category' | 'categoryColor' | 'indicatorPercent'
> {
  if (bmi < 18.5) {
    return {
      category: 'Underweight',
      categoryColor: '#457b9d',
      indicatorPercent: clamp((bmi / 18.5) * 20, 2, 20),
    };
  }

  if (bmi < 25) {
    return {
      category: 'Normal weight',
      categoryColor: '#52b788',
      indicatorPercent: 20 + ((bmi - 18.5) / 6.5) * 25,
    };
  }

  if (bmi < 30) {
    return {
      category: 'Overweight',
      categoryColor: '#f4a261',
      indicatorPercent: 45 + ((bmi - 25) / 5) * 20,
    };
  }

  return {
    category: 'Obese',
    categoryColor: '#e76f51',
    indicatorPercent: clamp(65 + ((bmi - 30) / 10) * 30, 65, 97),
  };
}

export function calculateBmi(input: BmiInput): BmiResult | null {
  if (input.weight <= 0 || input.height <= 0) {
    return null;
  }

  const weightKg: number =
    input.unitSystem === 'metric'
      ? input.weight
      : input.weight * poundsToKilograms;
  const heightCm: number =
    input.unitSystem === 'metric'
      ? input.height
      : input.height * inchesToCentimeters;
  const heightMeters: number = heightCm / 100;

  if (weightKg <= 0 || heightMeters <= 0) {
    return null;
  }

  const bmi: number = weightKg / (heightMeters * heightMeters);
  const categoryInfo = getCategory(bmi);

  return {
    bmi,
    ...categoryInfo,
    indicatorPercent: clamp(categoryInfo.indicatorPercent, 2, 97),
    idealWeightMinKg: 18.5 * heightMeters * heightMeters,
    idealWeightMaxKg: 24.9 * heightMeters * heightMeters,
    weightKg,
    heightCm,
  };
}
