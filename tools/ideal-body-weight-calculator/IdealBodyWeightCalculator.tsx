'use client';

import { useState, useMemo } from 'react';
import { calculateIbw, formatWeight, type Gender, type UnitSystem } from './utils';

export default function IdealBodyWeightCalculator() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [gender, setGender] = useState<Gender>('male');
  const [height, setHeight] = useState('170');

  const heightCm = useMemo(() => {
    const raw = parseFloat(height) || 0;
    return unitSystem === 'metric' ? raw : raw * 2.54;
  }, [height, unitSystem]);

  const result = useMemo(() => {
    return calculateIbw({ gender, unitSystem, heightCm });
  }, [gender, unitSystem, heightCm]);

  function handleUnit(next: UnitSystem) {
    if (next === unitSystem) return;
    const h = parseFloat(height) || 0;
    setHeight(next === 'imperial' ? (h / 2.54).toFixed(1) : (h * 2.54).toFixed(0));
    setUnitSystem(next);
  }

  function reset() {
    setUnitSystem('metric');
    setGender('male');
    setHeight('170');
  }

  const isMetric = unitSystem === 'metric';
  const hUnit = isMetric ? 'cm' : 'in';
  const displayHeight = isMetric ? height : (parseFloat(height) || 0).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="tool-pill">Medical reference formulas</span>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">Calculate Ideal Body Weight</h2>
          </div>
          <button onClick={reset} className="btn-secondary text-xs px-4 py-1.5">Reset</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="tool-label">Units</label>
            <div className="flex rounded-2xl border border-border overflow-hidden text-sm font-semibold">
              <button onClick={() => handleUnit('metric')} className={`flex-1 py-2.5 ${isMetric ? 'bg-amber-500 text-white' : 'hover:bg-card'}`}>Metric (cm)</button>
              <button onClick={() => handleUnit('imperial')} className={`flex-1 py-2.5 ${!isMetric ? 'bg-amber-500 text-white' : 'hover:bg-card'}`}>Imperial (in)</button>
            </div>
          </div>

          <div>
            <label className="tool-label">Gender</label>
            <div className="flex rounded-2xl border border-border overflow-hidden text-sm font-semibold">
              <button onClick={() => setGender('male')} className={`flex-1 py-2.5 ${gender === 'male' ? 'bg-amber-500 text-white' : 'hover:bg-card'}`}>Male</button>
              <button onClick={() => setGender('female')} className={`flex-1 py-2.5 ${gender === 'female' ? 'bg-amber-500 text-white' : 'hover:bg-card'}`}>Female</button>
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-md">
          <label className="text-sm font-bold text-text flex justify-between">
            Height <span className="font-mono text-amber-600">{displayHeight} {hUnit}</span>
          </label>
          <input
            type="range"
            min={isMetric ? "140" : "55"}
            max={isMetric ? "210" : "82"}
            step={isMetric ? "1" : "0.5"}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full accent-amber-500"
          />
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="tool-input w-28 text-center font-mono"
            step={isMetric ? "1" : "0.5"}
          />
        </div>
      </div>

      {!result ? (
        <div className="tool-panel text-center text-muted min-h-[180px] flex items-center justify-center">
          Enter a realistic height to calculate IBW
        </div>
      ) : (
        <div className="space-y-4">
          {/* Average highlight */}
          <div className="rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 p-7 text-white shadow">
            <div className="uppercase tracking-widest text-amber-100 text-xs font-bold">Average of 3 formulas</div>
            <div className="font-display text-6xl font-black tracking-tighter mt-1">
              {formatWeight(result.average, unitSystem)}
            </div>
            <div className="text-amber-100 mt-1 text-sm">Suggested healthy range: {formatWeight(result.rangeLow, unitSystem)} – {formatWeight(result.rangeHigh, unitSystem)}</div>
          </div>

          {/* Three formulas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['devine', 'robinson', 'miller'] as const).map((key) => {
              const val = result[key];
              const isAvg = Math.abs(val - result.average) < 0.6;
              return (
                <div key={key} className="tool-panel">
                  <div className="text-xs uppercase tracking-widest font-bold text-amber-600">{key.toUpperCase()}</div>
                  <div className="font-mono text-4xl font-semibold mt-3 text-text tabular-nums">{formatWeight(val, unitSystem)}</div>
                  <p className="mt-3 text-xs text-muted leading-relaxed">
                    {key === 'devine' && 'Most widely used in medicine and pharmacology.'}
                    {key === 'robinson' && 'Tends to be lower for people under 5\'7".'}
                    {key === 'miller' && 'Often higher for taller individuals.'}
                  </p>
                  {isAvg && <div className="mt-3 inline text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700">Closest to average</div>}
                </div>
              );
            })}
          </div>

          <div className="text-xs text-muted px-1">
            All values are estimates derived from large population studies. They do not consider muscle mass, bone density, or frame size. Use as a reference, not a strict target.
          </div>
        </div>
      )}
    </div>
  );
}
