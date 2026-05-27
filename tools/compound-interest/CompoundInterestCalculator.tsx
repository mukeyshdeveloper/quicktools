'use client'

import { useState } from 'react'
import { calculateCompoundInterest, type CompoundInterestResult } from './utils'
import { TrendingUp, RotateCcw, DollarSign, Percent, Calendar, PiggyBank, ArrowUpRight } from 'lucide-react'

function fmt(n: number): string {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const [monthly, setMonthly] = useState('0')
  const [frequency, setFrequency] = useState(12)
  const [result, setResult] = useState<CompoundInterestResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleCalculate() {
    const p = parseFloat(principal), r = parseFloat(rate), y = parseFloat(years), m = parseFloat(monthly) || 0
    if (isNaN(p) || isNaN(r) || isNaN(y)) { setError('Please fill in all required fields.'); return }
    const res = calculateCompoundInterest({ principal: p, annualRate: r, years: y, monthlyContribution: m, compoundingFrequency: frequency })
    if (!res) { setError('Please enter valid positive values.'); return }
    setError(null); setResult(res)
  }

  function handleReset() { setPrincipal(''); setRate(''); setYears(''); setMonthly('0'); setResult(null); setError(null) }

  const inputCls = "w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-green-500 outline-none text-gray-900 dark:text-white text-sm"

  return (
    <div className="space-y-8">
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl border border-white/40 dark:border-gray-800 shadow-2xl p-6 md:p-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6"><TrendingUp className="text-green-500" size={20} /> Investment Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2"><label className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1.5"><DollarSign size={14} /> Initial Investment</label><input type="number" placeholder="e.g. 100000" value={principal} onChange={e => setPrincipal(e.target.value)} className={inputCls} /></div>
          <div className="space-y-2"><label className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1.5"><Percent size={14} /> Annual Rate (%)</label><input type="number" step="0.1" placeholder="e.g. 12" value={rate} onChange={e => setRate(e.target.value)} className={inputCls} /></div>
          <div className="space-y-2"><label className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1.5"><Calendar size={14} /> Time (Years)</label><input type="number" placeholder="e.g. 10" value={years} onChange={e => setYears(e.target.value)} className={inputCls} /></div>
          <div className="space-y-2"><label className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1.5"><PiggyBank size={14} /> Monthly Contribution</label><input type="number" placeholder="0" value={monthly} onChange={e => setMonthly(e.target.value)} className={inputCls} /></div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Compounding Frequency</label>
            <div className="flex gap-2 flex-wrap">
              {[{ label: 'Yearly', value: 1 }, { label: 'Quarterly', value: 4 }, { label: 'Monthly', value: 12 }, { label: 'Daily', value: 365 }].map(opt => (
                <button key={opt.value} onClick={() => setFrequency(opt.value)} className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${frequency === opt.value ? 'bg-green-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>{opt.label}</button>
              ))}
            </div>
          </div>
        </div>
        {error && <p className="mt-4 text-sm text-red-500 font-medium" role="alert">{error}</p>}
        <div className="flex gap-3 mt-6">
          <button onClick={handleCalculate} className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-green-500/30 transition-all hover:scale-105 active:scale-95"><TrendingUp size={16} /> Calculate</button>
          {result && <button onClick={handleReset} className="flex items-center gap-2 px-5 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-sm rounded-xl hover:bg-gray-200 transition-all"><RotateCcw size={16} /> Reset</button>}
        </div>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl p-6 text-white shadow-xl"><div className="flex items-center gap-2 text-green-100 text-sm font-medium mb-2"><ArrowUpRight size={16} /> Future Value</div><div className="text-3xl font-black">₹{fmt(result.futureValue)}</div></div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white shadow-xl"><div className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2"><PiggyBank size={16} /> Total Invested</div><div className="text-3xl font-black">₹{fmt(result.totalContributions)}</div></div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white shadow-xl"><div className="flex items-center gap-2 text-purple-100 text-sm font-medium mb-2"><TrendingUp size={16} /> Interest Earned</div><div className="text-3xl font-black">₹{fmt(result.totalInterestEarned)}</div></div>
          </div>
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-2xl border border-white/40 dark:border-gray-800 shadow-lg p-6">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Year-by-Year Growth</h4>
            <div className="max-h-72 overflow-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 sticky top-0"><tr><th className="p-3">Year</th><th className="p-3">Invested</th><th className="p-3">Interest</th><th className="p-3">Balance</th></tr></thead>
                <tbody>{result.yearlyBreakdown.map(row => (<tr key={row.year} className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3 font-medium">{row.year}</td><td className="p-3 text-blue-600">₹{fmt(row.contributions)}</td><td className="p-3 text-purple-600">₹{fmt(row.interestEarned)}</td><td className="p-3 font-bold text-green-600">₹{fmt(row.balance)}</td></tr>))}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
