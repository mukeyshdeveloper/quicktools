import type { Metadata } from 'next'
import Link from 'next/link'
import { meta } from '@/tools/json-formatter/meta'
import JsonFormatter from '@/tools/json-formatter/JsonFormatter'
import AdBanner from '@/components/layout/AdBanner'
import { generateToolSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: { canonical: meta.canonical },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${meta.canonical}`,
    images: [{ url: meta.ogImage ?? '/og-default.png', width: 1200, height: 630 }],
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

      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          JSON Formatter & Validator
        </h1>
        <p className="mb-8 text-gray-500 dark:text-gray-400">{meta.description}</p>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <JsonFormatter />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-8" />

        <section className="mt-12 space-y-4 text-sm text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            What is a JSON Formatter?
          </h2>
          <p>
            JSON (JavaScript Object Notation) is an incredibly popular data format used to transmit information between servers and web applications. However, unformatted, minified JSON is extremely difficult for humans to read. 
          </p>
          <p>
            Our <strong>Free Online JSON Formatter</strong> automatically parses your raw JSON payload and structures it with proper indentation, line breaks, and formatting, making it incredibly easy to scan, read, and debug.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
            Secure, Private & Offline-Ready
          </h2>
          <p>
            Unlike other tools, our JSON formatter evaluates and processes your data <strong>100% locally in your browser</strong>. Your sensitive API payloads and configuration files are never uploaded to our servers or stored anywhere. This guarantees maximum privacy and security for your development workflow.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
            Built-in JSON Validator
          </h2>
          <p>
            Finding a missing comma or bracket in thousands of lines of JSON can be a nightmare. When you paste your payload into the editor, we immediately validate its syntax. If your JSON is invalid, you will receive a descriptive error message along with the approximate line number where the issue occurred, saving you hours of troubleshooting.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">Related Tools</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><Link href="/color-picker" className="text-brand hover:underline">Color Picker</Link></li>
            <li><Link href="/password-generator" className="text-brand hover:underline">Password Generator</Link></li>
            <li><Link href="/unit-converter" className="text-brand hover:underline">Unit Converter</Link></li>
          </ul>
        </section>
      </main>
    </>
  )
}
