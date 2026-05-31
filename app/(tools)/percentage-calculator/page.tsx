import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/percentage-calculator/meta';
import PercentageCalculator from '@/tools/percentage-calculator/PercentageCalculator';
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

export default function PercentageCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Calculator Utility</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Percentage Calculator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />
        <PercentageCalculator />
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-text">How to Calculate Percentages</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Percentages are used constantly in daily life — from figuring out tips at restaurants, calculating taxes, interpreting statistics, or analyzing business growth. This tool simplifies the three most common percentage formulas so you don't have to remember them.
            </p>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-2">
              <li><strong>What is X% of Y?</strong> Formula: (X / 100) × Y. Useful for finding the tax amount on a purchase.</li>
              <li><strong>X is what percent of Y?</strong> Formula: (X / Y) × 100. Useful for finding out your score on a test (e.g., 40 right out of 50).</li>
              <li><strong>Percentage Increase/Decrease:</strong> Formula: ((New - Old) / Old) × 100. Essential for finding business growth, stock market changes, or markdown amounts.</li>
            </ul>
          </div>
          <div className="pt-4 border-t border-border">
            <h2 className="text-xl font-bold text-text">Related Calculators</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/discount-calculator" className="text-brand underline">Discount & Sales Tax Calculator</Link></li>
              <li><Link href="/tip-calculator" className="text-brand underline">Tip Calculator</Link></li>
              <li><Link href="/compound-interest-calculator" className="text-brand underline">Compound Interest Calculator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
