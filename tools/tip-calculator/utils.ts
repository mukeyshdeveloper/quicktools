export interface TipResult {
  tipAmount: number;
  totalBill: number;
  tipPerPerson: number;
  totalPerPerson: number;
}

export function calculateTip(
  billAmount: number,
  tipPercent: number,
  people: number = 1
): TipResult | null {
  if (isNaN(billAmount) || billAmount <= 0) return null;
  if (isNaN(tipPercent) || tipPercent < 0) return null;
  if (isNaN(people) || people < 1) return null;

  const tipAmount = billAmount * (tipPercent / 100);
  const totalBill = billAmount + tipAmount;

  return {
    tipAmount,
    totalBill,
    tipPerPerson: tipAmount / people,
    totalPerPerson: totalBill / people,
  };
}
