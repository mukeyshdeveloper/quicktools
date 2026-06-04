'use client';

import { useState, useEffect } from 'react';
import { optimizeBase64Image, isValidImageDataUrl, formatBytes, type OptimizeOptions, type OptimizeResult } from './utils';
import { Upload, Copy, Download, RefreshCw, Image as ImageIcon } from 'lucide-react';

export default function Base64ImageOptimizer() {
  const [inputBase64, setInputBase64] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [result, setResult] = useState<OptimizeResult | null>(null);
  const [options, setOptions] = useState<OptimizeOptions>({ maxWidth: 1200, maxHeight: 1200, quality: 82, format: 'jpeg' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Live optimize when inputs change (debounced lightly via effect)
  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!inputBase64 || !isValidImageDataUrl(inputBase64)) {
        setResult(null);
        return;
      }
      setLoading(true);
      setError('');
      const res = await optimizeBase64Image(inputBase64, options);
      if (!cancelled) {
        if (res) {
          setResult(res);
        } else {
          setError('Failed to process image. Try a smaller file or different format.');
        }
        setLoading(false);
      }
    }
    const t = setTimeout(run, 120);
    return () => { cancelled = true; clearTimeout(t); };
  }, [inputBase64, options]);

  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setInputBase64(dataUrl);
      setPreviewUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onPasteBase64(text: string) {
    const trimmed = text.trim();
    if (isValidImageDataUrl(trimmed)) {
      setInputBase64(trimmed);
      setPreviewUrl(trimmed);
      setError('');
    } else {
      setError('Invalid base64 image data URL. Must start with data:image/...;base64,');
    }
  }

  async function copyOptimized() {
    if (!result) return;
    await navigator.clipboard.writeText(result.optimizedBase64);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  function downloadBase64() {
    if (!result) return;
    const blob = new Blob([result.optimizedBase64], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `optimized.${result.format}`;
    a.click();
  }

  function downloadAsImage() {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.optimizedBase64;
    a.download = `optimized-image.${result.format === 'jpeg' ? 'jpg' : result.format}`;
    a.click();
  }

  function resetAll() {
    setInputBase64('');
    setPreviewUrl('');
    setResult(null);
    setError('');
    setOptions({ maxWidth: 1200, maxHeight: 1200, quality: 82, format: 'jpeg' });
  }

  const origSize = inputBase64 ? Math.floor((inputBase64.length * 0.75)) : 0;

  return (
    <div className="space-y-6">
      {/* Input methods */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="font-semibold mb-4 flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Input Image</div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Upload / Drop */}
          <div
            onDrop={onDrop}
            onDragOver={e => e.preventDefault()}
            className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-brand transition cursor-pointer"
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <Upload className="mx-auto w-8 h-8 text-muted mb-3" />
            <p className="text-sm font-medium">Drop image or click to upload</p>
            <p className="text-xs text-muted mt-1">PNG, JPG, WebP, GIF up to ~10MB recommended</p>
            <input id="file-input" type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
          </div>

          {/* Paste base64 */}
          <div>
            <label className="text-xs font-bold text-muted block mb-1.5">Or paste base64 data URL</label>
            <textarea
              placeholder="data:image/png;base64,..."
              className="tool-textarea h-28 font-mono text-xs"
              onBlur={e => onPasteBase64(e.target.value)}
            />
            <button onClick={() => { if (inputBase64) setPreviewUrl(inputBase64); }} className="text-xs mt-2 text-brand underline">Load pasted</button>
          </div>
        </div>

        {error && <p className="text-rose-500 text-sm mt-3">{error}</p>}
      </div>

      {/* Controls */}
      {inputBase64 && (
        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="flex flex-wrap gap-x-8 gap-y-5">
            <div>
              <label className="text-xs font-bold text-muted">Max Width (px)</label>
              <input type="number" value={options.maxWidth} onChange={e => setOptions({ ...options, maxWidth: +e.target.value })} className="tool-input w-28" min={50} max={4000} />
            </div>
            <div>
              <label className="text-xs font-bold text-muted">Max Height (px)</label>
              <input type="number" value={options.maxHeight} onChange={e => setOptions({ ...options, maxHeight: +e.target.value })} className="tool-input w-28" min={50} max={4000} />
            </div>
            <div className="w-40">
              <label className="text-xs font-bold text-muted">Quality {options.quality}</label>
              <input type="range" min={10} max={100} step={1} value={options.quality} onChange={e => setOptions({ ...options, quality: +e.target.value })} className="w-full accent-brand" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted">Output Format</label>
              <select value={options.format} onChange={e => setOptions({ ...options, format: e.target.value as any })} className="tool-input">
                <option value="jpeg">JPEG (smallest)</option>
                <option value="webp">WebP (modern)</option>
                <option value="png">PNG (lossless + alpha)</option>
              </select>
            </div>
            <div className="self-end">
              <button onClick={resetAll} className="btn-secondary text-sm">Reset</button>
            </div>
          </div>
          <p className="text-[11px] text-muted mt-3">Tip: Lower quality + smaller max dims = dramatically smaller base64 payloads for CSS/JSON/HTML.</p>
        </div>
      )}

      {/* Previews + Results */}
      {inputBase64 && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Original */}
          <div className="bg-card border border-border rounded-3xl p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold">Original</span>
              <span className="text-xs text-muted font-mono">{formatBytes(origSize)}</span>
            </div>
            <div className="bg-background rounded-2xl overflow-hidden border border-border flex items-center justify-center min-h-[220px]">
              {previewUrl ? <img src={previewUrl} alt="original" className="max-h-[260px] object-contain" /> : <div className="text-muted">Preview</div>}
            </div>
            <div className="text-xs text-muted mt-2">Dimensions: {previewUrl ? 'original size' : '—'}</div>
          </div>

          {/* Optimized */}
          <div className="bg-card border border-border rounded-3xl p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold">Optimized {loading && <RefreshCw className="inline w-3 h-3 animate-spin" />}</span>
              {result && <span className="text-emerald-600 text-xs font-mono">–{result.savings}%</span>}
            </div>

            <div className="bg-background rounded-2xl overflow-hidden border border-border flex items-center justify-center min-h-[220px]">
              {result ? (
                <img src={result.optimizedBase64} alt="optimized" className="max-h-[260px] object-contain" />
              ) : (
                <div className="text-muted text-sm">Optimized preview will appear here</div>
              )}
            </div>

            {result && (
              <div className="mt-3 text-xs space-y-1 font-mono">
                <div className="flex justify-between"><span className="text-muted">New size</span><span>{formatBytes(result.newSize)}</span></div>
                <div className="flex justify-between"><span className="text-muted">Dimensions</span><span>{result.width}×{result.height}</span></div>
                <div className="flex justify-between text-emerald-600"><span>Savings</span><span>{result.savings}% smaller</span></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      {result && (
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={copyOptimized} className="btn-primary flex items-center gap-2">
            <Copy className="w-4 h-4" /> {copied ? 'Copied base64!' : 'Copy optimized base64'}
          </button>
          <button onClick={downloadBase64} className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" /> Download .txt (base64)
          </button>
          <button onClick={downloadAsImage} className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" /> Download as {result.format.toUpperCase()}
          </button>
        </div>
      )}

      <p className="text-center text-xs text-muted">100% private — image never leaves your browser. Canvas-based resize + re-encode.</p>
    </div>
  );
}
