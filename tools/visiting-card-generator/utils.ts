export const CARD_WIDTH = 350;
export const CARD_HEIGHT = 200;
export const CARD_EXPORT_SCALE = 3;

/** Standard US business card dimensions */
export const CARD_WIDTH_IN = 3.5;
export const CARD_HEIGHT_IN = 2;
export const CARD_WIDTH_MM = CARD_WIDTH_IN * 25.4;
export const CARD_HEIGHT_MM = CARD_HEIGHT_IN * 25.4;

/** A4 sheet layout — 2 columns × 5 rows = 10 cards */
export const A4_WIDTH_MM = 210;
export const A4_HEIGHT_MM = 297;
export const SHEET_COLS = 2;
export const SHEET_ROWS = 5;
export const SHEET_CARD_COUNT = SHEET_COLS * SHEET_ROWS;

export const MIN_IMAGE_SIZE = 28;
export const MAX_IMAGE_SIZE = 160;

export interface CustomField {
  id: string;
  label: string;
  value: string;
}

export interface CardImageSettings {
  enabled: boolean;
  src: string | null;
  x: number;
  y: number;
  width: number;
  height: number;
}

export type FontFamily = 'sans' | 'serif' | 'mono' | 'elegant' | 'modern';

export const FONT_OPTIONS: { id: FontFamily; label: string }[] = [
  { id: 'sans', label: 'Sans' },
  { id: 'serif', label: 'Serif' },
  { id: 'mono', label: 'Mono' },
  { id: 'elegant', label: 'Elegant' },
  { id: 'modern', label: 'Modern' },
];

export interface CardDesignSettings {
  templateId: string;
  primaryColor: string;
  accentColor: string;
  textColor: string;
  fontFamily: FontFamily;
  backgroundColor: string;
  backgroundImage: string | null;
  backgroundImageOpacity: number;
  cardImage: CardImageSettings;
}

