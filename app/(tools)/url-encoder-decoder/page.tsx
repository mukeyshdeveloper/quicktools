import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/url-encoder-decoder/meta';
import UrlEncoderDecoder from '@/tools/url-encoder-decoder/UrlEncoderDecoder';
import AdBanner from '@/components/layout/AdBanner';
import { generateToolSchema } from '@/lib/schema';

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
    images: [{ url: meta.ogImage ?? '/og-default.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

export default function UrlEncoderDecoderPage() {
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
            Developer & IT Tool
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            URL Encoder / Decoder & Visual Parser
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">
            {meta.description}
          </p>
        </div>

        {/* Ad above tool */}
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        {/* Interactive Tool Component */}
        <UrlEncoderDecoder />

        {/* Ad below result */}
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        {/* Premium SEO Rich Content Section */}
        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">What is URL Encoding (Percent Encoding)?</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              URL encoding, officially known as percent encoding, is a mechanism used to translate strings of characters into a format that is universally recognized and transmittable across any web browser or server. Since Uniform Resource Locators (URLs) are allowed to contain only a highly restricted set of characters from the standard US-ASCII set, any character outside of this set must be converted.
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              When a character is encoded, it is replaced by one or more character triplets. Each triplet consists of the percent character <code>%</code> followed by two hexadecimal digits that represent the numerical value of the byte. For instance, a space is converted to <code>%20</code>, a question mark becomes <code>%3F</code>, and an ampersand translates to <code>%26</code>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Why Do We Need URL Encoding?</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              URLs use special "reserved characters" to define their structure:
            </p>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li><code>?</code> defines the starting boundary of the query string.</li>
              <li><code>&</code> separates individual key-value query parameters.</li>
              <li><code>=</code> maps a parameter key directly to its value.</li>
              <li><code>#</code> specifies a document anchor (or hash).</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              If your parameter value contains one of these reserved characters (for example, if you want to search for the phrase "HTML & CSS" as a query parameter value), they must be encoded. Failure to encode special characters will cause the web server to incorrectly parse the URL structure, leading to broken page links, missing queries, or invalid inputs.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Visual URL Parameter Builder & Parser</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Standard tools on the internet only offer a simple text box that raw-converts text. Our premium URL Encoder/Decoder features a fully interactive <strong>Visual URL Builder</strong>. When you paste any fully-formed URL or simple query parameter string into the text box, our tool automatically extracts, decodes, and presents the parameters in an organized, beautiful visual grid.
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              You can instantly add new parameter keys and values, modify existing query tokens, update the host or path directories, and delete unneeded keys. The final, perfectly-escaped URL is compiled dynamically in real-time right before your eyes!
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            <div className="mt-3 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Is my data secure on QuickUtils?</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Absolutely. Every calculation, parse, encode, and decode action is conducted 100% locally inside your web browser. We do not use any external APIs or servers, ensuring absolute privacy for sensitive API tokens, client secrets, or private URLs.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">What is the difference between encodeURI and encodeURIComponent?</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  <code>encodeURI</code> is meant to encode a complete, functional URL. It ignores reserved characters like <code>http://</code>, <code>/</code>, and <code>?</code> to preserve the structure. <code>encodeURIComponent</code> is meant to encode individual parameter values, and will convert every special symbol (including slashes and questions) so they can safely sit inside a query parameter without corrupting the parent URL structure.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Related Developer Utilities</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>
                <Link href="/jwt-decoder" className="text-brand underline hover:text-brand-hover">
                  JSON Web Token (JWT) Decoder
                </Link>
              </li>
              <li>
                <Link href="/base64-encoder-decoder" className="text-brand underline hover:text-brand-hover">
                  Base64 String Encoder / Decoder
                </Link>
              </li>
              <li>
                <Link href="/json-formatter" className="text-brand underline hover:text-brand-hover">
                  JSON Formatter & Validator
                </Link>
              </li>
              <li>
                <Link href="/regex-tester" className="text-brand underline hover:text-brand-hover">
                  Regular Expression Matcher
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
