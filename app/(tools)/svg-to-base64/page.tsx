import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/svg-to-base64/meta';
import SvgToBase64 from '@/tools/svg-to-base64/SvgToBase64';
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
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

export default function SvgToBase64Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Frontend Design Tool
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            SVG to Base64 Converter
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">
            {meta.description}
          </p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <SvgToBase64 />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Why Convert SVG to Base64 or Data URIs?</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              When building modern web applications, frontend developers frequently need to embed small SVG icons directly into CSS backgrounds (<code>background-image</code>) or HTML elements. Doing this via Data URIs saves critical HTTP requests, leading to faster page load times and better Core Web Vitals (LCP).
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Our converter generates both <strong>Base64</strong> and <strong>URL-encoded</strong> Data URIs. While Base64 is universally supported, it increases file size by about 33%. For SVGs, URL-encoding (percent-encoding) is considered the optimal industry standard, as it keeps the SVG readable to the browser's GZIP/Brotli compression, resulting in a much smaller final bundle size.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">How to Use the Data URI</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>
                <strong>In CSS:</strong> Simply copy the CSS background snippet and paste it into your stylesheet class. Example: <code>.icon {"{"} background-image: url("data:image/svg+xml,..."); {"}"}</code>
              </li>
              <li>
                <strong>In HTML:</strong> Copy the HTML Img Tag snippet and paste it into your component to render the SVG as a standard image element without needing an external HTTP source.
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Related Utilities</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li><Link href="/css-generator" className="text-brand underline hover:text-brand-hover">CSS Box-Shadow Generator</Link></li>
              <li><Link href="/base64-encoder-decoder" className="text-brand underline hover:text-brand-hover">General Base64 Encoder</Link></li>
              <li><Link href="/code-minifier" className="text-brand underline hover:text-brand-hover">Code Minifier</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
