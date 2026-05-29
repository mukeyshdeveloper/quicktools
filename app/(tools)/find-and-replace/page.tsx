import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/find-and-replace/meta';
import FindAndReplace from '@/tools/find-and-replace/FindAndReplace';
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
    images: [{ url: meta.ogImage ?? '/og-default.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

export default function FindAndReplacePage() {
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
            Find & Replace Text Engine
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">
            {meta.description}
          </p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <FindAndReplace />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Advanced Find & Replace Online</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              While most code editors have built-in find and replace functionality, what happens when you need to manipulate a quick text dump without opening an IDE? Our online Find & Replace Engine provides instant, browser-based text swapping with powerful options typically reserved for desktop applications.
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Simply paste your source text, configure your find parameters (such as matching case or isolating whole words), and watch the output generate instantly. The live match counter provides immediate feedback on exactly how many strings were modified.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Regular Expression (Regex) Support</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              For complex document processing, toggle the <strong>Use Regular Expression</strong> option. This unlocks the ability to search for dynamic patterns instead of static text. For example, finding <code>^\d+</code> will target all numbers at the start of a line. You can even use Regex Capture Groups (like <code>$1</code> or <code>$2</code>) in your replacement text to surgically re-arrange matched content.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Related Developer Utilities</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li><Link href="/regex-tester" className="text-brand underline hover:text-brand-hover">Regex Pattern Tester</Link></li>
              <li><Link href="/duplicate-remover" className="text-brand underline hover:text-brand-hover">Duplicate Line Remover</Link></li>
              <li><Link href="/list-converter" className="text-brand underline hover:text-brand-hover">List to Comma Converter</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
