import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/color-palette-extractor/meta';
import ColorPaletteExtractor from '@/tools/color-palette-extractor/ColorPaletteExtractor';
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

export default function ColorPaletteExtractorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Design Utility</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Color Palette Extractor
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />
        <ColorPaletteExtractor />
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Extract Hex Colors from Any Image</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Whether you are designing a brand identity, building a website theme, or recreating a color scheme from a photo, knowing the exact hex codes of an image is essential. Our Color Palette Extractor analyzes every pixel of your uploaded image and surfaces the most dominant, visually distinct colors as copyable hex codes.
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              The algorithm uses a fast quantization technique to cluster similar colors together, then applies a minimum distance filter to ensure the palette only contains truly distinct hues — not dozens of nearly-identical shades.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Use Cases for Designers & Developers</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li><strong>Brand Identity:</strong> Extract colors from a logo or product photo to create a consistent brand style guide.</li>
              <li><strong>UI/UX Design:</strong> Match a website or app theme to colors found in a hero image or illustration.</li>
              <li><strong>Social Media:</strong> Create visually cohesive posts by using colors extracted from your hero photography.</li>
              <li><strong>CSS Theming:</strong> Copy hex codes directly into your stylesheet or CSS custom properties for pixel-perfect accuracy.</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Related Design &amp; Image Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li><Link href="/color-picker" className="text-brand underline">Color Picker &amp; Converter</Link></li>
              <li><Link href="/image-converter" className="text-brand underline">Image to WebP/AVIF Converter</Link></li>
              <li><Link href="/image-watermark" className="text-brand underline">Image Watermark Tool</Link></li>
              <li><Link href="/mockup-generator" className="text-brand underline">Mockup Generator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
