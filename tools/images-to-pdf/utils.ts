export type PageSize = 'A4' | 'Letter' | 'Legal' | 'A5' | 'Custom';
export type FitMode = 'contain' | 'cover' | 'stretch';
export type Orientation = 'portrait' | 'landscape';

export interface PdfOptions {
  pageSize: PageSize;
  orientation: Orientation;
  marginMm: number;
  fitMode: FitMode;
  addPageNumbers: boolean;
  backgroundColor: string;
  titlePage: boolean;
  titleText: string;
  subtitleText: string;
  downscalePercent: number; // 50-100 for image quality in PDF
  columns: 1 | 2 | 3;
  showCaptions: boolean;
  filenameTemplate: string;
}

export const PAGE_SIZES: Record<PageSize, { widthMm: number; heightMm: number; label: string }> = {
  A4: { widthMm: 210, heightMm: 297, label: 'A4 (210×297 mm)' },
  Letter: { widthMm: 216, heightMm: 279, label: 'US Letter (8.5×11 in)' },
  Legal: { widthMm: 216, heightMm: 356, label: 'US Legal (8.5×14 in)' },
  A5: { widthMm: 148, heightMm: 210, label: 'A5 (148×210 mm)' },
  Custom: { widthMm: 210, heightMm: 297, label: 'Custom (same as A4 default)' },
};

export function getPageDimensions(options: PdfOptions): { width: number; height: number } {
  const size = PAGE_SIZES[options.pageSize];
  const w = size.widthMm;
  const h = size.heightMm;
  return options.orientation === 'portrait' ? { width: w, height: h } : { width: h, height: w };
}

export function getPrintableCss(options: PdfOptions): string {
  const { width, height } = getPageDimensions(options);
  const margin = options.marginMm;
  const cols = options.columns || 1;
  return `
    /* Dynamic per-print styles (injected into <head> on trigger).
       Contains the option-dependent @page size + the .pdf-* layout rules.
       Site shell hiding (nav, footer, etc.) is handled by globals.css + print:hidden classes.
    */
    @media print {
      html, body,
      body.pdf-printing {
        margin: 0 !important;
        padding: 0 !important;
        background: #fff !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      .pdf-print-area {
        display: block !important;
        position: static !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        background: transparent !important;
      }
    }

    /* Page size + margins for the PDF output (browser "Save as PDF") */
    @page {
      size: ${width}mm ${height}mm;
      margin: ${margin}mm;
    }

    .pdf-page {
      width: ${width - margin * 2}mm;
      height: ${height - margin * 2}mm;
      margin: 0 auto;
      background: ${options.backgroundColor};
      display: grid;
      grid-template-columns: repeat(${cols}, 1fr);
      gap: 3mm;
      align-items: start;
      justify-items: center;
      position: relative;
      overflow: hidden;
      padding: 2mm;
      box-sizing: border-box;
      page-break-inside: avoid;
    }

    /* Force each "page" block onto its own physical PDF page.
       Using page-break-before on subsequent blocks is more reliable
       than page-break-after and prevents the "title page + blank page + images" problem. */
    .pdf-title-page + .pdf-page,
    .pdf-page + .pdf-page {
      page-break-before: always;
    }

    .pdf-img-cell {
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .pdf-page img {
      max-width: 100%;
      max-height: calc(100% - 10pt);
      object-fit: ${options.fitMode === 'contain' ? 'contain' : options.fitMode === 'cover' ? 'cover' : 'fill'};
      display: block;
      margin: 0 auto;
      transform: rotate(var(--rot, 0deg));
      image-rendering: -webkit-optimize-contrast;
      border: none !important;
      box-shadow: none !important;
    }

    .pdf-caption {
      font-size: 6.5pt;
      line-height: 1.1;
      color: #444;
      margin-top: 1.2mm;
      word-break: break-word;
      font-family: ui-monospace, monospace;
      max-width: 100%;
    }

    /* Page numbers are placed in the margin area (bottom-right of the physical page),
       with a light background so they don't sit directly "on" the image content.
       They only appear if the user explicitly enables the checkbox. */
    .pdf-page-number {
      position: absolute;
      bottom: 2mm;
      right: 3mm;
      font-size: 8pt;
      color: #444;
      font-family: ui-monospace, monospace;
      background: rgba(255,255,255,0.85);
      padding: 1px 4px;
      border-radius: 2px;
      border: 0.5px solid rgba(0,0,0,0.1);
    }

    .pdf-title-page {
      width: ${width - margin * 2}mm;
      height: ${height - margin * 2}mm;
      margin: 0 auto;
      background: ${options.backgroundColor};
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 18mm;
      box-sizing: border-box;
      page-break-inside: avoid;
    }

    .pdf-title-page h1 {
      font-size: 26pt;
      margin-bottom: 6mm;
      color: #111;
      font-weight: 700;
    }

    .pdf-title-page .subtitle {
      font-size: 13pt;
      color: #444;
      margin-bottom: 8mm;
    }

    .pdf-title-page .meta {
      font-size: 9pt;
      color: #666;
      margin-top: 8mm;
    }
  `;
}

/** Group items into chunks for multi-column pages (chunk size = columns) */
export function groupIntoPages<T>(items: T[], columns: number): T[][] {
  const c = Math.max(1, Math.min(3, columns || 1));
  const groups: T[][] = [];
  for (let i = 0; i < items.length; i += c) {
    groups.push(items.slice(i, i + c));
  }
  return groups;
}

/** Compute suggested filename from template, replacing {date} and {count} */
export function computePdfFilename(template: string, count: number, dateInput: Date | string = '2026-01-01'): string {
  const d = typeof dateInput === 'string' ? dateInput : dateInput.toISOString().slice(0, 10);
  const safeTpl = (template && template.trim()) || 'images-{date}-{count}';
  const base = safeTpl.replace(/\{date\}/g, d).replace(/\{count\}/g, String(count));
  const clean = base.replace(/[^a-zA-Z0-9._-]/g, '-').replace(/-+/g, '-');
  return clean.endsWith('.pdf') ? clean : `${clean}.pdf`;
}

/** Downscale a data/blob URL via canvas for smaller PDF output size. percent 50-100 */
export async function downscaleImage(src: string, percent: number): Promise<string> {
  if (!src || percent >= 100) return src;
  const scale = Math.max(0.5, Math.min(1, percent / 100));
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(src);
        return;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, w, h);
      // jpeg for photos (smaller), png for higher fidelity or when quality high
      const useJpeg = percent <= 82;
      const mime = useJpeg ? 'image/jpeg' : 'image/png';
      const q = useJpeg ? Math.max(0.78, percent / 105) : 1.0;
      try {
        resolve(canvas.toDataURL(mime, q));
      } catch {
        resolve(src); // fallback
      }
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
}
