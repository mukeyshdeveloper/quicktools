import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/timestamp-converter/meta';
import TimestampConverter from '@/tools/timestamp-converter/TimestampConverter';
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

export default function TimestampConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Developer Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Timestamp Converter
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <TimestampConverter />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Time Is Tricky</h2>
          <p>
            Developers constantly juggle Unix timestamps (seconds vs milliseconds), ISO strings, human dates, and different timezones. This converter removes the mental math and copy-paste errors by giving you every common representation side-by-side, with accurate timezone handling via your browser’s Intl implementation (including historical and future DST transitions).
          </p>

          <h2>Supported Input Formats</h2>
          <ul>
            <li>Unix seconds and milliseconds (auto-detected)</li>
            <li>ISO 8601 strings (with or without milliseconds / Z)</li>
            <li>Common human readable strings your browser can parse</li>
            <li>Batch conversion — one timestamp per line</li>
          </ul>

          <h2>Pro Tips</h2>
          <ul>
            <li>Use the live “Current time” row as a quick reference.</li>
            <li>Batch mode is perfect for cleaning log files or CSVs.</li>
            <li>Relative time helps when reading recent logs or incident timelines.</li>
            <li>Quick offset buttons let you explore “what time is it +1h in other zones?”</li>
          </ul>

          <div className="pt-4 border-t border-border">
            <h2>Related Developer Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/cron-expression-parser" className="text-brand underline">Cron Expression Parser</Link></li>
              <li><Link href="/hash-generator" className="text-brand underline">Hash Generator</Link></li>
              <li><Link href="/regex-generator" className="text-brand underline">Regex Generator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
