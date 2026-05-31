import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/duplicate-remover/meta';
import DuplicateRemover from '@/tools/duplicate-remover/DuplicateRemover';
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
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

export default function DuplicateRemoverPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Text Utility
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Duplicate Line Remover & Text Sorter
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">
            {meta.description}
          </p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <DuplicateRemover />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Easily Clean Up Text Lists</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              When working with massive datasets, email lists, or keyword dumps, it is extremely common to encounter redundant or duplicate entries. Manually sorting through thousands of lines to find duplicates is time-consuming and error-prone. Our Duplicate Line Remover tool instantly filters out exact text matches, leaving you with a perfectly clean dataset.
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Beyond deduplication, you can enable options to trim trailing whitespace spaces, delete empty blank lines, and forcefully sort the list alphabetically or by length to perfectly format your data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Security & Privacy First</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              All processing happens 100% locally in your browser using JavaScript. Your lists, emails, keywords, or data never leave your device — making this tool safe for sensitive or proprietary information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Common Use Cases</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>Cleaning keyword research exports from multiple tools</li>
              <li>Deduplicating email lists before campaigns</li>
              <li>Removing repeated lines from logs or data exports</li>
              <li>Preparing clean lists for SQL IN clauses or spreadsheets</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Related Text Utilities</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li><Link href="/word-counter" className="text-brand underline hover:text-brand-hover">Word & Character Counter</Link></li>
              <li><Link href="/case-converter" className="text-brand underline hover:text-brand-hover">Uppercase & Lowercase Converter</Link></li>
              <li><Link href="/diff-checker" className="text-brand underline hover:text-brand-hover">Text Diff Checker</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
