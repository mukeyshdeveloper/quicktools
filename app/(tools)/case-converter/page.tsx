import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import CaseConverter from '@/tools/case-converter/CaseConverter';
import { meta } from '@/tools/case-converter/meta';

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

export default function CaseConverterPage() {
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
            Case Converter
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">
            {meta.description}
          </p>
        </div>

        <CaseConverter />

        {/* SEO Content */}
        <section className="prose-section mt-16 max-w-3xl">
          <h2>Why use a Case Converter?</h2>
          <p>
            Whether you accidentally left CAPS LOCK on, need to format a title for a blog post, or are a
            programmer converting variables to <code>camelCase</code> or <code>snake_case</code>, this tool
            saves you from retyping everything manually. Simply paste your text, and instantly see it
            converted into over 10 different formats.
          </p>

          <h2>Available Text Cases</h2>
          <ul>
            <li><strong>UPPER CASE:</strong> Converts all letters to capitals. Great for warnings or headlines.</li>
            <li><strong>lower case:</strong> Converts all letters to small letters.</li>
            <li><strong>Title Case:</strong> Capitalizes the first letter of every word. Ideal for book and article titles.</li>
            <li><strong>Sentence case:</strong> Capitalizes only the first letter of the first word. Standard for normal writing.</li>
            <li><strong>camelCase:</strong> Removes spaces and capitalizes the first letter of each subsequent word. Standard in JavaScript and Java.</li>
            <li><strong>PascalCase:</strong> Similar to camelCase, but the first letter is also capitalized. Used for classes in C# and TypeScript.</li>
            <li><strong>snake_case:</strong> Replaces spaces with underscores. Popular in Python and databases.</li>
            <li><strong>kebab-case:</strong> Replaces spaces with hyphens. Used in URLs and CSS classes.</li>
          </ul>

          <h2>Privacy Guarantee</h2>
          <p>
            Your text is converted locally on your device. We do not store, track, or transmit your text
            over the internet.
          </p>

          <h2>Related Tools</h2>
          <ul>
            <li><Link href="/word-counter">Word Counter</Link></li>
            <li><Link href="/lorem-ipsum-generator">Lorem Ipsum Generator</Link></li>
            <li><Link href="/diff-checker">Diff Checker</Link></li>
          </ul>
        </section>
      </>
    );
  }
