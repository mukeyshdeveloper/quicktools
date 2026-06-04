import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/indian-numbering-converter/meta';
import IndianNumberingConverter from '@/tools/indian-numbering-converter/IndianNumberingConverter';
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

export default function IndianNumberingConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Utility Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Indian Numbering System Converter
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <IndianNumberingConverter />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Why Two Numbering Systems?</h2>
          <p>
            In India, large numbers are grouped differently than in most Western countries. Instead of thousands, millions, and billions, we use thousands, lakhs, and crores. This tool helps professionals, students, and businesses quickly translate between the two systems without mental math errors.
          </p>

          <h2>Common Conversions</h2>
          <ul>
            <li>1 Lakh = 100 Thousand</li>
            <li>1 Crore = 10 Million</li>
            <li>1 Arab = 1 Billion</li>
          </ul>

          <div className="pt-4 border-t border-border">
            <h2>Related Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/unit-converter" className="text-brand underline">Unit Converter</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
