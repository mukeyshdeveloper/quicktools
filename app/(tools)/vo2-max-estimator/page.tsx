import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/vo2-max-estimator/meta';
import Vo2MaxEstimator from '@/tools/vo2-max-estimator/Vo2MaxEstimator';
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

export default function Vo2MaxEstimatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Health &amp; Fitness</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            VO2 Max Estimator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <Vo2MaxEstimator />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>What Is VO2 Max and Why Does It Matter?</h2>
          <p>
            VO2 max is the gold-standard measure of your body’s ability to transport and utilize oxygen during maximal exercise. Higher values are strongly correlated with lower all-cause mortality, better metabolic health, and greater athletic potential. It is one of the few fitness metrics that genuinely improves both performance and lifespan.
          </p>

          <h2>The Rockport Walk Test (Best Field Option)</h2>
          <p>
            Walk one mile (1.6 km) on flat ground as fast as you safely can. Record the exact time and your heart rate right at the finish. The formula has been validated against laboratory gas analysis in many studies. It requires no special equipment beyond a measured course and a way to measure heart rate.
          </p>

          <h2>Improving Your VO2 Max</h2>
          <ul>
            <li>High-intensity intervals (Zone 5 work) 1–2× per week are the fastest way to raise it.</li>
            <li>Consistent Zone 2 volume builds the aerobic base that supports higher intensities.</li>
            <li>Strength training and losing excess body fat also move the needle.</li>
            <li>Expect 10–20% improvement in 3–6 months with smart training if you are currently untrained.</li>
          </ul>

          <div className="pt-4 border-t border-border">
            <h2>Related Health &amp; Fitness Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/heart-rate-zones-calculator" className="text-brand underline">Heart Rate Zones Calculator</Link></li>
              <li><Link href="/tdee-calculator" className="text-brand underline">TDEE &amp; Macro Calculator</Link></li>
              <li><Link href="/calorie-deficit-planner" className="text-brand underline">Calorie Deficit Planner</Link></li>
              <li><Link href="/body-fat-percentage-calculator" className="text-brand underline">Body Fat Percentage Calculator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
