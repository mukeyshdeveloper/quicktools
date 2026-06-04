'use client';

import { useState, useMemo, useEffect } from 'react';
import { generateLicense, LICENSE_TYPES, type LicenseType, type LicenseData } from './utils';
import { Copy, Download } from 'lucide-react';

export default function LicenseGenerator() {
  const [licenseType, setLicenseType] = useState<LicenseType>('MIT');
  const [data, setData] = useState<LicenseData>({
    year: '2026',
    author: 'Your Name',
    project: 'My Project',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setData(d => ({ ...d, year: new Date().getFullYear().toString() }));
    }
  }, []);

  const licenseText = useMemo(() => generateLicense(licenseType, data), [licenseType, data]);

  function copy() {
    navigator.clipboard.writeText(licenseText);
  }

  function download() {
    const blob = new Blob([licenseText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'LICENSE';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">License Type</label>
            <select value={licenseType} onChange={e => setLicenseType(e.target.value as LicenseType)} className="tool-input">
              {LICENSE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Year</label>
            <input value={data.year} onChange={e => setData({ ...data, year: e.target.value })} className="tool-input" />
          </div>
          <div>
            <label className="label">Author / Copyright Holder</label>
            <input value={data.author} onChange={e => setData({ ...data, author: e.target.value })} className="tool-input" />
          </div>
        </div>
        <div className="mt-4">
          <label className="label">Project Name (optional)</label>
          <input value={data.project} onChange={e => setData({ ...data, project: e.target.value })} className="tool-input" />
        </div>
      </div>

      <div className="bg-card border border-border rounded-3xl p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold">Generated License</span>
          <div className="flex gap-2">
            <button onClick={copy} className="btn-secondary text-xs flex items-center gap-1"><Copy className="w-3.5 h-3.5" /> Copy</button>
            <button onClick={download} className="btn-primary text-xs flex items-center gap-1"><Download className="w-3.5 h-3.5" /> Download LICENSE</button>
          </div>
        </div>
        <pre className="bg-background p-4 rounded-2xl text-xs overflow-auto border border-border whitespace-pre-wrap font-mono max-h-[420px]">{licenseText}</pre>
      </div>

      <p className="text-center text-xs text-muted">Choose the license that best matches your project goals. For serious projects, consult legal counsel.</p>
    </div>
  );
}
