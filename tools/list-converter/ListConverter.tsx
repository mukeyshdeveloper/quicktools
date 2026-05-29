'use client';

import { useState, useEffect } from 'react';
import { convertList, type ConverterOptions } from './utils';
import { Copy, Check, Trash2, ArrowRightLeft } from 'lucide-react';

export default function ListConverter() {
  const [input, setInput] = useState(`apple
banana
cherry
date
elderberry`);

  const [mode, setMode] = useState<'to-delimited' | 'to-list'>('to-delimited');

  const [options, setOptions] = useState<ConverterOptions>({
    delimiter: 'comma',
    customDelimiter: ',',
    quoteStyle: 'none',
    addSpaceAfterDelimiter: true,
    trimItems: true,
    removeEmpty: true,
    removeDuplicates: false,
  });

  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOutput(convertList(input, mode, options));
  }, [input, mode, options]);

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const clearInput = () => setInput('');

  const Toggle = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (c: boolean) => void }) => (
    <label className="flex items-center gap-2 cursor-pointer select-none group">
      <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${checked ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-gray-300 dark:border-gray-600 group-hover:border-indigo-400'}`}>
        {checked && <Check size={12} strokeWidth={3} />}
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  );

  return (
    <div className="space-y-6">
      
      {/* Control Panel */}
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4 border-b border-gray-100 dark:border-gray-800 pb-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Conversion Mode</h3>
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
              <button
                onClick={() => setMode('to-delimited')}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition ${mode === 'to-delimited' ? 'bg-white dark:bg-gray-900 text-indigo-600 shadow-sm' : 'text-gray-500'}`}
              >
                Column → Delimited
              </button>
              <button
                onClick={() => setMode('to-list')}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition ${mode === 'to-list' ? 'bg-white dark:bg-gray-900 text-indigo-600 shadow-sm' : 'text-gray-500'}`}
              >
                Delimited → Column
              </button>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Toggle label="Trim Whitespace" checked={options.trimItems} onChange={c => setOptions({...options, trimItems: c})} />
            <Toggle label="Remove Empty Items" checked={options.removeEmpty} onChange={c => setOptions({...options, removeEmpty: c})} />
            <Toggle label="Remove Duplicates" checked={options.removeDuplicates} onChange={c => setOptions({...options, removeDuplicates: c})} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Delimiter Target</label>
            <select
              value={options.delimiter}
              onChange={(e) => setOptions({...options, delimiter: e.target.value as ConverterOptions['delimiter']})}
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="comma">Comma (,)</option>
              <option value="semicolon">Semicolon (;)</option>
              <option value="pipe">Pipe (|)</option>
              <option value="space">Space ( )</option>
              <option value="newline">New Line</option>
              <option value="custom">Custom...</option>
            </select>
          </div>

          {options.delimiter === 'custom' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Custom Delimiter</label>
              <input
                type="text"
                value={options.customDelimiter}
                onChange={(e) => setOptions({...options, customDelimiter: e.target.value})}
                placeholder="e.g. =>"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Add Quotes</label>
            <select
              value={options.quoteStyle}
              onChange={(e) => setOptions({...options, quoteStyle: e.target.value as ConverterOptions['quoteStyle']})}
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="none">None</option>
              <option value="single">Single Quotes ('x')</option>
              <option value="double">Double Quotes ("x")</option>
              <option value="bracket">Brackets ([x])</option>
            </select>
          </div>
          
          {(options.delimiter !== 'space' && options.delimiter !== 'newline') && mode === 'to-delimited' && (
            <div className="space-y-2 flex flex-col justify-center pt-6">
               <Toggle label="Add space after delimiter" checked={options.addSpaceAfterDelimiter} onChange={c => setOptions({...options, addSpaceAfterDelimiter: c})} />
            </div>
          )}
        </div>
      </div>

      {/* Editor Space */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Source Text */}
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col shadow-sm min-h-[400px]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Input {mode === 'to-delimited' ? 'List/Column' : 'Delimited String'}
            </span>
            <button onClick={clearInput} className="text-xs font-bold text-red-500 hover:text-red-700 transition flex items-center gap-1">
              <Trash2 size={12} /> Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'to-delimited' ? 'Paste column data here...' : 'Paste comma/pipe separated data here...'}
            className="w-full flex-1 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-mono text-sm leading-relaxed focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
          />
        </div>

        {/* Output Text */}
        <div className="bg-indigo-50/50 dark:bg-indigo-900/10 backdrop-blur-xl rounded-3xl border border-indigo-200/50 dark:border-indigo-800/30 p-6 flex flex-col shadow-sm min-h-[400px]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Output {mode === 'to-delimited' ? 'Delimited String' : 'List/Column'}
            </span>
            <button
              onClick={copyOutput}
              disabled={!output}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold transition disabled:opacity-50"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy Result'}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Result will appear here..."
            className="w-full flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-gray-900/80 border border-indigo-100 dark:border-indigo-800/50 text-gray-900 dark:text-white font-mono text-sm leading-relaxed outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
}
