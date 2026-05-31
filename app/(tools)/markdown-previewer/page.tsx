import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import MarkdownPreviewer from '@/tools/markdown-previewer/MarkdownPreviewer';
import { meta } from '@/tools/markdown-previewer/meta';
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
  twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
};

export default function MarkdownPreviewerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Developer Tool</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Markdown to HTML Previewer
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">{meta.description}</p>
        </div>

        <MarkdownPreviewer />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>What is Markdown?</h2>
          <p>
            Markdown is a lightweight markup language created by John Gruber in 2004. It uses plain text 
            formatting syntax that is easy to read and write, and can be converted to structurally valid 
            HTML. Markdown is used everywhere — from README files on GitHub, to blog posts, documentation 
            sites, note-taking apps, and much more.
          </p>

          <h2>GitHub Flavored Markdown (GFM)</h2>
          <p>
            This previewer supports GitHub Flavored Markdown (GFM), which extends the original Markdown 
            spec with features like tables, strikethrough text (<code>~~like this~~</code>), task lists 
            (<code>- [x] done</code>), and fenced code blocks with language identifiers.
          </p>

          <h2>How to Use this Previewer</h2>
          <p>
            Simply type or paste your Markdown into the left editor panel. The right panel updates in 
            real-time as you type. When you are happy with the result, use the <strong>Copy HTML</strong> 
            button to grab the rendered output, or <strong>Export .html</strong> to download a complete, 
            self-contained HTML file with inline styles ready for embedding.
          </p>

          <h2>Is my content saved?</h2>
          <p>
            Your Markdown is processed 100% in your browser. We do not store or transmit your content. 
            If you reload the page, the content will reset to the default example.
          </p>

          <h2>Related Tools</h2>
          <ul>
            <li><Link href="/diff-checker">Diff Checker</Link></li>
            <li><Link href="/word-counter">Word Counter</Link></li>
            <li><Link href="/case-converter">Case Converter</Link></li>
          </ul>
        </section>
      </>
    );
  }
