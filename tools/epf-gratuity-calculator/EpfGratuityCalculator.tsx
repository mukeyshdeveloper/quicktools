'use client';

import { useState, useEffect } from 'react';
import { calculateCombined, formatINR, type CombinedResult } from './utils';
import { RotateCcw, TrendingUp, Award } from 'lucide-react';

export default function EpfGratuityCalculator() {
  const [monthlySalary, setMonthlySalary] = useState('50000');
  const [currentEpfBalance, setCurrentEpfBalance] = useState('1200000');
  const [yearsToRetirement, setYearsToRetirement] = useState('22');
  const [yearsOfService, setYearsOfService] = useState('8');
  const [salaryGrowthRate, setSalaryGrowthRate] = useState('8');
  const [epfInterestRate, setEpfInterestRate] = useState('8.25');

  const [result, setResult] = useState<CombinedResult | null>(null);

  useEffect(() => {
    const input = {
      monthlySalary: parseFloat(monthlySalary) || 0,
      currentEpfBalance: parseFloat(currentEpfBalance) || 0,
      yearsToRetirement: parseFloat(yearsToRetirement) || 0,
      salaryGrowthRate: parseFloat(salaryGrowthRate) || 0,
      epfInterestRate: parseFloat(epfInterestRate) || 8.25,
      yearsOfService: parseFloat(yearsOfService) || 0,
    };

    if (input.monthlySalary > 0 && input.yearsToRetirement > 0) {
      const res = calculateCombined(input);
      setResult(res);
    } else {
      setResult(null);
    }
  }, [monthlySalary, currentEpfBalance, yearsToRetirement, yearsOfService, salaryGrowthRate, epfInterestRate]);

  function handleReset() {
    setMonthlySalary('50000');
    setCurrentEpfBalance('1200000');
    setYearsToRetirement('22');
    setYearsOfService('8');
    setSalaryGrowthRate('8');
    setEpfInterestRate('8.25');
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-7">
        
        {/* Salary Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-2">
              Monthly Basic Salary + DA
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-emerald-600">₹</span>
              <input
                type="number"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(e.target.value)}
                className="w-full pl-12 pr-6 py-3.5 text-3xl font-black tracking-tighter bg-background border-2 border-border focus:border-emerald-500 rounded-2xl outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-2">
              Current EPF Balance (optional)
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-emerald-600">₹</span>
              <input
                type="number"
                value={currentEpfBalance}
                onChange={(e) => setCurrentEpfBalance(e.target.value)}
                className="w-full pl-12 pr-6 py-3.5 text-3xl font-black tracking-tighter bg-background border-2 border-border focus:border-emerald-500 rounded-2xl outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Time Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-2">
              Years to Retirement
            </label>
            <input
              type="number"
              value={yearsToRetirement}
              onChange={(e) => setYearsToRetirement(e.target.value)}
              className="w-full py-3 px-4 text-2xl font-bold bg-background border-2 border-border focus:border-emerald-500 rounded-2xl outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-2">
              Years of Service (for Gratuity)
            </label>
            <input
              type="number"
              value={yearsOfService}
              onChange={(e) => setYearsOfService(e.target.value)}
              className="w-full py-3 px-4 text-2xl font-bold bg-background border-2 border-border focus:border-emerald-500 rounded-2xl outline-none"
            />
            <p className="text-[11px] text-muted mt-1">Minimum 5 years required for gratuity</p>
          </div>

          <div>
            <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-2">
              Expected Salary Growth (per year)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.5"
                value={salaryGrowthRate}
                onChange={(e) => setSalaryGrowthRate(e.target.value)}
                className="flex-1 py-3 px-4 text-2xl font-bold bg-background border-2 border-border focus:border-emerald-500 rounded-2xl outline-none"
              />
              <span className="text-xl font-bold text-muted">%</span>
            </div>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-2">
            EPF Interest Rate
          </label>
          <div className="flex items-center gap-2 max-w-[220px]">
            <input
              type="number"
              step="0.05"
              value={epfInterestRate}
              onChange={(e) => setEpfInterestRate(e.target.value)}
              className="flex-1 py-3 px-4 text-2xl font-bold bg-background border-2 border-border focus:border-emerald-500 rounded-2xl outline-none"
            />
            <span className="text-xl font-bold text-muted">%</span>
          </div>
          <p className="text-[11px] text-muted mt-1">Current rate (FY 2025-26): 8.25%</p>
        </div>
      </div>

      {/* Results */}
      {result ? (
        <div className="space-y-6">
          {/* Total Benefit */}
          <div className="bg-emerald-600 text-white rounded-3xl p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="h-5 w-5" />
              <span className="font-bold tracking-widest text-sm uppercase">Total Estimated Retirement Benefit</span>
            </div>
            <p className="text-6xl sm:text-7xl font-black tracking-[-3px] tabular-nums">
              {formatINR(result.totalRetirementBenefit)}
            </p>
            <p className="mt-2 text-emerald-200 text-sm">EPF Corpus + Gratuity</p>
          </div>

          {/* Breakdown Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* EPF Card */}
            <div className="bg-card border border-border rounded-3xl p-7">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="text-emerald-600" />
                <h3 className="font-bold text-xl">EPF Corpus at Retirement</h3>
              </div>
              <p className="text-xs text-muted mb-4">Based on 12% employee + 3.67% employer contribution</p>

              <div className="text-5xl font-black tracking-tight text-emerald-600 mb-5 tabular-nums">
                {formatINR(result.epf.totalEpfCorpus)}
              </div>

              <div className="space-y-2 text-sm border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-muted">Total Contributions</span>
                  <span className="font-semibold">{formatINR(result.epf.totalContributions)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Interest Earned</span>
                  <span className="font-semibold text-emerald-600">+{formatINR(result.epf.interestEarned)}</span>
                </div>
              </div>
            </div>

            {/* Gratuity Card */}
            <div className="bg-card border border-border rounded-3xl p-7">
              <h3 className="font-bold text-xl mb-1">Gratuity Amount</h3>
              <p className="text-xs text-muted mb-4">Formula: (Basic + DA) × 15/26 × Years of Service</p>

              {result.gratuity.isEligible ? (
                <>
                  <div className="text-5xl font-black tracking-tight text-emerald-600 mb-2 tabular-nums">
                    {formatINR(result.gratuity.gratuityAmount)}
                  </div>
                  <p className="text-sm text-muted">
                    For {yearsOfService} years of service (capped at ₹25 lakhs)
                  </p>
                </>
              ) : (
                <div className="py-4">
                  <div className="text-2xl font-bold text-muted">Not Eligible</div>
                  <p className="mt-1 text-sm">You need minimum 5 years of service to receive gratuity.</p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleReset}
            className="mx-auto flex items-center gap-2 px-6 py-3 rounded-2xl border border-border hover:bg-background font-semibold transition"
          >
            <RotateCcw size={18} />
            Reset All Values
          </button>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-3xl p-8 text-center text-muted">
          Enter your salary and service details above to calculate your EPF and Gratuity
        </div>
      )}
    </div>
  );
}
