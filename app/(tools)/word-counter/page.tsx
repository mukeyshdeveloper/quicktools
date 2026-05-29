import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { generateToolSchema } from '@/lib/schema';
import WordCounter from '@/tools/word-counter/WordCounter';
import { meta } from '@/tools/word-counter/meta';

const siteUrl: string = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.thequickutils.com';

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: {
    canonical: meta.canonical,
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${siteUrl}${meta.canonical}`,
    images: [
      {
        url: meta.ogImage ?? '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Word Counter by QuickUtils',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

export default function WordCounterPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateToolSchema(meta)),
          }}
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

        <section className="prose-section mt-12">
          <h2>How to Use the Word Counter</h2>
          <p>
            QuickUtils Word Counter is a free online text counter for checking
            word count, character count, sentence count, paragraph count, and
            estimated reading time. Paste your text into the box or type
            directly, and the results update instantly without pressing a
            calculate button.
          </p>
          <p>
            Writers, students, editors, marketers, and developers can use this
            tool to keep content within limits for essays, meta descriptions,
            social posts, product copy, emails, and forms. The counter runs
            locally in your browser, so the text you enter is not uploaded to an
            external server.
          </p>

          <h2>Frequently Asked Questions</h2>
          <h3>What does this word counter calculate?</h3>
          <p>
            It calculates total words, all characters, characters without
            spaces, sentences, paragraphs, and estimated reading time based on a
            typical reading speed of 200 words per minute.
          </p>
          <h3>Is my text saved or sent anywhere?</h3>
          <p>
            No. The Word Counter works fully in your browser. It does not call
            an external API, save your text, or require signup.
          </p>

          <h2>Related Tools</h2>
          <ul>
            <li>
              <Link href="/age-calculator">Age Calculator</Link>
            </li>
            <li>
              <Link href="/json-formatter">JSON Formatter</Link>
            </li>
            <li>
              <Link href="/resume-builder">Resume Builder</Link>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
