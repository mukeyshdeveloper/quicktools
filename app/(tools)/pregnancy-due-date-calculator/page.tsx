import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/pregnancy-due-date-calculator/meta';
import PregnancyCalculator from '@/tools/pregnancy-due-date-calculator/PregnancyCalculator';
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

export default function PregnancyCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Health & Family</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Pregnancy Due Date Calculator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />
        <PregnancyCalculator />
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-text">How is the Due Date Calculated?</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              By default, healthcare providers use <strong>Naegele's rule</strong> to calculate your estimated due date (EDD). This method involves adding 280 days (40 weeks) to the first day of your last menstrual period (LMP). Our calculator also allows you to adjust the calculation if your average cycle length is shorter or longer than the standard 28 days.
            </p>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              If you know the exact date of conception (for example, through IVF), you can select the "Conception Date" method. This adds exactly 266 days (38 weeks) to your conception date to find your EDD.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-text">How Accurate Is the Due Date?</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              An estimated due date (EDD) is just that — an estimate. Only about 4–5% of babies are born on their exact due date. Most pregnancies last between 37 and 42 weeks, and any birth in that window is considered full-term.
            </p>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Your healthcare provider may adjust the due date after the first ultrasound if the measurements differ significantly from the LMP-based calculation.
            </p>
          </div>
          <div className="pt-4 border-t border-border">
            <h2 className="text-xl font-bold text-text">Related Health Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/pregnancy-week-tracker" className="text-brand underline">Pregnancy Week-by-Week Tracker</Link></li>
              <li><Link href="/date-difference-calculator" className="text-brand underline">Date Difference Calculator</Link></li>
              <li><Link href="/bmi-calculator" className="text-brand underline">BMI Calculator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
