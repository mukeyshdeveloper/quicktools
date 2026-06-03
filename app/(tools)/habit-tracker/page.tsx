import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/habit-tracker/meta';
import HabitTracker from '@/tools/habit-tracker/HabitTracker';
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

export default function HabitTrackerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Productivity</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Habit Tracker
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <HabitTracker />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Why Simple Streaks Work Better</h2>
          <p>
            The secret to building lasting habits isn’t complicated apps or perfect data — it’s seeing that you showed up yesterday and the day before. A visible streak creates gentle pressure to keep the chain alive. This tracker gives you exactly that without noise.
          </p>

          <h2>How to Use It Effectively</h2>
          <ul>
            <li>Start with 1–3 habits max. Too many and you’ll quit everything.</li>
            <li>Make habits tiny at first (“Read 1 page”, “Drink one glass of water”).</li>
            <li>Mark the day even if it’s late — the goal is consistency, not perfection.</li>
            <li>Use the 14-day grid to spot patterns (weekends often break streaks).</li>
            <li>Don’t break the chain two days in a row.</li>
          </ul>

          <h2>Privacy First</h2>
          <p>
            Your habits are personal. That’s why everything lives only in your browser. There’s no login, no cloud sync, and no one else can ever see what you’re working on. When you want a fresh start, just clear your browser data for this site.
          </p>

          <div className="pt-4 border-t border-border">
            <h2>Related Productivity Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/pomodoro-timer" className="text-brand underline">Pomodoro Timer</Link></li>
              <li><Link href="/decision-maker" className="text-brand underline">Decision Maker</Link></li>
              <li><Link href="/meeting-cost-calculator" className="text-brand underline">Meeting Cost Calculator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
