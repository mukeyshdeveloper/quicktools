'use client';

import { useState, useEffect } from 'react';
import { convertTimestamp, batchConvert, nowAsAll, type TimeResult } from './utils';
import { Clock, Copy, RefreshCw, List } from 'lucide-react';

export default function TimestampConverter() {
  const [input, setInput] = useState('');
  const [batchInput, setBatchInput] = useState('');
  const [singleResult, setSingleResult] = useState<TimeResult | null>(null);
  const [batchResults, setBatchResults] = useState<Array<{ input: string; result: TimeResult | null }>>([]);
  const [mode, setMode] = useState<'single' | 'batch'>('single');
  const [copied, setCopied] = useState('');

  // Live "now"
  const [nowResult, setNowResult] = useState<TimeResult | null>(null);

  useEffect(() => {
    const updateNow = () => setNowResult(nowAsAll());
    updateNow();
    const id = setInterval(updateNow, 1000);
    return () => clearInterval(id);
  }, []);

  function convertSingle() {
    const res = convertTimestamp(input);
    setSingleResult(res);
  }

  function convertBatch() {
    const lines = batchInput.split('\n').map(l => l.trim()).filter(Boolean);
    setBatchResults(batchConvert(lines));
  }

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 1200);
  }

  function useNow() {
    if (nowResult) {
      setInput(nowResult.unixMs.toString());
      setSingleResult(nowResult);
    }
  }

  function quickOffset(minutes: number) {
    const base = singleResult ? singleResult.unixMs : Date.now();
    const next = base + minutes * 60000;
    const val = next.toString();
    setInput(val);
    setSingleResult(convertTimestamp(val));
  }

  return (
    <div className="space-y-6">
      {/* Now */}
      {nowResult && (
        <div className="bg-card border border-border rounded-3xl p-4 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted"><Clock className="w-4 h-4" /> Current time</div>
          <div className="font-mono">{nowResult.iso} <span className="text-muted">({nowResult.unixSeconds}s)</span></div>
          <button onClick={useNow} className="btn-secondary text-xs">Use as input</button>
        </div>
      )}

      {/* Mode switch */}
      <div className="flex rounded-2xl border border-border w-fit mx-auto overflow-hidden">
        <button onClick={() => setMode('single')} className={`px-6 py-2 text-sm ${mode === 'single' ? 'bg-red-600 text-white' : ''}`}>Single</button>
        <button onClick={() => setMode('batch')} className={`px-6 py-2 text-sm ${mode === 'batch' ? 'bg-red-600 text-white' : ''}`}>Batch</button>
      </div>

      {mode === 'single' ? (
        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="flex gap-2 mb-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && convertSingle()} placeholder="Unix seconds/ms, ISO, or human..." className="tool-input flex-1" />
            <button onClick={convertSingle} className="btn-primary"><RefreshCw className="w-4 h-4" /></button>
          </div>
          <div className="flex gap-2 text-xs">
            <button onClick={useNow} className="btn-secondary px-2 py-0.5">Now</button>
            <button onClick={() => quickOffset(-60)} className="btn-secondary px-2 py-0.5">-1h</button>
            <button onClick={() => quickOffset(60)} className="btn-secondary px-2 py-0.5">+1h</button>
            <button onClick={() => quickOffset(-1440)} className="btn-secondary px-2 py-0.5">-1d</button>
            <span className="text-[10px] text-muted self-center ml-2">DST handled via Intl</span>
          </div>

          {singleResult && (
            <div className="space-y-3">
              {Object.entries({
                'Unix (seconds)': singleResult.unixSeconds,
                'Unix (ms)': singleResult.unixMs,
                'ISO 8601': singleResult.iso,
                'Human (local)': singleResult.human,
                'Relative': singleResult.relative,
              }).map(([label, val]) => (
                <div key={label} className="flex justify-between bg-background p-3 rounded-2xl border border-border text-sm">
                  <span className="text-muted">{label}</span>
                  <span className="font-mono break-all">{val} <button onClick={() => copy(String(val), label)} className="ml-1 text-muted hover:text-text"><Copy className="w-3.5 h-3.5 inline" /></button></span>
                </div>
              ))}

              <div className="pt-2">
                <div className="text-xs text-muted mb-2">In other timezones</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {Object.entries(singleResult.timezones).map(([tz, val]) => (
                    <div key={tz} className="bg-background p-2 rounded border border-border font-mono">{tz}: {val}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-3xl p-6">
          <textarea value={batchInput} onChange={e => setBatchInput(e.target.value)} placeholder="One timestamp per line..." className="tool-textarea h-40" />
          <button onClick={convertBatch} className="btn-primary mt-3 flex items-center gap-2"><List className="w-4 h-4" /> Convert Batch</button>

          {batchResults.length > 0 && (
            <div className="mt-4 space-y-2 text-sm">
              {batchResults.map((r, i) => (
                <div key={i} className="bg-background p-3 rounded-2xl border border-border">
                  <div className="font-mono text-muted">{r.input}</div>
                  {r.result ? <div className="mt-1">{r.result.iso} ({r.result.relative})</div> : <div className="text-rose-500">Could not parse</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <p className="text-center text-xs text-muted">All conversions use your browser\'s timezone data. 100% private and offline.</p>
    </div>
  );
}
