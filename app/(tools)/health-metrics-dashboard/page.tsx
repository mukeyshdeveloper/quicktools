import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/health-metrics-dashboard/meta';
import HealthMetricsDashboard from '@/tools/health-metrics-dashboard/HealthMetricsDashboard';
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

export default function HealthMetricsDashboardPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Health Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Health Metrics Dashboard
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <HealthMetricsDashboard />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>One Dashboard, Complete Picture</h2>
          <p>
            BMI, body fat, and ideal weight each tell part of the story. This combined tool lets you input your measurements once and instantly see all three calculations side by side using the most trusted formulas (Navy for body fat, Devine/Robinson/Miller for ideal weight).
          </p>

          <h2>Best Practices</h2>
          <ul>
            <li>Measure waist at navel level, neck below larynx for Navy method accuracy.</li>
            <li>Use the same time of day and conditions for consistent tracking.</li>
            <li>These are estimates — DEXA or professional assessment is more accurate for serious goals.</li>
          </ul>

          <div className="pt-4 border-t border-border">
            <h2>Related Health Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/daily-water-intake-calculator" className="text-brand underline">Daily Water Intake Calculator</Link></li>
              <li><Link href="/heart-rate-zones-calculator" className="text-brand underline">Heart Rate Zones Calculator</Link></li>
              <li><Link href="/sleep-debt-calculator" className="text-brand underline">Sleep Debt Calculator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
