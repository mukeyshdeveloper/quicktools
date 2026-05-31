import type { Metadata } from 'next'
import Link from 'next/link'
import { meta } from '@/tools/invoice-generator/meta'
import InvoiceGenerator from '@/tools/invoice-generator/InvoiceGenerator'
import AdBanner from '@/components/layout/AdBanner'
import { generateToolSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: meta.canonical },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${meta.canonical}`,
    images: [{ url: meta.ogImage ?? '/og-default.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
}

export default function InvoiceGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <main className="mx-auto max-w-[1400px] px-4 py-10 print:py-0 print:px-0 bg-slate-50 dark:bg-gray-950 print:bg-white min-h-screen">
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8 print:hidden max-w-4xl mx-auto" />

        <InvoiceGenerator />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12 print:hidden max-w-4xl mx-auto" />

        <section className="mt-16 space-y-5 text-sm text-gray-600 dark:text-gray-400 max-w-4xl mx-auto print:hidden bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Free Online Invoice Generator
          </h2>
          <p className="leading-relaxed">
            Create beautiful, professional invoices directly from your web browser with our completely free Invoice Generator. Whether you're a freelancer, contractor, or small business owner, our tool simplifies your billing process. 
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
            Why Use Our Invoice Maker?
          </h3>
          <ul className="list-disc pl-5 space-y-3 leading-relaxed">
            <li><strong className="text-gray-900 dark:text-gray-200">Live Preview:</strong> See exactly what your client will see in real-time as you fill out the details. The right pane updates instantly.</li>
            <li><strong className="text-gray-900 dark:text-gray-200">Auto-Calculations:</strong> Stop relying on manual math. Subtotals, taxes, discounts, and total amounts are calculated instantly based on your line items.</li>
            <li><strong className="text-gray-900 dark:text-gray-200">100% Private & Secure:</strong> We do not store your financial data. All rendering and PDF generation happens securely right on your local device.</li>
            <li><strong className="text-gray-900 dark:text-gray-200">Highly Customizable:</strong> Upload your company logo, set your preferred currency symbol, and include personalized payment instructions and terms.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
            How to save as a PDF
          </h3>
          <p className="leading-relaxed bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl text-emerald-800 dark:text-emerald-200 border border-emerald-100 dark:border-emerald-900/30">
            Once you have completed your invoice, simply click the <strong>"Download PDF"</strong> button at the top of the editor. This will trigger your browser's native print dialog. For the best result, ensure the destination is set to <strong>"Save as PDF"</strong>, ensure <strong>"Background graphics"</strong> are enabled, and set the margins to <strong>"None"</strong> or "Minimum".
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Explore More Business Tools</h2>
          <ul className="list-none space-y-2">
            <li><Link href="/resume-builder" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium transition-colors">→ Resume Builder</Link></li>
            <li><Link href="/qr-code-generator" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium transition-colors">→ QR Code Generator</Link></li>
            <li><Link href="/password-generator" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium transition-colors">→ Password Generator</Link></li>
          </ul>
        </section>
      </main>
    </>
  )
}
