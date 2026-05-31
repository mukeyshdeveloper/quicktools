import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/keyword-density/meta';
import KeywordDensity from '@/tools/keyword-density/KeywordDensity';
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
    images: [{ url: meta.ogImage ?? '/og-default.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

export default function KeywordDensityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <div className="mb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
          SEO & Content Tool
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
          Keyword Density Checker
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
          {meta.description}
        </p>
      </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <KeywordDensity />

        <section className="prose-section mt-12">
          <h2>Why Keyword Density Analysis Matters</h2>
          <p>
            Modern search engines are sophisticated, but they still use term frequency signals to understand topical relevance. Too little of your target keyword and the page may not rank for it. Too much ("keyword stuffing") and you risk penalties or poor user experience.
          </p>
          <p>
            Our tool gives you precise data: single-word density + 2-word and 3-word phrase frequency after intelligently removing stop words.
          </p>

          <h2>Best Practices for Keyword Density</h2>
          <ul>
            <li>Primary keyword: usually 0.8–2.0%</li>
            <li>Secondary / long-tail keywords: 0.4–1.2%</li>
            <li>Always prioritize natural language over hitting exact percentages</li>
            <li>Place important keywords in headings, first 100 words, and conclusion</li>
          </ul>

          <h2>Stop Words & Why We Filter Them</h2>
          <p>
            Common words like "the", "and", "of", "in", "to" add noise. By removing them (toggle available), you see the real keywords that matter for SEO.
          </p>

          <h2>Related Content & SEO Tools</h2>
          <ul className="list-disc pl-5">
            <li><Link href="/word-counter">Word & Character Counter</Link></li>
            <li><Link href="/readability-grader">Readability Grader</Link></li>
            <li><Link href="/find-and-replace">Find & Replace Tool</Link></li>
          </ul>
        </section>
      </>
    );
  }

