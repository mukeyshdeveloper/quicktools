'use client';

import { useState, useMemo } from 'react';
import {
  calculateFromCostAndPrice,
  calculatePriceFromCostAndMargin,
  calculatePriceFromCostAndMarkup,
  calculateMarginFromCostAndMarkup,
  formatPercent,
  formatCurrency,
} from './utils';

export default function ProfitMarginCalculator() {
  const [cost, setCost] = useState(800);
  const [price, setPrice] = useState(1200);
  const [desiredMargin, setDesiredMargin] = useState(35);
  const [desiredMarkup, setDesiredMarkup] = useState(50);

  const direct = useMemo(() => calculateFromCostAndPrice(cost, price), [cost, price]);

  const priceFromMargin = useMemo(() => calculatePriceFromCostAndMargin(cost, desiredMargin), [cost, desiredMargin]);
  const priceFromMarkup = useMemo(() => calculatePriceFromCostAndMarkup(cost, desiredMarkup), [cost, desiredMarkup]);
  const marginFromMarkup = useMemo(() => calculateMarginFromCostAndMarkup(cost, desiredMarkup), [cost, desiredMarkup]);

  function reset() {
    setCost(800);
    setPrice(1200);
    setDesiredMargin(35);
    setDesiredMarkup(50);
  }

  return (
    <div className="space-y-6">
      {/* Direct calculation */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="font-semibold mb-3">Calculate from Cost &amp; Selling Price</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Cost per Unit (₹)</label>
            <input type="number" value={cost} onChange={e => setCost(Math.max(0, +e.target.value))} className="tool-input" />
          </div>
          <div>
            <label className="label">Selling Price (₹)</label>
            <input type="number" value={price} onChange={e => setPrice(Math.max(0, +e.target.value))} className="tool-input" />
          </div>
        </div>

        {direct.isValid && (
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="bg-background p-3 rounded-2xl border border-border">
              <div className="text-muted text-xs">Gross Profit</div>
              <div className="font-bold text-lg">{formatCurrency(direct.profit)}</div>
            </div>
            <div className="bg-background p-3 rounded-2xl border border-border">
              <div className="text-muted text-xs">Margin %</div>
              <div className="font-bold text-lg text-emerald-600">{formatPercent(direct.marginPercent)}</div>
            </div>
            <div className="bg-background p-3 rounded-2xl border border-border">
              <div className="text-muted text-xs">Markup %</div>
              <div className="font-bold text-lg text-blue-600">{formatPercent(direct.markupPercent)}</div>
            </div>
            <div className="bg-background p-3 rounded-2xl border border-border">
              <div className="text-muted text-xs">Profit per ₹100 sale</div>
              <div className="font-bold text-lg">{formatCurrency((direct.marginPercent))}</div>
            </div>
          </div>
        )}
      </div>

      {/* Reverse calculators */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="font-semibold mb-3">Price from Desired Margin %</div>
          <div>
            <label className="label">Cost (₹)</label>
            <input type="number" value={cost} onChange={e => setCost(Math.max(0, +e.target.value))} className="tool-input mb-3" />
            <label className="label">Target Gross Margin %</label>
            <input type="number" value={desiredMargin} onChange={e => setDesiredMargin(Math.max(1, Math.min(99, +e.target.value)))} className="tool-input" />
          </div>
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-2xl">
            <div className="text-xs text-emerald-600">Required Selling Price</div>
            <div className="text-3xl font-bold text-emerald-700">{priceFromMargin > 0 ? formatCurrency(Math.round(priceFromMargin)) : '—'}</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="font-semibold mb-3">Price from Markup %</div>
          <div>
            <label className="label">Cost (₹)</label>
            <input type="number" value={cost} onChange={e => setCost(Math.max(0, +e.target.value))} className="tool-input mb-3" />
            <label className="label">Markup % on Cost</label>
            <input type="number" value={desiredMarkup} onChange={e => setDesiredMarkup(Math.max(1, +e.target.value))} className="tool-input" />
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-2xl">
            <div className="text-xs text-blue-600">Required Selling Price</div>
            <div className="text-3xl font-bold text-blue-700">{priceFromMarkup > 0 ? formatCurrency(Math.round(priceFromMarkup)) : '—'}</div>
            <div className="text-xs mt-1 text-blue-600">Equivalent margin ≈ {formatPercent(marginFromMarkup)}</div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button onClick={reset} className="text-xs text-muted hover:text-text">Reset all fields</button>
      </div>

      <div className="text-xs text-muted bg-card border border-border rounded-3xl p-4">
        <strong>Remember:</strong> A 50% markup is only ~33% margin. Always work in margin % when thinking about profit on revenue.
      </div>
    </div>
  );
}
