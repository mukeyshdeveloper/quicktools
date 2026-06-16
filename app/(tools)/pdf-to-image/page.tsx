import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/pdf-to-image/meta';
import PdfToImage from '@/tools/pdf-to-image/PdfToImage';
import AdBanner from '@/components/layout/AdBanner';
import { generateToolSchema } from '@/lib/schema';
import FAQSection from '@/components/ui/FAQSection';

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

export default function PdfToImagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8 print:hidden">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Developer Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            PDF &amp; Word to Image Converter
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8 print:hidden" />

        <PdfToImage />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12 print:hidden" />

        <section className="prose-section mt-16 max-w-3xl print:hidden">
          <h2>Convert PDF and Word (.docx) Pages to High-Quality Images Offline</h2>
          <p>
            Whether you need to extract individual pages from a PDF report, convert Word document pages into slides for a presentation, use document visuals in design tools, or share page screenshots on social media, the PDF &amp; Word to Image Converter helps you convert document pages to clean PNG or JPEG images in seconds.
          </p>
          <p>
            The entire conversion process is 100% offline. The tool runs locally in your web browser utilizing client-side javascript engines (like PDF.js, docx-preview, and html2canvas), meaning your files are never uploaded to any external servers. This provides maximum privacy and security, making the tool ideal for handling sensitive documents, bank statements, personal contracts, or medical history files.
          </p>

          <h2>Key Features &amp; Options</h2>
          <ul>
            <li><strong>Flexible Image Formats</strong>: Choose between lossless PNG (best for text documents and diagrams) and JPEG (best for images and photographs, with adjustable quality compression).</li>
            <li><strong>Adjustable Resolution / Scale</strong>: Control the output dimension with resolution scaling up to 3x. Use 1.0x for quick web previews, 2.0x for standard sharing, or 3.0x for ultra-sharp high-definition and print-ready needs.</li>
            <li><strong>Interactive Live Previews</strong>: View each converted page in a structured visual grid before downloading, complete with exact output dimensions.</li>
            <li><strong>Batch &amp; Individual Downloads</strong>: Download specific converted pages one-by-one or download all page images in a sequential download flow.</li>
          </ul>

          <h2>How to Convert PDF &amp; Word Documents to Images</h2>
          <ol className="list-decimal pl-5">
            <li>Drag and drop your PDF or Word (.docx) file onto the designated upload box or click to select a file from your device.</li>
            <li>Choose your preferred output format: PNG for lossless quality, or JPEG with custom quality parameters.</li>
            <li>Select your desired resolution multiplier (e.g., 2.0x is standard and recommended).</li>
            <li>Click the "Convert to Images" button. The conversion process will render each page in your browser.</li>
            <li>Review the rendered page thumbnails in the grid below, then download individual pages or save all images sequentially.</li>
          </ol>

          <FAQSection faqs={meta.faqs} />

          <div className="pt-8 border-t border-border mt-12">
            <h2>Related PDF &amp; Image Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/images-to-pdf" className="text-brand underline">Images to PDF Generator</Link></li>
              <li><Link href="/base64-to-image" className="text-brand underline">Base64 to Image Converter</Link></li>
              <li><Link href="/image-compressor" className="text-brand underline">Image Compressor</Link></li>
              <li><Link href="/image-converter" className="text-brand underline">Image Format Converter</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
