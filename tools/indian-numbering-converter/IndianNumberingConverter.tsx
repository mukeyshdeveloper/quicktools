'use client';

import { useState, useMemo } from 'react';
import { formatIndianNumber, formatInternationalNumber, getUnitBreakdown } from './utils';

export default function IndianNumberingConverter() {
  const [input, setInput] = useState('25000000');
  const num = parseFloat(input) || 0;

  const indian = useMemo(() => formatIndianNumber(num), [num]);
  const intl = useMemo(() => formatInternationalNumber(num), [num]);
  const breakdown = useMemo(() => getUnitBreakdown(num), [num]);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-card border border-border rounded-3xl p-6">
        <label className="label">Enter Number</label>
        <input type="number" value={input} onChange={e => setInput(e.target.value)} className="tool-input text-2xl font-mono" placeholder="25000000" />
        <p className="text-xs text-muted mt-1">Works both ways – just type the number.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="text-sm font-bold text-amber-600 mb-1">Indian System</div>
          <div className="font-mono text-3xl font-bold break-all">{indian}</div>
          <div className="text-xs text-muted mt-2">Lakh = 1,00,000 • Crore = 1,00,00,000</div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="text-sm font-bold text-blue-600 mb-1">International System</div>
          <div className="font-mono text-3xl font-bold break-all">{intl}</div>
          <div className="text-xs text-muted mt-2">Million = 1,000,000 • Billion = 1,000,000,000</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="font-semibold mb-3">Indian Unit Breakdown</div>
        <div className="space-y-2 text-sm">
          {breakdown.length > 0 ? breakdown.map((b, i) => (
            <div key={i} className="flex justify-between bg-background p-3 rounded-2xl">
              <span>{b.unit}</span>
              <span className="font-mono font-medium">{b.value.toLocaleString('en-IN')}</span>
            </div>
          )) : <div className="text-muted">Enter a number to see breakdown.</div>}
        </div>
      </div>

      <p className="text-center text-xs text-muted">All formatting and conversion happens locally in your browser.</p>
    </div>
  );
}
