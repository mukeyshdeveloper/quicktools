import type { Metadata } from 'next';
import Link from 'next/link';
import { meta } from '@/tools/images-to-pdf/meta';
import ImagesToPdf from '@/tools/images-to-pdf/ImagesToPdf';
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

export default function ImagesToPdfPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateToolSchema(meta)) }} />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8 print:hidden">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">Image Tools</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Images to PDF Generator
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted max-w-2xl">{meta.description}</p>
        </div>

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_TOP!} className="mb-8 print:hidden" />

        <ImagesToPdf />

        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BOTTOM!} className="mt-12 print:hidden" />

        <section className="prose-section mt-16 max-w-3xl print:hidden">
          <h2>Turn Photos into Professional PDFs — With Complete Control</h2>
          <p>
            Whether you are archiving receipts for taxes, building a client portfolio, preparing a product catalog, bundling screenshots for a bug report, or creating a simple family photo book, Images to PDF Generator gives you a private, powerful way to combine any number of images into one clean, print-ready PDF.
          </p>
          <p>
            Everything happens in your browser. No uploads, no accounts, no watermarks, and no size limits beyond what your device can handle. The final PDF is generated using your browser’s own high-quality print engine, so output is consistent across operating systems and looks exactly like the live preview.
          </p>

          <h2>Available Options</h2>
          <ul>
            <li><strong>Page Size</strong>: A4, US Letter, Legal, A5 — or keep the sensible defaults</li>
            <li><strong>Orientation</strong>: Portrait or Landscape per document</li>
            <li><strong>Columns</strong>: Lay out 1, 2 or 3 images side-by-side on each page (great for contact sheets or comparison docs)</li>
            <li><strong>Image Fit</strong>: Contain (letterbox with background), Cover (fill &amp; crop), or Stretch</li>
            <li><strong>Margins &amp; Background</strong>: Fine-tune whitespace and pick any solid color (white, cream, black for dark images)</li>
            <li><strong>Per-image Rotation</strong>: Rotate any photo 90° left or right directly in the list — fixes sideways phone shots without editing originals</li>
            <li><strong>Title Page</strong>: Optional first page with your own title and subtitle (perfect for client deliverables or reports)</li>
            <li><strong>Filename Captions</strong>: Show the original file name under every image for traceability</li>
            <li><strong>Page Numbers</strong>: Optional (off by default) — placed cleanly in the page margin so they never overlay your images</li>
            <li><strong>Quality Slider</strong>: 100% keeps full resolution; 70–80% typically produces 3–6× smaller PDFs while remaining perfectly readable for documents and photos</li>
            <li><strong>Filename Template</strong>: Live preview of the suggested name using {'{date}'} and {'{count}'} tokens</li>
          </ul>

          <h2>How to Use</h2>
          <ol className="list-decimal pl-5">
            <li>Drop or select one or more images (JPG, PNG, WebP, GIF all work).</li>
            <li>Reorder with drag handles or arrow buttons; rotate any image that came in sideways.</li>
            <li>Toggle title page, choose columns, set quality, add captions — the visual preview updates instantly.</li>
            <li>Click “Print / Save as PDF”. In the system print dialog choose “Save as PDF” (or Microsoft Print to PDF on Windows). Name the file or use the suggested name shown in the tool.</li>
          </ol>
          <p className="text-sm text-muted">
            The order you set in the list becomes the reading order left-to-right, top-to-bottom within each multi-column page.
          </p>

          <h2>Real-World Use Cases</h2>
          <p>
            Expense reports: scan or photograph every receipt, rotate the ones that are sideways, add a title page “Q3 2026 Travel — Mukesh”, set two columns and 75% quality, and email a single tidy PDF to finance.
          </p>
          <p>
            Design portfolios: a photographer or illustrator can drop 30–60 images, use 2-column layout on A4 landscape for contact sheets, or 1-column full-bleed for hero spreads, then add a subtle title page with project name and date.
          </p>
          <p>
            Legal &amp; compliance packs: bundle before/after photos, signed forms and site images. Captions make every file name visible so reviewers can trace originals. Rotation fixes the inevitable phone photos.
          </p>
          <p>
            Because processing is 100% local, you can safely use this for sensitive documents — medical records, ID scans, legal exhibits — without ever sending pixels to a server.
          </p>

          <div className="pt-4 border-t border-border">
            <h2>Related Image Tools</h2>
            <ul className="list-disc pl-5 mt-2 text-sm text-muted space-y-1">
              <li><Link href="/image-compressor" className="text-brand underline">Image Compressor</Link></li>
              <li><Link href="/bulk-image-resizer" className="text-brand underline">Bulk Image Resizer</Link></li>
              <li><Link href="/image-watermark" className="text-brand underline">Image Watermark Tool</Link></li>
              <li><Link href="/image-converter" className="text-brand underline">Image Format Converter</Link></li>
              <li><Link href="/mockup-generator" className="text-brand underline">Mockup Generator</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
