import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/ideal-body-weight-calculator/meta';
import IdealBodyWeightCalculator from '@/tools/ideal-body-weight-calculator/IdealBodyWeightCalculator';
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

export default function IdealBodyWeightPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Health &amp; Fitness</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Ideal Body Weight Calculator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <IdealBodyWeightCalculator />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>What Is Ideal Body Weight?</h2>
          <p>
            Ideal Body Weight (IBW) is a height-based calculation that estimates the weight statistically associated with the lowest risk of mortality in large studies. It was originally developed for medical and pharmaceutical use (e.g., drug dosing) rather than as a personal aesthetic target.
          </p>

          <h2>The Three Formulas We Use</h2>
          <ul>
            <li><strong>Devine (1974)</strong> — The most commonly referenced formula in modern medicine.</li>
            <li><strong>Robinson (1983)</strong> — A revision that gives slightly lower values for shorter adults.</li>
            <li><strong>Miller (1983)</strong> — Another revision that often yields higher numbers for taller people.</li>
          </ul>

          <h2>How to Use These Numbers</h2>
          <p>
            Treat the three results as a range. If you are very muscular, your healthy weight will naturally be higher than IBW. If you have a small frame, it may be lower. The real value of IBW is as a neutral reference point when discussing health with a professional or when estimating starting medication doses.
          </p>

          <p>
            Never use IBW in isolation. Combine it with body composition (body fat %, waist circumference), energy levels, strength, blood markers, and how your clothes fit.
          </p>

          <FAQSection faqs={meta.faqs} />

          <div className="pt-4 border-t border-border mt-12">
            <h2>Related Health &amp; Fitness Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/body-fat-percentage-calculator" className="text-brand underline">Body Fat Percentage Calculator</Link></li>
              <li><Link href="/bmi-calculator" className="text-brand underline">BMI Calculator</Link></li>
              <li><Link href="/tdee-calculator" className="text-brand underline">TDEE &amp; Macro Calculator</Link></li>
              <li><Link href="/calorie-deficit-planner" className="text-brand underline">Calorie Deficit Planner</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
