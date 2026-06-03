import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/meeting-cost-calculator/meta';
import MeetingCostCalculator from '@/tools/meeting-cost-calculator/MeetingCostCalculator';
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

export default function MeetingCostCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Business &amp; Productivity</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Meeting Cost Calculator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <MeetingCostCalculator />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Meetings Are Expensive — Treat Them That Way</h2>
          <p>
            A one-hour meeting with five people earning an average of ₹900/hour already costs over ₹4,500 in direct salary time before you add context switching, preparation, and the fact that those people aren’t shipping work during that hour. This calculator makes the invisible cost visible so you can run fewer, better meetings.
          </p>

          <h2>How to Use the Numbers</h2>
          <ul>
            <li>Use “fully loaded” hourly rates (salary ÷ ~1,800 hours + benefits/taxes ≈ 1.3–1.6×).</li>
            <li>1.3× overhead is a conservative starting point. Many teams use 2× because deep work is so valuable.</li>
            <li>Look at the annual projection. If a recurring meeting costs ₹8–10 lakhs a year, ask: “Is there a cheaper way to achieve the same outcome?”</li>
          </ul>

          <h2>Related Business Tools</h2>
          <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
            <li><Link href="/pomodoro-timer" className="text-brand underline">Pomodoro Timer</Link></li>
            <li><Link href="/habit-tracker" className="text-brand underline">Habit Tracker</Link></li>
            <li><Link href="/decision-maker" className="text-brand underline">Decision Maker</Link></li>
          </ul>
        </section>
      </main>
    </>
  );
}
