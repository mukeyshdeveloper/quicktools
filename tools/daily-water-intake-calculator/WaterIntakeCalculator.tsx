'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import {
  calculateWaterIntake,
  type ActivityLevel,
  type Climate,
  type IntakeLog,
  type ReminderInterval,
  REMINDER_INTERVALS,
  loadDailyLogs,
  saveDailyLogs,
  addIntake,
  removeLastIntake,
  getTotalMl,
  getProgress,
  formatMl,
  getTodayKey,
  activityLabels,
} from './utils';
import { Droplet, ThermometerSun, Activity, Clock, Plus, Minus, RotateCcw, Bell, BellOff } from 'lucide-react';

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState('72');
  const [activity, setActivity] = useState<ActivityLevel>('moderate');
  const [climate, setClimate] = useState<Climate>('moderate');
  const [exerciseMin, setExerciseMin] = useState('45');

  const result = useMemo(() => {
    return calculateWaterIntake({
      weightKg: parseFloat(weight) || 0,
      activity,
      climate,
      exerciseMinutes: parseInt(exerciseMin) || 0,
    });
  }, [weight, activity, climate, exerciseMin]);

  // ========== Daily Intake Tracker State ==========
  const [logs, setLogs] = useState<IntakeLog[]>(() => {
    if (typeof window === 'undefined') return [];
    return loadDailyLogs();
  });
  const [glassSize, setGlassSize] = useState(250); // ml per quick log
  const [reminderInterval, setReminderInterval] = useState<ReminderInterval>(0);
  const [reminderPermission, setReminderPermission] = useState<NotificationPermission>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'default';
  });
  const [nextReminderIn, setNextReminderIn] = useState<number | null>(null); // seconds countdown
  const [showReminderBanner, setShowReminderBanner] = useState(false);

  const reminderTimerRef = useRef<number | null>(null);
  const countdownTimerRef = useRef<number | null>(null);
  const todayKeyRef = useRef(getTodayKey());

  // Handle day rollover (legitimate external "system" change — date advanced)
  useEffect(() => {
    const currentKey = getTodayKey();
    if (todayKeyRef.current !== currentKey) {
      todayKeyRef.current = currentKey;
      const fresh = loadDailyLogs(currentKey);
      setLogs(fresh);
    }
  }, []);

  // Persist logs whenever they change
  useEffect(() => {
    if (logs.length > 0 || loadDailyLogs().length > 0) {
      saveDailyLogs(logs);
    }
  }, [logs]);

  // Daily goal ml (from calculator result, fallback 2500)
  const dailyGoalMl = result ? result.totalMl : 2500;

  const totalMl = useMemo(() => getTotalMl(logs), [logs]);
  const progress = useMemo(() => getProgress(dailyGoalMl, totalMl), [dailyGoalMl, totalMl]);
  const remaining = Math.max(0, dailyGoalMl - totalMl);

  function logIntake(ml: number) {
    const newLogs = addIntake(logs, ml);
    setLogs(newLogs);
  }

  function undoLast() {
    const newLogs = removeLastIntake(logs);
    setLogs(newLogs);
  }

  function resetLogs() {
    setLogs([]);
    saveDailyLogs([]);
  }

  // Change glass size (quick buttons)
  function changeGlassSize(newSize: number) {
    setGlassSize(Math.max(100, Math.min(1000, Math.round(newSize))));
  }

  // ========== Browser Reminder System (while tab open only) ==========
  function requestNotificationPermission() {
    if (typeof window === 'undefined' || !('Notification' in window)) return;

    Notification.requestPermission().then((perm) => {
      setReminderPermission(perm);
      if (perm === 'granted' && reminderInterval > 0) {
        startReminders(reminderInterval);
      }
    });
  }

  function startReminders(intervalMin: ReminderInterval) {
    stopReminders(); // clear any previous

    if (intervalMin === 0) return;

    setReminderInterval(intervalMin);

    if (typeof window === 'undefined' || !('Notification' in window)) {
      // Fallback: just in-page banner + console
      startInPageOnlyReminders(intervalMin);
      return;
    }

    if (Notification.permission !== 'granted') {
      // Will be handled by the permission flow
      return;
    }

    const intervalMs = intervalMin * 60 * 1000;

    // Fire first reminder soon (after interval)
    reminderTimerRef.current = window.setTimeout(() => {
      fireReminder();
      // Then recurring
      reminderTimerRef.current = window.setInterval(fireReminder, intervalMs);
    }, intervalMs);

    // Live countdown
    setNextReminderIn(intervalMin * 60);
    countdownTimerRef.current = window.setInterval(() => {
      setNextReminderIn((prev) => {
        if (prev === null || prev <= 1) return intervalMin * 60;
        return prev - 1;
      });
    }, 1000);
  }

  function fireReminder() {
    const title = '💧 Time to drink water';
    const body = remaining > 0
      ? `${formatMl(remaining)} remaining toward your goal today`
      : 'You\'ve hit your goal — keep the momentum going!';

    try {
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
          body,
          icon: '/icons/icon-192.png',
          tag: 'water-reminder',
        });
      }
    } catch {}

    // Always show friendly in-page banner (works even if notifications blocked)
    setShowReminderBanner(true);
    // Auto-hide banner after 12s
    window.setTimeout(() => setShowReminderBanner(false), 12000);
  }

  function startInPageOnlyReminders(intervalMin: ReminderInterval) {
    const intervalMs = intervalMin * 60 * 1000;
    reminderTimerRef.current = window.setInterval(() => {
      setShowReminderBanner(true);
      window.setTimeout(() => setShowReminderBanner(false), 10000);
    }, intervalMs);

    setNextReminderIn(intervalMin * 60);
    countdownTimerRef.current = window.setInterval(() => {
      setNextReminderIn((prev) => (prev === null || prev <= 1 ? intervalMin * 60 : (prev ?? 0) - 1));
    }, 1000);
  }

  function stopReminders() {
    if (reminderTimerRef.current) {
      clearTimeout(reminderTimerRef.current);
      clearInterval(reminderTimerRef.current);
      reminderTimerRef.current = null;
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    setNextReminderIn(null);
    setReminderInterval(0);
    setShowReminderBanner(false);
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopReminders();
    };
  }, []);

  // If goal changes while reminders are on, we keep them (user intent)
  // If user changes the underlying calculator inputs, goal may shift — that's fine.

  function toggleReminders(interval: ReminderInterval) {
    if (interval === 0) {
      stopReminders();
      return;
    }

    if (reminderPermission === 'granted') {
      startReminders(interval);
    } else if (reminderPermission === 'default') {
      // Ask for permission then start
      requestNotificationPermission();
      // We start after the promise resolves in requestNotificationPermission
      // For simplicity also start the interval timer optimistically (in-page always works)
      startInPageOnlyReminders(interval);
      setReminderInterval(interval);
    } else {
      // denied — still give in-page experience
      startInPageOnlyReminders(interval);
      setReminderInterval(interval);
    }
  }

  function resetInputs() {
    setWeight('72');
    setActivity('moderate');
    setClimate('moderate');
    setExerciseMin('45');
  }

  function resetAll() {
    resetInputs();
    setLogs([]);
    saveDailyLogs([]);
    stopReminders();
    setGlassSize(250);
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <span className="tool-pill">Science-backed</span>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">Your Daily Hydration Needs</h2>
          </div>
          <button onClick={resetAll} className="btn-secondary text-xs px-4 py-1.5">Reset All</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Weight */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-text">Body Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="tool-input text-center font-mono text-2xl"
              step="0.5"
              min="30"
              max="200"
            />
            <p className="text-xs text-muted">Most important factor — larger bodies need more fluid.</p>
          </div>

          {/* Exercise */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-text flex justify-between">
              Planned Exercise Today <span className="font-mono text-brand">{exerciseMin} min</span>
            </label>
            <input
              type="range"
              min="0"
              max="180"
              step="5"
              value={exerciseMin}
              onChange={(e) => setExerciseMin(e.target.value)}
              className="w-full accent-sky-500"
            />
            <div className="flex justify-between text-xs text-muted">
              <span>Rest day</span>
              <span>3 hours</span>
            </div>
          </div>
        </div>

        {/* Activity Level */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-text flex items-center gap-2">
            <Activity className="w-4 h-4" /> Activity Level
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {[
              { v: 'sedentary' as ActivityLevel, l: 'Sedentary' },
              { v: 'light' as ActivityLevel, l: 'Light' },
              { v: 'moderate' as ActivityLevel, l: 'Moderate' },
              { v: 'active' as ActivityLevel, l: 'Active' },
              { v: 'very' as ActivityLevel, l: 'Very Active' },
            ].map(({ v, l }) => (
              <button
                key={v}
                onClick={() => setActivity(v)}
                className={`text-left rounded-2xl border p-3 text-xs font-medium transition ${activity === v ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-border hover:border-sky-200 bg-background'}`}
              >
                {l}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted">{activityLabels[activity]}</p>
        </div>

        {/* Climate */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-text flex items-center gap-2">
            <ThermometerSun className="w-4 h-4" /> Climate / Environment
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { v: 'cool' as Climate, l: 'Cool' },
              { v: 'moderate' as Climate, l: 'Moderate' },
              { v: 'warm' as Climate, l: 'Warm' },
              { v: 'hot' as Climate, l: 'Hot' },
              { v: 'very-hot' as Climate, l: 'Very Hot' },
            ].map(({ v, l }) => (
              <button
                key={v}
                onClick={() => setClimate(v)}
                className={`rounded-2xl border px-3 py-2.5 text-sm font-semibold transition ${climate === v ? 'border-sky-500 bg-sky-500 text-white' : 'border-border bg-background hover:border-sky-200'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      <div>
        {!result ? (
          <div className="tool-panel min-h-[210px] flex items-center justify-center text-muted text-center">
            Enter your weight to see your daily water target
          </div>
        ) : (
          <div className="rounded-3xl border border-border bg-card overflow-hidden">
            <div className="p-8 bg-gradient-to-br from-sky-500 to-cyan-600 text-white">
              <div className="flex items-center gap-3 text-sky-100 text-sm font-bold tracking-widest">
                <Droplet className="w-5 h-5" /> PERSONALIZED DAILY TARGET
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-display text-7xl font-black tracking-tighter">{result!.totalLiters}</span>
                <span className="text-2xl font-medium text-sky-100">liters</span>
              </div>
              <div className="mt-1 text-sky-100 text-lg">{result!.totalMl} ml • ~{result!.glasses8oz} × 8 oz glasses</div>
            </div>

            <div className="p-6 grid sm:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-muted text-xs font-bold tracking-wider">BASE (WEIGHT + ACTIVITY)</div>
                <div className="font-mono text-2xl font-semibold mt-1">{result!.baseLiters} L</div>
              </div>
              <div>
                <div className="text-muted text-xs font-bold tracking-wider">CLIMATE ADJUSTMENT</div>
                <div className={`font-mono text-2xl font-semibold mt-1 ${result!.climateBonus >= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {result!.climateBonus >= 0 ? '+' : ''}{result!.climateBonus} L
                </div>
              </div>
              <div>
                <div className="text-muted text-xs font-bold tracking-wider">EXERCISE BONUS</div>
                <div className="font-mono text-2xl font-semibold mt-1 text-sky-600">+{result!.exerciseBonus} L</div>
              </div>
            </div>

            <div className="border-t border-border px-6 py-4 bg-background text-xs text-muted">
              {result.note}
            </div>
          </div>
        )}
      </div>

      {/* ========== Daily Intake Tracker + Optional Reminders ========== */}
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplet className="w-5 h-5 text-sky-600" />
            <h3 className="font-bold text-lg tracking-tight">Track Intake Today</h3>
          </div>
          <div className="text-xs text-muted font-mono tabular-nums">
            {formatMl(totalMl)} / {formatMl(dailyGoalMl)}
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="h-4 bg-background border border-border rounded-full overflow-hidden">
            <div
              className="h-4 bg-gradient-to-r from-sky-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-sm">
            <span className="font-semibold text-text">{progress}% of goal</span>
            <span className="text-muted">{formatMl(remaining)} remaining</span>
          </div>
          {totalMl > dailyGoalMl && (
            <div className="mt-1 text-emerald-600 text-xs font-medium">Excellent — you’ve exceeded your target today!</div>
          )}
        </div>

        {/* Quick log buttons */}
        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={() => logIntake(glassSize)}
            className="flex-1 sm:flex-none btn-primary flex items-center justify-center gap-2 text-base py-3"
          >
            <Plus className="w-4 h-4" /> Log {glassSize} ml
          </button>
          <button
            onClick={() => logIntake(500)}
            className="btn-secondary flex items-center gap-2 px-5"
          >
            <Plus className="w-4 h-4" /> +500 ml
          </button>
          <button
            onClick={undoLast}
            disabled={logs.length === 0}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50"
          >
            <Minus className="w-4 h-4" /> Undo last
          </button>
          <button onClick={resetLogs} className="btn-secondary flex items-center gap-2 text-xs" disabled={logs.length === 0}>
            <RotateCcw className="w-3.5 h-3.5" /> Clear day
          </button>
        </div>

        {/* Glass size adjuster */}
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted">Glass size:</span>
          {[200, 250, 300, 500].map((size) => (
            <button
              key={size}
              onClick={() => changeGlassSize(size)}
              className={`px-3 py-1 rounded-full border text-xs font-medium transition ${glassSize === size ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-border hover:bg-background'}`}
            >
              {size} ml
            </button>
          ))}
          <input
            type="number"
            value={glassSize}
            onChange={(e) => changeGlassSize(parseInt(e.target.value) || 250)}
            className="w-16 tool-input py-1 text-xs text-center"
          />
          <span className="text-muted text-xs">ml</span>
        </div>

        {/* Recent logs (simple list) */}
        {logs.length > 0 && (
          <div className="pt-2 border-t border-border">
            <div className="text-xs uppercase tracking-wider text-muted font-bold mb-2">Today’s logs</div>
            <div className="max-h-28 overflow-auto text-sm space-y-1 pr-1 custom-scroll">
              {[...logs].reverse().slice(0, 6).map((log, idx) => (
                <div key={idx} className="flex justify-between text-muted">
                  <span>{new Date(log.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="font-mono text-text">+{formatMl(log.ml)}</span>
                </div>
              ))}
              {logs.length > 6 && <div className="text-[10px] text-muted">+{logs.length - 6} more…</div>}
            </div>
          </div>
        )}

        {/* Reminders */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-muted" />
            <span className="text-sm font-bold text-text">In-tab reminders (while this page is open)</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {REMINDER_INTERVALS.map((min) => {
              const active = reminderInterval === min && min !== 0;
              return (
                <button
                  key={min}
                  onClick={() => toggleReminders(min)}
                  className={`text-sm px-4 py-1.5 rounded-2xl border transition font-medium ${active ? 'bg-sky-600 text-white border-sky-600' : 'border-border hover:border-sky-300'}`}
                >
                  {min === 0 ? 'Off' : `Every ${min} min`}
                </button>
              );
            })}
          </div>

          {reminderInterval > 0 && (
            <div className="mt-3 text-xs flex items-center gap-2 text-sky-600">
              <Bell className="w-3.5 h-3.5" />
              Reminders active.
              {nextReminderIn !== null && (
                <span className="font-mono">Next in ~{Math.ceil(nextReminderIn / 60)} min</span>
              )}
              <button onClick={stopReminders} className="ml-2 underline text-muted hover:text-text">Stop</button>
            </div>
          )}

          {reminderPermission === 'denied' && reminderInterval > 0 && (
            <div className="mt-2 text-[11px] text-amber-600">
              Notifications are blocked in your browser settings. You’ll still see in-page reminders.
            </div>
          )}

          <div className="mt-2 text-[11px] text-muted leading-snug">
            Browser notifications only work while this tab is open and the site is visible. For reliable phone reminders, add QuickUtils to your home screen (PWA) or use your device’s built-in reminder app.
            <button
              onClick={requestNotificationPermission}
              className="ml-1 underline hover:text-text"
              disabled={reminderPermission === 'granted'}
            >
              {reminderPermission === 'granted' ? 'Permission granted' : 'Grant notification permission'}
            </button>
          </div>
        </div>
      </div>

      {/* Reminder banner (in-page) */}
      {showReminderBanner && (
        <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm flex items-start gap-3 text-sky-800">
          <Bell className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            Time to hydrate! {remaining > 100 && `You still have ${formatMl(remaining)} to go.`}
          </div>
          <button onClick={() => setShowReminderBanner(false)} className="text-sky-600 hover:text-sky-900">
            <BellOff className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="text-center text-xs text-muted">Pro tip: Drink steadily throughout the day. Thirst is a late signal — aim to have pale yellow urine.</div>
    </div>
  );
}
