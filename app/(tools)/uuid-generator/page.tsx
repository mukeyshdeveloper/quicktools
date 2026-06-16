import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/uuid-generator/meta';
import UuidGenerator from '@/tools/uuid-generator/UuidGenerator';
import AdBanner from '@/components/layout/AdBanner';
import { generateToolSchema } from '@/lib/schema';
import FAQSection from '@/components/ui/FAQSection';

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

export default function UuidGeneratorPage() {
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
            Developer Utilities
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            UUID / GUID Generator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">
            {meta.description}
          </p>
        </div>

        {/* Ad above tool */}
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        {/* Dynamic Tool Component */}
        <UuidGenerator />

        {/* Ad below result */}
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        {/* Premium SEO Rich Content Section */}
        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">What is a UUID (Universally Unique Identifier)?</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              A Universally Unique Identifier (UUID), historically also referred to as a Globally Unique Identifier (GUID) in Microsoft ecosystems, is a 128-bit label used for identifying information in computer systems. Standard UUIDs are structured as 32 hexadecimal characters split across five groups separated by hyphens in a <code>8-4-4-4-12</code> configuration (for example, <code>123e4567-e89b-12d3-a456-426614174000</code>).
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Because of the massive range of unique combinations (there are 2<sup>128</sup> or roughly 3.4 x 10<sup>38</sup> possible UUIDs), the probability of duplicate IDs being generated, even on separate machines without a centralized authority, is virtually zero. This makes them ideal for primary keys in distributed databases, microservice transactions, file identifiers, and secure authentication tokens.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Understanding the Different UUID Versions</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Different use cases require different generation strategies. Our bulk generator supports three of the most popular UUID variants:
            </p>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>
                <strong>Version 4 (Random):</strong> Generated entirely from cryptographically secure random bytes (high entropy). This is the most common version used today for file IDs, transaction tokens, and general key parameters.
              </li>
              <li>
                <strong>Version 7 (Unix Epoch Sortable):</strong> The modern standard for databases. It encodes a 48-bit Unix timestamp at the start of the ID, followed by random bits. Since they are chronologically sortable, they maintain B-tree index performance in SQL/NoSQL databases like PostgreSQL and MySQL, preventing the index fragmentation caused by V4.
              </li>
              <li>
                <strong>Version 1 (Time & Node based):</strong> Created using a combination of the system's MAC address and a high-precision Gregorian epoch timestamp. Less common now due to privacy concerns regarding host identification, but still widely used in legacy systems.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Collision Safety & Entropy</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              To put UUID v4 collision statistics into perspective: if you generated 1 billion UUIDs every single second for the next 100 years, the probability of creating a single duplicate identifier is about 50%. The math is incredibly secure. By using standard browser-level cryptographic methods (<code>window.crypto.getRandomValues</code>), our generator secures absolute randomness directly on your local CPU.
            </p>
          </div>

          <FAQSection faqs={meta.faqs} />

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Related Developer Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>
                <Link href="/password-generator" className="text-brand underline hover:text-brand-hover">
                  Strong Password Generator
                </Link>
              </li>
              <li>
                <Link href="/jwt-decoder" className="text-brand underline hover:text-brand-hover">
                  JWT Payload Decoder
                </Link>
              </li>
              <li>
                <Link href="/url-encoder-decoder" className="text-brand underline hover:text-brand-hover">
                  URL Percent Encoder / Decoder
                </Link>
              </li>
              <li>
                <Link href="/json-formatter" className="text-brand underline hover:text-brand-hover">
                  JSON Formatter & Validator
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
