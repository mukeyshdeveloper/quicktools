import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/pregnancy-week-tracker/meta';
import PregnancyWeekTracker from '@/tools/pregnancy-week-tracker/PregnancyWeekTracker';
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

export default function PregnancyWeekTrackerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Health Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Pregnancy Week-by-Week Tracker
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <PregnancyWeekTracker />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Your Personal Pregnancy Journey</h2>
          <p>
            Pregnancy changes week by week — from the first flutter of movement to the final countdown. This tracker uses your due date to show exactly what is happening with your baby and body right now, along with practical tips.
          </p>

          <h2>Features</h2>
          <ul>
            <li>Current week and trimester automatically calculated from your due date.</li>
            <li>Baby size comparison and key developmental milestones.</li>
            <li>Common symptoms you may experience and evidence-based tips.</li>
            <li>Links back to the Due Date Calculator if you need to adjust dates.</li>
          </ul>

          <FAQSection faqs={meta.faqs} />

          <div className="pt-4 border-t border-border">
            <h2>Related Health Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/pregnancy-due-date-calculator" className="text-brand underline">Pregnancy Due Date Calculator</Link></li>
              <li><Link href="/daily-water-intake-calculator" className="text-brand underline">Daily Water Intake Calculator</Link></li>
              <li><Link href="/sleep-debt-calculator" className="text-brand underline">Sleep Debt Calculator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
