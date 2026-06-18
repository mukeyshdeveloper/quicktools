import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/api-response-mock-generator/meta';
import ApiResponseMockGenerator from '@/tools/api-response-mock-generator/ApiResponseMockGenerator';
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

export default function ApiResponseMockGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Developer Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            API Response Mock Generator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <ApiResponseMockGenerator />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Why Mock APIs Matter</h2>
          <p>
            Building the frontend against a real backend is slow and brittle during early development. A good mock generator lets you iterate fast, test error states, and validate UI against realistic data shapes without waiting for the backend team or spinning up services. It also helps document expected contracts early and enables parallel work between frontend and backend teams.
          </p>

          <h2>Scenarios Covered</h2>
          <ul>
            <li>Simple resource objects (users, products, orders)</li>
            <li>Nested structures and arrays of objects</li>
            <li>Paginated responses with metadata</li>
            <li>Client and server error bodies with custom status codes</li>
            <li>Reproducible data via seed for tests and demos</li>
          </ul>

          <h2>Best Practices</h2>
          <ul>
            <li>Start with the contract (schema) before any code.</li>
            <li>Use the generated snippets directly in your components or MSW handlers.</li>
            <li>Test both happy paths and error responses early.</li>
            <li>Seed the random data when writing deterministic tests or Storybook stories.</li>
          </ul>

          <FAQSection faqs={meta.faqs} />

          <div className="pt-4 border-t border-border">
            <h2>Related Developer Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/json-formatter" className="text-brand underline">JSON Formatter</Link></li>
              <li><Link href="/jwt-encoder" className="text-brand underline">JWT Encoder</Link></li>
              <li><Link href="/regex-generator" className="text-brand underline">Regex Generator</Link></li>
              <li><Link href="/sql-formatter-minifier" className="text-brand underline">SQL Formatter &amp; Minifier</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
