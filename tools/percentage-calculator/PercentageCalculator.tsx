'use client';

import { useState } from 'react';
import { calculateWhatPercentOf, calculateXPercentOfY, calculatePercentChange } from './utils';

export default function PercentageCalculator() {
  // Mode 1: What is X% of Y?
  const [m1X, setM1X] = useState('20');
  const [m1Y, setM1Y] = useState('150');

  // Mode 2: X is what percent of Y?
  const [m2X, setM2X] = useState('50');
  const [m2Y, setM2Y] = useState('200');

  // Mode 3: Percentage increase/decrease from X to Y
  const [m3X, setM3X] = useState('100');
  const [m3Y, setM3Y] = useState('120');

  const res1 = calculateXPercentOfY(parseFloat(m1X), parseFloat(m1Y));
  const res2 = calculateWhatPercentOf(parseFloat(m2X), parseFloat(m2Y));
  const res3 = calculatePercentChange(parseFloat(m3X), parseFloat(m3Y));

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      
      {/* Mode 1 */}
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted mb-4">What is X% of Y?</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2 w-full">
            <span className="font-bold">What is</span>
            <input type="number" value={m1X} onChange={e => setM1X(e.target.value)} className="tool-input w-24 text-center" />
            <span className="font-bold">% of</span>
            <input type="number" value={m1Y} onChange={e => setM1Y(e.target.value)} className="tool-input w-32 text-center" />
            <span className="font-bold text-xl ml-2">=</span>
          </div>
          <div className="w-full sm:w-48 bg-teal-50 dark:bg-teal-900/20 border-2 border-teal-500 rounded-2xl p-3 text-center">
            <span className="text-2xl font-black text-teal-600 dark:text-teal-400">
              {res1 !== null ? Number(res1.toFixed(4)) : '?'}
            </span>
          </div>
        </div>
      </div>

      {/* Mode 2 */}
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted mb-4">X is what percent of Y?</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2 w-full">
            <input type="number" value={m2X} onChange={e => setM2X(e.target.value)} className="tool-input w-24 text-center" />
            <span className="font-bold">is what % of</span>
            <input type="number" value={m2Y} onChange={e => setM2Y(e.target.value)} className="tool-input w-32 text-center" />
            <span className="font-bold text-xl ml-2">=</span>
          </div>
          <div className="w-full sm:w-48 bg-teal-50 dark:bg-teal-900/20 border-2 border-teal-500 rounded-2xl p-3 text-center">
            <span className="text-2xl font-black text-teal-600 dark:text-teal-400">
              {res2 !== null ? Number(res2.toFixed(4)) : '?'}%
            </span>
          </div>
        </div>
      </div>

      {/* Mode 3 */}
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted mb-4">Percentage Increase / Decrease</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2 w-full">
            <span className="font-bold">From</span>
            <input type="number" value={m3X} onChange={e => setM3X(e.target.value)} className="tool-input w-24 text-center" />
            <span className="font-bold">To</span>
            <input type="number" value={m3Y} onChange={e => setM3Y(e.target.value)} className="tool-input w-32 text-center" />
            <span className="font-bold text-xl ml-2">=</span>
          </div>
          <div className="w-full sm:w-48 bg-teal-50 dark:bg-teal-900/20 border-2 border-teal-500 rounded-2xl p-3 text-center">
            <span className="text-2xl font-black text-teal-600 dark:text-teal-400">
              {res3 !== null ? (
                <>
                  {res3 > 0 ? '+' : ''}{Number(res3.toFixed(4))}%
                </>
              ) : '?'}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
