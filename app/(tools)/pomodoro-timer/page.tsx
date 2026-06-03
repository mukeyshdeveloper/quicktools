import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/pomodoro-timer/meta';
import PomodoroTimer from '@/tools/pomodoro-timer/PomodoroTimer';
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

export default function PomodoroTimerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Productivity</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Pomodoro Timer
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <PomodoroTimer />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>How the Pomodoro Technique Works</h2>
          <p>
            Choose a task. Set a timer for 25 minutes and work with full focus until it rings. Then take a 5-minute break. Every four “Pomodoros” you earn a longer 15-minute break. The method is simple but incredibly effective at training sustained attention and protecting you from mental fatigue.
          </p>

          <h2>Why Session Tracking + Tasks Matters</h2>
          <p>
            Most timers just count down. Ours lets you optionally associate every Pomodoro with a specific task. You get global stats (streaks, weekly totals) plus a beautiful per-task breakdown showing exactly how much deep work you put into each project. Add tasks in one click, then hit “Focus on this” — the timer automatically tags the session.
          </p>

          <h2>Tips for Maximum Focus</h2>
          <ul>
            <li>One task per Pomodoro — no multitasking.</li>
            <li>During the break stand up, stretch, look away from screens.</li>
            <li>If you get interrupted, note it and resume the same Pomodoro if possible.</li>
            <li>Adjust the lengths (50/10 is popular for some deep work).</li>
            <li>Use the stats at the end of the week to understand your real productive capacity.</li>
          </ul>

          <div className="pt-4 border-t border-border">
            <h2>Related Productivity Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/decision-maker" className="text-brand underline">Decision Maker</Link></li>
              <li><Link href="/habit-tracker" className="text-brand underline">Habit Tracker</Link></li>
              <li><Link href="/meeting-cost-calculator" className="text-brand underline">Meeting Cost Calculator</Link></li>
              <li><Link href="/daily-water-intake-calculator" className="text-brand underline">Daily Water Intake Calculator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
