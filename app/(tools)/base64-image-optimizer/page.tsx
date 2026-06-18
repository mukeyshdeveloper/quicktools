import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/base64-image-optimizer/meta';
import Base64ImageOptimizer from '@/tools/base64-image-optimizer/Base64ImageOptimizer';
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

export default function Base64ImageOptimizerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Developer Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Base64 Image Optimizer
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <Base64ImageOptimizer />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Why Optimize Base64 Images?</h2>
          <p>
            Base64 encoding turns binary images into huge text strings — often 30%+ larger than the original file. When you embed logos, icons, or small photos directly in CSS, HTML, or JSON payloads, the page weight balloons quickly. This tool lets you resize and re-encode before embedding so you ship the smallest possible string while keeping visual quality acceptable.
          </p>

          <h2>How to Use</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Drag & drop or upload an image, or paste a full <code>data:image/...</code> string.</li>
            <li>Adjust max dimensions, quality slider, and target format (JPEG is smallest for photos, WebP for modern support, PNG for transparency).</li>
            <li>Watch the live preview and exact byte savings.</li>
            <li>Copy the optimized base64 or download the image / .txt file for use in your code.</li>
          </ol>

          <h2>Best Practices & Scenarios</h2>
          <ul>
            <li>Use for favicons, social icons, and tiny hero images that must live inline.</li>
            <li>For larger photos, consider external files + srcset instead of base64.</li>
            <li>WebP usually wins on size vs quality for photographic content; test JPEG quality 75-85 first.</li>
            <li>Always compare before/after LCP impact when embedding critical images.</li>
          </ul>

          <FAQSection faqs={meta.faqs} />

          <div className="pt-4 border-t border-border">
            <h2>Related Developer Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/image-compressor" className="text-brand underline">Image Compressor</Link></li>
              <li><Link href="/image-converter" className="text-brand underline">Image Converter</Link></li>
              <li><Link href="/images-to-pdf" className="text-brand underline">Images to PDF Generator</Link></li>
              <li><Link href="/favicon-generator" className="text-brand underline">Favicon Generator</Link></li>
              <li><Link href="/svg-to-base64" className="text-brand underline">SVG to Base64</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
