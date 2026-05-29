import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/readability-grader/meta';
import ReadabilityGrader from '@/tools/readability-grader/ReadabilityGrader';
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

export default function ReadabilityGraderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Writing & Content Utility
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Readability Grader & Score Calculator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">
            {meta.description}
          </p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <ReadabilityGrader />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">What is a Readability Score?</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Readability scores indicate how difficult your text is to understand. The most famous and widely-used algorithms are the <strong>Flesch Reading Ease</strong> and the <strong>Flesch-Kincaid Grade Level</strong> tests. These formulas mathematically evaluate the average length of your sentences and the average number of syllables per word to determine complexity.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Understanding the Metrics</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>
                <strong>Flesch-Kincaid Grade Level:</strong> This translates the score into a U.S. school grade level. For example, a score of 8.0 means that an eighth grader can easily understand the document. For general web content, targeting a grade level of 7 to 8 ensures maximum accessibility.
              </li>
              <li>
                <strong>Flesch Reading Ease:</strong> This is a score from 0 to 100. A score of 90-100 is very easy to read (suitable for a 5th grader), while a score of 0-30 is very difficult (academic paper level). A score between 60 and 70 is considered standard "Plain English."
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tips to Improve Your Score</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              If your score is too high (indicating overly complex text), try breaking long, run-on sentences into two smaller ones. Additionally, look for highly complex vocabulary words (4+ syllables) and replace them with simpler, more common synonyms where appropriate.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Related Content Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li><Link href="/keyword-density" className="text-brand underline hover:text-brand-hover">Keyword Density Checker</Link></li>
              <li><Link href="/word-counter" className="text-brand underline hover:text-brand-hover">Word & Character Counter</Link></li>
              <li><Link href="/lorem-ipsum-generator" className="text-brand underline hover:text-brand-hover">Lorem Ipsum Generator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
