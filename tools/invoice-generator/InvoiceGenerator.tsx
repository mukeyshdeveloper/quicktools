'use client'

import { useState, useEffect } from 'react'
import {
  type InvoiceData,
  type InvoiceItem,
  getDefaultInvoice,
  generateId,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  formatCurrency,
  CURRENCIES
} from './utils'
import { Plus, Trash2, Download, Printer, Settings2, FileText, Upload, Palette, ExternalLink } from 'lucide-react'

export default function InvoiceGenerator() {
  const [data, setData] = useState<InvoiceData | null>(null)
  const [logo, setLogo] = useState<string | null>(null)
  const [template, setTemplate] = useState<'modern' | 'classic'>('modern')
  const [themeColor, setThemeColor] = useState<string>('emerald')
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium')

  useEffect(() => {
    setData(getDefaultInvoice())
  }, [])

  if (!data) return null; // Hydration guard

  const subtotal = calculateSubtotal(data.items)
  const tax = calculateTax(subtotal, data.discount, data.taxRate)
  const total = calculateTotal(subtotal, tax, data.discount)

  const sizeMap = { small: '12px', medium: '14px', large: '16px' }

  function updateField<K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) {
    setData((prev) => prev ? ({ ...prev, [field]: value }) : prev)
  }

  function addItem() {
    setData((prev) => prev ? ({
      ...prev,
      items: [...prev.items, { id: generateId(), description: '', quantity: 1, rate: 0 }],
    }) : prev)
  }

  function updateItem(id: string, field: keyof InvoiceItem, value: string | number) {
    setData((prev) => prev ? ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }) : prev)
  }

  function removeItem(id: string) {
    setData((prev) => prev ? ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }) : prev)
  }

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setLogo(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  function openPreview(shouldPrint: boolean) {
    const el = document.getElementById('invoice-preview');
    if (!el) return;
    const win = window.open('', '_blank', 'width=900,height=900');
    if (!win) return;
    win.document.write(`<!DOCTYPE html><html><head>
      <title>Invoice - ${data?.invoiceNumber}</title>
      <meta charset="utf-8"/>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Inter, Arial, sans-serif; background: ${shouldPrint ? 'white' : '#f3f4f6'}; padding: ${shouldPrint ? '0' : '2rem'}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        #invoice-preview { margin: 0 auto; }
        @page { margin: 0.5in; }
        @media print { body { padding: 0; margin: 0; background: white; } }
      </style>
    </head><body>${el.outerHTML}</body></html>`);
    win.document.close();
    win.focus();
    if (shouldPrint) {
      setTimeout(() => { win.print(); }, 1500);
    }
  }

  function handlePrint() {
    openPreview(true);
  }

  function handlePreview() {
    openPreview(false);
  }

  const themes: Record<string, any> = {
    emerald: { main: 'text-emerald-600', light: 'text-emerald-500', bg: 'bg-emerald-600', bgLight: 'bg-emerald-50' },
    blue: { main: 'text-blue-600', light: 'text-blue-500', bg: 'bg-blue-600', bgLight: 'bg-blue-50' },
    violet: { main: 'text-violet-600', light: 'text-violet-500', bg: 'bg-violet-600', bgLight: 'bg-violet-50' },
    rose: { main: 'text-rose-600', light: 'text-rose-500', bg: 'bg-rose-600', bgLight: 'bg-rose-50' },
    gray: { main: 'text-gray-700', light: 'text-gray-500', bg: 'bg-gray-700', bgLight: 'bg-gray-50' },
  }
  const theme = themes[themeColor] || themes.emerald

  return (
    <div className="w-full mx-auto print:p-0">
      <div className="mb-10 text-center print:hidden">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full mb-4">
          <FileText size={14} /> Business Tool
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Professional Invoice Generator
        </h2>
        <p className="mt-3 text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Create, preview, and print beautiful invoices instantly. All data stays securely on your device.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Editor Pane */}
        <div className="w-full lg:w-[45%] flex-shrink-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl border border-white/40 dark:border-gray-800 shadow-2xl p-6 md:p-8 print:hidden transition-all">
          <div className="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-5">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Settings2 className="text-emerald-500" size={20} /> Invoice Details
            </h3>
            <div className="flex gap-3">
              <button
                onClick={handlePreview}
                title="Preview in Popup"
                className="flex items-center justify-center px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm rounded-xl transition-all shadow-sm hover:scale-105 active:scale-95 gap-2"
              >
                <ExternalLink size={16} /> Preview
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <Download size={16} /> Download PDF
              </button>
            </div>
          </div>

          <div className="space-y-8">
            
            {/* Customization */}
            <div className="space-y-4 bg-gray-50/50 dark:bg-gray-800/30 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
              <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Palette size={16} /> Customization
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Template</label>
                  <select value={template} onChange={(e) => setTemplate(e.target.value as any)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900 dark:text-white transition-all shadow-sm">
                    <option value="modern">Modern</option>
                    <option value="classic">Classic (Standard)</option>
                  </select>
                </div>
                {template === 'modern' && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Theme Color</label>
                    <select value={themeColor} onChange={(e) => setThemeColor(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900 dark:text-white transition-all shadow-sm">
                      <option value="emerald">Emerald</option>
                      <option value="blue">Blue</option>
                      <option value="violet">Violet</option>
                      <option value="rose">Rose</option>
                      <option value="gray">Gray</option>
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Font Size</label>
                  <select value={fontSize} onChange={(e) => setFontSize(e.target.value as any)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900 dark:text-white transition-all shadow-sm">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Company Logo</label>
              <div className="flex items-center gap-4">
                {logo && (
                  <div className="relative w-16 h-16 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white shadow-sm">
                    <img src={logo} alt="Logo preview" className="w-full h-full object-contain" />
                    <button onClick={() => setLogo(null)} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-xl hover:bg-red-600 transition-colors">
                      <Trash2 size={12} />
                    </button>
                  </div>
                )}
                <label className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Upload size={16} />
                  {logo ? 'Change Logo' : 'Upload Logo'}
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* From & To */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 flex flex-col group">
                <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">From</h4>
                <input type="text" placeholder="Your Company Name" value={data.fromName} onChange={(e) => updateField('fromName', e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-900 dark:text-white text-sm" />
                <input type="email" placeholder="Your Email" value={data.fromEmail} onChange={(e) => updateField('fromEmail', e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-900 dark:text-white text-sm" />
                <textarea placeholder="Your Address" value={data.fromAddress} onChange={(e) => updateField('fromAddress', e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-900 dark:text-white text-sm resize-none h-24" />
              </div>
              <div className="space-y-3 flex flex-col group">
                <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Bill To</h4>
                <input type="text" placeholder="Client Name" value={data.toName} onChange={(e) => updateField('toName', e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-900 dark:text-white text-sm" />
                <input type="email" placeholder="Client Email" value={data.toEmail} onChange={(e) => updateField('toEmail', e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-900 dark:text-white text-sm" />
                <textarea placeholder="Client Address" value={data.toAddress} onChange={(e) => updateField('toAddress', e.target.value)} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-900 dark:text-white text-sm resize-none h-24" />
              </div>
            </div>

            {/* Invoice Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-gray-50/80 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Invoice #</label>
                <input type="text" value={data.invoiceNumber} onChange={(e) => updateField('invoiceNumber', e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900 dark:text-white transition-all shadow-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Date</label>
                <input type="date" value={data.date} onChange={(e) => updateField('date', e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900 dark:text-white transition-all shadow-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Due Date</label>
                <input type="date" value={data.dueDate} onChange={(e) => updateField('dueDate', e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900 dark:text-white transition-all shadow-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Currency</label>
                <select value={data.currency} onChange={(e) => updateField('currency', e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-gray-900 dark:text-white transition-all shadow-sm cursor-pointer">
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Line Items */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Line Items</h4>
              <div className="space-y-3">
                {data.items.map((item) => (
                  <div key={item.id} className="flex gap-2 items-start group">
                    <input type="text" placeholder="Item description" value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)} className="flex-1 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-gray-900 dark:text-white transition-all shadow-sm" />
                    <input type="number" min="1" placeholder="Qty" value={item.quantity || ''} onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)} className="w-16 py-3 px-2 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-gray-900 dark:text-white text-center transition-all shadow-sm" />
                    <input type="number" min="0" step="0.01" placeholder="Rate" value={item.rate || ''} onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)} className="w-16 py-3 px-2 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-gray-900 dark:text-white text-right transition-all shadow-sm" />
                    <button onClick={() => removeItem(item.id)} disabled={data.items.length === 1} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors disabled:opacity-30">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={addItem} className="mt-4 flex items-center gap-1.5 text-sm font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-400 transition-colors bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-xl">
                <Plus size={16} /> Add New Item
              </button>
            </div>

            {/* Financials & Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">Notes & Terms</h4>
                <textarea placeholder="Payment instructions, thank you note, etc." value={data.notes} onChange={(e) => updateField('notes', e.target.value)} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-gray-900 dark:text-white text-sm resize-none h-32 shadow-sm" />
              </div>
              <div className="space-y-4 bg-gray-50/50 dark:bg-gray-800/30 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(subtotal, data.currency)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">Discount ({CURRENCIES.find(c => c.code === data.currency)?.symbol || '$'})</span>
                  <input type="number" min="0" step="0.01" value={data.discount || ''} onChange={(e) => updateField('discount', parseFloat(e.target.value) || 0)} className="w-16 p-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-right text-gray-900 dark:text-white shadow-sm" />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tax (%)</span>
                  <input type="number" min="0" max="100" step="0.1" value={data.taxRate || ''} onChange={(e) => updateField('taxRate', parseFloat(e.target.value) || 0)} className="w-24 p-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-right text-gray-900 dark:text-white shadow-sm" />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">Total</span>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{formatCurrency(total, data.currency)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview / Print Area */}
        <div className="w-full lg:flex-1 min-w-0 sticky top-8 print:w-full print:static print:h-auto">
          <div className="w-full overflow-auto rounded-3xl shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 print:shadow-none print:ring-0 bg-white">
            <div className="print:min-w-0">
              {template === 'classic' ? (
                <div id="invoice-preview" className="bg-white text-gray-900 w-full font-sans print:border-none p-8 md:p-12 min-h-[842px]" style={{ fontFamily: 'Arial, sans-serif', fontSize: sizeMap[fontSize] }}>
              <div className="flex justify-between items-start mb-8 border-b-2 border-gray-800 pb-4">
                <div className="max-w-[50%]">
                  {logo && <img src={logo} alt="Company Logo" className="max-h-20 mb-2 object-contain" />}
                  <h1 className="text-2xl font-bold uppercase">{data.fromName || 'Your Company'}</h1>
                  <p className="text-sm font-medium mt-1">{data.fromEmail}</p>
                  <p className="text-sm whitespace-pre-wrap">{data.fromAddress}</p>
                </div>
                <div className="text-right">
                  <h2 className="text-4xl font-bold uppercase mb-2">Invoice</h2>
                  <table className="ml-auto text-sm">
                    <tbody>
                      <tr><td className="pr-4 font-bold uppercase text-right">Invoice #</td><td className="text-right">{data.invoiceNumber}</td></tr>
                      <tr><td className="pr-4 font-bold uppercase text-right">Date</td><td className="text-right">{data.date}</td></tr>
                      <tr><td className="pr-4 font-bold uppercase text-right">Due Date</td><td className="text-right">{data.dueDate}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-bold uppercase border-b border-gray-300 mb-2 pb-1">Bill To</h3>
                <p className="font-bold text-lg">{data.toName || 'Client Name'}</p>
                <p className="text-sm font-medium">{data.toEmail}</p>
                <p className="text-sm whitespace-pre-wrap">{data.toAddress}</p>
              </div>

              <table className="w-full border-collapse border border-gray-800 mb-8 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-800 py-2 px-3 text-left uppercase text-sm w-1/2">Description</th>
                    <th className="border border-gray-800 py-2 px-3 text-center uppercase text-sm w-1/6">Qty</th>
                    <th className="border border-gray-800 py-2 px-3 text-right uppercase text-sm w-1/6">Rate</th>
                    <th className="border border-gray-800 py-2 px-3 text-right uppercase text-sm w-1/6">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item) => (
                    <tr key={item.id}>
                      <td className="border border-gray-800 py-2 px-3">{item.description}</td>
                      <td className="border border-gray-800 py-2 px-3 text-center">{item.quantity}</td>
                      <td className="border border-gray-800 py-2 px-3 text-right">{formatCurrency(item.rate, data.currency)}</td>
                      <td className="border border-gray-800 py-2 px-3 text-right font-bold">{formatCurrency(item.quantity * item.rate, data.currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="w-full md:w-1/2">
                  {data.notes && (
                    <div>
                      <h3 className="text-sm font-bold uppercase border-b border-gray-300 mb-2 pb-1">Notes & Terms</h3>
                      <p className="text-sm whitespace-pre-wrap">{data.notes}</p>
                    </div>
                  )}
                </div>
                <div className="w-full md:w-5/12">
                  <table className="w-full text-sm border-collapse">
                    <tbody>
                      <tr>
                        <td className="py-1 pr-4 font-bold">Subtotal</td>
                        <td className="py-1 text-right">{formatCurrency(subtotal, data.currency)}</td>
                      </tr>
                      {data.discount > 0 && (
                        <tr>
                          <td className="py-1 pr-4 font-bold">Discount</td>
                          <td className="py-1 text-right text-red-600">-{formatCurrency(data.discount, data.currency)}</td>
                        </tr>
                      )}
                      {data.taxRate > 0 && (
                        <tr>
                          <td className="py-1 pr-4 font-bold">Tax ({data.taxRate}%)</td>
                          <td className="py-1 text-right">{formatCurrency(tax, data.currency)}</td>
                        </tr>
                      )}
                      <tr className="border-t-2 border-gray-800">
                        <td className="py-2 pr-4 font-bold text-lg uppercase">Total</td>
                        <td className="py-2 text-right font-bold text-lg">{formatCurrency(total, data.currency)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div id="invoice-preview" className="bg-white text-gray-900 p-8 md:p-12 print:shadow-none print:border-none print:p-0 min-h-[842px] transition-all relative overflow-hidden" style={{ fontSize: sizeMap[fontSize] }}>
              {/* Elegant Header Accent */}
              <div className={`absolute top-0 left-0 w-full h-3 ${theme.bg} print:${theme.bg}`}></div>

              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-14 mt-4">
                <div className="max-w-[50%]">
                  {logo ? (
                    <img src={logo} alt="Company Logo" className="max-h-20 mb-5 object-contain" />
                  ) : (
                    <div className="h-14 w-14 bg-gray-100 rounded-xl mb-5 flex items-center justify-center text-gray-400 font-bold text-xs uppercase tracking-wider border border-gray-200">Logo</div>
                  )}
                  <h1 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">{data.fromName || 'Your Company'}</h1>
                  <p className="text-sm font-medium text-gray-500 mb-1">{data.fromEmail}</p>
                  <p className="text-sm font-medium text-gray-500 whitespace-pre-wrap leading-relaxed">{data.fromAddress}</p>
                </div>
                <div className="text-right">
                  <h2 className={`text-5xl font-black tracking-tighter uppercase mb-6 ${theme.main}`}>Invoice</h2>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-right">
                    <span className="text-gray-400 font-semibold uppercase tracking-wider">Invoice #</span>
                    <span className="font-bold text-gray-900">{data.invoiceNumber}</span>
                    <span className="text-gray-400 font-semibold uppercase tracking-wider">Date</span>
                    <span className="font-bold text-gray-900">{data.date}</span>
                    <span className="text-gray-400 font-semibold uppercase tracking-wider">Due Date</span>
                    <span className="font-bold text-gray-900">{data.dueDate}</span>
                  </div>
                </div>
              </div>

              {/* Bill To */}
              <div className={`mb-14 p-6 rounded-2xl border border-gray-100 ${theme.bgLight}`}>
                <h3 className={`text-xs font-bold uppercase tracking-widest mb-3 ${theme.main}`}>Billed To</h3>
                <p className="text-xl font-bold text-gray-900 mb-1">{data.toName || 'Client Name'}</p>
                <p className="text-sm font-medium text-gray-600 mb-1">{data.toEmail}</p>
                <p className="text-sm font-medium text-gray-600 whitespace-pre-wrap leading-relaxed">{data.toAddress}</p>
              </div>

              {/* Items Table */}
              <div className="mb-12">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-900">
                      <th className="py-4 font-bold text-sm text-gray-900 uppercase tracking-wider w-3/5">Description</th>
                      <th className="py-4 font-bold text-sm text-gray-900 uppercase tracking-wider text-center w-1/5">Qty</th>
                      <th className="py-4 font-bold text-sm text-gray-900 uppercase tracking-wider text-right w-1/5">Rate</th>
                      <th className="py-4 font-bold text-sm text-gray-900 uppercase tracking-wider text-right w-1/5">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.items.map((item) => (
                      <tr key={item.id} className="group">
                        <td className="py-5 text-sm font-medium text-gray-800 break-words pr-4">{item.description || <span className="text-gray-300 italic font-normal">Item description</span>}</td>
                        <td className="py-5 text-sm font-medium text-gray-800 text-center">{item.quantity}</td>
                        <td className="py-5 text-sm font-medium text-gray-800 text-right">{formatCurrency(item.rate, data.currency)}</td>
                        <td className="py-5 text-sm font-bold text-gray-900 text-right">{formatCurrency(item.quantity * item.rate, data.currency)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals & Notes */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                <div className="w-full md:w-1/2">
                  {data.notes && (
                    <div>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Notes & Terms</h3>
                      <p className="text-sm font-medium text-gray-600 whitespace-pre-wrap leading-relaxed">{data.notes}</p>
                    </div>
                  )}
                </div>
                <div className={`w-full md:w-1/3 space-y-4 p-6 rounded-2xl border border-gray-100 ${theme.bgLight}`}>
                  <div className="flex justify-between text-sm font-medium text-gray-600">
                    <span>Subtotal</span>
                    <span className="text-gray-900">{formatCurrency(subtotal, data.currency)}</span>
                  </div>
                  {data.discount > 0 && (
                    <div className="flex justify-between text-sm font-medium text-red-500">
                      <span>Discount</span>
                      <span>-{formatCurrency(data.discount, data.currency)}</span>
                    </div>
                  )}
                  {data.taxRate > 0 && (
                    <div className="flex justify-between text-sm font-medium text-gray-600">
                      <span>Tax ({data.taxRate}%)</span>
                      <span className="text-gray-900">{formatCurrency(tax, data.currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center border-t-2 border-gray-900 pt-4 mt-4">
                    <span className="text-lg font-bold text-gray-900 uppercase tracking-wider">Total</span>
                    <span className={`text-3xl font-black ${theme.main}`}>{formatCurrency(total, data.currency)}</span>
                  </div>
                </div>
              </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
