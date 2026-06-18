import type { Metadata } from 'next';
import Link from 'next/link';
import { generateToolSchema } from '@/lib/schema';
import CssGenerator from '@/tools/css-generator/CssGenerator';
import { meta } from '@/tools/css-generator/meta';
import { absoluteUrl } from '@/lib/site';
import FAQSection from '@/components/ui/FAQSection';

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

export default function CssGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Developer Tool</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            CSS Box-Shadow & Gradient Generator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">{meta.description}</p>
        </div>

        <CssGenerator />

        <section className="prose-section mt-16 max-w-3xl">
          <h2>About this CSS Generator</h2>
          <p>
            This visual CSS tool lets you craft production-ready CSS without writing any code. Instead of 
            memorizing complex syntax, you simply drag sliders and pick colors to build exactly what you 
            need in real-time.
          </p>

          <h2>Box Shadow Generator</h2>
          <p>
            The CSS <code>box-shadow</code> property adds shadow effects around an element's frame. Our 
            generator supports multiple stacked shadow layers for rich, realistic effects like neumorphism 
            and material shadows. Each layer has full control over X and Y offset, blur radius, spread 
            radius, color, opacity, and the inset property.
          </p>

          <h2>CSS Gradient Generator</h2>
          <p>
            Generates <strong>linear</strong>, <strong>radial</strong>, and <strong>conic</strong> CSS 
            gradients. Use the Presets to get a beautiful starting point, or build your own multi-stop 
            gradient from scratch. Adjust the angle and color stop positions with precision sliders.
          </p>

          <FAQSection faqs={meta.faqs} />

          <h2>Related Tools</h2>
          <ul>
            <li><Link href="/color-picker">Color Picker</Link></li>
            <li><Link href="/color-palette-extractor">Color Palette Extractor</Link></li>
            <li><Link href="/regex-tester">Regex Tester</Link></li>
            <li><Link href="/base64-encoder-decoder">Base64 Encoder / Decoder</Link></li>
          </ul>
        </section>
      </>
    );
  }
