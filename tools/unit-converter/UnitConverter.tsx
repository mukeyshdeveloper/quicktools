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
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl border border-white/40 dark:border-gray-800 shadow-2xl transition-all">
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-brand/10 text-brand rounded-full mb-4">
          <Activity size={14} /> Universal Unit Converter
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Convert Measurements Instantly
        </h2>
        <p className="mt-3 text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Choose a category, enter a value, and compare every matching unit seamlessly in real-time.
        </p>
      </div>

      <section className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10" aria-label="Unit categories">
        {unitCategories.map((item: UnitCategory) => {
          const Icon: LucideIcon = iconByCategory[item.icon];
          const isActive: boolean = item.id === category.id;

          return (
            <button
              key={item.id}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-brand text-white shadow-lg shadow-brand/25 scale-105 ring-2 ring-brand/20'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 border border-gray-200 dark:border-gray-700'
              }`}
              type="button"
              onClick={() => handleCategoryChange(item.id)}
            >
              <Icon size={16} aria-hidden="true" />
              {item.name}
            </button>
          );
        })}
      </section>

      <section className="relative flex flex-col md:flex-row items-center gap-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex-1 w-full space-y-3">
          <label className="text-sm font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase" htmlFor="unit-value">
            From
          </label>
          <div className="flex flex-col gap-3 relative">
            <input
              id="unit-value"
              className="w-full text-4xl font-bold bg-transparent border-b-2 border-gray-200 dark:border-gray-700 focus:border-brand outline-none transition-colors py-2 text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600"
              type="number"
              inputMode="decimal"
              value={inputValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)}
              placeholder="0"
            />
            <div className="relative">
              <select
                className="w-full p-3.5 pr-10 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-shadow appearance-none cursor-pointer"
                value={fromId}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setFromId(event.target.value)}
                aria-label="From unit"
              >
                {category.units.map((unit: UnitDefinition) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center my-4 md:my-0 md:-mx-4 z-10">
          <button
            className="p-4 bg-white dark:bg-gray-900 rounded-full shadow-xl border border-gray-100 dark:border-gray-700 text-brand hover:text-white hover:bg-brand transition-all duration-300 hover:rotate-180 hover:scale-110 active:scale-95"
            type="button"
            onClick={handleSwap}
            aria-label="Swap units"
          >
            <ArrowLeftRight size={24} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 w-full space-y-3">
          <label className="text-sm font-semibold tracking-wide text-gray-500 dark:text-gray-400 uppercase" htmlFor="unit-target">
            To
          </label>
          <div className="flex flex-col gap-3 relative">
            <p className="w-full text-4xl font-bold bg-transparent border-b-2 border-transparent py-2 text-brand overflow-hidden text-ellipsis whitespace-nowrap" id="unit-target" aria-live="polite">
              {result === null ? '-' : formatNumber(result)}
            </p>
            <div className="relative">
              <select
                className="w-full p-3.5 pr-10 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-shadow appearance-none cursor-pointer"
                value={toId}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setToId(event.target.value)}
                aria-label="To unit"
              >
                {category.units.map((unit: UnitDefinition) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-5 py-4 bg-brand/5 dark:bg-brand/10 rounded-2xl border border-brand/10 dark:border-brand/20 mb-10">
        <section className="flex items-center gap-3 text-brand font-medium">
          <div className="p-2 bg-brand/10 dark:bg-brand/20 rounded-xl">
            <CategoryIcon size={20} aria-hidden="true" />
          </div>
          <span className="capitalize">{category.name} Conversion</span>
          <span className="text-brand/40 mx-2">•</span>
          <span className="text-gray-700 dark:text-gray-300 font-semibold">
            {fromUnit?.symbol ?? '-'} &rarr; {toUnit?.symbol ?? '-'}
          </span>
        </section>
        
        {formulaLine && (
          <p className="text-sm font-mono text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            {formulaLine}
          </p>
        )}
      </div>

      <section>
        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5 ml-1">
          All {category.name} Conversions
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {allConversions.map((item: ConversionResult) => {
            const isActive: boolean = item.unit.id === toId;

            return (
              <button
                key={item.unit.id}
                className={`flex flex-col items-start p-5 rounded-2xl text-left transition-all duration-300 border group ${
                  isActive
                    ? 'bg-brand/10 border-brand/40 shadow-md ring-1 ring-brand/20'
                    : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-brand/30 hover:shadow-xl hover:-translate-y-1'
                }`}
                type="button"
                onClick={() => setToId(item.unit.id)}
              >
                <span className={`text-xl font-bold truncate w-full transition-colors ${isActive ? 'text-brand' : 'text-gray-900 dark:text-white group-hover:text-brand'}`}>
                  {formatNumber(item.value)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
                  <span className="truncate">{item.unit.name}</span>
                  <span className="font-mono bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-[10px] text-gray-600 dark:text-gray-300 flex-shrink-0">
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
