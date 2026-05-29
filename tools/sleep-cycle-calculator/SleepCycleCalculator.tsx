'use client';

import { useState, useEffect } from 'react';
import { calculateWakeUpTimes, calculateBedtimes, type SleepResult } from './utils';
import { Moon, Sun } from 'lucide-react';

export default function SleepCycleCalculator() {
  const [time, setTime] = useState<string>('07:00');
  const [mode, setMode] = useState<'wake' | 'sleep'>('wake'); // wake = I want to wake up at X, sleep = I am going to bed at X
  
  const [result, setResult] = useState<SleepResult | null>(null);

  useEffect(() => {
    if (!time) { setResult(null); return; }
    
    // Create today's date with the selected time
    const [hours, minutes] = time.split(':');
    const d = new Date();
    d.setHours(parseInt(hours!), parseInt(minutes!), 0, 0);

    if (mode === 'wake') {
      setResult(calculateBedtimes(d));
    } else {
      setResult(calculateWakeUpTimes(d));
    }
  }, [time, mode]);

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      
      {/* Modes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => setMode('wake')}
          className={`flex items-center gap-3 p-4 rounded-3xl border-2 transition ${mode === 'wake' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' : 'border-transparent bg-card shadow-sm hover:border-indigo-200 text-text'}`}
        >
          <div className={`p-2 rounded-xl ${mode === 'wake' ? 'bg-indigo-500 text-white' : 'bg-background text-muted'}`}>
            <Sun size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-bold">I want to wake up at...</h3>
            <p className="text-xs opacity-80 mt-0.5">Find out when to go to bed</p>
          </div>
        </button>
        
        <button
          onClick={() => setMode('sleep')}
          className={`flex items-center gap-3 p-4 rounded-3xl border-2 transition ${mode === 'sleep' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' : 'border-transparent bg-card shadow-sm hover:border-indigo-200 text-text'}`}
        >
          <div className={`p-2 rounded-xl ${mode === 'sleep' ? 'bg-indigo-500 text-white' : 'bg-background text-muted'}`}>
            <Moon size={24} />
          </div>
          <div className="text-left">
            <h3 className="font-bold">I am going to bed at...</h3>
            <p className="text-xs opacity-80 mt-0.5">Find out when to wake up</p>
          </div>
        </button>
      </div>

      {/* Input */}
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm text-center space-y-4">
        <label className="block text-sm font-bold uppercase tracking-widest text-muted">
          {mode === 'wake' ? 'Wake up time' : 'Bedtime'}
        </label>
        <input 
          type="time" 
          value={time} 
          onChange={e => setTime(e.target.value)} 
          className="text-4xl sm:text-6xl font-black bg-transparent border-none text-center text-indigo-500 focus:ring-0 w-full"
        />
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h3 className="font-bold text-text text-xl">
              {mode === 'wake' ? 'You should try to fall asleep at one of these times:' : 'Set your alarm for one of these times:'}
            </h3>
            <p className="text-sm text-muted">A good night's sleep consists of 5-6 complete sleep cycles. We've calculated 15 minutes to fall asleep.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {result.times.map((t, i) => {
              // The times array has 4 items corresponding to 6, 5, 4, 3 cycles.
              const cycles = 6 - i;
              const hours = (cycles * 90) / 60;
              
              return (
                <div key={i} className={`rounded-3xl p-5 text-center border-2 ${cycles === 5 || cycles === 6 ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-md transform scale-105' : 'border-border bg-card'}`}>
                  <p className="text-sm font-bold text-muted mb-2">{cycles} Cycles</p>
                  <p className={`text-2xl font-black ${cycles === 5 || cycles === 6 ? 'text-indigo-600 dark:text-indigo-400' : 'text-text'}`}>
                    {t}
                  </p>
                  <p className="text-xs text-muted mt-2">{hours} Hours</p>
                  {(cycles === 5 || cycles === 6) && (
                    <span className="inline-block mt-3 text-[10px] uppercase tracking-wider font-bold bg-indigo-500 text-white px-2 py-0.5 rounded-full">Suggested</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
