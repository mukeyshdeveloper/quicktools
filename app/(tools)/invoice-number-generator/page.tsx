import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/invoice-number-generator/meta';
import InvoiceNumberGenerator from '@/tools/invoice-number-generator/InvoiceNumberGenerator';
import AdBanner from '@/components/layout/AdBanner';
import { generateToolSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: meta.canonical },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.canonical,
    images: [{ url: meta.ogImage ?? '/og-default.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
};

export default function InvoiceNumberGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Business Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Invoice Number Generator + Tracker
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <InvoiceNumberGenerator />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Why Sequential Invoice Numbers Matter</h2>
          <p>
            Gaps or duplicates in your numbering can create problems during audits, tax filing, or when a client disputes a payment. This lightweight tracker ensures you always know the next correct number and keeps a simple audit trail of who each invoice was for.
          </p>

          <h2>Recommended Usage</h2>
          <ul>
            <li>Set your prefix once (e.g. INV-2026- or just INV-) and a sensible starting number.</li>
            <li>Generate the number before you create the actual invoice document.</li>
            <li>Optionally note the client name so you can quickly search history later.</li>
            <li>Never delete numbers from the middle of the sequence — only the most recent if you made a mistake.</li>
          </ul>

          <div className="pt-4 border-t border-border">
            <h2>Related Business Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/invoice-generator" className="text-brand underline">Invoice Generator</Link></li>
              <li><Link href="/quotation-generator" className="text-brand underline">Quotation Generator</Link></li>
              <li><Link href="/lead-tracker" className="text-brand underline">Lead Tracker</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
