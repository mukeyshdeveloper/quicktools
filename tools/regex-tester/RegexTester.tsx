'use client';

import { useState, useMemo } from 'react';
import { testRegex } from './utils';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegexTester() {
  const [pattern, setPattern] = useState('[A-Z]\\\\w+');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('Welcome to QuickUtils! This Regex Tester highlights Matches in Real-Time. 12345');

  const result = useMemo(() => testRegex(pattern, flags, text), [pattern, flags, text]);

  const inpClass = "w-full rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 transition";

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Regular Expression</label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-gray-400 font-mono text-lg font-light">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className={`${inpClass} pl-8 rounded-r-none border-r-0`}
              placeholder="Enter regex pattern..."
              spellCheck={false}
            />
            <span className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 border-l-0 py-3 text-gray-400 font-mono text-lg font-light">/</span>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className={`${inpClass} rounded-l-none pl-1 max-w-[80px]`}
              placeholder="g, i, m"
              spellCheck={false}
            />
          </div>
          {!result.isValid && (
            <p className="flex items-center gap-1.5 text-sm text-red-500 font-semibold mt-2">
              <AlertCircle size={16} /> {result.error}
            </p>
          )}
        </div>
        
        <div className="md:col-span-1 space-y-2 flex flex-col justify-end">
             <div className="flex flex-wrap gap-2 mb-1">
               <button onClick={() => setFlags(f => f.includes('g') ? f.replace('g', '') : f + 'g')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${flags.includes('g') ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-800'}`}>g (global)</button>
               <button onClick={() => setFlags(f => f.includes('i') ? f.replace('i', '') : f + 'i')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${flags.includes('i') ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-800'}`}>i (ignore case)</button>
             </div>
        </div>
      </div>

      {/* Test String */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Test String</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`${inpClass} resize-y leading-relaxed`}
          rows={5}
          placeholder="Enter text to test your regex against..."
          spellCheck={false}
        />
      </div>

      {/* Live Preview */}
      <div className="space-y-2">
        <div className="flex justify-between items-end">
           <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Match Result</label>
           {result.isValid && (
             <span className="flex items-center gap-1.5 text-sm font-semibold text-green-600 dark:text-green-400">
                <CheckCircle2 size={16} /> {result.matches.length} match{result.matches.length === 1 ? '' : 'es'} found
             </span>
           )}
        </div>
        <div 
          className="w-full min-h-[120px] rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 font-mono text-sm text-gray-800 dark:text-gray-300 leading-relaxed whitespace-pre-wrap shadow-inner"
          dangerouslySetInnerHTML={{ __html: result.isValid ? result.highlightedHtml : text }}
        />
      </div>

      {/* Match Details */}
      {result.isValid && result.matches.length > 0 && (
         <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Match Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
               {result.matches.slice(0, 50).map((m, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700">
                     <div className="text-xs font-bold text-violet-500 mb-1">Match {i + 1} <span className="text-gray-400 font-normal">at index {m.index}</span></div>
                     <div className="font-mono text-sm text-gray-900 dark:text-white break-all">{m.match}</div>
                     {m.groups.length > 0 && m.groups.some(g => g !== undefined) && (
                        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                           {m.groups.map((g, gi) => g !== undefined ? (
                              <div key={gi} className="text-xs mt-1"><span className="text-gray-400">Group {gi + 1}:</span> <span className="font-mono text-gray-700 dark:text-gray-300 break-all">{g}</span></div>
                           ) : null)}
                        </div>
                     )}
                  </div>
               ))}
            </div>
            {result.matches.length > 50 && (
               <p className="text-sm text-gray-500 text-center italic mt-4">Showing first 50 matches.</p>
            )}
         </div>
      )}
    </div>
  );
}
