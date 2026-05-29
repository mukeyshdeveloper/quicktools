'use client';

import { useState, useEffect } from 'react';
import { generateSlug, type SlugOptions } from './utils';
import { Copy, Check, Trash2, ArrowRight } from 'lucide-react';

export default function SlugConverter() {
  const [input, setInput] = useState('10 Best Developer Tools for 2026!');
  const [options, setOptions] = useState<SlugOptions>({
    separator: '-',
    preserveCase: false,
    removeNumbers: false,
  });

  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOutput(generateSlug(input, options));
  }, [input, options]);

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
      <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${checked ? 'bg-sky-500 border-sky-500 text-white' : 'border-gray-300 dark:border-gray-600 group-hover:border-sky-400'}`}>
        {checked && <Check size={12} strokeWidth={3} />}
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
    </label>
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Control Panel */}
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Slug Options</h3>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Separator</label>
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
              <button
                onClick={() => setOptions({...options, separator: '-'})}
                className={`px-4 py-1.5 text-sm font-bold rounded-lg transition ${options.separator === '-' ? 'bg-white dark:bg-gray-900 text-sky-600 shadow-sm' : 'text-gray-500'}`}
              >
                Hyphen (-)
              </button>
              <button
                onClick={() => setOptions({...options, separator: '_'})}
                className={`px-4 py-1.5 text-sm font-bold rounded-lg transition ${options.separator === '_' ? 'bg-white dark:bg-gray-900 text-sky-600 shadow-sm' : 'text-gray-500'}`}
              >
                Underscore (_)
              </button>
            </div>
          </div>
          
          <div className="flex flex-col justify-center gap-3 sm:pt-6">
            <Toggle label="Preserve Casing (Don't lowercase)" checked={options.preserveCase} onChange={c => setOptions({...options, preserveCase: c})} />
            <Toggle label="Remove Numbers" checked={options.removeNumbers} onChange={c => setOptions({...options, removeNumbers: c})} />
          </div>
        </div>
      </div>

      {/* Editor Space */}
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Title String</span>
          <button onClick={clearInput} className="text-xs font-bold text-red-500 hover:text-red-700 transition flex items-center gap-1">
            <Trash2 size={12} /> Clear
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your title or string here..."
          className="w-full h-24 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-sans text-sm leading-relaxed focus:ring-2 focus:ring-sky-500 outline-none transition resize-none"
        />

        <div className="flex justify-center my-4 opacity-50">
          <ArrowRight className="rotate-90 sm:rotate-0 text-gray-400" />
        </div>

        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">Generated URL Slug</span>
          <button
            onClick={copyOutput}
            disabled={!output}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition disabled:opacity-50"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <textarea
          readOnly
          value={output}
          placeholder="your-url-slug-will-appear-here"
          className="w-full h-24 px-4 py-3 rounded-2xl bg-sky-50 dark:bg-gray-900/80 border border-sky-100 dark:border-sky-800/50 text-sky-900 dark:text-sky-100 font-mono text-lg font-bold leading-relaxed outline-none resize-none"
        />
      </div>
    </div>
  );
}
