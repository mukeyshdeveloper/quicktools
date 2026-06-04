'use client';

import { useState, useMemo } from 'react';
import { calculateAll, type HealthInputs } from './utils';

export default function HealthMetricsDashboard() {
  const [inputs, setInputs] = useState<HealthInputs>({
    heightCm: 175,
    weightKg: 70,
    age: 30,
    gender: 'male',
    neckCm: 38,
    waistCm: 85,
    hipCm: 95,
  });

  const results = useMemo(() => calculateAll(inputs), [inputs]);

  function update<K extends keyof HealthInputs>(key: K, value: HealthInputs[K]) {
    setInputs(prev => ({ ...prev, [key]: value }));
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="label">Height (cm)</label>
            <input type="number" value={inputs.heightCm} onChange={e => update('heightCm', +e.target.value)} className="tool-input" />
          </div>
          <div>
            <label className="label">Weight (kg)</label>
            <input type="number" value={inputs.weightKg} onChange={e => update('weightKg', +e.target.value)} className="tool-input" />
          </div>
          <div>
            <label className="label">Age</label>
            <input type="number" value={inputs.age} onChange={e => update('age', +e.target.value)} className="tool-input" />
          </div>
          <div>
            <label className="label">Gender</label>
            <select value={inputs.gender} onChange={e => update('gender', e.target.value as any)} className="tool-input">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="label">Neck (cm)</label>
            <input type="number" value={inputs.neckCm} onChange={e => update('neckCm', +e.target.value)} className="tool-input" />
          </div>
          <div>
            <label className="label">Waist (cm)</label>
            <input type="number" value={inputs.waistCm} onChange={e => update('waistCm', +e.target.value)} className="tool-input" />
          </div>
          {inputs.gender === 'female' && (
            <div>
              <label className="label">Hip (cm)</label>
              <input type="number" value={inputs.hipCm} onChange={e => update('hipCm', +e.target.value)} className="tool-input" />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-3xl p-5">
          <div className="text-xs text-muted">BMI</div>
          <div className="text-4xl font-bold">{results.bmi}</div>
          <div className="text-sm text-emerald-600">{results.bmiCategory}</div>
        </div>
        <div className="bg-card border border-border rounded-3xl p-5">
          <div className="text-xs text-muted">Body Fat % (Navy)</div>
          <div className="text-4xl font-bold">{results.bodyFatNavy ?? '—'}</div>
          <div className="text-xs text-muted">Tape measurement method</div>
        </div>
        <div className="bg-card border border-border rounded-3xl p-5">
          <div className="text-xs text-muted">Body Fat % (YMCA)</div>
          <div className="text-4xl font-bold">{results.bodyFatYMCA}</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="font-semibold mb-3">Ideal Body Weight (kg)</div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>Devine: <span className="font-bold">{results.idealWeightDevine}</span></div>
          <div>Robinson: <span className="font-bold">{results.idealWeightRobinson}</span></div>
          <div>Miller: <span className="font-bold">{results.idealWeightMiller}</span></div>
        </div>
      </div>
    </div>
  );
}
