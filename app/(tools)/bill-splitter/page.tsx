import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/bill-splitter/meta';
import BillSplitter from '@/tools/bill-splitter/BillSplitter';
import AdBanner from '@/components/layout/AdBanner';
import { generateToolSchema } from '@/lib/schema';
import FAQSection from '@/components/ui/FAQSection';

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

export default function BillSplitterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Business &amp; Group Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Advanced Bill Splitter
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <BillSplitter />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Why Most Bill Splitters Fail in Real Life</h2>
          <p>
            Simple 50/50 apps break the moment someone orders the expensive wine, two people didn’t join for dessert, or one person paid the entire cab. Our advanced splitter handles itemized bills, taxes, tips, multiple payers, and people who only participated in part of the expense.
          </p>

          <h2>Advanced Scenarios We Cover</h2>
          <ul>
            <li>Item-level splitting (different people for different dishes on one bill)</li>
            <li>Custom shares, percentages, or exact rupee amounts</li>
            <li>Tip and tax allocated proportionally or manually</li>
            <li>Multiple people who paid parts of the same bill</li>
            <li>Long-running groups (rent, office team lunches, multi-week trips)</li>
            <li>Optimal settlement suggestions that minimize the number of bank transfers</li>
          </ul>

          <h2>How to Share with Friends</h2>
          <p>
            After adding everyone and all bills, use “Copy Nice Summary” for a clean WhatsApp message or “Copy Shareable Link”. The link encodes the entire state — when your friends open it they see the exact same numbers and recommended payments. No sign-up required.
          </p>

          <FAQSection faqs={meta.faqs} />

          <div className="pt-4 border-t border-border">
            <h2>Related Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/trip-planner" className="text-brand underline">Advanced Trip Planner</Link> (includes this splitter + itinerary)</li>
              <li><Link href="/meeting-cost-calculator" className="text-brand underline">Meeting Cost Calculator</Link></li>
              <li><Link href="/decision-maker" className="text-brand underline">Decision Maker</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
