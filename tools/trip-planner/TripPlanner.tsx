'use client';

import { useState, useEffect } from 'react';
import {
  calculateTripSplit,
  generateTripShareText,
  encodeTripForShare,
  decodeTripFromShare,
  type Participant,
  type Expense,
  type ItineraryItem,
} from './utils';
import { Plus, Trash2, Calendar, MapPin, Users, Receipt, Share2, Copy, Link as LinkIcon, Plane } from 'lucide-react';

export default function TripPlanner() {
  const [tripName, setTripName] = useState('Goa 2025');
  const [startDate, setStartDate] = useState('2025-03-15');
  const [endDate, setEndDate] = useState('2025-03-22');
  const [destinations, setDestinations] = useState<string[]>(['Goa']);

  const [participants, setParticipants] = useState<Participant[]>([
    { id: 'p1', name: 'You' },
    { id: 'p2', name: 'Priya' },
    { id: 'p3', name: 'Rahul' },
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);

  // Add forms state
  const [newPerson, setNewPerson] = useState('');
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showItineraryForm, setShowItineraryForm] = useState(false);

  // Simple expense form state (reuse similar to bill splitter)
  const [eDesc, setEDesc] = useState('');
  const [eAmount, setEAmount] = useState(0);
  const [ePaidBy, setEPaidBy] = useState('p1');
  const [eCategory, setECategory] = useState('food');

  // Itinerary form
  const [iDay, setIDay] = useState(1);
  const [iTitle, setITitle] = useState('');
  const [iEstCost, setIEstCost] = useState(0);
  const [iActual, setIActual] = useState(0);
  const [iParticipants, setIParticipants] = useState<string[]>([]);

  // Load from share link
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const data = new URLSearchParams(window.location.search).get('data');
    if (data) {
      const loaded = decodeTripFromShare(data);
      if (loaded) {
        setTripName(loaded.name || '');
        setStartDate(loaded.startDate || '');
        setEndDate(loaded.endDate || '');
        setDestinations(loaded.destinations || []);
        setParticipants(loaded.participants || []);
        setExpenses(loaded.expenses || []);
        setItinerary(loaded.itinerary || []);
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, []);

  const tripData = { name: tripName, startDate, endDate, destinations, participants, expenses, itinerary };
  const summary = calculateTripSplit(tripData);

  // Participants
  function addPerson() {
    const name = newPerson.trim();
    if (!name) return;
    const id = 'p' + Date.now().toString(36);
    setParticipants([...participants, { id, name }]);
    setNewPerson('');
  }

  function removePerson(id: string) {
    if (participants.length < 2) return;
    setParticipants(participants.filter(p => p.id !== id));
  }

  // Expenses (advanced enough)
  function addExpense() {
    if (!eDesc || eAmount <= 0) return;
    const newE: Expense = {
      id: 'e' + Date.now(),
      description: eDesc,
      totalAmount: eAmount,
      paidBy: ePaidBy,
      date: (new Date().toISOString().split('T')[0] as string),
      splitMode: 'equal',
      category: eCategory,
    };
    setExpenses([...expenses, newE]);
    setShowExpenseForm(false);
    setEDesc(''); setEAmount(0);
  }

  function removeExpense(id: string) {
    setExpenses(expenses.filter(e => e.id !== id));
  }

  // Itinerary
  function addItinerary() {
    if (!iTitle) return;
    const newI: ItineraryItem = {
      id: 'i' + Date.now(),
      day: iDay,
      title: iTitle,
      estimatedCost: iEstCost,
      actualCost: iActual || 0,
      participants: iParticipants.length ? iParticipants : participants.map(p => p.id),
    };
    setItinerary([...itinerary, newI].sort((a,b) => a.day - b.day));
    setShowItineraryForm(false);
    setITitle(''); setIEstCost(0); setIActual(0); setIParticipants([]);
  }

  function removeItinerary(id: string) {
    setItinerary(itinerary.filter(i => i.id !== id));
  }

  function toggleItinParticipant(pid: string) {
    setIParticipants(prev => prev.includes(pid) ? prev.filter(x => x !== pid) : [...prev, pid]);
  }

  // Share
  function copySummary() {
    const text = generateTripShareText(tripData, summary);
    navigator.clipboard.writeText(text).then(() => alert('Trip summary copied for friends!'));
  }

  function copyShareLink() {
    const encoded = encodeTripForShare(tripData);
    const url = `${location.origin}${location.pathname}?data=${encoded}`;
    navigator.clipboard.writeText(url).then(() => alert('Share link copied. Anyone opening it sees the full plan + split.'));
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Trip Header */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input value={tripName} onChange={e=>setTripName(e.target.value)} className="text-2xl font-semibold bg-transparent border-b border-border focus:outline-none w-full" placeholder="Trip name" />
          </div>
          <div className="flex gap-2 text-sm">
            <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} className="tool-input" />
            <span className="self-center text-muted">to</span>
            <input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} className="tool-input" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm text-muted">
          <MapPin className="w-4 h-4" />
          <input value={destinations.join(', ')} onChange={e=>setDestinations(e.target.value.split(',').map(s=>s.trim()))} className="bg-transparent flex-1" />
        </div>
      </div>

      {/* Participants */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="flex justify-between mb-3">
          <div className="font-semibold flex items-center gap-2"><Users className="w-4 h-4" /> Travelers</div>
          <div className="flex gap-2">
            <input value={newPerson} onChange={e=>setNewPerson(e.target.value)} placeholder="Add traveler" className="tool-input text-sm w-36" onKeyDown={e=>e.key==='Enter'&&addPerson()} />
            <button onClick={addPerson} className="btn-secondary text-xs px-3">Add</button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {participants.map(p => (
            <div key={p.id} className="px-3 py-1 bg-background border border-border rounded-2xl text-sm flex items-center gap-2">
              {p.name}
              {participants.length > 1 && <button onClick={()=>removePerson(p.id)} className="text-muted hover:text-rose-500">×</button>}
            </div>
          ))}
        </div>
      </div>

      {/* Itinerary */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold flex items-center gap-2"><Calendar className="w-4 h-4" /> Itinerary &amp; Activities</div>
          <button onClick={()=>setShowItineraryForm(true)} className="btn-primary text-xs px-4 py-1.5">+ Add Activity</button>
        </div>

        {itinerary.length === 0 && <p className="text-sm text-muted">Add day-by-day activities with estimated/actual costs. They feed directly into the bill split.</p>}

        <div className="space-y-2">
          {itinerary.map(item => (
            <div key={item.id} className="flex justify-between p-3 bg-background rounded-2xl border border-border text-sm">
              <div>Day {item.day}: <span className="font-medium">{item.title}</span> {item.location && `• ${item.location}`}</div>
              <div className="flex items-center gap-3 text-right">
                <span>Est ₹{item.estimatedCost} {item.actualCost ? `| Actual ₹${item.actualCost}` : ''}</span>
                <button onClick={() => removeItinerary(item.id)} className="text-muted hover:text-rose-500"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expenses - integrated advanced splitter */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold flex items-center gap-2"><Receipt className="w-4 h-4" /> Trip Expenses (feeds splitter)</div>
          <button onClick={() => setShowExpenseForm(true)} className="btn-primary text-xs px-4 py-1.5">+ Log Expense</button>
        </div>

        {expenses.length === 0 && <p className="text-sm text-muted mb-2">Log flights, hotels, cabs, food, activities etc. Supports custom splits.</p>}

        <div className="space-y-2 mb-4">
          {expenses.map(e => (
            <div key={e.id} className="flex justify-between items-center p-3 bg-background rounded-2xl border text-sm">
              <div>{e.description} <span className="text-xs text-muted">({e.category})</span></div>
              <div className="flex gap-3 items-center">
                <span className="font-mono">₹{e.totalAmount}</span>
                <button onClick={() => removeExpense(e.id)} className="text-muted hover:text-rose-500"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Summary + Settlement */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-3xl p-8">
        <div className="uppercase tracking-widest text-blue-200 text-xs mb-1">TRIP TOTAL</div>
        <div className="text-6xl font-black tabular-nums tracking-tighter">₹{summary.totalActual}</div>
        <div className="mt-1 text-blue-100">Estimated: ₹{summary.totalEstimated}</div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {Object.entries(summary.perPerson).map(([id, v]) => {
            const name = participants.find(p => p.id === id)?.name || id;
            return (
              <div key={id} className="bg-white/10 rounded-2xl p-4">
                <div className="text-blue-200">{name}</div>
                <div className="font-mono text-2xl font-semibold mt-1">₹{v.net.toFixed(0)}</div>
                <div className="text-xs text-blue-200">{v.net >= 0 ? 'gets back' : 'owes'}</div>
              </div>
            );
          })}
        </div>

        {summary.settlements.length > 0 && (
          <div className="mt-6">
            <div className="text-xs uppercase tracking-widest mb-2 text-blue-200">Optimal settlements</div>
            {summary.settlements.map((s, i) => (
              <div key={i} className="text-sm bg-white/10 rounded-xl px-4 py-2 mb-1 flex justify-between">
                <span>{s.from} → {s.to}</span>
                <span className="font-mono">₹{s.amount}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Share */}
      <div className="flex gap-3">
        <button onClick={copySummary} className="flex-1 btn-secondary flex items-center justify-center gap-2">
          <Copy className="w-4 h-4" /> Copy Shareable Summary
        </button>
        <button onClick={copyShareLink} className="flex-1 btn-primary flex items-center justify-center gap-2">
          <LinkIcon className="w-4 h-4" /> Copy Magic Share Link
        </button>
      </div>

      {/* Add forms (simple modals style) */}
      {showExpenseForm && (
        <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center p-4 z-50" onClick={() => setShowExpenseForm(false)}>
          <div className="bg-card w-full max-w-md rounded-t-3xl md:rounded-3xl p-6 space-y-4" onClick={e=>e.stopPropagation()}>
            <h4 className="font-semibold">Log Trip Expense</h4>
            <input value={eDesc} onChange={e=>setEDesc(e.target.value)} placeholder="Description" className="tool-input" />
            <div className="grid grid-cols-2 gap-3">
              <input type="number" value={eAmount} onChange={e=>setEAmount(+e.target.value)} placeholder="Amount" className="tool-input" />
              <select value={ePaidBy} onChange={e=>setEPaidBy(e.target.value)} className="tool-input">
                {participants.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <select value={eCategory} onChange={e=>setECategory(e.target.value)} className="tool-input">
              <option value="travel">Travel / Flights</option>
              <option value="stay">Stay / Hotel</option>
              <option value="food">Food &amp; Drinks</option>
              <option value="activity">Activities</option>
              <option value="transport">Local Transport</option>
              <option value="misc">Misc</option>
            </select>
            <div className="flex gap-3">
              <button onClick={addExpense} className="btn-primary flex-1">Add Expense</button>
              <button onClick={()=>setShowExpenseForm(false)} className="btn-secondary flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showItineraryForm && (
        <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center p-4 z-50" onClick={()=>setShowItineraryForm(false)}>
          <div className="bg-card w-full max-w-md rounded-t-3xl md:rounded-3xl p-6 space-y-4" onClick={e=>e.stopPropagation()}>
            <h4 className="font-semibold">Add Itinerary Item</h4>
            <div className="grid grid-cols-2 gap-3">
              <input type="number" value={iDay} onChange={e=>setIDay(+e.target.value)} placeholder="Day #" className="tool-input" />
              <input value={iTitle} onChange={e=>setITitle(e.target.value)} placeholder="Title e.g. Beach day" className="tool-input" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="number" value={iEstCost} onChange={e=>setIEstCost(+e.target.value)} placeholder="Est cost" className="tool-input" />
              <input type="number" value={iActual} onChange={e=>setIActual(+e.target.value)} placeholder="Actual (optional)" className="tool-input" />
            </div>
            <div>
              <div className="text-xs mb-1 text-muted">Who joins?</div>
              <div className="flex flex-wrap gap-2">
                {participants.map(p => (
                  <button key={p.id} onClick={()=>toggleItinParticipant(p.id)} className={`text-xs px-3 py-1 rounded-2xl border ${iParticipants.includes(p.id) ? 'bg-blue-600 text-white border-blue-600' : 'border-border'}`}>{p.name}</button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={addItinerary} className="btn-primary flex-1">Add to Itinerary</button>
              <button onClick={()=>setShowItineraryForm(false)} className="btn-secondary flex-1">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <p className="text-center text-xs text-muted">Everything is saved locally. Use share links for friends to see the exact plan + who owes what.</p>
    </div>
  );
}
