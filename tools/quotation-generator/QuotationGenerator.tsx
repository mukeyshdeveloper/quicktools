'use client';

import { useState } from 'react';
import { calculateQuote, DEFAULT_QUOTE, type QuoteData, type QuoteItem } from './utils';
import { Plus, Trash2, Printer, RotateCcw } from 'lucide-react';

export default function QuotationGenerator() {
  const [data, setData] = useState<QuoteData>(DEFAULT_QUOTE);

  const totals = calculateQuote(data.items, data.taxRate, data.discount);

  function updateField<K extends keyof QuoteData>(key: K, value: QuoteData[K]) {
    setData(prev => ({ ...prev, [key]: value }));
  }

  function updateItem(idx: number, key: keyof QuoteItem, value: string | number) {
    const items = [...data.items];
    items[idx] = { ...items[idx], [key]: value } as QuoteItem;
    updateField('items', items);
  }

  function addItem() {
    updateField('items', [...data.items, { description: 'New item', qty: 1, rate: 1000 }]);
  }

  function removeItem(idx: number) {
    if (data.items.length === 1) return;
    const items = data.items.filter((_, i) => i !== idx);
    updateField('items', items);
  }

  function handlePrint() {
    window.print();
  }

  function reset() {
    setData(DEFAULT_QUOTE);
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Form */}
        <div className="lg:col-span-5 bg-card border border-border rounded-3xl p-6 space-y-5 print:hidden">
          <div className="flex justify-between">
            <div className="font-semibold">Quote Details</div>
            <button onClick={reset} className="text-xs flex items-center gap-1 text-muted hover:text-text"><RotateCcw className="w-3 h-3" /> Reset</button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <label className="label">Quote #</label>
              <input value={data.quoteNumber} onChange={e => updateField('quoteNumber', e.target.value)} className="tool-input" />
            </div>
            <div>
              <label className="label">Date</label>
              <input type="date" value={data.date} onChange={e => updateField('date', e.target.value)} className="tool-input" />
            </div>
            <div>
              <label className="label">Valid Until</label>
              <input type="date" value={data.validUntil} onChange={e => updateField('validUntil', e.target.value)} className="tool-input" />
            </div>
            <div>
              <label className="label">Tax Rate %</label>
              <input type="number" value={data.taxRate} onChange={e => updateField('taxRate', +e.target.value)} className="tool-input" />
            </div>
          </div>

          <div>
            <label className="label">From (Your Details)</label>
            <textarea value={data.from} onChange={e => updateField('from', e.target.value)} className="tool-textarea h-20" />
          </div>
          <div>
            <label className="label">To (Client)</label>
            <textarea value={data.to} onChange={e => updateField('to', e.target.value)} className="tool-textarea h-20" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="label mb-0">Line Items</label>
              <button onClick={addItem} className="text-xs btn-secondary flex items-center gap-1"><Plus className="w-3 h-3" /> Add</button>
            </div>
            {data.items.map((item, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 mb-2">
                <input value={item.description} onChange={e => updateItem(i, 'description', e.target.value)} className="tool-input col-span-5 text-sm" placeholder="Description" />
                <input type="number" value={item.qty} onChange={e => updateItem(i, 'qty', +e.target.value)} className="tool-input col-span-2 text-sm" />
                <input type="number" value={item.rate} onChange={e => updateItem(i, 'rate', +e.target.value)} className="tool-input col-span-3 text-sm" />
                <button onClick={() => removeItem(i)} className="col-span-2 text-rose-500 flex items-center justify-center"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Discount %</label>
              <input type="number" value={data.discount} onChange={e => updateField('discount', +e.target.value)} className="tool-input" />
            </div>
            <div>
              <label className="label">Notes</label>
              <textarea value={data.notes} onChange={e => updateField('notes', e.target.value)} className="tool-textarea h-16 text-sm" />
            </div>
          </div>

          <button onClick={handlePrint} className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
            <Printer className="w-4 h-4" /> Print / Save as PDF
          </button>
        </div>

        {/* Live Preview (printable) */}
        <div className="lg:col-span-7">
          <div className="bg-white text-gray-900 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-200 print:shadow-none print:border-none print:p-8 min-h-[842px] print:min-h-0" id="quote-preview">
            <div className="flex justify-between items-start border-b pb-6">
              <div className="whitespace-pre-line text-sm">{data.from}</div>
              <div className="text-right">
                <div className="font-bold text-2xl tracking-tight">QUOTATION</div>
                <div className="text-sm text-gray-500 mt-1">#{data.quoteNumber}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 mt-6 text-sm">
              <div>
                <div className="font-semibold text-gray-500 text-xs tracking-wider">BILL TO</div>
                <div className="whitespace-pre-line mt-1">{data.to}</div>
              </div>
              <div className="text-right text-sm">
                <div>Date: <span className="font-medium">{data.date}</span></div>
                <div>Valid until: <span className="font-medium">{data.validUntil}</span></div>
              </div>
            </div>

            <table className="w-full mt-8 text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="py-2 font-medium">Description</th>
                  <th className="py-2 text-right font-medium">Qty</th>
                  <th className="py-2 text-right font-medium">Rate</th>
                  <th className="py-2 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.items.map((item, i) => (
                  <tr key={i}>
                    <td className="py-3">{item.description}</td>
                    <td className="py-3 text-right">{item.qty}</td>
                    <td className="py-3 text-right">₹{item.rate.toLocaleString('en-IN')}</td>
                    <td className="py-3 text-right font-medium">₹{(item.qty * item.rate).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 flex justify-end">
              <div className="w-72 text-sm space-y-1">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{totals.subtotal.toLocaleString('en-IN')}</span></div>
                {data.discount > 0 && <div className="flex justify-between text-emerald-600"><span>Discount ({data.discount}%)</span><span>-₹{totals.discountAmount.toLocaleString('en-IN')}</span></div>}
                <div className="flex justify-between"><span>Tax ({data.taxRate}%)</span><span>₹{totals.taxAmount.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-1"><span>Total</span><span>₹{totals.total.toLocaleString('en-IN')}</span></div>
              </div>
            </div>

            {(data.notes || data.terms) && (
              <div className="mt-10 text-sm border-t pt-6 space-y-4">
                {data.notes && <div><span className="font-semibold block mb-1">Notes</span>{data.notes}</div>}
                {data.terms && <div><span className="font-semibold block mb-1">Terms</span>{data.terms}</div>}
              </div>
            )}

            <div className="mt-12 text-center text-xs text-gray-400 print:mt-8">This is a computer generated quotation.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
