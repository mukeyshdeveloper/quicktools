'use client';

import { useState, useEffect, useRef } from 'react';
import {
  DEFAULT_SETTINGS,
  formatTime,
  loadSessions,
  addCompletedSession,
  computeStats,
  getTodaySessions,
  loadTasks,
  saveTasks,
  addTask,
  deleteTask,
  getRandomTaskColor,
  computeTaskStats,
  type PomodoroSettings,
  type CompletedSession,
  type PomodoroTask,
  type TaskStats,
  type PomodoroStats,
} from './utils';
import { Play, Pause, SkipForward, RotateCcw, Flame, BarChart3, Plus, Trash2, Target } from 'lucide-react';

type Phase = 'work' | 'shortBreak' | 'longBreak';

export default function PomodoroTimer() {
  const [settings, setSettings] = useState<PomodoroSettings>(DEFAULT_SETTINGS);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SETTINGS.workMin * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>('work');
  const [completedInCycle, setCompletedInCycle] = useState(0);

  const [sessions, setSessions] = useState<CompletedSession[]>(() => {
    if (typeof window === 'undefined') return [];
    return loadSessions();
  });
  const [showStats, setShowStats] = useState(true);

  // Task support
  const [tasks, setTasks] = useState<PomodoroTask[]>(() => {
    if (typeof window === 'undefined') return [];
    return loadTasks();
  });
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [newTaskName, setNewTaskName] = useState('');

  // Client-only derived stats (computed in useEffect to avoid new Date() during prerender)
  const [stats, setStats] = useState<PomodoroStats>({
    todayCount: 0,
    todayMinutes: 0,
    weekCount: 0,
    weekMinutes: 0,
    currentStreakDays: 0,
    totalSessions: 0,
  });
  const [todaySessions, setTodaySessions] = useState<CompletedSession[]>([]);
  const [taskStats, setTaskStats] = useState<TaskStats[]>([]);

  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<AudioContext | null>(null);

  // Load persisted data (lazy for settings to avoid setState-in-effect)
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  useEffect(() => {
    if (settingsLoaded) return;
    const savedSettings = localStorage.getItem('pomodoro_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSettings(parsed);
        setTimeLeft(parsed.workMin * 60);
      } catch {}
    }
    // Note: sessions and tasks are now loaded via useState initializers (client-only)
    setSettingsLoaded(true);
  }, [settingsLoaded]);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('pomodoro_settings', JSON.stringify(settings));
  }, [settings]);

  // Persist tasks
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Compute date-dependent stats only on the client (avoids prerender error with new Date())
  useEffect(() => {
    setStats(computeStats(sessions));
    setTodaySessions(getTodaySessions(sessions));
    setTaskStats(computeTaskStats(sessions, tasks));
  }, [sessions, tasks]);

  // Countdown effect
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up — switch phase
          handlePhaseComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  function playBeep() {
    try {
      if (!audioRef.current) {
        audioRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = phase === 'work' ? 880 : 660;
      gain.gain.value = 0.2;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1200;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      setTimeout(() => {
        gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
        setTimeout(() => osc.stop(), 700);
      }, 180);
    } catch {}
  }

  function handlePhaseComplete() {
    setIsRunning(false);

    const wasWork = phase === 'work';

    if (wasWork) {
      const currentTask = currentTaskId ? tasks.find((t) => t.id === currentTaskId) : undefined;
      const newSessions = addCompletedSession(
        settings.workMin,
        currentTask ? { id: currentTask.id, name: currentTask.name } : undefined
      );
      setSessions(newSessions);
      playBeep();
    }

    let nextPhase: Phase;
    let nextDuration: number;
    let newCycleCount = completedInCycle;

    if (phase === 'work') {
      newCycleCount = completedInCycle + 1;
      if (newCycleCount % settings.sessionsBeforeLong === 0) {
        nextPhase = 'longBreak';
        nextDuration = settings.longBreakMin * 60;
      } else {
        nextPhase = 'shortBreak';
        nextDuration = settings.shortBreakMin * 60;
      }
    } else {
      nextPhase = 'work';
      nextDuration = settings.workMin * 60;
    }

    setPhase(nextPhase);
    setTimeLeft(nextDuration);
    setCompletedInCycle(newCycleCount);

    // Auto start next phase (classic Pomodoro behavior)
    // Comment out if you prefer manual start after break
    setTimeout(() => setIsRunning(true), 800);
  }

  function toggleTimer() {
    if (timeLeft === 0) {
      // restart current phase
      const dur = phase === 'work' ? settings.workMin : phase === 'shortBreak' ? settings.shortBreakMin : settings.longBreakMin;
      setTimeLeft(dur * 60);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  }

  function skipPhase() {
    setIsRunning(false);
    handlePhaseComplete();
  }

  function resetTimer() {
    setIsRunning(false);
    setPhase('work');
    setTimeLeft(settings.workMin * 60);
    setCompletedInCycle(0);
  }

  // Task functions
  function handleAddTask() {
    const name = newTaskName.trim();
    if (!name) return;
    const color = getRandomTaskColor();
    const newT = addTask(name, color);
    setTasks((prev) => [...prev, newT]);
    setNewTaskName('');
    // Optionally auto-select the new task
    setCurrentTaskId(newT.id);
  }

  function handleDeleteTask(taskId: string) {
    deleteTask(taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    if (currentTaskId === taskId) setCurrentTaskId(null);
  }

  function selectTaskForFocus(taskId: string) {
    setCurrentTaskId(taskId);
    // If timer not running and on work phase, start it
    if (!isRunning && phase === 'work') {
      setIsRunning(true);
    }
  }

  function clearCurrentTask() {
    setCurrentTaskId(null);
  }

  const currentTask = currentTaskId ? tasks.find((t) => t.id === currentTaskId) : null;

  function updateSetting(key: keyof PomodoroSettings, value: number) {
    const clamped = Math.max(1, Math.min(90, Math.round(value)));
    const newSettings = { ...settings, [key]: clamped };
    setSettings(newSettings);

    // If editing current phase duration, update timeLeft if not running
    if (!isRunning) {
      if (key === 'workMin' && phase === 'work') setTimeLeft(clamped * 60);
      if (key === 'shortBreakMin' && phase === 'shortBreak') setTimeLeft(clamped * 60);
      if (key === 'longBreakMin' && phase === 'longBreak') setTimeLeft(clamped * 60);
    }
  }


  const progress = (() => {
    const total = phase === 'work'
      ? settings.workMin * 60
      : phase === 'shortBreak'
      ? settings.shortBreakMin * 60
      : settings.longBreakMin * 60;
    return Math.max(0, Math.min(100, ((total - timeLeft) / total) * 100));
  })();

  const phaseLabel = phase === 'work' ? 'Focus' : phase === 'shortBreak' ? 'Short Break' : 'Long Break';
  const phaseColor = phase === 'work' ? 'text-red-600' : 'text-emerald-600';
  const bgAccent = phase === 'work' ? 'from-red-500 to-rose-600' : 'from-emerald-500 to-teal-600';

  const cycleText = `${(completedInCycle % settings.sessionsBeforeLong) + (phase === 'work' ? 0 : 1)} / ${settings.sessionsBeforeLong}`;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Timer Card */}
      <div className="bg-card border border-border rounded-3xl p-8 shadow-sm text-center">
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${phase === 'work' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {phaseLabel.toUpperCase()}
            </span>
            <div className="mt-1 text-xs text-muted">Cycle {cycleText}</div>
          </div>
          <button onClick={resetTimer} className="btn-secondary text-xs flex items-center gap-1.5 px-3 py-1.5">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>

        {/* Big Timer + Ring */}
        <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="#e2e0d8" strokeWidth="5" />
            <circle
              cx="50" cy="50" r="46" fill="none"
              stroke={phase === 'work' ? '#e11d48' : '#10b981'}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={289}
              strokeDashoffset={289 - (289 * progress) / 100}
              className="transition-all duration-300"
            />
          </svg>

          <div className="absolute text-center">
            <div className={`font-display text-7xl sm:text-8xl font-black tabular-nums tracking-tighter ${phaseColor}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-muted mt-1 font-medium">{phaseLabel}</div>

            {currentTask && (
              <div className="mt-2 flex items-center justify-center gap-1.5 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTask.color }} />
                <span className="font-semibold" style={{ color: currentTask.color }}>{currentTask.name}</span>
                <button onClick={clearCurrentTask} className="ml-1 text-muted hover:text-text" title="Clear task">×</button>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={toggleTimer}
            className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl text-lg font-semibold text-white shadow transition active:scale-[0.985] ${isRunning ? 'bg-zinc-800 hover:bg-black' : `bg-gradient-to-r ${bgAccent} hover:brightness-105`}`}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isRunning ? 'Pause' : timeLeft === 0 ? 'Restart' : 'Start'}
          </button>

          <button onClick={skipPhase} className="btn-secondary flex items-center gap-2 px-6 text-base" disabled={!isRunning && timeLeft === 0}>
            <SkipForward className="w-4 h-4" /> Skip
          </button>
        </div>

        <div className="mt-3 text-[11px] text-muted">Spacebar works too • Auto-continues after breaks</div>
      </div>

      {/* Settings */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="text-sm font-bold uppercase tracking-widest text-muted mb-4">Timer Settings</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {([
            { key: 'workMin' as const, label: 'Focus (min)' },
            { key: 'shortBreakMin' as const, label: 'Short Break' },
            { key: 'longBreakMin' as const, label: 'Long Break' },
            { key: 'sessionsBeforeLong' as const, label: 'Long after' },
          ]).map(({ key, label }) => (
            <div key={key}>
              <label className="text-xs text-muted block mb-1">{label}</label>
              <input
                type="number"
                value={settings[key]}
                onChange={(e) => updateSetting(key, parseInt(e.target.value) || 1)}
                className="tool-input text-center font-mono text-lg"
                min="1"
                max={key === 'sessionsBeforeLong' ? '12' : '60'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tasks — lightweight task + timer association */}
      <div className="bg-card border border-border rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="font-bold flex items-center gap-2 text-sm uppercase tracking-widest text-muted">
            <Target className="w-4 h-4" /> Focus Tasks
          </div>
          <div className="text-xs text-muted">Associate sessions with tasks for better stats</div>
        </div>

        {/* Add task */}
        <div className="flex gap-2">
          <input
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            placeholder="New task (e.g. Write blog post)"
            className="tool-input flex-1"
          />
          <button onClick={handleAddTask} className="btn-primary px-4 flex items-center gap-1 text-sm">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        {tasks.length === 0 && (
          <div className="text-xs text-muted py-2">Add tasks above. Then click “Focus on this” to start a Pomodoro tagged to that task.</div>
        )}

        {tasks.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tasks.map((task) => {
              const tStats = taskStats.find((ts) => ts.taskId === task.id);
              const isActive = currentTaskId === task.id;
              return (
                <div
                  key={task.id}
                  className={`rounded-2xl border p-4 flex flex-col gap-2 transition ${isActive ? 'border-red-500 ring-1 ring-red-200 bg-red-50/30' : 'border-border'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: task.color }} />
                      <span className="font-semibold">{task.name}</span>
                    </div>
                    <button onClick={() => handleDeleteTask(task.id)} className="text-muted hover:text-rose-600 p-0.5">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-xs text-muted flex gap-4">
                    <span>{tStats?.totalPomodoros || 0} pomos</span>
                    <span>{tStats?.totalMinutes || 0} min total</span>
                  </div>

                  <button
                    onClick={() => selectTaskForFocus(task.id)}
                    className={`mt-1 text-xs px-3 py-1.5 rounded-xl font-medium transition ${isActive ? 'bg-red-600 text-white' : 'bg-background border border-border hover:border-red-300'}`}
                  >
                    {isActive ? 'Currently focusing on this' : 'Focus on this'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Stats & History */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-muted" />
            <span className="font-bold">Today &amp; Stats</span>
          </div>
          <button onClick={() => setShowStats(!showStats)} className="text-xs text-muted hover:text-text">
            {showStats ? 'Hide' : 'Show'}
          </button>
        </div>

        {showStats && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-background border border-border p-4 text-center">
                <div className="text-3xl font-semibold tabular-nums text-red-600">{stats.todayCount}</div>
                <div className="text-xs text-muted mt-1">Pomodoros today</div>
              </div>
              <div className="rounded-2xl bg-background border border-border p-4 text-center">
                <div className="text-3xl font-semibold tabular-nums text-red-600">{stats.todayMinutes}</div>
                <div className="text-xs text-muted mt-1">Minutes focused</div>
              </div>
              <div className="rounded-2xl bg-background border border-border p-4 text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <Flame className="w-6 h-6 text-orange-500" />
                  <span className="text-3xl font-semibold tabular-nums">{stats.currentStreakDays}</span>
                </div>
                <div className="text-xs text-muted mt-1">Day streak</div>
              </div>
              <div className="rounded-2xl bg-background border border-border p-4 text-center">
                <div className="text-3xl font-semibold tabular-nums">{stats.weekCount}</div>
                <div className="text-xs text-muted mt-1">This week</div>
              </div>
            </div>

            {todaySessions.length > 0 && (
              <div className="mt-6">
                <div className="text-xs uppercase tracking-wider text-muted font-bold mb-2">Today’s completed sessions</div>
                <div className="flex flex-wrap gap-2">
                  {todaySessions.map((s, i) => (
                    <div key={i} className="text-xs px-3 py-1 bg-red-50 text-red-700 rounded-full border border-red-100 font-medium">
                      {formatTime(s.durationMin * 60)} • {new Date(s.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {stats.currentStreakDays > 1 && (
              <div className="mt-4 text-xs text-center text-muted">Nice work — keep the streak alive tomorrow.</div>
            )}

            {/* Per-task breakdown (new feature) */}
            {taskStats.length > 0 && (
              <div className="mt-6 pt-4 border-t border-border">
                <div className="text-xs uppercase tracking-wider text-muted font-bold mb-2">Time by Task (all time)</div>
                <div className="space-y-2">
                  {taskStats.slice(0, 5).map((ts) => (
                    <div key={ts.taskId} className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-2 w-36 truncate">
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: ts.color }} />
                        <span className="truncate">{ts.taskName}</span>
                      </div>
                      <div className="flex-1 h-2 bg-background border border-border rounded-full overflow-hidden">
                        <div
                          className="h-2 rounded-full"
                          style={{ width: `${Math.min(100, (ts.totalMinutes / Math.max(1, taskStats[0]?.totalMinutes || 1)) * 100)}%`, backgroundColor: ts.color }}
                        />
                      </div>
                      <div className="w-20 text-right tabular-nums text-xs text-muted">
                        {ts.totalPomodoros} • {ts.totalMinutes}m
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <p className="text-center text-xs text-muted">Tasks + sessions are saved privately in your browser. Add tasks, click “Focus on this”, and your work gets automatically attributed for richer stats.</p>
    </div>
  );
}
