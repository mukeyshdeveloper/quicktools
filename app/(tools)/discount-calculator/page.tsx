import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/discount-calculator/meta';
import DiscountCalculator from '@/tools/discount-calculator/DiscountCalculator';
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

export default function DiscountCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Shopping Utility</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Discount & Sales Tax Calculator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />
        <DiscountCalculator />
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-text">How the Discount Calculator Works</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              When shopping, figuring out the exact price of an item that is "25% off" can be confusing, especially when local sales tax applies *after* the discount is deducted. Our tool calculates this instantly for you.
            </p>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              The math is simple: we first multiply the original price by the discount percentage to find your total savings. We subtract the savings to get the subtotal. Finally, we apply your sales tax percentage to the subtotal to give you the exact final price you will pay at the register.
            </p>
          </div>
          <div className="pt-4 border-t border-border">
            <h2 className="text-xl font-bold text-text">Related Finance & Shopping Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/percentage-calculator" className="text-brand underline">Percentage Calculator</Link></li>
              <li><Link href="/tip-calculator" className="text-brand underline">Tip Calculator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
