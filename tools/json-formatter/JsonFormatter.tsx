'use client'

import { useState, useEffect } from 'react'
import { formatJson, minifyJson, validateJson } from './utils'
import { Copy, Trash2, CheckCircle, XCircle, Code2, Minimize, FileJson, Play } from 'lucide-react'

export default function JsonFormatter() {
  const [input, setInput] = useState<string>('')
  const [output, setOutput] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [errorLine, setErrorLine] = useState<number | undefined>(undefined)
  const [copied, setCopied] = useState<boolean>(false)
  const [formatMode, setFormatMode] = useState<2 | 4 | 'minify'>(2)

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      setErrorLine(undefined);
      return;
    }

    const validation = validateJson(input);
    if (!validation.isValid) {
      setError(validation.error);
      setErrorLine(validation.errorLine);
      setOutput(''); // Clear output on error to show error message
      return;
    }

    setError(null);
    setErrorLine(undefined);
    try {
      if (formatMode === 'minify') {
        setOutput(minifyJson(input));
      } else {
        setOutput(formatJson(input, formatMode));
      }
    } catch (e: any) {
      setError(e.message);
    }
  }, [input, formatMode]);

  function handleCopy() {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleClear() {
    setInput('');
  }

  return (
    <div className="w-full mx-auto p-4 md:p-8 rounded-3xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl border border-white/40 dark:border-gray-800 shadow-2xl transition-all">
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full mb-4">
          <FileJson size={14} /> Developer Utility
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          JSON Formatter & Validator
        </h2>
        <p className="mt-3 text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Paste your JSON payload below to prettify, minify, and validate it instantly. 100% secure, processed entirely in your browser.
        </p>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 p-2 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
        <button
          onClick={() => setFormatMode(2)}
          className={`flex items-center gap-2 px-4 py-2.5 font-medium text-sm rounded-xl border shadow-sm transition-all hover:scale-105 ${formatMode === 2 ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-600 dark:hover:text-amber-400 border-gray-200 dark:border-gray-700'}`}
        >
          <Code2 size={16} /> Beautify (2 spaces)
        </button>
        <button
          onClick={() => setFormatMode(4)}
          className={`flex items-center gap-2 px-4 py-2.5 font-medium text-sm rounded-xl border shadow-sm transition-all hover:scale-105 ${formatMode === 4 ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-600 dark:hover:text-amber-400 border-gray-200 dark:border-gray-700'}`}
        >
          <Code2 size={16} /> Beautify (4 spaces)
        </button>
        <button
          onClick={() => setFormatMode('minify')}
          className={`flex items-center gap-2 px-4 py-2.5 font-medium text-sm rounded-xl border shadow-sm transition-all hover:scale-105 ${formatMode === 'minify' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-600 dark:hover:text-amber-400 border-gray-200 dark:border-gray-700'}`}
        >
          <Minimize size={16} /> Minify
        </button>
        <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-2 hidden sm:block"></div>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 font-medium text-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:scale-105"
        >
          <Trash2 size={16} /> Clear
        </button>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Pane */}
        <div className="flex flex-col h-[500px] bg-white/80 dark:bg-gray-800/80 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden relative group transition-colors focus-within:border-amber-400/50">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <Play size={14} className="text-amber-500" /> Input JSON
            </h3>
            {input && (
              <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${error ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'}`}>
                {error ? 'Invalid' : 'Valid'}
              </span>
            )}
          </div>
          <div className="relative flex-1">
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (e.target.value.trim() === '') {
                  setError(null);
                  setErrorLine(undefined);
                }
              }}
              placeholder='{"paste": "your JSON here"}'
              className="absolute inset-0 w-full h-full p-4 resize-none bg-transparent text-gray-800 dark:text-gray-200 font-mono text-sm focus:outline-none z-10 leading-relaxed"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Output Pane */}
        <div className="flex flex-col h-[500px] bg-white/80 dark:bg-gray-800/80 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden relative group">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <CheckCircle size={14} className="text-green-500" /> Output
            </h3>
            <button
              onClick={handleCopy}
              disabled={!output}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                !output ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-400' 
                : copied ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm'
              }`}
            >
              {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="relative flex-1 bg-[#fafafa] dark:bg-[#0d1117] overflow-hidden">
            {error ? (
              <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center bg-red-50/50 dark:bg-red-900/10">
                <XCircle size={48} className="text-red-500 mb-4 opacity-80" />
                <h4 className="text-lg font-bold text-red-700 dark:text-red-400 mb-2">Validation Error</h4>
                <p className="text-sm text-red-600 dark:text-red-300 font-mono bg-red-100/50 dark:bg-red-900/50 px-4 py-3 rounded-xl border border-red-200 dark:border-red-800 max-w-md break-words shadow-sm">
                  {error}
                </p>
                {errorLine !== undefined && (
                  <p className="mt-4 text-sm text-red-500 dark:text-red-400 font-medium bg-white/50 dark:bg-black/20 px-3 py-2 rounded-lg border border-red-100 dark:border-red-900/50">
                    Error near line <span className="px-2 py-1 bg-red-100 dark:bg-red-900/50 rounded-md font-mono text-red-700 dark:text-red-300">{errorLine}</span>
                  </p>
                )}
              </div>
            ) : (
              <textarea
                readOnly
                value={output}
                placeholder="Formatted output will appear here..."
                className="absolute inset-0 w-full h-full p-4 resize-none bg-transparent text-[#0550ae] dark:text-[#79c0ff] font-mono text-sm focus:outline-none z-10 leading-relaxed"
                spellCheck="false"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
