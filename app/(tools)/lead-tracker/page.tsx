import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/lead-tracker/meta';
import LeadTracker from '@/tools/lead-tracker/LeadTracker';
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

export default function LeadTrackerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Business Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Simple CRM / Lead Tracker
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <LeadTracker />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Lightweight Pipeline Tracking</h2>
          <p>
            Full CRMs are overkill for most solopreneurs and small teams. This simple tracker gives you exactly what you need: a living list of leads, stage movement, value tracking, and quick notes — all saved privately in your browser. Perfect for staying on top of sales without the admin overhead.
          </p>

          <h2>How to Get the Most Out of It</h2>
          <ul>
            <li>Update the stage as soon as you make contact or send a proposal.</li>
            <li>Use the "Next Action" field religiously — it becomes your daily to-do list.</li>
            <li>Review the pipeline value regularly to understand your real sales forecast.</li>
            <li>Win/Lost data helps you calculate realistic conversion rates over time.</li>
          </ul>

          <div className="pt-4 border-t border-border">
            <h2>Related Business Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/quotation-generator" className="text-brand underline">Quotation Generator</Link></li>
              <li><Link href="/invoice-generator" className="text-brand underline">Invoice Generator</Link></li>
              <li><Link href="/meeting-cost-calculator" className="text-brand underline">Meeting Cost Calculator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
