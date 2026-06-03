'use client';

import { useState, useEffect } from 'react';
import {
  calculateBalances,
  generateShareableText,
  encodeStateForShare,
  decodeStateFromShare,
  type Participant,
  type Expense,
} from './utils';
import { Plus, Trash2, Users, Receipt, ArrowRightLeft, Copy, Link as LinkIcon } from 'lucide-react';

export default function BillSplitter() {
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 'p1', name: 'You' },
    { id: 'p2', name: 'Alex' },
    { id: 'p3', name: 'Sam' },
  ]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newPersonName, setNewPersonName] = useState('');

  // Form state for adding expense (advanced)
  const [showAddForm, setShowAddForm] = useState(false);
  const [expDesc, setExpDesc] = useState('');
  const [expAmount, setExpAmount] = useState(0);
  const [expPaidBy, setExpPaidBy] = useState('p1');
  const [expTip, setExpTip] = useState(0);
  const [expTax, setExpTax] = useState(0);
  const [expSplitMode, setExpSplitMode] = useState<'equal' | 'shares' | 'custom' | 'percentage'>('equal');
  const [expShares, setExpShares] = useState<Record<string, number>>({});

  // Load from URL on mount (for shared links)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    if (data) {
      const decoded = decodeStateFromShare(data);
      if (decoded) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setParticipants(decoded.participants);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setExpenses(decoded.expenses);
        // Clean URL
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, []);

  const result = calculateBalances(participants, expenses);

  function addParticipant() {
    const name = newPersonName.trim();
    if (!name) return;
    const id = 'p' + Date.now().toString(36);
    setParticipants([...participants, { id, name }]);
    setNewPersonName('');
  }

  function removeParticipant(id: string) {
    if (participants.length <= 1) return;
    setParticipants(participants.filter(p => p.id !== id));
    // Clean expenses that reference this person? For simplicity keep data but ignore in calc
  }

  function openAddExpense() {
    setShowAddForm(true);
    setExpDesc('');
    setExpAmount(0);
    setExpPaidBy(participants[0]?.id || '');
    setExpTip(0);
    setExpTax(0);
    setExpSplitMode('equal');
    setExpShares({});
  }

  function addExpense() {
    if (!expDesc || expAmount <= 0) return;

    const newExp: Expense = {
      id: 'e' + Date.now(),
      description: expDesc,
      totalAmount: expAmount,
      paidBy: expPaidBy,
      date: (new Date().toISOString().split('T')[0] as string),
      ...(expTip ? { tip: expTip } : {}),
      ...(expTax ? { tax: expTax } : {}),
      splitMode: expSplitMode,
      ...(Object.keys(expShares).length ? { shares: expShares } : {}),
    };

    setExpenses([...expenses, newExp]);
    setShowAddForm(false);
  }

  function removeExpense(id: string) {
    setExpenses(expenses.filter(e => e.id !== id));
  }

  // Update shares when mode or participants change (simplified)
  function updateShare(pid: string, val: number) {
    setExpShares(prev => ({ ...prev, [pid]: val }));
  }

  function generateAndCopySummary() {
    const text = generateShareableText(participants, expenses, result);
    navigator.clipboard.writeText(text).then(() => {
      alert('Summary copied! Paste into WhatsApp or email.');
    });
  }

  function generateShareLink() {
    const encoded = encodeStateForShare(participants, expenses);
    if (!encoded) return;
    const url = `${window.location.origin}${window.location.pathname}?data=${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Share link copied! Send it to your friends. It will load the exact split when opened.');
    });
  }

  return (
    <div className="space-y-8">
      {/* Participants */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-lg">Group Members</h3>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {participants.map(p => (
            <div key={p.id} className="flex items-center bg-background border border-border rounded-2xl px-4 py-1.5 text-sm">
              {p.name}
              {participants.length > 1 && (
                <button onClick={() => removeParticipant(p.id)} className="ml-2 text-muted hover:text-rose-500">×</button>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={newPersonName}
            onChange={e => setNewPersonName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addParticipant()}
            placeholder="Add friend name"
            className="tool-input flex-1"
          />
          <button onClick={addParticipant} className="btn-primary px-5">Add</button>
        </div>
      </div>

      {/* Expenses */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-lg">Expenses ({expenses.length})</h3>
          </div>
          <button onClick={openAddExpense} className="btn-primary flex items-center gap-2 px-5">
            <Plus className="w-4 h-4" /> Add Bill / Expense
          </button>
        </div>

        {expenses.length === 0 && (
          <p className="text-muted text-sm">Add bills to see live splits and optimal settlements.</p>
        )}

        <div className="space-y-3">
          {expenses.map(exp => {
            const payer = participants.find(p => p.id === exp.paidBy)?.name || 'Someone';
            return (
              <div key={exp.id} className="flex justify-between items-center bg-background border border-border rounded-2xl p-4">
                <div>
                  <div className="font-medium">{exp.description}</div>
                  <div className="text-xs text-muted">Paid by {payer} • {exp.splitMode}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-mono text-right">₹{exp.totalAmount.toFixed(0)}{exp.tip || exp.tax ? ` (+ extras)` : ''}</div>
                  <button onClick={() => removeExpense(exp.id)} className="text-muted hover:text-rose-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Expense Modal / Form */}
      {showAddForm && (
        <div className="bg-card border-2 border-emerald-500 rounded-3xl p-6 space-y-4">
          <h4 className="font-semibold">New Expense (Advanced)</h4>

          <input value={expDesc} onChange={e=>setExpDesc(e.target.value)} placeholder="Description e.g. Dinner at Olive" className="tool-input" />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted">Total Amount</label>
              <input type="number" value={expAmount} onChange={e=>setExpAmount(+e.target.value)} className="tool-input" />
            </div>
            <div>
              <label className="text-xs text-muted">Paid by</label>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <select value={expPaidBy} onChange={e=>setExpPaidBy(e.target.value)} className="tool-input">
                {participants.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-muted">Tip (optional)</label>
              <input type="number" value={expTip} onChange={e=>setExpTip(+e.target.value)} className="tool-input" />
            </div>
            <div>
              <label className="text-xs text-muted">Tax (optional)</label>
              <input type="number" value={expTax} onChange={e=>setExpTax(+e.target.value)} className="tool-input" />
            </div>
            <div>
              <label className="text-xs text-muted">Split Mode</label>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <select value={expSplitMode} onChange={e=>setExpSplitMode(e.target.value as 'equal' | 'shares' | 'custom' | 'percentage')} className="tool-input">
                <option value="equal">Equal</option>
                <option value="shares">By Shares</option>
                <option value="custom">Custom Amounts</option>
                <option value="percentage">By Percentage</option>
              </select>
            </div>
          </div>

          {/* Dynamic shares for advanced modes */}
          {(expSplitMode !== 'equal') && (
            <div className="space-y-2">
              <div className="text-xs text-muted">Weights / Amounts per person</div>
              {participants.map(p => (
                <div key={p.id} className="flex items-center gap-3">
                  <div className="w-24 text-sm">{p.name}</div>
                  <input type="number" value={expShares[p.id] || 0} onChange={e => updateShare(p.id, +e.target.value)} className="tool-input w-28" />
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button onClick={addExpense} className="btn-primary flex-1">Add Expense</button>
            <button onClick={() => setShowAddForm(false)} className="btn-secondary flex-1">Cancel</button>
          </div>
          <p className="text-[10px] text-muted">Pro: For fully itemized, you can add multiple expenses or note in description for now.</p>
        </div>
      )}

      {/* Results - Balances & Settlements */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <ArrowRightLeft className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-lg">Live Split &amp; Settlements</h3>
        </div>

        <div className="mb-6">
          <div className="text-sm text-muted">Total: <span className="font-semibold text-text">₹{result.totalSpent}</span> • Avg per person: <span className="font-semibold text-text">₹{result.perPersonAverage}</span></div>
        </div>

        <div className="space-y-3 mb-6">
          {result.balances.map(b => (
            <div key={b.participantId} className="flex justify-between items-center p-3 bg-background rounded-2xl border border-border">
              <span className="font-medium">{b.name}</span>
              <span className={`font-mono text-sm ${b.net >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {b.net >= 0 ? '+' : ''}₹{b.net.toFixed(2)} {b.net >= 0 ? '(to receive)' : '(owes)'}
              </span>
            </div>
          ))}
        </div>

        {result.settlements.length > 0 && (
          <div>
            <div className="text-sm font-medium mb-2 text-muted">Optimal settlements (fewest transactions):</div>
            <div className="space-y-2">
              {result.settlements.map((s, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
                  <span className="font-medium">{s.from}</span>
                  <ArrowRightLeft className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">{s.to}</span>
                  <span className="ml-auto font-mono text-emerald-700">₹{s.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Share */}
      <div className="bg-card border border-border rounded-3xl p-6 flex flex-col sm:flex-row gap-3">
        <button onClick={generateAndCopySummary} className="btn-secondary flex-1 flex items-center justify-center gap-2">
          <Copy className="w-4 h-4" /> Copy Nice Summary (WhatsApp ready)
        </button>
        <button onClick={generateShareLink} className="btn-primary flex-1 flex items-center justify-center gap-2">
          <LinkIcon className="w-4 h-4" /> Copy Shareable Link (loads exact state)
        </button>
      </div>

      <p className="text-center text-xs text-muted">All calculations &amp; data stay in your browser. Share links are pure client-side encoded state.</p>
    </div>
  );
}
