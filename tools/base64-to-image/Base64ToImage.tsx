'use client';

import { useState } from 'react';
import { isValidBase64 } from './utils';
import { Download, Copy, AlertTriangle } from 'lucide-react';

export default function Base64ToImage() {
  const [base64, setBase64] = useState('');
  const [error, setError] = useState(false);

  const imgSrc = base64.startsWith('data:image/') ? base64 : `data:image/png;base64,${base64.trim()}`;
  const valid = base64.length > 0 && !error && isValidBase64(base64);

  const handleDownload = () => {
    if (!valid) return;
    const a = document.createElement('a');
    a.href = imgSrc;
    a.download = 'decoded-image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Input */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-4 flex flex-col h-[500px]">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted">Base64 String</h2>
            <button 
              onClick={() => navigator.clipboard.readText().then(t => setBase64(t))}
              className="text-xs font-bold text-teal-600 hover:bg-teal-50 px-2 py-1 rounded transition"
            >
              Paste
            </button>
          </div>
          
          <textarea 
            value={base64}
            onChange={e => {
              setBase64(e.target.value);
              setError(false);
            }}
            placeholder="data:image/png;base64,iVBORw0KGgo..."
            className="tool-input flex-1 resize-none font-mono text-xs p-4 bg-background leading-relaxed"
            spellCheck="false"
          />
        </div>

        {/* Output */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm h-[500px] flex flex-col">
           <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted">Decoded Image</h2>
            {valid && (
              <button 
                onClick={handleDownload}
                className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition flex items-center gap-2 shadow-sm"
              >
                <Download size={14} /> Download Image
              </button>
            )}
          </div>

          <div className="flex-1 bg-checkered rounded-2xl border border-border overflow-hidden flex items-center justify-center relative">
            {!base64 ? (
              <div className="text-center text-muted">
                Paste a Base64 string to see the image
              </div>
            ) : !valid ? (
              <div className="text-center text-red-500 flex flex-col items-center gap-2">
                <AlertTriangle size={32} />
                <p className="text-sm font-bold">Invalid Base64 Image String</p>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={imgSrc} 
                alt="Decoded" 
                className="max-w-full max-h-full object-contain"
                onError={() => setError(true)}
              />
            )}
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .bg-checkered {
          background-color: var(--card);
          background-image: linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
        .dark .bg-checkered {
          background-image: linear-gradient(45deg, #374151 25%, transparent 25%), linear-gradient(-45deg, #374151 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #374151 75%), linear-gradient(-45deg, transparent 75%, #374151 75%);
        }
      `}} />
    </div>
  );
}
