'use client';

import { useState, useMemo } from 'react';
import { calculateBreakEven, formatCurrency, formatNumber, type BreakEvenInputs } from './utils';
import { TrendingUp, Target, DollarSign } from 'lucide-react';

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState(50000);
  const [price, setPrice] = useState(500);
  const [vc, setVc] = useState(200);
  const [targetProfit, setTargetProfit] = useState(20000);

  const inputs: BreakEvenInputs = { fixedCosts, pricePerUnit: price, variableCostPerUnit: vc, targetProfit };

  const result = useMemo(() => calculateBreakEven(inputs), [inputs]);

  const currentSales = 150; // example for margin of safety demo
  const mosUnits = result.isValid ? Math.max(0, currentSales - result.breakEvenUnits) : 0;

  function handleReset() {
    setFixedCosts(50000);
    setPrice(500);
    setVc(200);
    setTargetProfit(20000);
  }

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="label">Fixed Costs (₹)</label>
            <input type="number" value={fixedCosts} onChange={e => setFixedCosts(Math.max(0, +e.target.value))} className="tool-input" />
            <p className="text-[10px] text-muted mt-1">Rent, salaries, insurance, etc. (monthly or period total)</p>
          </div>
          <div>
            <label className="label">Selling Price per Unit (₹)</label>
            <input type="number" value={price} onChange={e => setPrice(Math.max(0, +e.target.value))} className="tool-input" />
          </div>
          <div>
            <label className="label">Variable Cost per Unit (₹)</label>
            <input type="number" value={vc} onChange={e => setVc(Math.max(0, +e.target.value))} className="tool-input" />
            <p className="text-[10px] text-muted mt-1">Materials, shipping, commissions per sale</p>
          </div>
          <div>
            <label className="label">Target Profit (₹) — optional</label>
            <input type="number" value={targetProfit} onChange={e => setTargetProfit(Math.max(0, +e.target.value))} className="tool-input" />
          </div>
        </div>
        <button onClick={handleReset} className="mt-4 text-xs text-muted hover:text-text">Reset to defaults</button>
      </div>

      {/* Results */}
      {result.isValid ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-3xl p-5">
            <div className="flex items-center gap-2 text-emerald-600 mb-1"><Target className="w-4 h-4" /> Break-Even Units</div>
            <div className="text-4xl font-bold tracking-tighter">{formatNumber(result.breakEvenUnits)}</div>
            <div className="text-sm text-muted mt-1">units to sell to cover costs</div>
          </div>

          <div className="bg-card border border-border rounded-3xl p-5">
            <div className="flex items-center gap-2 text-emerald-600 mb-1"><DollarSign className="w-4 h-4" /> Break-Even Revenue</div>
            <div className="text-4xl font-bold tracking-tighter">{formatCurrency(result.breakEvenRevenue)}</div>
            <div className="text-sm text-muted mt-1">total sales needed</div>
          </div>

          <div className="bg-card border border-border rounded-3xl p-5">
            <div className="flex items-center gap-2 text-blue-600 mb-1"><TrendingUp className="w-4 h-4" /> Contribution Margin</div>
            <div className="text-4xl font-bold tracking-tighter">{formatCurrency(result.contributionMargin)}</div>
            <div className="text-sm text-muted mt-1">per unit ( {result.contributionMarginRatio}% of price )</div>
          </div>

          {result.targetUnits && result.targetRevenue && (
            <>
              <div className="bg-card border border-border rounded-3xl p-5 md:col-span-2 lg:col-span-1">
                <div className="text-sm font-semibold mb-1">To hit target profit of {formatCurrency(targetProfit)}</div>
                <div className="text-3xl font-bold">{formatNumber(result.targetUnits)} units</div>
                <div className="text-sm text-muted">{formatCurrency(result.targetRevenue)} revenue</div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="bg-rose-50 border border-rose-200 rounded-3xl p-5 text-rose-600 text-sm">
          Contribution margin must be positive (Price &gt; Variable Cost). Please adjust your inputs.
        </div>
      )}

      {/* Quick explanation */}
      <div className="prose text-sm text-muted bg-card border border-border rounded-3xl p-5">
        <p><strong>Formula:</strong> Break-Even Units = Fixed Costs ÷ (Price − Variable Cost per Unit)</p>
        <p className="mt-2">Each unit sold after break-even contributes its full margin directly to profit.</p>
      </div>

      <button onClick={handleReset} className="mx-auto block text-xs text-muted hover:text-text">Reset calculator</button>
    </div>
  );
}
