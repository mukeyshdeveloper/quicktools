import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/trip-planner/meta';
import TripPlanner from '@/tools/trip-planner/TripPlanner';
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

export default function TripPlannerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Travel &amp; Group Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Advanced Trip Planner
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <TripPlanner />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>One Tool for the Entire Trip Lifecycle</h2>
          <p>
            Most trip planners stop at pretty itineraries. Most expense apps ignore the itinerary. This tool brings both together so you can plan activities, estimate costs, log every real expense with custom participation rules, and instantly see who owes what — including optimal settlement suggestions that save everyone bank transfer fees and awkward conversations.
          </p>

          <h2>Scenarios We Actually Support</h2>
          <ul>
            <li>Solo travelers who want to track their own budget vs plan</li>
            <li>Couples with some shared and some individual spends</li>
            <li>Big friend groups where not everyone joins every activity (beach day vs club night)</li>
            <li>Multi-city / multi-country trips with different currencies noted</li>
            <li>Flights &amp; hotels paid by one person but split among all</li>
            <li>Food where some are vegetarian and some drink — custom splits per meal</li>
          </ul>

          <h2>Sharing Made Painless</h2>
          <p>
            Hit “Copy Magic Share Link” and send it to the group. Everyone sees the live plan, the full expense list, per-person breakdown, and the fewest number of payments needed to settle. Or copy the clean text summary for WhatsApp. Everything is client-side encoded — no accounts, no data leaves your devices permanently.
          </p>

          <div className="pt-4 border-t border-border">
            <h2>Related Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/bill-splitter" className="text-brand underline">Advanced Bill Splitter</Link> (standalone version for any group expense)</li>
              <li><Link href="/meeting-cost-calculator" className="text-brand underline">Meeting Cost Calculator</Link></li>
              <li><Link href="/decision-maker" className="text-brand underline">Decision Maker</Link> (for choosing activities or restaurants)</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
