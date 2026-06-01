'use client';

import { useState, useEffect } from 'react';
import { calculateHraExemption, formatINR, type HraResult } from './utils';
import { RotateCcw } from 'lucide-react';

export default function HraExemptionCalculator() {
  const [basicDa, setBasicDa] = useState('50000');
  const [hraReceived, setHraReceived] = useState('25000');
  const [rentPaid, setRentPaid] = useState('20000');
  const [isMetro, setIsMetro] = useState(true);

  const [result, setResult] = useState<HraResult | null>(null);

  useEffect(() => {
    const input = {
      basicDa: parseFloat(basicDa) || 0,
      hraReceived: parseFloat(hraReceived) || 0,
      rentPaid: parseFloat(rentPaid) || 0,
      isMetro,
    };

    if (input.basicDa > 0 && input.hraReceived > 0 && input.rentPaid > 0) {
      const res = calculateHraExemption(input);
      setResult(res);
    } else {
      setResult(null);
    }
  }, [basicDa, hraReceived, rentPaid, isMetro]);

  function handleReset() {
    setBasicDa('50000');
    setHraReceived('25000');
    setRentPaid('20000');
    setIsMetro(true);
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Input Card */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-7">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-2">
              Basic Salary + DA (Monthly)
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-blue-600">₹</span>
              <input
                type="number"
                value={basicDa}
                onChange={(e) => setBasicDa(e.target.value)}
                className="w-full pl-12 pr-6 py-3.5 text-3xl font-black tracking-tighter bg-background border-2 border-border focus:border-blue-500 rounded-2xl outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-2">
              HRA Received (Monthly)
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-blue-600">₹</span>
              <input
                type="number"
                value={hraReceived}
                onChange={(e) => setHraReceived(e.target.value)}
                className="w-full pl-12 pr-6 py-3.5 text-3xl font-black tracking-tighter bg-background border-2 border-border focus:border-blue-500 rounded-2xl outline-none transition"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-2">
            Actual Rent Paid (Monthly)
          </label>
          <div className="relative max-w-md">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-blue-600">₹</span>
            <input
              type="number"
              value={rentPaid}
              onChange={(e) => setRentPaid(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 text-3xl font-black tracking-tighter bg-background border-2 border-border focus:border-blue-500 rounded-2xl outline-none transition"
            />
          </div>
        </div>

        {/* City Type */}
        <div>
          <label className="text-sm font-bold uppercase tracking-widest text-muted block mb-3">
            City Type
          </label>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            <button
              onClick={() => setIsMetro(true)}
              className={`p-4 rounded-2xl border-2 text-left transition font-semibold ${
                isMetro
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-border hover:border-blue-200'
              }`}
            >
              <div className="font-bold">Metro City</div>
              <div className="text-xs text-muted mt-0.5">50% of (Basic + DA)</div>
              <div className="text-[10px] mt-1 text-blue-600">Delhi, Mumbai, Chennai, Kolkata</div>
            </button>

            <button
              onClick={() => setIsMetro(false)}
              className={`p-4 rounded-2xl border-2 text-left transition font-semibold ${
                !isMetro
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-border hover:border-blue-200'
              }`}
            >
              <div className="font-bold">Non-Metro City</div>
              <div className="text-xs text-muted mt-0.5">40% of (Basic + DA)</div>
              <div className="text-[10px] mt-1 text-blue-600">All other cities</div>
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {result ? (
        <div className="space-y-6">
          {/* Main Result */}
          <div className="bg-blue-600 text-white rounded-3xl p-8 text-center">
            <p className="text-blue-100 text-sm font-bold uppercase tracking-widest mb-1">Tax-Free HRA (Exempt Amount)</p>
            <p className="text-6xl sm:text-7xl font-black tracking-[-3px] tabular-nums">
              {formatINR(result.exemptAmount)}
            </p>
            <p className="mt-2 text-blue-200 text-sm">Out of {formatINR(result.limit1_actualHra)} HRA received</p>
          </div>

          {/* Taxable HRA */}
          <div className="bg-card border border-border rounded-3xl p-6 text-center">
            <div className="text-sm font-bold uppercase tracking-widest text-muted">Taxable HRA (Added to Salary)</div>
            <div className="text-4xl font-black tracking-tight text-red-600 mt-1 tabular-nums">
              {formatINR(result.taxableHra)}
            </div>
          </div>

          {/* Breakdown of 3 Limits */}
          <div className="bg-card border border-border rounded-3xl p-6">
            <h3 className="font-bold text-lg mb-4">How the Exemption was Calculated</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span>1. Actual HRA Received</span>
                <span className="font-semibold">{formatINR(result.limit1_actualHra)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>2. {isMetro ? '50%' : '40%'} of (Basic + DA)</span>
                <span className="font-semibold">{formatINR(result.limit2_percentOfSalary)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>3. Rent Paid – 10% of (Basic + DA)</span>
                <span className="font-semibold">{formatINR(result.limit3_rentMinusTenPercent)}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t text-sm">
              <span className="text-muted">Exemption applied based on: </span>
              <span className="font-semibold text-blue-600">{result.appliedLimit}</span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="mx-auto flex items-center gap-2 px-6 py-3 rounded-2xl border border-border hover:bg-background font-semibold transition"
          >
            <RotateCcw size={18} />
            Reset Values
          </button>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-3xl p-8 text-center text-muted">
          Enter your salary, HRA, and rent details to calculate exemption
        </div>
      )}
    </div>
  );
}
