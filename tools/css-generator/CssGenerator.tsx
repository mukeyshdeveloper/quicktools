'use client';

import { useState, useCallback } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────
interface ShadowLayer {
  id: number;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

type GradientType = 'linear' | 'radial' | 'conic';
interface GradientStop { id: number; color: string; position: number; }

// ── Helper ───────────────────────────────────────────────────────────────────
function hexAlpha(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${(opacity / 100).toFixed(2)})`;
}

function buildShadowCSS(layers: ShadowLayer[]): string {
  return layers
    .map(l => `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${hexAlpha(l.color, l.opacity)}`)
    .join(',\n      ');
}

function buildGradientCSS(type: GradientType, angle: number, stops: GradientStop[]): string {
  const stopStr = stops.map(s => `${s.color} ${s.position}%`).join(', ');
  if (type === 'linear') return `linear-gradient(${angle}deg, ${stopStr})`;
  if (type === 'radial') return `radial-gradient(circle, ${stopStr})`;
  return `conic-gradient(from ${angle}deg, ${stopStr})`;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button onClick={copy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
      {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
      {copied ? 'Copied!' : 'Copy CSS'}
    </button>
  );
}

let _id = 3;
function uid() { return ++_id; }

// ════════════════════════════════════════════════════════════════════════════
// BOX-SHADOW SECTION
// ════════════════════════════════════════════════════════════════════════════
function BoxShadowSection() {
  const [layers, setLayers] = useState<ShadowLayer[]>([
    { id: 1, x: 4, y: 8, blur: 24, spread: 0, color: '#6d28d9', opacity: 35, inset: false },
    { id: 2, x: 0, y: 2, blur: 6, spread: 0, color: '#000000', opacity: 12, inset: false },
  ]);
  const [bgColor, setBgColor] = useState('#ffffff');

  const css = `box-shadow: ${buildShadowCSS(layers)};`;

  function addLayer() {
    setLayers(l => [...l, { id: uid(), x: 0, y: 4, blur: 12, spread: 0, color: '#000000', opacity: 20, inset: false }]);
  }
  function removeLayer(id: number) {
    setLayers(l => l.filter(x => x.id !== id));
  }
  function update(id: number, key: keyof ShadowLayer, val: number | string | boolean) {
    setLayers(l => l.map(x => x.id === id ? { ...x, [key]: val } : x));
  }

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-8 flex items-center justify-center" style={{ background: bgColor }}>
        <div className="w-40 h-28 rounded-2xl bg-white dark:bg-gray-100 transition-all duration-300"
          style={{ boxShadow: buildShadowCSS(layers) }} />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Background</label>
        <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-8 h-8 cursor-pointer rounded-lg border-0" />
        <button onClick={addLayer} className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-pink-500 text-white text-xs font-bold rounded-lg hover:bg-pink-600 transition">
          + Add Layer
        </button>
      </div>

      {layers.map((l, i) => (
        <div key={l.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-500">Layer {i + 1}</span>
            <div className="flex gap-2 items-center">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 cursor-pointer">
                <input type="checkbox" checked={l.inset} onChange={e => update(l.id, 'inset', e.target.checked)} className="accent-pink-500" /> inset
              </label>
              {layers.length > 1 && (
                <button onClick={() => removeLayer(l.id)} className="text-xs text-red-400 hover:text-red-600 font-semibold">Remove</button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {([['x', 'X Offset', -50, 50], ['y', 'Y Offset', -50, 50], ['blur', 'Blur', 0, 100], ['spread', 'Spread', -50, 50]] as const).map(([k, label, min, max]) => (
              <div key={k}>
                <div className="flex justify-between text-xs text-gray-400 mb-1"><span>{label}</span><span>{l[k]}px</span></div>
                <input type="range" min={min} max={max} value={l[k]} onChange={e => update(l.id, k, Number(e.target.value))} className="w-full accent-pink-500" />
              </div>
            ))}
            <div>
              <div className="text-xs text-gray-400 mb-1">Color</div>
              <input type="color" value={l.color} onChange={e => update(l.id, 'color', e.target.value)} className="w-full h-9 cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700" />
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1"><span>Opacity</span><span>{l.opacity}%</span></div>
              <input type="range" min={0} max={100} value={l.opacity} onChange={e => update(l.id, 'opacity', Number(e.target.value))} className="w-full accent-pink-500" />
            </div>
          </div>
        </div>
      ))}

      {/* Output */}
      <div className="relative bg-gray-900 rounded-2xl p-4 font-mono text-sm text-green-400">
        <div className="absolute top-3 right-3"><CopyButton text={css} /></div>
        <pre className="whitespace-pre-wrap pr-20">{css}</pre>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// GRADIENT SECTION
// ════════════════════════════════════════════════════════════════════════════
function GradientSection() {
  const [type, setType] = useState<GradientType>('linear');
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<GradientStop[]>([
    { id: 1, color: '#7c3aed', position: 0 },
    { id: 2, color: '#ec4899', position: 50 },
    { id: 3, color: '#f97316', position: 100 },
  ]);

  const gradientCss = buildGradientCSS(type, angle, stops);
  const css = `background: ${gradientCss};`;

  function updateStop(id: number, key: keyof GradientStop, val: string | number) {
    setStops(s => s.map(x => x.id === id ? { ...x, [key]: val } : x));
  }
  function addStop() {
    setStops(s => [...s, { id: uid(), color: '#ffffff', position: 75 }]);
  }
  function removeStop(id: number) {
    if (stops.length <= 2) return;
    setStops(s => s.filter(x => x.id !== id));
  }

  const presets = [
    { name: 'Violet Sunset', stops: [{ id: 1, color: '#7c3aed', position: 0 }, { id: 2, color: '#ec4899', position: 100 }], angle: 135 },
    { name: 'Ocean Blue', stops: [{ id: 1, color: '#0ea5e9', position: 0 }, { id: 2, color: '#06b6d4', position: 100 }], angle: 135 },
    { name: 'Emerald', stops: [{ id: 1, color: '#059669', position: 0 }, { id: 2, color: '#10b981', position: 100 }], angle: 135 },
    { name: 'Fire', stops: [{ id: 1, color: '#ef4444', position: 0 }, { id: 2, color: '#f97316', position: 50 }, { id: 3, color: '#fbbf24', position: 100 }], angle: 90 },
  ];

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div className="h-36 w-full rounded-2xl transition-all duration-300 shadow-lg"
        style={{ background: gradientCss }} />

      {/* Type & Angle */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Type</label>
          <div className="flex gap-2">
            {(['linear', 'radial', 'conic'] as GradientType[]).map(t => (
              <button key={t} onClick={() => setType(t)}
                className={`px-4 py-1.5 text-sm font-bold rounded-xl transition ${type === t ? 'bg-pink-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        {(type === 'linear' || type === 'conic') && (
          <div className="flex-1 min-w-[160px] space-y-1">
            <div className="flex justify-between text-xs text-gray-400"><span>Angle</span><span>{angle}°</span></div>
            <input type="range" min={0} max={360} value={angle} onChange={e => setAngle(Number(e.target.value))} className="w-full accent-pink-500" />
          </div>
        )}
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {presets.map(p => (
          <button key={p.name}
            onClick={() => { setStops(p.stops.map((s, i) => ({ ...s, id: i + 1 }))); setAngle(p.angle); setType('linear'); }}
            className="px-3 py-1 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 hover:border-pink-400 transition" style={{ background: `linear-gradient(135deg, ${p.stops.map(s => s.color).join(', ')})`, color: 'white' }}>
            {p.name}
          </button>
        ))}
      </div>

      {/* Stops */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Color Stops</label>
          <button onClick={addStop} className="text-xs text-pink-500 font-bold hover:text-pink-700 transition">+ Add Stop</button>
        </div>
        {stops.map((s) => (
          <div key={s.id} className="flex items-center gap-3">
            <input type="color" value={s.color} onChange={e => updateStop(s.id, 'color', e.target.value)} className="w-10 h-9 cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700 shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between text-xs text-gray-400 mb-1"><span>{s.color}</span><span>{s.position}%</span></div>
              <input type="range" min={0} max={100} value={s.position} onChange={e => updateStop(s.id, 'position', Number(e.target.value))} className="w-full accent-pink-500" />
            </div>
            <button onClick={() => removeStop(s.id)} className="text-red-400 hover:text-red-600 text-xs font-bold shrink-0">✕</button>
          </div>
        ))}
      </div>

      {/* Output */}
      <div className="relative bg-gray-900 rounded-2xl p-4 font-mono text-sm text-green-400">
        <div className="absolute top-3 right-3"><CopyButton text={css} /></div>
        <pre className="whitespace-pre-wrap pr-20">{css}</pre>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════════════
export default function CssGenerator() {
  const [tab, setTab] = useState<'shadow' | 'gradient'>('shadow');

  return (
    <div className="space-y-6">
      {/* Tab toggle */}
      <div className="flex rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 w-fit">
        <button onClick={() => setTab('shadow')}
          className={`px-6 py-2.5 text-sm font-bold transition ${tab === 'shadow' ? 'bg-pink-500 text-white shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
          🌑 Box Shadow
        </button>
        <button onClick={() => setTab('gradient')}
          className={`px-6 py-2.5 text-sm font-bold transition ${tab === 'gradient' ? 'bg-pink-500 text-white shadow-lg' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
          🌈 Gradient
        </button>
      </div>

      {tab === 'shadow' ? <BoxShadowSection /> : <GradientSection />}
    </div>
  );
}
