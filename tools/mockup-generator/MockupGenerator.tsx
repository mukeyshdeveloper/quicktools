'use client';

import { useState, useEffect } from 'react';
import { generateMockup, getDeviceColors, type DeviceType } from './utils';
import { Download, RefreshCw, Image as ImageIcon } from 'lucide-react';

const DEVICE_LABELS: Record<DeviceType, string> = {
  iphone: 'iPhone (Modern)',
  macbook: 'Laptop / MacBook',
};

export default function MockupGenerator() {
  const [source, setSource] = useState<string | null>(null);
  const [device, setDevice] = useState<DeviceType>('iphone');
  const [color, setColor] = useState('black');
  const [shadow, setShadow] = useState(true);
  const [bgColor, setBgColor] = useState('#f1f5f9');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const colors = getDeviceColors();

  async function generate() {
    if (!source) return;
    setLoading(true);
    setError('');
    try {
      const r = await generateMockup(source, { device, color, shadow, bgColor });
      setResult(r.dataUrl);
    } catch (e: any) {
      setError(e.message || 'Failed to generate mockup');
    } finally {
      setLoading(false);
    }
  }

  // Auto regenerate when options change (if source exists)
  useEffect(() => {
    if (source) {
      const t = setTimeout(generate, 80);
      return () => clearTimeout(t);
    }
  }, [source, device, color, shadow, bgColor]);

  function handleUpload(file: File) {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setSource(e.target?.result as string);
      setResult(null);
      setError('');
    };
    reader.readAsDataURL(file);
  }

  function download() {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result;
    a.download = `mockup-${device}.png`;
    a.click();
  }

  function reset() {
    setSource(null);
    setResult(null);
    setError('');
  }

  return (
    <div className="space-y-6">
      {!source ? (
        <label
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleUpload(f); }}
          onDragOver={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-border hover:border-brand rounded-3xl p-16 bg-card cursor-pointer text-center"
        >
          <div className="p-4 rounded-2xl bg-indigo-100 text-indigo-600"><ImageIcon size={42} /></div>
          <div>
            <p className="font-semibold">Drop your screenshot or photo</p>
            <p className="text-sm text-muted">or click to upload • JPG / PNG / WebP</p>
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0])} />
        </label>
      ) : (
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 bg-card border border-border rounded-3xl p-6 space-y-6">
            <div>
              <div className="text-xs font-bold text-muted mb-2">DEVICE</div>
              <div className="flex gap-2">
                {(['iphone', 'macbook'] as DeviceType[]).map(d => (
                  <button key={d} onClick={() => setDevice(d)} className={`flex-1 py-2 rounded-2xl text-sm border ${device === d ? 'bg-brand text-white border-brand' : 'border-border hover:bg-background'}`}>
                    {DEVICE_LABELS[d]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-muted mb-2">DEVICE COLOR</div>
              <div className="flex flex-wrap gap-2">
                {colors.map(c => (
                  <button key={c} onClick={() => setColor(c)} className={`w-9 h-9 rounded-2xl border-2 ${color === c ? 'border-brand scale-110' : 'border-transparent'}`} style={{ background: c === 'silver' ? '#c8c9cd' : c === 'gold' ? '#d4af37' : c === 'black' ? '#111' : c === 'midnight' ? '#1e2937' : c === 'blue' ? '#0a4c8a' : '#3b2a5e' }} title={c} />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={shadow} onChange={e => setShadow(e.target.checked)} /> Soft shadow
              </label>
            </div>

            <div>
              <label className="text-xs font-bold text-muted">Background</label>
              <div className="flex gap-2 mt-1">
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="h-10 w-16 p-0.5 bg-background rounded border border-border" />
                <button onClick={() => setBgColor('#f1f5f9')} className="text-xs btn-secondary">Light</button>
                <button onClick={() => setBgColor('#0f172a')} className="text-xs btn-secondary">Dark</button>
                <button onClick={() => setBgColor('transparent')} className="text-xs btn-secondary">Transparent</button>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={reset} className="btn-secondary flex-1 flex items-center justify-center gap-2"><RefreshCw className="w-4 h-4" /> New Image</button>
              <button onClick={download} disabled={!result} className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"><Download className="w-4 h-4" /> Download PNG</button>
            </div>

            {error && <p className="text-sm text-rose-500">{error}</p>}
          </div>

          {/* Preview */}
          <div className="lg:col-span-7 bg-card border border-border rounded-3xl p-6 flex items-center justify-center min-h-[420px] relative overflow-hidden">
            {loading && <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10"><RefreshCw className="animate-spin text-brand" /></div>}

            {result ? (
              <img src={result} alt="Mockup preview" className="max-h-[520px] object-contain rounded-xl shadow" />
            ) : source ? (
              <div className="text-center text-muted">
                <p>Adjust options on the left — preview updates live</p>
                <img src={source} alt="source" className="mt-4 max-h-40 opacity-40 mx-auto" />
              </div>
            ) : null}
          </div>
        </div>
      )}

      <p className="text-center text-xs text-muted">High-quality 2× retina renders. Your image never leaves the browser.</p>
    </div>
  );
}
