export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface InvoiceData {
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  toName: string;
  toEmail: string;
  toAddress: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  taxRate: number;
  discount: number;
  notes: string;
  currency: string;
}

export const CURRENCIES = [
  { symbol: '$', code: 'USD', name: 'US Dollar' },
  { symbol: '€', code: 'EUR', name: 'Euro' },
  { symbol: '£', code: 'GBP', name: 'British Pound' },
  { symbol: '₹', code: 'INR', name: 'Indian Rupee' },
  { symbol: '¥', code: 'JPY', name: 'Japanese Yen' },
  { symbol: 'A$', code: 'AUD', name: 'Australian Dollar' },
  { symbol: 'C$', code: 'CAD', name: 'Canadian Dollar' },
];

export function calculateSubtotal(items: InvoiceItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
}

export function calculateTax(subtotal: number, discount: number, taxRate: number): number {
  const taxableAmount = Math.max(0, subtotal - discount);
  return taxableAmount * (taxRate / 100);
}

export function calculateTotal(subtotal: number, tax: number, discount: number): number {
  return Math.max(0, subtotal - discount) + tax;
}

export function formatCurrency(amount: number, currencyCode: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  } catch (e) {
    return `$${amount.toFixed(2)}`;
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function getDefaultInvoice(): InvoiceData {
  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);

  return {
    fromName: '',
    fromEmail: '',
    fromAddress: '',
    toName: '',
    toEmail: '',
    toAddress: '',
    invoiceNumber: `INV-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}-${Math.floor(Math.random() * 1000)}`,
    date: today.toISOString().split('T')[0] as string,
    dueDate: nextMonth.toISOString().split('T')[0] as string,
    items: [{ id: generateId(), description: '', quantity: 1, rate: 0 }],
    taxRate: 0,
    discount: 0,
    notes: 'Thank you for your business!',
    currency: 'USD',
  };
}
