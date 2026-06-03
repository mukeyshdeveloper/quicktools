export interface Habit {
  id: string;
  name: string;
  color: string; // tailwind or hex, we use simple
  createdAt: number;
}

export type HabitLogs = Record<string, boolean>; // dateKey -> done

export interface HabitWithLogs {
  habit: Habit;
  logs: HabitLogs;
}

export function getDateKey(date = new Date()): string {
  return date.toISOString().split('T')[0]!;
}

export function getPastDays(count: number): string[] {
  const days: string[] = [];
  const d = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const day = new Date(d);
    day.setDate(day.getDate() - i);
    days.push(day.toISOString().split('T')[0]!);
  }
  return days;
}

export function calculateCurrentStreak(logs: HabitLogs): number {
  let streak = 0;
  const cursor = new Date();
  while (true) {
    const key = cursor.toISOString().split('T')[0]!;
    if (logs[key]) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
    if (streak > 3650) break;
  }
  return streak;
}

export function calculateLongestStreak(logs: HabitLogs): number {
  const dates = Object.keys(logs).filter((k) => logs[k]).sort();
  if (dates.length === 0) return 0;

  let longest = 1;
  let current = 1;

  for (let i = 1; i < dates.length; i++) {
    const prevKey = dates[i - 1];
    const currKey = dates[i];
    if (!prevKey || !currKey) continue;
    const prev = new Date(prevKey);
    const curr = new Date(currKey);
    const diff = (curr.getTime() - prev.getTime()) / (1000 * 3600 * 24);

    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }
  return longest;
}

export function getCompletionRate(logs: HabitLogs, days = 30): number {
  const recent = getPastDays(days);
  const done = recent.filter((d) => logs[d]).length;
  return Math.round((done / days) * 100);
}

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#14b8a6', '#6366f1'];

export function getRandomColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)] || '#10b981';
}

export function loadHabits(): Habit[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('habit_habits') || '[]');
  } catch {
    return [];
  }
}

export function saveHabits(habits: Habit[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('habit_habits', JSON.stringify(habits));
}

export function loadLogs(habitId: string): HabitLogs {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(`habit_logs_${habitId}`) || '{}');
  } catch {
    return {};
  }
}

export function saveLogs(habitId: string, logs: HabitLogs): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`habit_logs_${habitId}`, JSON.stringify(logs));
}

export function toggleToday(habitId: string, logs: HabitLogs): HabitLogs {
  const key = getDateKey();
  const next = { ...logs, [key]: !logs[key] };
  saveLogs(habitId, next);
  return next;
}
