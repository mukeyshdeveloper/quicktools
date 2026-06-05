import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/mockup-generator/meta';
import MockupGenerator from '@/tools/mockup-generator/MockupGenerator';
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

export default function MockupGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Image Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Simple Mockup Generator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <MockupGenerator />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Beautiful Device Mockups in Seconds</h2>
          <p>
            Whether you are showcasing a new mobile app, a web dashboard, or a marketing graphic, putting your work inside a realistic device frame makes it instantly more relatable and premium. This generator gives you clean, modern iPhone-style and laptop frames with a few clicks — no design software required.
          </p>

          <h2>Tips for Great Results</h2>
          <ul>
            <li>Use screenshots that are the same aspect ratio as the device screen for the cleanest fit.</li>
            <li>Dark device colors (black, midnight) usually look the most premium for app previews.</li>
            <li>Try the transparent background option when you want to composite the mockup over your own hero or slide.</li>
          </ul>

          <div className="pt-4 border-t border-border">
            <h2>Related Image Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/image-watermark" className="text-brand underline">Image Watermark Tool</Link></li>
              <li><Link href="/image-converter" className="text-brand underline">Image Format Converter</Link></li>
              <li><Link href="/bulk-image-resizer" className="text-brand underline">Bulk Image Resizer</Link></li>
              <li><Link href="/images-to-pdf" className="text-brand underline">Images to PDF Generator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
