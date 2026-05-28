'use client';

import { useState, useEffect } from 'react';
import { performMinification, type MinifyResult } from './utils';
import { Copy, Check, Download, Zap, Trash2 } from 'lucide-react';
import ResetButton from '@/components/ui/ResetButton';

export default function CodeMinifier() {
  const [lang, setLang] = useState<'html' | 'css' | 'js'>('css');
  const [input, setInput] = useState(`/* Premium Sample CSS Stylesheet */
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background-color: #f3f4f6;
  color: #111827;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e5e7eb;
}

/* Hover effects */
.btn-primary:hover {
  background-color: #4f46e5;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}`);

  const [result, setResult] = useState<MinifyResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleMinify = () => {
    const res = performMinification(input, lang);
    setResult(res);
  };

  useEffect(() => {
    handleMinify();
  }, [input, lang]);

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadFile = () => {
    if (!result) return;
    const blob = new Blob([result.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `minified-${Date.now()}.${lang}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInput('');
    setResult(null);
  };

  const getFormatName = (type: typeof lang) => {
    if (type === 'html') return 'HTML';
    if (type === 'css') return 'CSS';
    return 'JavaScript';
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + (sizes[i] || 'Bytes');
  };

  return (
    <div className="space-y-6">
      {/* Code Type Navigation Header */}
      <div className="flex flex-wrap gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl w-fit border border-gray-200/50 dark:border-gray-700/50">
        {(['css', 'html', 'js'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setLang(type)}
            className={`px-5 py-2 text-sm font-bold rounded-xl transition-all duration-200 ${lang === type ? 'bg-white dark:bg-gray-900 text-violet-600 dark:text-violet-400 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
          >
            {getFormatName(type)}
          </button>
        ))}
      </div>

      {/* Editor Space */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Box */}
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 space-y-4 shadow-sm flex flex-col">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Source Code ({getFormatName(lang)})
            </span>
            <button
              onClick={handleReset}
              className="text-xs font-bold text-red-500 hover:text-red-700 transition"
            >
              Clear
            </button>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Paste raw ${getFormatName(lang)} code here...`}
            className="w-full h-80 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-mono text-sm leading-relaxed focus:ring-2 focus:ring-violet-500 outline-none transition resize-none flex-1"
          />
        </div>

        {/* Compression Output Box */}
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 space-y-4 shadow-sm flex flex-col">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Compressed Output
            </span>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                disabled={!result?.code}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition disabled:opacity-50"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy Result'}
              </button>
              <button
                onClick={downloadFile}
                disabled={!result?.code}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white text-xs font-bold transition disabled:opacity-50"
              >
                <Download size={14} /> Download
              </button>
            </div>
          </div>

          <div className="w-full h-80 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-805 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-mono text-sm leading-relaxed overflow-auto flex-1 select-all">
            {result?.code ? (
              <pre className="whitespace-pre-wrap">{result.code}</pre>
            ) : (
              <span className="text-gray-400 italic">Compressed output will compile automatically...</span>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Size Metrics Panel */}
      {result && result.originalSize > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 rounded-3xl border border-violet-100 dark:border-violet-900/50">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Original Size</span>
            <p className="text-lg font-bold text-gray-800 dark:text-gray-200 font-mono">
              {formatBytes(result.originalSize)}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Compressed Size</span>
            <p className="text-lg font-bold text-violet-600 dark:text-violet-400 font-mono">
              {formatBytes(result.minifiedSize)}
            </p>
          </div>
          <div className="space-y-1 flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Efficiency Boost</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Zap size={16} className="text-amber-500 fill-amber-500 animate-pulse" />
              <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                {result.savingsPercent}% Space Saved
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
