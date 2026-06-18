import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/sleep-debt-calculator/meta';
import SleepDebtCalculator from '@/tools/sleep-debt-calculator/SleepDebtCalculator';
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

export default function SleepDebtCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Health Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Sleep Debt Calculator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <SleepDebtCalculator />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>The Hidden Cost of Lost Sleep</h2>
          <p>
            Most people carry some sleep debt without realizing it. Even a few hours per week adds up and affects mood, concentration, immune function, and long-term health. This calculator makes the invisible visible and gives you a clear path back to feeling rested.
          </p>

          <h2>How to Use</h2>
          <ol>
            <li>Adjust the sliders to match how many hours you actually slept each of the last 7 nights.</li>
            <li>See your total debt and average nightly sleep.</li>
            <li>Follow the personalized recovery suggestion.</li>
          </ol>

          <FAQSection faqs={meta.faqs} />

          <div className="pt-4 border-t border-border">
            <h2>Related Health Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/daily-water-intake-calculator" className="text-brand underline">Daily Water Intake Calculator</Link></li>
              <li><Link href="/pregnancy-week-tracker" className="text-brand underline">Pregnancy Week-by-Week Tracker</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
