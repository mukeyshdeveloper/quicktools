'use client';

import { useState, useEffect } from 'react';
import { calculateDateDifference, type DateDiffResult } from './utils';
import { ArrowRightLeft } from 'lucide-react';

export default function DateDiffCalculator() {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  
  const [result, setResult] = useState<DateDiffResult | null>(null);

  useEffect(() => {
    // Set initial date1 to today only on client mount
    if (!date1) {
      setDate1(new Date().toISOString().split('T')[0]!);
    }
  }, []);

  useEffect(() => {
    if (date1 && date2) {
      setResult(calculateDateDifference(new Date(date1), new Date(date2)));
    } else {
      setResult(null);
    }
  }, [date1, date2]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Input */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-center space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-bold uppercase tracking-widest text-muted">Start Date</label>
            <input type="date" value={date1} onChange={e => setDate1(e.target.value)} className="tool-input w-full" />
          </div>
          
          <div className="flex justify-center text-cyan-500">
            <ArrowRightLeft size={24} className="rotate-90 md:rotate-0" />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold uppercase tracking-widest text-muted">End Date</label>
            <input type="date" value={date2} onChange={e => setDate2(e.target.value)} className="tool-input w-full" />
          </div>
        </div>

        {/* Output */}
        <div className="space-y-6">
          {!result ? (
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm h-full flex items-center justify-center text-muted">
              Select two dates to calculate
            </div>
          ) : (
            <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-3xl p-6 shadow-md text-white">
              <p className="text-cyan-100 text-sm font-bold uppercase tracking-widest mb-4 text-center">Difference</p>
              
              <div className="text-center mb-8">
                <span className="text-6xl font-black tracking-tight">{result.totalDays.toLocaleString()}</span>
                <p className="font-bold text-cyan-100 mt-1">Total Days</p>
              </div>

              <div className="bg-black/10 rounded-2xl p-4 space-y-3">
                <p className="text-sm font-bold text-cyan-100 text-center mb-2">Or specifically:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {result.years > 0 && <span className="font-black text-lg">{result.years} <span className="text-sm font-bold text-cyan-100">Years</span></span>}
                  {result.months > 0 && <span className="font-black text-lg">{result.months} <span className="text-sm font-bold text-cyan-100">Months</span></span>}
                  {result.remainingDays > 0 && <span className="font-black text-lg">{result.remainingDays} <span className="text-sm font-bold text-cyan-100">Days</span></span>}
                  {result.totalDays === 0 && <span className="font-black text-lg text-center w-full">Same Day</span>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 text-center">
                <div className="bg-black/10 rounded-2xl p-3">
                  <p className="text-xs text-cyan-100 font-bold uppercase">Total Weeks</p>
                  <p className="text-xl font-black mt-1">~{result.weeks.toLocaleString()}</p>
                </div>
                <div className="bg-black/10 rounded-2xl p-3">
                  <p className="text-xs text-cyan-100 font-bold uppercase">Total Months</p>
                  <p className="text-xl font-black mt-1">~{Math.floor(result.totalDays / 30).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
