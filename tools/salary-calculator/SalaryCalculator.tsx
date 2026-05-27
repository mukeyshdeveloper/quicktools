'use client'

import { useState } from 'react'
import { calculateSalary, type SalaryResult, type PayPeriod } from './utils'
import { DollarSign, RotateCcw, Percent, Clock, CalendarDays, Briefcase } from 'lucide-react'

function fmt(n: number): string {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function SalaryCalculator() {
  const [amount, setAmount] = useState('')
  const [payPeriod, setPayPeriod] = useState<PayPeriod>('annual')
  const [hours, setHours] = useState('40')
  const [days, setDays] = useState('5')
  const [tax, setTax] = useState('0')
  const [result, setResult] = useState<SalaryResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleCalculate() {
    const a = parseFloat(amount)
    if (isNaN(a)) { setError('Please enter a salary amount.'); return }
    const res = calculateSalary({ amount: a, payPeriod, hoursPerWeek: parseFloat(hours) || 40, daysPerWeek: parseFloat(days) || 5, taxRate: parseFloat(tax) || 0 })
    if (!res) { setError('Please enter valid values.'); return }
    setError(null); setResult(res)
  }

  function handleReset() { setAmount(''); setResult(null); setError(null) }

  const inputCls = "w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 dark:text-white text-sm"
  const periods: { label: string; value: PayPeriod }[] = [
    { label: 'Hourly', value: 'hourly' }, { label: 'Daily', value: 'daily' }, { label: 'Weekly', value: 'weekly' },
    { label: 'Bi-weekly', value: 'biweekly' }, { label: 'Monthly', value: 'monthly' }, { label: 'Annual', value: 'annual' },
  ]

  return (
    <div className="space-y-8">
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl border border-white/40 dark:border-gray-800 shadow-2xl p-6 md:p-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6"><Briefcase className="text-purple-500" size={20} /> Salary Details</h3>
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Pay Period</label>
            <div className="flex gap-2 flex-wrap">
              {periods.map(p => (
                <button key={p.value} onClick={() => setPayPeriod(p.value)} className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${payPeriod === p.value ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'}`}>{p.label}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2"><label className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1.5"><DollarSign size={14} /> {payPeriod.charAt(0).toUpperCase() + payPeriod.slice(1)} Amount</label><input type="number" placeholder="e.g. 50000" value={amount} onChange={e => setAmount(e.target.value)} className={inputCls} /></div>
            <div className="space-y-2"><label className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1.5"><Percent size={14} /> Tax Rate (%)</label><input type="number" step="0.5" placeholder="e.g. 30" value={tax} onChange={e => setTax(e.target.value)} className={inputCls} /></div>
            <div className="space-y-2"><label className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1.5"><Clock size={14} /> Hours / Week</label><input type="number" value={hours} onChange={e => setHours(e.target.value)} className={inputCls} /></div>
            <div className="space-y-2"><label className="text-sm font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1.5"><CalendarDays size={14} /> Days / Week</label><input type="number" value={days} onChange={e => setDays(e.target.value)} className={inputCls} /></div>
          </div>
        </div>
        {error && <p className="mt-4 text-sm text-red-500 font-medium" role="alert">{error}</p>}
        <div className="flex gap-3 mt-6">
          <button onClick={handleCalculate} className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-purple-500/30 transition-all hover:scale-105 active:scale-95"><DollarSign size={16} /> Calculate</button>
          {result && <button onClick={handleReset} className="flex items-center gap-2 px-5 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-sm rounded-xl hover:bg-gray-200 transition-all"><RotateCcw size={16} /> Reset</button>}
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-2xl border border-white/40 dark:border-gray-800 shadow-lg overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700">
              <div className="p-5"><div className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-1">Hourly</div><div className="text-xl font-black text-gray-900 dark:text-white">₹{fmt(result.hourly)}</div><div className="text-xs text-green-600 font-semibold mt-1">After tax: ₹{fmt(result.afterTaxHourly)}</div></div>
              <div className="p-5"><div className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-1">Daily</div><div className="text-xl font-black text-gray-900 dark:text-white">₹{fmt(result.daily)}</div></div>
              <div className="p-5 border-t border-gray-200 dark:border-gray-700"><div className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-1">Weekly</div><div className="text-xl font-black text-gray-900 dark:text-white">₹{fmt(result.weekly)}</div><div className="text-xs text-green-600 font-semibold mt-1">After tax: ₹{fmt(result.afterTaxWeekly)}</div></div>
              <div className="p-5 border-t border-gray-200 dark:border-gray-700"><div className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-1">Bi-weekly</div><div className="text-xl font-black text-gray-900 dark:text-white">₹{fmt(result.biweekly)}</div></div>
              <div className="p-5 border-t border-gray-200 dark:border-gray-700"><div className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-1">Monthly</div><div className="text-xl font-black text-gray-900 dark:text-white">₹{fmt(result.monthly)}</div><div className="text-xs text-green-600 font-semibold mt-1">After tax: ₹{fmt(result.afterTaxMonthly)}</div></div>
              <div className="p-5 border-t border-gray-200 dark:border-gray-700"><div className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-1">Annual</div><div className="text-xl font-black text-gray-900 dark:text-white">₹{fmt(result.annual)}</div><div className="text-xs text-green-600 font-semibold mt-1">After tax: ₹{fmt(result.afterTaxAnnual)}</div></div>
            </div>
          </div>
          {result.taxAmount > 0 && (
            <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-6 text-white shadow-xl">
              <div className="text-red-100 text-sm font-medium mb-2">Estimated Annual Tax</div>
              <div className="text-3xl font-black">₹{fmt(result.taxAmount)}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
