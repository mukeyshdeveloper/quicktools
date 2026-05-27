'use client';

import { useMemo, useState } from 'react';
import ResetButton from '@/components/ui/ResetButton';
import {
  calculateBmi,
  type BmiResult,
  type BmiUnitSystem,
} from './utils';

type Gender = '' | 'male' | 'female';

function parsePositiveNumber(value: string): number {
  const parsedValue: number = Number(value);
  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : 0;
}

function formatOneDecimal(value: number): string {
  return value.toLocaleString('en-IN', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  });
}

function formatWhole(value: number): string {
  return Math.round(value).toLocaleString('en-IN');
}

export default function BmiCalculator(): React.ReactElement {
  const [unitSystem, setUnitSystem] = useState<BmiUnitSystem>('metric');
  const [gender, setGender] = useState<Gender>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');

  const result: BmiResult | null = useMemo(
    () =>
      calculateBmi({
        unitSystem,
        weight: parsePositiveNumber(weight),
        height: parsePositiveNumber(height),
      }),
    [height, unitSystem, weight],
  );

  function handleUnitChange(nextUnitSystem: BmiUnitSystem): void {
    setUnitSystem(nextUnitSystem);
    setWeight('');
    setHeight('');
  }

  function handleReset(): void {
    setUnitSystem('metric');
    setGender('');
    setWeight('');
    setHeight('');
  }

  const hasInput: boolean = weight.length > 0 || height.length > 0;
  const weightLabel: string = unitSystem === 'metric' ? 'Weight (kg)' : 'Weight (lbs)';
  const heightLabel: string = unitSystem === 'metric' ? 'Height (cm)' : 'Height (inches)';
  const weightPlaceholder: string = unitSystem === 'metric' ? 'e.g. 70' : 'e.g. 154';
  const heightPlaceholder: string = unitSystem === 'metric' ? 'e.g. 170' : 'e.g. 67';

  return (
    <div className="tool-panel">
      <div className="mb-5">
        <span className="tool-pill">Body Mass Index calculator</span>
        <h2 className="mt-4 text-lg font-semibold tracking-tight text-text">
          Check Your BMI
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted">
          Enter your height and weight to see your BMI category and healthy
          weight range.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="tool-label" htmlFor="bmi-unit">
            Unit System
          </label>
          <select
            id="bmi-unit"
            className="tool-input"
            value={unitSystem}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              handleUnitChange(event.target.value as BmiUnitSystem)
            }
          >
            <option value="metric">Metric (kg, cm)</option>
            <option value="imperial">Imperial (lbs, inches)</option>
          </select>
        </div>

        <div>
          <label className="tool-label" htmlFor="bmi-gender">
            Gender
          </label>
          <select
            id="bmi-gender"
            className="tool-input"
            value={gender}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setGender(event.target.value as Gender)
            }
          >
            <option value="">Select optional</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="tool-label" htmlFor="bmi-weight">
            {weightLabel}
          </label>
          <input
            id="bmi-weight"
            className="tool-input"
            type="number"
            min="1"
            inputMode="decimal"
            value={weight}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setWeight(event.target.value)
            }
            placeholder={weightPlaceholder}
          />
        </div>

        <div>
          <label className="tool-label" htmlFor="bmi-height">
            {heightLabel}
          </label>
          <input
            id="bmi-height"
            className="tool-input"
            type="number"
            min="1"
            inputMode="decimal"
            value={height}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setHeight(event.target.value)
            }
            placeholder={heightPlaceholder}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {hasInput ? <ResetButton onClick={handleReset} /> : null}
      </div>

      {result ? (
        <section className="result-panel" aria-live="polite">
          <p className="result-label">Your BMI</p>
          <p className="result-main">
            {formatOneDecimal(result.bmi)} <span>kg/m2</span>
          </p>

          <div className="bmi-bar-wrap">
            <div className="bmi-bar-bg">
              <span
                className="bmi-indicator"
                style={{ left: `${result.indicatorPercent}%` }}
              />
            </div>
            <div className="bmi-labels">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </div>

          <span
            className="bmi-status"
            style={{
              backgroundColor: `${result.categoryColor}22`,
              color: result.categoryColor,
            }}
          >
            {result.category}
          </span>

          <div className="mt-5 border-t border-border pt-4 text-sm leading-6 text-muted">
            Healthy weight range for this height:{' '}
            <strong className="font-semibold text-text">
              {formatWhole(result.idealWeightMinKg)}-
              {formatWhole(result.idealWeightMaxKg)} kg
            </strong>
            . BMI is a screening estimate, not a diagnosis.
          </div>
        </section>
      ) : (
        <div className="mt-5 rounded-xl border border-dashed border-border bg-background p-5 text-sm leading-6 text-muted">
          Enter valid height and weight values to calculate your BMI.
        </div>
      )}
    </div>
  );
}
