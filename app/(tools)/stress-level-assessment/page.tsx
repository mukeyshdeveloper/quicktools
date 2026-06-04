import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/stress-level-assessment/meta';
import StressLevelAssessment from '@/tools/stress-level-assessment/StressLevelAssessment';
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

export default function StressLevelAssessmentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Health Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Stress Level Assessment
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <StressLevelAssessment />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Understanding Your Stress</h2>
          <p>
            Stress is a natural response, but chronic high levels can impact sleep, immunity, relationships, and long-term health. This short assessment is based on the widely used Perceived Stress Scale and helps you quantify how stressed you feel and what steps may help.
          </p>

          <h2>After Taking the Assessment</h2>
          <ul>
            <li>Low stress: Great! Keep protective habits like exercise and social time.</li>
            <li>Moderate: Small daily practices (breathing, boundaries) make a big difference.</li>
            <li>High: Consider professional support in addition to lifestyle changes.</li>
          </ul>

          <div className="pt-4 border-t border-border">
            <h2>Related Health Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/sleep-debt-calculator" className="text-brand underline">Sleep Debt Calculator</Link></li>
              <li><Link href="/daily-water-intake-calculator" className="text-brand underline">Daily Water Intake Calculator</Link></li>
              <li><Link href="/health-metrics-dashboard" className="text-brand underline">Health Metrics Dashboard</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
