export interface SleepLog {
  date: string;
  hours: number;
}

export interface SleepDebtResult {
  totalDebt: number;
  averageSleep: number;
  recommendedRecovery: string;
  status: string;
}

const RECOMMENDED = 7.5; // average adult need

export function calculateSleepDebt(logs: SleepLog[]): SleepDebtResult {
  if (logs.length === 0) {
    return { totalDebt: 0, averageSleep: 0, recommendedRecovery: 'Log at least 3 nights for accurate results.', status: 'No data' };
  }

  const totalSlept = logs.reduce((sum, l) => sum + l.hours, 0);
  const avg = totalSlept / logs.length;
  const debt = Math.max(0, (RECOMMENDED * logs.length) - totalSlept);

  let recovery = '';
  let status = '';

  if (debt < 3) {
    status = 'Good';
    recovery = 'You are mostly caught up. Maintain consistent sleep schedule.';
  } else if (debt < 8) {
    status = 'Moderate debt';
    recovery = 'Try to get 1 extra hour of sleep for the next 3–5 nights.';
  } else {
    status = 'High debt';
    recovery = 'Prioritize sleep. Aim for 8+ hours for the next week and reduce evening screen time.';
  }

  return {
    totalDebt: Math.round(debt * 10) / 10,
    averageSleep: Math.round(avg * 10) / 10,
    recommendedRecovery: recovery,
    status,
  };
}

export function getDefaultLogs(): SleepLog[] {
  // Use fixed dates to avoid prerender Date issues; hours are example values
  const base = '2026-05-';
  return Array.from({ length: 7 }, (_, i) => ({
    date: `${base}${String(20 + i).padStart(2, '0')}`,
    hours: 6.5 + (i % 3) * 0.5,
  }));
}
