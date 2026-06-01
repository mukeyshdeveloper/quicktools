'use client';

import { useState, useEffect } from 'react';
import { calculateGST, formatINR, type GstMode, type SupplyType, type GstResult } from './utils';
import { RotateCcw, Copy, Check } from 'lucide-react';

const GST_RATES = [3, 5, 12, 18, 28]; // Common Indian GST rates including 3% for certain goods

export default function GstCalculator() {
  const [amount, setAmount] = useState('10000');
  const [rate, setRate] = useState(18);
  const [customRate, setCustomRate] = useState('');
  const [mode, setMode] = useState<GstMode>('exclusive');
  const [supplyType, setSupplyType] = useState<SupplyType>('intra');

  const [result, setResult] = useState<GstResult | null>(null);
  const [copied, setCopied] = useState(false);

  // Live calculation
  useEffect(() => {
    const numericAmount = parseFloat(amount);
    const effectiveRate = customRate ? parseFloat(customRate) : rate;

    const res = calculateGST({
      amount: numericAmount,
      rate: effectiveRate,
      mode,
      supplyType,
    });

    setResult(res);
  }, [amount, rate, customRate, mode, supplyType]);

  const effectiveRate = customRate ? parseFloat(customRate) : rate;

  function handleRateSelect(r: number) {
    setRate(r);
    setCustomRate('');
  }

  function handleCustomRateChange(value: string) {
    setCustomRate(value);
    if (value) {
      const num = parseFloat(value);
      if (!isNaN(num) && num > 0 && num <= 100) {
        setRate(num);
      }
    }
  }

  function handleReset() {
    setAmount('10000');
    setRate(18);
    setCustomRate('');
    setMode('exclusive');
    setSupplyType('intra');
    setCopied(false);
  }

  async function copyResults() {
    if (!result) return;

    const text = `
GST Calculation
Amount: ${formatINR(parseFloat(amount))}
Mode: ${mode === 'exclusive' ? 'Exclusive (Add GST)' : 'Inclusive (Extract GST)'}
GST Rate: ${effectiveRate}%
Supply: ${supplyType === 'intra' ? 'Intra-State (CGST + SGST)' : 'Inter-State (IGST)'}

Taxable Value: ${formatINR(result.taxableValue)}
Total GST: ${formatINR(result.gstAmount)}
${supplyType === 'intra' 
  ? `CGST (9%): ${formatINR(result.cgst)}\nSGST (9%): ${formatINR(result.sgst)}`
  : `IGST: ${formatINR(result.igst)}`
}
Total Payable: ${formatINR(result.totalAmount)}
    `.trim();

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isValid = result !== null;

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Input Section */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
        
        {/* Amount Input */}
        <div>
          <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-3">
            Enter Amount
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-emerald-600">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-12 pr-6 py-4 text-4xl font-black tracking-tighter bg-background border-2 border-border focus:border-emerald-500 rounded-2xl outline-none transition"
            />
          </div>
        </div>

        {/* Mode Toggle */}
        <div>
          <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-3">
            Calculation Mode
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMode('exclusive')}
              className={`p-4 rounded-2xl border-2 text-left transition font-semibold ${
                mode === 'exclusive'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-border hover:border-emerald-200'
              }`}
            >
              <div className="font-bold">Exclusive</div>
              <div className="text-xs text-muted mt-0.5">Add GST to base price</div>
            </button>
            <button
              onClick={() => setMode('inclusive')}
              className={`p-4 rounded-2xl border-2 text-left transition font-semibold ${
                mode === 'inclusive'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-border hover:border-emerald-200'
              }`}
            >
              <div className="font-bold">Inclusive</div>
              <div className="text-xs text-muted mt-0.5">Extract GST from final price</div>
            </button>
          </div>
        </div>

        {/* GST Rate */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-bold uppercase tracking-widest text-muted">
              GST Rate
            </label>
            <span className="text-2xl font-black text-emerald-600 tabular-nums">
              {effectiveRate}%
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-3">
            {GST_RATES.map((r) => (
              <button
                key={r}
                onClick={() => handleRateSelect(r)}
                className={`py-3 rounded-2xl font-bold text-sm transition active:scale-[0.985] ${
                  rate === r && !customRate
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-background border border-border hover:border-emerald-300'
                }`}
              >
                {r}%
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={customRate}
              onChange={(e) => handleCustomRateChange(e.target.value)}
              placeholder="Custom rate (e.g. 3 or 0.25)"
              className="w-full pr-8 pl-4 py-3 rounded-2xl border border-border bg-background text-sm focus:border-emerald-500 outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted text-sm font-medium">%</span>
          </div>
        </div>

        {/* Supply Type */}
        <div>
          <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-3">
            Place of Supply
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setSupplyType('intra')}
              className={`p-4 rounded-2xl border-2 transition text-left ${
                supplyType === 'intra'
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-border hover:border-emerald-200'
              }`}
            >
              <div className="font-bold">Intra-State</div>
              <div className="text-xs text-muted mt-1">CGST + SGST (within same state)</div>
            </button>
            <button
              onClick={() => setSupplyType('inter')}
              className={`p-4 rounded-2xl border-2 transition text-left ${
                supplyType === 'inter'
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-border hover:border-emerald-200'
              }`}
            >
              <div className="font-bold">Inter-State</div>
              <div className="text-xs text-muted mt-1">IGST (different states / imports)</div>
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {isValid && result ? (
        <div className="space-y-4">
          {/* Total Payable - Hero Result */}
          <div className="bg-emerald-600 text-white rounded-3xl p-7 sm:p-8 text-center shadow-lg">
            <p className="text-emerald-100 text-sm font-bold tracking-[3px] uppercase mb-1">TOTAL PAYABLE</p>
            <p className="text-6xl sm:text-7xl font-black tracking-[-3.5px] tabular-nums">
              {formatINR(result.totalAmount)}
            </p>
            <p className="mt-2 text-emerald-200 text-sm">
              {mode === 'exclusive' ? 'Base + GST' : 'Final price including GST'}
            </p>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Taxable Value */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-muted mb-1">Taxable Value</div>
              <div className="text-3xl font-black text-text tabular-nums">{formatINR(result.taxableValue)}</div>
              <div className="text-[10px] text-muted mt-1">Base amount before tax</div>
            </div>

            {/* Total GST */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="text-xs font-bold uppercase tracking-widest text-muted mb-1">Total GST ({effectiveRate}%)</div>
              <div className="text-3xl font-black text-emerald-600 tabular-nums">{formatINR(result.gstAmount)}</div>
              <div className="text-[10px] text-muted mt-1">Total tax collected</div>
            </div>

            {/* Split Breakdown */}
            <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
              {supplyType === 'intra' ? (
                <>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted">CGST</div>
                    <div className="text-2xl font-bold tabular-nums">{formatINR(result.cgst)}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted">SGST</div>
                    <div className="text-2xl font-bold tabular-nums">{formatINR(result.sgst)}</div>
                  </div>
                </>
              ) : (
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-muted">IGST</div>
                  <div className="text-3xl font-black text-emerald-600 tabular-nums">{formatINR(result.igst)}</div>
                  <div className="text-xs text-muted mt-1">Full GST amount</div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={copyResults}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-background border border-border hover:border-emerald-300 font-semibold transition active:scale-[0.985]"
            >
              {copied ? <Check size={18} className="text-emerald-600" /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy Breakdown'}
            </button>

            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-border hover:bg-background font-semibold transition active:scale-[0.985]"
            >
              <RotateCcw size={18} />
              Reset
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-3xl p-8 text-center text-muted">
          Enter a valid amount to see GST breakdown
        </div>
      )}
    </div>
  );
}
