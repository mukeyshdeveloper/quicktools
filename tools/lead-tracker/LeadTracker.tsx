'use client';

import { useState, useEffect } from 'react';
import { loadLeads, saveLeads, STAGES, STAGE_COLORS, getPipelineValue, getWonValue, getConversionRate, type Lead, type LeadStage } from './utils';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function LeadTracker() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<LeadStage | 'All'>('All');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Lead | null>(null);
  const [form, setForm] = useState<Partial<Lead>>({ name: '', value: 0, stage: 'New', notes: '' });

  useEffect(() => {
    setLeads(loadLeads());
  }, []);

  useEffect(() => {
    saveLeads(leads);
  }, [leads]);

  const filtered = filter === 'All' ? leads : leads.filter(l => l.stage === filter);

  const pipeline = getPipelineValue(leads);
  const won = getWonValue(leads);
  const conversion = getConversionRate(leads);

  function openNew() {
    setEditing(null);
    setForm({ name: '', company: '', email: '', value: 50000, stage: 'New', notes: '', nextAction: '' });
    setShowForm(true);
  }

  function openEdit(lead: Lead) {
    setEditing(lead);
    setForm({ ...lead });
    setShowForm(true);
  }

  function saveLead() {
    if (!form.name?.trim()) return;

    const now = new Date().toISOString();
    if (editing) {
      setLeads(prev => prev.map(l => l.id === editing.id ? { ...editing, ...form, updatedAt: now } as Lead : l));
    } else {
      const newLead: Lead = {
        id: Date.now(),
        name: (form.name || '').trim(),
        company: form.company?.trim() || undefined,
        email: form.email?.trim() || undefined,
        phone: form.phone?.trim() || undefined,
        value: Number(form.value) || 0,
        stage: (form.stage as LeadStage) || 'New',
        notes: form.notes?.trim() || '',
        nextAction: form.nextAction?.trim() || undefined,
        updatedAt: now,
      } as Lead;
      setLeads(prev => [newLead, ...prev]);
    }
    setShowForm(false);
    setEditing(null);
  }

  function deleteLead(id: number) {
    if (!confirm('Delete this lead?')) return;
    setLeads(prev => prev.filter(l => l.id !== id));
  }

  function changeStage(id: number, stage: LeadStage) {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, stage, updatedAt: new Date().toISOString() } : l));
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-3xl p-5">
          <div className="text-xs text-muted">Active Pipeline</div>
          <div className="text-3xl font-bold tracking-tighter">₹{pipeline.toLocaleString('en-IN')}</div>
        </div>
        <div className="bg-card border border-border rounded-3xl p-5">
          <div className="text-xs text-muted">Won (All Time)</div>
          <div className="text-3xl font-bold tracking-tighter text-emerald-600">₹{won.toLocaleString('en-IN')}</div>
        </div>
        <div className="bg-card border border-border rounded-3xl p-5">
          <div className="text-xs text-muted">Win Rate (Closed)</div>
          <div className="text-3xl font-bold tracking-tighter">{conversion}%</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-1">
          <button onClick={() => setFilter('All')} className={`px-3 py-1 text-xs rounded-full border ${filter === 'All' ? 'bg-brand text-white border-brand' : 'border-border'}`}>All</button>
          {STAGES.map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1 text-xs rounded-full border ${filter === s ? 'bg-brand text-white border-brand' : 'border-border'}`}>{s}</button>
          ))}
        </div>
        <button onClick={openNew} className="btn-primary text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> New Lead</button>
      </div>

      {/* Leads Table */}
      <div className="bg-card border border-border rounded-3xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-background border-b">
            <tr>
              <th className="text-left p-4">Lead</th>
              <th className="text-left p-4">Value</th>
              <th className="text-left p-4">Stage</th>
              <th className="text-left p-4 hidden md:table-cell">Next Action</th>
              <th className="p-4 w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-muted">No leads yet. Add your first one!</td></tr>
            )}
            {filtered.map(lead => (
              <tr key={lead.id} className="hover:bg-background/50">
                <td className="p-4">
                  <div className="font-medium">{lead.name}</div>
                  {lead.company && <div className="text-xs text-muted">{lead.company}</div>}
                </td>
                <td className="p-4 font-medium">₹{lead.value.toLocaleString('en-IN')}</td>
                <td className="p-4">
                  <select value={lead.stage} onChange={e => changeStage(lead.id, e.target.value as LeadStage)} className={`text-xs px-2 py-0.5 rounded-full border-0 ${STAGE_COLORS[lead.stage]}`}>
                    {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="p-4 text-xs text-muted hidden md:table-cell">{lead.nextAction || '—'}</td>
                <td className="p-4">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => openEdit(lead)} className="text-muted hover:text-text"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => deleteLead(lead.id)} className="text-rose-400 hover:text-rose-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Simple form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowForm(false)}>
          <div className="bg-card border border-border rounded-3xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="font-semibold mb-4">{editing ? 'Edit Lead' : 'New Lead'}</div>
            <div className="space-y-3 text-sm">
              <input placeholder="Lead name *" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} className="tool-input" />
              <input placeholder="Company" value={form.company || ''} onChange={e => setForm({ ...form, company: e.target.value })} className="tool-input" />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} className="tool-input" />
                <input placeholder="Phone" value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} className="tool-input" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-muted mb-1">Value (₹)</div>
                  <input type="number" value={form.value} onChange={e => setForm({ ...form, value: +e.target.value })} className="tool-input" />
                </div>
                <div>
                  <div className="text-xs text-muted mb-1">Stage</div>
                  <select value={form.stage} onChange={e => setForm({ ...form, stage: e.target.value as LeadStage })} className="tool-input">
                    {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <input placeholder="Next action / follow-up" value={form.nextAction || ''} onChange={e => setForm({ ...form, nextAction: e.target.value })} className="tool-input" />
              <textarea placeholder="Notes" value={form.notes || ''} onChange={e => setForm({ ...form, notes: e.target.value })} className="tool-textarea h-20" />
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowForm(false)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={saveLead} className="btn-primary flex-1">Save Lead</button>
            </div>
          </div>
        </div>
      )}

      <p className="text-center text-xs text-muted">Data saved in your browser only. Great for personal use or small teams on the same device.</p>
    </div>
  );
}
