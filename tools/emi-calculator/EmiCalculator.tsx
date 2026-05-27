'use client'

import { useState } from 'react'
import { calculateEmi, type EmiResult } from './utils'
import { DollarSign, RotateCcw, TrendingUp, Percent, Calendar, PiggyBank, Landmark, CreditCard } from 'lucide-react'

function fmt(n: number): string {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState<string>('')
  const [rate, setRate] = useState<string>('')
  const [tenure, setTenure] = useState<string>('')
  const [tenureType, setTenureType] = useState<'months' | 'years'>('years')
  const [result, setResult] = useState<EmiResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showSchedule, setShowSchedule] = useState(false)

  function handleCalculate() {
    const p = parseFloat(principal)
    const r = parseFloat(rate)
    const t = parseFloat(tenure)
    if (isNaN(p) || isNaN(r) || isNaN(t)) {
      setError('Please fill in all fields with valid numbers.')
      return
    }
    const months = tenureType === 'years' ? t * 12 : t
    const res = calculateEmi({ principal: p, annualRate: r, tenureMonths: months })
    if (!res) { setError('Please enter positive values.'); return }
    setError(null)
    setResult(res)
  }

  function handleReset() {
    setPrincipal('')
    setRate('')
    setTenure('')
    setResult(null)
    setError(null)
    setShowSchedule(false)
  }

  const principalPercent = result ? (parseFloat(principal) / result.totalPayment) * 100 : 0
  const interestPercent = result ? (result.totalInterest / result.totalPayment) * 100 : 0

  return (
    <div className="space-y-8">
      {/* Input Card */}
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl border border-white/40 dark:border-gray-800 shadow-2xl p-6 md:p-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
          <Landmark className="text-blue-500" size={20} /> Loan Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
              <DollarSign size={14} /> Loan Amount
            </label>
            <input
              type="number"
              placeholder="e.g. 500000"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
              <Percent size={14} /> Annual Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g. 8.5"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
              <Calendar size={14} /> Loan Tenure
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="e.g. 20"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="flex-1 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white text-sm"
              />
              <select
                value={tenureType}
                onChange={(e) => setTenureType(e.target.value as 'months' | 'years')}
                className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white outline-none"
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-500 font-medium" role="alert">{error}</p>}

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCalculate}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
          >
            <TrendingUp size={16} /> Calculate EMI
          </button>
          {result && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-5 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-sm rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              <RotateCcw size={16} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Result Cards */}
      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20">
              <div className="flex items-center gap-2 text-blue-100 text-sm font-medium mb-2"><CreditCard size={16} /> Monthly EMI</div>
              <div className="text-3xl font-black">₹{fmt(result.emi)}</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl p-6 text-white shadow-xl shadow-green-500/20">
              <div className="flex items-center gap-2 text-green-100 text-sm font-medium mb-2"><PiggyBank size={16} /> Total Payment</div>
              <div className="text-3xl font-black">₹{fmt(result.totalPayment)}</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-xl shadow-orange-500/20">
              <div className="flex items-center gap-2 text-orange-100 text-sm font-medium mb-2"><TrendingUp size={16} /> Total Interest</div>
              <div className="text-3xl font-black">₹{fmt(result.totalInterest)}</div>
            </div>
          </div>

          {/* Visual Breakdown Bar */}
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-2xl border border-white/40 dark:border-gray-800 shadow-lg p-6">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Payment Breakdown</h4>
            <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
              <div className="h-full bg-blue-500 transition-all" style={{ width: `${principalPercent}%` }} />
              <div className="h-full bg-orange-500 transition-all" style={{ width: `${interestPercent}%` }} />
            </div>
            <div className="flex justify-between mt-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-500 rounded-full inline-block" /> Principal ({principalPercent.toFixed(1)}%)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-orange-500 rounded-full inline-block" /> Interest ({interestPercent.toFixed(1)}%)</span>
            </div>
          </div>

          {/* Amortization Schedule Toggle */}
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-2xl border border-white/40 dark:border-gray-800 shadow-lg p-6">
            <button
              onClick={() => setShowSchedule(v => !v)}
              className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              {showSchedule ? 'Hide' : 'Show'} Amortization Schedule ({result.schedule.length} months)
            </button>
            {showSchedule && (
              <div className="mt-4 max-h-80 overflow-auto rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 sticky top-0">
                    <tr>
                      <th className="p-3 font-semibold">Month</th>
                      <th className="p-3 font-semibold">EMI</th>
                      <th className="p-3 font-semibold">Principal</th>
                      <th className="p-3 font-semibold">Interest</th>
                      <th className="p-3 font-semibold">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.map(row => (
                      <tr key={row.month} className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="p-3 font-medium">{row.month}</td>
                        <td className="p-3">₹{fmt(row.emi)}</td>
                        <td className="p-3 text-blue-600">₹{fmt(row.principal)}</td>
                        <td className="p-3 text-orange-600">₹{fmt(row.interest)}</td>
                        <td className="p-3 font-semibold">₹{fmt(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
