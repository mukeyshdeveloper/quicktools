'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import {
  Building2, User, PlusCircle, Trash2, Printer, RotateCcw,
  ChevronDown, ChevronUp, Briefcase, CreditCard, Calendar, Palette
} from 'lucide-react';
import {
  computeSalarySlip, buildDefaultEarnings, buildDefaultDeductions, fmt,
  type CompanyDetails, type EmployeeDetails, type EarningRow, type DeductionRow,
} from './utils';

// ─── tiny helpers ────────────────────────────────────────────────────────────
const inp = 'w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-violet-500 outline-none transition';
const label = 'block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1';

function Field({ id, lbl, value, onChange, placeholder, type = 'text' }: {
  id: string; lbl: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={label}>{lbl}</label>
      <input id={id} type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)} className={inp} />
    </div>
  );
}

// ─── Section collapse wrapper ────────────────────────────────────────────────
function Section({ title, icon, children, defaultOpen = true }: {
  title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/60 transition">
        <span className="flex items-center gap-2 font-semibold text-gray-800 dark:text-white text-sm">{icon}{title}</span>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>
      {open && <div className="px-5 pb-5 space-y-3">{children}</div>}
    </div>
  );
}

// ─── Earnings / Deductions row editor ───────────────────────────────────────
function RowEditor({ rows, onChange, accentClass }: {
  rows: { label: string; amount: number }[];
  onChange: (rows: { label: string; amount: number }[]) => void;
  accentClass: string;
}) {
  function update(i: number, field: 'label' | 'amount', val: string) {
    const next = rows.map((r, idx) =>
      idx === i ? { ...r, [field]: field === 'amount' ? Number(val) || 0 : val } : r
    );
    onChange(next);
  }
  function add() { onChange([...rows, { label: '', amount: 0 }]); }
  function remove(i: number) { onChange(rows.filter((_, idx) => idx !== i)); }

  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
          <input value={r.label} placeholder="Component name"
            onChange={e => update(i, 'label', e.target.value)}
            className={`${inp} min-w-0`} />
          <input value={r.amount || ''} type="number" placeholder="0"
            onChange={e => update(i, 'amount', e.target.value)}
            className={`${inp} min-w-0 text-right`} />
          <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 shrink-0">
            <Trash2 size={15} />
          </button>
        </div>
      ))}
      <button onClick={add}
        className={`flex items-center gap-1.5 text-xs font-semibold mt-1 ${accentClass}`}>
        <PlusCircle size={14} /> Add Row
      </button>
    </div>
  );
}

