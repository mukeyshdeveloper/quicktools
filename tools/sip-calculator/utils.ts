export interface SipInput {
  monthlyInvestment: number;
  annualReturnRate: number;
  years: number;
}

export interface SipResult {
  futureValue: number;
  totalInvested: number;
  wealthGained: number;
  yearlyBreakdown: SipYearlyData[];
}

export interface SipYearlyData {
  year: number;
  invested: number;
  value: number;
  returns: number;
}

export function calculateSip(input: SipInput): SipResult | null {
  const { monthlyInvestment, annualReturnRate, years } = input;
  if (monthlyInvestment <= 0 || annualReturnRate < 0 || years <= 0) return null;

  const r = annualReturnRate / 100 / 12; // monthly rate
  const n = years * 12; // total months

  // FV of SIP = P * [((1+r)^n - 1) / r] * (1+r)
  let futureValue: number;
  if (r === 0) {
    futureValue = monthlyInvestment * n;
  } else {
    futureValue = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  }

  const totalInvested = monthlyInvestment * n;
  const wealthGained = futureValue - totalInvested;

  const yearlyBreakdown: SipYearlyData[] = [];
  for (let year = 1; year <= years; year++) {
    const months = year * 12;
    const yearFV = r === 0
      ? monthlyInvestment * months
      : monthlyInvestment * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
    const invested = monthlyInvestment * months;
    yearlyBreakdown.push({
      year,
      invested: Math.round(invested * 100) / 100,
      value: Math.round(yearFV * 100) / 100,
      returns: Math.round((yearFV - invested) * 100) / 100,
    });
  }

  return {
    futureValue: Math.round(futureValue * 100) / 100,
    totalInvested: Math.round(totalInvested * 100) / 100,
    wealthGained: Math.round(wealthGained * 100) / 100,
    yearlyBreakdown,
  };
}
