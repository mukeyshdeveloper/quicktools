import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/image-compressor/meta';
import ImageCompressor from '@/tools/image-compressor/ImageCompressor';
import AdBanner from '@/components/layout/AdBanner';
import { generateToolSchema } from '@/lib/schema';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quickutils.in';

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: meta.canonical },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${siteUrl}${meta.canonical}`,
    images: [{ url: meta.ogImage ?? '/og-default.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
};

export default function ImageCompressorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Image Utility</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Image Compressor & Resizer
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />
        <ImageCompressor />
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Compress Images Without Quality Loss</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Large image files slow down websites and increase bandwidth costs. Our browser-based image compressor lets you reduce JPG, PNG, and WebP files by up to 90% without uploading a single byte to any external server. Everything is processed entirely using the HTML5 Canvas API in your own browser tab — your images never leave your device.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">How Does Browser-Side Compression Work?</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              When you upload an image, it is decoded into a pixel array and re-drawn onto an invisible HTML5 Canvas element at your chosen maximum dimensions. The canvas is then re-encoded at your specified quality level (a number between 10% and 100%). Lower quality values discard more image data, producing smaller files. WebP and JPEG both support this lossy quality slider, while PNG uses lossless encoding.
            </p>
          </div>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Related Image Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li><Link href="/image-converter" className="text-brand underline hover:text-brand-hover">Image Format Converter (JPG/PNG to WebP)</Link></li>
              <li><Link href="/color-palette-extractor" className="text-brand underline hover:text-brand-hover">Color Palette Extractor</Link></li>
              <li><Link href="/svg-to-base64" className="text-brand underline hover:text-brand-hover">SVG to Base64 Converter</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
