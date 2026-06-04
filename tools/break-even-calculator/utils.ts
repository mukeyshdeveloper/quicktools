export interface BreakEvenInputs {
  fixedCosts: number;
  pricePerUnit: number;
  variableCostPerUnit: number;
  targetProfit?: number;
}

export interface BreakEvenResult {
  breakEvenUnits: number;
  breakEvenRevenue: number;
  contributionMargin: number;
  contributionMarginRatio: number;
  marginOfSafetyUnits?: number;
  marginOfSafetyRevenue?: number;
  targetUnits?: number | undefined;
  targetRevenue?: number | undefined;
  isValid: boolean;
}

export function calculateBreakEven(inputs: BreakEvenInputs): BreakEvenResult {
  const { fixedCosts, pricePerUnit, variableCostPerUnit, targetProfit = 0 } = inputs;

  if (fixedCosts <= 0 || pricePerUnit <= 0 || variableCostPerUnit < 0) {
    return {
      breakEvenUnits: 0,
      breakEvenRevenue: 0,
      contributionMargin: 0,
      contributionMarginRatio: 0,
      targetUnits: undefined,
      targetRevenue: undefined,
      isValid: false,
    };
  }

  const cm = pricePerUnit - variableCostPerUnit;
  if (cm <= 0) {
    return {
      breakEvenUnits: 0,
      breakEvenRevenue: 0,
      contributionMargin: cm,
      contributionMarginRatio: 0,
      targetUnits: undefined,
      targetRevenue: undefined,
      isValid: false,
    };
  }

  const cmr = cm / pricePerUnit;
  const beUnits = Math.ceil(fixedCosts / cm);
  const beRevenue = beUnits * pricePerUnit;

  let targetUnits: number | undefined;
  let targetRevenue: number | undefined;

  if (targetProfit > 0) {
    targetUnits = Math.ceil((fixedCosts + targetProfit) / cm);
    targetRevenue = targetUnits * pricePerUnit;
  }

  return {
    breakEvenUnits: beUnits,
    breakEvenRevenue: Math.round(beRevenue),
    contributionMargin: cm,
    contributionMarginRatio: Math.round(cmr * 1000) / 10,
    targetUnits,
    targetRevenue: targetRevenue ? Math.round(targetRevenue) : undefined,
    isValid: true,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-IN').format(Math.round(n));
}
