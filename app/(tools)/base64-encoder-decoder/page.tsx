import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import Base64EncoderDecoder from '@/tools/base64-encoder-decoder/Base64EncoderDecoder';
import { meta } from '@/tools/base64-encoder-decoder/meta';

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

export default function Base64EncoderDecoderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
        />

        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Developer Tool
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Base64 Encoder & Decoder
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">
            {meta.description}
          </p>
        </div>

        <Base64EncoderDecoder />

        {/* SEO Content */}
        <section className="prose-section mt-16 max-w-3xl">
          <h2>What is Base64 Encoding?</h2>
          <p>
            Base64 is an encoding algorithm that translates any characters, binary data, or even images into a
            readable string format consisting of 64 characters (A-Z, a-z, 0-9, +, and /). It is commonly used
            in programming and web development to transmit data across networks without corruption, embed images
            directly into CSS or HTML, or securely send credentials in Basic HTTP Authentication.
          </p>

          <h2>How to use this tool</h2>
          <p>
            Simply paste your text or click <strong>Encode File</strong> to upload an image or document.
            The tool will instantly convert your input. You can easily toggle between <strong>Encode</strong>
            and <strong>Decode</strong> modes, or swap the inputs with the middle button.
          </p>
          <p>
            If you need the output for a URL or filename, switch from <strong>Standard</strong> to
            <strong> URL-Safe</strong> mode. This replaces the <code>+</code> and <code>/</code> characters
            with <code>-</code> and <code>_</code> respectively, preventing URL parsing errors.
          </p>

          <h2>Is my data secure?</h2>
          <p>
            Yes. This tool runs <strong>100% locally in your browser</strong>. Your input text and files are
            never sent to a server. We use the browser&rsquo;s native <code>btoa()</code> and <code>atob()</code>
            functions, meaning your sensitive API keys, passwords, and data stay completely private.
          </p>

          <h2>Related Tools</h2>
          <ul>
            <li><Link href="/jwt-decoder">JWT Decoder</Link></li>
            <li><Link href="/json-formatter">JSON Formatter</Link></li>
            <li><Link href="/diff-checker">Diff Checker</Link></li>
          </ul>
        </section>
      </>
    );
  }
