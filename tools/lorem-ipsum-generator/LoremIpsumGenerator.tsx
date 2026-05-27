'use client';

import { useState, useCallback, useEffect } from 'react';
import { RefreshCw, Copy, Check } from 'lucide-react';
import { generateLorem, type LoremOptions } from './utils';

type LoremType = LoremOptions['type'];

export default function LoremIpsumGenerator() {
  const [type, setType] = useState<LoremType>('paragraphs');
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = useCallback((t: LoremType, c: number, s: boolean) => {
    setOutput(generateLorem({ type: t, count: c, startWithLorem: s }));
  }, []);

  useEffect(() => {
    generate('paragraphs', 3, true);
  }, [generate]);

  function handleType(t: LoremType) { setType(t); generate(t, count, startWithLorem); }
  function handleCount(c: number) { setCount(c); generate(type, c, startWithLorem); }
  function handleLorem(s: boolean) { setStartWithLorem(s); generate(type, count, s); }

  function copy() {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const maxCount = type === 'words' ? 500 : type === 'sentences' ? 20 : 10;
  const wordCount = output.trim().split(/\s+/).length;

  return (
    <div className="space-y-6">
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Generate by</label>
          <div className="flex gap-2 flex-wrap">
            {(['paragraphs', 'sentences', 'words'] as LoremType[]).map(t => (
              <button key={t} onClick={() => handleType(t)}
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition ${type === t ? 'bg-amber-500 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'}`}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Count: <span className="text-amber-500">{count}</span>
          </label>
          <input type="range" min={1} max={maxCount} value={count}
            onChange={e => handleCount(Number(e.target.value))}
            className="w-full accent-amber-500" />
          <div className="flex gap-2">
            {[1, 3, 5, 10].filter(n => n <= maxCount).map(n => (
              <button key={n} onClick={() => handleCount(n)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${count === n ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200'}`}>
                {n}
              </button>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div onClick={() => handleLorem(!startWithLorem)}
            className={`relative w-10 h-5 rounded-full transition-colors ${startWithLorem ? 'bg-amber-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${startWithLorem ? 'translate-x-5' : ''}`} />
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300">Start with &ldquo;Lorem ipsum…&rdquo;</span>
        </label>
      </div>

      <div className="flex gap-3">
        <button onClick={() => generate(type, count, startWithLorem)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-lg shadow-amber-500/30 transition hover:scale-105 active:scale-95">
          <RefreshCw size={15} /> Regenerate
        </button>
        <button onClick={copy}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold text-sm hover:bg-gray-200 transition">
          {copied ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
          {copied ? 'Copied!' : 'Copy All'}
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Output</label>
          <span className="text-xs text-gray-400">{wordCount} words · {output.length} chars</span>
        </div>
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap max-h-96 overflow-auto">
          {output}
        </div>
      </div>
    </div>
  );
}
