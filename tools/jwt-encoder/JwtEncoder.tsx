'use client';

import { useState, useEffect } from 'react';
import { signJWT, decodeJWT, DEFAULT_HEADER, DEFAULT_PAYLOAD } from './utils';
import { Key, Copy, RefreshCw } from 'lucide-react';

export default function JwtEncoder() {
  const [headerStr, setHeaderStr] = useState(JSON.stringify(DEFAULT_HEADER, null, 2));
  const [payloadStr, setPayloadStr] = useState(JSON.stringify(DEFAULT_PAYLOAD, null, 2));
  const [secret, setSecret] = useState('your-256-bit-secret');
  const [algorithm, setAlgorithm] = useState<'HS256' | 'HS384' | 'HS512'>('HS256');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [decoded, setDecoded] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  async function generateToken() {
    setError('');
    try {
      const header = JSON.parse(headerStr);
      const payload = JSON.parse(payloadStr);
      const newToken = await signJWT(header, payload, secret, algorithm);
      setToken(newToken);
      setDecoded(decodeJWT(newToken));
    } catch (e: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      setError(e.message || 'Invalid JSON or signing error');
      setToken('');
    }
  }

  function loadDefaults() {
    setHeaderStr(JSON.stringify(DEFAULT_HEADER, null, 2));
    setPayloadStr(JSON.stringify(DEFAULT_PAYLOAD, null, 2));
    setSecret('your-256-bit-secret');
    setAlgorithm('HS256');
    setToken('');
    setDecoded(null);
    setError('');
  }

  useEffect(() => {
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDecoded(decodeJWT(token));
    }
  }, [token]);

  async function copyToken() {
    if (token) await navigator.clipboard.writeText(token);
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-3xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="text-xs font-bold text-muted block mb-1.5">Header (JSON)</label>
          <textarea value={headerStr} onChange={e => setHeaderStr(e.target.value)} className="tool-textarea font-mono text-sm h-32" />
        </div>
        <div>
          <label className="text-xs font-bold text-muted block mb-1.5">Payload (JSON)</label>
          <textarea value={payloadStr} onChange={e => setPayloadStr(e.target.value)} className="tool-textarea font-mono text-sm h-32" />
        </div>
      </div>

      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-muted block mb-1.5">Secret</label>
            <input type="text" value={secret} onChange={e => setSecret(e.target.value)} className="tool-input font-mono" />
          </div>
          <div>
            <label className="text-xs font-bold text-muted block mb-1.5">Algorithm</label>
            <select value={algorithm} onChange={e => setAlgorithm(e.target.value as any)} className="tool-input"> {/* eslint-disable-line @typescript-eslint/no-explicit-any */}
              <option value="HS256">HS256 (SHA-256)</option>
              <option value="HS384">HS384 (SHA-384)</option>
              <option value="HS512">HS512 (SHA-512)</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button onClick={generateToken} className="btn-primary flex items-center gap-2 px-6">
            <Key className="w-4 h-4" /> Generate JWT
          </button>
          <button onClick={loadDefaults} className="btn-secondary flex items-center gap-2 px-4">
            <RefreshCw className="w-4 h-4" /> Reset to Defaults
          </button>
        </div>
      </div>

      {error && <div className="text-rose-600 text-sm bg-rose-50 border border-rose-200 rounded-2xl p-4">{error}</div>}

      {token && (
        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold">Generated Token</span>
            <button onClick={copyToken} className="btn-secondary text-xs flex items-center gap-1 px-3 py-1">
              <Copy className="w-3.5 h-3.5" /> Copy
            </button>
          </div>
          <div className="font-mono text-xs break-all bg-background p-4 rounded-2xl border border-border select-all">{token}</div>

          {decoded && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-bold text-muted mb-1">Header</div>
                <pre className="bg-background p-3 rounded-2xl text-xs overflow-auto border border-border">{JSON.stringify(decoded.header, null, 2)}</pre>
              </div>
              <div>
                <div className="text-xs font-bold text-muted mb-1">Payload</div>
                <pre className="bg-background p-3 rounded-2xl text-xs overflow-auto border border-border">{JSON.stringify(decoded.payload, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      )}

      <p className="text-center text-xs text-muted">Signing uses the Web Crypto API (HMAC). No data is sent to any server.</p>
    </div>
  );
}
