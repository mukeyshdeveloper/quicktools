export interface PomodoroSettings {
  workMin: number;
  shortBreakMin: number;
  longBreakMin: number;
  sessionsBeforeLong: number;
}

export interface CompletedSession {
  id: number;
  date: string; // YYYY-MM-DD
  durationMin: number;
  phase: 'work';
  completedAt: number;
  taskId?: string;
  taskName?: string; // snapshot so history remains useful even if task is deleted
}

export interface PomodoroTask {
  id: string;
  name: string;
  color: string;
  createdAt: number;
}

export const DEFAULT_SETTINGS: PomodoroSettings = {
  workMin: 25,
  shortBreakMin: 5,
  longBreakMin: 15,
  sessionsBeforeLong: 4,
};

export function formatTime(totalSeconds: number): string {
  const min = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

export function getTodayKey(date = new Date()): string {
  return date.toISOString().split('T')[0]!;
}

export function loadSessions(): CompletedSession[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('pomodoro_sessions');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSessions(sessions: CompletedSession[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('pomodoro_sessions', JSON.stringify(sessions));
  } catch {}
}


export interface PomodoroStats {
  todayCount: number;
  todayMinutes: number;
  weekCount: number;
  weekMinutes: number;
  currentStreakDays: number;
  totalSessions: number;
}

export function computeStats(allSessions: CompletedSession[] = loadSessions()): PomodoroStats {
  const today = getTodayKey();
  const todaySessions = allSessions.filter((s) => s.date === today && s.phase === 'work');

  const todayCount = todaySessions.length;
  const todayMinutes = todaySessions.reduce((sum, s) => sum + s.durationMin, 0);

  // Last 7 days for week
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  const weekStart = sevenDaysAgo.toISOString().split('T')[0]!;

  const weekSessions = allSessions.filter((s) => s.date >= weekStart && s.phase === 'work');
  const weekCount = weekSessions.length;
  const weekMinutes = weekSessions.reduce((sum, s) => sum + s.durationMin, 0);

  // Current streak (consecutive days with at least 1 work session, going backwards from today)
  const uniqueDates = new Set(allSessions.filter((s) => s.phase === 'work').map((s) => s.date));
  let streak = 0;
  const checkDate = new Date();
  while (true) {
    const key = checkDate.toISOString().split('T')[0]!;
    if (uniqueDates.has(key)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
    if (streak > 365) break; // safety
  }

  return {
    todayCount,
    todayMinutes,
    weekCount,
    weekMinutes,
    currentStreakDays: streak,
    totalSessions: allSessions.filter((s) => s.phase === 'work').length,
  };
}

export function getTodaySessions(allSessions: CompletedSession[]): CompletedSession[] {
  const today = getTodayKey();
  return allSessions
    .filter((s) => s.date === today && s.phase === 'work')
    .sort((a, b) => b.completedAt - a.completedAt);
}

// ===== Task support (lightweight, client-only) =====

const TASKS_LS_KEY = 'pomodoro_tasks';

export function loadTasks(): PomodoroTask[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(TASKS_LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: PomodoroTask[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TASKS_LS_KEY, JSON.stringify(tasks));
  } catch {}
}

export function addTask(name: string, color = '#e11d48'): PomodoroTask {
  const tasks = loadTasks();
  const newTask: PomodoroTask = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    name: name.trim(),
    color,
    createdAt: Date.now(),
  };
  const updated = [...tasks, newTask];
  saveTasks(updated);
  return newTask;
}

export function deleteTask(taskId: string): void {
  const tasks = loadTasks().filter((t) => t.id !== taskId);
  saveTasks(tasks);
}

const COLORS = ['#e11d48', '#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#14b8a6'];

export function getRandomTaskColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)] || '#e11d48';
}

// Enhanced session adder that supports tasks
export function addCompletedSession(durationMin: number, task?: { id: string; name: string }): CompletedSession[] {
  const sessions = loadSessions();
  const now = Date.now();
  const today = getTodayKey();

  const newSession: CompletedSession = {
    id: now,
    date: today,
    durationMin,
    phase: 'work',
    completedAt: now,
    ...(task ? { taskId: task.id, taskName: task.name } : {}),
  };

  const updated = [...sessions, newSession];
  saveSessions(updated);
  return updated;
}

// Per-task stats (today + total)
export interface TaskStats {
  taskId: string;
  taskName: string;
  color: string;
  todayPomodoros: number;
  todayMinutes: number;
  totalPomodoros: number;
  totalMinutes: number;
}

export function computeTaskStats(
  allSessions: CompletedSession[] = loadSessions(),
  allTasks: PomodoroTask[] = loadTasks()
): TaskStats[] {
  const today = getTodayKey();

  return allTasks.map((task) => {
    const taskSessions = allSessions.filter((s) => s.taskId === task.id && s.phase === 'work');
    const todaySessions = taskSessions.filter((s) => s.date === today);

    return {
      taskId: task.id,
      taskName: task.name,
      color: task.color,
      todayPomodoros: todaySessions.length,
      todayMinutes: todaySessions.reduce((sum, s) => sum + s.durationMin, 0),
      totalPomodoros: taskSessions.length,
      totalMinutes: taskSessions.reduce((sum, s) => sum + s.durationMin, 0),
    };
  }).sort((a, b) => b.totalMinutes - a.totalMinutes);
}
