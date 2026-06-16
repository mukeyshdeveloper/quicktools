import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/color-contrast-checker/meta';
import ColorContrastChecker from '@/tools/color-contrast-checker/ColorContrastChecker';
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

export default function ColorContrastCheckerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Developer &amp; Design Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Color Contrast Checker
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <ColorContrastChecker />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Why Color Contrast Matters</h2>
          <p>
            Over 8% of men and 0.5% of women have some form of color vision deficiency. Low contrast text makes content unreadable for millions of people and fails legal accessibility requirements in many countries. This checker gives you the exact numbers you need to pass audits and create truly inclusive interfaces.
          </p>

          <h2>How to Use the Results</h2>
          <ul>
            <li>Normal body text should aim for at least AA (4.5:1).</li>
            <li>Headings and large text have more lenient requirements.</li>
            <li>UI elements (borders, icons, form controls) need 3:1 minimum for AA.</li>
            <li>Use the suggestion button when a pair is close but not quite there.</li>
          </ul>

          <FAQSection faqs={meta.faqs} />

          <div className="pt-8 mt-12 border-t border-border">
            <h2>Related Developer Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/hash-generator" className="text-brand underline">Hash Generator</Link></li>
              <li><Link href="/jwt-encoder" className="text-brand underline">JWT Encoder</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
