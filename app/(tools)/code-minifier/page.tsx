import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/code-minifier/meta';
import CodeMinifier from '@/tools/code-minifier/CodeMinifier';
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

export default function CodeMinifierPage() {
  return (
    <>
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {/* Header Block */}
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Performance Utility
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Code Minifier (HTML, CSS, JS)
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">
            {meta.description}
          </p>
        </div>

        {/* Ad above tool */}
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        {/* Interactive Tool Component */}
        <CodeMinifier />

        {/* Ad below result */}
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        {/* Premium SEO Rich Content Section */}
        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">What is Code Minification?</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Code minification is the systematic process of stripping out redundant, unnecessary, or non-functional characters from computer source code without altering its core operational logic. When developers write HTML, CSS, or JavaScript, they rely heavily on formatting aids to keep their files readable: comments, indentation, extra line breaks, and whitespace.
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              While these aids are incredibly valuable for humans, they are completely ignored by web browsers. Minification cleanses these extra characters, drastically shrinking the overall file sizes so they transfer across networks significantly faster.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">How Our Minifier Optimizes Your Assets</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Our advanced tool utilizes custom, lightweight parsing techniques to optimize each language segment:
            </p>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>
                <strong>HTML Optimization:</strong> Erases structural comments (<code>&lt;!-- comment --&gt;</code>), collapses multiple spacing tokens into single spaces, and eliminates unnecessary whitespaces sitting between parent and child tags.
              </li>
              <li>
                <strong>CSS Compression:</strong> Strips stylesheet comments (<code>{"/* comment */"}</code>), collapses sequential newlines, and eliminates spaces around common operators and symbols like braces, colons, semicolons, and commas (e.g. <code>{"body { margin: 0; }"}</code> becomes <code>{"body{margin:0}"}</code>).
              </li>
              <li>
                <strong>JavaScript Minification:</strong> Uses string-preservation algorithms that safely identify and preserve string contents inside single/double quotes or template literals while purging line and block comments (<code>//</code> and <code>/* */</code>) and collapsing syntax layouts.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Impact on Page Load Speeds & SEO</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Search engines like Google rank websites based heavily on Core Web Vitals, including Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS). Unminified, bloated CSS and JS assets are "render-blocking" resources—meaning the browser must download, parse, and execute them fully before displaying any page content. 
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              By shrinking these assets by 30% to 60%, you drastically lower time-to-first-byte (TTFB), accelerate rendering timelines, decrease data usage for mobile visitors, and significantly elevate your SEO positioning.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Will minification break my JavaScript code?</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  No. Our minifier runs careful state tracking that preserves all string literals, template literals, and regex statements exactly as written. However, we always recommend keeping a backup of your original, highly formatted source code for future editing, as minified code is intentionally difficult to read.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Is this minification process secure?</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Absolutely. Unlike other online minification web apps that transmit your code to a remote server, QuickUtils processes all minification completely locally on your machine using client-side JavaScript. Your code never leaves your computer, ensuring total privacy.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Related Developer Utilities</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>
                <Link href="/json-formatter" className="text-brand underline hover:text-brand-hover">
                  JSON Formatter & Validator
                </Link>
              </li>
              <li>
                <Link href="/diff-checker" className="text-brand underline hover:text-brand-hover">
                  Text & Code Diff Checker
                </Link>
              </li>
              <li>
                <Link href="/regex-tester" className="text-brand underline hover:text-brand-hover">
                  Regex Pattern Tester
                </Link>
              </li>
              <li>
                <Link href="/url-encoder-decoder" className="text-brand underline hover:text-brand-hover">
                  URL Percent Encoder / Decoder
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
