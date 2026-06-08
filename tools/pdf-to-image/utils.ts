export interface PdfJsViewport {
  width: number;
  height: number;
}

export interface PdfJsPage {
  getViewport: (options: { scale: number }) => PdfJsViewport;
  render: (options: { canvasContext: CanvasRenderingContext2D; viewport: PdfJsViewport }) => {
    promise: Promise<void>;
  };
}

export interface PdfJsDocument {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PdfJsPage>;
}

export interface ConvertedPage {
  pageNumber: number;
  dataUrl: string;
  width: number;
  height: number;
}

/**
 * Converts a specific PDF page into an image (data URL).
 */
export async function convertPdfPageToImage(
  pdfDoc: PdfJsDocument,
  pageNumber: number,
  scale: number,
  format: 'png' | 'jpeg',
  quality: number = 0.92
): Promise<ConvertedPage> {
  const page = await pdfDoc.getPage(pageNumber);
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Could not get 2D canvas context');
  }

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({
    canvasContext: context,
    viewport,
  }).promise;

  const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
  const dataUrl = canvas.toDataURL(mimeType, format === 'png' ? undefined : quality);

  return {
    pageNumber,
    dataUrl,
    width: viewport.width,
    height: viewport.height,
  };
}

/**
 * Triggers a browser download of a data URL.
 */
export function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
