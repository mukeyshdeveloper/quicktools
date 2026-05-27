'use client';

import { useState } from 'react';
import ResetButton from '@/components/ui/ResetButton';
import {
  calculateAge,
  formatDateInput,
  parseDateInput,
  type AgeResult,
} from './utils';

const defaultAsOf: string = formatDateInput(new Date());

function formatCount(value: number): string {
  return value.toLocaleString('en-IN');
}

export default function AgeCalculator(): React.ReactElement {
  const [dob, setDob] = useState<string>('');
  const [asOf, setAsOf] = useState<string>(defaultAsOf);
  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleCalculate(): void {
    const parsedDob: Date | null = parseDateInput(dob);
    const parsedAsOf: Date | null = parseDateInput(asOf);

    if (!parsedDob) {
      setResult(null);
      setError('Please enter a valid date of birth.');
      return;
    }

    if (!parsedAsOf) {
      setResult(null);
      setError('Please enter a valid date to calculate age as of.');
      return;
    }

    const nextResult: AgeResult | null = calculateAge(parsedDob, parsedAsOf);

    if (!nextResult) {
      setResult(null);
      setError('Date of birth must be before the selected date.');
      return;
    }

    setError(null);
    setResult(nextResult);
  }

  function handleReset(): void {
    setDob('');
    setAsOf(defaultAsOf);
    setResult(null);
    setError(null);
  }

  return (
    <div className="tool-panel">
      <div className="mb-5">
        <span className="tool-pill">Fast exact age calculator</span>
        <h2 className="mt-4 text-lg font-semibold tracking-tight text-text">
          Calculate Your Age
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted">
          Enter a birth date and choose the date you want to calculate against.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="tool-label" htmlFor="dob">
            Date of Birth
          </label>
          <input
            id="dob"
            aria-label="Date of birth"
            className="tool-input"
            type="date"
            value={dob}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDob(event.target.value)
            }
          />
        </div>

        <div>
          <label className="tool-label" htmlFor="as-of">
            Calculate Age As Of
          </label>
          <input
            id="as-of"
            aria-label="Calculate age as of date"
            className="tool-input"
            type="date"
            value={asOf}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAsOf(event.target.value)
            }
          />
        </div>
      </div>

      {error ? (
        <p className="mt-1 text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-3">
        <button className="btn-primary" type="button" onClick={handleCalculate}>
          Calculate Age
        </button>
        {result ? <ResetButton onClick={handleReset} /> : null}
      </div>

      {result ? (
        <section className="result-panel" aria-live="polite">
          <p className="result-label">Your Age</p>
          <p className="result-main">
            {result.years} <span>yrs</span> {result.months} <span>mo</span>{' '}
            {result.days} <span>days</span>
          </p>

          <div className="result-grid">
            <div className="result-mini">
              <p className="result-mini-val">{formatCount(result.totalMonths)}</p>
              <p className="result-mini-lbl">Total months</p>
            </div>
            <div className="result-mini">
              <p className="result-mini-val">{formatCount(result.totalWeeks)}</p>
              <p className="result-mini-lbl">Total weeks</p>
            </div>
            <div className="result-mini">
              <p className="result-mini-val">{formatCount(result.totalDays)}</p>
              <p className="result-mini-lbl">Total days</p>
            </div>
          </div>

          <div className="mt-5 border-t border-border pt-4 text-sm leading-6 text-muted">
            Next birthday in{' '}
            <strong className="font-semibold text-text">
              {result.nextBirthdayDays}{' '}
              {result.nextBirthdayDays === 1 ? 'day' : 'days'}
            </strong>{' '}
            on {result.nextBirthdayDate}.
          </div>
        </section>
      ) : null}
    </div>
  );
}
