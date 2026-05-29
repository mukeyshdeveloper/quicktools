import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/keyword-density/meta';
import KeywordDensity from '@/tools/keyword-density/KeywordDensity';
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

export default function KeywordDensityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            SEO & Content Utility
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Keyword Density Checker
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">
            {meta.description}
          </p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <KeywordDensity />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Why Check Keyword Density?</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Keyword density refers to the percentage of times a specific word or phrase appears on a web page compared to the total number of words. For SEO writers, keeping your target keywords around an optimal 1% to 2% density ensures search engines understand what your content is about without penalizing you for "keyword stuffing."
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Our advanced density checker instantly tokenizes your article, strips out common conversational words (stop words), and calculates exact frequency scores for single words as well as 2-word and 3-word combinations (long-tail keywords).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">What are Stop Words?</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Stop words are extremely common filler words like "the", "and", "is", and "in". Search engines generally ignore these words when trying to understand the core topic of an article. By toggling on <strong>"Ignore Stop Words"</strong>, our tool filters out over 100 common English fillers, allowing your true subject matter keywords to rise to the top of the density list.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Related Content Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li><Link href="/word-counter" className="text-brand underline hover:text-brand-hover">Word & Character Counter</Link></li>
              <li><Link href="/meta-tag-generator" className="text-brand underline hover:text-brand-hover">Meta Tag & OpenGraph Generator</Link></li>
              <li><Link href="/find-and-replace" className="text-brand underline hover:text-brand-hover">Find & Replace Text Engine</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
