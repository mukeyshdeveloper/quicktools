import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/sql-formatter-minifier/meta';
import SqlFormatterMinifier from '@/tools/sql-formatter-minifier/SqlFormatterMinifier';
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
    images: [{ url: meta.ogImage ?? '/og-default.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
};

export default function SqlFormatterMinifierPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Developer Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            SQL Formatter &amp; Minifier
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <SqlFormatterMinifier />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Why Clean SQL Matters</h2>
          <p>
            Messy SQL is hard to review, debug, and maintain. Consistent formatting makes differences in pull requests obvious and helps teams catch bugs faster. Minification is useful when embedding queries in logs or sending them over the wire in constrained environments. This tool produces readable indented output for CTEs, JOINs, GROUP BY and multi-row INSERTs while also offering a one-line minified form.
          </p>

          <h2>How to use effectively</h2>
          <ol className="list-decimal pl-5">
            <li>Paste any query — even from logs or query builders.</li>
            <li>Toggle uppercase and indent size until it matches your team style.</li>
            <li>Copy the formatted version for code reviews or the minified for compact storage.</li>
          </ol>

          <h2>Tips</h2>
          <ul>
            <li>Format before committing or sharing.</li>
            <li>Use minify only when size actually matters (logs, migration comments).</li>
            <li>Uppercase keywords improve readability for most teams.</li>
          </ul>

          <div className="pt-4 border-t border-border">
            <h2>Related Developer Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/json-formatter" className="text-brand underline">JSON Formatter</Link></li>
              <li><Link href="/regex-generator" className="text-brand underline">Regex Generator</Link></li>
              <li><Link href="/api-response-mock-generator" className="text-brand underline">API Response Mock Generator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
