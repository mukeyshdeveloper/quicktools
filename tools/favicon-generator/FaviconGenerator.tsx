'use client';

import { useState } from 'react';
import { generateIcons, buildManifestSnippet, WEB_SIZES, APP_SIZES, type GeneratedIcon } from './utils';
import { Upload, Download, Copy } from 'lucide-react';

export default function FaviconGenerator() {
  const [source, setSource] = useState<string | null>(null);
  const [icons, setIcons] = useState<GeneratedIcon[]>([]);
  const [manifest, setManifest] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleUpload(file: File) {
    const r = new FileReader();
    r.onload = e => {
      setSource(e.target?.result as string);
      setIcons([]);
      setManifest('');
    };
    r.readAsDataURL(file);
  }

  async function generateAll() {
    if (!source) return;
    setLoading(true);
    try {
      const allSizes = [...WEB_SIZES, ...APP_SIZES];
      const generated = await generateIcons(source, allSizes);
      setIcons(generated);
      setManifest(buildManifestSnippet(generated));
    } catch (e) {
      alert('Failed to generate icons');
    } finally {
      setLoading(false);
    }
  }

  function download(icon: GeneratedIcon) {
    const a = document.createElement('a');
    a.href = icon.dataUrl;
    a.download = icon.name;
    a.click();
  }

  function downloadAll() {
    icons.forEach((ic, i) => setTimeout(() => download(ic), i * 70));
  }

  function copyManifest() {
    if (!manifest) return;
    navigator.clipboard.writeText(manifest);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="space-y-6">
      {!source ? (
        <label onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleUpload(f); }} onDragOver={e => e.preventDefault()}
          className="border-2 border-dashed border-border rounded-3xl p-12 text-center bg-card cursor-pointer block" onClick={() => document.getElementById('fav-file')?.click()}>
          <Upload className="mx-auto mb-3" />
          <p className="font-semibold">Upload a square source image (512×512 or larger recommended)</p>
          <p className="text-xs text-muted mt-1">PNG with transparency works best for app icons</p>
          <input id="fav-file" type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0])} />
        </label>
      ) : (
        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <img src={source} alt="source" className="w-40 h-40 object-contain rounded-2xl border border-border bg-white" />
            <div className="flex-1 space-y-3">
              <p className="text-sm">Source loaded. We will generate web favicons + PWA / Apple touch icons.</p>
              <button onClick={generateAll} disabled={loading} className="btn-primary">Generate All Icons (16×16 → 512×512)</button>
              <button onClick={() => { setSource(null); setIcons([]); setManifest(''); }} className="text-xs ml-3 text-muted">Change image</button>
            </div>
          </div>
        </div>
      )}

      {icons.length > 0 && (
        <>
          <div className="bg-card border border-border rounded-3xl p-6">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Generated Icons ({icons.length})</span>
              <button onClick={downloadAll} className="btn-primary text-sm flex items-center gap-2"><Download className="w-4 h-4" /> Download All PNGs</button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-4">
              {icons.map((ic, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-white border border-border rounded-2xl p-2 mb-1.5 flex items-center justify-center" style={{ height: Math.min(92, ic.size + 16) }}>
                    <img src={ic.dataUrl} alt={ic.name} style={{ width: Math.min(72, ic.size), height: Math.min(72, ic.size) }} />
                  </div>
                  <div className="text-[10px] font-mono text-muted">{ic.size}×{ic.size}</div>
                  <button onClick={() => download(ic)} className="text-xs text-brand mt-0.5">Download</button>
                </div>
              ))}
            </div>
          </div>

          {manifest && (
            <div className="bg-card border border-border rounded-3xl p-6">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">PWA manifest.json snippet</span>
                <button onClick={copyManifest} className="btn-secondary text-xs flex items-center gap-1"><Copy className="w-3.5 h-3.5" /> {copied ? 'Copied!' : 'Copy'}</button>
              </div>
              <pre className="bg-background p-4 rounded-2xl text-xs overflow-auto border border-border">{manifest}</pre>
              <p className="text-[10px] text-muted mt-2">Place the downloaded PNGs in your /public or static folder and reference them from your index.html as well.</p>
            </div>
          )}
        </>
      )}

      <p className="text-center text-xs text-muted">Generates proper sizes for classic favicons, Apple touch icons, and modern PWA / Android icons. All local.</p>
    </div>
  );
}
