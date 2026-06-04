'use client';

import { useState, useMemo } from 'react';
import { formatSQL, minifySQL, detectDialect } from './utils';
import { AlignLeft, Minimize2, Copy, Wand2 } from 'lucide-react';

const EXAMPLES = [
  'SELECT u.id, u.name, o.total FROM users u LEFT JOIN orders o ON o.user_id = u.id WHERE u.active = true ORDER BY o.created_at DESC LIMIT 20;',
  'WITH active_users AS (SELECT id, email FROM users WHERE last_login > now() - interval \'30 days\') SELECT * FROM active_users;',
  'INSERT INTO products (name, price, category) VALUES (\'Wireless Mouse\', 29.99, \'Accessories\'), (\'USB-C Hub\', 49, \'Accessories\');',
  'SELECT category, COUNT(*) as cnt, AVG(price) avg_price FROM products GROUP BY category HAVING COUNT(*) > 5 ORDER BY avg_price DESC;',
];

export default function SqlFormatterMinifier() {
  const [input, setInput] = useState(EXAMPLES[0]);
  const [uppercase, setUppercase] = useState(true);
  const [indentSize, setIndentSize] = useState(2);

  const dialect = useMemo(() => detectDialect(input || ''), [input]);
  const formatted = useMemo(() => formatSQL(input || '', uppercase, indentSize), [input, uppercase, indentSize]);
  const minified = useMemo(() => minifySQL(input || ''), [input]);

  function loadExample(i: number) { setInput(EXAMPLES[i]); }

  function copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Input SQL (edits are live)</span>
          <span className="text-xs px-2 py-0.5 rounded bg-background border border-border">{dialect}</span>
        </div>
        <textarea value={input} onChange={e => setInput(e.target.value)} className="tool-textarea min-h-[150px] font-mono text-sm" />

        <div className="mt-3 flex flex-wrap gap-2">
          {EXAMPLES.map((_, idx) => (
            <button key={idx} onClick={() => loadExample(idx)} className="text-xs btn-secondary px-2.5 py-1">Example {idx + 1}</button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 items-center text-sm">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} /> Uppercase keywords
          </label>
          <div className="inline-flex items-center gap-2">
            Indent
            <select value={indentSize} onChange={e => setIndentSize(+e.target.value)} className="tool-input py-1 text-xs w-16">
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
            </select>
          </div>
        </div>
      </div>

      {/* Two column live results */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="flex justify-between mb-2">
            <span className="font-semibold flex items-center gap-2"><AlignLeft className="w-4 h-4" /> Formatted</span>
            <button onClick={() => copy(formatted)} className="btn-secondary text-xs flex items-center gap-1"><Copy className="w-3.5 h-3.5" /> Copy</button>
          </div>
          <pre className="bg-background p-4 rounded-2xl text-xs overflow-auto border border-border whitespace-pre font-mono min-h-[170px]">{formatted}</pre>
        </div>

        <div className="bg-card border border-border rounded-3xl p-6">
          <div className="flex justify-between mb-2">
            <span className="font-semibold flex items-center gap-2"><Minimize2 className="w-4 h-4" /> Minified</span>
            <button onClick={() => copy(minified)} className="btn-secondary text-xs flex items-center gap-1"><Copy className="w-3.5 h-3.5" /> Copy</button>
          </div>
          <pre className="bg-background p-4 rounded-2xl text-xs overflow-auto border border-border whitespace-pre-wrap break-all font-mono min-h-[170px]">{minified}</pre>
        </div>
      </div>

      <p className="text-center text-xs text-muted">Client-only. Supports common SELECT/INSERT/UPDATE + WITH CTEs. Great for PRs and production logs.</p>
    </div>
  );
}
