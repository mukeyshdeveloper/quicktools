import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/heart-rate-zones-calculator/meta';
import HeartRateZonesCalculator from '@/tools/heart-rate-zones-calculator/HeartRateZonesCalculator';
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

export default function HeartRateZonesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Health &amp; Fitness</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Heart Rate Zones Calculator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <HeartRateZonesCalculator />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Why Train in Specific Heart Rate Zones?</h2>
          <p>
            Different intensities produce different adaptations. Easy aerobic work (Zones 1–2) builds your engine and teaches your body to burn fat efficiently. Higher zones (4–5) improve your ability to sustain hard efforts and increase your VO2 max. Most recreational athletes spend too much time in the “grey zone” (Zone 3) and see slower progress.
          </p>

          <h2>Max HR vs Karvonen (Recommended)</h2>
          <p>
            The simple “220 minus age” formula is easy but can be off by more than 10 bpm for many people. The <strong>Karvonen (Heart Rate Reserve)</strong> method uses your actual resting heart rate and is considered significantly more accurate for setting training zones. If you have a decent heart rate monitor, take the time to measure your true resting HR for 4–5 mornings.
          </p>

          <h2>Practical Training Guidelines</h2>
          <ul>
            <li>Zone 1–2: The majority of your weekly volume. You should be able to speak in full sentences.</li>
            <li>Zone 3: “Tempo” or “steady state” — use for longer sustained efforts or brick sessions.</li>
            <li>Zone 4–5: Quality intervals. 3–8 minutes hard with full recovery. 1–2 sessions per week max for most people.</li>
          </ul>

          <FAQSection faqs={meta.faqs} />

          <div className="pt-4 border-t border-border mt-12">
            <h2>Related Health &amp; Fitness Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/vo2-max-estimator" className="text-brand underline">VO2 Max Estimator</Link></li>
              <li><Link href="/tdee-calculator" className="text-brand underline">TDEE &amp; Macro Calculator</Link></li>
              <li><Link href="/calorie-deficit-planner" className="text-brand underline">Calorie Deficit Planner</Link></li>
              <li><Link href="/sleep-cycle-calculator" className="text-brand underline">Sleep Cycle Calculator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
