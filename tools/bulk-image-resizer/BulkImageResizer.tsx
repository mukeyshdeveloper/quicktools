'use client';

import { useState } from 'react';
import { resizeImage, formatBytes, type ResizeOptions, type ResizeResult } from './utils';
import { Upload, Download, X, Play, Trash2 } from 'lucide-react';

type FileWithId = { id: number; file: File };

export default function BulkImageResizer() {
  const [files, setFiles] = useState<FileWithId[]>([]);
  const [results, setResults] = useState<ResizeResult[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const [opts, setOpts] = useState<ResizeOptions>({
    mode: 'max',
    width: 1200,
    height: 1200,
    percent: 50,
    fit: 'contain',
    format: 'original',
    quality: 0.85,
  });

  function addFiles(newFiles: FileList | null) {
    if (!newFiles) return;
    const next = Array.from(newFiles)
      .filter(f => f.type.startsWith('image/'))
      .map((file, i) => ({ id: Date.now() + i, file }));
    setFiles(prev => [...prev, ...next]);
    setResults([]);
    setError('');
  }

  function removeFile(id: number) {
    setFiles(prev => prev.filter(f => f.id !== id));
    setResults([]);
  }

  function clearAll() {
    setFiles([]);
    setResults([]);
    setError('');
    setProgress(0);
  }

  async function processAll() {
    if (files.length === 0) return;
    setProcessing(true);
    setError('');
    setResults([]);
    setProgress(0);

    const out: ResizeResult[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (!f || !f.file) continue;
      try {
        const r = await resizeImage(f.file, opts);
        out.push(r);
      } catch (e: any) {
        setError(`Failed on ${f.file.name}: ${e.message}`);
      }
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }
    setResults(out);
    setProcessing(false);
  }

  function downloadOne(r: ResizeResult, idx: number) {
    const a = document.createElement('a');
    a.href = r.dataUrl;
    const base = r.originalName.replace(/\.[^/.]+$/, '');
    a.download = `${base}-resized.${r.format.toLowerCase()}`;
    a.click();
  }

  function downloadAll() {
    results.forEach((r, i) => {
      setTimeout(() => downloadOne(r, i), i * 120); // stagger to avoid popup blocking
    });
  }

  const totalOriginal = results.reduce((s, r) => s + r.originalSize, 0);
  const totalNew = results.reduce((s, r) => s + r.newSize, 0);
  const savings = totalOriginal > 0 ? Math.round((1 - totalNew / totalOriginal) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Drop + Add */}
      <div
        onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-border hover:border-brand rounded-3xl p-10 text-center cursor-pointer bg-card"
        onClick={() => document.getElementById('bulk-file')?.click()}
      >
        <Upload className="mx-auto mb-3 text-muted" />
        <p className="font-semibold">Drop images here or click to select multiple</p>
        <p className="text-xs text-muted mt-1">Supports JPG, PNG, WebP, etc. • All processing stays in your browser</p>
        <input id="bulk-file" type="file" multiple accept="image/*" className="hidden" onChange={e => addFiles(e.target.files)} />
      </div>

      {files.length > 0 && (
        <>
          {/* Controls */}
          <div className="bg-card border border-border rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{files.length} image{files.length !== 1 ? 's' : ''} queued</div>
              <button onClick={clearAll} className="text-xs text-rose-500 flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Clear</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <label className="text-xs font-bold text-muted">Resize Mode</label>
                <select value={opts.mode} onChange={e => setOpts({ ...opts, mode: e.target.value as any })} className="tool-input">
                  <option value="max">Max dimensions (contain)</option>
                  <option value="exact">Exact size</option>
                  <option value="percent">Percentage scale</option>
                </select>
              </div>

              {opts.mode === 'percent' ? (
                <div>
                  <label className="text-xs font-bold text-muted">Scale %</label>
                  <input type="number" value={opts.percent} onChange={e => setOpts({ ...opts, percent: +e.target.value })} className="tool-input" min={5} max={400} />
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-bold text-muted">Width (px)</label>
                    <input type="number" value={opts.width} onChange={e => setOpts({ ...opts, width: +e.target.value })} className="tool-input" min={10} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted">Height (px)</label>
                    <input type="number" value={opts.height} onChange={e => setOpts({ ...opts, height: +e.target.value })} className="tool-input" min={10} />
                  </div>
                </>
              )}

              {opts.mode !== 'percent' && (
                <div>
                  <label className="text-xs font-bold text-muted">Fit</label>
                  <select value={opts.fit} onChange={e => setOpts({ ...opts, fit: e.target.value as any })} className="tool-input">
                    <option value="contain">Contain (letterbox)</option>
                    <option value="cover">Cover (crop)</option>
                    <option value="stretch">Stretch (ignore ratio)</option>
                  </select>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-muted">Output Format</label>
                <select value={opts.format} onChange={e => setOpts({ ...opts, format: e.target.value as any })} className="tool-input">
                  <option value="original">Keep original</option>
                  <option value="image/webp">WebP</option>
                  <option value="image/jpeg">JPEG</option>
                  <option value="image/png">PNG</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-bold text-muted">Quality ({Math.round(opts.quality * 100)}%)</label>
                <input type="range" min={0.5} max={0.98} step={0.01} value={opts.quality} onChange={e => setOpts({ ...opts, quality: +e.target.value })} className="w-full accent-brand" />
              </div>
            </div>

            <button
              onClick={processAll}
              disabled={processing || files.length === 0}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-base disabled:opacity-60"
            >
              <Play className="w-4 h-4" /> {processing ? `Processing… ${progress}%` : 'Resize All Images'}
            </button>
            {error && <p className="text-rose-500 text-sm">{error}</p>}
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="bg-card border border-border rounded-3xl p-6">
              <div className="flex justify-between mb-4 items-center">
                <div>
                  <span className="font-semibold">Results</span>
                  <span className="ml-3 text-xs text-muted">
                    {formatBytes(totalOriginal)} → {formatBytes(totalNew)} ({savings}% saved)
                  </span>
                </div>
                <button onClick={downloadAll} className="btn-primary text-sm flex items-center gap-2">
                  <Download className="w-4 h-4" /> Download All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((r, idx) => {
                  const f = files[idx];
                  const orig = f && f.file ? f.file.name : r.originalName;
                  return (
                    <div key={idx} className="border border-border rounded-2xl p-3 bg-background text-sm">
                      <div className="font-mono text-xs truncate mb-2 text-muted">{orig}</div>
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <div className="text-[10px] text-muted">Original</div>
                          <div>{formatBytes(r.originalSize)}</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] text-muted">Resized</div>
                          <div className="text-emerald-600 font-medium">{formatBytes(r.newSize)} ({r.width}×{r.height})</div>
                        </div>
                      </div>
                      <button onClick={() => downloadOne(r, idx)} className="mt-3 w-full btn-secondary text-xs py-1.5 flex items-center justify-center gap-1">
                        <Download className="w-3.5 h-3.5" /> Download {r.format}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      <p className="text-center text-xs text-muted">Everything runs locally using Canvas. Large batches may take a moment on slower devices.</p>
    </div>
  );
}
