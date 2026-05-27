'use client';

import { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import { convertCase, CASE_OPTIONS, type CaseType } from './utils';

export default function CaseConverter() {
  const [input, setInput] = useState('');
  const [active, setActive] = useState<CaseType>('title');
  const [copied, setCopied] = useState<CaseType | null>(null);

  function copy(key: CaseType, val: string) {
    navigator.clipboard.writeText(val).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  const stats = {
    chars: input.length,
    words: input.trim() ? input.trim().split(/\s+/).length : 0,
    lines: input ? input.split('\n').length : 0,
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Your Text</label>
          <div className="flex gap-4 text-xs text-gray-400">
            <span>{stats.chars} chars</span>
            <span>{stats.words} words</span>
            <span>{stats.lines} lines</span>
          </div>
        </div>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type or paste your text here…"
          rows={5}
          className="w-full rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none resize-none transition"
        />
        {input && (
          <button onClick={() => setInput('')} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition">
            <RotateCcw size={12} /> Clear
          </button>
        )}
      </div>

      {/* Case Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CASE_OPTIONS.map(opt => {
          const result = convertCase(input || opt.example, opt.key);
          const isActive = active === opt.key;
          const isCopied = copied === opt.key;

          return (
            <div key={opt.key}
              onClick={() => setActive(opt.key)}
              className={`group relative rounded-2xl border p-4 cursor-pointer transition-all ${
                isActive
                  ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20 shadow-lg shadow-sky-500/10'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-sky-300 hover:shadow-md'
              }`}>
              <div className="flex items-start justify-between mb-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-sky-600' : 'text-gray-400'}`}>
                  {opt.label}
                </span>
                <button
                  onClick={e => { e.stopPropagation(); copy(opt.key, result); }}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-900/40 text-gray-400 hover:text-sky-600 transition-all">
                  {isCopied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                </button>
              </div>
              <p className={`text-sm font-mono break-all leading-relaxed ${input ? 'text-gray-900 dark:text-white' : 'text-gray-400 italic'}`}>
                {result}
              </p>
            </div>
          );
        })}
      </div>

      {/* Big output for active case */}
      {input && (
        <div className="rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 p-5 text-white shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold opacity-80 uppercase tracking-wider">
              {CASE_OPTIONS.find(o => o.key === active)?.label}
            </span>
            <button onClick={() => copy(active, convertCase(input, active))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-semibold transition">
              {copied === active ? <Check size={12} /> : <Copy size={12} />}
              {copied === active ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="font-mono text-sm break-all leading-relaxed">{convertCase(input, active)}</p>
        </div>
      )}
    </div>
  );
}
