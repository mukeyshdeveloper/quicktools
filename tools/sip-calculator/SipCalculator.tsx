'use client'

import { useState } from 'react'
import { calculateSip, type SipResult } from './utils'
import { TrendingUp, RotateCcw, DollarSign, Percent, Calendar, PiggyBank, ArrowUpRight } from 'lucide-react'

function fmt(n: number): string {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function SipCalculator() {
  const [monthly, setMonthly] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const [result, setResult] = useState<SipResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleCalculate() {
    const m = parseFloat(monthly), r = parseFloat(rate), y = parseFloat(years)
    if (isNaN(m) || isNaN(r) || isNaN(y)) { setError('Please fill in all fields.'); return }
    const res = calculateSip({ monthlyInvestment: m, annualReturnRate: r, years: y })
    if (!res) { setError('Please enter valid positive values.'); return }
    setError(null); setResult(res)
  }

  function handleReset() { setMonthly(''); setRate(''); setYears(''); setResult(null); setError(null) }

  const inputCls = "w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none text-gray-900 dark:text-white text-sm"
  const investedPct = result ? (result.totalInvested / result.futureValue) * 100 : 0
  const returnsPct = result ? (result.wealthGained / result.futureValue) * 100 : 0

  return (
    <div className="space-y-8">
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl border border-white/40 dark:border-gray-800 shadow-2xl p-6 md:p-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6"><TrendingUp className="text-orange-500" size={20} /> SIP Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="space-y-2"><label className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1.5"><DollarSign size={14} /> Monthly Investment</label><input type="number" placeholder="e.g. 5000" value={monthly} onChange={e => setMonthly(e.target.value)} className={inputCls} /></div>
          <div className="space-y-2"><label className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1.5"><Percent size={14} /> Expected Return (%)</label><input type="number" step="0.5" placeholder="e.g. 12" value={rate} onChange={e => setRate(e.target.value)} className={inputCls} /></div>
          <div className="space-y-2"><label className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1.5"><Calendar size={14} /> Time (Years)</label><input type="number" placeholder="e.g. 10" value={years} onChange={e => setYears(e.target.value)} className={inputCls} /></div>
        </div>
        {error && <p className="mt-4 text-sm text-red-500 font-medium" role="alert">{error}</p>}
        <div className="flex gap-3 mt-6">
          <button onClick={handleCalculate} className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-orange-500/30 transition-all hover:scale-105 active:scale-95"><TrendingUp size={16} /> Calculate SIP</button>
          {result && <button onClick={handleReset} className="flex items-center gap-2 px-5 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-sm rounded-xl hover:bg-gray-200 transition-all"><RotateCcw size={16} /> Reset</button>}
        </div>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-orange-500 to-amber-700 rounded-2xl p-6 text-white shadow-xl"><div className="flex items-center gap-2 text-orange-100 text-sm font-medium mb-2"><ArrowUpRight size={16} /> Future Value</div><div className="text-3xl font-black">₹{fmt(result.futureValue)}</div></div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white shadow-xl"><div className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2"><PiggyBank size={16} /> Total Invested</div><div className="text-3xl font-black">₹{fmt(result.totalInvested)}</div></div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl p-6 text-white shadow-xl"><div className="flex items-center gap-2 text-green-100 text-sm font-medium mb-2"><TrendingUp size={16} /> Wealth Gained</div><div className="text-3xl font-black">₹{fmt(result.wealthGained)}</div></div>
          </div>

          {/* Visual Breakdown Bar */}
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-2xl border border-white/40 dark:border-gray-800 shadow-lg p-6">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Investment vs Returns</h4>
            <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
              <div className="h-full bg-blue-500 transition-all" style={{ width: `${investedPct}%` }} />
              <div className="h-full bg-green-500 transition-all" style={{ width: `${returnsPct}%` }} />
            </div>
            <div className="flex justify-between mt-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-500 rounded-full inline-block" /> Invested ({investedPct.toFixed(1)}%)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-green-500 rounded-full inline-block" /> Returns ({returnsPct.toFixed(1)}%)</span>
            </div>
          </div>

          {/* Year-by-Year Table */}
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-2xl border border-white/40 dark:border-gray-800 shadow-lg p-6">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Year-by-Year Growth</h4>
            <div className="max-h-72 overflow-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 sticky top-0"><tr><th className="p-3">Year</th><th className="p-3">Invested</th><th className="p-3">Returns</th><th className="p-3">Value</th></tr></thead>
                <tbody>{result.yearlyBreakdown.map(row => (<tr key={row.year} className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3 font-medium">{row.year}</td><td className="p-3 text-blue-600">₹{fmt(row.invested)}</td><td className="p-3 text-green-600">₹{fmt(row.returns)}</td><td className="p-3 font-bold text-orange-600">₹{fmt(row.value)}</td></tr>))}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
