'use client';

import { useState, useEffect, useCallback } from 'react';
import { generateBulk, formatUuidList, type GeneratorOptions } from './utils';
import { Copy, Check, RefreshCw, Download, Sparkles } from 'lucide-react';

export default function UuidGenerator() {
  const [version, setVersion] = useState<'v4' | 'v1' | 'v7'>('v7');
  const [count, setCount] = useState<number>(10);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [braces, setBraces] = useState<boolean>(false);
  const [separator, setSeparator] = useState<GeneratorOptions['separator']>('newline');

  const [uuidList, setUuidList] = useState<string[]>([]);
  const [formattedText, setFormattedText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  const handleGenerate = useCallback(() => {
    setIsRotating(true);
    const list = generateBulk({
      version,
      count,
      uppercase,
      hyphens,
      braces,
      separator,
    });
    setUuidList(list);
    setFormattedText(formatUuidList(list, separator));
    setTimeout(() => setIsRotating(false), 500);
  }, [version, count, uppercase, hyphens, braces, separator]);

  // Generate on initial render or state changes
  useEffect(() => {
    handleGenerate();
  }, [version, count, uppercase, hyphens, braces, separator]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadTxt = () => {
    const blob = new Blob([formattedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `uuids-${version}-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: Parameters Form */}
        <div className="lg:col-span-1 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 space-y-5 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
            <Sparkles size={18} className="text-indigo-500" />
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">Generation Options</h3>
          </div>

          {/* Version Selection */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">UUID Version</label>
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value as 'v4' | 'v1' | 'v7')}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="v7">v7 (Unix Epoch Sortable) ⭐ Recommended</option>
              <option value="v4">v4 (Cryptographically Random)</option>
              <option value="v1">v1 (Time & Gregorian Epoch based)</option>
            </select>
            <p className="text-[10px] text-gray-400 leading-normal">
              {version === 'v7' && 'UUID v7 is modern, sequential, and highly index-friendly, making it ideal for high-performance databases.'}
              {version === 'v4' && 'UUID v4 relies on 122 bits of high-entropy randomness, providing virtual safety from collision.'}
              {version === 'v1' && 'UUID v1 maps timestamps chronologically and was historically standard for cluster environments.'}
            </p>
          </div>

          {/* Number of IDs */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-400">
              <span>Quantity</span>
              <span className="text-indigo-500 font-mono text-sm">{count}</span>
            </div>
            <input
              type="range"
              min="1"
              max="250"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
            <div className="flex gap-2">
              {[1, 5, 10, 50, 100].map((num) => (
                <button
                  key={num}
                  onClick={() => setCount(num)}
                  className={`flex-1 py-1 text-xs font-semibold rounded-lg transition ${count === num ? 'bg-indigo-500 text-white shadow-sm' : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100'}`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Separator / Formatting */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Delimiter</label>
            <select
              value={separator}
              onChange={(e) => setSeparator(e.target.value as GeneratorOptions['separator'])}
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="newline">New Line (\n)</option>
              <option value="comma">Comma (, )</option>
              <option value="semicolon">Semicolon (; )</option>
              <option value="space">Space ( )</option>
              <option value="array">Code Array (JS/Python)</option>
              <option value="json">JSON Array</option>
            </select>
          </div>

          {/* Toggle Checklist */}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-3">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="accent-indigo-500 w-4 h-4 rounded"
              />
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Uppercase Casing</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hyphens}
                onChange={(e) => setHyphens(e.target.checked)}
                className="accent-indigo-500 w-4 h-4 rounded"
              />
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Show Hyphens</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={braces}
                onChange={(e) => setBraces(e.target.checked)}
                className="accent-indigo-500 w-4 h-4 rounded"
              />
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Curly Braces {'{...}'}</span>
            </label>
          </div>
        </div>

        {/* Right Side: Visual Output Area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 space-y-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Generated Identifiers</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  {copied ? 'Copied All!' : 'Copy All'}
                </button>
                <button
                  onClick={downloadTxt}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold transition"
                >
                  <Download size={14} /> Download (.txt)
                </button>
              </div>
            </div>

            {/* Display Screen */}
            <div className="w-full h-80 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-850 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-mono text-sm leading-relaxed overflow-auto">
              <pre className="whitespace-pre-wrap">{formattedText}</pre>
            </div>

            {/* Floating Action Trigger */}
            <div className="pt-2 flex justify-between items-center text-xs text-gray-400">
              <span>Generated in &lt;1ms</span>
              <button
                onClick={handleGenerate}
                className="flex items-center gap-1.5 font-bold text-indigo-500 hover:text-indigo-600 transition"
              >
                <RefreshCw size={13} className={isRotating ? 'animate-spin' : ''} />
                Regenerate List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
