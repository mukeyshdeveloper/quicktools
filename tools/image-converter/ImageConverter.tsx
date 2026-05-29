'use client';

import { useState, useCallback, useRef } from 'react';
import { convertImageFormat, formatBytes, type OutputFormat, type ConvertResult } from './utils';
import { Upload, Download, ArrowRightLeft, RotateCcw } from 'lucide-react';

const FORMATS: { value: OutputFormat; label: string; desc: string }[] = [
  { value: 'image/webp', label: 'WebP', desc: 'Best compression, modern browsers' },
  { value: 'image/jpeg', label: 'JPEG', desc: 'Universal, smaller files' },
  { value: 'image/png',  label: 'PNG',  desc: 'Lossless, supports transparency' },
];

export default function ImageConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ConvertResult | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('image/webp');
  const [quality, setQuality] = useState(0.9);
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

  const handleConvert = async () => {
    if (!file) return;
    setProcessing(true); setError(null);
    try {
      const r = await convertImageFormat(file, outputFormat, quality);
      setResult(r);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Conversion failed.');
    } finally { setProcessing(false); }
  };

  const handleDownload = () => {
    if (!result) return;
    const ext = outputFormat.split('/')[1];
    const a = document.createElement('a');
    a.href = result.dataUrl; a.download = `converted.${ext}`; a.click();
  };

  const handleReset = () => { setFile(null); setPreview(null); setResult(null); setError(null); };

  const sourceType = file?.type.split('/')[1]?.toUpperCase() ?? '';

  return (
    <div className="space-y-6">
      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current?.click()}
          className={`group flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed transition-all cursor-pointer min-h-[280px] ${dragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50/40 dark:hover:bg-blue-900/10'}`}
        >
          <div className="p-5 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-500 group-hover:scale-110 transition-transform">
            <ArrowRightLeft size={40} />
          </div>
          <div className="text-center">
            <p className="text-base font-bold text-gray-700 dark:text-gray-300">Drop your image here</p>
            <p className="text-sm text-gray-500 mt-1">or <span className="text-blue-500 font-semibold">click to browse</span></p>
            <p className="text-xs text-gray-400 mt-2">JPG, PNG, WebP, GIF — converted in your browser</p>
          </div>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: source + settings */}
          <div className="lg:col-span-5 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm space-y-5">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Source — {sourceType}</span>
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

            {/* Output format picker */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Convert To</label>
              <div className="space-y-2">
                {FORMATS.filter(f => f.value !== file.type).map(fmt => (
                  <button key={fmt.value} onClick={() => setOutputFormat(fmt.value)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl border text-left transition ${outputFormat === fmt.value ? 'bg-blue-500 border-blue-500 text-white' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400'}`}>
                    <span className={`text-sm font-black px-2 py-0.5 rounded-lg ${outputFormat === fmt.value ? 'bg-white/20' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'}`}>{fmt.label}</span>
                    <span className={`text-xs ${outputFormat === fmt.value ? 'text-blue-100' : 'text-gray-500'}`}>{fmt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {outputFormat !== 'image/png' && (
              <div className="space-y-2">
                <div className="flex justify-between"><label className="text-sm font-medium text-gray-700 dark:text-gray-300">Quality</label><span className="text-sm font-bold text-blue-500">{Math.round(quality * 100)}%</span></div>
                <input type="range" min={10} max={100} value={Math.round(quality * 100)} onChange={e => setQuality(Number(e.target.value) / 100)} className="w-full accent-blue-500" />
              </div>
            )}

            <button onClick={handleConvert} disabled={processing} className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-sm shadow-sm transition disabled:opacity-60">{processing ? 'Converting…' : 'Convert Image'}</button>
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
            <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-500">
              <ArrowRightLeft size={28} />
            </div>
          </div>

          {/* Right: result */}
          <div className="lg:col-span-5 bg-blue-50/50 dark:bg-blue-900/10 backdrop-blur-xl rounded-3xl border border-blue-200/50 dark:border-blue-800/30 p-6 shadow-sm space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Output — {result?.format ?? '?'}</span>
            {!result ? (
              <div className="flex flex-col items-center justify-center min-h-[280px] text-gray-400 text-sm italic"><ArrowRightLeft size={40} className="opacity-20 mb-3" />Converted image will appear here</div>
            ) : (
              <div className="space-y-4 pt-2">
                <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-blue-100 dark:border-blue-800 aspect-video flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={result.dataUrl} alt="Converted" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-3 border border-blue-100 dark:border-blue-800/50"><p className="text-[10px] font-bold uppercase text-gray-400">Before</p><p className="text-lg font-black text-gray-700 dark:text-gray-200">{formatBytes(result.originalSize)}</p></div>
                  <div className="bg-blue-500 rounded-2xl p-3"><p className="text-[10px] font-bold uppercase text-blue-100">After</p><p className="text-lg font-black text-white">{formatBytes(result.newSize)}</p></div>
                </div>
                <p className="text-xs text-center text-gray-500">{result.width} × {result.height}px</p>
                <button onClick={handleDownload} className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-sm hover:opacity-90 transition"><Download size={16} /> Download {result.format}</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
