'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, Download, RefreshCcw } from 'lucide-react';

export default function MemeGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [topText, setTopText] = useState('TOP TEXT');
  const [bottomText, setBottomText] = useState('BOTTOM TEXT');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!image || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Calculate aspect ratio to fit within max width of 600px while maintaining ratio
      const maxWidth = 800;
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw background image
      ctx.drawImage(img, 0, 0, width, height);

      // Setup Text rendering (Impact font style)
      const fontSize = Math.floor(width / 10);
      ctx.font = `900 ${fontSize}px Impact, "Arial Black", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = Math.floor(fontSize / 15);
      ctx.lineJoin = 'round';

      const drawText = (text: string, x: number, y: number) => {
        const textUpper = text.toUpperCase();
        // Add a slight shadow/glow for better readability
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.strokeText(textUpper, x, y);
        
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.fillText(textUpper, x, y);
        ctx.strokeText(textUpper, x, y); // Stroke again to sharpen edges
      };

      if (topText) {
        drawText(topText, width / 2, fontSize + 10);
      }
      
      if (bottomText) {
        drawText(bottomText, width / 2, height - 20);
      }
    };
    img.src = image;
  }, [image, topText, bottomText]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/jpeg', 0.9);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meme.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Editor Sidebar */}
        <div className="md:col-span-4 bg-card border border-border rounded-3xl p-6 shadow-sm space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted border-b border-border pb-3">Meme Editor</h2>
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-text">Top Text</label>
              <textarea 
                rows={2}
                value={topText} 
                onChange={e => setTopText(e.target.value)} 
                className="tool-input resize-none" 
                placeholder="Top text..."
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-text">Bottom Text</label>
              <textarea 
                rows={2}
                value={bottomText} 
                onChange={e => setBottomText(e.target.value)} 
                className="tool-input resize-none" 
                placeholder="Bottom text..."
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-3">
            <label className="btn-secondary w-full flex items-center justify-center gap-2 cursor-pointer">
              <Upload size={16} /> Choose New Image
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
            
            <button 
              onClick={handleDownload} 
              disabled={!image}
              className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white w-full py-3 rounded-xl font-bold transition flex items-center justify-center gap-2"
            >
              <Download size={18} /> Download Meme
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="md:col-span-8 bg-card border border-border rounded-3xl p-4 sm:p-8 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
          {!image ? (
            <div className="text-center space-y-4 max-w-sm">
              <div className="inline-flex p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-500 rounded-full">
                <RefreshCcw size={32} />
              </div>
              <h3 className="text-xl font-bold text-text">Select an image to start</h3>
              <p className="text-sm text-muted">Upload a photo to add the classic white Impact text with black borders.</p>
              <label className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold transition inline-block cursor-pointer shadow-md mt-2">
                Select Photo
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          ) : (
            <div ref={containerRef} className="w-full overflow-hidden flex justify-center bg-checkered rounded-xl border border-border">
              <canvas 
                ref={canvasRef} 
                className="max-w-full h-auto object-contain shadow-lg"
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
