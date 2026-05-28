import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import RegexTester from '@/tools/regex-tester/RegexTester';
import { meta } from '@/tools/regex-tester/meta';
import AdBanner from '@/components/layout/AdBanner';

const siteUrl: string = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quickutils.in';

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

export default function RegexTesterPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
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

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <RegexTester />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        {/* SEO Content */}
        <section className="prose-section mt-16 max-w-3xl">
          <h2>What is a Regular Expression (Regex)?</h2>
          <p>
            A Regular Expression, often abbreviated as "Regex" or "RegExp", is a sequence of characters that 
            specifies a search pattern. It is an extremely powerful tool used in software development for 
            searching, matching, and replacing text strings. Whether you are validating an email address, 
            extracting data from a log file, or replacing specific words in a document, regular expressions 
            make complex text processing fast and efficient.
          </p>

          <h2>How to use this Regex Tester</h2>
          <p>
            Our Regex Tester provides a live, interactive environment to build and debug your expressions safely:
          </p>
          <ul>
            <li><strong>Pattern:</strong> Type your regular expression without the forward slashes (e.g., <code>[a-z0-9]+</code>).</li>
            <li><strong>Flags:</strong> Add flags like <code>g</code> (global search to find all matches) or <code>i</code> (case-insensitive search).</li>
            <li><strong>Test String:</strong> Paste the text you want to search through. The matches will instantly highlight in the result box below.</li>
            <li><strong>Capture Groups:</strong> If your regex contains capture groups using parentheses <code>( )</code>, they will automatically be extracted and listed in the match details.</li>
          </ul>

          <h2>Privacy and Security</h2>
          <p>
            This tool is 100% client-side. Your text strings and regular expressions are evaluated directly 
            within your web browser using JavaScript's native RegExp engine. We never send your data to any server, 
            ensuring complete privacy for sensitive logs, API keys, or proprietary code you might be testing.
          </p>

          <h2>Related Developer Tools</h2>
          <ul>
            <li><Link href="/jwt-decoder">JWT Decoder</Link></li>
            <li><Link href="/base64-encoder-decoder">Base64 Encoder / Decoder</Link></li>
            <li><Link href="/diff-checker">Diff Checker</Link></li>
          </ul>
        </section>
      </main>
    </div>
  );
}
