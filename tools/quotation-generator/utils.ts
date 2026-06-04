export interface QuoteItem {
  description: string;
  qty: number;
  rate: number;
}

export interface QuoteData {
  quoteNumber: string;
  date: string;
  validUntil: string;
  from: string;
  to: string;
  items: QuoteItem[];
  taxRate: number;
  discount: number;
  notes: string;
  terms: string;
}

export function calculateQuote(items: QuoteItem[], taxRate: number, discount: number) {
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const discountAmount = (subtotal * (discount || 0)) / 100;
  const afterDiscount = subtotal - discountAmount;
  const taxAmount = (afterDiscount * (taxRate || 0)) / 100;
  const total = afterDiscount + taxAmount;

  return {
    subtotal: Math.round(subtotal),
    discountAmount: Math.round(discountAmount),
    taxAmount: Math.round(taxAmount),
    total: Math.round(total),
  };
}

export const DEFAULT_QUOTE = {
  quoteNumber: 'QT-1001',
  date: new Date().toISOString().split('T')[0],
  validUntil: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
  from: 'Your Company Name\n123 Business Street\nCity, State 000000\nemail@company.com',
  to: 'Client Name\nClient Company\nClient Address',
  items: [
    { description: 'Website Design', qty: 1, rate: 25000 },
    { description: 'Development (10 hrs)', qty: 10, rate: 1200 },
  ],
  taxRate: 18,
  discount: 0,
  notes: 'Thank you for the opportunity. We look forward to working with you.',
  terms: '50% advance, 50% on delivery. Valid for 30 days.',
} as QuoteData;
