import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/break-even-calculator/meta';
import BreakEvenCalculator from '@/tools/break-even-calculator/BreakEvenCalculator';
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

export default function BreakEvenCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Business Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Break-Even Analysis Calculator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <BreakEvenCalculator />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Understanding Your Break-Even Point</h2>
          <p>
            The break-even point is the sales volume at which your business neither makes a profit nor incurs a loss. Knowing this number is fundamental for pricing decisions, cost control, and understanding how much you need to sell before the business becomes sustainable.
          </p>

          <h2>How to Use This Tool</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Enter your total fixed costs for the period (rent, salaries, software subscriptions, etc.).</li>
            <li>Enter the selling price and the true variable cost for one unit of your product or service.</li>
            <li>Optionally set a target profit to see how many extra units you need to sell.</li>
            <li>Instantly see break-even units, revenue, and contribution margin percentage.</li>
          </ol>

          <h2>Why Contribution Margin Matters</h2>
          <p>
            The contribution margin is what each sale contributes toward covering fixed costs and then generating profit. A low margin means you need to sell a lot more volume to break even. Use this calculator to experiment with pricing and cost reduction scenarios before making real business decisions.
          </p>

          <div className="pt-4 border-t border-border">
            <h2>Related Business Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/profit-margin-calculator" className="text-brand underline">Profit Margin &amp; Markup Calculator</Link></li>
              <li><Link href="/roi-calculator" className="text-brand underline">ROI Calculator</Link></li>
              <li><Link href="/quotation-generator" className="text-brand underline">Quotation Generator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
