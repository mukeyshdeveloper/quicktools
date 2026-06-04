import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/regex-generator/meta';
import RegexGenerator from '@/tools/regex-generator/RegexGenerator';
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

export default function RegexGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Developer Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Regex Generator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <RegexGenerator />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Writing Regex Without the Pain</h2>
          <p>
            Regular expressions are powerful but notoriously hard to get right. By showing the generator concrete examples of what should and should not match, you get a pattern that is both correct for your data and reasonably readable. The tool uses smart inference for emails, URLs, phones, dates, IPs and log lines, then falls back to prefix/suffix + length or character class heuristics for everything else.
          </p>

          <h2>Tips for Better Results</h2>
          <ul>
            <li>Provide 3–6 positive examples that cover the variations you care about.</li>
            <li>Add negative examples that are close but should be rejected.</li>
            <li>Edit the generated pattern directly — the live tester updates instantly.</li>
            <li>Use the editable flags field (i for case-insensitive is commonly useful).</li>
          </ul>

          <div className="pt-4 border-t border-border">
            <h2>Related Developer Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/regex-tester" className="text-brand underline">Regex Tester</Link></li>
              <li><Link href="/api-response-mock-generator" className="text-brand underline">API Response Mock Generator</Link></li>
              <li><Link href="/json-formatter" className="text-brand underline">JSON Formatter</Link></li>
              <li><Link href="/timestamp-converter" className="text-brand underline">Timestamp Converter</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
