/**
 * Tax Regime Comparator - Updated for FY 2025-26 (AY 2026-27)
 *
 * New Regime slabs as per Budget 2024 (no major changes in Budget 2025)
 * Standard Deduction (New): ₹75,000
 * Standard Deduction (Old): ₹50,000
 * Rebate u/s 87A (New): Full rebate up to ₹7 Lakh income
 */

export type AgeGroup = 'below60' | '60to80' | 'above80';

export interface TaxInput {
  grossIncome: number;
  ageGroup: AgeGroup;
  // Deductions only applicable in Old Regime
  deduction80C: number;      // Max 1,50,000
  deduction80D: number;      // Health insurance
  otherDeductions: number;   // HRA, Home loan interest, etc.
}

export interface TaxBreakdown {
  taxableIncome: number;
  taxBeforeCess: number;
  cess: number;
  totalTax: number;
  effectiveTaxRate: number;
}

export interface RegimeResult {
  regime: 'old' | 'new';
  breakdown: TaxBreakdown;
  isBetter: boolean;
  savings: number; // How much better than the other regime
}

export interface TaxComparison {
  oldRegime: RegimeResult;
  newRegime: RegimeResult;
  recommended: 'old' | 'new';
  savingsAmount: number;
}

// New Tax Regime Slabs (FY 2024-25 onwards)
const NEW_REGIME_SLABS = [
  { limit: 300000, rate: 0 },
  { limit: 700000, rate: 0.05 },
  { limit: 1000000, rate: 0.10 },
  { limit: 1200000, rate: 0.15 },
  { limit: 1500000, rate: 0.20 },
  { limit: Infinity, rate: 0.30 },
];

// Old Tax Regime Slabs (General - below 60)
const OLD_REGIME_SLABS_GENERAL = [
  { limit: 250000, rate: 0 },
  { limit: 500000, rate: 0.05 },
  { limit: 1000000, rate: 0.20 },
  { limit: Infinity, rate: 0.30 },
];

// Old Regime for Senior Citizens (60-80)
const OLD_REGIME_SLABS_SENIOR = [
  { limit: 300000, rate: 0 },
  { limit: 500000, rate: 0.05 },
  { limit: 1000000, rate: 0.20 },
  { limit: Infinity, rate: 0.30 },
];

// Old Regime for Super Senior (80+)
const OLD_REGIME_SLABS_SUPER_SENIOR = [
  { limit: 500000, rate: 0 },
  { limit: 1000000, rate: 0.20 },
  { limit: Infinity, rate: 0.30 },
];

function calculateTaxOnSlabs(taxableIncome: number, slabs: { limit: number; rate: number }[]): number {
  let tax = 0;
  let previousLimit = 0;

  for (const slab of slabs) {
    if (taxableIncome > previousLimit) {
      const taxableInThisSlab = Math.min(taxableIncome, slab.limit) - previousLimit;
      tax += taxableInThisSlab * slab.rate;
      previousLimit = slab.limit;
    }
  }
  return tax;
}

function calculateNewRegimeTax(grossIncome: number): TaxBreakdown {
  const standardDeduction = 75000;
  const taxableIncome = Math.max(0, grossIncome - standardDeduction);

  const taxBeforeCess = calculateTaxOnSlabs(taxableIncome, NEW_REGIME_SLABS);

  // Rebate u/s 87A - Full rebate if income <= 7L in new regime
  let finalTaxBeforeCess = taxBeforeCess;
  if (grossIncome <= 700000) {
    finalTaxBeforeCess = 0;
  }

  const cess = finalTaxBeforeCess * 0.04;
  const totalTax = Math.round(finalTaxBeforeCess + cess);
  const effectiveTaxRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;

  return {
    taxableIncome: Math.round(taxableIncome),
    taxBeforeCess: Math.round(finalTaxBeforeCess),
    cess: Math.round(cess),
    totalTax,
    effectiveTaxRate: Math.round(effectiveTaxRate * 100) / 100,
  };
}

function calculateOldRegimeTax(input: TaxInput): TaxBreakdown {
  const { grossIncome, ageGroup, deduction80C, deduction80D, otherDeductions } = input;

  const standardDeduction = 50000;

  // Total deductions under Chapter VI-A + standard deduction
  const chapter6ADeductions = Math.min(deduction80C, 150000) + deduction80D + otherDeductions;
  const totalDeductions = standardDeduction + chapter6ADeductions;

  const taxableIncome = Math.max(0, grossIncome - totalDeductions);

  let slabs;
  if (ageGroup === 'above80') {
    slabs = OLD_REGIME_SLABS_SUPER_SENIOR;
  } else if (ageGroup === '60to80') {
    slabs = OLD_REGIME_SLABS_SENIOR;
  } else {
    slabs = OLD_REGIME_SLABS_GENERAL;
  }

  let taxBeforeCess = calculateTaxOnSlabs(taxableIncome, slabs);

  // Rebate u/s 87A in old regime (up to ₹12,500 if income <= 5L)
  if (grossIncome <= 500000) {
    taxBeforeCess = Math.min(taxBeforeCess, 12500);
  }

  const cess = taxBeforeCess * 0.04;
  const totalTax = Math.round(taxBeforeCess + cess);
  const effectiveTaxRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;

  return {
    taxableIncome: Math.round(taxableIncome),
    taxBeforeCess: Math.round(taxBeforeCess),
    cess: Math.round(cess),
    totalTax,
    effectiveTaxRate: Math.round(effectiveTaxRate * 100) / 100,
  };
}

export function compareTaxRegimes(input: TaxInput): TaxComparison {
  const newRegime = calculateNewRegimeTax(input.grossIncome);
  const oldRegimeBreakdown = calculateOldRegimeTax(input);

  const oldResult: RegimeResult = {
    regime: 'old',
    breakdown: oldRegimeBreakdown,
    isBetter: false,
    savings: 0,
  };

  const newResult: RegimeResult = {
    regime: 'new',
    breakdown: newRegime,
    isBetter: false,
    savings: 0,
  };

  const oldTax = oldRegimeBreakdown.totalTax;
  const newTax = newRegime.totalTax;

  if (oldTax < newTax) {
    oldResult.isBetter = true;
    oldResult.savings = newTax - oldTax;
    newResult.savings = oldTax - newTax;
  } else {
    newResult.isBetter = true;
    newResult.savings = oldTax - newTax;
    oldResult.savings = newTax - oldTax;
  }

  const recommended = oldTax < newTax ? 'old' : 'new';
  const savingsAmount = Math.abs(oldTax - newTax);

  return {
    oldRegime: oldResult,
    newRegime: newResult,
    recommended,
    savingsAmount,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
