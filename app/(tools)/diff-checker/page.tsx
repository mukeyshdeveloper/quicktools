import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import DiffChecker from '@/tools/diff-checker/DiffChecker';
import { meta } from '@/tools/diff-checker/meta';

const siteUrl: string = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.thequickutils.com';

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

export default function DiffCheckerPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
        />

        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Text Tool
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Diff Checker
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">
            {meta.description}
          </p>
        </div>

        <DiffChecker />

        {/* SEO Content */}
        <section className="prose-section mt-16 max-w-3xl">
          <h2>What is a Diff Checker?</h2>
          <p>
            A Diff Checker (or text comparison tool) is an essential utility that compares two blocks of text
            line-by-line and highlights the exact differences. It helps you quickly identify what was added,
            removed, or changed between an original document and a modified version.
          </p>

          <h2>How to use the Diff Checker</h2>
          <p>
            Paste your original text into the left panel and the modified text into the right panel. The tool
            will automatically compute the differences in real-time. You can toggle between two viewing modes:
          </p>
          <ul>
            <li><strong>Split View:</strong> Shows the original and modified text side-by-side, making it easy to see parallel changes.</li>
            <li><strong>Unified View:</strong> Shows all changes inline in a single list, similar to standard Git commit diffs.</li>
          </ul>

          <h2>Common Use Cases</h2>
          <p>
            This tool is widely used by developers to review code changes before committing, by writers and
            editors to track revisions in articles, and by data analysts to compare configuration files or
            dataset outputs.
          </p>

          <h2>Related Tools</h2>
          <ul>
            <li><Link href="/word-counter">Word Counter</Link></li>
            <li><Link href="/case-converter">Case Converter</Link></li>
            <li><Link href="/json-formatter">JSON Formatter</Link></li>
          </ul>
        </section>
      </main>
    </div>
  );
}