export interface CardData {
  fullName: string;
  jobTitle: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  tagline: string;
  customFields: CustomField[];
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getDefaultCardData(): CardData {
  return {
    fullName: '',
    jobTitle: '',
    company: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    tagline: '',
    customFields: [],
  };
}

export function getSampleCardData(): CardData {
  return {
    fullName: 'Priya Sharma',
    jobTitle: 'Senior Product Designer',
    company: 'QuickUtils Studio',
    phone: '+91 98765 43210',
    email: 'priya@quickutils.in',
    website: 'www.quickutils.in',
    address: 'Bengaluru, Karnataka, India',
    tagline: 'Designing delightful digital experiences',
    customFields: [
      { id: generateId(), label: 'LinkedIn', value: 'linkedin.com/in/priyasharma' },
      { id: generateId(), label: 'Portfolio', value: 'priyasharma.design' },
    ],
  };
}

export function getDefaultDesignSettings(): CardDesignSettings {
  return {
    templateId: 'modern-bar',
    primaryColor: '#2d6a4f',
    accentColor: '#52b788',
    textColor: '#1a1917',
    fontFamily: 'sans',
    backgroundColor: '#ffffff',
    backgroundImage: null,
    backgroundImageOpacity: 0.25,
    cardImage: {
      enabled: false,
      src: null,
      x: 16,
      y: 16,
      width: 64,
      height: 64,
    },
  };
}

export function getFontFamilyStyle(font: FontFamily): string {
  const fonts: Record<FontFamily, string> = {
    sans: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif',
    serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace',
    elegant: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
    modern: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  };
  return fonts[font];
}

export function clampImagePosition(
  x: number,
  y: number,
  width: number,
  height: number,
): { x: number; y: number } {
  return {
    x: Math.max(0, Math.min(CARD_WIDTH - width, x)),
    y: Math.max(0, Math.min(CARD_HEIGHT - height, y)),
  };
}

export function clampImageSize(
  width: number,
  height: number,
): { width: number; height: number } {
  const w = Math.max(MIN_IMAGE_SIZE, Math.min(MAX_IMAGE_SIZE, width));
  const h = Math.max(MIN_IMAGE_SIZE, Math.min(MAX_IMAGE_SIZE, height));
  return { width: w, height: h };
}

export function readImageFile(file: File): Promise<string | null> {
  if (!file.type.startsWith('image/')) return Promise.resolve(null);
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve((e.target?.result as string) ?? null);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

function loadScript(src: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${id}`));
    document.head.appendChild(script);
  });
}

declare global {
  interface Window {
    html2canvas?: (
      element: HTMLElement,
      options?: Record<string, unknown>,
    ) => Promise<HTMLCanvasElement>;
    jspdf?: {
      jsPDF: new (options?: {
        unit?: string;
        format?: number[] | string;
        compress?: boolean;
      }) => {
        addImage: (
          imageData: string,
          format: string,
          x: number,
          y: number,
          width: number,
          height: number,
          alias?: string,
          compression?: string,
        ) => void;
        save: (filename: string) => void;
      };
    };
  }
}

export type CardExportVariant = 'single' | 'sheet';

export function getCardFilename(
  fullName: string,
  extension: string,
  variant: CardExportVariant = 'single',
): string {
  const slug = fullName.trim()
    ? fullName.toLowerCase().replace(/\s+/g, '-')
    : 'visiting-card';
  const suffix = variant === 'sheet' ? '-card-sheet' : '-card';
  return `${slug}${suffix}.${extension}`;
}

export function getSheetCardPositionsMm(): { x: number; y: number }[] {
  const marginX = (A4_WIDTH_MM - SHEET_COLS * CARD_WIDTH_MM) / 2;
  const marginY = (A4_HEIGHT_MM - SHEET_ROWS * CARD_HEIGHT_MM) / 2;
  const positions: { x: number; y: number }[] = [];

  for (let row = 0; row < SHEET_ROWS; row++) {
    for (let col = 0; col < SHEET_COLS; col++) {
      positions.push({
        x: marginX + col * CARD_WIDTH_MM,
        y: marginY + row * CARD_HEIGHT_MM,
      });
    }
  }

  return positions;
}

async function captureCardCanvas(element: HTMLElement): Promise<HTMLCanvasElement> {
  await loadScript(
    'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js',
    'html2canvas',
  );

  if (!window.html2canvas) {
    throw new Error('Export library failed to load. Please try again.');
  }

  return window.html2canvas(element, {
    scale: CARD_EXPORT_SCALE,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
  });
}

export async function exportCardToPng(element: HTMLElement): Promise<string> {
  const canvas = await captureCardCanvas(element);
  return canvas.toDataURL('image/png');
}

export async function exportCardToPdf(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  await loadScript(
    'https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js',
    'jspdf',
  );

  const JsPDF = window.jspdf?.jsPDF;
  if (!JsPDF) {
    throw new Error('PDF library failed to load. Please try again.');
  }

  const canvas = await captureCardCanvas(element);
  const imgData = canvas.toDataURL('image/png');

  const pdf = new JsPDF({
    unit: 'in',
    format: [CARD_WIDTH_IN, CARD_HEIGHT_IN],
    compress: true,
  });

  pdf.addImage(imgData, 'PNG', 0, 0, CARD_WIDTH_IN, CARD_HEIGHT_IN, undefined, 'FAST');
  pdf.save(filename);
}

export async function exportCardSheetToPdf(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  await loadScript(
    'https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js',
    'jspdf',
  );

  const JsPDF = window.jspdf?.jsPDF;
  if (!JsPDF) {
    throw new Error('PDF library failed to load. Please try again.');
  }

  const canvas = await captureCardCanvas(element);
  const imgData = canvas.toDataURL('image/png');
  const positions = getSheetCardPositionsMm();

  const pdf = new JsPDF({
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  for (const pos of positions) {
    pdf.addImage(
      imgData,
      'PNG',
      pos.x,
      pos.y,
      CARD_WIDTH_MM,
      CARD_HEIGHT_MM,
      undefined,
      'FAST',
    );
  }

  pdf.save(filename);
}

const PRINT_STYLE_ID = 'visiting-card-print-styles';

function injectPrintStyles(css: string): HTMLStyleElement {
  const existing = document.getElementById(PRINT_STYLE_ID);
  existing?.remove();

  const style = document.createElement('style');
  style.id = PRINT_STYLE_ID;
  style.textContent = css;
  document.head.appendChild(style);
  return style;
}

export function printCard(printTargetId: string): void {
  const style = injectPrintStyles(`
    @page {
      size: ${CARD_WIDTH_IN}in ${CARD_HEIGHT_IN}in;
      margin: 0;
    }
    @media print {
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: white !important;
      }
      body * {
        visibility: hidden !important;
      }
      #${printTargetId},
      #${printTargetId} * {
        visibility: visible !important;
      }
      #${printTargetId} {
        position: fixed !important;
        left: 0 !important;
        top: 0 !important;
        width: ${CARD_WIDTH_IN}in !important;
        height: ${CARD_HEIGHT_IN}in !important;
        margin: 0 !important;
        padding: 0 !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        overflow: hidden !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  `);

  const cleanup = (): void => {
    style.remove();
    window.removeEventListener('afterprint', cleanup);
  };
  window.addEventListener('afterprint', cleanup);
  window.print();
}

export function printCardSheet(sheetTargetId: string): void {
  const sheetEl = document.getElementById(sheetTargetId);
  if (!sheetEl) return;

  const parent = sheetEl.parentElement;
  const nextSibling = sheetEl.nextSibling;

  document.body.appendChild(sheetEl);
  document.body.classList.add('visiting-card-sheet-printing');

  const style = injectPrintStyles(`
    @page {
      size: A4 portrait;
      margin: 0;
    }
    @media print {
      html,
      body,
      body.visiting-card-sheet-printing {
        margin: 0 !important;
        padding: 0 !important;
        background: white !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      body.visiting-card-sheet-printing > *:not(#${sheetTargetId}) {
        display: none !important;
      }
      #${sheetTargetId} {
        display: flex !important;
        position: fixed !important;
        left: 0 !important;
        top: 0 !important;
        width: ${A4_WIDTH_MM}mm !important;
        height: ${A4_HEIGHT_MM}mm !important;
        margin: 0 !important;
        padding: 0 !important;
        opacity: 1 !important;
        visibility: visible !important;
        align-items: center !important;
        justify-content: center !important;
        background: white !important;
        overflow: visible !important;
        pointer-events: none !important;
      }
      #${sheetTargetId} .visiting-card-sheet-grid {
        display: grid !important;
        grid-template-columns: repeat(${SHEET_COLS}, ${CARD_WIDTH_IN}in) !important;
        grid-template-rows: repeat(${SHEET_ROWS}, ${CARD_HEIGHT_IN}in) !important;
        gap: 0 !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      #${sheetTargetId} .visiting-card-sheet-cell {
        width: ${CARD_WIDTH_IN}in !important;
        height: ${CARD_HEIGHT_IN}in !important;
        overflow: hidden !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        outline: 0.5pt dashed rgba(0, 0, 0, 0.2) !important;
        visibility: visible !important;
        opacity: 1 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      #${sheetTargetId} .visiting-card-sheet-cell > * {
        width: 100% !important;
        height: 100% !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
    }
  `);

  let cleaned = false;
  const cleanup = (): void => {
    if (cleaned) return;
    cleaned = true;

    style.remove();
    document.body.classList.remove('visiting-card-sheet-printing');

    if (parent) {
      if (nextSibling) {
        parent.insertBefore(sheetEl, nextSibling);
      } else {
        parent.appendChild(sheetEl);
      }
    }

    window.removeEventListener('afterprint', cleanup);
  };

  window.addEventListener('afterprint', cleanup);
  window.setTimeout(cleanup, 2000);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.print();
    });
  });
}

export function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.click();
}