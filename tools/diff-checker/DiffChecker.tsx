'use client';

import { useState } from 'react';
import { computeDiff, type DiffResult } from './utils';
import { ArrowRightLeft, SplitSquareHorizontal } from 'lucide-react';

export default function DiffChecker() {
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');

  const diffResult = (leftText || rightText) ? computeDiff(leftText, rightText) : null;

  const taClass = "w-full rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 font-mono text-sm text-gray-900 dark:text-white leading-relaxed resize-y focus:ring-2 focus:ring-orange-500 outline-none transition";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Original Text</label>
          <textarea
            value={leftText}
            onChange={(e) => setLeftText(e.target.value)}
            placeholder="Paste original text here..."
            className={taClass}
            rows={8}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Changed Text</label>
          <textarea
            value={rightText}
            onChange={(e) => setRightText(e.target.value)}
            placeholder="Paste changed text here..."
            className={taClass}
            rows={8}
          />
        </div>
      </div>

      {diffResult && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
             <div className="flex gap-4 text-sm font-semibold">
                <span className="text-green-600 dark:text-green-400">+ {diffResult.addedCount} additions</span>
                <span className="text-red-600 dark:text-red-400">- {diffResult.removedCount} deletions</span>
             </div>
             <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <button onClick={() => setViewMode('split')}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold transition ${viewMode === 'split' ? 'bg-orange-600 text-white shadow' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                  <SplitSquareHorizontal size={14} /> Split
                </button>
                <button onClick={() => setViewMode('unified')}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold transition ${viewMode === 'unified' ? 'bg-orange-600 text-white shadow' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                  <ArrowRightLeft size={14} /> Unified
                </button>
             </div>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden font-mono text-sm shadow-sm">
            {viewMode === 'unified' ? (
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {diffResult.lines.map((line, i) => (
                      <tr key={i} className={`
                        ${line.type === 'added' ? 'bg-green-50 dark:bg-green-900/20' : ''}
                        ${line.type === 'removed' ? 'bg-red-50 dark:bg-red-900/20' : ''}
                      `}>
                        <td className="w-10 text-right pr-2 py-1 text-gray-400 border-r border-gray-200 dark:border-gray-800 select-none bg-gray-50 dark:bg-gray-800">{line.lineNumLeft || ''}</td>
                        <td className="w-10 text-right pr-2 py-1 text-gray-400 border-r border-gray-200 dark:border-gray-800 select-none bg-gray-50 dark:bg-gray-800">{line.lineNumRight || ''}</td>
                        <td className="py-1 px-4 whitespace-pre">
                          <span className={`${line.type === 'added' ? 'text-green-700 dark:text-green-400' : line.type === 'removed' ? 'text-red-700 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                            {line.type === 'added' ? '+ ' : line.type === 'removed' ? '- ' : '  '}{line.content}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
               <div className="flex w-full overflow-x-auto divide-x divide-gray-200 dark:divide-gray-800">
                  {/* Left Side (Original) */}
                  <div className="flex-1 min-w-[50%]">
                     <table className="w-full text-left border-collapse">
                        <tbody>
                           {diffResult.lines.filter(l => l.type !== 'added').map((line, i) => (
                              <tr key={`l-${i}`} className={line.type === 'removed' ? 'bg-red-50 dark:bg-red-900/20' : ''}>
                                 <td className="w-10 text-right pr-2 py-1 text-gray-400 border-r border-gray-200 dark:border-gray-800 select-none bg-gray-50 dark:bg-gray-800">{line.lineNumLeft}</td>
                                 <td className="py-1 px-4 whitespace-pre text-gray-700 dark:text-gray-300">
                                   <span className={line.type === 'removed' ? 'text-red-700 dark:text-red-400' : ''}>{line.content}</span>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
                  {/* Right Side (Changed) */}
                  <div className="flex-1 min-w-[50%]">
                     <table className="w-full text-left border-collapse">
                        <tbody>
                           {diffResult.lines.filter(l => l.type !== 'removed').map((line, i) => (
                              <tr key={`r-${i}`} className={line.type === 'added' ? 'bg-green-50 dark:bg-green-900/20' : ''}>
                                 <td className="w-10 text-right pr-2 py-1 text-gray-400 border-r border-gray-200 dark:border-gray-800 select-none bg-gray-50 dark:bg-gray-800">{line.lineNumRight}</td>
                                 <td className="py-1 px-4 whitespace-pre text-gray-700 dark:text-gray-300">
                                    <span className={line.type === 'added' ? 'text-green-700 dark:text-green-400' : ''}>{line.content}</span>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
