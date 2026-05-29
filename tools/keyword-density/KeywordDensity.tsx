'use client';

import { useState, useEffect } from 'react';
import { analyzeKeywordDensity, type KeywordDensityAnalysis } from './utils';
import { Trash2, Check } from 'lucide-react';

export default function KeywordDensity() {
  const [input, setInput] = useState(`SEO stands for Search Engine Optimization. SEO is the process of improving your website's visibility in Google and other search engines. The goal of SEO is to rank higher for relevant keywords, which brings more organic traffic to your site. Good SEO practices include writing high-quality content, optimizing HTML tags, and building backlinks. Without SEO, search engines might struggle to find or understand your pages.`);
  const [ignoreStopWords, setIgnoreStopWords] = useState(true);
  const [activeTab, setActiveTab] = useState<'one' | 'two' | 'three'>('one');

  const [result, setResult] = useState<KeywordDensityAnalysis>({
    oneWord: [],
    twoWord: [],
    threeWord: [],
    totalWords: 0,
  });

  useEffect(() => {
    setResult(analyzeKeywordDensity(input, ignoreStopWords));
  }, [input, ignoreStopWords]);

  const clearInput = () => setInput('');

  const activeList = activeTab === 'one' ? result.oneWord : activeTab === 'two' ? result.twoWord : result.threeWord;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Input Section */}
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col space-y-4 h-[600px]">
        <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Source Text
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              {result.totalWords} words
            </span>
          </div>
          <button onClick={clearInput} className="text-xs font-bold text-red-500 hover:text-red-700 transition flex items-center gap-1">
            <Trash2 size={12} /> Clear
          </button>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your article or text here..."
          className="w-full flex-1 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-sans text-sm leading-relaxed focus:ring-2 focus:ring-emerald-500 outline-none transition resize-none"
        />

        <div className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer select-none group w-fit">
            <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${ignoreStopWords ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300 dark:border-gray-600 group-hover:border-emerald-400'}`}>
              {ignoreStopWords && <Check size={12} strokeWidth={3} />}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Ignore Common Stop Words (the, and, is)</span>
          </label>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col space-y-4 h-[600px]">
        <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Density Analysis
          </span>
          
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
            <button onClick={() => setActiveTab('one')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${activeTab === 'one' ? 'bg-white dark:bg-gray-900 text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'}`}>
              1-Word
            </button>
            <button onClick={() => setActiveTab('two')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${activeTab === 'two' ? 'bg-white dark:bg-gray-900 text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'}`}>
              2-Word
            </button>
            <button onClick={() => setActiveTab('three')} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${activeTab === 'three' ? 'bg-white dark:bg-gray-900 text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'}`}>
              3-Word
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto pr-2">
          {activeList.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-gray-400 italic">
              Paste text to see analysis...
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur z-10">
                  <th className="py-3 px-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">Keyword</th>
                  <th className="py-3 px-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800 text-right">Count</th>
                  <th className="py-3 px-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800 text-right">Density</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {activeList.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                    <td className="py-3 px-2 text-sm font-medium text-gray-900 dark:text-gray-200 break-words max-w-[200px]">
                      {item.word}
                    </td>
                    <td className="py-3 px-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 text-right">
                      {item.count}
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600 dark:text-gray-400 text-right">
                      {item.percentage.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
