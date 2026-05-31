import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import LoremIpsumGenerator from '@/tools/lorem-ipsum-generator/LoremIpsumGenerator';
import { meta } from '@/tools/lorem-ipsum-generator/meta';

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
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

export default function LoremIpsumGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }}
        />

        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Design Tool
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Lorem Ipsum Generator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">
            {meta.description}
          </p>
        </div>

        <LoremIpsumGenerator />

        {/* SEO Content */}
        <section className="prose-section mt-16 max-w-3xl">
          <h2>What is Lorem Ipsum?</h2>
          <p>
            Lorem Ipsum is dummy text used by the design, typesetting, and printing industry. It is used as
            placeholder text to demonstrate the visual form of a document or web page without relying on
            meaningful content. Using Lorem Ipsum allows designers to focus on typography, layout, and visual
            hierarchy without viewers getting distracted by reading the text.
          </p>

          <h2>Where does it come from?</h2>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
            classical Latin literature from 45 BC, making it over 2000 years old. It comes from sections
            1.10.32 and 1.10.33 of &ldquo;de Finibus Bonorum et Malorum&rdquo; (The Extremes of Good and Evil)
            by Cicero.
          </p>

          <h2>How to use this generator</h2>
          <p>
            Use the controls to select whether you want to generate full paragraphs, individual sentences,
            or specific word counts. Adjust the slider to set the exact amount you need. By default, the
            generated text will start with the classic &ldquo;Lorem ipsum dolor sit amet...&rdquo; but you can
            toggle this off for a more random distribution of text.
          </p>

          <h2>Related Tools</h2>
          <ul>
            <li><Link href="/case-converter">Case Converter</Link></li>
            <li><Link href="/color-picker">Color Picker</Link></li>
            <li><Link href="/word-counter">Word Counter</Link></li>
          </ul>
        </section>
      </>
    );
  }
