import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/image-converter/meta';
import ImageConverter from '@/tools/image-converter/ImageConverter';
import AdBanner from '@/components/layout/AdBanner';
import { generateToolSchema } from '@/lib/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.thequickutils.com';

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: meta.canonical },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${siteUrl}${meta.canonical}`,
    images: [{ url: meta.ogImage ?? '/og-default.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
};

export default function ImageConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Image Utility</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Image Format Converter
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />
        <ImageConverter />
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Why WebP &amp; AVIF Matter</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              WebP and AVIF deliver dramatically smaller file sizes than JPEG and PNG at the same (or better) visual quality. This tool now supports bulk conversion + on-the-fly resizing so you can modernize an entire library of assets in minutes — everything processed privately in your browser.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recommended Workflow</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>Run images through Bulk Image Resizer first if you need consistent dimensions.</li>
              <li>Use this converter with WebP at ~85–90% quality for most photos.</li>
              <li>Try AVIF for hero images and product shots where every kilobyte counts (with JPEG fallback for older browsers).</li>
              <li>Combine with the Watermark and Mockup tools for a complete client-side creative pipeline.</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Related Image Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li><Link href="/bulk-image-resizer" className="text-brand underline">Bulk Image Resizer</Link></li>
              <li><Link href="/image-compressor" className="text-brand underline">Image Compressor</Link></li>
              <li><Link href="/image-watermark" className="text-brand underline">Image Watermark Tool</Link></li>
              <li><Link href="/images-to-pdf" className="text-brand underline">Images to PDF Generator</Link></li>
              <li><Link href="/mockup-generator" className="text-brand underline">Mockup Generator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
