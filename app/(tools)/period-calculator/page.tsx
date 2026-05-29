import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/period-calculator/meta';
import PeriodCalculator from '@/tools/period-calculator/PeriodCalculator';
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

export default function PeriodCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Health & Wellness</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Menstruation & Ovulation Tracker
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />
        <PeriodCalculator />
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-text">How We Predict Your Cycle</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              This calculator uses standard medical formulas to estimate your future menstrual cycles. Your next period is calculated by adding your average cycle length to the start date of your last period. 
            </p>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Ovulation typically occurs about 14 days <em>before</em> the start of your next period. Your "fertile window" is the 5 days leading up to ovulation, plus the day of ovulation itself. This is the time during your cycle when pregnancy is most likely to occur.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-text">Privacy First</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Health data is incredibly sensitive. Unlike many period tracking apps that upload your cycle data to the cloud, this calculator runs <strong>100% locally in your browser</strong>. We do not store, track, or harvest any information about your menstrual cycle.
            </p>
          </div>
          <div className="pt-4 border-t border-border">
            <h2 className="text-xl font-bold text-text">Related Health Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/pregnancy-due-date-calculator" className="text-brand underline">Pregnancy Due Date Calculator</Link></li>
              <li><Link href="/tdee-calculator" className="text-brand underline">TDEE & Macro Calculator</Link></li>
              <li><Link href="/sleep-cycle-calculator" className="text-brand underline">Sleep Cycle Calculator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
