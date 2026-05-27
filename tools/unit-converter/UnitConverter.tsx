'use client';

import { useMemo, useState } from 'react';
import {
  Activity,
  ArrowLeftRight,
  Clock,
  Database,
  Flame,
  FlaskConical,
  Gauge,
  Plug,
  Radio,
  Ruler,
  Scale,
  SquareStack,
  Thermometer,
  Triangle,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import {
  convertUnits,
  formatNumber,
  getAllConversions,
  getCategoryById,
  getDefaultTargetUnit,
  getFormulaLine,
  unitCategories,
  type CategoryIcon,
  type ConversionResult,
  type UnitCategory,
  type UnitDefinition,
} from './utils';

const iconByCategory: Record<CategoryIcon, LucideIcon> = {
  ruler: Ruler,
  scale: Scale,
  thermometer: Thermometer,
  area: SquareStack,
  volume: FlaskConical,
  speed: Gauge,
  time: Clock,
  pressure: Activity,
  energy: Zap,
  power: Plug,
  data: Database,
  angle: Triangle,
  frequency: Radio,
  fuel: Flame,
};

function parseInput(value: string): number | null {
  if (!value.trim()) return null;

  const parsedValue: number = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : null;
}

export default function UnitConverter(): React.ReactElement {
  const [categoryId, setCategoryId] = useState<string>('length');
  const [fromId, setFromId] = useState<string>('km');
  const [toId, setToId] = useState<string>('m');
  const [inputValue, setInputValue] = useState<string>('1');

  const category: UnitCategory = useMemo(
    () => getCategoryById(categoryId),
    [categoryId],
  );
  const fromUnit: UnitDefinition | undefined = category.units.find(
    (unit: UnitDefinition) => unit.id === fromId,
  );
  const toUnit: UnitDefinition | undefined = category.units.find(
    (unit: UnitDefinition) => unit.id === toId,
  );
  const numericValue: number | null = parseInput(inputValue);
  const result: number | null =
    numericValue === null ? null : convertUnits(numericValue, category, fromId, toId);
  const allConversions: ConversionResult[] = useMemo(
    () =>
      numericValue === null
        ? []
        : getAllConversions(numericValue, category, fromId),
    [category, fromId, numericValue],
  );
  const formulaLine: string = getFormulaLine(category, fromId, toId);
  const CategoryIcon: LucideIcon = iconByCategory[category.icon];

  function handleCategoryChange(nextCategoryId: string): void {
    const nextCategory: UnitCategory = getCategoryById(nextCategoryId);

    setCategoryId(nextCategory.id);
    setFromId(nextCategory.units[0]?.id ?? '');
    setToId(getDefaultTargetUnit(nextCategory));
    setInputValue('1');
  }

  function handleSwap(): void {
    if (result !== null && Number.isFinite(result)) {
      setInputValue(String(Number.parseFloat(result.toPrecision(10))));
    }

    setFromId(toId);
    setToId(fromId);
  }

  return (
    <div className="tool-panel unit-panel">
      <div className="mb-5">
        <span className="tool-pill">Universal unit converter</span>
        <h2 className="mt-4 text-lg font-semibold tracking-tight text-text">
          Convert Measurements Instantly
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted">
          Choose a category, enter a value, and compare every matching unit at
          once.
        </p>
      </div>

      <section className="unit-category-grid" aria-label="Unit categories">
        {unitCategories.map((item: UnitCategory) => {
          const Icon: LucideIcon = iconByCategory[item.icon];
          const isActive: boolean = item.id === category.id;

          return (
            <button
              key={item.id}
              className={`unit-category-btn ${isActive ? 'active' : ''}`}
              type="button"
              onClick={() => handleCategoryChange(item.id)}
            >
              <Icon size={15} aria-hidden="true" />
              {item.name}
            </button>
          );
        })}
      </section>

      <section className="unit-converter-card">
        <div className="unit-side">
          <label className="tool-label" htmlFor="unit-value">
            From
          </label>
          <input
            id="unit-value"
            className="unit-value-input"
            type="number"
            inputMode="decimal"
            value={inputValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(event.target.value)
            }
            placeholder="0"
          />
          <select
            className="tool-input"
            value={fromId}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setFromId(event.target.value)
            }
            aria-label="From unit"
          >
            {category.units.map((unit: UnitDefinition) => (
              <option key={unit.id} value={unit.id}>
                {unit.name} ({unit.symbol})
              </option>
            ))}
          </select>
        </div>

        <div className="unit-swap-wrap">
          <button
            className="unit-swap-btn"
            type="button"
            onClick={handleSwap}
            aria-label="Swap units"
          >
            <ArrowLeftRight size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="unit-side">
          <label className="tool-label" htmlFor="unit-target">
            To
          </label>
          <p className="unit-result" id="unit-target" aria-live="polite">
            {result === null ? '-' : formatNumber(result)}
          </p>
          <select
            className="tool-input"
            value={toId}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setToId(event.target.value)
            }
            aria-label="To unit"
          >
            {category.units.map((unit: UnitDefinition) => (
              <option key={unit.id} value={unit.id}>
                {unit.name} ({unit.symbol})
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="unit-summary">
        <div>
          <CategoryIcon size={18} aria-hidden="true" />
          <span>{category.name}</span>
        </div>
        <p>
          {fromUnit?.symbol ?? '-'} to {toUnit?.symbol ?? '-'}
        </p>
      </section>

      {formulaLine ? <p className="unit-formula">{formulaLine}</p> : null}

      <section>
        <p className="result-label">All conversions</p>
        <div className="unit-results-grid">
          {allConversions.map((item: ConversionResult) => {
            const isActive: boolean = item.unit.id === toId;

            return (
              <button
                key={item.unit.id}
                className={`unit-result-card ${isActive ? 'active' : ''}`}
                type="button"
                onClick={() => setToId(item.unit.id)}
              >
                <span className="unit-result-value">{formatNumber(item.value)}</span>
                <span className="unit-result-name">
                  {item.unit.name}{' '}
                  <span className="font-mono text-xs text-muted">
                    {item.unit.symbol}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
