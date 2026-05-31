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
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Why Convert to WebP?</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              WebP is a modern image format developed by Google that provides superior lossless and lossy compression for images on the web. WebP images are 25–34% smaller than comparable JPEG images at equivalent quality, and 26% smaller than PNGs. Google PageSpeed Insights actively recommends serving images in WebP format to improve Core Web Vitals scores.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">JPEG vs PNG vs WebP — When to Use Which</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li><strong>JPEG:</strong> Best for photographs and complex color scenes. Supports lossy compression but does not support transparency.</li>
              <li><strong>PNG:</strong> Best for logos, screenshots, and images requiring a transparent background. Lossless but produces larger files than JPEG or WebP.</li>
              <li><strong>WebP:</strong> The best of both worlds — supports both lossy and lossless compression, transparency (like PNG), and produces significantly smaller files than JPEG or PNG.</li>
            </ul>
          </div>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Related Image Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li><Link href="/image-compressor" className="text-brand underline hover:text-brand-hover">Image Compressor & Resizer</Link></li>
              <li><Link href="/color-palette-extractor" className="text-brand underline hover:text-brand-hover">Color Palette Extractor</Link></li>
              <li><Link href="/svg-to-base64" className="text-brand underline hover:text-brand-hover">SVG to Base64 Converter</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
