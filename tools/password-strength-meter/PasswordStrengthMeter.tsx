'use client';

import { useState, useEffect } from 'react';
import { calculatePasswordStrength, type PasswordStrength } from './utils';
import { ShieldCheck, ShieldAlert, KeyRound } from 'lucide-react';

export default function PasswordStrengthMeter() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<PasswordStrength | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (password.length > 0) {
      setResult(calculatePasswordStrength(password));
    } else {
      setResult(null);
    }
  }, [password]);

  const getScoreColor = (score: number) => {
    switch (score) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-orange-500';
      case 2: return 'bg-amber-500';
      case 3: return 'bg-emerald-500';
      case 4: return 'bg-brand';
      default: return 'bg-gray-200';
    }
  };

  const getScoreLabel = (score: number) => {
    switch (score) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Strong';
      case 4: return 'Excellent';
      default: return '';
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        <div className="space-y-2 relative">
          <label className="text-sm font-bold uppercase tracking-widest text-muted block text-center mb-4">Type a password to test</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
              <KeyRound size={20} />
            </span>
            <input 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="tool-input !pl-12 !pr-20 !py-4 !text-xl text-center tracking-wider font-mono" 
              placeholder="Your password..."
            />
            <button 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted hover:text-text transition uppercase"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {result ? (
          <div className="space-y-6 pt-4">
            
            {/* Meter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-muted">Strength</span>
                <span className={getScoreColor(result.score).replace('bg-', 'text-')}>{getScoreLabel(result.score)}</span>
              </div>
              <div className="h-3 w-full bg-border rounded-full overflow-hidden flex gap-1">
                {[0, 1, 2, 3, 4].map(level => (
                  <div 
                    key={level} 
                    className={`h-full flex-1 transition-all duration-300 ${level <= result.score ? getScoreColor(result.score) : 'bg-transparent'}`} 
                  />
                ))}
              </div>
            </div>

            {/* Crack Time */}
            <div className={`rounded-2xl p-6 text-center border-2 ${result.score >= 3 ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'}`}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Estimated Time to Crack</p>
              <p className="text-4xl font-black">{result.crackTime}</p>
            </div>

            {/* Stats & Feedback */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-background border border-border rounded-xl p-4 text-center">
                <p className="text-xs text-muted font-bold uppercase">Entropy</p>
                <p className="text-2xl font-black mt-1">{result.entropy} <span className="text-sm font-bold text-muted">bits</span></p>
              </div>
              <div className="bg-background border border-border rounded-xl p-4 text-center">
                <p className="text-xs text-muted font-bold uppercase">Length</p>
                <p className="text-2xl font-black mt-1">{password.length} <span className="text-sm font-bold text-muted">chars</span></p>
              </div>
            </div>

            {result.feedback.warning && (
              <div className="flex items-start gap-3 text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-xl text-sm font-medium">
                <ShieldAlert size={20} className="shrink-0" />
                <p>{result.feedback.warning}</p>
              </div>
            )}

            {result.feedback.suggestions.length > 0 && (
              <div className="space-y-2 text-sm text-muted">
                <p className="font-bold text-text">Suggestions to improve:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {result.feedback.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}

            {result.score >= 3 && result.feedback.suggestions.length === 0 && (
              <div className="flex items-center gap-3 text-emerald-600 font-bold justify-center pt-4">
                <ShieldCheck size={24} />
                <p>Your password is extremely secure!</p>
              </div>
            )}

          </div>
        ) : (
           <div className="py-8 text-center text-muted flex flex-col items-center gap-3">
             <ShieldCheck size={48} className="opacity-20" />
             <p className="text-sm">Start typing a password to see its strength.<br/>Everything happens instantly in your browser.</p>
           </div>
        )}

      </div>
    </div>
  );
}
