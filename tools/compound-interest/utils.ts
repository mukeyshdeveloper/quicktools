export interface CompoundInterestInput {
  principal: number;
  annualRate: number;
  years: number;
  monthlyContribution: number;
  compoundingFrequency: number; // 1=yearly, 12=monthly, 365=daily
}

export interface CompoundInterestResult {
  futureValue: number;
  totalContributions: number;
  totalInterestEarned: number;
  yearlyBreakdown: YearlyData[];
}

export interface YearlyData {
  year: number;
  balance: number;
  contributions: number;
  interestEarned: number;
}

export function calculateCompoundInterest(input: CompoundInterestInput): CompoundInterestResult | null {
  const { principal, annualRate, years, monthlyContribution, compoundingFrequency } = input;
  if (principal < 0 || annualRate < 0 || years <= 0) return null;

  const r = annualRate / 100 / compoundingFrequency;
  const n = compoundingFrequency;
  const yearlyBreakdown: YearlyData[] = [];

  let balance = principal;
  let totalContributions = principal;
  let prevBalance = principal;

  for (let year = 1; year <= years; year++) {
    for (let period = 0; period < n; period++) {
      balance = balance * (1 + r) + (monthlyContribution * 12) / n;
    }
    totalContributions += monthlyContribution * 12;
    yearlyBreakdown.push({
      year,
      balance: Math.round(balance * 100) / 100,
      contributions: Math.round(totalContributions * 100) / 100,
      interestEarned: Math.round((balance - totalContributions) * 100) / 100,
    });
    prevBalance = balance;
  }

  const futureValue = Math.round(balance * 100) / 100;
  const totalInterestEarned = Math.round((futureValue - totalContributions) * 100) / 100;

  return {
    futureValue,
    totalContributions: Math.round(totalContributions * 100) / 100,
    totalInterestEarned,
    yearlyBreakdown,
  };
}
