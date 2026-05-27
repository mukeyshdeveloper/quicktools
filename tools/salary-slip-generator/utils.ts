export interface EarningRow {
  label: string;
  amount: number;
}

export interface DeductionRow {
  label: string;
  amount: number;
}

export interface CompanyDetails {
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  cin?: string;
}

export interface EmployeeDetails {
  employeeName: string;
  employeeId: string;
  designation: string;
  department: string;
  dateOfJoining: string;
  panNumber?: string;
  pfNumber?: string;
  bankAccount?: string;
  ifscCode?: string;
  payPeriod: string; // e.g. "May 2026"
  workingDays: number;
  paidDays: number;
}

export interface SalarySlipData {
  company: CompanyDetails;
  employee: EmployeeDetails;
  earnings: EarningRow[];
  deductions: DeductionRow[];
}

export interface SalarySlipResult {
  grossEarnings: number;
  totalDeductions: number;
  netPay: number;
  netPayWords: string;
}

function ones(n: number): string {
  const w = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'];
  return w[n] ?? '';
}

function tens(n: number): string {
  const w = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const t = Math.floor(n / 10);
  const o = n % 10;
  return n < 20 ? ones(n) : (w[t] ?? '') + (o ? ' ' + ones(o) : '');
}

function toWords(n: number): string {
  if (n === 0) return 'Zero';
  if (n < 0) return 'Minus ' + toWords(-n);

  let result = '';
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const hundred = Math.floor((n % 1000) / 100);
  const remainder = n % 100;

  if (crore) result += toWords(crore) + ' Crore ';
  if (lakh) result += toWords(lakh) + ' Lakh ';
  if (thousand) result += toWords(thousand) + ' Thousand ';
  if (hundred) result += ones(hundred) + ' Hundred ';
  if (remainder) result += tens(remainder) + ' ';
  return result.trim();
}

export function computeSalarySlip(data: SalarySlipData): SalarySlipResult {
  const grossEarnings = data.earnings.reduce((s, r) => s + (r.amount || 0), 0);
  const totalDeductions = data.deductions.reduce((s, r) => s + (r.amount || 0), 0);
  const netPay = Math.max(0, grossEarnings - totalDeductions);
  const netPayWords = toWords(Math.round(netPay)) + ' Rupees Only';

  return { grossEarnings, totalDeductions, netPay, netPayWords };
}

export function buildDefaultEarnings(basic: number): EarningRow[] {
  const hra = Math.round(basic * 0.4);
  const da = Math.round(basic * 0.1);
  const special = Math.round(basic * 0.15);
  const transport = 1600;
  return [
    { label: 'Basic Salary', amount: basic },
    { label: 'House Rent Allowance (HRA)', amount: hra },
    { label: 'Dearness Allowance (DA)', amount: da },
    { label: 'Special Allowance', amount: special },
    { label: 'Transport Allowance', amount: transport },
  ];
}

export function buildDefaultDeductions(basic: number): DeductionRow[] {
  const pf = Math.round(basic * 0.12);
  return [
    { label: 'Provident Fund (PF)', amount: pf },
    { label: 'Professional Tax', amount: 200 },
    { label: 'TDS (Income Tax)', amount: 0 },
  ];
}

export function fmt(n: number): string {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
