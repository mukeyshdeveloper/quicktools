'use client';

import { useState, useRef } from 'react';
import { ArrowRightLeft, Copy, Check, Upload, RotateCcw, Lock, Unlock } from 'lucide-react';
import { encodeBase64, decodeBase64, encodeBase64Url, fileToBase64 } from './utils';

type Mode = 'encode' | 'decode';
type Variant = 'standard' | 'url-safe';

const ta = 'w-full rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 text-sm font-mono text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none resize-none transition min-h-[160px]';

export default function Base64EncoderDecoder() {
  const [mode, setMode] = useState<Mode>('encode');
  const [variant, setVariant] = useState<Variant>('standard');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function process(text: string, m: Mode = mode, v: Variant = variant) {
    setInput(text);
    setError(null);
    if (!text.trim()) { setOutput(''); return; }

    if (m === 'encode') {
      setOutput(v === 'url-safe' ? encodeBase64Url(text) : encodeBase64(text));
    } else {
      const { result, error: err } = decodeBase64(text);
      if (err) { setError(err); setOutput(''); }
      else setOutput(result);
    }
  }

  function swap() {
    const newMode: Mode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    setInput(output);
    process(output, newMode, variant);
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const b64 = await fileToBase64(file);
    setMode('encode');
    setInput(`[File: ${file.name}]`);
    setOutput(variant === 'url-safe' ? b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') : b64);
    setError(null);
  }

  function copy() {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function reset() { setInput(''); setOutput(''); setError(null); }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Mode toggle */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          {(['encode', 'decode'] as Mode[]).map(m => (
            <button key={m} onClick={() => { setMode(m); process(input, m, variant); }}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold transition ${mode === m ? 'bg-cyan-600 text-white shadow' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              {m === 'encode' ? <Lock size={14} /> : <Unlock size={14} />}
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
        {/* Variant toggle */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          {(['standard', 'url-safe'] as Variant[]).map(v => (
            <button key={v} onClick={() => { setVariant(v); process(input, mode, v); }}
              className={`px-4 py-2 text-sm font-semibold transition ${variant === v ? 'bg-cyan-600 text-white shadow' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              {v === 'standard' ? 'Standard' : 'URL-Safe'}
            </button>
          ))}
        </div>
        <button onClick={() => fileRef.current?.click()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition">
          <Upload size={14} /> Encode File
        </button>
        <input ref={fileRef} type="file" className="hidden" onChange={handleFile} />
        {(input || output) && (
          <button onClick={reset} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-gray-400 hover:text-gray-600 transition">
            <RotateCcw size={14} /> Reset
          </button>
        )}
      </div>

      {/* Input / Output */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
            {mode === 'encode' ? 'Plain Text Input' : 'Base64 Input'}
          </label>
          <textarea value={input} onChange={e => process(e.target.value)}
            placeholder={mode === 'encode' ? 'Type or paste text to encode…' : 'Paste Base64 string to decode…'}
            className={ta} rows={8} />
          <p className="text-xs text-gray-400">{input.length} characters</p>
        </div>

        <div className="flex md:flex-col items-center justify-center gap-2 py-4">
          <button onClick={swap} title="Swap"
            className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 hover:bg-cyan-200 transition hover:scale-110 active:scale-95">
            <ArrowRightLeft size={18} />
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
            {mode === 'encode' ? 'Base64 Output' : 'Decoded Output'}
          </label>
          <div className="relative">
            <textarea readOnly value={output}
              placeholder="Output appears here…"
              className={`${ta} pr-12 bg-gray-100 dark:bg-gray-900`} rows={8} />
            {output && (
              <button onClick={copy}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-cyan-600 transition">
                {copied ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
              </button>
            )}
          </div>
          {error && <p className="text-xs text-red-500 font-medium" role="alert">{error}</p>}
          {output && <p className="text-xs text-gray-400">{output.length} characters</p>}
        </div>
      </div>
    </div>
  );
}
