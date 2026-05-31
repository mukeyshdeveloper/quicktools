import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import JwtDecoder from '@/tools/jwt-decoder/JwtDecoder';
import { meta } from '@/tools/jwt-decoder/meta';

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

export default function JwtDecoderPage() {
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
            JWT Decoder
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">
            {meta.description}
          </p>
        </div>

        <JwtDecoder />

        {/* SEO Content */}
        <section className="prose-section mt-16 max-w-3xl">
          <h2>What is a JSON Web Token (JWT)?</h2>
          <p>
            A JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained
            way for securely transmitting information between parties as a JSON object. This information can be
            verified and trusted because it is digitally signed using a secret (with the HMAC algorithm) or
            a public/private key pair using RSA or ECDSA.
          </p>

          <h2>How does this tool work?</h2>
          <p>
            A JWT consists of three parts separated by dots (<code>.</code>): the Header, the Payload, and the
            Signature. This tool takes your encoded JWT string, splits it, and base64-decodes the Header and
            Payload so you can inspect the JSON claims within. It automatically formats timestamps (like
            <code>iat</code> or <code>exp</code>) into human-readable dates and tells you if the token has expired.
          </p>

          <h2>Security & Privacy</h2>
          <p>
            <strong>We do not log your tokens.</strong> This tool runs entirely in your browser using JavaScript.
            Your JWT is never transmitted over the internet to our servers. However, remember that standard JWT
            payloads are only encoded, not encrypted. You should never store highly sensitive information (like
            passwords) inside a JWT payload.
          </p>

          <h2>Related Tools</h2>
          <ul>
            <li><Link href="/base64-encoder-decoder">Base64 Encoder / Decoder</Link></li>
            <li><Link href="/json-formatter">JSON Formatter</Link></li>
            <li><Link href="/qr-code-generator">QR Code Generator</Link></li>
          </ul>
        </section>
      </>
    );
  }
