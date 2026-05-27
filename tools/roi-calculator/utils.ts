export interface RoiInput {
  costOfInvestment: number;
  returnFromInvestment: number;
  investmentPeriodYears?: number;
}

export interface RoiResult {
  netProfit: number;
  roi: number;              // percentage
  annualizedRoi: number;   // percentage
  profitMargin: number;    // percentage (net profit / revenue)
  multiple: number;        // how many times your money grew
}

export function calculateRoi(input: RoiInput): RoiResult | null {
  const { costOfInvestment, returnFromInvestment, investmentPeriodYears = 1 } = input;
  if (costOfInvestment <= 0) return null;

  const netProfit = returnFromInvestment - costOfInvestment;
  const roi = (netProfit / costOfInvestment) * 100;
  const multiple = returnFromInvestment / costOfInvestment;
  const profitMargin = returnFromInvestment > 0 ? (netProfit / returnFromInvestment) * 100 : 0;

  // Annualized ROI: (1 + ROI)^(1/years) - 1
  const years = investmentPeriodYears > 0 ? investmentPeriodYears : 1;
  const annualizedRoi = (Math.pow(1 + roi / 100, 1 / years) - 1) * 100;

  const round = (n: number) => Math.round(n * 100) / 100;

  return {
    netProfit: round(netProfit),
    roi: round(roi),
    annualizedRoi: round(annualizedRoi),
    profitMargin: round(profitMargin),
    multiple: round(multiple),
  };
}
