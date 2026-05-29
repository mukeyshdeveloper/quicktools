import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/password-strength-meter/meta';
import PasswordStrengthMeter from '@/tools/password-strength-meter/PasswordStrengthMeter';
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
    images: [{ url: meta.ogImage ?? '/og-default.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
};

export default function PasswordStrengthMeterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Security Tool</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Secure Password Strength Meter
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />
        <PasswordStrengthMeter />
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-text">Is This Safe to Use?</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              <strong>Yes. 100% yes.</strong> This tool processes everything entirely on your own device using client-side JavaScript. Your password is NEVER sent over the internet, stored in a database, or saved in logs. You can even disconnect your internet right now, and the tool will still work perfectly.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-text">How We Calculate Crack Time</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              We calculate the "entropy" (randomness) of your password by looking at its length and the size of the character pool used (lowercase, uppercase, numbers, symbols). We then estimate the crack time assuming a modern offline brute-force attack capable of guessing 10 billion passwords per second.
            </p>
          </div>
          <div className="pt-4 border-t border-border">
            <h2 className="text-xl font-bold text-text">Related Security Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/password-generator" className="text-brand underline">Strong Password Generator</Link></li>
              <li><Link href="/base64-encoder-decoder" className="text-brand underline">Base64 Encoder/Decoder</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
