'use client';

import { useState, useCallback, useRef } from 'react';
import { compressImage, formatBytes, type CompressOptions, type CompressResult } from './utils';
import { Upload, Download, ImageIcon, Settings2, RotateCcw } from 'lucide-react';

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [options, setOptions] = useState<CompressOptions>({
    quality: 0.8,
    maxWidth: 1920,
    maxHeight: 1920,
    outputFormat: 'image/jpeg',
  });

  const handleFile = useCallback(async (f: File) => {
    if (!f.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }
    setFile(f);
    setError(null);
    setResult(null);
    setPreview(URL.createObjectURL(f));
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleCompress = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const r = await compressImage(file, options);
      setResult(r);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Compression failed.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const ext = options.outputFormat.split('/')[1];
    const a = document.createElement('a');
    a.href = result.dataUrl;
    a.download = `compressed.${ext}`;
    a.click();
  };

  const handleReset = () => { setFile(null); setPreview(null); setResult(null); setError(null); };

  const savings = result ? Math.round(((result.originalSize - result.compressedSize) / result.originalSize) * 100) : 0;

  return (
    <div className="space-y-6">
      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current?.click()}
          className={`group flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed transition-all cursor-pointer min-h-[280px] ${dragging ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-orange-400 hover:bg-orange-50/40 dark:hover:bg-orange-900/10'}`}
        >
          <div className="p-5 rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-500 group-hover:scale-110 transition-transform">
            <Upload size={40} />
          </div>
          <div className="text-center">
            <p className="text-base font-bold text-gray-700 dark:text-gray-300">Drop your image here</p>
            <p className="text-sm text-gray-500 mt-1">or <span className="text-orange-500 font-semibold">click to browse</span></p>
            <p className="text-xs text-gray-400 mt-2">JPG, PNG, WebP — processed entirely in your browser</p>
          </div>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Settings */}
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm space-y-5">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2"><Settings2 size={16} className="text-orange-500" /><span className="text-xs font-bold uppercase tracking-widest text-gray-400">Settings</span></div>
              <button onClick={handleReset} className="text-xs font-bold text-gray-400 hover:text-red-500 transition flex items-center gap-1"><RotateCcw size={12} /> New Image</button>
            </div>
            {preview && (
              <div className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-video flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Original preview" className="max-h-full max-w-full object-contain" />
              </div>
            )}
            <p className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2 flex justify-between"><span className="truncate">{file.name}</span><span className="font-semibold ml-2 shrink-0">{formatBytes(file.size)}</span></p>
            <div className="space-y-2">
              <div className="flex justify-between"><label className="text-sm font-medium text-gray-700 dark:text-gray-300">Quality</label><span className="text-sm font-bold text-orange-500">{Math.round(options.quality * 100)}%</span></div>
              <input type="range" min={10} max={100} value={Math.round(options.quality * 100)} onChange={e => setOptions({ ...options, quality: Number(e.target.value) / 100 })} className="w-full accent-orange-500" />
              <div className="flex justify-between text-[10px] text-gray-400"><span>Smaller file</span><span>Better quality</span></div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Output Format</label>
              <div className="grid grid-cols-3 gap-2">
                {(['image/jpeg', 'image/png', 'image/webp'] as const).map(fmt => (
                  <button key={fmt} onClick={() => setOptions({ ...options, outputFormat: fmt })} className={`py-2 rounded-xl text-xs font-bold border transition ${options.outputFormat === fmt ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-orange-400'}`}>{fmt.split('/')[1]!.toUpperCase()}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700 dark:text-gray-300">Max Width</label><input type="number" min={100} max={8000} value={options.maxWidth} onChange={e => setOptions({ ...options, maxWidth: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-orange-500" /></div>
              <div className="space-y-1.5"><label className="text-sm font-medium text-gray-700 dark:text-gray-300">Max Height</label><input type="number" min={100} max={8000} value={options.maxHeight} onChange={e => setOptions({ ...options, maxHeight: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-orange-500" /></div>
            </div>
            <button onClick={handleCompress} disabled={processing} className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-sm transition disabled:opacity-60">{processing ? 'Compressing…' : 'Compress Image'}</button>
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>

          {/* Result */}
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-800"><ImageIcon size={16} className="text-orange-500" /><span className="text-xs font-bold uppercase tracking-widest text-gray-400">Result</span></div>
            {!result ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-400 text-sm italic"><ImageIcon size={40} className="opacity-20 mb-3" />Output will appear after compression</div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-video flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={result.dataUrl} alt="Compressed" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 text-center"><p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Original</p><p className="text-xl font-black text-gray-800 dark:text-white mt-1">{formatBytes(result.originalSize)}</p></div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-4 text-center"><p className="text-[10px] font-bold uppercase tracking-wider text-orange-400">Compressed</p><p className="text-xl font-black text-orange-500 mt-1">{formatBytes(result.compressedSize)}</p></div>
                </div>
                <div className={`rounded-2xl p-4 text-center font-bold text-white ${savings > 0 ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gray-400'}`}>{savings > 0 ? `🎉 ${savings}% smaller!` : 'Try lowering quality for smaller size'}</div>
                <p className="text-xs text-gray-500 text-center">{result.width} × {result.height}px · {result.format}</p>
                <button onClick={handleDownload} className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-sm hover:opacity-90 transition"><Download size={16} /> Download Compressed Image</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
