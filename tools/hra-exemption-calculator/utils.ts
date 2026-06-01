export interface HraInput {
  basicDa: number;           // Basic Salary + Dearness Allowance (monthly)
  hraReceived: number;       // HRA received from employer (monthly)
  rentPaid: number;          // Actual rent paid (monthly)
  isMetro: boolean;          // true = Metro (50%), false = Non-Metro (40%)
}

export interface HraResult {
  exemptAmount: number;
  taxableHra: number;
  limit1_actualHra: number;
  limit2_percentOfSalary: number;
  limit3_rentMinusTenPercent: number;
  appliedLimit: string;      // Which limit was used
}

/**
 * Calculate HRA Exemption as per Section 10(13A)
 * Exemption = Least of the three limits
 */
export function calculateHraExemption(input: HraInput): HraResult {
  const { basicDa, hraReceived, rentPaid, isMetro } = input;

  if (basicDa <= 0 || hraReceived <= 0 || rentPaid <= 0) {
    return {
      exemptAmount: 0,
      taxableHra: hraReceived,
      limit1_actualHra: hraReceived,
      limit2_percentOfSalary: 0,
      limit3_rentMinusTenPercent: 0,
      appliedLimit: 'Invalid input',
    };
  }

  const limit1 = hraReceived;
  const limit2 = basicDa * (isMetro ? 0.5 : 0.4);
  const limit3 = Math.max(0, rentPaid - basicDa * 0.1);

  const exemptAmount = Math.min(limit1, limit2, limit3);
  const taxableHra = Math.max(0, hraReceived - exemptAmount);

  let appliedLimit = '';
  if (exemptAmount === limit1) appliedLimit = 'Actual HRA Received';
  else if (exemptAmount === limit2) appliedLimit = isMetro ? '50% of (Basic + DA)' : '40% of (Basic + DA)';
  else appliedLimit = 'Rent Paid – 10% of (Basic + DA)';

  return {
    exemptAmount: Math.round(exemptAmount),
    taxableHra: Math.round(taxableHra),
    limit1_actualHra: Math.round(limit1),
    limit2_percentOfSalary: Math.round(limit2),
    limit3_rentMinusTenPercent: Math.round(limit3),
    appliedLimit,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
