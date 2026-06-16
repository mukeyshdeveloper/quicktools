import type { Metadata } from 'next'
import Link from 'next/link'
import { meta } from '@/tools/json-formatter/meta'
import JsonFormatter from '@/tools/json-formatter/JsonFormatter'
import AdBanner from '@/components/layout/AdBanner'
import { generateToolSchema } from '@/lib/schema'
import FAQSection from '@/components/ui/FAQSection'

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: meta.canonical },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${meta.canonical}`,
    images: [{ url: meta.ogImage ?? '/og-default.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
}

export default function JsonFormatterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <div className="mb-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Developer Tool</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
          JSON Formatter & Validator
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted sm:text-base">{meta.description}</p>
      </div>

      <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

      <JsonFormatter />

      <section className="prose-section mt-12 max-w-3xl">
          <h2>Why Use Our JSON Formatter?</h2>
          <p>
            JSON is the standard data format for modern APIs and configuration. When responses arrive minified as one giant line, they become nearly impossible to understand. Our tool instantly beautifies JSON with proper indentation and structure.
          </p>

          <h2>Powerful Features</h2>
          <ul>
            <li>One-click beautify and minify toggle</li>
            <li>Real-time syntax validation with clear error locations</li>
            <li>Collapsible tree view for large nested objects</li>
            <li>Copy to clipboard and download as .json file</li>
          </ul>

          <h2>Maximum Privacy</h2>
          <p>
            Everything runs 100% in your browser. Your API responses, tokens, and data are never sent anywhere — perfect for sensitive or production data.
          </p>

          <h2>Common Use Cases</h2>
          <ul>
            <li>Debugging API responses from curl, Postman, or browser dev tools</li>
            <li>Cleaning minified JSON from logs and error reports</li>
            <li>Making configuration files human-readable before committing</li>
            <li>Validating structure before sending requests</li>
          </ul>

          <FAQSection faqs={meta.faqs} />

          <div className="pt-8 border-t border-border mt-12">
            <h2>Related Developer Tools</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><Link href="/jwt-decoder">JWT Decoder</Link></li>
            <li><Link href="/base64-encoder-decoder">Base64 Encoder / Decoder</Link></li>
            <li><Link href="/diff-checker">Diff Checker</Link></li>
          </ul>
          </div>
        </section>
      </>
    );
  }