// ─── Printable Salary Slip ────────────────────────────────────────────────────
function SalarySlipPreview({
  company, employee, earnings, deductions, template = 'modern', themeColor = 'violet', fontSize = 'medium'
}: {
  company: CompanyDetails; employee: EmployeeDetails;
  earnings: EarningRow[]; deductions: DeductionRow[];
  template?: 'modern' | 'classic'; themeColor?: string; fontSize?: 'small' | 'medium' | 'large';
}) {
  const result = computeSalarySlip({ company, employee, earnings, deductions });
  const lopDeduct = employee.workingDays > 0 && employee.paidDays < employee.workingDays
    ? Math.round((result.grossEarnings / employee.workingDays) * (employee.workingDays - employee.paidDays))
    : 0;
  const lopEarning = employee.workingDays > 0
    ? Math.round((result.grossEarnings / employee.workingDays) * employee.paidDays)
    : result.grossEarnings;
  const effectiveNet = Math.max(0, lopEarning - result.totalDeductions);

  const maxRows = Math.max(earnings.length, deductions.length);
  const sizeMap = { small: '11px', medium: '13px', large: '15px' };

  if (template === 'classic') {
    return (
      <div
        id="salary-slip-preview"
        className="bg-white text-gray-900 w-full font-sans border-2 border-gray-800"
        style={{ fontFamily: 'Arial, sans-serif', fontSize: sizeMap[fontSize], minWidth: 480, padding: '2rem' }}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold uppercase mb-1">{company.companyName || 'Company Name'}</h2>
          <p className="text-sm text-gray-600">{company.companyAddress}</p>
          <p className="text-sm text-gray-600">
            {company.companyPhone && `Ph: ${company.companyPhone}`} {company.companyEmail && `| Email: ${company.companyEmail}`}
          </p>
          <h3 className="text-lg font-bold uppercase mt-4 underline decoration-gray-400 underline-offset-4">Payslip for {employee.payPeriod || 'Month YYYY'}</h3>
        </div>

        <table className="w-full mb-6 border-collapse">
          <tbody>
            <tr>
              <td className="py-1 pr-4 font-bold w-1/4">Employee Name:</td><td className="py-1 w-1/4">{employee.employeeName}</td>
              <td className="py-1 pr-4 font-bold w-1/4">Employee ID:</td><td className="py-1 w-1/4">{employee.employeeId}</td>
            </tr>
            <tr>
              <td className="py-1 pr-4 font-bold">Designation:</td><td className="py-1">{employee.designation}</td>
              <td className="py-1 pr-4 font-bold">Department:</td><td className="py-1">{employee.department}</td>
            </tr>
            <tr>
              <td className="py-1 pr-4 font-bold">Date of Joining:</td><td className="py-1">{employee.dateOfJoining}</td>
              <td className="py-1 pr-4 font-bold">PAN Number:</td><td className="py-1">{employee.panNumber}</td>
            </tr>
            <tr>
              <td className="py-1 pr-4 font-bold">PF Number:</td><td className="py-1">{employee.pfNumber}</td>
              <td className="py-1 pr-4 font-bold">Bank A/C:</td><td className="py-1">{employee.bankAccount}</td>
            </tr>
            <tr>
              <td className="py-1 pr-4 font-bold">Working Days:</td><td className="py-1">{employee.workingDays}</td>
              <td className="py-1 pr-4 font-bold">Paid Days:</td><td className="py-1">{employee.paidDays}</td>
            </tr>
          </tbody>
        </table>

        <table className="w-full border-collapse border border-gray-800 text-sm mb-6">
          <thead>
            <tr>
              <th className="border border-gray-800 py-2 px-3 text-left w-1/4 bg-gray-100">Earnings</th>
              <th className="border border-gray-800 py-2 px-3 text-right w-1/4 bg-gray-100">Amount (₹)</th>
              <th className="border border-gray-800 py-2 px-3 text-left w-1/4 bg-gray-100">Deductions</th>
              <th className="border border-gray-800 py-2 px-3 text-right w-1/4 bg-gray-100">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxRows }).map((_, i) => {
              const e = earnings[i];
              const d = deductions[i];
              return (
                <tr key={i}>
                  <td className="border-l border-r border-gray-800 py-1 px-3">{e?.label ?? ''}</td>
                  <td className="border-l border-r border-gray-800 py-1 px-3 text-right">{e ? fmt(e.amount) : ''}</td>
                  <td className="border-l border-r border-gray-800 py-1 px-3">{d?.label ?? ''}</td>
                  <td className="border-l border-r border-gray-800 py-1 px-3 text-right">{d ? fmt(d.amount) : ''}</td>
                </tr>
              );
            })}
            <tr>
              <td className="border border-gray-800 py-2 px-3 font-bold bg-gray-100">Gross Earnings</td>
              <td className="border border-gray-800 py-2 px-3 text-right font-bold bg-gray-100">{fmt(result.grossEarnings)}</td>
              <td className="border border-gray-800 py-2 px-3 font-bold bg-gray-100">Total Deductions</td>
              <td className="border border-gray-800 py-2 px-3 text-right font-bold bg-gray-100">{fmt(result.totalDeductions)}</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-6 flex justify-between items-end">
          <div>
            <div className="font-bold text-lg mb-1">Net Pay: ₹{fmt(employee.workingDays > 0 ? effectiveNet : result.netPay)}</div>
            <div className="text-sm italic">({result.netPayWords})</div>
          </div>
          <div className="text-right">
            <div className="mt-8 pt-1 border-t border-gray-800 inline-block w-48 text-center text-sm font-bold">
              Employer Signature
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-300 text-center text-xs text-gray-500">
          This is a computer generated payslip and does not require a signature. Generated via quickutils.in
        </div>
      </div>
    );
  }

  // Modern Template
  const themes: Record<string, any> = {
    violet: { grad: 'from-violet-700 to-indigo-700', bg: 'bg-violet-50', text: 'text-violet-700', textLight: 'text-violet-500', border: 'border-violet-100', banner: 'from-violet-600 to-indigo-600' },
    blue: { grad: 'from-blue-700 to-cyan-700', bg: 'bg-blue-50', text: 'text-blue-700', textLight: 'text-blue-500', border: 'border-blue-100', banner: 'from-blue-600 to-cyan-600' },
    emerald: { grad: 'from-emerald-700 to-teal-700', bg: 'bg-emerald-50', text: 'text-emerald-700', textLight: 'text-emerald-500', border: 'border-emerald-100', banner: 'from-emerald-600 to-teal-600' },
    rose: { grad: 'from-rose-700 to-pink-700', bg: 'bg-rose-50', text: 'text-rose-700', textLight: 'text-rose-500', border: 'border-rose-100', banner: 'from-rose-600 to-pink-600' },
    gray: { grad: 'from-gray-700 to-slate-700', bg: 'bg-gray-50', text: 'text-gray-700', textLight: 'text-gray-500', border: 'border-gray-100', banner: 'from-gray-600 to-slate-600' },
  };
  const theme = themes[themeColor] || themes.violet;

  return (
    <div
      id="salary-slip-preview"
      className="bg-white text-gray-900 w-full rounded-2xl shadow-2xl overflow-hidden font-sans border border-gray-100"
      style={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: sizeMap[fontSize], minWidth: 480 }}
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${theme.grad} text-white px-8 py-6`}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold tracking-tight">{company.companyName || 'Company Name'}</h2>
            <p className="text-white/80 text-xs mt-1 max-w-xs">{company.companyAddress || 'Company Address'}</p>
            {company.companyEmail && <p className="text-white/80 text-xs">{company.companyEmail}</p>}
            {company.companyPhone && <p className="text-white/80 text-xs">{company.companyPhone}</p>}
            {company.cin && <p className="text-white/80 text-xs">CIN: {company.cin}</p>}
          </div>
          <div className="text-right">
            <div className="text-white/80 text-xs font-semibold uppercase tracking-widest">Payslip</div>
            <div className="text-white font-bold text-base mt-1">{employee.payPeriod || 'Month YYYY'}</div>
          </div>
        </div>
      </div>

      {/* Employee Details Band */}
      <div className={`${theme.bg} border-b ${theme.border} px-8 py-4`}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { l: 'Employee Name', v: employee.employeeName },
            { l: 'Employee ID', v: employee.employeeId },
            { l: 'Designation', v: employee.designation },
            { l: 'Department', v: employee.department },
            { l: 'Date of Joining', v: employee.dateOfJoining },
            { l: 'PAN Number', v: employee.panNumber },
            { l: 'PF Number', v: employee.pfNumber },
            { l: 'Bank Account', v: employee.bankAccount },
          ].map(({ l, v }) => v ? (
            <div key={l}>
              <div className={`${theme.textLight} text-[10px] font-bold uppercase tracking-wider`}>{l}</div>
              <div className="text-gray-800 font-semibold text-xs mt-0.5">{v}</div>
            </div>
          ) : null)}
        </div>
        <div className="mt-3 flex gap-6 text-xs">
          <span><span className={`${theme.textLight} font-bold`}>Working Days:</span> <span className="font-semibold">{employee.workingDays}</span></span>
          <span><span className={`${theme.textLight} font-bold`}>Paid Days:</span> <span className="font-semibold">{employee.paidDays}</span></span>
        </div>
      </div>

      {/* Earnings / Deductions Table */}
      <div className="px-8 pt-5 pb-2">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-2 px-3 font-bold text-gray-500 uppercase tracking-wide border-b border-gray-200 w-1/2">Earnings</th>
              <th className="text-right py-2 px-3 font-bold text-gray-500 uppercase tracking-wide border-b border-gray-200 w-1/4">Amount (₹)</th>
              <th className="text-left py-2 px-3 font-bold text-gray-500 uppercase tracking-wide border-b border-gray-200 w-1/4">Deductions</th>
              <th className="text-right py-2 px-3 font-bold text-gray-500 uppercase tracking-wide border-b border-gray-200">Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxRows }).map((_, i) => {
              const e = earnings[i];
              const d = deductions[i];
              return (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="py-2 px-3 text-gray-700">{e?.label ?? ''}</td>
                  <td className="py-2 px-3 text-right text-gray-800 font-medium">{e ? fmt(e.amount) : ''}</td>
                  <td className="py-2 px-3 text-gray-700">{d?.label ?? ''}</td>
                  <td className="py-2 px-3 text-right text-red-600 font-medium">{d ? fmt(d.amount) : ''}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 font-bold border-t-2 border-gray-300">
              <td className="py-3 px-3 text-gray-900">Gross Earnings</td>
              <td className={`py-3 px-3 text-right ${theme.text}`}>₹{fmt(result.grossEarnings)}</td>
              <td className="py-3 px-3 text-gray-900">Total Deductions</td>
              <td className="py-3 px-3 text-right text-red-600">₹{fmt(result.totalDeductions)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Net Pay Banner */}
      <div className={`mx-8 mb-6 mt-4 rounded-xl bg-gradient-to-r ${theme.banner} px-6 py-4 flex justify-between items-center text-white`}>
        <div>
          <div className="text-white/80 text-xs font-semibold uppercase tracking-widest">Net Pay</div>
          <div className="text-2xl font-black mt-0.5">₹{fmt(employee.workingDays > 0 ? effectiveNet : result.netPay)}</div>
          <div className="text-white/80 text-xs mt-1 italic">{result.netPayWords}</div>
        </div>
        {employee.ifscCode && (
          <div className="text-right text-xs text-white/80">
            <div className="font-bold text-white">IFSC</div>
            <div>{employee.ifscCode}</div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-8 py-4 flex justify-between text-xs text-gray-400">
        <span>This is a computer generated payslip and does not require a signature.</span>
        <span>Generated via quickutils.in</span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SalarySlipGenerator() {
  const DEFAULT_BASIC = 30000;

  const [company, setCompany] = useState<CompanyDetails>({
    companyName: '', companyAddress: '', companyEmail: '', companyPhone: '', cin: '',
  });
  const [employee, setEmployee] = useState<EmployeeDetails>({
    employeeName: '', employeeId: '', designation: '', department: '',
    dateOfJoining: '', panNumber: '', pfNumber: '', bankAccount: '', ifscCode: '',
    payPeriod: '',
    workingDays: 30, paidDays: 30,
  });
  const [earnings, setEarnings] = useState<EarningRow[]>(buildDefaultEarnings(DEFAULT_BASIC));
  const [deductions, setDeductions] = useState<DeductionRow[]>(buildDefaultDeductions(DEFAULT_BASIC));

  const [template, setTemplate] = useState<'modern' | 'classic'>('modern');
  const [themeColor, setThemeColor] = useState<string>('violet');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEmployee(e => ({
      ...e,
      payPeriod: new Date().toLocaleString('en-IN', { month: 'long', year: 'numeric' }),
    }));
  }, []);

  const setCo = useCallback((k: keyof CompanyDetails) => (v: string) =>
    setCompany(c => ({ ...c, [k]: v })), []);
  const setEmp = useCallback((k: keyof EmployeeDetails) => (v: string | number) =>
    setEmployee(e => ({ ...e, [k]: v })), []);

  function handlePrint() {
    const el = document.getElementById('salary-slip-preview');
    if (!el) return;
    const win = window.open('', '_blank', 'width=900,height=700');
    if (!win) return;
    win.document.write(`<!DOCTYPE html><html><head>
      <title>Salary Slip – ${employee.payPeriod}</title>
      <meta charset="utf-8"/>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet"/>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Inter, Arial, sans-serif; background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        @page { margin: 0.5cm; }
        @media print { body { margin: 0; } }
      </style>
    </head><body>${el.outerHTML}</body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 1500);
  }

  function handleReset() {
    setCompany({ companyName: '', companyAddress: '', companyEmail: '', companyPhone: '', cin: '' });
    setEmployee({
      employeeName: '', employeeId: '', designation: '', department: '',
      dateOfJoining: '', panNumber: '', pfNumber: '', bankAccount: '', ifscCode: '',
      payPeriod: new Date().toLocaleString('en-IN', { month: 'long', year: 'numeric' }),
      workingDays: 30, paidDays: 30,
    });
    setEarnings(buildDefaultEarnings(DEFAULT_BASIC));
    setDeductions(buildDefaultDeductions(DEFAULT_BASIC));
  }

  return (
    <div className="space-y-6">
      {/* Top Actions */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">Fill in the details on the left — the slip updates live on the right.</p>
        <div className="flex gap-2">
          <button onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-semibold hover:bg-gray-200 transition">
            <RotateCcw size={15} /> Reset
          </button>
          <button onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold shadow-lg shadow-violet-500/30 transition hover:scale-105 active:scale-95">
            <Printer size={15} /> Print / Save PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        {/* ── Left: Form ─────────────────────────────────────────────────── */}
        <div className="space-y-4">
          
          {/* Customization */}
          <Section title="Customization" icon={<Palette size={16} className="text-pink-500" />} defaultOpen={true}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className={label}>Template</label>
                <select value={template} onChange={e => setTemplate(e.target.value as any)} className={inp}>
                  <option value="modern">Modern</option>
                  <option value="classic">Classic (Standard)</option>
                </select>
              </div>
              {template === 'modern' && (
                <div>
                  <label className={label}>Theme Color</label>
                  <select value={themeColor} onChange={e => setThemeColor(e.target.value)} className={inp}>
                    <option value="violet">Violet</option>
                    <option value="blue">Blue</option>
                    <option value="emerald">Emerald</option>
                    <option value="rose">Rose</option>
                    <option value="gray">Gray</option>
                  </select>
                </div>
              )}
              <div>
                <label className={label}>Font Size</label>
                <select value={fontSize} onChange={e => setFontSize(e.target.value as any)} className={inp}>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </Section>

          {/* Company */}
          <Section title="Company Details" icon={<Building2 size={16} className="text-violet-500" />} defaultOpen={false}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id="co-name" lbl="Company Name *" value={company.companyName} onChange={setCo('companyName')} placeholder="Acme Pvt. Ltd." />
              <Field id="co-phone" lbl="Phone" value={company.companyPhone} onChange={setCo('companyPhone')} placeholder="+91 98765 43210" />
              <Field id="co-email" lbl="Email" value={company.companyEmail} onChange={setCo('companyEmail')} placeholder="hr@acme.com" type="email" />
              <Field id="co-cin" lbl="CIN (optional)" value={company.cin ?? ''} onChange={setCo('cin')} placeholder="U74999MH2020..." />
            </div>
            <div>
              <label htmlFor="co-addr" className={label}>Address</label>
              <textarea id="co-addr" value={company.companyAddress} rows={2}
                placeholder="123 Business Park, Mumbai 400001"
                onChange={e => setCompany(c => ({ ...c, companyAddress: e.target.value }))}
                className={`${inp} resize-none`} />
            </div>
          </Section>

          {/* Employee */}
          <Section title="Employee Details" icon={<User size={16} className="text-violet-500" />} defaultOpen={false}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id="emp-name" lbl="Employee Name *" value={employee.employeeName} onChange={v => setEmp('employeeName')(v)} placeholder="Rajesh Kumar" />
              <Field id="emp-id" lbl="Employee ID" value={employee.employeeId} onChange={v => setEmp('employeeId')(v)} placeholder="EMP-001" />
              <Field id="emp-desig" lbl="Designation" value={employee.designation} onChange={v => setEmp('designation')(v)} placeholder="Software Engineer" />
              <Field id="emp-dept" lbl="Department" value={employee.department} onChange={v => setEmp('department')(v)} placeholder="Engineering" />
              <Field id="emp-doj" lbl="Date of Joining" value={employee.dateOfJoining} onChange={v => setEmp('dateOfJoining')(v)} placeholder="01 Jan 2022" />
              <Field id="emp-pay-period" lbl="Pay Period *" value={employee.payPeriod} onChange={v => setEmp('payPeriod')(v)} placeholder="May 2026" />
              <div>
                <label htmlFor="emp-working" className={label}>Working Days</label>
                <input id="emp-working" type="number" value={employee.workingDays}
                  onChange={e => setEmp('workingDays')(Number(e.target.value))} className={inp} />
              </div>
              <div>
                <label htmlFor="emp-paid" className={label}>Paid Days</label>
                <input id="emp-paid" type="number" value={employee.paidDays}
                  onChange={e => setEmp('paidDays')(Number(e.target.value))} className={inp} />
              </div>
            </div>
          </Section>

          {/* Banking */}
          <Section title="Banking & Compliance" icon={<CreditCard size={16} className="text-violet-500" />} defaultOpen={false}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id="emp-pan" lbl="PAN Number" value={employee.panNumber ?? ''} onChange={v => setEmp('panNumber')(v)} placeholder="ABCDE1234F" />
              <Field id="emp-pf" lbl="PF Account No." value={employee.pfNumber ?? ''} onChange={v => setEmp('pfNumber')(v)} placeholder="MH/BAN/1234567" />
              <Field id="emp-bank" lbl="Bank Account" value={employee.bankAccount ?? ''} onChange={v => setEmp('bankAccount')(v)} placeholder="XXXX XXXX 1234" />
              <Field id="emp-ifsc" lbl="IFSC Code" value={employee.ifscCode ?? ''} onChange={v => setEmp('ifscCode')(v)} placeholder="HDFC0001234" />
            </div>
          </Section>

          {/* Earnings */}
          <Section title="Earnings" icon={<Briefcase size={16} className="text-green-500" />} defaultOpen={false}>
            <div className="grid grid-cols-[1fr_1fr_auto] gap-2 mb-1">
              <span className="text-xs text-gray-400 font-semibold">Component</span>
              <span className="text-xs text-gray-400 font-semibold text-right">Amount (₹)</span>
              <span />
            </div>
            <RowEditor rows={earnings} onChange={setEarnings} accentClass="text-green-600 hover:text-green-700" />
          </Section>

          {/* Deductions */}
          <Section title="Deductions" icon={<Calendar size={16} className="text-red-500" />} defaultOpen={false}>
            <div className="grid grid-cols-[1fr_1fr_auto] gap-2 mb-1">
              <span className="text-xs text-gray-400 font-semibold">Component</span>
              <span className="text-xs text-gray-400 font-semibold text-right">Amount (₹)</span>
              <span />
            </div>
            <RowEditor rows={deductions} onChange={setDeductions} accentClass="text-red-500 hover:text-red-600" />
          </Section>
        </div>

        {/* ── Right: Live Preview ─────────────────────────────────────────── */}
        <div className="sticky top-6">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Live Preview</span>
          </div>
          <div ref={previewRef} className="overflow-auto rounded-2xl ring-1 ring-gray-200 dark:ring-gray-700 shadow-2xl">
            <SalarySlipPreview
              company={company}
              employee={employee}
              earnings={earnings}
              deductions={deductions}
              template={template}
              themeColor={themeColor}
              fontSize={fontSize}
            />
          </div>
          <p className="mt-3 text-xs text-center text-gray-400">Click <strong>Print / Save PDF</strong> → Save as PDF in the print dialog</p>
        </div>
      </div>
    </div>
  );
}
