'use client';

import { useState, useEffect } from 'react';
import { buildUtmLink, type UtmParams } from './utils';
import { Copy, Check, Link as LinkIcon, Trash2 } from 'lucide-react';
import ResetButton from '@/components/ui/ResetButton';

export default function UtmBuilder() {
  const [params, setParams] = useState<UtmParams>({
    url: 'https://quickutils.in',
    source: 'newsletter',
    medium: 'email',
    campaign: 'summer_sale_2026',
    term: '',
    content: '',
  });

  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOutput(buildUtmLink(params));
  }, [params]);

  const updateParam = (key: keyof UtmParams, value: string) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const resetAll = () => {
    setParams({
      url: '',
      source: '',
      medium: '',
      campaign: '',
      term: '',
      content: '',
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Form Section (7 cols) */}
      <div className="lg:col-span-7 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm space-y-5">
        <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Campaign Parameters
          </span>
          <ResetButton onClick={resetAll} />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Website URL <span className="text-red-500">*</span></label>
          <input
            type="url"
            value={params.url}
            onChange={(e) => updateParam('url', e.target.value)}
            placeholder="https://example.com"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Campaign Source <span className="text-red-500">*</span></label>
            <p className="text-[11px] text-gray-500">e.g. google, newsletter, facebook</p>
            <input
              type="text"
              value={params.source}
              onChange={(e) => updateParam('source', e.target.value)}
              placeholder="utm_source"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Campaign Medium</label>
            <p className="text-[11px] text-gray-500">e.g. cpc, banner, email</p>
            <input
              type="text"
              value={params.medium}
              onChange={(e) => updateParam('medium', e.target.value)}
              placeholder="utm_medium"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Campaign Name</label>
            <p className="text-[11px] text-gray-500">e.g. spring_sale, promo_code</p>
            <input
              type="text"
              value={params.campaign}
              onChange={(e) => updateParam('campaign', e.target.value)}
              placeholder="utm_campaign"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Campaign Term</label>
            <p className="text-[11px] text-gray-500">Identify paid keywords</p>
            <input
              type="text"
              value={params.term}
              onChange={(e) => updateParam('term', e.target.value)}
              placeholder="utm_term"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Campaign Content</label>
          <p className="text-[11px] text-gray-500">Use to differentiate ads (e.g. logolink, textlink)</p>
          <input
            type="text"
            value={params.content}
            onChange={(e) => updateParam('content', e.target.value)}
            placeholder="utm_content"
            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
      </div>

      {/* Output Section (5 cols) */}
      <div className="lg:col-span-5 bg-indigo-50/50 dark:bg-indigo-900/10 backdrop-blur-xl rounded-3xl border border-indigo-200/50 dark:border-indigo-800/30 p-6 shadow-sm flex flex-col space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-indigo-200/50 dark:border-indigo-800/50 pb-2">
          Generated Link
        </h3>
        
        <div className="flex-1 flex flex-col justify-center gap-4">
          {!output ? (
            <div className="text-center text-gray-500 dark:text-gray-400 italic text-sm">
              Enter a valid URL to generate UTM link.
            </div>
          ) : (
            <>
              <div className="bg-white dark:bg-gray-900 border border-indigo-100 dark:border-indigo-800/50 rounded-2xl p-4 overflow-hidden relative">
                <p className="text-sm font-mono text-gray-800 dark:text-gray-200 break-all select-all leading-relaxed">
                  {output}
                </p>
              </div>
              <button
                onClick={copyOutput}
                className="w-full flex justify-center items-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition shadow-sm"
              >
                {copied ? <Check size={18} /> : <LinkIcon size={18} />}
                {copied ? 'Copied to Clipboard!' : 'Copy UTM Link'}
              </button>
            </>
          )}
        </div>

        <div className="text-[11px] text-gray-500 bg-white/40 dark:bg-black/20 p-3 rounded-xl border border-gray-100 dark:border-gray-800 mt-auto">
          <strong>Tip:</strong> Always use lowercase for your UTM tags to avoid analytics fragmentation (e.g., Google Analytics treats "Email" and "email" as two different mediums).
        </div>
      </div>
    </div>
  );
}
