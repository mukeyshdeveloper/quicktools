'use client';

import { useState, useEffect } from 'react';
import { processTextList, type ProcessOptions, type ProcessResult } from './utils';
import { Copy, Check, Trash2, ArrowRightLeft } from 'lucide-react';
import ResetButton from '@/components/ui/ResetButton';

export default function DuplicateRemover() {
  const [input, setInput] = useState(`apple
Banana
apple
orange
banana
grapes
  
  apple  
kiwi`);

  const [options, setOptions] = useState<ProcessOptions>({
    removeDuplicates: true,
    caseSensitive: false,
    removeEmpty: true,
    trimLines: true,
    sortType: 'a-z',
  });

  const [result, setResult] = useState<ProcessResult>({
    output: '',
    originalCount: 0,
    newCount: 0,
    removedCount: 0,
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setResult(processTextList(input, options));
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
      <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${checked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300 dark:border-gray-600 group-hover:border-emerald-400'}`}>
        {checked && <Check size={12} strokeWidth={3} />}
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  );

  return (
    <div className="space-y-6">
      
      {/* Control Panel */}
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">List Processing Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Toggle label="Remove Duplicates" checked={options.removeDuplicates} onChange={c => setOptions({...options, removeDuplicates: c})} />
            <Toggle label="Case Sensitive matching" checked={options.caseSensitive} onChange={c => setOptions({...options, caseSensitive: c})} />
            <Toggle label="Trim Whitespace from ends" checked={options.trimLines} onChange={c => setOptions({...options, trimLines: c})} />
            <Toggle label="Remove Empty Lines" checked={options.removeEmpty} onChange={c => setOptions({...options, removeEmpty: c})} />
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort Order</label>
            <select
              value={options.sortType}
              onChange={(e) => setOptions({...options, sortType: e.target.value as ProcessOptions['sortType']})}
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500 transition"
            >
              <option value="none">Original Order (No Sorting)</option>
              <option value="a-z">Alphabetical (A to Z)</option>
              <option value="z-a">Reverse Alphabetical (Z to A)</option>
              <option value="length-asc">By Length (Shortest first)</option>
              <option value="length-desc">By Length (Longest first)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Editor Space */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Source Text */}
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col shadow-sm h-[500px]">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Original List</span>
              <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-500">{result.originalCount} lines</span>
            </div>
            <button onClick={clearInput} className="text-xs font-bold text-red-500 hover:text-red-700 transition flex items-center gap-1">
              <Trash2 size={12} /> Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your list here (one item per line)..."
            className="w-full flex-1 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-mono text-sm leading-relaxed focus:ring-2 focus:ring-emerald-500 outline-none transition resize-none whitespace-pre"
          />
        </div>

        {/* Output Text */}
        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 backdrop-blur-xl rounded-3xl border border-emerald-200/50 dark:border-emerald-800/30 p-6 flex flex-col shadow-sm h-[500px]">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500">Processed Output</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">{result.newCount} lines</span>
            </div>
            <button
              onClick={copyOutput}
              disabled={!result.output}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition disabled:opacity-50"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            readOnly
            value={result.output}
            placeholder="Processed list will appear here..."
            className="w-full flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-gray-900/80 border border-emerald-100 dark:border-emerald-800/50 text-gray-900 dark:text-white font-mono text-sm leading-relaxed outline-none resize-none whitespace-pre"
          />
          
          {/* Stats Bar */}
          {result.removedCount > 0 && (
             <div className="mt-4 pt-4 border-t border-emerald-200/50 dark:border-emerald-800/50 flex justify-between items-center text-sm font-medium text-emerald-700 dark:text-emerald-400">
               <span>Success! Cleaned up list.</span>
               <span className="flex items-center gap-1.5">
                 <ArrowRightLeft size={16} /> Removed {result.removedCount} lines
               </span>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
