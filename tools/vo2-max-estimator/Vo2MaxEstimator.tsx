'use client';

import { useState, useMemo } from 'react';
import { calculateVo2Max, activityOptions, type TestType, type Gender } from './utils';
import { Footprints, ClipboardList } from 'lucide-react';

export default function Vo2MaxEstimator() {
  const [testType, setTestType] = useState<TestType>('rockport');
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState('34');
  const [weight, setWeight] = useState('78');
  // Rockport
  const [walkTime, setWalkTime] = useState('15.5');
  const [walkHr, setWalkHr] = useState('138');
  // Non-ex
  const [activity, setActivity] = useState(3);

  const result = useMemo(() => {
    return calculateVo2Max({
      testType,
      gender,
      age: parseInt(age) || 0,
      weightKg: parseFloat(weight) || 0,
      walkTimeMin: testType === 'rockport' ? parseFloat(walkTime) : undefined,
      walkHr: testType === 'rockport' ? parseInt(walkHr) : undefined,
      activityLevel: testType === 'nonexercise' ? (activity as 1 | 2 | 3 | 4 | 5) : undefined,
    });
  }, [testType, gender, age, weight, walkTime, walkHr, activity]);

  function reset() {
    setTestType('rockport');
    setGender('male');
    setAge('34');
    setWeight('78');
    setWalkTime('15.5');
    setWalkHr('138');
    setActivity(3);
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <span className="tool-pill">No lab needed</span>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">Choose a Test Method</h2>
          </div>
          <button onClick={reset} className="btn-secondary text-xs px-4 py-1.5">Reset</button>
        </div>

        {/* Test type segmented */}
        <div className="flex rounded-2xl border border-border overflow-hidden text-sm font-semibold">
          <button onClick={() => setTestType('rockport')} className={`flex-1 py-3 flex items-center justify-center gap-2 ${testType === 'rockport' ? 'bg-indigo-600 text-white' : 'bg-background hover:bg-card'}`}>
            <Footprints className="w-4 h-4" /> Rockport 1-Mile Walk Test
          </button>
          <button onClick={() => setTestType('nonexercise')} className={`flex-1 py-3 flex items-center justify-center gap-2 ${testType === 'nonexercise' ? 'bg-indigo-600 text-white' : 'bg-background hover:bg-card'}`}>
            <ClipboardList className="w-4 h-4" /> Quick Non-Exercise Estimate
          </button>
        </div>

        {/* Common */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="tool-label">Gender</label>
            <div className="flex rounded-2xl border border-border overflow-hidden">
              <button onClick={() => setGender('male')} className={`flex-1 py-2 ${gender === 'male' ? 'bg-indigo-500 text-white' : ''}`}>Male</button>
              <button onClick={() => setGender('female')} className={`flex-1 py-2 ${gender === 'female' ? 'bg-indigo-500 text-white' : ''}`}>Female</button>
            </div>
          </div>
          <div>
            <label className="tool-label">Age</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} className="tool-input text-center font-mono" />
          </div>
          <div>
            <label className="tool-label">Weight (kg)</label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="tool-input text-center font-mono" step="0.5" />
          </div>
        </div>

        {testType === 'rockport' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-sm font-bold">1-Mile Walk Time (minutes)</label>
              <input type="number" value={walkTime} onChange={e => setWalkTime(e.target.value)} className="tool-input font-mono" step="0.1" placeholder="15.0" />
              <p className="text-xs text-muted mt-1">Walk 1 mile (1609 m) as fast as you can on flat ground. Record total minutes + decimal.</p>
            </div>
            <div>
              <label className="text-sm font-bold">Ending Heart Rate (bpm)</label>
              <input type="number" value={walkHr} onChange={e => setWalkHr(e.target.value)} className="tool-input font-mono" placeholder="135" />
              <p className="text-xs text-muted mt-1">Take pulse immediately at the finish line for 15 seconds × 4, or use a chest strap.</p>
            </div>
          </div>
        ) : (
          <div className="pt-2">
            <label className="text-sm font-bold">Current Activity Level</label>
            <div className="space-y-2 mt-2">
              {activityOptions.map((opt) => (
                <label key={opt.value} className={`flex gap-3 p-3 rounded-2xl border cursor-pointer text-sm ${activity === opt.value ? 'border-indigo-500 bg-indigo-50' : 'border-border'}`}>
                  <input type="radio" name="act" checked={activity === opt.value} onChange={() => setActivity(opt.value)} className="mt-1" />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {!result ? (
        <div className="tool-panel text-center text-muted">Fill in the required fields to estimate VO2 max</div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-white">
            <div className="text-indigo-200 text-xs font-bold tracking-[1.5px]">ESTIMATED VO₂ MAX</div>
            <div className="font-display text-7xl font-black tracking-[-3.5px] mt-1 tabular-nums">{result.vo2}</div>
            <div className="text-xl -mt-1 text-indigo-100">ml/kg/min</div>
            <div className={`mt-3 inline-block px-4 py-1 rounded-full bg-white/20 text-sm font-bold ${result.categoryColor.replace('text-', 'text-white')}`}>
              {result.category} • {result.percentile}
            </div>
          </div>

          <div className="tool-panel text-sm">
            <div className="text-xs uppercase tracking-widest text-muted font-bold mb-1">Method used</div>
            <div className="font-semibold">{result.method}</div>
            <p className="mt-3 text-muted">
              {testType === 'rockport'
                ? 'Rockport is one of the best validated field tests for the general population. Perform on a flat measured course.'
                : 'Non-exercise estimates are convenient but have larger error margins. Great for tracking long-term trends.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
