export function calculateWhatPercentOf(part: number, whole: number): number | null {
  if (whole === 0 || isNaN(part) || isNaN(whole)) return null;
  return (part / whole) * 100;
}

export function calculateXPercentOfY(percent: number, value: number): number | null {
  if (isNaN(percent) || isNaN(value)) return null;
  return (percent / 100) * value;
}

export function calculatePercentChange(oldVal: number, newVal: number): number | null {
  if (oldVal === 0 || isNaN(oldVal) || isNaN(newVal)) return null;
  return ((newVal - oldVal) / Math.abs(oldVal)) * 100;
}
