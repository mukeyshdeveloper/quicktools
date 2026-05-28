'use client';

import { useState, useEffect, useCallback } from 'react';
import { urlEncode, urlDecode, parseUrlDetails, rebuildUrl, type QueryParam } from './utils';
import { Copy, Check, Trash2, Plus, Sparkles, RefreshCw } from 'lucide-react';

export default function UrlEncoderDecoder() {
  const [mode, setMode] = useState<'encode' | 'decode' | 'builder'>('encode');
  const [input, setInput] = useState('https://example.com/search?q=hello world&category=tools&sort=desc#top');
  const [output, setOutput] = useState('');
  
  // Settings
  const [encodeAll, setEncodeAll] = useState(true);
  const [plusAsSpace, setPlusAsSpace] = useState(true);
  
  // URL Builder State
  const [protocol, setProtocol] = useState('https:');
  const [host, setHost] = useState('example.com');
  const [pathname, setPathname] = useState('/search');
  const [params, setParams] = useState<QueryParam[]>([]);
  const [hash, setHash] = useState('top');
  const [isSyncing, setIsSyncing] = useState(false);

  const [copied, setCopied] = useState(false);

  // Perform standard live conversion
  useEffect(() => {
    if (mode === 'encode') {
      setOutput(urlEncode(input, encodeAll));
    } else if (mode === 'decode') {
      setOutput(urlDecode(input, plusAsSpace));
    }
  }, [input, mode, encodeAll, plusAsSpace]);

  // Handle URL parsing for Builder Mode
  const parseCurrentInput = useCallback((urlText: string) => {
    const details = parseUrlDetails(urlText);
    if (details.isValid) {
      setIsSyncing(true);
      setProtocol(details.protocol || 'https:');
      setHost(details.host || '');
      setPathname(details.pathname || '');
      setParams(details.searchParams);
      setHash(details.hash.replace(/^#/, '') || '');
      setTimeout(() => setIsSyncing(false), 50);
    }
  }, []);

  // Sync input string when builder components change
  useEffect(() => {
    if (mode !== 'builder' || isSyncing) return;

    const rebuilt = rebuildUrl({
      protocol,
      host,
      pathname,
      searchParams: params,
      hash,
    });
    
    if (rebuilt) {
      setInput(rebuilt);
    }
  }, [protocol, host, pathname, params, hash, mode, isSyncing]);

  // When shifting to builder mode, parse whatever is currently in input
  useEffect(() => {
    if (mode === 'builder') {
      parseCurrentInput(input);
    }
  }, [mode, parseCurrentInput, input]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mode === 'builder' ? input : output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setParams([]);
    setHost('');
    setPathname('');
    setHash('');
  };

  const handleAddParam = () => {
    setParams([...params, { key: '', value: '' }]);
  };

  const handleParamChange = (index: number, field: 'key' | 'value', value: string) => {
    const next = [...params];
    const item = next[index];
    if (item) {
      item[field] = value;
      setParams(next);
    }
  };

  const handleRemoveParam = (index: number) => {
    setParams(params.filter((_, i) => i !== index));
  };

  const sampleUrls = [
    { name: 'Simple Query', url: 'q=nextjs+app+router&theme=dark' },
    { name: 'Full URL with Spaces', url: 'https://api.github.com/search/repositories?q=react components&sort=stars&order=desc' },
    { name: 'Nested / Special Characters', url: 'https://example.com/auth?redirect=https://app.com/dashboard?token=xyz123&user=john+doe' },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Selectors */}
      <div className="flex flex-wrap gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl w-fit border border-gray-200/50 dark:border-gray-700/50">
        <button
          onClick={() => setMode('encode')}
          className={`px-5 py-2 text-sm font-bold rounded-xl transition-all duration-200 ${mode === 'encode' ? 'bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
        >
          🔒 URL Encode
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`px-5 py-2 text-sm font-bold rounded-xl transition-all duration-200 ${mode === 'decode' ? 'bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
        >
          🔓 URL Decode
        </button>
        <button
          onClick={() => setMode('builder')}
          className={`px-5 py-2 text-sm font-bold rounded-xl transition-all duration-200 ${mode === 'builder' ? 'bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
        >
          <span className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-500 animate-pulse" />
            Visual URL Builder
          </span>
        </button>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Side: Input Text Area / Parser */}
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 space-y-5 shadow-sm">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {mode === 'builder' ? 'Compiled URL string' : 'Source String'}
            </label>
            <div className="flex items-center gap-3">
              <button 
                onClick={clearAll}
                className="text-xs font-bold text-red-500 hover:text-red-700 transition"
              >
                Clear
              </button>
            </div>
          </div>

          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (mode === 'builder') parseCurrentInput(e.target.value);
            }}
            className="w-full h-40 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-mono text-sm leading-relaxed focus:ring-2 focus:ring-emerald-500 outline-none transition resize-none"
            placeholder={mode === 'decode' ? 'Paste encoded URL string here...' : 'Enter plain URL or text to encode...'}
          />

          {/* Quick Presets */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Samples & Presets</span>
            <div className="flex flex-wrap gap-2">
              {sampleUrls.map((sample) => (
                <button
                  key={sample.name}
                  onClick={() => {
                    setInput(sample.url);
                    if (mode === 'builder') parseCurrentInput(sample.url);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  {sample.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Options & Interactive Visual Results */}
        <div className="space-y-6">
          {mode !== 'builder' ? (
            /* Encoder / Decoder Outputs */
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 space-y-5 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  {mode === 'encode' ? 'Encoded Output' : 'Decoded Output'}
                </span>
                <button
                  onClick={copyToClipboard}
                  disabled={!output}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition disabled:opacity-50"
                >
                  {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy Result'}
                </button>
              </div>

              <div className="w-full min-h-[140px] px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-mono text-sm leading-relaxed select-all overflow-x-auto whitespace-pre-wrap">
                {output || <span className="text-gray-400 italic">Output will automatically update as you type...</span>}
              </div>

              {/* Extra Configuration Toggles */}
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                {mode === 'encode' ? (
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={encodeAll}
                      onChange={(e) => setEncodeAll(e.target.checked)}
                      className="accent-emerald-500 w-4 h-4 rounded"
                    />
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                      Encode all special characters (encodeURIComponent)
                    </span>
                  </label>
                ) : (
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={plusAsSpace}
                      onChange={(e) => setPlusAsSpace(e.target.checked)}
                      className="accent-emerald-500 w-4 h-4 rounded"
                    />
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                      Treat plus (+) as space
                    </span>
                  </label>
                )}
              </div>
            </div>
          ) : (
            /* Premium Visual URL Param Builder */
            <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-6 space-y-6 shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Visual Component Designer
                </span>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy Built URL'}
                </button>
              </div>

              {/* Base URL Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Protocol</label>
                  <select
                    value={protocol}
                    onChange={(e) => setProtocol(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="https:">https://</option>
                    <option value="http:">http://</option>
                    <option value="ftp:">ftp://</option>
                    <option value="">(None / Relative)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Domain / Host</label>
                  <input
                    type="text"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    placeholder="example.com"
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Path</label>
                  <input
                    type="text"
                    value={pathname}
                    onChange={(e) => setPathname(e.target.value)}
                    placeholder="/search"
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Hash / Anchor</label>
                  <input
                    type="text"
                    value={hash}
                    onChange={(e) => setHash(e.target.value)}
                    placeholder="top"
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* Query Parameters Visual Grid */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Query Parameters ({params.length})</span>
                  <button
                    onClick={handleAddParam}
                    className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    <Plus size={14} /> Add Parameter
                  </button>
                </div>

                {params.length === 0 ? (
                  <div className="text-center py-6 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
                    <span className="text-xs text-gray-400 italic">No query parameters defined. Click add parameter above to start building.</span>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {params.map((param, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={param.key}
                          onChange={(e) => handleParamChange(index, 'key', e.target.value)}
                          placeholder="Key"
                          className="flex-1 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold outline-none"
                        />
                        <span className="text-gray-400 text-xs font-bold">=</span>
                        <input
                          type="text"
                          value={param.value}
                          onChange={(e) => handleParamChange(index, 'value', e.target.value)}
                          placeholder="Value"
                          className="flex-1 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold outline-none"
                        />
                        <button
                          onClick={() => handleRemoveParam(index)}
                          className="text-red-400 hover:text-red-600 transition p-1"
                          aria-label="Remove parameter"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
