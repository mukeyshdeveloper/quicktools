import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/favicon-generator/meta';
import FaviconGenerator from '@/tools/favicon-generator/FaviconGenerator';
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
    images: [{ url: meta.ogImage ?? '/og-default.png', width: 1200, height: 630 }],
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
            <h2 className="text-xl font-bold text-text">What is a Favicon?</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              A favicon (short for "favorite icon") is a small iconic image that represents your website. Favicons are most commonly found in the tabs of web browsers, next to the page's title, as well as in bookmark lists and browser history. They help users easily identify your website when they have multiple tabs open.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-text">How to Use This Tool</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Simply upload a square image (PNG, JPG, or WebP), and this tool will instantly convert it into a standard `.ico` file containing a 32x32 pixel icon perfectly optimized for modern web browsers. All conversion happens securely in your browser—your image is never uploaded to any server.
            </p>
          </div>
          <div className="pt-4 border-t border-border">
            <h2 className="text-xl font-bold text-text">Related Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/image-converter" className="text-brand underline">Image Format Converter</Link></li>
              <li><Link href="/svg-to-base64" className="text-brand underline">SVG to Base64 Converter</Link></li>
              <li><Link href="/base64-to-image" className="text-brand underline">Base64 to Image Decoder</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
