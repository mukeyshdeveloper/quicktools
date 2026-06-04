import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/jwt-encoder/meta';
import JwtEncoder from '@/tools/jwt-encoder/JwtEncoder';
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

export default function JwtEncoderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Developer Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            JWT Encoder
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <JwtEncoder />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>Creating JWTs During Development</h2>
          <p>
            JWTs are everywhere in modern APIs and single-page applications. Being able to quickly craft a token with specific claims (exp, sub, roles, etc.) is invaluable when testing authorization logic, mocking user sessions, or debugging why a token is being rejected.
          </p>

          <h2>Security Note</h2>
          <p>
            Only use this tool with secrets you are comfortable exposing in a browser tab. For real production tokens, always generate them on a secure backend using environment variables and proper key management. This encoder is intended for development, testing, and learning.
          </p>

          <div className="pt-4 border-t border-border">
            <h2>Related Developer Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/jwt-decoder" className="text-brand underline">JWT Decoder</Link> (the companion tool)</li>
              <li><Link href="/hash-generator" className="text-brand underline">Hash Generator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
