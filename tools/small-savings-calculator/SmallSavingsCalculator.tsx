'use client';

import { useState, useEffect } from 'react';
import { calculateSmallSavings, formatINR, type SmallSavingsResult, type SchemeType } from './utils';
import { RotateCcw } from 'lucide-react';

const SCHEMES: { key: SchemeType; label: string }[] = [
  { key: 'ppf', label: 'PPF' },
  { key: 'nsc', label: 'NSC' },
  { key: 'kvp', label: 'KVP' },
];

export default function SmallSavingsCalculator() {
  const [scheme, setScheme] = useState<SchemeType>('ppf');
  const [principal, setPrincipal] = useState('150000'); // Annual for PPF, lump sum for others
  const [years, setYears] = useState('15');
  const [customRate, setCustomRate] = useState('');

  const [result, setResult] = useState<SmallSavingsResult | null>(null);

  useEffect(() => {
    const input = {
      scheme,
      principal: parseFloat(principal) || 0,
      years: parseFloat(years) || 0,
      currentRate: customRate ? parseFloat(customRate) : undefined,
    };

    if (input.principal > 0 && input.years > 0) {
      const res = calculateSmallSavings(input);
      setResult(res);
    } else {
      setResult(null);
    }
  }, [scheme, principal, years, customRate]);

  function handleReset() {
    setScheme('ppf');
    setPrincipal('150000');
    setYears('15');
    setCustomRate('');
  }

  const currentRate = result?.rateUsed ?? (scheme === 'ppf' ? 7.1 : scheme === 'nsc' ? 7.7 : 7.5);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Input Card */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-7">
        
        {/* Scheme Selector */}
        <div>
          <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-3">
            Select Scheme
          </label>
          <div className="grid grid-cols-3 gap-3">
            {SCHEMES.map((s) => (
              <button
                key={s.key}
                onClick={() => setScheme(s.key)}
                className={`p-4 rounded-2xl border-2 font-semibold transition ${
                  scheme === s.key
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-border hover:border-emerald-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-2">
              {scheme === 'ppf' ? 'Annual Contribution' : 'Investment Amount'}
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-emerald-600">₹</span>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full pl-12 pr-6 py-3.5 text-3xl font-black tracking-tighter bg-background border-2 border-border focus:border-emerald-500 rounded-2xl outline-none transition"
              />
            </div>
            {scheme === 'ppf' && <p className="text-xs text-muted mt-1">Maximum ₹1.5 Lakh per year</p>}
          </div>

          <div>
            <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-2">
              Investment Period
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="flex-1 py-3 px-4 text-3xl font-black tracking-tighter bg-background border-2 border-border focus:border-emerald-500 rounded-2xl outline-none transition"
              />
              <span className="text-xl font-bold text-muted">Years</span>
            </div>
          </div>
        </div>

        {/* Custom Rate */}
        <div>
          <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-2">
            Interest Rate (Optional)
          </label>
          <div className="flex items-center gap-2 max-w-xs">
            <input
              type="number"
              step="0.1"
              value={customRate}
              onChange={(e) => setCustomRate(e.target.value)}
              placeholder={currentRate.toString()}
              className="flex-1 py-3 px-4 text-2xl font-bold bg-background border-2 border-border focus:border-emerald-500 rounded-2xl outline-none"
            />
            <span className="text-xl font-bold text-muted">%</span>
          </div>
          <p className="text-xs text-muted mt-1">Leave blank to use current rate ({currentRate}%)</p>
        </div>
      </div>

      {/* Results */}
      {result ? (
        <div className="space-y-6">
          <div className="bg-emerald-600 text-white rounded-3xl p-8 text-center">
            <p className="text-emerald-100 text-sm font-bold uppercase tracking-widest mb-1">Maturity Amount</p>
            <p className="text-6xl sm:text-7xl font-black tracking-[-3px] tabular-nums">
              {formatINR(result.maturityAmount)}
            </p>
            <p className="mt-2 text-emerald-200 text-sm">{result.schemeName} • {result.tenure}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-3xl p-6">
              <div className="text-sm font-bold uppercase tracking-widest text-muted mb-1">Total Invested</div>
              <div className="text-3xl font-black tracking-tight tabular-nums">
                {formatINR(result.totalInvestment)}
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6">
              <div className="text-sm font-bold uppercase tracking-widest text-muted mb-1">Interest Earned</div>
              <div className="text-3xl font-black tracking-tight text-emerald-600 tabular-nums">
                +{formatINR(result.interestEarned)}
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6">
              <div className="text-sm font-bold uppercase tracking-widest text-muted mb-1">Interest Rate Used</div>
              <div className="text-3xl font-black tracking-tight tabular-nums">
                {result.rateUsed}%
              </div>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="mx-auto flex items-center gap-2 px-6 py-3 rounded-2xl border border-border hover:bg-background font-semibold transition"
          >
            <RotateCcw size={18} />
            Reset Calculator
          </button>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-3xl p-8 text-center text-muted">
          Enter investment details to see maturity value
        </div>
      )}
    </div>
  );
}
