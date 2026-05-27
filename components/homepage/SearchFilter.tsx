'use client';

import { useMemo, useState } from 'react';
import ToolCard from '@/components/homepage/ToolCard';
import type { ToolCategory, ToolMeta } from '@/types';

type CategoryFilter = ToolCategory | 'all';

interface CategoryOption {
  label: string;
  value: CategoryFilter;
}

interface SearchFilterProps {
  tools: ToolMeta[];
}

const categories: CategoryOption[] = [
  { label: 'All Tools', value: 'all' },
  { label: 'Calculators', value: 'calculator' },
  { label: 'Text', value: 'text' },
  { label: 'Health', value: 'health' },
  { label: 'Developer', value: 'developer' },
  { label: 'Generators', value: 'generator' },
  { label: 'Business', value: 'business' },
];

function getSearchText(tool: ToolMeta): string {
  return [
    tool.name,
    tool.description,
    tool.category,
    tool.slug,
    ...tool.keywords,
  ]
    .join(' ')
    .toLowerCase();
}

export default function SearchFilter({
  tools,
}: SearchFilterProps): React.ReactElement {
  const [query, setQuery] = useState<string>('');
  const [category, setCategory] = useState<CategoryFilter>('all');

  const filteredTools: ToolMeta[] = useMemo(() => {
    const normalizedQuery: string = query.trim().toLowerCase();

    return tools.filter((tool: ToolMeta) => {
      const matchesCategory: boolean =
        category === 'all' || tool.category === category;
      const matchesQuery: boolean =
        normalizedQuery.length === 0 ||
        getSearchText(tool).includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query, tools]);

  const gridLabel: string =
    filteredTools.length === tools.length
      ? `All Tools - ${tools.length} available`
      : `${filteredTools.length} tool${filteredTools.length === 1 ? '' : 's'} found`;

  function handleCategoryChange(nextCategory: CategoryFilter): void {
    setCategory(nextCategory);
    setQuery('');
  }

  return (
    <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
      <div className="mx-auto mb-9 max-w-md">
        <label className="sr-only" htmlFor="tool-search">
          Search tools
        </label>
        <div className="relative">
          <span
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted"
            aria-hidden="true"
          >
            🔍
          </span>
          <input
            id="tool-search"
            className="search-input"
            type="search"
            value={query}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(event.target.value)
            }
            placeholder="Search tools, e.g. age, BMI, password"
          />
        </div>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((item: CategoryOption) => (
          <button
            key={item.value}
            className={`filter-btn ${category === item.value ? 'active' : ''}`}
            type="button"
            onClick={() => handleCategoryChange(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mb-4 font-display text-xs font-bold uppercase tracking-[0.14em] text-muted">
        {gridLabel}
      </div>

      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTools.map((tool: ToolMeta) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card px-4 py-12 text-center text-sm text-muted">
          No tools found. Try a different search.
        </div>
      )}
    </section>
  );
}
