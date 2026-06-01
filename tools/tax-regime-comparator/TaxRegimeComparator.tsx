'use client';

import { useState, useEffect } from 'react';
import { compareTaxRegimes, formatINR, type TaxInput, type TaxComparison, type AgeGroup } from './utils';
import { RotateCcw, TrendingDown, Award } from 'lucide-react';

export default function TaxRegimeComparator() {
  const [grossIncome, setGrossIncome] = useState('1200000');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('below60');

  // Deductions (only matter for Old Regime)
  const [deduction80C, setDeduction80C] = useState('150000');
  const [deduction80D, setDeduction80D] = useState('25000');
  const [otherDeductions, setOtherDeductions] = useState('0');

  const [comparison, setComparison] = useState<TaxComparison | null>(null);

  useEffect(() => {
    const input: TaxInput = {
      grossIncome: parseFloat(grossIncome) || 0,
      ageGroup,
      deduction80C: parseFloat(deduction80C) || 0,
      deduction80D: parseFloat(deduction80D) || 0,
      otherDeductions: parseFloat(otherDeductions) || 0,
    };

    if (input.grossIncome > 0) {
      const result = compareTaxRegimes(input);
      setComparison(result);
    } else {
      setComparison(null);
    }
  }, [grossIncome, ageGroup, deduction80C, deduction80D, otherDeductions]);

  function handleReset() {
    setGrossIncome('1200000');
    setAgeGroup('below60');
    setDeduction80C('150000');
    setDeduction80D('25000');
    setOtherDeductions('0');
  }

  const income = parseFloat(grossIncome) || 0;
  const totalOldDeductions =
    (parseFloat(deduction80C) || 0) +
    (parseFloat(deduction80D) || 0) +
    (parseFloat(otherDeductions) || 0) +
    50000; // standard deduction

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Input Section */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
        
        {/* Gross Income */}
        <div>
          <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-3">
            Your Gross Annual Income
          </label>
          <div className="relative max-w-md">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-blue-600">₹</span>
            <input
              type="number"
              value={grossIncome}
              onChange={(e) => setGrossIncome(e.target.value)}
              className="w-full pl-12 pr-6 py-4 text-4xl font-black tracking-tighter bg-background border-2 border-border focus:border-blue-500 rounded-2xl outline-none transition"
              placeholder="1200000"
            />
          </div>
          <p className="text-xs text-muted mt-1.5">Enter your total income before any deductions</p>
        </div>

        {/* Age Group */}
        <div>
          <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-3">
            Your Age Group (affects Old Regime slabs)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { value: 'below60' as const, label: 'Below 60 years', desc: 'Standard slabs' },
              { value: '60to80' as const, label: '60 – 80 years', desc: 'Senior citizen' },
              { value: 'above80' as const, label: 'Above 80 years', desc: 'Super senior' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setAgeGroup(option.value)}
                className={`p-4 rounded-2xl border-2 text-left transition ${
                  ageGroup === option.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-border hover:border-blue-200'
                }`}
              >
                <div className="font-bold">{option.label}</div>
                <div className="text-xs text-muted mt-0.5">{option.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Deductions - Only relevant for Old Regime */}
        <div className="border-t border-border pt-8">
          <div className="flex items-center gap-2 mb-3">
            <label className="text-sm font-bold uppercase tracking-widest text-muted">
              Deductions (Only for Old Regime)
            </label>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-bold">OLD REGIME ONLY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted block mb-1.5">80C Investments (PPF, ELSS, etc.)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">₹</span>
                <input
                  type="number"
                  value={deduction80C}
                  onChange={(e) => setDeduction80C(e.target.value)}
                  className="w-full pl-7 py-2.5 rounded-xl border border-border bg-background text-sm focus:border-blue-500 outline-none"
                  max="150000"
                />
              </div>
              <p className="text-[10px] text-muted mt-1">Max ₹1.5 Lakh</p>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted block mb-1.5">80D Health Insurance</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">₹</span>
                <input
                  type="number"
                  value={deduction80D}
                  onChange={(e) => setDeduction80D(e.target.value)}
                  className="w-full pl-7 py-2.5 rounded-xl border border-border bg-background text-sm focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted block mb-1.5">Other Deductions (HRA, 24b, etc.)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">₹</span>
                <input
                  type="number"
                  value={otherDeductions}
                  onChange={(e) => setOtherDeductions(e.target.value)}
                  className="w-full pl-7 py-2.5 rounded-xl border border-border bg-background text-sm focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-muted mt-3">Total Deductions in Old Regime: <span className="font-bold text-text">{formatINR(totalOldDeductions)}</span></p>
        </div>
      </div>

      {/* Comparison Results */}
      {comparison && income > 0 ? (
        <div className="space-y-6">
          {/* Winner Banner */}
          <div className={`rounded-3xl p-6 text-center ${comparison.recommended === 'old' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'}`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="h-5 w-5" />
              <span className="font-bold tracking-widest text-sm uppercase">RECOMMENDED</span>
            </div>
            <p className="text-3xl font-black tracking-tight">
              {comparison.recommended === 'old' ? 'Old Tax Regime' : 'New Tax Regime'} is better
            </p>
            <p className="mt-1 text-lg opacity-90">
              You can save <span className="font-black">{formatINR(comparison.savingsAmount)}</span> per year
            </p>
          </div>

          {/* Side by Side Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Old Regime Card */}
            <div className={`rounded-3xl border-2 p-6 transition ${comparison.oldRegime.isBetter ? 'border-emerald-500 bg-emerald-50/50' : 'border-border bg-card'}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-sm font-bold text-muted">OLD REGIME</span>
                  {comparison.oldRegime.isBetter && (
                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold">BETTER</span>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black tabular-nums tracking-tighter">{formatINR(comparison.oldRegime.breakdown.totalTax)}</div>
                  <div className="text-xs text-muted">Total Tax</div>
                </div>
              </div>

              <div className="space-y-2 text-sm border-t border-border pt-4 mt-2">
                <div className="flex justify-between">
                  <span className="text-muted">Taxable Income</span>
                  <span className="font-medium tabular-nums">{formatINR(comparison.oldRegime.breakdown.taxableIncome)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Tax before Cess</span>
                  <span className="font-medium tabular-nums">{formatINR(comparison.oldRegime.breakdown.taxBeforeCess)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Health & Education Cess (4%)</span>
                  <span className="font-medium tabular-nums">{formatINR(comparison.oldRegime.breakdown.cess)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t text-base font-bold">
                  <span>Effective Tax Rate</span>
                  <span>{comparison.oldRegime.breakdown.effectiveTaxRate}%</span>
                </div>
              </div>
            </div>

            {/* New Regime Card */}
            <div className={`rounded-3xl border-2 p-6 transition ${comparison.newRegime.isBetter ? 'border-blue-500 bg-blue-50/50' : 'border-border bg-card'}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-sm font-bold text-muted">NEW REGIME</span>
                  {comparison.newRegime.isBetter && (
                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-600 text-white font-bold">BETTER</span>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black tabular-nums tracking-tighter">{formatINR(comparison.newRegime.breakdown.totalTax)}</div>
                  <div className="text-xs text-muted">Total Tax</div>
                </div>
              </div>

              <div className="space-y-2 text-sm border-t border-border pt-4 mt-2">
                <div className="flex justify-between">
                  <span className="text-muted">Taxable Income</span>
                  <span className="font-medium tabular-nums">{formatINR(comparison.newRegime.breakdown.taxableIncome)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Tax before Cess</span>
                  <span className="font-medium tabular-nums">{formatINR(comparison.newRegime.breakdown.taxBeforeCess)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Health & Education Cess (4%)</span>
                  <span className="font-medium tabular-nums">{formatINR(comparison.newRegime.breakdown.cess)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t text-base font-bold">
                  <span>Effective Tax Rate</span>
                  <span>{comparison.newRegime.breakdown.effectiveTaxRate}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-border hover:bg-background font-semibold transition"
            >
              <RotateCcw size={18} />
              Reset All Values
            </button>
          </div>

          <div className="text-center text-xs text-muted max-w-md mx-auto">
            Note: This is an estimate based on current tax rules (FY 2025-26). Actual tax may vary based on your specific situation. Consult a tax professional for advice.
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-3xl p-8 text-center text-muted">
          Enter your gross income to compare both tax regimes
        </div>
      )}
    </div>
  );
}
