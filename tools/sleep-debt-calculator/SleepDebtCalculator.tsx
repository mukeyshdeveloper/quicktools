'use client';

import { useState, useMemo } from 'react';
import { calculateSleepDebt, getDefaultLogs, type SleepLog } from './utils';

export default function SleepDebtCalculator() {
  const [logs, setLogs] = useState<SleepLog[]>(() => getDefaultLogs());

  const result = useMemo(() => calculateSleepDebt(logs), [logs]);

  function updateHours(index: number, hours: number) {
    const newLogs = [...logs];
    const current = newLogs[index];
    if (!current) return;
    newLogs[index] = { date: current.date, hours: Math.max(0, Math.min(12, hours)) };
    setLogs(newLogs);
  }

  function resetToDefaults() {
    setLogs(getDefaultLogs());
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Last 7 Nights Sleep</span>
          <button onClick={resetToDefaults} className="text-xs text-muted hover:text-text">Reset to defaults</button>
        </div>

        <div className="space-y-3">
          {logs.map((log, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-24 text-sm font-mono text-muted">{log.date}</div>
              <input
                type="range"
                min="0" max="12" step="0.25"
                value={log.hours}
                onChange={e => updateHours(i, parseFloat(e.target.value))}
                className="flex-1 accent-indigo-500"
              />
              <div className="w-16 font-mono text-right">{log.hours.toFixed(1)} hrs</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-3xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <div className="text-xs text-muted">Average Sleep</div>
          <div className="text-4xl font-bold text-indigo-600">{result.averageSleep}</div>
          <div className="text-sm">hours/night</div>
        </div>
        <div>
          <div className="text-xs text-muted">Sleep Debt</div>
          <div className="text-4xl font-bold text-rose-600">{result.totalDebt}</div>
          <div className="text-sm">hours owed</div>
        </div>
        <div>
          <div className="text-xs text-muted">Status</div>
          <div className="text-2xl font-bold">{result.status}</div>
          <div className="text-sm mt-2">{result.recommendedRecovery}</div>
        </div>
      </div>

      <p className="text-center text-xs text-muted">Most adults need 7–9 hours. Track consistently for best results.</p>
    </div>
  );
}
