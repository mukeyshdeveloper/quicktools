import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/sleep-cycle-calculator/meta';
import SleepCycleCalculator from '@/tools/sleep-cycle-calculator/SleepCycleCalculator';
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

export default function SleepCycleCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Health & Wellness</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Sleep Cycle Calculator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />
        <SleepCycleCalculator />
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-text">The Science of Sleep Cycles</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Human sleep is not uniform. Throughout the night, your brain cycles through multiple stages of sleep: light sleep, deep sleep, and REM (Rapid Eye Movement) sleep. One complete sleep cycle takes an average of <strong>90 minutes</strong> to complete.
            </p>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              If your alarm wakes you up while you are in the middle of a deep sleep stage, you will experience "sleep inertia" — that groggy, exhausted feeling that can last for hours. Waking up at the end of a cycle, however, will make you feel refreshed and alert, even if you got slightly fewer total hours of sleep.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-text">How This Calculator Works</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Our sleep calculator works in 90-minute blocks and automatically factors in 15 minutes as the average time it takes a person to fall asleep. By setting your alarm for the times suggested, you ensure that you wake up precisely between sleep cycles.
            </p>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><strong>6 Cycles (9 hours):</strong> Ideal for athletes or those recovering from illness.</li>
              <li><strong>5 Cycles (7.5 hours):</strong> The recommended optimal amount for most adults.</li>
              <li><strong>4 Cycles (6 hours):</strong> The minimum threshold for a functional day.</li>
            </ul>
          </div>
          <div className="pt-4 border-t border-border">
            <h2 className="text-xl font-bold text-text">Related Health Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/tdee-calculator" className="text-brand underline">TDEE & Macro Calculator</Link></li>
              <li><Link href="/pregnancy-due-date-calculator" className="text-brand underline">Pregnancy Due Date Calculator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
