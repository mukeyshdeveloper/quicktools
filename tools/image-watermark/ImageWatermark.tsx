'use client';

import { useState } from 'react';
import { applyWatermarks, type WatermarkText, type WatermarkLogo, type WatermarkResult } from './utils';
import { Upload, Plus, Download, Trash2, Play } from 'lucide-react';

const POS = ['top-left','top-center','top-right','middle-left','center','middle-right','bottom-left','bottom-center','bottom-right'];

export default function ImageWatermark() {
  const [bases, setBases] = useState<Array<{ id: number; name: string; dataUrl: string }>>([]);
  const [texts, setTexts] = useState<WatermarkText[]>([
    { text: '© QuickUtils', fontSize: 0.045, color: '#ffffff', opacity: 0.65, rotation: -12, position: 'bottom-right' },
  ]);
  const [logo, setLogo] = useState<WatermarkLogo | null>(null);
  const [results, setResults] = useState<WatermarkResult[]>([]);
  const [processing, setProcessing] = useState(false);

  function addBaseFiles(files: FileList | null) {
    if (!files) return;
    const arr = Array.from(files).filter(f => f.type.startsWith('image/'));
    Promise.all(arr.map(file => new Promise<{id:number;name:string;dataUrl:string}>((res) => {
      const r = new FileReader();
      r.onload = e => res({ id: Date.now() + Math.random(), name: file.name, dataUrl: e.target?.result as string });
      r.readAsDataURL(file);
    }))).then(newOnes => setBases(prev => [...prev, ...newOnes]));
    setResults([]);
  }

  function addLogo(file: File) {
    const r = new FileReader();
    r.onload = e => setLogo({ dataUrl: e.target?.result as string, scale: 0.18, opacity: 0.75, position: 'bottom-left' });
    r.readAsDataURL(file);
  }

  function updateText(idx: number, patch: Partial<WatermarkText>) {
    const next = [...texts];
    const current = next[idx];
    next[idx] = { ...current, ...patch } as WatermarkText;
    setTexts(next);
  }

  function addText() {
    setTexts([...texts, { text: 'SAMPLE', fontSize: 0.04, color: '#111827', opacity: 0.5, rotation: 0, position: 'center' }]);
  }

  function removeText(idx: number) {
    setTexts(texts.filter((_, i) => i !== idx));
  }

  async function applyToAll() {
    if (bases.length === 0) return;
    setProcessing(true);
    const out: WatermarkResult[] = [];
    for (const b of bases) {
      try {
        const r = await applyWatermarks(b.dataUrl, { texts, logo: logo || undefined }, b.name);
        out.push(r);
      } catch {}
    }
    setResults(out);
    setProcessing(false);
  }

  function download(r: WatermarkResult, i: number) {
    const a = document.createElement('a');
    a.href = r.dataUrl;
    const base = (r.originalName || `watermarked-${i}`).replace(/\.[^/.]+$/, '');
    a.download = `${base}-watermarked.png`;
    a.click();
  }

  function downloadAll() {
    results.forEach((r, i) => setTimeout(() => download(r, i), i * 90));
  }

  return (
    <div className="space-y-6">
      {/* Upload bases */}
      <div onDrop={e => { e.preventDefault(); addBaseFiles(e.dataTransfer.files); }} onDragOver={e => e.preventDefault()}
        className="border-2 border-dashed border-border rounded-3xl p-8 text-center bg-card cursor-pointer" onClick={() => document.getElementById('wm-base')?.click()}>
        <Upload className="mx-auto mb-2" />
        <p className="font-medium">Drop base image(s) here — or click</p>
        <input id="wm-base" type="file" multiple accept="image/*" className="hidden" onChange={e => addBaseFiles(e.target.files)} />
      </div>

      {bases.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {bases.map((b, i) => (
            <div key={b.id} className="text-xs bg-background border border-border rounded-2xl px-3 py-1 flex items-center gap-2">
              {b.name}
              <button onClick={() => setBases(bases.filter((_, idx) => idx !== i))}><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          ))}
          <button onClick={() => document.getElementById('wm-base')?.click()} className="text-xs btn-secondary">+ Add more</button>
        </div>
      )}

      {/* Watermark controls */}
      <div className="bg-card border border-border rounded-3xl p-6 space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Text Watermarks</span>
            <button onClick={addText} className="btn-secondary text-xs flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add text</button>
          </div>
          {texts.map((t, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-3 p-3 bg-background rounded-2xl border border-border">
              <input value={t.text} onChange={e => updateText(i, { text: e.target.value })} className="tool-input md:col-span-2" placeholder="Watermark text" />
              <div>
                <div className="text-[10px] text-muted">Size</div>
                <input type="range" min={0.02} max={0.12} step={0.005} value={t.fontSize} onChange={e => updateText(i, { fontSize: +e.target.value })} className="w-full" />
              </div>
              <input type="color" value={t.color} onChange={e => updateText(i, { color: e.target.value })} className="h-10 rounded border border-border p-1 bg-background" />
              <div>
                <div className="text-[10px] text-muted">Opacity</div>
                <input type="range" min={0.1} max={1} step={0.05} value={t.opacity} onChange={e => updateText(i, { opacity: +e.target.value })} className="w-full" />
              </div>
              <select value={t.position} onChange={e => updateText(i, { position: e.target.value })} className="tool-input text-xs">
                {POS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <div className="flex gap-2 items-end">
                <input type="number" value={t.rotation} onChange={e => updateText(i, { rotation: +e.target.value })} className="tool-input w-20" />°
                <button onClick={() => removeText(i)} className="text-rose-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="font-semibold mb-2">Logo Watermark (optional)</div>
          {!logo ? (
            <label className="inline-flex items-center gap-2 text-sm cursor-pointer border border-dashed border-border rounded-2xl px-4 py-2">
              <Upload className="w-4 h-4" /> Upload logo (PNG recommended)
              <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && addLogo(e.target.files[0])} />
            </label>
          ) : (
            <div className="flex items-center gap-4 text-sm">
              Logo loaded
              <button onClick={() => setLogo(null)} className="text-rose-500">Remove</button>
              <div>Scale <input type="range" min={0.05} max={0.5} step={0.01} value={logo.scale} onChange={e => setLogo({ ...logo, scale: +e.target.value })} /></div>
              <div>Opacity <input type="range" min={0.1} max={1} step={0.05} value={logo.opacity} onChange={e => setLogo({ ...logo, opacity: +e.target.value })} /></div>
              <select value={logo.position} onChange={e => setLogo({ ...logo, position: e.target.value })} className="tool-input text-xs">
                {POS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          )}
        </div>

        <button onClick={applyToAll} disabled={bases.length === 0 || processing} className="btn-primary w-full flex justify-center gap-2">
          <Play className="w-4 h-4" /> {processing ? 'Applying…' : `Apply to ${bases.length} image${bases.length === 1 ? '' : 's'}`}
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Watermarked Results</span>
            <button onClick={downloadAll} className="btn-primary text-sm flex items-center gap-2"><Download className="w-4 h-4" /> Download All</button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((r, i) => (
              <div key={i} className="border border-border rounded-2xl overflow-hidden bg-background">
                <img src={r.dataUrl} className="w-full" alt="watermarked" />
                <div className="p-3 flex justify-between text-xs">
                  <span className="truncate text-muted">{r.originalName}</span>
                  <button onClick={() => download(r, i)} className="text-brand">Download</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-center text-xs text-muted">Live canvas compositing. Add as many text layers as you want. Logo supports transparency.</p>
    </div>
  );
}
