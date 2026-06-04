import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/quotation-generator/meta';
import QuotationGenerator from '@/tools/quotation-generator/QuotationGenerator';
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

export default function QuotationGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Business Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Quotation &amp; Estimate Generator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <QuotationGenerator />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Professional Quotes Without the Headache</h2>
          <p>
            Sending a sloppy or inconsistent quotation can lose you the deal before you even start. This generator produces clean, consistent, professional-looking documents that you can print to PDF in seconds. Perfect for freelancers, agencies, contractors, and consultants.
          </p>

          <h2>Tips for Winning Quotes</h2>
          <ul>
            <li>Be specific in line items — clients love clarity on what they are paying for.</li>
            <li>Always include a validity date so you control the timeline.</li>
            <li>Use the notes section for scope clarifications and the terms for payment schedule.</li>
            <li>Print to PDF and attach with a short personalized email.</li>
          </ul>

          <div className="pt-4 border-t border-border">
            <h2>Related Business Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/invoice-generator" className="text-brand underline">Invoice Generator</Link></li>
              <li><Link href="/profit-margin-calculator" className="text-brand underline">Profit Margin Calculator</Link></li>
              <li><Link href="/lead-tracker" className="text-brand underline">Lead Tracker</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
