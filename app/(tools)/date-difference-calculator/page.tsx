import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/date-difference-calculator/meta';
import DateDiffCalculator from '@/tools/date-difference-calculator/DateDiffCalculator';
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
    images: [{ url: meta.ogImage ?? '/og-default.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
};

export default function DateDifferenceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Utility Calculator</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Date Difference Calculator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />
        <DateDiffCalculator />
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-text">How it Works</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              This tool automatically accounts for leap years, variations in month length, and timezone offsets to calculate the exact duration between any two dates on the Gregorian calendar. The calculation strips out the time of day, ensuring you receive a clean "midnight-to-midnight" count of the total days.
            </p>
          </div>
          <div className="pt-4 border-t border-border">
            <h2 className="text-xl font-bold text-text">Related Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/age-calculator" className="text-brand underline">Age Calculator</Link></li>
              <li><Link href="/pregnancy-due-date-calculator" className="text-brand underline">Pregnancy Due Date Calculator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
