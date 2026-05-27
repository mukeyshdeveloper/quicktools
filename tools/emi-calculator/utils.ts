export interface EmiInput {
  principal: number;
  annualRate: number;
  tenureMonths: number;
}

export interface EmiResult {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  schedule: AmortizationRow[];
}

export interface AmortizationRow {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

export function calculateEmi(input: EmiInput): EmiResult | null {
  const { principal, annualRate, tenureMonths } = input;
  if (principal <= 0 || annualRate < 0 || tenureMonths <= 0) return null;

  const r = annualRate / 12 / 100;

  let emi: number;
  if (r === 0) {
    emi = principal / tenureMonths;
  } else {
    emi = (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
  }

  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;

  const schedule: AmortizationRow[] = [];
  let balance = principal;
  for (let month = 1; month <= tenureMonths; month++) {
    const interest = balance * r;
    const principalPaid = emi - interest;
    balance = Math.max(0, balance - principalPaid);
    schedule.push({
      month,
      emi: Math.round(emi * 100) / 100,
      principal: Math.round(principalPaid * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      balance: Math.round(balance * 100) / 100,
    });
  }

  return {
    emi: Math.round(emi * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    schedule,
  };
}
