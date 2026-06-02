import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/body-fat-percentage-calculator/meta';
import BodyFatCalculator from '@/tools/body-fat-percentage-calculator/BodyFatCalculator';
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

export default function BodyFatCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Health &amp; Fitness</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Body Fat Percentage Calculator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <BodyFatCalculator />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>What is Body Fat Percentage?</h2>
          <p>
            Body fat percentage tells you how much of your total body weight is fat compared to lean mass (muscles, bones, water, organs). It is a far more useful metric than weight or BMI alone because two people can weigh the same but have very different body compositions.
          </p>

          <h2>Why Use Navy or YMCA Methods?</h2>
          <p>
            These two methods use only a tape measure (and a scale for YMCA). The <strong>US Navy method</strong> is one of the most validated field techniques and requires neck, waist, and for women also hip measurements. The <strong>YMCA method</strong> is simpler and only needs waist and weight. Both are excellent for tracking change over weeks and months when performed consistently.
          </p>

          <h2>How to Get the Most Accurate Results</h2>
          <ul>
            <li>Measure at the same time of day (morning is best, before eating).</li>
            <li>Use a flexible, non-stretch tape and keep it level.</li>
            <li>Relax your abdomen — do not suck in or push out.</li>
            <li>Take each measurement 2–3 times and use the average.</li>
            <li>Track weekly rather than daily — small daily fluctuations are normal.</li>
          </ul>

          <h2>Body Fat Categories (General Guidelines)</h2>
          <p>
            Essential fat is the minimum needed for basic health. Athletes usually sit in the lower ranges. “Average” varies by age and population. Women naturally carry more essential fat than men. These ranges are guidelines — individual health matters more than a single number.
          </p>

          <div className="pt-4 border-t border-border">
            <h2>Related Health &amp; Fitness Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/bmi-calculator" className="text-brand underline">BMI Calculator</Link></li>
              <li><Link href="/ideal-body-weight-calculator" className="text-brand underline">Ideal Body Weight Calculator</Link></li>
              <li><Link href="/tdee-calculator" className="text-brand underline">TDEE &amp; Macro Calculator</Link></li>
              <li><Link href="/calorie-deficit-planner" className="text-brand underline">Calorie Deficit Planner</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
