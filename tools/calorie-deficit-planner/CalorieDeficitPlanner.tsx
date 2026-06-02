'use client';

import { useState, useMemo, useEffect } from 'react';
import { calculateDeficitPlan } from './utils';
import Link from 'next/link';

export default function CalorieDeficitPlanner() {
  const [currentWeight, setCurrentWeight] = useState('85');
  const [goalWeight, setGoalWeight] = useState('75');
  const [maintenance, setMaintenance] = useState('2650');
  const [weeklyLoss, setWeeklyLoss] = useState('0.6');
  const [startDate, setStartDate] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStartDate(new Date());
  }, []);

  const result = useMemo(() => {
    return calculateDeficitPlan({
      currentWeightKg: parseFloat(currentWeight) || 0,
      goalWeightKg: parseFloat(goalWeight) || 0,
      maintenanceCals: parseInt(maintenance) || 0,
      weeklyKgLoss: parseFloat(weeklyLoss) || 0,
      startDate,
    });
  }, [currentWeight, goalWeight, maintenance, weeklyLoss, startDate]);

  function reset() {
    setCurrentWeight('85');
    setGoalWeight('75');
    setMaintenance('2650');
    setWeeklyLoss('0.6');
  }

  // Simple visual bar chart using divs
  const chartData = result?.weeklyPlan || [];

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex justify-between">
          <div>
            <span className="tool-pill">Sustainable by design</span>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">Plan Your Weight Loss</h2>
          </div>
          <button onClick={reset} className="btn-secondary text-xs px-4 py-1.5">Reset</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-text">Current Weight (kg)</label>
              <input type="number" value={currentWeight} onChange={e => setCurrentWeight(e.target.value)} className="tool-input text-2xl font-mono text-center" step="0.5" />
            </div>
            <div>
              <label className="text-sm font-bold text-text">Goal Weight (kg)</label>
              <input type="number" value={goalWeight} onChange={e => setGoalWeight(e.target.value)} className="tool-input text-2xl font-mono text-center" step="0.5" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-text">Your Estimated Maintenance (TDEE)</label>
              <input type="number" value={maintenance} onChange={e => setMaintenance(e.target.value)} className="tool-input text-2xl font-mono text-center" />
              <p className="text-xs text-muted mt-1">Use our <Link href="/tdee-calculator" className="underline text-brand">TDEE Calculator</Link> first for best accuracy.</p>
            </div>

            <div>
              <label className="text-sm font-bold text-text flex justify-between">
                Weekly Fat Loss Target <span className="font-mono text-orange-600">{weeklyLoss} kg/week</span>
              </label>
              <input
                type="range"
                min="0.25"
                max="1.25"
                step="0.05"
                value={weeklyLoss}
                onChange={e => setWeeklyLoss(e.target.value)}
                className="w-full accent-orange-500"
              />
              <div className="flex text-[10px] text-muted justify-between mt-0.5">
                <span>0.25 kg (very conservative)</span>
                <span>1.25 kg (aggressive)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!result ? (
        <div className="tool-panel min-h-[200px] flex items-center justify-center text-center text-muted">
          Enter current weight higher than goal and a realistic TDEE to see your plan
        </div>
      ) : (
        <div className="space-y-5">
          {/* Hero numbers */}
          <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-amber-600 p-8 text-white">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className="text-orange-100 text-xs font-bold tracking-widest">DAILY CALORIE TARGET</div>
                <div className="font-display text-6xl font-black tracking-tighter mt-1 tabular-nums">{result!.targetDailyIntake}</div>
                <div className="text-orange-100">kcal / day</div>
              </div>
              <div>
                <div className="text-orange-100 text-xs font-bold tracking-widest">TIME TO GOAL</div>
                <div className="font-display text-6xl font-black tracking-tighter mt-1">{result!.weeks}<span className="text-4xl align-baseline font-medium">wks</span></div>
                <div className="text-orange-100">{result!.days} days{result!.projectedDate ? ` • ${result!.projectedDate}` : ''}</div>
              </div>
              <div>
                <div className="text-orange-100 text-xs font-bold tracking-widest">TOTAL TO LOSE</div>
                <div className="font-display text-6xl font-black tracking-tighter mt-1 tabular-nums">{result!.weightToLose}<span className="text-4xl align-baseline font-medium"> kg</span></div>
                <div className="text-orange-100">{result!.dailyDeficit} kcal daily deficit</div>
              </div>
            </div>
          </div>

          {/* Chart */}
          {chartData.length > 1 && (
            <div className="tool-panel">
              <div className="text-sm font-bold text-muted mb-3">PROJECTED WEIGHT OVER TIME</div>
              <div className="flex items-end gap-2 h-40 border-b border-border pb-1">
                {chartData.map((pt, i) => {
                  const maxW = chartData[0]!.weight;
                  const minW = chartData[chartData.length - 1]!.weight;
                  const range = maxW - minW || 1;
                  const heightPct = Math.round(((pt.weight - minW) / range) * 70) + 22;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div className="text-[10px] text-muted tabular-nums mb-1">{pt.weight}kg</div>
                      <div className="w-full bg-orange-500 rounded-t transition-all" style={{ height: `${heightPct}%` }} />
                      <div className="text-[9px] text-muted mt-1">W{i + 1}</div>
                    </div>
                  );
                })}
              </div>
              <div className="text-[10px] text-muted mt-2">Each bar = one week. Weight drops steadily at your chosen rate.</div>
            </div>
          )}

          {/* Safety */}
          <div className={`tool-panel text-sm ${result!.safe ? 'border-l-4 border-emerald-500' : 'border-l-4 border-rose-500'}`}>
            <div className="font-bold mb-1">{result!.safe ? 'Safe & sustainable rate' : 'Aggressive — use caution'}</div>
            <p className="text-muted">{result!.warning || 'This rate is within generally accepted safe guidelines for most healthy adults. Prioritize high protein intake and resistance training.'}</p>
          </div>

          <div className="text-xs text-center text-muted">Recalculate every 3–4 weeks as your TDEE will slowly decrease with weight loss.</div>
        </div>
      )}
    </div>
  );
}
