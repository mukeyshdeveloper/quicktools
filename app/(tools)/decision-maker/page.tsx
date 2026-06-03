import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/decision-maker/meta';
import DecisionMaker from '@/tools/decision-maker/DecisionMaker';
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

export default function DecisionMakerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Productivity</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Decision Maker
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <DecisionMaker />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>When You Can’t Decide, Let Math Do It</h2>
          <p>
            Overthinking small decisions wastes enormous amounts of time and energy. This tool gives you an instant, fair answer — either completely random or intelligently weighted by the importance you assign. The result is often surprisingly good because it removes your own bias.
          </p>

          <h2>Random vs Weighted — When to Use Each</h2>
          <ul>
            <li><strong>Random:</strong> Fair raffles, choosing lunch, picking which task to do first, team names.</li>
            <li><strong>Weighted:</strong> Choosing between job offers (weight salary, culture, growth), picking which feature to build (weight impact + effort), family vacation spot.</li>
          </ul>

          <h2>Pro Tips</h2>
          <p>
            The history log at the bottom is useful when you need to show others the decision was made transparently. For very important choices, try running the picker 3 times and see if the same option keeps winning — that’s usually a sign.
          </p>

          <div className="pt-4 border-t border-border">
            <h2>Related Productivity Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/pomodoro-timer" className="text-brand underline">Pomodoro Timer</Link></li>
              <li><Link href="/habit-tracker" className="text-brand underline">Habit Tracker</Link></li>
              <li><Link href="/meeting-cost-calculator" className="text-brand underline">Meeting Cost Calculator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
