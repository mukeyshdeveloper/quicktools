'use client';

import { useState, useEffect } from 'react';
import { calculateHomeLoanEligibility, formatINR, getRecommendedMaxTenure, type LoanEligibilityResult } from './utils';
import { RotateCcw, Home, TrendingUp } from 'lucide-react';

export default function HomeLoanEligibilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState('100000');
  const [existingEmi, setExistingEmi] = useState('0');
  const [age, setAge] = useState('35');
  const [desiredTenure, setDesiredTenure] = useState('20');
  const [interestRate, setInterestRate] = useState('8.5');
  const [foir, setFoir] = useState('55');

  const [result, setResult] = useState<LoanEligibilityResult | null>(null);

  useEffect(() => {
    const input = {
      monthlyIncome: parseFloat(monthlyIncome) || 0,
      existingEmi: parseFloat(existingEmi) || 0,
      desiredTenureYears: parseFloat(desiredTenure) || 0,
      interestRate: parseFloat(interestRate) || 8.5,
      foirPercentage: parseFloat(foir) || 55,
    };

    if (input.monthlyIncome > 0 && input.desiredTenureYears > 0) {
      const res = calculateHomeLoanEligibility(input);
      setResult(res);
    } else {
      setResult(null);
    }
  }, [monthlyIncome, existingEmi, desiredTenure, interestRate, foir]);

  function handleReset() {
    setMonthlyIncome('100000');
    setExistingEmi('0');
    setAge('35');
    setDesiredTenure('20');
    setInterestRate('8.5');
    setFoir('55');
  }

  // Recommended max tenure based on age
  const recommendedTenure = getRecommendedMaxTenure(parseInt(age) || 35);

  // FOIR usage calculation for visual indicator
  const currentFoirUsage = result && parseFloat(monthlyIncome) > 0
    ? Math.min(100, Math.round(((parseFloat(existingEmi) + result.emiForMaxLoan) / parseFloat(monthlyIncome)) * 100))
    : 0;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Input Card */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-7">
        
        {/* Income Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-2">
              Monthly Gross Income
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-blue-600">₹</span>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="w-full pl-12 pr-6 py-3.5 text-3xl font-black tracking-tighter bg-background border-2 border-border focus:border-blue-500 rounded-2xl outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-2">
              Existing Monthly EMIs (if any)
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-blue-600">₹</span>
              <input
                type="number"
                value={existingEmi}
                onChange={(e) => setExistingEmi(e.target.value)}
                className="w-full pl-12 pr-6 py-3.5 text-3xl font-black tracking-tighter bg-background border-2 border-border focus:border-blue-500 rounded-2xl outline-none transition"
              />
            </div>
            <p className="text-[11px] text-muted mt-1">Car loan, personal loan, other EMIs, etc.</p>
          </div>
        </div>

        {/* Personal & Loan Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-2">
              Your Current Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full py-3 px-4 text-2xl font-bold bg-background border-2 border-border focus:border-blue-500 rounded-2xl outline-none"
            />
            <p className="text-[11px] text-muted mt-1">Recommended max tenure: {recommendedTenure} years</p>
          </div>

          <div>
            <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-2">
              Loan Tenure
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={desiredTenure}
                onChange={(e) => setDesiredTenure(e.target.value)}
                className="flex-1 py-3 px-4 text-2xl font-bold bg-background border-2 border-border focus:border-blue-500 rounded-2xl outline-none"
              />
              <span className="text-xl font-bold text-muted">Years</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-2">
              Interest Rate
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="flex-1 py-3 px-4 text-2xl font-bold bg-background border-2 border-border focus:border-blue-500 rounded-2xl outline-none"
              />
              <span className="text-xl font-bold text-muted">%</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-2">
              FOIR Limit
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="1"
                value={foir}
                onChange={(e) => setFoir(e.target.value)}
                className="flex-1 py-3 px-4 text-2xl font-bold bg-background border-2 border-border focus:border-blue-500 rounded-2xl outline-none"
              />
              <span className="text-xl font-bold text-muted">%</span>
            </div>
            <p className="text-[11px] text-muted mt-1">Typical range: 50–60%</p>
          </div>
        </div>
      </div>

      {/* Results */}
      {result && result.maxLoanAmount > 0 ? (
        <div className="space-y-6">
          {/* Big Result */}
          <div className="bg-blue-600 text-white rounded-3xl p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Home className="h-5 w-5" />
              <span className="font-bold tracking-widest text-sm uppercase">Maximum Home Loan You Can Get</span>
            </div>
            <p className="text-6xl sm:text-7xl font-black tracking-[-3px] tabular-nums">
              {formatINR(result.maxLoanAmount)}
            </p>
            <p className="mt-2 text-blue-200 text-sm">
              At {interestRate}% for {desiredTenure} years
            </p>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-3xl p-6">
              <div className="text-sm font-bold uppercase tracking-widest text-muted mb-1">Monthly EMI for Max Loan</div>
              <div className="text-4xl font-black tracking-tight text-blue-600 tabular-nums">
                {formatINR(result.emiForMaxLoan)}
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6">
              <div className="text-sm font-bold uppercase tracking-widest text-muted mb-1">Max EMI Bank Will Allow</div>
              <div className="text-4xl font-black tracking-tight tabular-nums">
                {formatINR(result.maxAllowedEmi)}
              </div>
              <div className="text-xs text-muted mt-1">Based on {foir}% FOIR</div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6">
              <div className="text-sm font-bold uppercase tracking-widest text-muted mb-1">Total Interest Over Tenure</div>
              <div className="text-4xl font-black tracking-tight text-amber-600 tabular-nums">
                {formatINR(result.totalInterest)}
              </div>
            </div>
          </div>

          {/* FOIR Usage Visual Indicator */}
          <div className="bg-card border border-border rounded-3xl p-6">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="font-bold">Your FOIR After This Loan</div>
                <div className="text-sm text-muted">Higher FOIR = Higher risk for the bank</div>
              </div>
              <div className="text-right">
                <span className="text-3xl font-black tabular-nums">{currentFoirUsage}</span>
                <span className="text-xl text-muted">%</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 rounded-full ${
                  currentFoirUsage > 65 ? 'bg-red-500' : 
                  currentFoirUsage > 55 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(currentFoirUsage, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted mt-1">
              <span>0%</span>
              <span className="font-medium">55% (Common limit)</span>
              <span>70%+</span>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-border hover:bg-background font-semibold transition"
            >
              <RotateCcw size={18} />
              Reset Calculator
            </button>
          </div>

          <div className="text-center text-xs text-muted max-w-md mx-auto">
            This is an estimate. Actual eligibility depends on your credit score, employment stability, and the bank’s specific policy.
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-3xl p-8 text-center text-muted">
          Enter your income and loan preferences to see your eligibility
        </div>
      )}
    </div>
  );
}
