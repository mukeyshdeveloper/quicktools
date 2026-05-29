import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/tdee-calculator/meta';
import TdeeCalculator from '@/tools/tdee-calculator/TdeeCalculator';
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

export default function TdeeCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Health & Fitness</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            TDEE & Macro Calculator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />
        <TdeeCalculator />
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-text">What is TDEE?</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Total Daily Energy Expenditure (TDEE) is an estimation of how many calories you burn per day when exercise is taken into account. It is calculated by first figuring out your Basal Metabolic Rate (BMR) — the calories you burn at rest — and then multiplying that value by an activity multiplier.
            </p>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Knowing your TDEE is the most important step in achieving your fitness goals. To lose weight, you should consume fewer calories than your TDEE (cutting). To gain muscle, you should consume more calories than your TDEE (bulking).
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-text">Macronutrient Splits</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Our calculator provides a balanced macronutrient split of 30% Protein, 35% Fats, and 35% Carbohydrates. This is widely considered an optimal starting point for body composition changes. Remember that 1 gram of protein = 4 calories, 1 gram of carbs = 4 calories, and 1 gram of fat = 9 calories.
            </p>
          </div>
          <div className="pt-4 border-t border-border">
            <h2 className="text-xl font-bold text-text">Related Health Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/bmi-calculator" className="text-brand underline">BMI Calculator</Link></li>
              <li><Link href="/sleep-cycle-calculator" className="text-brand underline">Sleep Cycle Calculator</Link></li>
              <li><Link href="/pregnancy-due-date-calculator" className="text-brand underline">Pregnancy Due Date Calculator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
