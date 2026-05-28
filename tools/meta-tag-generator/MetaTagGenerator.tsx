'use client';

import { useState, useEffect } from 'react';
import { generateMetaTags, type MetaTagParams } from './utils';
import { Copy, Check, Globe, MessageCircle, Users, Code } from 'lucide-react';
import ResetButton from '@/components/ui/ResetButton';

export default function MetaTagGenerator() {
  const [params, setParams] = useState<MetaTagParams>({
    title: 'QuickUtils - Fast Developer Tools',
    description: 'Free, fast, offline-capable developer tools. No ads, no tracking, just pure utility.',
    image: 'https://quickutils.in/og-default.png',
    url: 'https://quickutils.in',
    author: 'QuickUtils Team',
    keywords: 'developer tools, seo, utilities',
    allowRobots: true,
    themeColor: '#4f46e5',
  });

  const [activePreview, setActivePreview] = useState<'google' | 'twitter' | 'facebook' | 'code'>('google');
  const [outputHtml, setOutputHtml] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOutputHtml(generateMetaTags(params));
  }, [params]);

  const updateParam = (key: keyof MetaTagParams, value: string | boolean) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const resetAll = () => {
    setParams({
      title: '',
      description: '',
      image: '',
      url: '',
      author: '',
      keywords: '',
      allowRobots: true,
      themeColor: '#ffffff',
    });
  };

  const copyHtml = () => {
    navigator.clipboard.writeText(outputHtml).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Input Form (Left - 5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Site Details
            </span>
            <ResetButton onClick={resetAll} />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="text-xs font-bold text-gray-600 dark:text-gray-400">Title</label>
              <span className={`text-[10px] ${params.title.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>
                {params.title.length} / 60
              </span>
            </div>
            <input
              type="text"
              value={params.title}
              onChange={(e) => updateParam('title', e.target.value)}
              placeholder="Page Title"
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="text-xs font-bold text-gray-600 dark:text-gray-400">Description</label>
              <span className={`text-[10px] ${params.description.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
                {params.description.length} / 160
              </span>
            </div>
            <textarea
              value={params.description}
              onChange={(e) => updateParam('description', e.target.value)}
              placeholder="Brief description of the page..."
              className="w-full h-24 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-400">Image URL</label>
            <input
              type="text"
              value={params.image}
              onChange={(e) => updateParam('image', e.target.value)}
              placeholder="https://example.com/og-image.jpg"
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-400">Site URL</label>
            <input
              type="text"
              value={params.url}
              onChange={(e) => updateParam('url', e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 dark:text-gray-400">Author</label>
              <input
                type="text"
                value={params.author}
                onChange={(e) => updateParam('author', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-600 dark:text-gray-400">Theme Color</label>
              <input
                type="color"
                value={params.themeColor}
                onChange={(e) => updateParam('themeColor', e.target.value)}
                className="w-full h-10 px-1 py-1 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-400">Keywords (Comma separated)</label>
            <input
              type="text"
              value={params.keywords}
              onChange={(e) => updateParam('keywords', e.target.value)}
              placeholder="tools, seo, web"
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={params.allowRobots}
                onChange={(e) => updateParam('allowRobots', e.target.checked)}
                className="accent-orange-500 w-4 h-4 rounded"
              />
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Allow search engines to index this page</span>
            </label>
          </div>
        </div>
      </div>

      {/* Previews (Right - 7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* View Tabs */}
        <div className="flex flex-wrap gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl w-fit border border-gray-200/50 dark:border-gray-700/50">
          <button onClick={() => setActivePreview('google')} className={`px-4 py-2 flex items-center gap-1.5 text-sm font-bold rounded-xl transition ${activePreview === 'google' ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'}`}>
            <Globe size={16} /> Google
          </button>
          <button onClick={() => setActivePreview('twitter')} className={`px-4 py-2 flex items-center gap-1.5 text-sm font-bold rounded-xl transition ${activePreview === 'twitter' ? 'bg-white dark:bg-gray-900 text-sky-500 shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'}`}>
            <MessageCircle size={16} /> Twitter
          </button>
          <button onClick={() => setActivePreview('facebook')} className={`px-4 py-2 flex items-center gap-1.5 text-sm font-bold rounded-xl transition ${activePreview === 'facebook' ? 'bg-white dark:bg-gray-900 text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'}`}>
            <Users size={16} /> Facebook
          </button>
          <button onClick={() => setActivePreview('code')} className={`px-4 py-2 flex items-center gap-1.5 text-sm font-bold rounded-xl transition ${activePreview === 'code' ? 'bg-white dark:bg-gray-900 text-orange-500 shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'}`}>
            <Code size={16} /> HTML Code
          </button>
        </div>

        {/* Live Preview Container */}
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm min-h-[400px]">
          
          {activePreview === 'google' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">Google Search Preview</h3>
              <div className="bg-white dark:bg-[#202124] p-5 rounded-xl border border-gray-200 dark:border-gray-700 max-w-[600px] shadow-sm">
                <div className="text-[14px] text-[#202124] dark:text-[#dadce0] truncate mb-1">
                  {params.url || 'https://example.com'}
                </div>
                <div className="text-[20px] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer truncate mb-1 font-medium leading-tight">
                  {params.title || 'Page Title'}
                </div>
                <div className="text-[14px] text-[#4d5156] dark:text-[#bdc1c6] leading-snug line-clamp-2">
                  {params.description || 'Provide a page description to see it appear in search results.'}
                </div>
              </div>
            </div>
          )}

          {activePreview === 'twitter' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">Twitter Card Preview</h3>
              <div className="bg-white dark:bg-black p-0 rounded-2xl border border-gray-200 dark:border-gray-700 max-w-[500px] overflow-hidden shadow-sm">
                <div className="w-full h-[260px] bg-gray-200 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 relative">
                   {params.image ? (
                     // eslint-disable-next-line @next/next/no-img-element
                     <img src={params.image} alt="" className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                   )}
                </div>
                <div className="p-3 bg-gray-50 dark:bg-[#16181c]">
                  <div className="text-[15px] text-[#536471] dark:text-[#71767b] truncate mb-0.5">
                    {params.url ? new URL(params.url.startsWith('http') ? params.url : `https://${params.url}`).hostname : 'example.com'}
                  </div>
                  <div className="text-[15px] font-bold text-[#0f1419] dark:text-[#e7e9ea] truncate mb-0.5">
                    {params.title || 'Page Title'}
                  </div>
                  <div className="text-[15px] text-[#536471] dark:text-[#71767b] truncate">
                    {params.description || 'Page Description'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePreview === 'facebook' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">Facebook & LinkedIn Preview</h3>
              <div className="bg-[#f0f2f5] dark:bg-[#242526] p-4 rounded-xl border border-gray-200 dark:border-gray-700 max-w-[520px] shadow-sm">
                <div className="bg-white dark:bg-[#18191a] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="w-full h-[270px] bg-gray-200 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 relative">
                     {params.image ? (
                       // eslint-disable-next-line @next/next/no-img-element
                       <img src={params.image} alt="" className="w-full h-full object-cover" />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                     )}
                  </div>
                  <div className="px-4 py-3 bg-[#f0f2f5] dark:bg-[#242526]">
                    <div className="text-[12px] uppercase text-[#65676b] dark:text-[#b0b3b8] mb-1 truncate">
                       {params.url ? new URL(params.url.startsWith('http') ? params.url : `https://${params.url}`).hostname : 'EXAMPLE.COM'}
                    </div>
                    <div className="text-[16px] font-semibold text-[#050505] dark:text-[#e4e6eb] truncate leading-tight mb-1">
                      {params.title || 'Page Title'}
                    </div>
                    <div className="text-[14px] text-[#65676b] dark:text-[#b0b3b8] line-clamp-1">
                      {params.description || 'Page Description'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePreview === 'code' && (
            <div className="space-y-4 h-full flex flex-col">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">Generated HTML Meta Tags</h3>
                <button
                  onClick={copyHtml}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied to Clipboard' : 'Copy HTML'}
                </button>
              </div>
              <div className="flex-1 w-full bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-2xl overflow-auto select-all">
                <pre>{outputHtml}</pre>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
