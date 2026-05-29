export interface DiscountResult {
  originalPrice: number;
  discountAmount: number;
  priceAfterDiscount: number;
  taxAmount: number;
  finalPrice: number;
  totalSaved: number;
}

export function calculateDiscount(
  price: number,
  discountPercent: number,
  taxPercent: number = 0
): DiscountResult | null {
  if (isNaN(price) || price <= 0) return null;
  if (isNaN(discountPercent) || discountPercent < 0 || discountPercent > 100) return null;
  if (isNaN(taxPercent) || taxPercent < 0) return null;

  const discountAmount = price * (discountPercent / 100);
  const priceAfterDiscount = price - discountAmount;
  const taxAmount = priceAfterDiscount * (taxPercent / 100);
  const finalPrice = priceAfterDiscount + taxAmount;

  return {
    originalPrice: price,
    discountAmount,
    priceAfterDiscount,
    taxAmount,
    finalPrice,
    totalSaved: discountAmount,
  };
}
