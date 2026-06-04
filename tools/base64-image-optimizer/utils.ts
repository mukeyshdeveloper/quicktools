export interface OptimizeOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0-1 or 0-100
  format?: 'jpeg' | 'png' | 'webp';
  background?: string; // for non-png
}

export interface OptimizeResult {
  optimizedBase64: string; // full data url
  originalSize: number; // bytes of original base64 payload (without prefix)
  newSize: number;
  savings: number; // percent 0-100
  width: number;
  height: number;
  format: string;
}

function stripDataUrlPrefix(dataUrl: string): string {
  const comma = dataUrl.indexOf(',');
  return comma >= 0 ? dataUrl.substring(comma + 1) : dataUrl;
}

function getBase64Size(dataUrl: string): number {
  const b64 = stripDataUrlPrefix(dataUrl);
  // base64 length * 3/4 approx bytes (ignore padding)
  return Math.floor(b64.length * 0.75);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function optimizeBase64Image(
  inputDataUrl: string,
  options: OptimizeOptions = {}
): Promise<OptimizeResult | null> {
  if (!inputDataUrl.startsWith('data:image')) return null;

  const {
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 0.82,
    format = 'jpeg',
    background = '#ffffff',
  } = options;

  try {
    const img = await loadImage(inputDataUrl);

    let w = img.width;
    let h = img.height;

    const ratio = Math.min(maxWidth / w, maxHeight / h, 1);
    const targetW = Math.round(w * ratio);
    const targetH = Math.round(h * ratio);

    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;

    if (format !== 'png') {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, targetW, targetH);
    }

    ctx.drawImage(img, 0, 0, targetW, targetH);

    const mime = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
    const q = Math.max(0.1, Math.min(1, quality > 1 ? quality / 100 : quality));
    const outDataUrl = canvas.toDataURL(mime, q);

    const origBytes = getBase64Size(inputDataUrl);
    const newBytes = getBase64Size(outDataUrl);
    const savings = origBytes > 0 ? Math.round(((origBytes - newBytes) / origBytes) * 100) : 0;

    return {
      optimizedBase64: outDataUrl,
      originalSize: origBytes,
      newSize: newBytes,
      savings: Math.max(0, savings),
      width: targetW,
      height: targetH,
      format,
    };
  } catch (e) {
    return null;
  }
}

export function isValidImageDataUrl(s: string): boolean {
  return /^data:image\/(png|jpe?g|gif|webp|svg\+xml);base64,/.test(s.trim());
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
