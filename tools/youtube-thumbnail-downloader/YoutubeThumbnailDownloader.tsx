'use client';

import { useState } from 'react';
import { parseYoutubeId, getThumbnails, type YouTubeThumbnails } from './utils';
import { Download, Play } from 'lucide-react';

export default function YoutubeThumbnailDownloader() {
  const [url, setUrl] = useState('');
  const [thumbnails, setThumbnails] = useState<YouTubeThumbnails | null>(null);

  const handleFetch = () => {
    const id = parseYoutubeId(url);
    if (id) {
      setThumbnails(getThumbnails(id));
    } else {
      setThumbnails(null);
    }
  };

  const handleDownload = async (imgUrl: string, quality: string) => {
    try {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `youtube-thumbnail-${quality}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      // Fallback for CORS if fetching directly fails
      window.open(imgUrl, '_blank');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <label className="text-sm font-bold uppercase tracking-widest text-muted block text-center">Paste YouTube Video URL</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            placeholder="https://www.youtube.com/watch?v=..." 
            value={url} 
            onChange={e => { setUrl(e.target.value); if(e.target.value) setTimeout(handleFetch, 100); }} 
            className="tool-input flex-1 !text-lg !py-4" 
          />
          <button 
            onClick={handleFetch} 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-2xl transition flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Play size={20} /> Get Thumbnails
          </button>
        </div>
      </div>

      {thumbnails && (
        <div className="space-y-8">
          {/* Max Res */}
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-text">HD Quality (Max Res)</h3>
              <button onClick={() => handleDownload(thumbnails.maxres, 'hd')} className="btn-primary !bg-red-600 hover:!bg-red-700 flex items-center gap-2 !py-2 !px-4 !text-xs">
                <Download size={14} /> Download
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border bg-black aspect-video flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumbnails.maxres} alt="HD Thumbnail" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* High Quality */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm text-text">High Quality (SD)</h3>
                <button onClick={() => handleDownload(thumbnails.hq, 'hq')} className="btn-secondary flex items-center gap-2 !py-1.5 !px-3 !text-xs">
                  <Download size={12} /> Save
                </button>
              </div>
              <div className="rounded-xl overflow-hidden border border-border bg-black aspect-video flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumbnails.hq} alt="HQ Thumbnail" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Medium Quality */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm text-text">Medium Quality</h3>
                <button onClick={() => handleDownload(thumbnails.mq, 'mq')} className="btn-secondary flex items-center gap-2 !py-1.5 !px-3 !text-xs">
                  <Download size={12} /> Save
                </button>
              </div>
              <div className="rounded-xl overflow-hidden border border-border bg-black aspect-video flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumbnails.mq} alt="MQ Thumbnail" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
