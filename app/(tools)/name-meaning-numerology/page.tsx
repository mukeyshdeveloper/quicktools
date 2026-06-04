import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/name-meaning-numerology/meta';
import NameNumerology from '@/tools/name-meaning-numerology/NameNumerology';
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

export default function NameMeaningNumerologyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Lifestyle &amp; Fun Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Name Meaning &amp; Numerology
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <NameNumerology />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Exploring Your Name and Numbers</h2>
          <p>
            Names carry cultural stories and personal vibrations. Numerology, an ancient practice, assigns numbers to letters to reveal patterns in your name and birth date. This tool blends traditional name meanings with Pythagorean numerology calculations to offer reflective insights.
          </p>

          <h2>How It Works</h2>
          <ul>
            <li>Enter your full name for Destiny, Soul Urge, and Personality numbers.</li>
            <li>Add your birth date to unlock Life Path and Maturity numbers.</li>
            <li>Read the combined insights that connect your name’s heritage with your numerology profile.</li>
          </ul>

          <h2>Important Note</h2>
          <p>
            Numerology is for entertainment and self-reflection only. It is not a substitute for professional advice. Use the results as a fun lens for personal growth.
          </p>

          <div className="pt-4 border-t border-border">
            <h2>Related Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/business-name-generator" className="text-brand underline">Business Name Suggester</Link></li>
              <li><Link href="/decision-maker" className="text-brand underline">Decision Maker</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
