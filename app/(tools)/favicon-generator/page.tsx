import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/favicon-generator/meta';
import FaviconGenerator from '@/tools/favicon-generator/FaviconGenerator';
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

export default function FaviconGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Web Development</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Favicon / ICO Generator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />
        <FaviconGenerator />
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-text">Why a Complete Icon Set Matters</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              A single 32×32 favicon is no longer enough. Modern browsers, iOS home screens, Android install prompts, and PWA manifests expect specific sizes (16, 32, 48, 180, 192, 512). This generator produces the full professional kit from one square source image plus a ready-to-use manifest.json snippet — everything created locally with Canvas, zero uploads.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-text">Best Results</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li>Start with a 512×512 or 1024×1024 square PNG (transparency preferred for app icons).</li>
              <li>Leave a small margin around important content — the generator uses contain fitting.</li>
              <li>After download, add the PNGs to your static folder and reference them + the manifest in your HTML head.</li>
            </ul>
          </div>

          <FAQSection faqs={meta.faqs} />

          <div className="pt-4 border-t border-border">
            <h2 className="text-xl font-bold text-text">Related Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/image-converter" className="text-brand underline">Image to WebP/AVIF Converter</Link></li>
              <li><Link href="/meta-tag-generator" className="text-brand underline">Meta Tag Generator</Link></li>
              <li><Link href="/bulk-image-resizer" className="text-brand underline">Bulk Image Resizer</Link></li>
              <li><Link href="/images-to-pdf" className="text-brand underline">Images to PDF Generator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
