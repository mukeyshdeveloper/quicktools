'use client';

import { useState, useMemo } from 'react';
import { TEMPLATES, combineTemplates, searchTemplates, downloadGitignore, type GitTemplate } from './utils';
import { Copy, Download, Plus, X, Search } from 'lucide-react';

const QUICK_GROUPS: Record<string, string[]> = {
  'Web / JS': ['node', 'nextjs', 'react', 'vue'],
  'Mobile': ['android', 'ios'],
  'Backend': ['python', 'django', 'rails', 'java', 'go', 'rust', 'php', 'laravel', 'dotnet'],
  'Data / ML': ['jupyter', 'python'],
  'OS / IDE': ['macos', 'windows', 'linux', 'vscode', 'intellij', 'vim'],
  'Infra': ['docker', 'terraform', 'kubernetes'],
};

export default function GitignoreGenerator() {
  const [selected, setSelected] = useState<string[]>(['node', 'nextjs']);
  const [custom, setCustom] = useState('');
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const filteredKeys = useMemo(() => searchTemplates(query), [query]);

  const output = useMemo(() => combineTemplates(selected, custom), [selected, custom]);

  function toggle(key: string) {
    setSelected(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  }

  function selectGroup(keys: string[]) {
    setSelected(prev => {
      const add = keys.filter(k => !prev.includes(k));
      return [...prev, ...add];
    });
  }

  function clearSelected() {
    setSelected([]);
  }

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  function handleDownload() {
    if (output) downloadGitignore(output);
  }

  return (
    <div className="space-y-6">
      {/* Quick groups */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="font-semibold mb-3">Quick presets</div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(QUICK_GROUPS).map(([label, keys]) => (
            <button key={label} onClick={() => selectGroup(keys)} className="btn-secondary text-xs px-3 py-1">
              + {label}
            </button>
          ))}
          <button onClick={clearSelected} className="text-xs text-muted hover:text-text ml-2">Clear</button>
        </div>
      </div>

      {/* Search + Grid */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search languages, frameworks..." className="tool-input pl-9" />
          </div>
          <div className="text-xs text-muted">{selected.length} selected</div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-[280px] overflow-auto pr-1">
          {filteredKeys.map(key => {
            const t = TEMPLATES[key];
            if (!t) return null;
            const active = selected.includes(key);
            return (
              <button
                key={key}
                onClick={() => toggle(key)}
                className={`text-left px-3 py-2 rounded-2xl border text-sm transition ${active ? 'bg-brand text-white border-brand' : 'border-border hover:border-brand/60 bg-background'}`}
              >
                {t.display}
              </button>
            );
          })}
          {filteredKeys.length === 0 && <div className="col-span-full text-sm text-muted py-4">No matches. Try "node", "python", "macos"...</div>}
        </div>
      </div>

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 px-1">
          {selected.map(key => {
            const t = TEMPLATES[key];
            if (!t) return null;
            return (
              <span key={key} className="inline-flex items-center gap-1 rounded-full bg-brand/10 text-brand px-3 py-1 text-xs">
                {t.display}
                <button onClick={() => toggle(key)} className="hover:text-rose-500"><X className="w-3 h-3" /></button>
              </span>
            );
          })}
        </div>
      )}

      {/* Custom lines */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="font-semibold mb-2">Additional patterns (one per line)</div>
        <textarea value={custom} onChange={e => setCustom(e.target.value)} placeholder="*.log&#10;secrets/*.env" className="tool-textarea font-mono text-sm h-24" />
      </div>

      {/* Output */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold">.gitignore Preview</span>
          <div className="flex gap-2">
            <button onClick={copy} className="btn-secondary text-xs flex items-center gap-1.5"><Copy className="w-3.5 h-3.5" /> {copied ? 'Copied!' : 'Copy'}</button>
            <button onClick={handleDownload} className="btn-primary text-xs flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> Download .gitignore</button>
          </div>
        </div>
        <pre className="bg-background p-4 rounded-2xl text-xs overflow-auto border border-border min-h-[160px] whitespace-pre font-mono">{output || '# Select templates above to generate a .gitignore'}</pre>
      </div>

      <p className="text-center text-xs text-muted">Combines curated templates with your custom rules. Deduplicates lines. Works offline.</p>
    </div>
  );
}
