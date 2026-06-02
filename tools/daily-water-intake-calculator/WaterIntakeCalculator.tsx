'use client';

import { useState, useMemo } from 'react';
import { calculateWaterIntake, type ActivityLevel, type Climate, activityLabels } from './utils';
import { Droplet, ThermometerSun, Activity } from 'lucide-react';

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

  function reset() {
    setWeight('72');
    setActivity('moderate');
    setClimate('moderate');
    setExerciseMin('45');
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <span className="tool-pill">Science-backed</span>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">Your Daily Hydration Needs</h2>
          </div>
          <button onClick={reset} className="btn-secondary text-xs px-4 py-1.5">Reset</button>
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

      <div className="text-center text-xs text-muted">Pro tip: Drink steadily throughout the day. Thirst is a late signal — aim to have pale yellow urine.</div>
    </div>
  );
}
