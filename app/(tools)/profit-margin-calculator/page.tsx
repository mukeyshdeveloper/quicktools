import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/profit-margin-calculator/meta';
import ProfitMarginCalculator from '@/tools/profit-margin-calculator/ProfitMarginCalculator';
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

export default function ProfitMarginCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Business Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Profit Margin &amp; Markup Calculator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <ProfitMarginCalculator />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Margin vs Markup — The Most Common Pricing Mistake</h2>
          <p>
            Many business owners accidentally underprice because they confuse margin and markup. A "50% markup" sounds good but actually delivers only about 33% gross margin. This calculator removes the guesswork by letting you work in both directions and instantly see the real profit percentage on revenue.
          </p>

          <h2>How to Use Effectively</h2>
          <ul>
            <li>Start with your actual cost and current price to see your true margin.</li>
            <li>Use the "Price from Desired Margin" section when you have a target profitability (e.g. I want 40% margin).</li>
            <li>Use Markup mode when suppliers quote "keystone pricing" or you think in "double my cost".</li>
            <li>Experiment — small changes in margin requirements have big effects on required price.</li>
          </ul>

          <div className="pt-4 border-t border-border">
            <h2>Related Business Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/break-even-calculator" className="text-brand underline">Break-Even Analysis Calculator</Link></li>
              <li><Link href="/roi-calculator" className="text-brand underline">ROI Calculator</Link></li>
              <li><Link href="/quotation-generator" className="text-brand underline">Quotation Generator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
