'use client';

import { useState, useEffect } from 'react';
import { calculateDiscount, type DiscountResult } from './utils';

export default function DiscountCalculator() {
  const [price, setPrice] = useState('100');
  const [discount, setDiscount] = useState('20');
  const [tax, setTax] = useState('8.5');
  
  const [result, setResult] = useState<DiscountResult | null>(null);

  useEffect(() => {
    setResult(calculateDiscount(parseFloat(price), parseFloat(discount), parseFloat(tax) || 0));
  }, [price, discount, tax]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Input */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text">Original Price</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-bold">$</span>
              <input type="number" min="0" value={price} onChange={e => setPrice(e.target.value)} className="input w-full pl-8" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text">Discount %</label>
            <div className="relative">
              <input type="number" min="0" max="100" value={discount} onChange={e => setDiscount(e.target.value)} className="input w-full pr-8" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted font-bold">%</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-text">Sales Tax % <span className="text-muted font-normal">(Optional)</span></label>
            <div className="relative">
              <input type="number" min="0" max="100" value={tax} onChange={e => setTax(e.target.value)} className="input w-full pr-8" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted font-bold">%</span>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="space-y-6">
          {!result ? (
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm h-full flex items-center justify-center text-muted">
              Enter details to calculate
            </div>
          ) : (
            <div className="bg-emerald-500 rounded-3xl p-6 text-white shadow-md flex flex-col justify-center">
              <div className="text-center mb-6">
                <p className="text-emerald-100 text-sm font-bold uppercase tracking-widest mb-1">Final Price</p>
                <p className="text-6xl font-black tracking-tight">${result.finalPrice.toFixed(2)}</p>
                <p className="text-emerald-100 font-bold mt-2 bg-emerald-600/50 inline-block px-3 py-1 rounded-full">
                  You save ${result.totalSaved.toFixed(2)}
                </p>
              </div>

              <div className="bg-emerald-600/30 rounded-2xl p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-emerald-100">Original Price</span>
                  <span className="font-bold">${result.originalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-200 font-bold">
                  <span>Discount ({discount}%)</span>
                  <span>-${result.discountAmount.toFixed(2)}</span>
                </div>
                {result.taxAmount > 0 && (
                  <div className="flex justify-between border-t border-emerald-500/30 pt-3">
                    <span className="text-emerald-100">Tax ({tax}%)</span>
                    <span className="font-bold">+${result.taxAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
