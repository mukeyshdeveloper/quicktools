import type { Metadata } from 'next';
import Link from 'next/link';
import { generateWebPageSchema } from '@/lib/schema';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free Developer Tools – JSON, SQL, Regex, Timestamps, Gitignore & More',
  description:
    'Essential free developer utilities. Format JSON & SQL, generate mocks & regex from examples, convert timestamps across zones, optimize base64 images, create .gitignore files. All run 100% in your browser.',
  alternates: { canonical: '/developer-tools' },
};

const devTools = [
  { href: '/json-formatter', name: 'JSON Formatter', desc: 'Beautify, minify, and validate JSON with error highlighting.' },
  { href: '/base64-encoder-decoder', name: 'Base64 Encoder / Decoder', desc: 'Convert text and files to and from Base64.' },
  { href: '/jwt-decoder', name: 'JWT Decoder', desc: 'Decode and inspect JSON Web Tokens instantly.' },
  { href: '/jwt-encoder', name: 'JWT Encoder', desc: 'Create and sign valid JSON Web Tokens (HS256/384/512).' },
  { href: '/regex-tester', name: 'Regex Tester', desc: 'Test regular expressions with live match highlighting.' },
  { href: '/regex-generator', name: 'Regex Generator', desc: 'Generate accurate patterns from positive & negative examples.' },
  { href: '/hash-generator', name: 'Hash Generator', desc: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes for text and files.' },
  { href: '/color-contrast-checker', name: 'Color Contrast Checker', desc: 'Check WCAG AA/AAA contrast compliance with live preview.' },
  { href: '/code-minifier', name: 'Code Minifier', desc: 'Minify JavaScript, CSS, and HTML.' },
  { href: '/sql-formatter-minifier', name: 'SQL Formatter & Minifier', desc: 'Beautify or compress SQL queries with dialect hints.' },
  { href: '/api-response-mock-generator', name: 'API Response Mock Generator', desc: 'Realistic mock JSON + ready-to-use fetch/curl/axios snippets.' },
  { href: '/timestamp-converter', name: 'Timestamp Converter', desc: 'Unix, ISO, human readable + 15+ timezones with live now.' },
  { href: '/base64-image-optimizer', name: 'Base64 Image Optimizer', desc: 'Resize, compress and re-encode base64 images for the web.' },
  { href: '/gitignore-generator', name: 'Git Ignore Generator', desc: 'Curated .gitignore templates for 30+ languages & frameworks.' },
  { href: '/uuid-generator', name: 'UUID Generator', desc: 'Generate secure random UUIDs (v4).' },
  { href: '/url-encoder-decoder', name: 'URL Encoder / Decoder', desc: 'Encode and decode URL components safely.' },
  { href: '/css-generator', name: 'CSS Generator', desc: 'Generate common CSS snippets visually.' },
];

export default function DeveloperToolsPage() {
  const schema = generateWebPageSchema({
    title: 'Free Developer Tools',
    description: metadata.description || '',
    url: '/developer-tools',
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="min-h-screen bg-background text-text">
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <div className="mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">For Developers</p>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Free Developer Tools</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Fast, private utilities that every developer uses daily — JSON, SQL, regex, timestamps, mocks, gitignore, and more. Everything runs locally in your browser.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {devTools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group rounded-2xl border border-border bg-card p-6 transition hover:border-brand">
                <h2 className="text-xl font-semibold group-hover:text-brand">{tool.name}</h2>
                <p className="mt-2 text-sm text-muted">{tool.desc}</p>
              </Link>
            ))}
          </div>

          <section className="prose-section mt-16">
            <h2>Built for Speed and Privacy</h2>
            <p>
              Every developer tool on QuickUtils runs entirely in your browser. Paste sensitive tokens,
              JSON payloads, regex, or base64 images without worrying about them being stored or transmitted.
              New additions include realistic API mocking, powerful SQL formatting, example-driven regex, full timestamp conversion, base64 image optimization, and a rich gitignore builder.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
