export type OutputFormat = 'original' | 'image/jpeg' | 'image/png' | 'image/webp' | 'image/avif';

export interface ConvertOptions {
  format: OutputFormat;
  quality: number;
  maxWidth?: number | undefined;
  maxHeight?: number | undefined;
}

export interface ConvertResult {
  dataUrl: string;
  width: number;
  height: number;
  originalSize: number;
  newSize: number;
  format: string;
  originalName?: string;
}

function getMimeAndExt(format: OutputFormat, originalType: string) {
  if (format === 'original') {
    const m = originalType || 'image/jpeg';
    const e = m.includes('png') ? 'png' : m.includes('webp') ? 'webp' : m.includes('avif') ? 'avif' : 'jpg';
    return { mime: m, ext: e };
  }
  const ext = format === 'image/jpeg' ? 'jpg' : format.split('/')[1] || 'png';
  return { mime: format, ext };
}

export async function convertImage(
  file: File,
  options: ConvertOptions
): Promise<ConvertResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let w = img.naturalWidth;
      let h = img.naturalHeight;

      if (options.maxWidth || options.maxHeight) {
        const ratio = Math.min(
          (options.maxWidth || w) / w,
          (options.maxHeight || h) / h,
          1
        );
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context unavailable'));

      const targetMime = getMimeAndExt(options.format, file.type).mime;

      if (targetMime.includes('jpeg')) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
      }

      ctx.drawImage(img, 0, 0, w, h);

      // Try AVIF, fall back gracefully if unsupported
      let dataUrl: string;
      try {
        dataUrl = canvas.toDataURL(targetMime as any, options.quality);
      } catch {
        // Fallback to webp or jpeg
        const fb = targetMime.includes('avif') ? 'image/webp' : 'image/jpeg';
        dataUrl = canvas.toDataURL(fb, options.quality);
      }

      const base64 = dataUrl.split(',')[1] ?? '';
      const newSize = Math.round((base64.length * 3) / 4);

      resolve({
        dataUrl,
        width: w,
        height: h,
        originalSize: file.size,
        newSize,
        format: getMimeAndExt(options.format, file.type).ext.toUpperCase(),
        originalName: file.name,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
}

export const SUPPORTED_OUTPUTS = ['image/webp', 'image/avif', 'image/jpeg', 'image/png', 'original'] as const;

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
