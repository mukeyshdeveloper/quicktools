'use client'

import { useState } from 'react'
import { calculateRoi, type RoiResult } from './utils'
import { TrendingUp, RotateCcw, DollarSign, Calendar, ArrowUpRight, BarChart3, Percent } from 'lucide-react'

function fmt(n: number): string {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function RoiCalculator() {
  const [cost, setCost] = useState('')
  const [returnAmt, setReturnAmt] = useState('')
  const [years, setYears] = useState('1')
  const [result, setResult] = useState<RoiResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleCalculate() {
    const c = parseFloat(cost), r = parseFloat(returnAmt), y = parseFloat(years) || 1
    if (isNaN(c) || isNaN(r)) { setError('Please enter cost and return values.'); return }
    const res = calculateRoi({ costOfInvestment: c, returnFromInvestment: r, investmentPeriodYears: y })
    if (!res) { setError('Cost must be greater than zero.'); return }
    setError(null); setResult(res)
  }

  function handleReset() { setCost(''); setReturnAmt(''); setYears('1'); setResult(null); setError(null) }

  const inputCls = "w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-red-500 outline-none text-gray-900 dark:text-white text-sm"

  return (
    <div className="space-y-8">
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl border border-white/40 dark:border-gray-800 shadow-2xl p-6 md:p-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6"><BarChart3 className="text-red-500" size={20} /> Investment Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="space-y-2"><label className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1.5"><DollarSign size={14} /> Cost of Investment</label><input type="number" placeholder="e.g. 100000" value={cost} onChange={e => setCost(e.target.value)} className={inputCls} /></div>
          <div className="space-y-2"><label className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1.5"><ArrowUpRight size={14} /> Return / Revenue</label><input type="number" placeholder="e.g. 150000" value={returnAmt} onChange={e => setReturnAmt(e.target.value)} className={inputCls} /></div>
          <div className="space-y-2"><label className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1.5"><Calendar size={14} /> Period (Years)</label><input type="number" step="0.5" placeholder="e.g. 2" value={years} onChange={e => setYears(e.target.value)} className={inputCls} /></div>
        </div>
        {error && <p className="mt-4 text-sm text-red-500 font-medium" role="alert">{error}</p>}
        <div className="flex gap-3 mt-6">
          <button onClick={handleCalculate} className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-red-500/30 transition-all hover:scale-105 active:scale-95"><BarChart3 size={16} /> Calculate ROI</button>
          {result && <button onClick={handleReset} className="flex items-center gap-2 px-5 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-sm rounded-xl hover:bg-gray-200 transition-all"><RotateCcw size={16} /> Reset</button>}
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className={`rounded-2xl p-6 text-white shadow-xl ${result.netProfit >= 0 ? 'bg-gradient-to-br from-green-500 to-emerald-700' : 'bg-gradient-to-br from-red-500 to-red-700'}`}>
            <div className="text-sm font-medium mb-2 opacity-80">Net Profit / Loss</div>
            <div className="text-3xl font-black">₹{fmt(result.netProfit)}</div>
          </div>
          <div className={`rounded-2xl p-6 text-white shadow-xl ${result.roi >= 0 ? 'bg-gradient-to-br from-blue-500 to-blue-700' : 'bg-gradient-to-br from-orange-500 to-red-600'}`}>
            <div className="text-sm font-medium mb-2 opacity-80 flex items-center gap-1"><Percent size={14} /> ROI</div>
            <div className="text-3xl font-black">{fmt(result.roi)}%</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white shadow-xl">
            <div className="text-sm font-medium mb-2 opacity-80 flex items-center gap-1"><TrendingUp size={14} /> Annualized ROI</div>
            <div className="text-3xl font-black">{fmt(result.annualizedRoi)}%</div>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-6 text-white shadow-xl">
            <div className="text-sm font-medium mb-2 opacity-80">Profit Margin</div>
            <div className="text-3xl font-black">{fmt(result.profitMargin)}%</div>
          </div>
          <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-6 text-white shadow-xl sm:col-span-2 lg:col-span-2">
            <div className="text-sm font-medium mb-2 opacity-80">Return Multiple</div>
            <div className="text-3xl font-black">{result.multiple}x</div>
            <div className="text-sm mt-2 opacity-70">Your money grew {result.multiple}x in {years} year(s)</div>
          </div>
        </div>
      )}
    </div>
  )
}
