export interface EpfInput {
  monthlySalary: number;        // Basic + DA
  currentEpfBalance: number;
  yearsToRetirement: number;
  salaryGrowthRate: number;     // Annual %
  epfInterestRate: number;      // Annual %
  yearsOfService: number;       // For Gratuity
}

export interface EpfResult {
  totalEpfCorpus: number;
  totalContributions: number;
  interestEarned: number;
}

export interface GratuityResult {
  gratuityAmount: number;
  isEligible: boolean; // 5+ years
}

export interface CombinedResult {
  epf: EpfResult;
  gratuity: GratuityResult;
  totalRetirementBenefit: number;
}

/**
 * Calculate projected EPF corpus at retirement.
 * Uses monthly contributions with annual compounding approximation.
 */
export function calculateEpfMaturity(input: EpfInput): EpfResult {
  const {
    monthlySalary,
    currentEpfBalance,
    yearsToRetirement,
    salaryGrowthRate,
    epfInterestRate,
  } = input;

  if (monthlySalary <= 0 || yearsToRetirement <= 0) {
    return { totalEpfCorpus: 0, totalContributions: 0, interestEarned: 0 };
  }

  const monthlyRate = epfInterestRate / 100 / 12;
  const annualGrowth = 1 + salaryGrowthRate / 100;

  let balance = currentEpfBalance;
  let totalContributions = currentEpfBalance;

  // Monthly contribution = 12% employee + 3.67% employer = 15.67% of salary
  let currentMonthlyContribution = monthlySalary * 0.1567;

  for (let year = 1; year <= yearsToRetirement; year++) {
    // Increase salary and contribution once a year
    if (year > 1) {
      currentMonthlyContribution *= annualGrowth;
    }

    // Add 12 months of contributions + interest (simplified monthly compounding)
    for (let month = 1; month <= 12; month++) {
      balance = balance * (1 + monthlyRate) + currentMonthlyContribution;
      totalContributions += currentMonthlyContribution;
    }
  }

  const totalEpfCorpus = Math.round(balance);
  const interestEarned = Math.round(totalEpfCorpus - totalContributions);

  return {
    totalEpfCorpus,
    totalContributions: Math.round(totalContributions),
    interestEarned: Math.max(0, interestEarned),
  };
}

/**
 * Calculate Gratuity amount.
 * Formula: (Basic + DA) × 15/26 × Years of Service
 * Capped at ₹25,00,000 (current limit)
 */
export function calculateGratuity(monthlySalary: number, yearsOfService: number): GratuityResult {
  const isEligible = yearsOfService >= 5;

  if (!isEligible || monthlySalary <= 0) {
    return { gratuityAmount: 0, isEligible };
  }

  const gratuity = (monthlySalary * 15 / 26) * yearsOfService;
  const cappedGratuity = Math.min(gratuity, 2500000); // Current cap

  return {
    gratuityAmount: Math.round(cappedGratuity),
    isEligible: true,
  };
}

export function calculateCombined(input: EpfInput): CombinedResult {
  const epf = calculateEpfMaturity(input);
  const gratuity = calculateGratuity(input.monthlySalary, input.yearsOfService);

  return {
    epf,
    gratuity,
    totalRetirementBenefit: epf.totalEpfCorpus + gratuity.gratuityAmount,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
