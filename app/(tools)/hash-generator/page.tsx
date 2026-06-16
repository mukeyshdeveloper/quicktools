import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/hash-generator/meta';
import HashGenerator from '@/tools/hash-generator/HashGenerator';
import AdBanner from '@/components/layout/AdBanner';
import { generateToolSchema } from '@/lib/schema';
import FAQSection from '@/components/ui/FAQSection';

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

export default function HashGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Developer Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Hash Generator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <HashGenerator />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Cryptographic Hashes in Practice</h2>
          <p>
            Hash functions turn any amount of data into a fixed-size fingerprint. They are one-way (you cannot recover the original from the hash) and deterministic. This tool is perfect for verifying file integrity, generating checksums, or quickly getting digests for passwords, tokens, or content identifiers — all without ever sending your data anywhere.
          </p>

          <h2>Which Algorithm Should I Use?</h2>
          <ul>
            <li><strong>SHA-256 / SHA-512</strong> — Current recommendation for almost all new applications.</li>
            <li><strong>MD5 / SHA-1</strong> — Only use for non-security checksums (e.g., detecting accidental corruption). They are cryptographically broken.</li>
            <li><strong>BLAKE2</strong> — Excellent modern alternative (faster than SHA-3 on many platforms). We focus on the most universally supported algorithms here.</li>
          </ul>

          <FAQSection faqs={meta.faqs} />

          <div className="pt-8 mt-12 border-t border-border">
            <h2>Related Developer Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/jwt-encoder" className="text-brand underline">JWT Encoder</Link></li>
              <li><Link href="/color-contrast-checker" className="text-brand underline">Color Contrast Checker</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
