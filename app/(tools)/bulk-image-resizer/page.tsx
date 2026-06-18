import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/bulk-image-resizer/meta';
import BulkImageResizer from '@/tools/bulk-image-resizer/BulkImageResizer';
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

export default function BulkImageResizerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Image Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Bulk Image Resizer
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <BulkImageResizer />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Why Bulk Resize Locally?</h2>
          <p>
            Whether you are preparing product photos for an e-commerce site, social media assets, or email newsletters, having consistent image dimensions is essential for fast loading and professional presentation. Uploading dozens of photos to random online resizers risks privacy and quality. This tool lets you batch process everything in one go, right in your browser.
          </p>

          <h2>How to Use</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Drop or select multiple images (up to a couple hundred, depending on size).</li>
            <li>Pick your resize strategy: Max size (great for web), Exact pixels, or Percentage.</li>
            <li>Choose fit behavior and whether to also convert the format.</li>
            <li>Hit Resize All. Review the before/after sizes and download what you need.</li>
          </ol>

          <h2>Best Practices</h2>
          <ul>
            <li>Use “Max width/height” + contain for most web use cases — it never upscales and keeps proportions.</li>
            <li>For thumbnails or hero images with strict containers, “Exact + cover” gives you pixel-perfect crops.</li>
            <li>WebP usually gives the best size/quality balance for photographic content.</li>
          </ul>

          <FAQSection faqs={meta.faqs} />

          <div className="pt-8 mt-12 border-t border-border">
            <h2>Related Image Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/image-compressor" className="text-brand underline">Image Compressor</Link></li>
              <li><Link href="/image-converter" className="text-brand underline">Image Format Converter</Link></li>
              <li><Link href="/image-watermark" className="text-brand underline">Image Watermark Tool</Link></li>
              <li><Link href="/images-to-pdf" className="text-brand underline">Images to PDF Generator</Link></li>
              <li><Link href="/base64-image-optimizer" className="text-brand underline">Base64 Image Optimizer</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
