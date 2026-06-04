'use client';

import { useState, useMemo } from 'react';
import { getNameMeaning, calculateNumerology, getCombinedInsights, type NumerologyResult, type NameInfo } from './utils';
import { User, Calendar, Star } from 'lucide-react';

export default function NameNumerology() {
  const [fullName, setFullName] = useState('Aarav Sharma');
  const [birthDate, setBirthDate] = useState('1995-05-15');

  const nameInfo = useMemo(() => getNameMeaning(fullName.split(' ')[0] || ''), [fullName]);
  const numerology = useMemo(() => calculateNumerology(fullName, birthDate), [fullName, birthDate]);
  const insights = useMemo(() => getCombinedInsights(nameInfo, numerology), [nameInfo, numerology]);

  function handleReset() {
    setFullName('Aarav Sharma');
    setBirthDate('1995-05-15');
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-card border border-border rounded-3xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label flex items-center gap-2"><User className="w-4 h-4" /> Full Name</label>
            <input value={fullName} onChange={e => setFullName(e.target.value)} className="tool-input" placeholder="Your full name" />
          </div>
          <div>
            <label className="label flex items-center gap-2"><Calendar className="w-4 h-4" /> Birth Date (for Life Path)</label>
            <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="tool-input" />
          </div>
        </div>
        <button onClick={handleReset} className="text-xs text-muted hover:text-text">Reset example</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Name Meaning */}
        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-4 text-pink-600"><Star className="w-5 h-5" /> <span className="font-semibold">Name Meaning</span></div>
          {nameInfo ? (
            <div className="space-y-3">
              <div>
                <span className="text-xs uppercase text-muted">Origin</span>
                <p className="font-medium">{nameInfo.origin}</p>
              </div>
              <div>
                <span className="text-xs uppercase text-muted">Meaning</span>
                <p className="font-medium">{nameInfo.meaning}</p>
              </div>
              <div>
                <span className="text-xs uppercase text-muted">Associated Traits</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {nameInfo.traits.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted">No specific meaning data for this name. Numerology still applies!</p>
          )}
        </div>

        {/* Numerology Numbers */}
        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="font-semibold mb-4">Numerology Breakdown</div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {numerology.lifePath && <div className="p-3 bg-background rounded-2xl"><span className="block text-xs text-muted">Life Path</span><span className="text-2xl font-bold text-violet-600">{numerology.lifePath}</span></div>}
            <div className="p-3 bg-background rounded-2xl"><span className="block text-xs text-muted">Destiny / Expression</span><span className="text-2xl font-bold">{numerology.destiny}</span></div>
            <div className="p-3 bg-background rounded-2xl"><span className="block text-xs text-muted">Soul Urge</span><span className="text-2xl font-bold">{numerology.soulUrge}</span></div>
            <div className="p-3 bg-background rounded-2xl"><span className="block text-xs text-muted">Personality</span><span className="text-2xl font-bold">{numerology.personality}</span></div>
            {numerology.maturity && <div className="p-3 bg-background rounded-2xl col-span-2"><span className="block text-xs text-muted">Maturity Number</span><span className="text-2xl font-bold text-violet-600">{numerology.maturity}</span></div>}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="font-semibold mb-4">Combined Insights</div>
        <ul className="space-y-3 text-sm">
          {insights.map((insight, i) => (
            <li key={i} className="flex gap-3"><span className="text-violet-500 mt-1">●</span> {insight}</li>
          ))}
        </ul>
      </div>

      <p className="text-center text-xs text-muted">All calculations happen in your browser using traditional Pythagorean numerology and curated name data.</p>
    </div>
  );
}
