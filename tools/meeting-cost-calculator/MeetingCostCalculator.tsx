'use client';

import { useState, useMemo } from 'react';
import {
  calculateMeetingCost,
  formatINR,
  DEFAULT_ATTENDEES,
  type Attendee,
} from './utils';
import { Users, Clock, Plus, Trash2, TrendingUp } from 'lucide-react';

export default function MeetingCostCalculator() {
  const [attendees, setAttendees] = useState<Attendee[]>(DEFAULT_ATTENDEES);
  const [duration, setDuration] = useState(45);
  const [overhead, setOverhead] = useState(1.3);
  const [recurring, setRecurring] = useState(4); // meetings per month

  const result = useMemo(
    () =>
      calculateMeetingCost({
        attendees,
        durationMinutes: duration,
        overheadMultiplier: overhead,
        meetingsPerYear: recurring * 12,
      }),
    [attendees, duration, overhead, recurring]
  );

  function updateAttendee(id: string, field: 'role' | 'hourlyRate', value: string | number) {
    setAttendees((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              [field]: field === 'hourlyRate' ? Math.max(100, Math.min(5000, Number(value))) : value,
            }
          : a
      )
    );
  }

  function addAttendee() {
    const newA: Attendee = {
      id: Date.now().toString(36),
      role: 'New Attendee',
      hourlyRate: 900,
    };
    setAttendees([...attendees, newA]);
  }

  function removeAttendee(id: string) {
    if (attendees.length <= 1) return;
    setAttendees(attendees.filter((a) => a.id !== id));
  }

  const totalHourly = attendees.reduce((sum, a) => sum + a.hourlyRate, 0);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-card border border-border rounded-3xl p-6 space-y-6">
        {/* Attendees table */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="font-bold flex items-center gap-2 text-sm uppercase tracking-widest text-muted">
              <Users className="w-4 h-4" /> Attendees &amp; Hourly Cost (₹)
            </div>
            <button onClick={addAttendee} className="btn-secondary text-xs px-3 py-1 flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add person
            </button>
          </div>

          <div className="space-y-2">
            {attendees.map((a) => (
              <div key={a.id} className="flex gap-3 items-center">
                <input
                  value={a.role}
                  onChange={(e) => updateAttendee(a.id, 'role', e.target.value)}
                  className="tool-input flex-1"
                />
                <div className="flex items-center gap-2 w-44">
                  <span className="text-xs text-muted">₹</span>
                  <input
                    type="number"
                    value={a.hourlyRate}
                    onChange={(e) => updateAttendee(a.id, 'hourlyRate', e.target.value)}
                    className="tool-input w-24 text-right font-mono"
                  />
                  <span className="text-xs text-muted">/hr</span>
                </div>
                <button onClick={() => removeAttendee(a.id)} disabled={attendees.length <= 1} className="p-1 text-muted hover:text-rose-600 disabled:opacity-40">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="text-xs text-muted mt-2">Total team hourly cost: <span className="font-medium text-text">{formatINR(totalHourly)}</span></div>
        </div>

        {/* Duration & Overhead */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-bold text-text flex justify-between mb-2">
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Duration</span>
              <span className="font-mono text-amber-600">{duration} min</span>
            </label>
            <input type="range" min="5" max="180" step="5" value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} className="w-full accent-amber-500" />
            <input type="number" value={duration} onChange={(e) => setDuration(Math.max(5, Math.min(300, parseInt(e.target.value) || 45)))} className="tool-input mt-2 w-24 text-center" />
          </div>

          <div>
            <label className="text-sm font-bold text-text flex justify-between mb-2">
              Overhead multiplier
              <span className="font-mono text-amber-600">{overhead.toFixed(1)}×</span>
            </label>
            <input type="range" min="1" max="3" step="0.1" value={overhead} onChange={(e) => setOverhead(parseFloat(e.target.value))} className="w-full accent-amber-500" />
            <div className="text-xs text-muted mt-1">1.0 = salary only • 1.5–2.0 recommended (benefits, context switching, etc.)</div>
          </div>
        </div>

        {/* Recurring */}
        <div>
          <label className="text-sm font-bold text-text mb-2 block">How often does this meeting happen?</label>
          <div className="flex items-center gap-3">
            <input type="number" value={recurring} onChange={(e) => setRecurring(Math.max(0, parseInt(e.target.value) || 0))} className="tool-input w-20 text-center" />
            <span className="text-sm text-muted">times per month</span>
            <span className="text-xs text-muted">({recurring * 12} per year)</span>
          </div>
        </div>
      </div>

      {/* Result */}
      {!result ? (
        <div className="tool-panel text-center text-muted">Add at least one attendee and a duration to see the cost.</div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 p-8 text-white">
            <div className="text-amber-100 text-xs tracking-[2px] font-bold">TOTAL COST OF THIS MEETING</div>
            <div className="font-display text-7xl font-black tracking-tighter mt-1 tabular-nums">{formatINR(result.totalCost)}</div>
            <div className="mt-1 text-amber-100">≈ {formatINR(result.costPerMinute)} per minute • {formatINR(result.costPerPerson)} per person</div>
          </div>

          {/* Breakdown */}
          <div className="bg-card border border-border rounded-3xl p-6">
            <div className="text-sm font-bold text-muted mb-3">Cost breakdown</div>
            <div className="space-y-3">
              {result.breakdown.map((b, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="w-40 text-right text-muted truncate">{b.role}</div>
                  <div className="flex-1 bg-background h-2.5 rounded-full overflow-hidden border border-border">
                    <div className="h-2.5 bg-amber-500" style={{ width: `${Math.min(100, (b.cost / result.totalCost) * 100)}%` }} />
                  </div>
                  <div className="w-24 font-medium tabular-nums text-right">{formatINR(b.cost)}</div>
                </div>
              ))}
            </div>
          </div>

          {result.annualProjection !== null && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm flex gap-3">
              <TrendingUp className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                If this meeting happens {recurring}× per month, it will cost your team <span className="font-semibold">{formatINR(result.annualProjection!)}</span> every year.
                <div className="text-xs text-amber-700 mt-1">That’s often enough to hire part-time help or buy better tools.</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
