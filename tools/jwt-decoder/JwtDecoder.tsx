'use client';

import { useState } from 'react';
import { decodeJwt, type JwtParts } from './utils';

export default function JwtDecoder() {
  const [input, setInput] = useState('');
  const [decoded, setDecoded] = useState<JwtParts | null>(null);
  const [error, setError] = useState<string | null>(null);

  function process(val: string) {
    setInput(val);
    if (!val.trim()) {
      setDecoded(null);
      setError(null);
      return;
    }
    const { parts, error } = decodeJwt(val);
    setDecoded(parts);
    setError(error);
  }

  const codeClass = "w-full rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 font-mono text-sm text-gray-900 dark:text-white leading-relaxed overflow-auto outline-none focus:ring-2 focus:ring-rose-500 transition";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Encoded JWT</label>
        <textarea
          value={input}
          onChange={e => process(e.target.value)}
          placeholder="Paste your JSON Web Token here..."
          rows={6}
          className={`${codeClass} resize-y`}
        />
        {error && <p className="text-sm text-red-500 font-medium mt-1">{error}</p>}
      </div>

      {decoded && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-rose-500">Algorithm</p>
                <p className="mt-1 font-semibold text-gray-900 dark:text-white">{decoded.algorithm || 'Unknown'}</p>
             </div>
             <div className={`border rounded-xl p-4 ${decoded.isExpired ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'}`}>
                <p className={`text-xs font-bold uppercase tracking-widest ${decoded.isExpired ? 'text-red-500' : 'text-green-500'}`}>Status</p>
                <p className="mt-1 font-semibold text-gray-900 dark:text-white">{decoded.isExpired ? 'Expired' : 'Valid'}</p>
             </div>
             <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:col-span-2">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Expires At</p>
                <p className="mt-1 font-semibold text-gray-900 dark:text-white">{decoded.expiresAt || 'N/A'}</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-rose-500">Header (Algorithm & Type)</label>
              <pre className={codeClass}>{JSON.stringify(decoded.header, null, 2)}</pre>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-purple-500">Payload (Data)</label>
              <pre className={`${codeClass} !border-purple-200 dark:!border-purple-800 !bg-purple-50 dark:!bg-purple-900/20`}>{JSON.stringify(decoded.payload, null, 2)}</pre>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-blue-500">Signature</label>
            <p className="w-full rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 font-mono text-sm text-gray-900 dark:text-white break-all">
              {decoded.signature}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
