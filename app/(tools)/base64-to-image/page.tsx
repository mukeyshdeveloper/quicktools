import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/base64-to-image/meta';
import Base64ToImage from '@/tools/base64-to-image/Base64ToImage';
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

export default function Base64ToImagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Web Development</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Base64 to Image Decoder
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />
        <Base64ToImage />
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-text">Decoding Base64 Images</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Base64 encoding is frequently used by developers to embed image data directly into HTML, CSS, or JSON payloads, reducing the number of HTTP requests required to load a page. This tool allows you to paste a raw Base64 string and instantly visualize the hidden image, making debugging much easier.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-text">Format Compatibility</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              This decoder automatically handles strings whether they include the Data URI scheme prefix (e.g., <code>data:image/png;base64,</code>) or if they are just the raw, raw Base64-encoded bytes. If the prefix is missing, it will attempt to decode it as a standard PNG.
            </p>
          </div>

          <FAQSection faqs={meta.faqs} />

          <div className="pt-4 border-t border-border">
            <h2 className="text-xl font-bold text-text">Related Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/base64-encoder-decoder" className="text-brand underline">Base64 String Encoder/Decoder</Link></li>
              <li><Link href="/svg-to-base64" className="text-brand underline">SVG to Base64</Link></li>
              <li><Link href="/favicon-generator" className="text-brand underline">Favicon Generator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
