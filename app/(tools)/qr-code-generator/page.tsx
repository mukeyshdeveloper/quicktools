import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import QrCodeGenerator from '@/tools/qr-code-generator/QrCodeGenerator';
import { meta } from '@/tools/qr-code-generator/meta';
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

export default function QrCodeGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <div className="mb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
          Free QR tool
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
          QR Code Generator
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
          {meta.description}
        </p>
      </div>

        <QrCodeGenerator />

        <section className="prose-section mt-12">
          <h2>How to Use the QR Code Generator</h2>
          <p>
            Choose content type (URL, Wi-Fi, vCard, etc.), fill the fields, customize appearance, then download PNG or SVG.
          </p>

          <h2>Frequently Asked Questions</h2>
          {meta.faqs?.map((faq, i) => (
            <div key={i}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}

          <h2>Related Tools</h2>
          <ul className="list-disc pl-5">
            <li><Link href="/password-generator">Password Generator</Link></li>
            <li><Link href="/base64-encoder-decoder">Base64 Encoder</Link></li>
            <li><Link href="/favicon-generator">Favicon Generator</Link></li>
          </ul>
        </section>
      </>
    );
  }
