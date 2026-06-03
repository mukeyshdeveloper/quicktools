'use client';

import { useState, useEffect } from 'react';
import {
  loadHabits,
  saveHabits,
  loadLogs,
  saveLogs,
  toggleToday,
  calculateCurrentStreak,
  calculateLongestStreak,
  getPastDays,
  getRandomColor,
  getDateKey,
  type Habit,
  type HabitLogs,
} from './utils';
import { Plus, Trash2, Flame } from 'lucide-react';

export default function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    if (typeof window === 'undefined') return [];
    return loadHabits();
  });
  const [logsByHabit, setLogsByHabit] = useState<Record<string, HabitLogs>>(() => {
    if (typeof window === 'undefined') return {};
    const h = loadHabits();
    const initial: Record<string, HabitLogs> = {};
    h.forEach((hab) => { initial[hab.id] = loadLogs(hab.id); });
    return initial;
  });
  const [newHabitName, setNewHabitName] = useState('');

  // Client-only current date values (to avoid new Date() during prerender)
  const [todayKey, setTodayKey] = useState<string>('');
  const [last14, setLast14] = useState<string[]>([]);

  useEffect(() => {
    // Only runs in browser
    const key = getDateKey();
    setTodayKey(key);
    setLast14(getPastDays(14));
  }, []);

  function addHabit() {
    const name = newHabitName.trim();
    if (!name) return;

    const newHabit: Habit = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      name,
      color: getRandomColor(),
      createdAt: Date.now(),
    };

    const updated = [...habits, newHabit];
    setHabits(updated);
    saveHabits(updated);

    const emptyLogs: HabitLogs = {};
    setLogsByHabit((prev) => ({ ...prev, [newHabit.id]: emptyLogs }));
    saveLogs(newHabit.id, emptyLogs);

    setNewHabitName('');
  }

  function deleteHabit(id: string) {
    const updated = habits.filter((h) => h.id !== id);
    setHabits(updated);
    saveHabits(updated);

    const nextLogs = { ...logsByHabit };
    delete nextLogs[id];
    setLogsByHabit(nextLogs);
    localStorage.removeItem(`habit_logs_${id}`);
  }

  function toggleHabit(habitId: string) {
    const currentLogs = logsByHabit[habitId] || {};
    const newLogs = toggleToday(habitId, currentLogs); // already saves inside
    setLogsByHabit((prev) => ({ ...prev, [habitId]: newLogs }));
  }

  function getLogs(habitId: string): HabitLogs {
    return logsByHabit[habitId] || {};
  }

  return (
    <div className="space-y-6">
      {/* Add new habit */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="flex gap-3">
          <input
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addHabit()}
            placeholder="New habit name (e.g. Read 10 pages)"
            className="tool-input flex-1"
          />
          <button onClick={addHabit} className="btn-primary flex items-center gap-2 px-6">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        <p className="text-xs text-muted mt-2">Track anything. Keep names short for best experience.</p>
      </div>

      {habits.length === 0 && (
        <div className="tool-panel text-center text-muted py-10">
          Add your first habit above. Streaks and calendars will appear here.
        </div>
      )}

      {/* Habit list */}
      <div className="space-y-4">
        {habits.map((habit) => {
          const logs = getLogs(habit.id);
          const currentStreak = calculateCurrentStreak(logs);
          const longestStreak = calculateLongestStreak(logs);
          const doneToday = !!logs[todayKey];

          return (
            <div key={habit.id} className="bg-card border border-border rounded-3xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: habit.color }} />
                    <h3 className="font-semibold text-lg tracking-tight">{habit.name}</h3>
                  </div>

                  <div className="mt-3 flex gap-6 text-sm">
                    <div>
                      <span className="text-muted text-xs block">Current streak</span>
                      <div className="flex items-baseline gap-1 font-semibold text-2xl tabular-nums">
                        {currentStreak} <Flame className="w-5 h-5 text-orange-500" />
                      </div>
                    </div>
                    <div>
                      <span className="text-muted text-xs block">Longest ever</span>
                      <div className="font-semibold text-2xl tabular-nums text-muted">{longestStreak}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    className={`px-5 py-2 rounded-2xl text-sm font-semibold transition flex items-center gap-2 border ${doneToday ? 'bg-emerald-600 text-white border-emerald-600' : 'border-border hover:bg-emerald-50'}`}
                  >
                    {doneToday ? '✓ Done today' : 'Mark done'}
                  </button>
                  <button onClick={() => deleteHabit(habit.id)} className="text-xs text-muted hover:text-rose-600 flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              </div>

              {/* 14-day grid */}
              <div className="mt-5">
                <div className="text-xs uppercase tracking-wider text-muted mb-2">Last 14 days</div>
                <div className="grid grid-cols-7 sm:grid-cols-14 gap-1.5">
                  {last14.map((date) => {
                    const done = !!logs[date];
                    const isToday = date === todayKey;
                    return (
                      <button
                        key={date}
                        onClick={() => {
                          const current = logs[date] || false;
                          const newLogs = { ...logs, [date]: !current };
                          saveLogs(habit.id, newLogs);
                          setLogsByHabit((prev) => ({ ...prev, [habit.id]: newLogs }));
                        }}
                        className={`h-7 w-full rounded-md border transition text-[10px] flex items-center justify-center ${done ? 'border-transparent' : 'border-border hover:border-muted'} ${isToday ? 'ring-1 ring-brand' : ''}`}
                        style={done ? { backgroundColor: habit.color, color: 'white' } : {}}
                        title={date}
                      >
                        {done ? '●' : ''}
                      </button>
                    );
                  })}
                </div>
                <div className="text-[10px] text-muted mt-1 flex justify-between">
                  <span>14 days ago</span>
                  <span>Today</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {habits.length > 0 && (
        <p className="text-center text-xs text-muted">Tap any square in the grid to mark or unmark past days. Streaks update instantly.</p>
      )}
    </div>
  );
}
