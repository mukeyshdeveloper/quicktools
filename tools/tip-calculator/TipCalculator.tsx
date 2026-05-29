'use client';

import { useState, useEffect } from 'react';
import { calculateTip, type TipResult } from './utils';

export default function TipCalculator() {
  const [bill, setBill] = useState('50');
  const [tipPercent, setTipPercent] = useState(20);
  const [people, setPeople] = useState('1');
  
  const [result, setResult] = useState<TipResult | null>(null);

  useEffect(() => {
    setResult(calculateTip(parseFloat(bill), tipPercent, parseInt(people) || 1));
  }, [bill, tipPercent, people]);

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-6">
        
        {/* Total Bill Input */}
        <div className="text-center">
          <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-2">Total Bill</label>
          <div className="relative inline-block w-48">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black text-amber-500">$</span>
            <input 
              type="number" min="0" 
              value={bill} 
              onChange={e => setBill(e.target.value)} 
              className="w-full bg-background border-2 border-border focus:border-amber-500 rounded-2xl py-3 pl-10 pr-4 text-3xl font-black text-center outline-none transition" 
            />
          </div>
        </div>

        {/* Tip Selector */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="text-sm font-bold text-text">Select Tip %</label>
            <span className="font-black text-amber-500">{tipPercent}%</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[10, 15, 18, 20].map(p => (
              <button 
                key={p} 
                onClick={() => setTipPercent(p)}
                className={`py-2 rounded-xl font-bold transition ${tipPercent === p ? 'bg-amber-500 text-white shadow-md' : 'bg-background border border-border hover:border-amber-300'}`}
              >
                {p}%
              </button>
            ))}
          </div>
          <input 
            type="range" min="0" max="50" 
            value={tipPercent} 
            onChange={e => setTipPercent(parseInt(e.target.value))} 
            className="w-full accent-amber-500 mt-4" 
          />
        </div>

        {/* Split */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="text-sm font-bold text-text">Split between</label>
            <span className="font-black text-amber-500">{people} {parseInt(people) === 1 ? 'person' : 'people'}</span>
          </div>
          <input 
            type="range" min="1" max="20" 
            value={people} 
            onChange={e => setPeople(e.target.value)} 
            className="w-full accent-amber-500" 
          />
        </div>

        {/* Results */}
        {result && (
          <div className="pt-4 border-t border-border space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted font-bold">Tip Amount</span>
              <span className="text-xl font-black">${result.tipAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted font-bold">Total Bill</span>
              <span className="text-xl font-black">${result.totalBill.toFixed(2)}</span>
            </div>
            
            {parseInt(people) > 1 && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-500 rounded-2xl p-4 mt-4">
                <p className="text-center text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-1">Each Person Pays</p>
                <p className="text-center text-4xl font-black text-amber-500">${result.totalPerPerson.toFixed(2)}</p>
                <p className="text-center text-sm text-amber-600/70 dark:text-amber-400/70 font-bold mt-1">
                  (Includes ${result.tipPerPerson.toFixed(2)} tip)
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
