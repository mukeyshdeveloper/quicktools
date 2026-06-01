export type SchemeType = 'ppf' | 'nsc' | 'kvp';

export interface SmallSavingsInput {
  scheme: SchemeType;
  principal: number;           // For PPF: annual contribution. For NSC/KVP: lump sum
  years: number;               // Investment period
  currentRate?: number | undefined; // Optional override
}

export interface SmallSavingsResult {
  maturityAmount: number;
  totalInvestment: number;
  interestEarned: number;
  schemeName: string;
  rateUsed: number;
  tenure: string;
}

// Current rates as of FY 2025-26 (approximate - update when new rates announced)
const RATES = {
  ppf: 7.1,
  nsc: 7.7,
  kvp: 7.5,
};

const TENURES = {
  ppf: '15 years (extendable)',
  nsc: '5 years',
  kvp: '115 months (~9 years 7 months)',
};

/**
 * Calculate maturity for PPF (compounded annually)
 */
function calculatePPF(annualContribution: number, years: number, rate: number): Omit<SmallSavingsResult, 'schemeName' | 'rateUsed' | 'tenure'> {
  let balance = 0;
  let totalInvestment = 0;

  for (let y = 1; y <= years; y++) {
    balance = balance * (1 + rate / 100) + annualContribution;
    totalInvestment += annualContribution;
  }

  const maturityAmount = Math.round(balance);
  return {
    maturityAmount,
    totalInvestment: Math.round(totalInvestment),
    interestEarned: Math.round(maturityAmount - totalInvestment),
  };
}

/**
 * Calculate maturity for NSC / KVP (simple compound)
 */
function calculateNSCorKVP(principal: number, years: number, rate: number): Omit<SmallSavingsResult, 'schemeName' | 'rateUsed' | 'tenure'> {
  const maturityAmount = Math.round(principal * Math.pow(1 + rate / 100, years));
  return {
    maturityAmount,
    totalInvestment: Math.round(principal),
    interestEarned: Math.round(maturityAmount - principal),
  };
}

export function calculateSmallSavings(input: SmallSavingsInput): SmallSavingsResult {
  const { scheme, principal, years } = input;
  const rate = input.currentRate ?? RATES[scheme];

  let result: Omit<SmallSavingsResult, 'schemeName' | 'rateUsed' | 'tenure'>;

  if (scheme === 'ppf') {
    result = calculatePPF(principal, years, rate);
  } else {
    // For NSC and KVP, we treat "years" as the actual tenure in years
    result = calculateNSCorKVP(principal, years, rate);
  }

  const schemeNames = {
    ppf: 'Public Provident Fund (PPF)',
    nsc: 'National Savings Certificate (NSC)',
    kvp: 'Kisan Vikas Patra (KVP)',
  };

  return {
    ...result,
    schemeName: schemeNames[scheme],
    rateUsed: rate,
    tenure: TENURES[scheme],
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
