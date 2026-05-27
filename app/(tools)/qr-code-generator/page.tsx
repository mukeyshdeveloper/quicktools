import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { generateToolSchema } from '@/lib/schema';
import QrCodeGenerator from '@/tools/qr-code-generator/QrCodeGenerator';
import { meta } from '@/tools/qr-code-generator/meta';

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
        alt: 'QR Code Generator by QuickUtils',
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

export default function QrCodeGeneratorPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateToolSchema(meta)),
          }}
        />

        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Free QR tool
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            QR Code Generator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
            {meta.description}
          </p>
        </div>

        <QrCodeGenerator />

        <section className="prose-section mt-12">
          <h2>How to Use the QR Code Generator</h2>
          <p>
            QuickUtils QR Code Generator creates QR codes for websites, plain
            text, emails, phone numbers, SMS messages, Wi-Fi networks, and
            contact cards. Choose a content type, fill in the fields, and the
            preview updates automatically. You can adjust size, quiet zone,
            error correction, and colors before downloading.
          </p>
          <p>
            PNG is useful for documents, posters, and quick sharing. SVG is best
            for print, design tools, and layouts that need crisp scaling. For
            best scanning reliability, keep high contrast between foreground and
            background colors and test the final QR code with a phone camera.
          </p>

          <h2>Frequently Asked Questions</h2>
          <h3>Which error correction level should I choose?</h3>
          <p>
            Medium works well for most digital QR codes. Choose High if the QR
            code may be printed, handled, or placed in a design where small
            marks or damage could affect scanning.
          </p>
          <h3>Can I make a Wi-Fi QR code?</h3>
          <p>
            Yes. Select Wi-Fi, enter the network name, password, encryption
            type, and hidden-network option if needed. The generated QR code can
            help guests connect faster.
          </p>

          <h2>Related Tools</h2>
          <ul>
            <li>
              <Link href="/password-generator">Password Generator</Link>
            </li>
            <li>
              <Link href="/color-picker">Color Picker</Link>
            </li>
            <li>
              <Link href="/json-formatter">JSON Formatter</Link>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
