'use client';

import { useState, useMemo } from 'react';
import { generateRegexFromExamples, testCustomRegex } from './utils';
import { Wand2, Copy, Plus, Trash2, RefreshCw } from 'lucide-react';

const PRESETS: Record<string, { pos: string[]; neg: string[] }> = {
  Email: { pos: ['user@example.com', 'test+tag@domain.co.uk'], neg: ['not-email', 'user@', '@no.local'] },
  URL: { pos: ['https://example.com/path', 'http://sub.domain.org'], neg: ['example.com', 'ftp://bad'] },
  Phone: { pos: ['+1 (415) 555-0199', '415-555-0123'], neg: ['123', 'abc-def'] },
  'Log line (timestamp + level)': { pos: ['2025-05-10 14:22:01 INFO user login', '2025-05-11 09:01:44 ERROR db timeout'], neg: ['no date here', '2025 INFO only'] },
};

export default function RegexGenerator() {
  const [positive, setPositive] = useState<string[]>([...(PRESETS['Email']?.pos || ['user@example.com'])]);
  const [negative, setNegative] = useState<string[]>([...(PRESETS['Email']?.neg || ['not-an-email'])]);
  const [newPos, setNewPos] = useState('');
  const [newNeg, setNewNeg] = useState('');
  const [customPattern, setCustomPattern] = useState('');
  const [customFlags, setCustomFlags] = useState('i');
  const [customTest, setCustomTest] = useState('user@example.com\nbad-input');
  const [copied, setCopied] = useState('');

  const inferred = useMemo(() => generateRegexFromExamples(positive, negative), [positive, negative]);

  // If user provided custom regex, use it for the tester; otherwise fall back to inferred
  const activePattern = customPattern || inferred.pattern;
  const activeFlags = customPattern ? customFlags : inferred.flags;

  const testInputs = useMemo(() => customTest.split('\n').map(l => l.trim()).filter(Boolean), [customTest]);
  const customResults = useMemo(() => testCustomRegex(activePattern, activeFlags, testInputs), [activePattern, activeFlags, testInputs]);

  function loadPreset(name: keyof typeof PRESETS) {
    const p = PRESETS[name];
    if (p) {
      setPositive([...p.pos]);
      setNegative([...p.neg]);
      setCustomPattern('');
    }
  }

  function addPositive() { if (newPos.trim()) { setPositive([...positive, newPos.trim()]); setNewPos(''); } }
  function addNegative() { if (newNeg.trim()) { setNegative([...negative, newNeg.trim()]); setNewNeg(''); } }
  function removePos(i: number) { setPositive(positive.filter((_, idx) => idx !== i)); }
  function removeNeg(i: number) { setNegative(negative.filter((_, idx) => idx !== i)); }

  function copy(text: string, k: string) {
    navigator.clipboard.writeText(text);
    setCopied(k);
    setTimeout(() => setCopied(''), 1200);
  }

  const displayPattern = `/${activePattern}/${activeFlags}`;

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(PRESETS).map(k => (
          <button key={k} onClick={() => loadPreset(k as keyof typeof PRESETS)} className="btn-secondary text-xs">{k}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="font-semibold mb-3 flex items-center gap-2 text-emerald-600">✓ Should Match ({positive.length})</div>
          <div className="space-y-2 mb-3">
            {positive.map((ex, i) => (
              <div key={i} className="flex items-center gap-2 bg-background p-2 rounded-xl border border-border text-sm">
                <span className="flex-1 font-mono">{ex}</span>
                <button onClick={() => removePos(i)}><Trash2 className="w-4 h-4 text-muted hover:text-rose-500" /></button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newPos} onChange={e => setNewPos(e.target.value)} onKeyDown={e => e.key === 'Enter' && addPositive()} placeholder="Add positive example" className="tool-input flex-1" />
            <button onClick={addPositive} className="btn-secondary"><Plus className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="font-semibold mb-3 flex items-center gap-2 text-rose-600">✗ Should NOT Match ({negative.length})</div>
          <div className="space-y-2 mb-3">
            {negative.map((ex, i) => (
              <div key={i} className="flex items-center gap-2 bg-background p-2 rounded-xl border border-border text-sm">
                <span className="flex-1 font-mono">{ex}</span>
                <button onClick={() => removeNeg(i)}><Trash2 className="w-4 h-4 text-muted hover:text-rose-500" /></button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newNeg} onChange={e => setNewNeg(e.target.value)} onKeyDown={e => e.key === 'Enter' && addNegative()} placeholder="Add negative example" className="tool-input flex-1" />
            <button onClick={addNegative} className="btn-secondary"><Plus className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Generated / Editable */}
      <div className="bg-card border border-border rounded-3xl p-6 space-y-4">
        <div>
          <div className="flex justify-between text-xs mb-1 text-muted">
            <span>Inferred / Editable Pattern</span>
            <button onClick={() => { setCustomPattern(inferred.pattern); setCustomFlags(inferred.flags); }} className="hover:text-text flex items-center gap-1"><RefreshCw className="w-3 h-3" /> Reset to inferred</button>
          </div>
          <div className="flex gap-2">
            <input value={activePattern} onChange={e => setCustomPattern(e.target.value)} className="tool-input font-mono flex-1" />
            <input value={activeFlags} onChange={e => setCustomFlags(e.target.value)} className="tool-input w-16 font-mono" placeholder="flags" />
          </div>
          <div className="text-xs text-muted mt-1">Result: <span className="font-mono text-brand">{displayPattern}</span></div>
        </div>

        <div className="text-xs text-muted">{inferred.explanation}</div>

        <div className="flex gap-2">
          <button onClick={() => copy(displayPattern, 'pat')} className="btn-secondary text-xs flex items-center gap-1"><Copy className="w-3.5 h-3.5" /> {copied === 'pat' ? 'Copied!' : 'Copy regex'}</button>
          <button onClick={() => copy(activePattern, 'raw')} className="btn-secondary text-xs flex items-center gap-1"><Copy className="w-3.5 h-3.5" /> Copy pattern only</button>
        </div>
      </div>

      {/* Live tester on custom inputs */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="font-semibold mb-2">Live tester (edit inputs below)</div>
        <textarea value={customTest} onChange={e => setCustomTest(e.target.value)} className="tool-textarea h-24 font-mono text-sm" placeholder="one test string per line" />
        <div className="mt-3 space-y-1 text-sm">
          {customResults.map((r, i) => (
            <div key={i} className={`p-2 rounded-xl flex justify-between ${r.matches ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
              <span className="font-mono">{r.input}</span>
              <span>{r.matches ? '✓' : '✗'}{ (r as any).error ? ' (invalid regex)' : '' }</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
