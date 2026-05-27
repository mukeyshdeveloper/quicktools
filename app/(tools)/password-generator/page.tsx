import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { generateToolSchema } from '@/lib/schema';
import PasswordGenerator from '@/tools/password-generator/PasswordGenerator';
import { meta } from '@/tools/password-generator/meta';

const siteUrl: string = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quickutils.in';

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: {
    canonical: meta.canonical,
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${siteUrl}${meta.canonical}`,
    images: [
      {
        url: meta.ogImage ?? '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Password Generator by QuickUtils',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

export default function PasswordGeneratorPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateToolSchema(meta)),
          }}
        />

        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Free security tool
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Password Generator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
            {meta.description}
          </p>
        </div>

        <PasswordGenerator />

        <section className="prose-section mt-12">
          <h2>How to Use the Password Generator</h2>
          <p>
            QuickUtils Password Generator creates strong random passwords in
            your browser. Choose a length, pick the character types you want,
            and use the Generate New button to create a fresh password. You can
            include lowercase letters, uppercase letters, numbers, and symbols,
            or exclude ambiguous characters when you need something easier to
            read and type.
          </p>
          <p>
            The strength meter estimates entropy from the password length and
            available character pool. Longer passwords with more character types
            are harder to guess. Since the generator runs locally, your password
            is not sent to a server or external API.
          </p>

          <h2>Frequently Asked Questions</h2>
          <h3>What makes a strong password?</h3>
          <p>
            A strong password is long, random, and unique. For most accounts,
            use at least 16 characters and avoid reusing the same password on
            multiple websites.
          </p>
          <h3>Should I include symbols?</h3>
          <p>
            Symbols increase the possible character pool and can improve
            strength, but length matters more. If a website blocks symbols, use
            a longer password with letters and numbers.
          </p>

          <h2>Related Tools</h2>
          <ul>
            <li>
              <Link href="/json-formatter">JSON Formatter</Link>
            </li>
            <li>
              <Link href="/word-counter">Word Counter</Link>
            </li>
            <li>
              <Link href="/qr-code-generator">QR Code Generator</Link>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
