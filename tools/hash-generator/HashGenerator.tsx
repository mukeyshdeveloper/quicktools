'use client';

import { useState } from 'react';
import { generateHash, SUPPORTED_ALGORITHMS, type HashAlgorithm } from './utils';
import { Hash, Upload, Copy, FileText } from 'lucide-react';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [fileName, setFileName] = useState('');
  const [results, setResults] = useState<Record<string, string>>({});
  const [isHashing, setIsHashing] = useState(false);

  async function hashText() {
    if (!input) return;
    setIsHashing(true);
    const newResults: Record<string, string> = {};
    for (const algo of SUPPORTED_ALGORITHMS) {
      try {
        newResults[algo] = await generateHash(input, algo);
      } catch (e) {
        newResults[algo] = 'Error';
      }
    }
    setResults(newResults);
    setIsHashing(false);
  }

  async function hashFile(file: File) {
    setFileName(file.name);
    setInput('');
    setIsHashing(true);

    const buffer = await file.arrayBuffer();
    const newResults: Record<string, string> = {};
    for (const algo of SUPPORTED_ALGORITHMS) {
      try {
        newResults[algo] = await generateHash(buffer, algo);
      } catch (e) {
        newResults[algo] = 'Error';
      }
    }
    setResults(newResults);
    setIsHashing(false);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) hashFile(file);
  }

  function copyAll() {
    const text = Object.entries(results).map(([algo, hash]) => `${algo}: ${hash}`).join('\n');
    navigator.clipboard.writeText(text);
  }

  function clearAll() {
    setInput('');
    setFileName('');
    setResults({});
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Hash className="w-5 h-5 text-amber-600" />
          <span className="font-semibold">Input</span>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste text to hash..."
          className="tool-textarea min-h-[120px]"
          onKeyDown={e => { if (e.key === 'Enter' && e.ctrlKey) hashText(); }}
        />

        <div className="flex flex-wrap gap-3 mt-4">
          <button onClick={hashText} disabled={!input || isHashing} className="btn-primary flex items-center gap-2 px-6 disabled:opacity-50">
            <Hash className="w-4 h-4" /> Hash Text
          </button>

          <label className="btn-secondary flex items-center gap-2 cursor-pointer px-6">
            <Upload className="w-4 h-4" /> Hash File
            <input type="file" onChange={handleFile} className="hidden" />
          </label>

          {(input || fileName || Object.keys(results).length > 0) && (
            <button onClick={clearAll} className="btn-secondary px-4">Clear</button>
          )}
        </div>

        {fileName && <div className="mt-3 text-xs text-muted flex items-center gap-2"><FileText className="w-3.5 h-3.5" /> {fileName}</div>}
      </div>

      {Object.keys(results).length > 0 && (
        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Results</span>
            <button onClick={copyAll} className="btn-secondary text-xs flex items-center gap-1 px-3 py-1">
              <Copy className="w-3.5 h-3.5" /> Copy All
            </button>
          </div>

          <div className="space-y-3">
            {SUPPORTED_ALGORITHMS.map(algo => (
              <div key={algo} className="bg-background border border-border rounded-2xl p-4">
                <div className="text-xs font-bold text-muted mb-1">{algo}</div>
                <div className="font-mono text-sm break-all text-text">{results[algo] || '—'}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-center text-xs text-muted">All hashing happens locally in your browser using the Web Crypto API and a pure JS MD5 implementation.</p>
    </div>
  );
}
