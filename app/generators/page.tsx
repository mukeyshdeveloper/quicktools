import type { Metadata } from 'next';
import Link from 'next/link';
import { generateWebPageSchema } from '@/lib/schema';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free Online Generators – Password, QR Code, Meme, UUID, Favicon & More',
  description:
    'Powerful free generators for passwords, QR codes, memes, UUIDs, favicons, meta tags, CSS gradients, and lorem ipsum. All tools run 100% in your browser with no signup.',
  alternates: { canonical: '/generators' },
  openGraph: {
    title: 'Free Generators – Password, QR, Meme, UUID & More | QuickUtils',
    description: 'Instant free generators for developers, marketers, and creators. No signup required.',
    url: absoluteUrl('/generators'),
  },
};

const generatorTools = [
  { href: '/password-generator', name: 'Password Generator', desc: 'Create strong, secure passwords with custom length and symbols.' },
  { href: '/qr-code-generator', name: 'QR Code Generator', desc: 'Generate QR codes for URLs, Wi-Fi, vCard, SMS and more.' },
  { href: '/meme-generator', name: 'Meme Generator', desc: 'Add classic Impact text to images and create custom memes.' },
  { href: '/uuid-generator', name: 'UUID Generator', desc: 'Generate secure bulk UUID v4 and v7 identifiers instantly.' },
  { href: '/favicon-generator', name: 'Favicon Generator', desc: 'Convert images to multi-size .ico favicons for websites.' },
  { href: '/meta-tag-generator', name: 'Meta Tag Generator', desc: 'Create SEO meta tags, OpenGraph and Twitter cards with preview.' },
  { href: '/css-generator', name: 'CSS Generator', desc: 'Visually create beautiful box-shadows and CSS gradients.' },
  { href: '/lorem-ipsum-generator', name: 'Lorem Ipsum Generator', desc: 'Generate placeholder text by paragraphs, sentences or words.' },
  { href: '/youtube-thumbnail-downloader', name: 'YouTube Thumbnail Downloader', desc: 'Download HD thumbnails from any YouTube video.' },
];

export default function GeneratorsPage() {
  const schema = generateWebPageSchema({
    title: 'Free Online Generators',
    description: metadata.description || '',
    url: '/generators',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="min-h-screen bg-background text-text">
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <div className="mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
              Quick Generators
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
              Free Online Generators
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Instant generators for passwords, QR codes, memes, UUIDs, favicons, and more. 
              Everything runs in your browser — no signup, no data sent anywhere.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {generatorTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-2xl border border-border bg-card p-6 transition hover:border-brand hover:shadow-sm"
              >
                <h2 className="text-xl font-semibold text-text group-hover:text-brand">
                  {tool.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{tool.desc}</p>
                <span className="mt-4 inline-block text-sm font-medium text-brand">
                  Use generator →
                </span>
              </Link>
            ))}
          </div>

          <section className="prose-section mt-16">
            <h2>Why Use QuickUtils Generators?</h2>
            <p>
              Our generators are built for speed, simplicity, and privacy. Unlike many online tools that require signup or upload your data, everything on QuickUtils runs entirely in your browser. You get instant results without compromising your privacy.
            </p>

            <h3>Popular Use Cases</h3>
            <ul>
              <li>Creating strong, unique passwords for new accounts and services</li>
              <li>Generating QR codes for Wi-Fi networks, business cards, events, or marketing campaigns</li>
              <li>Making quick memes for social media posts and personal use</li>
              <li>Producing secure unique IDs (UUIDs) for databases, APIs, and development projects</li>
              <li>Creating professional favicons and OpenGraph meta tags for websites and apps</li>
              <li>Generating placeholder text (Lorem Ipsum) for design mockups and prototypes</li>
              <li>Downloading high-quality thumbnails from YouTube videos</li>
            </ul>

            <h2>Benefits of Using Our Generators</h2>
            <p>
              All generators are completely free with no watermarks, no limits, and no account required. 
              Because they run locally, they are also much faster than server-based alternatives and 
              work even without an internet connection after the page loads.
            </p>

            <h2>Frequently Asked Questions</h2>
            <h3>Are these generators really free?</h3>
            <p>
              Yes. Every generator on QuickUtils is 100% free to use with no hidden limits, subscriptions, or watermarks.
            </p>

            <h3>Is my data private when using these tools?</h3>
            <p>
              Absolutely. All generation happens locally in your browser using JavaScript. We never upload, store, or have access to anything you create.
            </p>

            <h3>Can I use these for commercial projects?</h3>
            <p>
              Yes. You are free to use anything generated with these tools in personal or commercial projects.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
