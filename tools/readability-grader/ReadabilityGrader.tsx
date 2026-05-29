'use client';

import { useState, useEffect } from 'react';
import { calculateReadability, type ReadabilityResult } from './utils';
import { Trash2, BookOpen, GraduationCap, WholeWord, AlignLeft } from 'lucide-react';

export default function ReadabilityGrader() {
  const [input, setInput] = useState(`The Flesch-Kincaid readability tests are readability tests designed to indicate how difficult a reading passage in English is to understand. There are two tests, the Flesch Reading Ease, and the Flesch-Kincaid Grade Level. Although they use the same core measures (word length and sentence length), they have different weighting factors. 

The results of the two tests correlate approximately inversely: a text with a comparatively high score on the Reading Ease test should have a lower score on the Grade-Level test.`);

  const [result, setResult] = useState<ReadabilityResult | null>(null);

  useEffect(() => {
    setResult(calculateReadability(input));
  }, [input]);

  const clearInput = () => setInput('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Input Section */}
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col space-y-4 min-h-[500px]">
        <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Paste Text Here
          </span>
          <button onClick={clearInput} className="text-xs font-bold text-red-500 hover:text-red-700 transition flex items-center gap-1">
            <Trash2 size={12} /> Clear
          </button>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste the text you want to analyze..."
          className="w-full flex-1 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-sans text-sm leading-relaxed focus:ring-2 focus:ring-violet-500 outline-none transition resize-none"
        />
      </div>

      {/* Results Section */}
      <div className="flex flex-col space-y-6">
        
        {/* Top Scores */}
        <div className="bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-3xl p-6 text-white shadow-sm flex flex-col justify-center min-h-[200px] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <GraduationCap size={150} />
          </div>
          <div className="relative z-10 space-y-6">
            <div>
              <p className="text-violet-100 text-xs font-bold uppercase tracking-wider mb-1">Flesch-Kincaid Grade Level</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black">{result?.gradeLevel.toFixed(1) || '0.0'}</span>
                <span className="text-violet-200 text-sm font-medium">/ 18.0 max</span>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <p className="text-sm font-bold">Assessment:</p>
              <p className="text-base font-medium">{result?.levelText || 'Waiting for text...'}</p>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm grid grid-cols-2 gap-4 flex-1">
          
          <div className="col-span-2 pb-4 mb-2 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Reading Ease Score</h3>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-bold ${(result?.readingEase || 0) > 60 ? 'text-green-500' : (result?.readingEase || 0) > 30 ? 'text-amber-500' : 'text-red-500'}`}>
                {result?.readingEase.toFixed(1) || '0.0'}
              </span>
              <span className="text-gray-500 text-xs">/ 100</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Higher is easier to read. 60-70 is the sweet spot for web copy.</p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/80 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="p-2 bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 rounded-lg">
              <WholeWord size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400">Words</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{result?.wordCount || 0}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/80 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="p-2 bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 rounded-lg">
              <AlignLeft size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400">Sentences</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{result?.sentenceCount || 0}</p>
            </div>
          </div>

          <div className="col-span-2 flex items-center justify-between bg-gray-50 dark:bg-gray-800/80 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 rounded-lg">
                <BookOpen size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Syllables</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{result?.syllableCount || 0}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-gray-400">Avg. Syllables / Word</p>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-300">
                {result?.wordCount ? (result.syllableCount / result.wordCount).toFixed(2) : '0.00'}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
