import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/slug-converter/meta';
import SlugConverter from '@/tools/slug-converter/SlugConverter';
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
    images: [{ url: meta.ogImage ?? '/og-default.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

export default function SlugConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Web Developer Utility
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            String to URL Slug Converter
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">
            {meta.description}
          </p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <SlugConverter />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">What is a URL Slug?</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              A URL slug is the exact part of a website address that identifies a particular page on a website in an easy-to-read form. In the URL <code>https://www.thequickutils.com/slug-converter</code>, the string <code>slug-converter</code> is the slug. They are incredibly important for SEO (Search Engine Optimization) because they help search engines understand what the page is about.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Why use a Slug Converter?</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              When writing blog posts or creating product pages, you usually start with a human-readable title like <strong>"10 Best Developer Tools for 2026!"</strong>. If you try to use that directly as a URL, browsers will encode the spaces into ugly <code>%20</code> characters, and special symbols can break the link entirely.
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Our slug generator strips out all non-alphanumeric characters, converts spaces to safe separators (hyphens or underscores), and standardizes the casing. This guarantees your links look professional, are easy for users to type, and are perfectly optimized for Google search rankings.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Related Web Utilities</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li><Link href="/url-encoder-decoder" className="text-brand underline hover:text-brand-hover">URL Percent Encoder / Decoder</Link></li>
              <li><Link href="/utm-builder" className="text-brand underline hover:text-brand-hover">UTM Link Builder</Link></li>
              <li><Link href="/uuid-generator" className="text-brand underline hover:text-brand-hover">UUID / GUID Generator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
