import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/meta-tag-generator/meta';
import MetaTagGenerator from '@/tools/meta-tag-generator/MetaTagGenerator';
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

export default function MetaTagGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            SEO & Marketing Tool
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Meta Tag & OpenGraph Generator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">
            {meta.description}
          </p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <MetaTagGenerator />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Why Are Meta Tags Important?</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Meta tags are snippets of HTML code embedded in the <code>&lt;head&gt;</code> section of your website. They don't appear visually on the page itself, but they communicate critical information about your content to search engines (like Google) and social media platforms (like Twitter, Facebook, and LinkedIn). Providing precise meta tags improves click-through rates (CTR) by ensuring your search result snippets and social media link previews look professional and engaging.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">What is OpenGraph?</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              The Open Graph protocol was originally created by Facebook to standardize how URLs are displayed when shared on social platforms. When you see a beautiful, large image preview alongside a bold title and description after pasting a link into a chat or feed, that is OpenGraph at work. By generating standard <code>og:title</code>, <code>og:image</code>, and Twitter Card specific tags, you guarantee that your links command attention when shared.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Related SEO Utilities</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li><Link href="/url-encoder-decoder" className="text-brand underline hover:text-brand-hover">URL Encoder & Query Parser</Link></li>
              <li><Link href="/regex-tester" className="text-brand underline hover:text-brand-hover">Regex Pattern Tester</Link></li>
              <li><Link href="/markdown-previewer" className="text-brand underline hover:text-brand-hover">Markdown to HTML Editor</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
