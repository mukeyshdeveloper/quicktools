export type PayPeriod = 'hourly' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'annual';

export interface SalaryInput {
  amount: number;
  payPeriod: PayPeriod;
  hoursPerWeek: number;
  daysPerWeek: number;
  taxRate: number; // percentage
}

export interface SalaryResult {
  hourly: number;
  daily: number;
  weekly: number;
  biweekly: number;
  monthly: number;
  annual: number;
  afterTaxAnnual: number;
  afterTaxMonthly: number;
  afterTaxWeekly: number;
  afterTaxHourly: number;
  taxAmount: number;
}

export function calculateSalary(input: SalaryInput): SalaryResult | null {
  const { amount, payPeriod, hoursPerWeek, daysPerWeek, taxRate } = input;
  if (amount <= 0 || hoursPerWeek <= 0 || daysPerWeek <= 0) return null;

  const hoursPerYear = hoursPerWeek * 52;
  const daysPerYear = daysPerWeek * 52;

  let annual: number;
  switch (payPeriod) {
    case 'hourly':    annual = amount * hoursPerYear; break;
    case 'daily':     annual = amount * daysPerYear; break;
    case 'weekly':    annual = amount * 52; break;
    case 'biweekly':  annual = amount * 26; break;
    case 'monthly':   annual = amount * 12; break;
    case 'annual':    annual = amount; break;
    default:          return null;
  }

  const hourly     = annual / hoursPerYear;
  const daily      = annual / daysPerYear;
  const weekly     = annual / 52;
  const biweekly   = annual / 26;
  const monthly    = annual / 12;
  const taxAmount  = annual * (taxRate / 100);
  const afterTaxAnnual  = annual - taxAmount;

  const round = (n: number) => Math.round(n * 100) / 100;

  return {
    hourly:         round(hourly),
    daily:          round(daily),
    weekly:         round(weekly),
    biweekly:       round(biweekly),
    monthly:        round(monthly),
    annual:         round(annual),
    afterTaxAnnual: round(afterTaxAnnual),
    afterTaxMonthly:round(afterTaxAnnual / 12),
    afterTaxWeekly: round(afterTaxAnnual / 52),
    afterTaxHourly: round(afterTaxAnnual / hoursPerYear),
    taxAmount:      round(taxAmount),
  };
}
