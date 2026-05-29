'use client';

import { useState, useRef } from 'react';
import { Upload, Download, RefreshCw, Image as ImageIcon } from 'lucide-react';

export default function FaviconGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = () => {
    if (!image || !canvasRef.current) return;
    setLoading(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Draw to a 32x32 canvas for standard favicon
      canvas.width = 32;
      canvas.height = 32;
      
      // Clear and draw image scaled to fit
      ctx.clearRect(0, 0, 32, 32);
      ctx.drawImage(img, 0, 0, 32, 32);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'favicon.ico';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setLoading(false);
      }, 'image/x-icon');
    };
    img.src = image;
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm text-center">
        {!image ? (
          <label className="border-2 border-dashed border-border hover:border-blue-400 bg-background transition rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer group">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <Upload size={32} />
            </div>
            <h3 className="text-lg font-bold text-text">Upload an Image</h3>
            <p className="text-sm text-muted mt-1">PNG, JPG, or WebP. Square images work best.</p>
            <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleImageUpload} />
          </label>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="w-48 h-48 rounded-2xl border-4 border-background shadow-lg overflow-hidden relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setImage(null)}
                  className="absolute inset-0 bg-black/50 text-white font-bold opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                >
                  Change Image
                </button>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4 border-t border-border">
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-bold text-muted uppercase">32x32 Preview</p>
                <div className="w-8 h-8 rounded border border-border shadow-sm overflow-hidden bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="16x16" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-bold text-muted uppercase">16x16 Preview</p>
                <div className="w-4 h-4 rounded-sm border border-border shadow-sm overflow-hidden bg-white mt-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="32x32" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="pt-4">
               <button 
                onClick={handleGenerate} 
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-2xl transition inline-flex items-center gap-2"
              >
                {loading ? <RefreshCw size={20} className="animate-spin" /> : <Download size={20} />}
                Download favicon.ico
              </button>
            </div>
            
            {/* Hidden canvas for processing */}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-2xl p-4 flex gap-3 text-sm text-blue-800 dark:text-blue-300">
        <ImageIcon className="shrink-0" size={20} />
        <p><strong>Pro tip:</strong> A favicon is the small icon that appears in the browser tab next to your website title. For the best results, use an image with a transparent background and perfectly square dimensions (like 512x512).</p>
      </div>
    </div>
  );
}
