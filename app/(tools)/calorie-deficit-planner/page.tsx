import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/calorie-deficit-planner/meta';
import CalorieDeficitPlanner from '@/tools/calorie-deficit-planner/CalorieDeficitPlanner';
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

export default function CalorieDeficitPlannerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Health &amp; Fitness</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Calorie Deficit Planner
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <CalorieDeficitPlanner />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>How a Calorie Deficit Actually Works</h2>
          <p>
            One kilogram of body fat contains roughly 7,700 calories. To lose fat you must create a consistent deficit between the energy you consume and the energy you expend. The planner converts your desired weekly rate into a precise daily calorie target and shows you a realistic calendar projection.
          </p>

          <h2>Why We Emphasize Sustainable Rates</h2>
          <p>
            Very large deficits lead to greater muscle loss, metabolic slowdown, extreme hunger, and almost certain weight regain. Research and clinical experience show that 0.5–0.75 kg per week (1–1.5 lb) is the sweet spot for most people who want to keep the weight off long term while protecting performance and hormones.
          </p>

          <h2>Best Practices While in a Deficit</h2>
          <ul>
            <li>Eat 1.6–2.4 g of protein per kg of goal body weight.</li>
            <li>Lift weights 3+ times per week to signal your body to keep muscle.</li>
            <li>Keep most of your cardio in lower heart rate zones.</li>
            <li>Reassess every 3–4 weeks. As you get lighter your maintenance calories drop.</li>
            <li>Plan diet breaks or maintenance phases every 8–12 weeks if the deficit is long.</li>
          </ul>

          <div className="pt-4 border-t border-border">
            <h2>Related Health &amp; Fitness Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/tdee-calculator" className="text-brand underline">TDEE &amp; Macro Calculator</Link> — get your maintenance number</li>
              <li><Link href="/body-fat-percentage-calculator" className="text-brand underline">Body Fat Percentage Calculator</Link></li>
              <li><Link href="/heart-rate-zones-calculator" className="text-brand underline">Heart Rate Zones Calculator</Link></li>
              <li><Link href="/ideal-body-weight-calculator" className="text-brand underline">Ideal Body Weight Calculator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
