export type ResizeMode = 'max' | 'exact' | 'percent';
export type FitMode = 'contain' | 'cover' | 'stretch';
export type OutputFormat = 'original' | 'image/jpeg' | 'image/png' | 'image/webp';

export interface ResizeOptions {
  mode: ResizeMode;
  width?: number;
  height?: number;
  percent?: number;
  fit?: FitMode;
  format: OutputFormat;
  quality: number; // 0.1 - 1
}

export interface ResizeResult {
  originalName: string;
  originalSize: number;
  newSize: number;
  width: number;
  height: number;
  dataUrl: string;
  format: string;
}

function getOutputMime(format: OutputFormat, originalType: string): { mime: string; ext: string } {
  if (format === 'original') {
    const mime = originalType || 'image/jpeg';
    const ext = mime.split('/')[1] || 'jpg';
    return { mime, ext: ext === 'jpeg' ? 'jpg' : ext };
  }
  const ext = format === 'image/jpeg' ? 'jpg' : format.split('/')[1] || 'png';
  return { mime: format, ext };
}

export function resizeImage(
  file: File,
  options: ResizeOptions
): Promise<ResizeResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let targetW = img.naturalWidth;
      let targetH = img.naturalHeight;

      if (options.mode === 'percent' && options.percent) {
        const p = Math.max(1, Math.min(500, options.percent)) / 100;
        targetW = Math.round(img.naturalWidth * p);
        targetH = Math.round(img.naturalHeight * p);
      } else if (options.mode === 'max' && (options.width || options.height)) {
        const maxW = options.width || Infinity;
        const maxH = options.height || Infinity;
        const ratio = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 1);
        targetW = Math.round(img.naturalWidth * ratio);
        targetH = Math.round(img.naturalHeight * ratio);
      } else if (options.mode === 'exact' && options.width && options.height) {
        targetW = options.width;
        targetH = options.height;
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return reject(new Error('Canvas unavailable'));

      if (options.fit === 'stretch' || options.mode === 'percent') {
        ctx.drawImage(img, 0, 0, targetW, targetH);
      } else {
        // contain or cover
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = targetW / targetH;

        let drawW = targetW;
        let drawH = targetH;
        let dx = 0;
        let dy = 0;

        if (options.fit === 'contain') {
          if (imgRatio > canvasRatio) {
            drawH = Math.round(targetW / imgRatio);
            dy = Math.round((targetH - drawH) / 2);
          } else {
            drawW = Math.round(targetH * imgRatio);
            dx = Math.round((targetW - drawW) / 2);
          }
          // fill bg for jpeg
          const outFormat = getOutputMime(options.format, file.type).mime;
          if (outFormat.includes('jpeg')) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, targetW, targetH);
          }
          ctx.drawImage(img, dx, dy, drawW, drawH);
        } else {
          // cover (default for exact)
          if (imgRatio > canvasRatio) {
            drawW = Math.round(targetH * imgRatio);
            dx = Math.round((targetW - drawW) / 2);
          } else {
            drawH = Math.round(targetW / imgRatio);
            dy = Math.round((targetH - drawH) / 2);
          }
          ctx.drawImage(img, dx, dy, drawW, drawH);
        }
      }

      const { mime, ext } = getOutputMime(options.format, file.type);
      const quality = Math.max(0.1, Math.min(1, options.quality));
      const dataUrl = canvas.toDataURL(mime, quality);

      const base64 = dataUrl.split(',')[1] || '';
      const newSize = Math.round((base64.length * 3) / 4);

      resolve({
        originalName: file.name,
        originalSize: file.size,
        newSize,
        width: targetW,
        height: targetH,
        dataUrl,
        format: ext.toUpperCase(),
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image'));
    };

    img.src = objectUrl;
  });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
