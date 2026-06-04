'use client';

import { useState, useMemo } from 'react';
import { parseColor, contrastRatio, getCompliance, suggestBetterColor, type RGB } from './utils';
import { Eye, Copy, RefreshCw } from 'lucide-react';

export default function ColorContrastChecker() {
  const [fgInput, setFgInput] = useState('#111827');
  const [bgInput, setBgInput] = useState('#ffffff');

  const fg = parseColor(fgInput);
  const bg = parseColor(bgInput);

  const ratio = useMemo(() => {
    if (!fg || !bg) return 0;
    return contrastRatio(fg, bg);
  }, [fg, bg]);

  const compliance = useMemo(() => getCompliance(ratio), [ratio]);

  const suggestion = useMemo(() => {
    if (!fg || !bg) return '';
    return suggestBetterColor(fg, bg, 4.5);
  }, [fg, bg]);

  const previewStyle = {
    backgroundColor: bg ? `rgb(${bg.r},${bg.g},${bg.b})` : '#fff',
    color: fg ? `rgb(${fg.r},${fg.g},${fg.b})` : '#111',
  };

  function swapColors() {
    const temp = fgInput;
    setFgInput(bgInput);
    setBgInput(temp);
  }

  function copyColor(which: 'fg' | 'bg') {
    const val = which === 'fg' ? fgInput : bgInput;
    navigator.clipboard.writeText(val);
  }

  const isValid = !!fg && !!bg;

  return (
    <div className="space-y-6">
      {/* Color Inputs */}
      <div className="bg-card border border-border rounded-3xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-xs font-bold text-muted block mb-1.5">Foreground (Text)</label>
          <div className="flex gap-2">
            <input value={fgInput} onChange={e => setFgInput(e.target.value)} className="tool-input font-mono flex-1" placeholder="#111827 or rgb(17,24,39)" />
            <input type="color" value={fgInput.startsWith('#') ? fgInput : '#111827'} onChange={e => setFgInput(e.target.value)} className="h-11 w-14 rounded-xl border border-border p-1 bg-background cursor-pointer" />
            <button onClick={() => copyColor('fg')} className="btn-secondary px-3"><Copy className="w-4 h-4" /></button>
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-muted block mb-1.5">Background</label>
          <div className="flex gap-2">
            <input value={bgInput} onChange={e => setBgInput(e.target.value)} className="tool-input font-mono flex-1" placeholder="#ffffff or rgb(255,255,255)" />
            <input type="color" value={bgInput.startsWith('#') ? bgInput : '#ffffff'} onChange={e => setBgInput(e.target.value)} className="h-11 w-14 rounded-xl border border-border p-1 bg-background cursor-pointer" />
            <button onClick={() => copyColor('bg')} className="btn-secondary px-3"><Copy className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="flex justify-between items-center mb-3">
          <div className="font-semibold flex items-center gap-2"><Eye className="w-4 h-4" /> Live Preview</div>
          <button onClick={swapColors} className="btn-secondary text-xs flex items-center gap-1 px-3 py-1">
            <RefreshCw className="w-3.5 h-3.5" /> Swap
          </button>
        </div>

        <div className="rounded-2xl p-8 text-center border border-border" style={previewStyle}>
          <div className="text-3xl font-semibold tracking-tight">The quick brown fox jumps over the lazy dog.</div>
          <div className="mt-4 text-sm opacity-80">Large text example (for WCAG large text rules)</div>
          <div className="mt-6 text-xs">UI component example — button text</div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-card border border-border rounded-3xl p-6">
        {!isValid ? (
          <div className="text-center text-muted">Enter valid foreground and background colors above.</div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <div className="text-6xl font-black tabular-nums tracking-tighter text-text">{ratio.toFixed(2)}:1</div>
              <div className="text-sm text-muted mt-1">Contrast Ratio</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Normal Text (AA 4.5:1 / AAA 7:1)', value: compliance.normal },
                { label: 'Large Text (AA 3:1 / AAA 4.5:1)', value: compliance.large },
                { label: 'UI / Graphics (AA 3:1)', value: compliance.ui },
              ].map((item, i) => (
                <div key={i} className="bg-background border border-border rounded-2xl p-4">
                  <div className="text-xs text-muted">{item.label}</div>
                  <div className={`mt-2 text-2xl font-semibold ${item.value.includes('AAA') || item.value === 'AA' ? 'text-emerald-600' : item.value.includes('AA') ? 'text-amber-600' : 'text-rose-600'}`}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {suggestion && (
              <div className="mt-4 p-4 bg-violet-50 border border-violet-200 rounded-2xl text-sm">
                Suggestion for better contrast: <button onClick={() => setFgInput(suggestion)} className="font-mono underline text-violet-700 hover:text-violet-900">{suggestion}</button>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="text-center text-xs text-muted">All calculations follow the official WCAG 2.1 relative luminance formula. Works entirely in your browser.</p>
    </div>
  );
}
