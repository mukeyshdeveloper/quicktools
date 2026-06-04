import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/image-watermark/meta';
import ImageWatermark from '@/tools/image-watermark/ImageWatermark';
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

export default function ImageWatermarkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Image Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Image Watermark Tool
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <ImageWatermark />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Protect and Brand Your Images Privately</h2>
          <p>
            Watermarking is essential for photographers, designers, stock contributors, and anyone sharing work online. This tool lets you layer text (with rotation and nice typography) and logo marks with full control over placement and transparency. Because everything happens in the browser, you keep full ownership and quality of your originals.
          </p>

          <h2>Workflow Tips</h2>
          <ul>
            <li>Start with a subtle text mark at 50-70% opacity in a corner or diagonal.</li>
            <li>Use a small logo (with transparent background) for additional branding.</li>
            <li>For batch social posts, upload 10–30 images and apply once — staggered downloads will trigger cleanly.</li>
            <li>Combine with the Bulk Resizer or Converter for a complete pipeline before publishing.</li>
          </ul>

          <div className="pt-4 border-t border-border">
            <h2>Related Image Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/mockup-generator" className="text-brand underline">Mockup Generator</Link></li>
              <li><Link href="/bulk-image-resizer" className="text-brand underline">Bulk Image Resizer</Link></li>
              <li><Link href="/image-compressor" className="text-brand underline">Image Compressor</Link></li>
              <li><Link href="/color-palette-extractor" className="text-brand underline">Color Palette Extractor</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
