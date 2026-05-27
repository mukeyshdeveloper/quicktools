'use client';

import { useMemo, useState } from 'react';
import ResetButton from '@/components/ui/ResetButton';
import {
  buildCharacterPool,
  generatePassword,
  type PasswordOptions,
  type PasswordResult,
  type StrengthLevel,
} from './utils';

const defaultOptions: PasswordOptions = {
  length: 18,
  includeLowercase: true,
  includeUppercase: true,
  includeNumbers: true,
  includeSymbols: true,
  excludeAmbiguous: true,
  preventRepeats: false,
};

const strengthClassByLevel: Record<StrengthLevel, string> = {
  Weak: 'strength-weak',
  Fair: 'strength-fair',
  Strong: 'strength-strong',
  Excellent: 'strength-excellent',
};

function getSecureRandomIndex(maxExclusive: number): number {
  const maxUint32 = 0xffffffff;
  const limit: number = maxUint32 - (maxUint32 % maxExclusive);
  const randomValues = new Uint32Array(1);

  while (true) {
    window.crypto.getRandomValues(randomValues);
    const value: number | undefined = randomValues[0];

    if (value !== undefined && value < limit) {
      return value % maxExclusive;
    }
  }
}

interface ToggleRowProps {
  checked: boolean;
  description: string;
  id: string;
  label: string;
  onChange: (checked: boolean) => void;
}

function ToggleRow({
  checked,
  description,
  id,
  label,
  onChange,
}: ToggleRowProps): React.ReactElement {
  return (
    <label className="password-toggle" htmlFor={id}>
      <span>
        <span className="block text-sm font-semibold text-text">{label}</span>
        <span className="mt-0.5 block text-xs leading-5 text-muted">
          {description}
        </span>
      </span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.checked)
        }
      />
    </label>
  );
}

export default function PasswordGenerator(): React.ReactElement {
  const [options, setOptions] = useState<PasswordOptions>(defaultOptions);
  const [result, setResult] = useState<PasswordResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copyMessage, setCopyMessage] = useState<string>('Copy');

  const poolSize: number = useMemo(
    () => buildCharacterPool(options).length,
    [options],
  );

  function updateOptions(nextOptions: PasswordOptions): void {
    setOptions(nextOptions);
    setCopyMessage('Copy');
  }

  function generateNextPassword(nextOptions: PasswordOptions = options): void {
    const nextResult: PasswordResult | null = generatePassword(
      nextOptions,
      getSecureRandomIndex,
    );

    if (!nextResult) {
      setResult(null);
      setError(
        'Choose at least one character type and make sure length fits the selected pool.',
      );
      return;
    }

    setResult(nextResult);
    setError(null);
    setCopyMessage('Copy');
  }

  function handleLengthChange(value: string): void {
    const nextLength: number = Math.min(Math.max(Number(value), 4), 64);
    const nextOptions: PasswordOptions = {
      ...options,
      length: Number.isFinite(nextLength) ? nextLength : defaultOptions.length,
    };

    updateOptions(nextOptions);
    generateNextPassword(nextOptions);
  }

  function handleToggle(
    key: keyof PasswordOptions,
    checked: boolean,
  ): void {
    const nextOptions: PasswordOptions = {
      ...options,
      [key]: checked,
    };

    updateOptions(nextOptions);
    generateNextPassword(nextOptions);
  }

  async function handleCopy(): Promise<void> {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result.password);
      setCopyMessage('Copied');
    } catch {
      setCopyMessage('Copy failed');
    }
  }

  function handleReset(): void {
    setOptions(defaultOptions);
    setResult(null);
    setError(null);
    setCopyMessage('Copy');
  }

  return (
    <div className="tool-panel password-panel">
      <div className="mb-5">
        <span className="tool-pill">Secure browser-only generator</span>
        <h2 className="mt-4 text-lg font-semibold tracking-tight text-text">
          Build a Strong Password
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted">
          Tune the rules, generate a fresh password, and copy it when you are
          ready.
        </p>
      </div>

      <section className="password-output" aria-live="polite">
        <p className="result-label">Generated Password</p>
        <p className="password-value">
          {result?.password ?? 'Choose options to generate a password'}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="btn-primary" type="button" onClick={() => generateNextPassword()}>
            Generate New
          </button>
          <button
            className="btn-secondary"
            type="button"
            onClick={handleCopy}
            disabled={!result}
          >
            {copyMessage}
          </button>
          <ResetButton onClick={handleReset} />
        </div>
      </section>

      {error ? (
        <p className="mt-4 text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      {result ? (
        <section className="result-panel">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="result-label">Strength</p>
              <p className="text-lg font-semibold text-text">{result.strength}</p>
            </div>
            <div className="rounded-full bg-card px-3 py-1 text-xs font-semibold text-muted">
              {Math.round(result.entropyBits)} bits
            </div>
          </div>

          <div className={`strength-meter ${strengthClassByLevel[result.strength]}`}>
            <span />
          </div>

          <div className="word-stats-grid">
            <div className="result-mini">
              <p className="result-mini-val">{result.poolSize}</p>
              <p className="result-mini-lbl">Possible characters</p>
            </div>
            <div className="result-mini">
              <p className="result-mini-val">{options.length}</p>
              <p className="result-mini-lbl">Password length</p>
            </div>
            <div className="result-mini sm:col-span-2">
              <p className="result-mini-val">{result.crackTimeLabel}</p>
              <p className="result-mini-lbl">Estimated offline brute-force time</p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mt-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <label className="tool-label" htmlFor="password-length">
              Password Length
            </label>
            <p className="text-sm text-muted">Longer is stronger.</p>
          </div>
          <input
            className="length-number"
            type="number"
            min="4"
            max="64"
            value={options.length}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleLengthChange(event.target.value)
            }
            aria-label="Password length number"
          />
        </div>
        <input
          id="password-length"
          className="password-slider"
          type="range"
          min="4"
          max="64"
          value={options.length}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleLengthChange(event.target.value)
          }
        />
      </section>

      <section className="password-options">
        <ToggleRow
          id="lowercase"
          label="Lowercase"
          description="Adds a-z characters."
          checked={options.includeLowercase}
          onChange={(checked: boolean) => handleToggle('includeLowercase', checked)}
        />
        <ToggleRow
          id="uppercase"
          label="Uppercase"
          description="Adds A-Z characters."
          checked={options.includeUppercase}
          onChange={(checked: boolean) => handleToggle('includeUppercase', checked)}
        />
        <ToggleRow
          id="numbers"
          label="Numbers"
          description="Adds 0-9 digits."
          checked={options.includeNumbers}
          onChange={(checked: boolean) => handleToggle('includeNumbers', checked)}
        />
        <ToggleRow
          id="symbols"
          label="Symbols"
          description="Adds punctuation and special characters."
          checked={options.includeSymbols}
          onChange={(checked: boolean) => handleToggle('includeSymbols', checked)}
        />
        <ToggleRow
          id="ambiguous"
          label="Exclude ambiguous"
          description="Avoids characters like O, 0, I and l."
          checked={options.excludeAmbiguous}
          onChange={(checked: boolean) => handleToggle('excludeAmbiguous', checked)}
        />
        <ToggleRow
          id="repeats"
          label="Prevent repeats"
          description={`Requires each character to be unique. Pool: ${poolSize}.`}
          checked={options.preventRepeats}
          onChange={(checked: boolean) => handleToggle('preventRepeats', checked)}
        />
      </section>
    </div>
  );
}
