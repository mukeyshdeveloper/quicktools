import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/tip-calculator/meta';
import TipCalculator from '@/tools/tip-calculator/TipCalculator';
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

export default function TipCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Utility Calculator</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Tip Calculator & Bill Splitter
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />
        <TipCalculator />
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-text">Standard Tipping Etiquette</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              In many countries, particularly the United States, tipping is an expected part of the service industry. Here is a general guide to standard tipping percentages:
            </p>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-2">
              <li><strong>15%</strong> — Adequate service. The standard minimum.</li>
              <li><strong>18%</strong> — Good service. Often automatically applied to large groups.</li>
              <li><strong>20%</strong> — Excellent service. The modern standard for great dining experiences.</li>
              <li><strong>25%+</strong> — Exceptional service or holidays.</li>
            </ul>
          </div>
          <div className="pt-4 border-t border-border">
            <h2 className="text-xl font-bold text-text">Related Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/discount-calculator" className="text-brand underline">Discount & Sales Tax Calculator</Link></li>
              <li><Link href="/percentage-calculator" className="text-brand underline">Percentage Calculator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
