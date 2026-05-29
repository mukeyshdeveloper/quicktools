export interface DateDiffResult {
  totalDays: number;
  years: number;
  months: number;
  weeks: number;
  remainingDays: number;
}

export function calculateDateDifference(date1: Date, date2: Date): DateDiffResult | null {
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) return null;

  // Make sure d1 is before d2
  let d1 = date1;
  let d2 = date2;
  if (d1 > d2) {
    d1 = date2;
    d2 = date1;
  }

  // Strip time for clean day calculation
  d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
  d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());

  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.round((d2.getTime() - d1.getTime()) / msPerDay);

  let years = d2.getFullYear() - d1.getFullYear();
  let months = d2.getMonth() - d1.getMonth();
  let days = d2.getDate() - d1.getDate();

  if (days < 0) {
    months--;
    // get days in previous month
    const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0).getDate();
    days += prevMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalWeeks = Math.floor(totalDays / 7);

  return {
    totalDays,
    years,
    months,
    weeks: totalWeeks,
    remainingDays: days
  };
}
