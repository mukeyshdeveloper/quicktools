'use client';

import { useState, useMemo } from 'react';
import { calculateBodyFat, type BodyFatInputs, type Gender, type UnitSystem } from './utils';
import { Ruler, Scale, Info } from 'lucide-react';

export default function BodyFatCalculator() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [gender, setGender] = useState<Gender>('male');

  const [height, setHeight] = useState('175');
  const [neck, setNeck] = useState('38');
  const [waist, setWaist] = useState('82');
  const [hip, setHip] = useState('95');
  const [weight, setWeight] = useState('78');

  const inputs: BodyFatInputs = useMemo(() => ({
    gender,
    unitSystem,
    height: parseFloat(height) || 0,
    neck: parseFloat(neck) || 0,
    waist: parseFloat(waist) || 0,
    hip: parseFloat(hip) || 0,
    weight: parseFloat(weight) || 0,
  }), [gender, unitSystem, height, neck, waist, hip, weight]);

  const result = useMemo(() => calculateBodyFat(inputs), [inputs]);

  function handleUnitChange(next: UnitSystem) {
    if (next === unitSystem) return;

    const h = parseFloat(height) || 0;
    const n = parseFloat(neck) || 0;
    const w = parseFloat(waist) || 0;
    const hp = parseFloat(hip) || 0;
    const wt = parseFloat(weight) || 0;

    if (next === 'imperial') {
      setHeight(h ? (h / 2.54).toFixed(1) : '');
      setNeck(n ? (n / 2.54).toFixed(1) : '');
      setWaist(w ? (w / 2.54).toFixed(1) : '');
      setHip(hp ? (hp / 2.54).toFixed(1) : '');
      setWeight(wt ? (wt * 2.20462).toFixed(1) : '');
    } else {
      setHeight(h ? (h * 2.54).toFixed(0) : '');
      setNeck(n ? (n * 2.54).toFixed(1) : '');
      setWaist(w ? (w * 2.54).toFixed(1) : '');
      setHip(hp ? (hp * 2.54).toFixed(1) : '');
      setWeight(wt ? (wt / 2.20462).toFixed(1) : '');
    }
    setUnitSystem(next);
  }

  function resetAll() {
    setUnitSystem('metric');
    setGender('male');
    setHeight('175');
    setNeck('38');
    setWaist('82');
    setHip('95');
    setWeight('78');
  }

  const isMetric = unitSystem === 'metric';
  const heightUnit = isMetric ? 'cm' : 'in';
  const circUnit = isMetric ? 'cm' : 'in';
  const weightUnit = isMetric ? 'kg' : 'lbs';

  const bfBarWidth = result?.average ? Math.min(Math.max(result.average, 5), 45) : 0;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="tool-pill">Tape measure only</span>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">Enter Your Measurements</h2>
          </div>
          <button onClick={resetAll} className="btn-secondary text-xs px-4 py-1.5">Reset</button>
        </div>

        {/* Unit + Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="tool-label">Units</label>
            <div className="flex rounded-2xl border border-border overflow-hidden">
              <button
                onClick={() => handleUnitChange('metric')}
                className={`flex-1 py-2.5 text-sm font-semibold transition ${isMetric ? 'bg-brand text-white' : 'bg-background hover:bg-card'}`}
              >
                Metric (cm, kg)
              </button>
              <button
                onClick={() => handleUnitChange('imperial')}
                className={`flex-1 py-2.5 text-sm font-semibold transition ${!isMetric ? 'bg-brand text-white' : 'bg-background hover:bg-card'}`}
              >
                Imperial (in, lbs)
              </button>
            </div>
          </div>

          <div>
            <label className="tool-label">Gender</label>
            <div className="flex rounded-2xl border border-border overflow-hidden">
              <button
                onClick={() => setGender('male')}
                className={`flex-1 py-2.5 text-sm font-semibold transition ${gender === 'male' ? 'bg-rose-500 text-white' : 'bg-background hover:bg-card'}`}
              >
                Male
              </button>
              <button
                onClick={() => setGender('female')}
                className={`flex-1 py-2.5 text-sm font-semibold transition ${gender === 'female' ? 'bg-rose-500 text-white' : 'bg-background hover:bg-card'}`}
              >
                Female
              </button>
            </div>
          </div>
        </div>

        {/* Measurements */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text flex items-center gap-1.5">
              <Ruler className="w-4 h-4" /> Height <span className="text-muted font-normal">({heightUnit})</span>
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="tool-input text-center font-mono"
              placeholder={isMetric ? "175" : "69"}
              step="0.1"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text flex items-center gap-1.5">
              Neck <span className="text-muted font-normal">({circUnit})</span>
            </label>
            <input
              type="number"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
              className="tool-input text-center font-mono"
              placeholder={isMetric ? "38" : "15"}
              step="0.1"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text flex items-center gap-1.5">
              Waist <span className="text-muted font-normal">({circUnit})</span>
            </label>
            <input
              type="number"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              className="tool-input text-center font-mono"
              placeholder={isMetric ? "82" : "32"}
              step="0.1"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text flex items-center gap-1.5">
              Hip <span className="text-muted font-normal">({circUnit})</span>
              {gender === 'male' && <span className="text-[10px] text-muted">(women)</span>}
            </label>
            <input
              type="number"
              value={hip}
              onChange={(e) => setHip(e.target.value)}
              className="tool-input text-center font-mono"
              placeholder={isMetric ? "95" : "37"}
              step="0.1"
              disabled={gender === 'male'}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text flex items-center gap-1.5">
              <Scale className="w-4 h-4" /> Weight <span className="text-muted font-normal">({weightUnit})</span>
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="tool-input text-center font-mono"
              placeholder={isMetric ? "78" : "172"}
              step="0.1"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-background border border-border p-4 text-xs text-muted leading-relaxed">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand" />
            <div>
              <strong className="text-text">How to measure (Navy method):</strong> Neck — just below Adam’s apple. Waist — at navel level, relaxed after normal exhale. Hip (women) — widest point of buttocks. Keep tape level and snug but not compressing skin. Navy is generally more accurate for tracking change.
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {!result ? (
          <div className="tool-panel flex items-center justify-center min-h-[220px] text-center text-muted">
            Enter your measurements above to see body fat estimates
          </div>
        ) : (
          <>
            {/* Big average result */}
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-8 text-white shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <p className="uppercase tracking-[2px] text-rose-100 text-xs font-bold mb-1">Estimated Body Fat</p>
                  <div className="font-display text-7xl font-black tracking-tighter tabular-nums">
                    {result.average !== null ? result.average.toFixed(1) : '—'}
                    <span className="text-4xl font-medium align-baseline ml-1">%</span>
                  </div>
                </div>
                <div className="sm:text-right">
                  <div className={`inline-flex items-center rounded-full bg-white/20 px-4 py-1 text-sm font-bold ${result.categoryColor.replace('text-', 'text-white')}`}>
                    {result.category}
                  </div>
                  <p className="mt-2 text-rose-100 text-sm">Average of both methods</p>
                </div>
              </div>

              {/* Visual BF bar */}
              <div className="mt-6">
                <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-3 bg-white rounded-full transition-all"
                    style={{ width: `${bfBarWidth}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-rose-100 mt-1 font-medium tracking-wide">
                  <span>Essential</span>
                  <span>Athlete</span>
                  <span>Fitness</span>
                  <span>Average</span>
                  <span>Obese</span>
                </div>
              </div>
            </div>

            {/* Two method comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Navy */}
              <div className="tool-panel">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-rose-600">US Navy Method</span>
                    <p className="text-sm text-muted">Circumference (most accurate tape)</p>
                  </div>
                  <div className="font-mono text-4xl font-semibold tabular-nums text-text">
                    {result.navy !== null ? result.navy.toFixed(1) : '—'}<span className="text-base align-super text-muted">%</span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-muted">
                  Uses height + neck + waist (+ hip for women). Developed by Naval Health Research Center. Excellent for tracking progress.
                </p>
              </div>

              {/* YMCA */}
              <div className="tool-panel">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-600">YMCA Method</span>
                    <p className="text-sm text-muted">Weight + waist only</p>
                  </div>
                  <div className="font-mono text-4xl font-semibold tabular-nums text-text">
                    {result.ymca !== null ? result.ymca.toFixed(1) : '—'}<span className="text-base align-super text-muted">%</span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-muted">
                  Simple formula using only scale weight and waist circumference. Originally used in YMCA fitness testing.
                </p>
              </div>
            </div>

            {/* Mass breakdown */}
            {result.fatMassKg !== null && result.leanMassKg !== null && (
              <div className="tool-panel">
                <div className="text-sm font-bold text-muted mb-3 tracking-wide">BODY COMPOSITION BREAKDOWN</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="rounded-2xl bg-background border border-border p-4">
                    <div className="text-xs text-muted">Fat Mass</div>
                    <div className="font-mono text-3xl font-semibold mt-1">{result.fatMassKg}<span className="text-base text-muted"> kg</span></div>
                  </div>
                  <div className="rounded-2xl bg-background border border-border p-4">
                    <div className="text-xs text-muted">Lean Mass</div>
                    <div className="font-mono text-3xl font-semibold mt-1">{result.leanMassKg}<span className="text-base text-muted"> kg</span></div>
                  </div>
                  <div className="rounded-2xl bg-background border border-border p-4">
                    <div className="text-xs text-muted">Total Weight</div>
                    <div className="font-mono text-3xl font-semibold mt-1">{inputs.weight}<span className="text-base text-muted"> {weightUnit}</span></div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <p className="text-[11px] text-center text-muted">All calculations happen in your browser. No data is stored or sent anywhere.</p>
    </div>
  );
}
