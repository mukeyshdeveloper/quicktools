import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/license-generator/meta';
import LicenseGenerator from '@/tools/license-generator/LicenseGenerator';
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

export default function LicenseGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Developer Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Open Source License Generator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <LicenseGenerator />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Choosing the Right License</h2>
          <p>
            Open source licenses define how others can use, modify, and share your code. Permissive licenses like MIT and Apache give users maximum freedom. Copyleft licenses like GPL ensure that derivative works remain open source.
          </p>

          <h2>Quick Guide</h2>
          <ul>
            <li><strong>MIT / ISC / BSD</strong>: Very permissive. Great for libraries and maximum adoption.</li>
            <li><strong>Apache 2.0</strong>: Permissive with explicit patent grant. Popular for corporate projects.</li>
            <li><strong>GPL-3.0</strong>: Strong copyleft. Ensures derivatives stay free and open.</li>
            <li><strong>Unlicense</strong>: Public domain dedication. Maximum freedom, no conditions.</li>
          </ul>

          <div className="pt-4 border-t border-border">
            <h2>Related Developer Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/gitignore-generator" className="text-brand underline">Git Ignore Generator</Link></li>
              <li><Link href="/api-response-mock-generator" className="text-brand underline">API Response Mock Generator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
