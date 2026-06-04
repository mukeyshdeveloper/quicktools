import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/gitignore-generator/meta';
import GitignoreGenerator from '@/tools/gitignore-generator/GitignoreGenerator';
import AdBanner from '@/components/layout/AdBanner';
import { generateToolSchema } from '@/lib/schema';

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

export default function GitignoreGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Developer Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Git Ignore Generator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <GitignoreGenerator />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Never Commit the Wrong Files Again</h2>
          <p>
            A good .gitignore is the first line of defense against accidentally checking in node_modules, build artifacts, IDE metadata, OS files, and secrets. This generator gives you battle-tested patterns for dozens of languages and frameworks plus an easy way to add your own project-specific rules.
          </p>

          <h2>How to Use</h2>
          <ul>
            <li>Click quick preset groups (Web, Mobile, Backend...) or search and toggle individual templates.</li>
            <li>Add any extra patterns in the custom box (logs, local secrets, generated docs, etc).</li>
            <li>Copy or download the merged, deduplicated .gitignore and place it in your repo root.</li>
            <li>Re-run later when you add new tools/languages to the project — it will intelligently merge.</li>
          </ul>

          <h2>Pro Tips</h2>
          <ul>
            <li>Start with OS + Editor templates on every repo (macOS/Windows + VS Code or IntelliJ).</li>
            <li>For monorepos, combine multiple backend/frontend templates and use path prefixes where needed.</li>
            <li>After adding a .gitignore, run <code>git rm -r --cached .</code> then <code>git add .</code> to clean already-tracked junk (carefully).</li>
          </ul>

          <div className="pt-4 border-t border-border">
            <h2>Related Developer Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/api-response-mock-generator" className="text-brand underline">API Response Mock Generator</Link></li>
              <li><Link href="/code-minifier" className="text-brand underline">Code Minifier</Link></li>
              <li><Link href="/hash-generator" className="text-brand underline">Hash Generator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
