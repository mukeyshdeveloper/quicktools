export interface MarginCalcResult {
  cost: number;
  price: number;
  marginPercent: number;
  markupPercent: number;
  profit: number;
  isValid: boolean;
}

export function calculateFromCostAndPrice(cost: number, price: number): MarginCalcResult {
  if (cost <= 0 || price <= 0 || price < cost) {
    return { cost, price, marginPercent: 0, markupPercent: 0, profit: 0, isValid: false };
  }
  const profit = price - cost;
  const marginPercent = (profit / price) * 100;
  const markupPercent = (profit / cost) * 100;
  return {
    cost,
    price,
    marginPercent: Math.round(marginPercent * 100) / 100,
    markupPercent: Math.round(markupPercent * 100) / 100,
    profit: Math.round(profit * 100) / 100,
    isValid: true,
  };
}

export function calculatePriceFromCostAndMargin(cost: number, desiredMargin: number): number {
  if (cost <= 0 || desiredMargin >= 100 || desiredMargin <= 0) return 0;
  return cost / (1 - desiredMargin / 100);
}

export function calculatePriceFromCostAndMarkup(cost: number, markup: number): number {
  if (cost <= 0 || markup <= 0) return 0;
  return cost * (1 + markup / 100);
}

export function calculateMarginFromCostAndMarkup(cost: number, markup: number): number {
  if (cost <= 0 || markup <= 0) return 0;
  const price = cost * (1 + markup / 100);
  return ((price - cost) / price) * 100;
}

export function formatPercent(n: number): string {
  return `${n.toFixed(2)}%`;
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}
