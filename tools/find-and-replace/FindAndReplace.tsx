'use client';

import { useState, useEffect } from 'react';
import { performFindReplace, type FindReplaceOptions, type FindReplaceResult } from './utils';
import { Copy, Check, Trash2, ArrowRightLeft, AlertCircle } from 'lucide-react';
import ResetButton from '@/components/ui/ResetButton';

export default function FindAndReplace() {
  const [input, setInput] = useState(`The quick brown fox jumps over the lazy dog.
The dog barks at the fox.
A fast Fox is hard to catch.`);

  const [options, setOptions] = useState<FindReplaceOptions>({
    findText: 'fox',
    replaceText: 'cat',
    matchCase: false,
    wholeWord: false,
    useRegex: false,
  });

  const [result, setResult] = useState<FindReplaceResult>({
    output: '',
    matchCount: 0,
    error: null,
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setResult(performFindReplace(input, options));
  }, [input, options]);

  const copyOutput = () => {
    if (!result.output) return;
    navigator.clipboard.writeText(result.output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const clearInput = () => setInput('');

  const Toggle = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (c: boolean) => void }) => (
    <label className="flex items-center gap-2 cursor-pointer select-none group">
      <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${checked ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300 dark:border-gray-600 group-hover:border-blue-400'}`}>
        {checked && <Check size={12} strokeWidth={3} />}
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  );

  return (
    <div className="space-y-6">
      
      {/* Control Panel */}
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Find & Replace Rules</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Find {options.useRegex ? '(Regex Pattern)' : 'Text'}</label>
            <input
              type="text"
              value={options.findText}
              onChange={(e) => setOptions({...options, findText: e.target.value})}
              placeholder={options.useRegex ? "e.g. ^[a-z]+" : "Text to search..."}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition font-mono"
            />
            {result.error && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle size={12} /> {result.error}</p>
            )}
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Replace With</label>
            <input
              type="text"
              value={options.replaceText}
              onChange={(e) => setOptions({...options, replaceText: e.target.value})}
              placeholder="Replacement text..."
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition font-mono"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <Toggle label="Match Case" checked={options.matchCase} onChange={c => setOptions({...options, matchCase: c})} />
          <Toggle label="Whole Word" checked={options.wholeWord} onChange={c => setOptions({...options, wholeWord: c})} />
          <Toggle label="Use Regular Expression" checked={options.useRegex} onChange={c => setOptions({...options, useRegex: c})} />
        </div>
      </div>

      {/* Editor Space */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Source Text */}
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col shadow-sm h-[500px]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Original Text</span>
            <button onClick={clearInput} className="text-xs font-bold text-red-500 hover:text-red-700 transition flex items-center gap-1">
              <Trash2 size={12} /> Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your source text here..."
            className="w-full flex-1 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-mono text-sm leading-relaxed focus:ring-2 focus:ring-blue-500 outline-none transition resize-none whitespace-pre-wrap"
          />
        </div>

        {/* Output Text */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 backdrop-blur-xl rounded-3xl border border-blue-200/50 dark:border-blue-800/30 p-6 flex flex-col shadow-sm h-[500px]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-500">Output Text</span>
            <button
              onClick={copyOutput}
              disabled={!result.output}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold transition disabled:opacity-50"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            readOnly
            value={result.output}
            placeholder="Result will appear here..."
            className="w-full flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-gray-900/80 border border-blue-100 dark:border-blue-800/50 text-gray-900 dark:text-white font-mono text-sm leading-relaxed outline-none resize-none whitespace-pre-wrap"
          />
          
          {/* Stats Bar */}
          {!result.error && result.matchCount > 0 && (
             <div className="mt-4 pt-4 border-t border-blue-200/50 dark:border-blue-800/50 flex justify-between items-center text-sm font-medium text-blue-700 dark:text-blue-400">
               <span>Find & Replace Complete</span>
               <span className="flex items-center gap-1.5">
                 <ArrowRightLeft size={16} /> Replaced {result.matchCount} occurences
               </span>
             </div>
          )}
          {!result.error && result.matchCount === 0 && options.findText && (
             <div className="mt-4 pt-4 border-t border-blue-200/50 dark:border-blue-800/50 flex justify-between items-center text-sm font-medium text-gray-500">
               <span>No matches found.</span>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
