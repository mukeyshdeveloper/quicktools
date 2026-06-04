import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import DiffChecker from '@/tools/diff-checker/DiffChecker';
import { meta } from '@/tools/diff-checker/meta';

import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: meta.canonical },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: absoluteUrl(meta.canonical),
    images: [{ url: meta.ogImage ?? '/og-default.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

export default function DiffCheckerPage() {
  return (
    <>
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
            A Diff Checker is a powerful tool that compares two versions of text and visually highlights exactly what changed. It shows additions in green and deletions in red, making it trivial to spot modifications at a glance.
          </p>

          <h2>How to Use the Diff Checker</h2>
          <p>
            Simply paste the original version on the left and the updated version on the right. The tool instantly calculates the differences. You can switch between:
          </p>
          <ul>
            <li><strong>Split View</strong> – Best for side-by-side comparison</li>
            <li><strong>Unified View</strong> – Best for seeing a clean changelog-style diff</li>
          </ul>

          <h2>Common Use Cases</h2>
          <ul>
            <li>Code reviews before committing to Git</li>
            <li>Tracking revisions in legal documents, contracts, or proposals</li>
            <li>Comparing configuration files or database exports</li>
            <li>Reviewing changes in marketing copy or blog posts</li>
            <li>Debugging differences between API responses</li>
          </ul>

          <h2>Why Use Our Diff Checker?</h2>
          <p>
            Unlike many online diff tools, ours runs entirely in your browser. Your sensitive documents, code, or data never leave your device — perfect for confidential work.
          </p>
          <p>
            It also supports two viewing modes (Split and Unified) so you can choose the format that works best for your review process.
          </p>
          <p>
            The tool is completely private — your documents never leave your browser. This makes it safe to use with sensitive code, legal documents, or internal data.
          </p>

          <h2>Related Tools</h2>
          <ul>
            <li><Link href="/word-counter">Word Counter</Link></li>
            <li><Link href="/json-formatter">JSON Formatter</Link></li>
            <li><Link href="/json-formatter">JSON Formatter</Link></li>
          </ul>
        </section>
      </>
    );
  }
