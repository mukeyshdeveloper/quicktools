'use client';

import { useState } from 'react';
import { extractPalette, loadImageFromUrl, type PaletteResult } from './utils';
import { Upload, Download, Copy, RefreshCw, Link as LinkIcon } from 'lucide-react';

export default function ColorPaletteExtractor() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<PaletteResult | null>(null);
  const [paletteSize, setPaletteSize] = useState(8);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState('');

  async function loadFromFile(f: File) {
    if (!f.type.startsWith('image/')) { setError('Please select a valid image file.'); return; }
    setFile(f); setError(null); setResult(null);
    const p = URL.createObjectURL(f);
    setPreview(p);
  }

  async function loadFromUrl() {
    if (!urlInput.trim()) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const dataUrl = await loadImageFromUrl(urlInput.trim());
      setPreview(dataUrl);
      setFile(null);
      const res = await extractPalette(dataUrl, paletteSize);
      setResult(res);
    } catch (e: any) {
      setError(e.message || 'Could not load image from URL (CORS often blocks this). Upload the file for best results.');
    } finally {
      setLoading(false);
    }
  }

  async function handleExtract() {
    if (!preview) return;
    setLoading(true); setError(null);
    try {
      const src = file || preview;
      const res = await extractPalette(src as any, paletteSize);
      setResult(res);
    } catch (e: any) {
      setError(e.message || 'Extraction failed (CORS blocked — upload the file instead).');
    } finally {
      setLoading(false);
    }
  }

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1200);
  };

  const copyAll = () => {
    if (!result) return;
    const text = result.colors.map(c => c.hex).join(', ');
    navigator.clipboard.writeText(text);
    setCopied('all');
    setTimeout(() => setCopied(null), 1200);
  };

  const downloadPalette = () => {
    if (!result) return;
    const css = `:root {\n${result.colors.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join('\n')}\n}`;
    const txt = result.colors.map(c => `${c.hex}  rgb(${c.rgb.r},${c.rgb.g},${c.rgb.b})  ${c.percentage}%`).join('\n');
    const blob = new Blob([css + '\n\n' + txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'palette.txt'; a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview);
    setFile(null); setPreview(null); setResult(null); setError(null); setUrlInput('');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-card border border-border rounded-3xl p-6 space-y-4">
        <div className="flex gap-3">
          <input value={urlInput} onChange={e => setUrlInput(e.target.value)} placeholder="https://example.com/image.jpg (CORS may block)" className="tool-input flex-1" />
          <button onClick={loadFromUrl} disabled={loading || !urlInput} className="btn-secondary flex items-center gap-2"><LinkIcon className="w-4 h-4" /> Load URL</button>
        </div>

        <div
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) loadFromFile(f); }}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById('palette-file')?.click()}
          className="border-2 border-dashed border-border hover:border-pink-400 rounded-2xl p-8 cursor-pointer text-center"
        >
          <Upload className="mx-auto mb-2" />
          <p className="text-sm font-medium">Or drop / click to upload an image file (most reliable)</p>
          <input id="palette-file" type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && loadFromFile(e.target.files[0])} />
        </div>

        {preview && (
          <div className="pt-2">
            <img src={preview} alt="preview" className="rounded-2xl max-h-72 w-full object-contain border border-border bg-white" />
            <div className="flex gap-3 mt-4">
              <div className="flex-1">
                <label className="text-xs font-bold text-muted">Colors to extract</label>
                <input type="range" min={3} max={12} value={paletteSize} onChange={e => setPaletteSize(+e.target.value)} className="w-full accent-pink-600" />
                <div className="text-right text-sm">{paletteSize}</div>
              </div>
              <div className="flex items-end gap-2">
                <button onClick={handleExtract} disabled={loading} className="btn-primary">Extract / Re-extract</button>
                <button onClick={reset} className="btn-secondary"><RefreshCw className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        )}
        {error && <p className="text-sm text-rose-500">{error}</p>}
      </div>

      {result && result.colors.length > 0 && (
        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Dominant Colors</span>
            <div className="flex gap-2">
              <button onClick={copyAll} className="btn-secondary text-xs flex items-center gap-1"><Copy className="w-3.5 h-3.5" /> {copied === 'all' ? 'Copied!' : 'Copy all HEX'}</button>
              <button onClick={downloadPalette} className="btn-secondary text-xs flex items-center gap-1"><Download className="w-3.5 h-3.5" /> Export</button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {result.colors.map((c, i) => (
              <div key={i} onClick={() => copyColor(c.hex)} className="cursor-pointer group">
                <div className="h-20 rounded-2xl border border-border mb-2 relative overflow-hidden" style={{ background: c.hex }}>
                  {copied === c.hex && <div className="absolute inset-0 bg-black/70 text-white text-xs flex items-center justify-center">Copied {c.hex}</div>}
                </div>
                <div className="font-mono text-xs flex justify-between"><span>{c.hex}</span><span className="text-muted">{c.percentage}%</span></div>
                <div className="text-[10px] text-muted">rgb({c.rgb.r}, {c.rgb.g}, {c.rgb.b})</div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted mt-4">Click a swatch to copy HEX. URL loading can be blocked by CORS on many sites — upload is most reliable.</p>
        </div>
      )}
    </div>
  );
}
