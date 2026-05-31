import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import RegexTester from '@/tools/regex-tester/RegexTester';
import { meta } from '@/tools/regex-tester/meta';
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

export default function RegexTesterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Developer Tool
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Regex Tester & Matcher
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">
            {meta.description}
          </p>
        </div>

        <RegexTester />

        {/* SEO Content */}
        <section className="prose-section mt-12">
          <h2>What is a Regular Expression?</h2>
          <p>
            A Regular Expression (Regex) is a powerful pattern-matching language used to search, validate, and manipulate text. It is one of the most essential tools in a developer's toolkit for tasks ranging from input validation to complex data extraction.
          </p>

          <h2>How to Use This Regex Tester</h2>
          <p>
            The tester provides a real-time environment powered by JavaScript's native RegExp engine:
          </p>
          <ul>
            <li>Enter your pattern in the top field (without slashes)</li>
            <li>Choose flags (g for global, i for case-insensitive, m for multiline, etc.)</li>
            <li>Paste your test text below — matches highlight instantly</li>
            <li>View detailed capture groups and match information on the right</li>
          </ul>

          <h2>Common Use Cases</h2>
          <ul>
            <li>Validating emails, phone numbers, URLs, and passwords</li>
            <li>Extracting specific data from logs or large text files</li>
            <li>Performing bulk find-and-replace operations with complex rules</li>
            <li>Parsing structured data (CSV, logs, API responses)</li>
            <li>Testing and debugging regex before using it in production code</li>
          </ul>

          <h2>Complete Privacy</h2>
          <p>
            All regex evaluation happens 100% in your browser. Your test strings and patterns are never sent to any server — ideal for working with sensitive data or proprietary patterns.
          </p>

          <h2>Related Developer Tools</h2>
          <ul>
            <li><Link href="/find-and-replace">Find & Replace Tool</Link></li>
            <li><Link href="/jwt-decoder">JWT Decoder</Link></li>
            <li><Link href="/diff-checker">Diff Checker</Link></li>
          </ul>
        </section>
      </>
    );
  }
