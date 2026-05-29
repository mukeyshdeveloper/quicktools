'use client';

import { useState, useEffect } from 'react';
import { calculatePeriods, type CyclePrediction } from './utils';
import { CalendarHeart, Droplet, Sparkles } from 'lucide-react';

export default function PeriodCalculator() {
  const [dateStr, setDateStr] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [periodLength, setPeriodLength] = useState('5');
  
  const [predictions, setPredictions] = useState<CyclePrediction[]>([]);

  useEffect(() => {
    // Initialize date to today on mount
    if (!dateStr) setDateStr(new Date().toISOString().split('T')[0]!);
  }, []);

  useEffect(() => {
    if (dateStr) {
      setPredictions(calculatePeriods(new Date(dateStr), parseInt(cycleLength) || 28, parseInt(periodLength) || 5));
    }
  }, [dateStr, cycleLength, periodLength]);

  const formatDate = (d: Date) => d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Settings Panel */}
        <div className="md:col-span-4 space-y-5">
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted border-b border-border pb-3">Cycle Details</h2>
            
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-text">First day of last period</label>
              <input type="date" value={dateStr} onChange={e => setDateStr(e.target.value)} className="tool-input" />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-text flex justify-between">Cycle Length <span className="text-rose-500">{cycleLength} days</span></label>
              <input type="range" min="20" max="45" value={cycleLength} onChange={e => setCycleLength(e.target.value)} className="w-full accent-rose-500" />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-text flex justify-between">Period Length <span className="text-rose-500">{periodLength} days</span></label>
              <input type="range" min="2" max="10" value={periodLength} onChange={e => setPeriodLength(e.target.value)} className="w-full accent-rose-500" />
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="md:col-span-8 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted pl-2">Your Next 3 Cycles</h2>
          
          {predictions.map((p, idx) => (
            <div key={idx} className="bg-card border border-border rounded-3xl p-5 shadow-sm hover:border-rose-300 transition-colors">
              <div className="flex flex-col sm:flex-row justify-between gap-6">
                
                {/* Next Period */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 text-rose-500 font-bold text-sm uppercase tracking-wider">
                    <Droplet size={16} className="fill-rose-500" /> Next Period
                  </div>
                  <div>
                    <p className="text-2xl font-black text-text">{formatDate(p.periodStartDate)}</p>
                    <p className="text-sm text-muted font-medium mt-1">to {formatDate(p.periodEndDate)}</p>
                  </div>
                </div>

                <div className="hidden sm:block w-px bg-border my-2" />

                {/* Fertile Window */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 text-indigo-500 font-bold text-sm uppercase tracking-wider">
                    <Sparkles size={16} /> Fertile Window
                  </div>
                  <div>
                    <p className="text-base font-black text-text">{formatDate(p.fertileWindowStart)}</p>
                    <p className="text-sm text-muted font-medium mt-1">to {formatDate(p.fertileWindowEnd)}</p>
                  </div>
                </div>

                <div className="hidden sm:block w-px bg-border my-2" />

                {/* Ovulation */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 text-amber-500 font-bold text-sm uppercase tracking-wider">
                    <CalendarHeart size={16} /> Ovulation
                  </div>
                  <div>
                    <p className="text-xl font-black text-text">{formatDate(p.ovulationDate)}</p>
                    <p className="text-xs text-amber-600/70 dark:text-amber-400/70 font-bold mt-1 uppercase tracking-wider bg-amber-50 dark:bg-amber-900/30 inline-block px-2 py-1 rounded-lg">Estimated peak</p>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
