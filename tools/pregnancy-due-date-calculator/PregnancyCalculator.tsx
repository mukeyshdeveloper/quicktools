'use client';

import { useState, useEffect } from 'react';
import { calculateDueDate, type PregnancyResult } from './utils';
import { CalendarDays, Baby } from 'lucide-react';

export default function PregnancyCalculator() {
  const [dateStr, setDateStr] = useState<string>('');
  const [method, setMethod] = useState<'lmp' | 'conception'>('lmp');
  const [cycleLength, setCycleLength] = useState<string>('28');
  
  const [result, setResult] = useState<PregnancyResult | null>(null);

  useEffect(() => {
    // Initialize date to today only on the client
    if (!dateStr) {
      setDateStr(new Date().toISOString().split('T')[0]!);
    }
  }, []);

  useEffect(() => {
    if (!dateStr) { setResult(null); return; }
    const res = calculateDueDate(new Date(dateStr), method, parseInt(cycleLength) || 28);
    setResult(res);
  }, [dateStr, method, cycleLength]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Input */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-6">
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted">Calculation Method</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMethod('lmp')}
                className={`py-3 rounded-2xl font-bold transition text-sm ${method === 'lmp' ? 'bg-pink-500 text-white shadow-md' : 'bg-background border border-border text-text hover:border-pink-400'}`}
              >
                First Day of LMP
              </button>
              <button
                onClick={() => setMethod('conception')}
                className={`py-3 rounded-2xl font-bold transition text-sm ${method === 'conception' ? 'bg-pink-500 text-white shadow-md' : 'bg-background border border-border text-text hover:border-pink-400'}`}
              >
                Conception Date
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-text">
                {method === 'lmp' ? 'First day of your last period' : 'Date of conception'}
              </label>
              <input 
                type="date" 
                value={dateStr} 
                onChange={e => setDateStr(e.target.value)} 
                className="tool-input w-full" 
              />
            </div>

            {method === 'lmp' && (
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-text">Average Cycle Length (Days)</label>
                <input 
                  type="number" 
                  min="20" max="45" 
                  value={cycleLength} 
                  onChange={e => setCycleLength(e.target.value)} 
                  className="tool-input w-full" 
                />
                <p className="text-[10px] text-muted">Most women have a 28-day cycle.</p>
              </div>
            )}
          </div>
        </div>

        {/* Output */}
        <div className="space-y-6">
          {!result ? (
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm h-full flex items-center justify-center text-muted">
              Enter a date to calculate
            </div>
          ) : (
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-6">
              
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-pink-100 dark:bg-pink-900/30 text-pink-500 rounded-full mb-2">
                  <Baby size={32} />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted">Estimated Due Date</h3>
                <p className="text-3xl font-black text-pink-500">
                  {result.dueDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-sm text-text font-bold">
                  {result.daysRemaining} days remaining!
                </p>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-muted mb-1">
                  <span>Conception</span>
                  <span>Due Date</span>
                </div>
                <div className="w-full bg-background border border-border rounded-full h-4 overflow-hidden relative">
                  <div 
                    className="bg-gradient-to-r from-pink-400 to-rose-500 h-full transition-all duration-1000 ease-out"
                    style={{ width: `${result.progressPercentage}%` }}
                  />
                </div>
                <div className="text-center text-xs font-bold text-pink-500 mt-1">
                  {result.progressPercentage}% Complete
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background border border-border rounded-2xl p-4 text-center">
                  <CalendarDays size={20} className="text-muted mx-auto mb-2" />
                  <p className="text-xs text-muted font-bold uppercase">Time Pregnant</p>
                  <p className="text-lg font-black text-text mt-1">{result.weeksPregnant}w {result.daysPregnant}d</p>
                </div>
                <div className="bg-background border border-border rounded-2xl p-4 text-center">
                  <span className="text-2xl mb-2 block">
                    {result.trimester === 1 ? '🥚' : result.trimester === 2 ? '🥑' : '🍉'}
                  </span>
                  <p className="text-xs text-muted font-bold uppercase">Trimester</p>
                  <p className="text-lg font-black text-text mt-1">
                    {result.trimester}{result.trimester === 1 ? 'st' : result.trimester === 2 ? 'nd' : 'rd'}
                  </p>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
