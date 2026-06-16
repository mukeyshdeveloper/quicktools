import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import WordCounter from '@/tools/word-counter/WordCounter';
import { meta } from '@/tools/word-counter/meta';
import FAQSection from '@/components/ui/FAQSection';
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

export default function WordCounterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <div className="mb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
          Free text tool
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
          Word Counter
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
          {meta.description}
        </p>
      </div>

        <WordCounter />

        <section className="prose-section mt-12 max-w-3xl">
          <h2>How to Use the Word Counter</h2>
          <p>
            Paste or type text. The counter updates live with words, characters (with/without spaces), sentences, paragraphs, and estimated reading time.
          </p>

          <FAQSection faqs={meta.faqs} />

          <div className="pt-8 border-t border-border mt-12">
            <h2>Related Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/json-formatter" className="text-brand underline">JSON Formatter</Link></li>
              <li><Link href="/diff-checker" className="text-brand underline">Diff Checker</Link></li>
              <li><Link href="/resume-builder" className="text-brand underline">Resume Builder</Link></li>
            </ul>
          </div>
        </section>
      </>
    );
  }
