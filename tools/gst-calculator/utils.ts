export type GstMode = 'exclusive' | 'inclusive';
export type SupplyType = 'intra' | 'inter';

export interface GstInput {
  amount: number;
  rate: number;           // e.g. 18 for 18%
  mode: GstMode;
  supplyType: SupplyType;
}

export interface GstResult {
  taxableValue: number;   // Base amount before GST
  gstAmount: number;      // Total GST
  cgst: number;           // Only for intra-state
  sgst: number;           // Only for intra-state
  igst: number;           // Only for inter-state
  totalAmount: number;    // Final amount payable
  effectiveRate: number;
}

/**
 * Pure GST calculation function.
 * All values are rounded to 2 decimal places for currency.
 */
export function calculateGST(input: GstInput): GstResult | null {
  const { amount, rate, mode, supplyType } = input;

  if (!amount || amount <= 0 || rate < 0 || rate > 100) {
    return null;
  }

  let taxableValue: number;
  let gstAmount: number;

  if (mode === 'exclusive') {
    // User entered base amount → add GST
    taxableValue = amount;
    gstAmount = (taxableValue * rate) / 100;
  } else {
    // User entered final amount (inclusive) → extract GST
    taxableValue = amount / (1 + rate / 100);
    gstAmount = amount - taxableValue;
  }

  const totalAmount = taxableValue + gstAmount;

  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  if (supplyType === 'intra') {
    // Intra-state: CGST + SGST (split equally)
    cgst = gstAmount / 2;
    sgst = gstAmount / 2;
  } else {
    // Inter-state: Full GST as IGST
    igst = gstAmount;
  }

  // Round all monetary values to 2 decimals
  const round = (n: number) => Math.round(n * 100) / 100;

  return {
    taxableValue: round(taxableValue),
    gstAmount: round(gstAmount),
    cgst: round(cgst),
    sgst: round(sgst),
    igst: round(igst),
    totalAmount: round(totalAmount),
    effectiveRate: rate,
  };
}

/**
 * Formats number in Indian style with ₹ symbol
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
