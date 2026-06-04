export type NumberSystem = 'indian' | 'international';

const INDIAN_UNITS = [
  { value: 1e19, name: 'Shankh' },
  { value: 1e17, name: 'Padma' },
  { value: 1e15, name: 'Neel' },
  { value: 1e13, name: 'Kharab' },
  { value: 1e11, name: 'Arab' },
  { value: 1e9, name: 'Crore' },
  { value: 1e7, name: 'Lakh' },
  { value: 1e5, name: 'Thousand' },
];

export function formatIndianNumber(num: number): string {
  if (num < 1000) return num.toString();
  const str = Math.round(num).toString();
  let result = '';
  let i = str.length;
  let count = 0;

  // Last 3 digits
  while (i > 0) {
    if (count === 3) {
      result = ',' + result;
      count = 0;
    }
    result = str[i - 1] + result;
    i--;
    count++;
  }

  // Then groups of 2
  // Actually standard Indian: after first 3, every 2
  // Better implementation:
  const n = Math.floor(num);
  if (n < 1000) return n.toLocaleString('en-IN');

  let s = n.toString();
  const last3 = s.slice(-3);
  s = s.slice(0, -3);

  const groups: string[] = [];
  while (s.length > 0) {
    groups.unshift(s.slice(-2));
    s = s.slice(0, -2);
  }

  return (groups.length ? groups.join(',') + ',' : '') + last3;
}

export function formatInternationalNumber(num: number): string {
  return Math.round(num).toLocaleString('en-US');
}

export function convertNumber(value: number, from: NumberSystem, to: NumberSystem): number {
  if (from === to) return value;
  // Since they are just naming, the numeric value is the same. The converter is mainly for formatting and naming units.
  // For true "Lakh to Million", people often mean expressing the same quantity.
  // But to make useful, provide unit explanation.
  return value; // numeric value unchanged
}

export function getUnitBreakdown(num: number): Array<{ unit: string; value: number }> {
  const abs = Math.abs(Math.round(num));
  const breakdown: Array<{ unit: string; value: number }> = [];

  let remaining = abs;

  for (const unit of INDIAN_UNITS) {
    if (remaining >= unit.value) {
      const count = Math.floor(remaining / unit.value);
      breakdown.push({ unit: unit.name, value: count });
      remaining %= unit.value;
    }
  }

  if (remaining > 0) {
    breakdown.push({ unit: 'Units', value: remaining });
  }

  return breakdown;
}
