import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/visiting-card-generator/meta';
import VisitingCardGenerator from '@/tools/visiting-card-generator/VisitingCardGenerator';
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
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${meta.canonical}`,
    images: [{ url: meta.ogImage ?? '/og-default.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

export default function VisitingCardGeneratorPage(): React.ReactElement {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
      />

      <main className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6">
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />

        <VisitingCardGenerator />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="tool-panel mx-auto mt-16 max-w-4xl space-y-5 text-sm text-muted">
          <h2 className="text-2xl font-bold text-text">Free Online Visiting Card Generator</h2>
          <p className="leading-relaxed">
            Create a polished business card in minutes without Photoshop or expensive design
            software. Our visiting card generator offers 12 professionally designed templates
            covering styles from minimal and corporate to creative and tech-focused. Every template
            supports full customization — pick your brand colors, choose from five font families,
            and optionally layer a background image behind your card content.
          </p>

          <h3 className="text-xl font-semibold text-text">How to Use This Business Card Maker</h3>
          <ol className="list-decimal space-y-2 pl-5 leading-relaxed">
            <li>
              Open the <strong>Content</strong> tab and fill in your name, job title, company, and
              contact details. Add custom fields for LinkedIn, portfolio links, or any extra info.
            </li>
            <li>
              Switch to the <strong>Design</strong> tab to pick a template, set colors and fonts,
              and upload an optional background image with adjustable opacity.
            </li>
            <li>
              Optionally enable <strong>Image on Card</strong> to add a logo or headshot. Drag it
              on the live preview to reposition, and pull the corner handle to resize.
            </li>
            <li>
              Click <strong>Download PDF</strong> for a print-ready file at exact 3.5&quot; ×
              2&quot; size — best for print shops. Use <strong>Print</strong> for home printers, or
              <strong> PNG</strong> for digital sharing.
            </li>
            <li>
              For home printing, use <strong>Download A4 Sheet PDF</strong> or <strong>Print
              Sheet</strong> to get 10 identical cards on one A4 page. Cut along the dashed guides
              after printing.
            </li>
          </ol>

          <h3 className="text-xl font-semibold text-text">Frequently Asked Questions</h3>
          {meta.faqs?.map((faq) => (
            <div key={faq.question}>
              <h4 className="font-medium text-text">{faq.question}</h4>
              <p className="leading-relaxed">{faq.answer}</p>
            </div>
          ))}

          <h3 className="text-xl font-semibold text-text">Related Tools</h3>
          <ul className="list-none space-y-2">
            <li>
              <Link href="/resume-builder" className="text-brand underline-offset-4 hover:underline">
                → Resume Builder
              </Link>
            </li>
            <li>
              <Link
                href="/invoice-generator"
                className="text-brand underline-offset-4 hover:underline"
              >
                → Invoice Generator
              </Link>
            </li>
            <li>
              <Link href="/qr-code-generator" className="text-brand underline-offset-4 hover:underline">
                → QR Code Generator
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}