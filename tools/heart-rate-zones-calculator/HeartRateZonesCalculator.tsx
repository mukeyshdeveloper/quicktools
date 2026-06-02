'use client';

import { useState, useMemo } from 'react';
import { calculateHeartRateZones, type Zone } from './utils';
import { Target } from 'lucide-react';

export default function HeartRateZonesCalculator() {
  const [age, setAge] = useState('32');
  const [restingHr, setRestingHr] = useState('58'); // optional but encouraged
  const [testBpm, setTestBpm] = useState('');

  const result = useMemo(() => {
    const a = parseInt(age) || 0;
    const r = restingHr ? parseInt(restingHr) : undefined;
    return calculateHeartRateZones({ age: a, restingHr: r });
  }, [age, restingHr]);

  const testZone = useMemo(() => {
    if (!result || !testBpm) return null;
    const bpm = parseInt(testBpm);
    if (!bpm) return null;
    return result.zones.findIndex((z) => bpm >= z.bpmLow && bpm <= z.bpmHigh);
  }, [result, testBpm]);

  function reset() {
    setAge('32');
    setRestingHr('58');
    setTestBpm('');
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-5">
        <div className="flex justify-between">
          <div>
            <span className="tool-pill">Karvonen recommended</span>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">Enter Your Numbers</h2>
          </div>
          <button onClick={reset} className="btn-secondary text-xs px-4 py-1.5">Reset</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-bold text-text">Age</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} className="tool-input text-center text-3xl font-mono" min="15" max="95" />
          </div>
          <div>
            <label className="text-sm font-bold text-text flex items-center gap-1.5">
              Resting Heart Rate (optional but better) <span className="text-xs text-emerald-600">★</span>
            </label>
            <input
              type="number"
              value={restingHr}
              onChange={e => setRestingHr(e.target.value)}
              className="tool-input text-center text-3xl font-mono"
              placeholder="Leave blank for simple method"
              min="35"
              max="95"
            />
            <p className="text-xs text-muted mt-1">Morning, lying down, before coffee. Use a monitor for best accuracy.</p>
          </div>
        </div>
      </div>

      {!result ? (
        <div className="tool-panel text-center text-muted min-h-[160px]">Enter a valid age (15–95)</div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <div className="font-bold">Your Max HR estimate: <span className="font-mono text-xl text-red-600">{result.maxHr}</span> bpm</div>
            <div className="text-muted">({result.method === 'karvonen' ? 'Karvonen / HRR method' : '220 − age method'})</div>
          </div>

          {/* Zones */}
          <div className="space-y-3">
            {result.zones.map((zone: Zone, idx) => {
              const isActive = testZone === idx;
              return (
                <div key={idx} className={`rounded-3xl border p-5 transition ${isActive ? 'border-red-500 ring-1 ring-red-200 bg-red-50/40' : 'border-border bg-card'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                    <div className="sm:w-72">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${zone.color}`} />
                        <span className="font-bold tracking-tight text-lg">{zone.name}</span>
                      </div>
                      <div className="font-mono text-4xl font-semibold text-text mt-1 tabular-nums">
                        {zone.bpmLow}–{zone.bpmHigh} <span className="text-base align-baseline text-muted">bpm</span>
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 text-sm">
                      <div>
                        <span className="text-xs font-bold text-muted">PURPOSE</span>
                        <p className="text-text">{zone.purpose}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-muted">HOW IT FEELS</span>
                        <p className="text-text">{zone.feel}</p>
                      </div>
                    </div>

                    <div className="sm:text-right text-xs font-mono text-muted whitespace-nowrap">
                      {zone.pctLow * 100}–{zone.pctHigh * 100}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live tester */}
          <div className="tool-panel">
            <div className="font-bold text-sm flex items-center gap-2 mb-2"><Target className="w-4 h-4" /> Zone Finder — enter a heart rate</div>
            <div className="flex gap-3 items-center">
              <input
                type="number"
                value={testBpm}
                onChange={(e) => setTestBpm(e.target.value)}
                placeholder="e.g. 145"
                className="tool-input w-28 text-center font-mono text-xl"
              />
              <div className="text-sm text-muted">bpm</div>
              {testZone !== null && testZone >= 0 && (
                <div className="text-sm font-semibold text-red-600">→ Currently in Zone {testZone + 1}</div>
              )}
            </div>
            <p className="text-xs text-muted mt-2">Wear a chest strap or good optical sensor for live training feedback.</p>
          </div>
        </div>
      )}

      <p className="text-center text-xs text-muted">Training advice: 80% of your cardio volume should be in Zones 1–2. Use Zones 4–5 sparingly for quality sessions.</p>
    </div>
  );
}
