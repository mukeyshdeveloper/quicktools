import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/meme-generator/meta';
import MemeGenerator from '@/tools/meme-generator/MemeGenerator';
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

export default function MemeGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Image Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Meme Text Generator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8" />
        <MemeGenerator />
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12" />

        <section className="prose-section mt-16 max-w-4xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-text">How to Create a Meme</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Upload any image from your device. Once uploaded, use the text boxes on the left to add classic top and bottom text. The text will automatically scale and wrap to fit your image, using the legendary white "Impact" font with a black border that has defined meme culture for over a decade.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-text">100% Private Processing</h2>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Unlike many online meme generators that upload your personal photos to their servers, our Meme Text Generator uses the HTML5 Canvas API to render the text directly over your image inside your own web browser. Your images never leave your computer.
            </p>
          </div>
          <div className="pt-4 border-t border-border">
            <h2 className="text-xl font-bold text-text">Related Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/image-compressor" className="text-brand underline">Image Compressor</Link></li>
              <li><Link href="/color-palette-extractor" className="text-brand underline">Color Palette Extractor</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
