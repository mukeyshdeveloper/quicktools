export interface LoanEligibilityInput {
  monthlyIncome: number;
  existingEmi: number;
  desiredTenureYears: number;
  interestRate: number;      // Annual %
  foirPercentage: number;    // e.g. 55 for 55%
}

export interface LoanEligibilityResult {
  maxLoanAmount: number;
  emiForMaxLoan: number;
  maxAllowedEmi: number;
  totalInterest: number;
  totalPayment: number;
  foirUsed: number;
}

/**
 * Calculate EMI for a given principal, rate and tenure.
 */
function calculateEmi(principal: number, annualRate: number, tenureMonths: number): number {
  if (principal <= 0 || tenureMonths <= 0) return 0;

  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / tenureMonths;

  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
              (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  return Math.round(emi);
}

/**
 * Calculate maximum loan amount for a given max EMI, rate and tenure.
 * Uses formula rearrangement.
 */
function calculateMaxLoanAmount(maxEmi: number, annualRate: number, tenureMonths: number): number {
  if (maxEmi <= 0 || tenureMonths <= 0) return 0;

  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
    return Math.round(maxEmi * tenureMonths);
  }

  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const maxPrincipal = (maxEmi * (factor - 1)) / (monthlyRate * factor);

  return Math.round(maxPrincipal);
}

/**
 * Main function to calculate home loan eligibility.
 */
export function calculateHomeLoanEligibility(input: LoanEligibilityInput): LoanEligibilityResult {
  const {
    monthlyIncome,
    existingEmi,
    desiredTenureYears,
    interestRate,
    foirPercentage,
  } = input;

  if (monthlyIncome <= 0 || desiredTenureYears <= 0) {
    return {
      maxLoanAmount: 0,
      emiForMaxLoan: 0,
      maxAllowedEmi: 0,
      totalInterest: 0,
      totalPayment: 0,
      foirUsed: foirPercentage,
    };
  }

  const tenureMonths = Math.round(desiredTenureYears * 12);

  // Step 1: Calculate max EMI bank will allow
  const maxAllowedEmi = Math.round((monthlyIncome - existingEmi) * (foirPercentage / 100));

  // Step 2: Calculate max loan amount for that EMI
  const maxLoanAmount = calculateMaxLoanAmount(maxAllowedEmi, interestRate, tenureMonths);

  // Step 3: Calculate actual EMI for that loan (should be close to maxAllowedEmi)
  const emiForMaxLoan = calculateEmi(maxLoanAmount, interestRate, tenureMonths);

  const totalPayment = emiForMaxLoan * tenureMonths;
  const totalInterest = totalPayment - maxLoanAmount;

  return {
    maxLoanAmount: Math.max(0, maxLoanAmount),
    emiForMaxLoan: Math.max(0, emiForMaxLoan),
    maxAllowedEmi: Math.max(0, maxAllowedEmi),
    totalInterest: Math.max(0, Math.round(totalInterest)),
    totalPayment: Math.max(0, Math.round(totalPayment)),
    foirUsed: foirPercentage,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Suggests maximum tenure based on age (common bank rule: retire by 70).
 */
export function getRecommendedMaxTenure(age: number): number {
  const maxAge = 70;
  return Math.max(5, maxAge - age);
}
