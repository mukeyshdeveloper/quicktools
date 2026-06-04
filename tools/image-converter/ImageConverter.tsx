'use client';

import { useState } from 'react';
import { convertImage, formatBytes, type OutputFormat, type ConvertResult, type ConvertOptions } from './utils';
import { Upload, Download, ArrowRightLeft, Trash2 } from 'lucide-react';

const FORMATS: { value: OutputFormat; label: string; desc: string }[] = [
  { value: 'image/webp', label: 'WebP', desc: 'Best size/quality (recommended)' },
  { value: 'image/avif', label: 'AVIF', desc: 'Excellent compression (modern browsers)' },
  { value: 'image/jpeg', label: 'JPEG', desc: 'Universal compatibility' },
  { value: 'image/png',  label: 'PNG',  desc: 'Lossless + transparency' },
  { value: 'original',   label: 'Original', desc: 'Keep format, only resize' },
];

export default function ImageConverter() {
  const [items, setItems] = useState<Array<{ id: number; file: File; preview: string }>>([]);
  const [results, setResults] = useState<ConvertResult[]>([]);
  const [opts, setOpts] = useState<ConvertOptions>({ format: 'image/webp', quality: 0.88, maxWidth: 1920, maxHeight: 1920 });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = Array.from(list).filter(f => f.type.startsWith('image/')).map((file, i) => ({
      id: Date.now() + i,
      file,
      preview: URL.createObjectURL(file),
    }));
    setItems(prev => [...prev, ...next]);
    setResults([]);
  }

  function removeItem(id: number) {
    setItems(prev => prev.filter(x => x.id !== id));
    setResults([]);
  }

  function clear() {
    items.forEach(i => URL.revokeObjectURL(i.preview));
    setItems([]);
    setResults([]);
    setError('');
  }

  async function convertAll() {
    if (items.length === 0) return;
    setProcessing(true);
    setError('');
    setResults([]);
    const out: ConvertResult[] = [];
    for (const it of items) {
      try {
        const r = await convertImage(it.file, opts);
        out.push(r);
      } catch (e: any) {
        setError(`Error on ${it.file.name}: ${e.message}`);
      }
    }
    setResults(out);
    setProcessing(false);
  }

  function downloadOne(r: ConvertResult) {
    const a = document.createElement('a');
    a.href = r.dataUrl;
    const base = (r.originalName || 'image').replace(/\.[^/.]+$/, '');
    a.download = `${base}.${r.format.toLowerCase()}`;
    a.click();
  }

  function downloadAll() {
    results.forEach((r, i) => setTimeout(() => downloadOne(r), i * 90));
  }

  const totalOrig = results.reduce((s, r) => s + r.originalSize, 0);
  const totalNew = results.reduce((s, r) => s + r.newSize, 0);

  return (
    <div className="space-y-6">
      <div
        onDrop={e => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
        onDragOver={e => e.preventDefault()}
        onClick={() => document.getElementById('conv-files')?.click()}
        className="border-2 border-dashed border-border hover:border-brand rounded-3xl p-10 text-center bg-card cursor-pointer"
      >
        <ArrowRightLeft className="mx-auto mb-3 text-muted" />
        <p className="font-semibold">Drop images (multiple OK) or click</p>
        <p className="text-xs text-muted mt-1">Convert format + optional resize • WebP / AVIF / JPEG / PNG</p>
        <input id="conv-files" type="file" multiple accept="image/*" className="hidden" onChange={e => addFiles(e.target.files)} />
      </div>

      {items.length > 0 && (
        <>
          <div className="bg-card border border-border rounded-3xl p-6">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">{items.length} image{items.length > 1 ? 's' : ''}</span>
              <button onClick={clear} className="text-xs text-rose-500 flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Clear</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-5">
              <div>
                <label className="text-xs font-bold text-muted">Target Format</label>
                <select value={opts.format} onChange={e => setOpts({ ...opts, format: e.target.value as any })} className="tool-input">
                  {FORMATS.map(f => <option key={f.value} value={f.value}>{f.label} — {f.desc}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-muted">Max Width</label>
                <input type="number" value={opts.maxWidth ?? ''} onChange={e => { const v = e.target.value ? +e.target.value : undefined; setOpts(prev => ({ ...prev, maxWidth: v })); }} className="tool-input" placeholder="No limit" />
              </div>
              <div>
                <label className="text-xs font-bold text-muted">Max Height</label>
                <input type="number" value={opts.maxHeight ?? ''} onChange={e => { const v = e.target.value ? +e.target.value : undefined; setOpts(prev => ({ ...prev, maxHeight: v })); }} className="tool-input" placeholder="No limit" />
              </div>
              <div>
                <label className="text-xs font-bold text-muted">Quality ({Math.round(opts.quality * 100)}%)</label>
                <input type="range" min={0.6} max={0.98} step={0.01} value={opts.quality} onChange={e => setOpts({ ...opts, quality: +e.target.value })} className="w-full accent-brand" />
              </div>
            </div>

            <button onClick={convertAll} disabled={processing} className="btn-primary w-full">Convert / Resize All</button>
            {error && <p className="text-rose-500 mt-2 text-sm">{error}</p>}
          </div>

          {results.length > 0 && (
            <div className="bg-card border border-border rounded-3xl p-6">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Results ({formatBytes(totalOrig)} → {formatBytes(totalNew)})</span>
                <button onClick={downloadAll} className="btn-primary text-sm flex gap-2 items-center"><Download className="w-4 h-4" /> Download All</button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((r, i) => (
                  <div key={i} className="p-3 border border-border rounded-2xl bg-background text-sm">
                    <div className="font-mono text-xs truncate text-muted mb-1">{r.originalName}</div>
                    <div className="flex justify-between text-xs">
                      <span>{r.width}×{r.height} • {r.format}</span>
                      <span className="text-emerald-600">{Math.round((1 - r.newSize / r.originalSize) * 100)}% smaller</span>
                    </div>
                    <button onClick={() => downloadOne(r)} className="mt-2 w-full btn-secondary text-xs py-1">Download</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <p className="text-center text-xs text-muted">AVIF support depends on your browser (best in recent Chrome/Edge). All work happens locally.</p>
    </div>
  );
}
