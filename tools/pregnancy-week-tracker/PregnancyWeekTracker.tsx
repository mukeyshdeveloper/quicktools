'use client';

import { useState, useMemo, useEffect } from 'react';
import { getCurrentWeek, getWeekInfo, type WeekInfo } from './utils';
import { Baby, Calendar } from 'lucide-react';

export default function PregnancyWeekTracker() {
  const [dueDateStr, setDueDateStr] = useState('');

  useEffect(() => {
    if (!dueDateStr) {
      const defaultDue = new Date();
      defaultDue.setDate(defaultDue.getDate() + 280); // ~40 weeks
      setDueDateStr(defaultDue.toISOString().split('T')[0]!);
    }
  }, []);

  const currentWeek = useMemo(() => {
    if (!dueDateStr) return 20;
    return getCurrentWeek(new Date(dueDateStr));
  }, [dueDateStr]);

  const info: WeekInfo | null = useMemo(() => getWeekInfo(currentWeek), [currentWeek]);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-card border border-border rounded-3xl p-6">
        <label className="label flex items-center gap-2"><Calendar className="w-4 h-4" /> Your Due Date</label>
        <input type="date" value={dueDateStr} onChange={e => setDueDateStr(e.target.value)} className="tool-input" />
        <p className="text-sm mt-3">You are currently in <span className="font-bold text-pink-600">Week {currentWeek}</span> of pregnancy.</p>
      </div>

      {info && (
        <div className="bg-card border border-border rounded-3xl p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink-100 rounded-2xl text-pink-600"><Baby size={28} /></div>
            <div>
              <div className="text-sm text-muted">Trimester {info.trimester} • Week {info.week}</div>
              <div className="text-2xl font-bold">Baby is the size of a {info.babySize}</div>
            </div>
          </div>

          <div>
            <div className="font-semibold mb-2">This Week’s Milestone</div>
            <p className="text-sm">{info.milestone}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="font-semibold mb-2 text-pink-600">Common Symptoms</div>
              <ul className="text-sm space-y-1 list-disc pl-5">
                {info.symptoms.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-2 text-emerald-600">Tips for This Week</div>
              <ul className="text-sm space-y-1 list-disc pl-5">
                {info.tips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}

      <p className="text-center text-xs text-muted">Information is general. Every pregnancy is unique — consult your healthcare provider.</p>
    </div>
  );
}
