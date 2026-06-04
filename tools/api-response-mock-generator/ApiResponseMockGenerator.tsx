'use client';

import { useState, useMemo } from 'react';
import { generateMockResponse, generateCodeSnippets, DEFAULT_SCHEMA, PRESETS, type MockSchemaField, type MockOptions } from './utils';
import { Play, Copy, Plus, Trash2, Settings, Download } from 'lucide-react';

export default function ApiResponseMockGenerator() {
  const [endpoint, setEndpoint] = useState('https://api.example.com/users');
  const [method, setMethod] = useState('GET');
  const [schema, setSchema] = useState<MockSchemaField[]>(DEFAULT_SCHEMA);
  const [options, setOptions] = useState<MockOptions>({ count: 1, errorType: 'none', statusCode: 200, seed: '' });
  const [copied, setCopied] = useState('');

  const mockData = useMemo(() => {
    try {
      return generateMockResponse(schema, options);
    } catch {
      return { error: 'Invalid schema configuration' };
    }
  }, [schema, options]);

  const codeSnippets = useMemo(() => generateCodeSnippets(endpoint, method, mockData), [endpoint, method, mockData]);

  function updateField(index: number, key: keyof MockSchemaField, value: any) {
    const newSchema = [...schema];
    const f = { ...newSchema[index] } as any;
    f[key] = value;
    if (key === 'type' && (value === 'object' || value === 'array') && !f.properties && !f.items) {
      if (value === 'object') f.properties = [{ name: 'value', type: 'string' } as MockSchemaField];
      if (value === 'array') f.items = [{ name: 'item', type: 'string' } as MockSchemaField];
    }
    newSchema[index] = f as MockSchemaField;
    setSchema(newSchema);
  }

  function updateChild(parentIdx: number, childKey: 'properties' | 'items', childIdx: number, key: keyof MockSchemaField, val: any) {
    const newSchema = [...schema];
    const parent = { ...newSchema[parentIdx] } as any;
    const arr: MockSchemaField[] = (parent[childKey] || []).slice();
    arr[childIdx] = { ...arr[childIdx], [key]: val } as MockSchemaField;
    parent[childKey] = arr;
    newSchema[parentIdx] = parent as MockSchemaField;
    setSchema(newSchema);
  }

  function addField() {
    setSchema([...schema, { name: `field${schema.length + 1}`, type: 'string' }]);
  }

  function addChild(parentIdx: number, childKey: 'properties' | 'items') {
    const newSchema = [...schema];
    const p = { ...newSchema[parentIdx] } as any;
    const child: MockSchemaField = { name: childKey === 'properties' ? 'prop' : 'item', type: 'string' };
    p[childKey] = [...(p[childKey] || []), child];
    newSchema[parentIdx] = p as MockSchemaField;
    setSchema(newSchema);
  }

  function removeField(index: number) {
    setSchema(schema.filter((_, i) => i !== index));
  }

  function removeChild(pIdx: number, cKey: 'properties' | 'items', cIdx: number) {
    const ns = [...schema];
    const p = { ...ns[pIdx] } as any;
    const arr: MockSchemaField[] = (p[cKey] || []).filter((_: any, i: number) => i !== cIdx);
    p[cKey] = arr.length ? arr : undefined;
    ns[pIdx] = p as MockSchemaField;
    setSchema(ns);
  }

  function loadPreset(name: string) {
    const preset = (PRESETS as any)[name] as MockSchemaField[] | undefined;
    setSchema(preset || DEFAULT_SCHEMA);
    setOptions({ ...options, count: name.includes('Paginated') || name.includes('Order') ? 3 : 1 });
  }

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 1400);
  }

  function downloadJson() {
    const blob = new Blob([JSON.stringify(mockData, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'mock-response.json';
    a.click();
  }

  return (
    <div className="space-y-6">
      {/* Top controls */}
      <div className="bg-card border border-border rounded-3xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-muted">Endpoint URL</label>
            <input value={endpoint} onChange={e => setEndpoint(e.target.value)} className="tool-input" />
          </div>
          <div>
            <label className="text-xs font-bold text-muted">HTTP Method</label>
            <select value={method} onChange={e => setMethod(e.target.value)} className="tool-input">
              {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-muted">Items to generate</label>
            <input type="number" min={1} max={50} value={options.count} onChange={e => setOptions({ ...options, count: +e.target.value })} className="tool-input" />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="text-xs font-bold text-muted">Mode</label>
            <select value={options.errorType} onChange={e => setOptions({ ...options, errorType: e.target.value as any })} className="tool-input">
              <option value="none">Success response</option>
              <option value="client">Client error (4xx)</option>
              <option value="server">Server error (5xx)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-muted">Status code (optional)</label>
            <input type="number" value={options.statusCode} onChange={e => setOptions({ ...options, statusCode: +e.target.value })} className="tool-input w-24" />
          </div>
          <div className="flex-1 min-w-[140px]">
            <label className="text-xs font-bold text-muted">Seed (for reproducible data)</label>
            <input value={options.seed || ''} onChange={e => setOptions({ ...options, seed: e.target.value })} placeholder="my-test-seed-42" className="tool-input" />
          </div>
          <button onClick={addField} className="btn-secondary flex items-center gap-1"><Plus className="w-4 h-4" /> Add Field</button>
        </div>

        {/* Presets */}
        <div>
          <div className="text-xs font-bold text-muted mb-1.5">Quick presets</div>
          <div className="flex flex-wrap gap-2">
            {Object.keys(PRESETS).map(p => (
              <button key={p} onClick={() => loadPreset(p)} className="text-xs rounded-full border border-border px-3 py-1 hover:border-brand">{p}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Schema Editor - supports nesting hints */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="font-semibold mb-3 flex items-center gap-2"><Settings className="w-4 h-4" /> Response Schema (edit live)</div>
        <div className="space-y-4">
          {schema.map((field, i) => (
            <div key={i} className="rounded-2xl border border-border p-3 bg-background">
              <div className="grid grid-cols-12 gap-2 items-end">
                <input value={field.name} onChange={e => updateField(i, 'name', e.target.value)} className="tool-input col-span-3 text-sm" placeholder="fieldName" />
                <select value={field.type} onChange={e => updateField(i, 'type', e.target.value)} className="tool-input col-span-3 text-sm">
                  {['string','number','boolean','date','email','uuid','url','name','price','city','phone','avatar','object','array'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                {(field.type === 'number' || field.type === 'price' || field.type === 'array') && (
                  <>
                    <input type="number" placeholder="min" value={field.min ?? ''} onChange={e => updateField(i, 'min', e.target.value ? +e.target.value : undefined)} className="tool-input col-span-2 text-sm" />
                    <input type="number" placeholder="max" value={field.max ?? ''} onChange={e => updateField(i, 'max', e.target.value ? +e.target.value : undefined)} className="tool-input col-span-2 text-sm" />
                  </>
                )}
                <button onClick={() => removeField(i)} className="col-span-1 text-rose-500"><Trash2 className="w-4 h-4" /></button>
              </div>

              {/* Nested editor for object/array */}
              {(field.type === 'object' || field.type === 'array') && (
                <div className="mt-3 pl-4 border-l-2 border-brand/30">
                  <div className="text-[10px] uppercase tracking-wider text-muted mb-1">{field.type === 'object' ? 'Object properties' : 'Array item shape'}</div>
                  {(field.type === 'object' ? field.properties : field.items)?.map((child, ci) => (
                    <div key={ci} className="grid grid-cols-12 gap-2 mb-1.5">
                      <input value={child.name} onChange={e => updateChild(i, field.type === 'object' ? 'properties' : 'items', ci, 'name', e.target.value)} className="tool-input col-span-4 text-xs py-1" />
                      <select value={child.type} onChange={e => updateChild(i, field.type === 'object' ? 'properties' : 'items', ci, 'type', e.target.value)} className="tool-input col-span-4 text-xs py-1">
                        {['string','number','boolean','email','uuid','date','price','name'].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <button onClick={() => removeChild(i, field.type === 'object' ? 'properties' : 'items', ci)} className="col-span-1 text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                  <button onClick={() => addChild(i, field.type === 'object' ? 'properties' : 'items')} className="text-xs text-brand mt-1">+ Add nested field</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Live Preview + actions */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="flex justify-between mb-3">
          <div className="font-semibold flex items-center gap-2"><Play className="w-4 h-4" /> Live Mock Response</div>
          <div className="flex gap-2">
            <button onClick={() => copy(JSON.stringify(mockData, null, 2), 'json')} className="btn-secondary text-xs flex items-center gap-1"><Copy className="w-3.5 h-3.5" /> {copied === 'json' ? 'Copied' : 'Copy'}</button>
            <button onClick={downloadJson} className="btn-secondary text-xs flex items-center gap-1"><Download className="w-3.5 h-3.5" /> Download</button>
          </div>
        </div>
        <pre className="bg-background p-4 rounded-2xl text-xs overflow-auto border border-border max-h-[340px]">{JSON.stringify(mockData, null, 2)}</pre>
      </div>

      {/* Code */}
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="font-semibold mb-3">Copy-paste ready snippets</div>
        <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
          {Object.entries(codeSnippets).map(([lang, code]) => (
            <div key={lang}>
              <div className="flex justify-between text-[10px] uppercase tracking-wider text-muted mb-1">
                <span>{lang}</span>
                <button onClick={() => copy(code, lang)} className="hover:text-text">{copied === lang ? 'Copied' : 'Copy'}</button>
              </div>
              <pre className="bg-background p-3 rounded-2xl text-[11px] overflow-auto border border-border">{code}</pre>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-muted">Everything runs locally in your browser. Use the seed for stable test data across runs.</p>
    </div>
  );
}
