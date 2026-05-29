import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/list-converter/meta';
import ListConverter from '@/tools/list-converter/ListConverter';
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

export default function ListConverterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Data Utility
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            List to Comma Separator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">
            {meta.description}
          </p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <ListConverter />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">What is a Comma Separator Tool?</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              When dealing with spreadsheet data or database exports, you will often find yourself with a vertical column of thousands of items (like emails, user IDs, or names). If you need to use this data in a SQL query, a JSON array, or an email CC line, you must convert that vertical list into a horizontal string separated by commas.
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Our List Converter automates this tedious process. Simply paste your column, select your delimiter, and the tool will instantly join your lines into a perfectly formatted, single-line string.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Generating SQL IN Clauses</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Database administrators and backend developers frequently need to query a massive list of specific IDs. By selecting the <strong>"Single Quotes ('x')"</strong> format in our tool, your pasted column will be transformed into <code>'item1', 'item2', 'item3'</code>. You can then copy and paste this directly into a <code>SELECT * FROM users WHERE email IN (...)</code> statement without writing manual string manipulation code!
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Related Text Utilities</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li><Link href="/duplicate-remover" className="text-brand underline hover:text-brand-hover">Duplicate Line Remover & Sorter</Link></li>
              <li><Link href="/json-formatter" className="text-brand underline hover:text-brand-hover">JSON Formatter</Link></li>
              <li><Link href="/regex-tester" className="text-brand underline hover:text-brand-hover">Regex Pattern Tester</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
