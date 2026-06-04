import type { Metadata } from 'next';
import Link from 'next/link';
import { generateWebPageSchema } from '@/lib/schema';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free Text Tools – Word Counter, Diff Checker, JSON & Markdown Utilities',
  description:
    'Powerful free text utilities. Word counter, diff checker, JSON formatter, Markdown previewer and more. All tools work offline and privately.',
  alternates: { canonical: '/text-tools' },
};

const textTools = [
  { href: '/word-counter', name: 'Word Counter', desc: 'Count words, characters, sentences and reading time.' },
  { href: '/diff-checker', name: 'Diff Checker', desc: 'Compare two texts and see line-by-line differences.' },
  { href: '/json-formatter', name: 'JSON Formatter', desc: 'Beautify, minify and validate JSON.' },
  { href: '/markdown-previewer', name: 'Markdown Previewer', desc: 'Live preview for Markdown with copy to HTML.' },
];

export default function TextToolsPage() {
  const schema = generateWebPageSchema({
    title: 'Free Text Tools & Utilities',
    description: metadata.description || '',
    url: '/text-tools',
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="min-h-screen bg-background text-text">
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <div className="mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Writing & Content</p>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Free Text Tools</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Essential writing, editing and content analysis tools. All run privately in your browser.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {textTools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group rounded-2xl border border-border bg-card p-6 transition hover:border-brand">
                <h2 className="text-xl font-semibold group-hover:text-brand">{tool.name}</h2>
                <p className="mt-2 text-sm text-muted">{tool.desc}</p>
              </Link>
            ))}
          </div>

          <section className="prose-section mt-16">
            <h2>Write Better, Faster</h2>
            <p>
              Great content starts with clear editing and analysis tools. Our text utilities help you
              meet word counts, improve readability, remove duplicates, and optimize for SEO — all without
              uploading your content anywhere.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
