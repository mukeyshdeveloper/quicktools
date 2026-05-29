'use client';

import { useState, useEffect } from 'react';
import { calculateTdee, type TdeeResult } from './utils';

export default function TdeeCalculator() {
  const [gender, setGender] = useState<'male'|'female'>('male');
  const [age, setAge] = useState<string>('30');
  const [weight, setWeight] = useState<string>('75');
  const [height, setHeight] = useState<string>('175');
  const [activity, setActivity] = useState<number>(1.55); // Moderate
  
  const [result, setResult] = useState<TdeeResult | null>(null);

  useEffect(() => {
    const a = parseInt(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    
    if (a > 0 && w > 0 && h > 0) {
      setResult(calculateTdee(gender, a, w, h, activity));
    } else {
      setResult(null);
    }
  }, [gender, age, weight, height, activity]);

  const activities = [
    { value: 1.2, label: 'Sedentary', desc: 'Little to no exercise' },
    { value: 1.375, label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
    { value: 1.55, label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
    { value: 1.725, label: 'Very Active', desc: 'Heavy exercise 6-7 days/week' },
    { value: 1.9, label: 'Extra Active', desc: 'Very heavy exercise / physical job' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Input Panel */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-5">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted">Your Details</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setGender('male')}
              className={`py-3 rounded-2xl font-bold transition ${gender === 'male' ? 'bg-red-500 text-white shadow-md' : 'bg-background border border-border text-text hover:border-red-400'}`}
            >
              Male
            </button>
            <button
              onClick={() => setGender('female')}
              className={`py-3 rounded-2xl font-bold transition ${gender === 'female' ? 'bg-red-500 text-white shadow-md' : 'bg-background border border-border text-text hover:border-red-400'}`}
            >
              Female
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-text">Age</label>
              <input type="number" min="1" max="120" value={age} onChange={e => setAge(e.target.value)} className="input text-center" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-text">Weight (kg)</label>
              <input type="number" min="1" max="300" step="0.1" value={weight} onChange={e => setWeight(e.target.value)} className="input text-center" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-text">Height (cm)</label>
              <input type="number" min="50" max="250" value={height} onChange={e => setHeight(e.target.value)} className="input text-center" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-text">Activity Level</label>
            <div className="space-y-2">
              {activities.map(act => (
                <label key={act.value} className={`flex items-start gap-3 p-3 border rounded-2xl cursor-pointer transition ${activity === act.value ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-border bg-background hover:border-red-300'}`}>
                  <div className="flex h-5 items-center">
                    <input type="radio" name="activity" checked={activity === act.value} onChange={() => setActivity(act.value)} className="w-4 h-4 text-red-500 border-gray-300 focus:ring-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text">{act.label}</p>
                    <p className="text-xs text-muted">{act.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Result Panel */}
        <div className="space-y-6">
          {!result ? (
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm min-h-[300px] flex items-center justify-center text-muted">
              Enter your details to calculate TDEE
            </div>
          ) : (
            <>
              {/* Primary Stats */}
              <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl p-6 text-white shadow-md text-center">
                <p className="text-red-100 text-sm font-bold uppercase tracking-widest mb-1">Maintenance Calories (TDEE)</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-black tracking-tight">{result.tdee.toLocaleString()}</span>
                  <span className="text-red-100 font-medium">kcal/day</span>
                </div>
                <p className="text-red-100/80 text-xs mt-3">Basal Metabolic Rate (BMR): {result.bmr.toLocaleString()} kcal</p>
              </div>

              {/* Macros */}
              <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-6">
                <h3 className="font-bold text-text">Macronutrient Split (30/35/35)</h3>
                
                {/* Cutting */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end border-b border-border pb-1">
                    <span className="font-bold text-sm text-blue-500">Cutting (Deficit)</span>
                    <span className="font-bold text-text">{result.macros.cutting.calories.toLocaleString()} kcal</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-background border border-border rounded-xl p-2"><p className="text-muted mb-1">Protein</p><p className="font-bold text-text">{result.macros.cutting.protein}g</p></div>
                    <div className="bg-background border border-border rounded-xl p-2"><p className="text-muted mb-1">Fats</p><p className="font-bold text-text">{result.macros.cutting.fat}g</p></div>
                    <div className="bg-background border border-border rounded-xl p-2"><p className="text-muted mb-1">Carbs</p><p className="font-bold text-text">{result.macros.cutting.carbs}g</p></div>
                  </div>
                </div>

                {/* Maintenance */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end border-b border-border pb-1">
                    <span className="font-bold text-sm text-gray-500">Maintenance</span>
                    <span className="font-bold text-text">{result.tdee.toLocaleString()} kcal</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-background border border-border rounded-xl p-2"><p className="text-muted mb-1">Protein</p><p className="font-bold text-text">{result.macros.maintenance.protein}g</p></div>
                    <div className="bg-background border border-border rounded-xl p-2"><p className="text-muted mb-1">Fats</p><p className="font-bold text-text">{result.macros.maintenance.fat}g</p></div>
                    <div className="bg-background border border-border rounded-xl p-2"><p className="text-muted mb-1">Carbs</p><p className="font-bold text-text">{result.macros.maintenance.carbs}g</p></div>
                  </div>
                </div>

                {/* Bulking */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end border-b border-border pb-1">
                    <span className="font-bold text-sm text-green-500">Bulking (Surplus)</span>
                    <span className="font-bold text-text">{result.macros.bulking.calories.toLocaleString()} kcal</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-background border border-border rounded-xl p-2"><p className="text-muted mb-1">Protein</p><p className="font-bold text-text">{result.macros.bulking.protein}g</p></div>
                    <div className="bg-background border border-border rounded-xl p-2"><p className="text-muted mb-1">Fats</p><p className="font-bold text-text">{result.macros.bulking.fat}g</p></div>
                    <div className="bg-background border border-border rounded-xl p-2"><p className="text-muted mb-1">Carbs</p><p className="font-bold text-text">{result.macros.bulking.carbs}g</p></div>
                  </div>
                </div>

              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
