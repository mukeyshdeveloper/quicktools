import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import PasswordGenerator from '@/tools/password-generator/PasswordGenerator';
import { meta } from '@/tools/password-generator/meta';
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

export default function PasswordGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <div className="mb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
          Free security tool
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
          Password Generator
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
          {meta.description}
        </p>
      </div>

        <PasswordGenerator />

        <section className="prose-section mt-12 max-w-3xl">
          <h2>How to Use the Password Generator</h2>
          <p>
            Choose length and character types, then generate. The strength meter updates live. All generation happens locally in your browser.
          </p>

          <FAQSection faqs={meta.faqs} />

          <div className="pt-8 border-t border-border mt-12">
            <h2>Related Tools</h2>
          <ul className="list-disc pl-5">
            <li><Link href="/hash-generator">Hash Generator</Link></li>
            <li><Link href="/qr-code-generator">QR Code Generator</Link></li>
            <li><Link href="/uuid-generator">UUID Generator</Link></li>
          </ul>
          </div>
        </section>
      </>
    );
  }
