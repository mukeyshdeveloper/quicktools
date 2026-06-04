export interface InvoiceNumberRecord {
  number: string;
  date: string;
  client?: string;
  notes?: string;
}

export function loadRecords(): InvoiceNumberRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('quickutils-invoice-numbers') || '[]');
  } catch { return []; }
}

export function saveRecords(records: InvoiceNumberRecord[]) {
  try {
    localStorage.setItem('quickutils-invoice-numbers', JSON.stringify(records));
  } catch {}
}

export function generateNextNumber(prefix: string, start: number, used: InvoiceNumberRecord[]): string {
  const usedNumbers = new Set(used.map(r => r.number));
  let n = start;
  let candidate = `${prefix}${String(n).padStart(4, '0')}`;
  while (usedNumbers.has(candidate)) {
    n++;
    candidate = `${prefix}${String(n).padStart(4, '0')}`;
  }
  return candidate;
}

export function getLastNumber(prefix: string, start: number, used: InvoiceNumberRecord[]): string {
  if (used.length === 0) return `${prefix}${String(start).padStart(4, '0')}`;
  // Find highest numeric part for this prefix
  const matching = used
    .filter(r => r.number.startsWith(prefix))
    .map(r => parseInt(r.number.replace(prefix, ''), 10) || 0);
  const max = matching.length ? Math.max(...matching) : start - 1;
  return `${prefix}${String(max).padStart(4, '0')}`;
}
