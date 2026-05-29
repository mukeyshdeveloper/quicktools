'use client';

import { useState, useCallback, useRef } from 'react';
import { extractPalette, formatBytes, type ExtractedColor, type PaletteResult } from './utils';
import { Upload, Copy, Check, RotateCcw, Palette } from 'lucide-react';

export default function ColorPaletteExtractor() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<PaletteResult | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [paletteSize, setPaletteSize] = useState(8);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith('image/')) { setError('Please upload a valid image file.'); return; }
    setFile(f); setError(null); setResult(null);
    setPreview(URL.createObjectURL(f));
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0]; if (f) handleFile(f);
  }, [handleFile]);

  const handleExtract = async () => {
    if (!file) return;
    setProcessing(true); setError(null);
    try {
      const r = await extractPalette(file, paletteSize);
      setResult(r);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Extraction failed.');
    } finally { setProcessing(false); }
  };

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 2000);
    });
  };

  const copyAllHex = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.colors.map(c => c.hex).join(', ')).then(() => {
      setCopiedHex('all');
      setTimeout(() => setCopiedHex(null), 2000);
    });
  };

  const handleReset = () => { setFile(null); setPreview(null); setResult(null); setError(null); };

  const getLuminance = (hex: string): number => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return 0.299 * r + 0.587 * g + 0.114 * b;
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current?.click()}
          className={`group flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed transition-all cursor-pointer min-h-[280px] ${dragging ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-pink-400 hover:bg-pink-50/40 dark:hover:bg-pink-900/10'}`}
        >
          <div className="p-5 rounded-2xl bg-pink-100 dark:bg-pink-900/30 text-pink-500 group-hover:scale-110 transition-transform">
            <Palette size={40} />
          </div>
          <div className="text-center">
            <p className="text-base font-bold text-gray-700 dark:text-gray-300">Drop any image here</p>
            <p className="text-sm text-gray-500 mt-1">or <span className="text-pink-500 font-semibold">click to browse</span></p>
            <p className="text-xs text-gray-400 mt-2">Extract dominant colors as hex codes — no server upload</p>
          </div>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left: image + controls */}
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm space-y-5">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Image</span>
              <button onClick={handleReset} className="text-xs font-bold text-gray-400 hover:text-red-500 transition flex items-center gap-1"><RotateCcw size={12} /> New Image</button>
            </div>

            {preview && (
              <div className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-video flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Source" className="max-h-full max-w-full object-contain" />
              </div>
            )}

            <p className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2 flex justify-between">
              <span className="truncate">{file.name}</span>
              <span className="font-semibold ml-2 shrink-0">{formatBytes(file.size)}</span>
            </p>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Colors to Extract</label>
                <span className="text-sm font-bold text-pink-500">{paletteSize}</span>
              </div>
              <input type="range" min={4} max={16} value={paletteSize} onChange={e => setPaletteSize(Number(e.target.value))} className="w-full accent-pink-500" />
              <div className="flex justify-between text-[10px] text-gray-400"><span>4 colors</span><span>16 colors</span></div>
            </div>

            <button onClick={handleExtract} disabled={processing} className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 text-white font-bold text-sm shadow-sm transition disabled:opacity-60">
              {processing ? 'Analyzing image…' : 'Extract Color Palette'}
            </button>
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>

          {/* Right: palette */}
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm space-y-5">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Palette size={16} className="text-pink-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Palette</span>
              </div>
              {result && (
                <button onClick={copyAllHex} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold transition">
                  {copiedHex === 'all' ? <Check size={12} /> : <Copy size={12} />}
                  {copiedHex === 'all' ? 'Copied!' : 'Copy All'}
                </button>
              )}
            </div>

            {!result ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-400 text-sm italic">
                <Palette size={40} className="opacity-20 mb-3" />
                Color palette will appear here
              </div>
            ) : (
              <div className="space-y-3">
                {/* Color strip */}
                <div className="flex rounded-2xl overflow-hidden h-14 shadow-sm">
                  {result.colors.map((c, i) => (
                    <div
                      key={i}
                      className="flex-1 cursor-pointer hover:scale-y-110 transition-transform origin-bottom"
                      style={{ backgroundColor: c.hex }}
                      onClick={() => copyHex(c.hex)}
                      title={c.hex}
                    />
                  ))}
                </div>

                {/* Color cards */}
                <div className="grid grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {result.colors.map((color: ExtractedColor, i) => {
                    const dark = getLuminance(color.hex) < 0.5;
                    return (
                      <button
                        key={i}
                        onClick={() => copyHex(color.hex)}
                        className="group flex items-center gap-3 p-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/80 hover:border-pink-300 dark:hover:border-pink-700 transition text-left"
                      >
                        <div
                          className="w-10 h-10 rounded-xl shrink-0 shadow-sm flex items-center justify-center"
                          style={{ backgroundColor: color.hex }}
                        >
                          {copiedHex === color.hex && (
                            <Check size={16} style={{ color: dark ? '#fff' : '#000' }} />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-black text-gray-800 dark:text-gray-100 font-mono">{color.hex}</p>
                          <p className="text-[10px] text-gray-400">
                            rgb({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
                          </p>
                          <p className="text-[10px] font-semibold text-pink-500">{color.percentage}% of image</p>
                        </div>
                        <Copy size={12} className="ml-auto text-gray-300 group-hover:text-pink-400 shrink-0 transition" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
