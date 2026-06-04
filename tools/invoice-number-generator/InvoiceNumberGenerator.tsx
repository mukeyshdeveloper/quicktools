'use client';

import { useState, useEffect } from 'react';
import { loadRecords, saveRecords, generateNextNumber, getLastNumber, type InvoiceNumberRecord } from './utils';
import { Plus, Trash2 } from 'lucide-react';

export default function InvoiceNumberGenerator() {
  const [records, setRecords] = useState<InvoiceNumberRecord[]>([]);
  const [prefix, setPrefix] = useState('INV-');
  const [start, setStart] = useState(1001);
  const [client, setClient] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setRecords(loadRecords());
  }, []);

  useEffect(() => {
    saveRecords(records);
  }, [records]);

  const nextNumber = generateNextNumber(prefix, start, records);
  const lastUsed = getLastNumber(prefix, start, records);

  function generate() {
    const newRec: InvoiceNumberRecord = {
      number: nextNumber,
      date: new Date().toISOString().split('T')[0],
      client: client.trim() || undefined,
      notes: notes.trim() || undefined,
    } as InvoiceNumberRecord;
    setRecords(prev => [newRec, ...prev]);
    setClient('');
    setNotes('');
  }

  function remove(number: string) {
    setRecords(prev => prev.filter(r => r.number !== number));
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Prefix</label>
            <input value={prefix} onChange={e => setPrefix(e.target.value.toUpperCase())} className="tool-input font-mono" placeholder="INV-" />
          </div>
          <div>
            <label className="label">Starting Number</label>
            <input type="number" value={start} onChange={e => setStart(Math.max(1, +e.target.value))} className="tool-input" />
          </div>
          <div className="flex items-end">
            <button onClick={generate} className="btn-primary w-full flex items-center justify-center gap-2"><Plus className="w-4 h-4" /> Generate Next Number</button>
          </div>
        </div>

        <div className="mt-4 p-4 bg-background rounded-2xl border border-border flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1">
            <div className="text-xs text-muted">Next available</div>
            <div className="font-mono text-3xl font-bold tracking-tighter text-brand">{nextNumber}</div>
          </div>
          <div className="text-sm text-muted">Last used for this prefix: <span className="font-mono text-text">{lastUsed}</span></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          <input value={client} onChange={e => setClient(e.target.value)} placeholder="Client / Company (optional)" className="tool-input" />
          <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes / PO reference (optional)" className="tool-input" />
        </div>
      </div>

      {/* History */}
      <div className="bg-card border border-border rounded-3xl overflow-hidden">
        <div className="p-4 border-b font-semibold text-sm flex justify-between">
          <span>Generated Numbers ({records.length})</span>
          <span className="text-muted text-xs">Stored in this browser</span>
        </div>
        {records.length === 0 ? (
          <div className="p-8 text-center text-muted text-sm">No numbers generated yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-background">
              <tr>
                <th className="text-left p-4">Number</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Client / Notes</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {records.map((r, i) => (
                <tr key={i}>
                  <td className="p-4 font-mono font-medium">{r.number}</td>
                  <td className="p-4 text-muted">{r.date}</td>
                  <td className="p-4 text-xs text-muted">{r.client || '—'} {r.notes ? `• ${r.notes}` : ''}</td>
                  <td className="p-4"><button onClick={() => remove(r.number)} className="text-rose-400 hover:text-rose-600"><Trash2 className="w-4 h-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-center text-xs text-muted">Use the same browser to keep your sequence consistent. Export or screenshot for accounting records.</p>
    </div>
  );
}
