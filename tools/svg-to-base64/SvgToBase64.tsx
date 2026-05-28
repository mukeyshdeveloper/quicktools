'use client';

import { useState, useEffect } from 'react';
import { convertSvg, type SvgConversion } from './utils';
import { Copy, Check, Image as ImageIcon } from 'lucide-react';
import ResetButton from '@/components/ui/ResetButton';

export default function SvgToBase64() {
  const [input, setInput] = useState(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="#4f46e5" />
  <path d="M35 50l10 10 20-20" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
</svg>`);

  const [result, setResult] = useState<SvgConversion | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setResult(convertSvg(input));
  }, [input]);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const CopyBtn = ({ text, id }: { text: string; id: string }) => (
    <button
      onClick={() => copy(text, id)}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {copiedId === id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
      {copiedId === id ? 'Copied' : 'Copy'}
    </button>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column: Input and Preview */}
      <div className="space-y-6">
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Paste SVG Code
            </span>
            <ResetButton onClick={() => setInput('')} />
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="<svg>...</svg>"
            className="w-full h-48 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-mono text-sm leading-relaxed focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
          />
        </div>

        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col items-center justify-center min-h-[200px] overflow-hidden"
             style={{ 
               backgroundImage: 'linear-gradient(45deg, #f3f4f6 25%, transparent 25%, transparent 75%, #f3f4f6 75%, #f3f4f6), linear-gradient(45deg, #f3f4f6 25%, transparent 25%, transparent 75%, #f3f4f6 75%, #f3f4f6)',
               backgroundSize: '20px 20px',
               backgroundPosition: '0 0, 10px 10px'
             }}>
          {result?.isValid ? (
            <img src={result.base64DataUri} alt="SVG Preview" className="max-w-full max-h-48 drop-shadow-md" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600 bg-white/80 dark:bg-gray-900/80 p-4 rounded-xl">
              <ImageIcon size={32} />
              <span className="text-sm font-semibold">Valid SVG Preview</span>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Output Formats */}
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col space-y-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
          Ready to Use Snippets
        </h3>

        {!result?.isValid ? (
          <p className="text-sm text-gray-500 italic">Enter valid SVG code to generate formats.</p>
        ) : (
          <>
            {/* CSS URL Encoded (Best Practice) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-600 dark:text-gray-400">CSS Background (URL Encoded) <span className="ml-1 text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Optimal</span></span>
                <CopyBtn text={result.cssUrlEncoded} id="cssUrlEncoded" />
              </div>
              <input readOnly value={result.cssUrlEncoded} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-600 dark:text-gray-300 truncate" />
            </div>

            {/* CSS Base64 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-600 dark:text-gray-400">CSS Background (Base64)</span>
                <CopyBtn text={result.cssBase64} id="cssBase64" />
              </div>
              <input readOnly value={result.cssBase64} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-600 dark:text-gray-300 truncate" />
            </div>

            {/* HTML Img */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-600 dark:text-gray-400">HTML Img Tag</span>
                <CopyBtn text={result.htmlImg} id="htmlImg" />
              </div>
              <input readOnly value={result.htmlImg} className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-600 dark:text-gray-300 truncate" />
            </div>

            {/* Raw Base64 URI */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Raw Base64 Data URI</span>
                <CopyBtn text={result.base64DataUri} id="rawBase64" />
              </div>
              <textarea readOnly value={result.base64DataUri} className="w-full h-20 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-600 dark:text-gray-300 resize-none break-all" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
