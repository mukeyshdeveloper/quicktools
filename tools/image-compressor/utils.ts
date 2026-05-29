export interface CompressOptions {
  quality: number;       // 0.1 – 1.0
  maxWidth: number;
  maxHeight: number;
  outputFormat: 'image/jpeg' | 'image/png' | 'image/webp';
}

export interface CompressResult {
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  width: number;
  height: number;
  format: string;
}

export function compressImage(
  file: File,
  options: CompressOptions
): Promise<CompressResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');

      let { naturalWidth: w, naturalHeight: h } = img;

      // Scale down proportionally
      if (w > options.maxWidth || h > options.maxHeight) {
        const ratio = Math.min(options.maxWidth / w, options.maxHeight / h);
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);
      }

      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context unavailable'));

      ctx.drawImage(img, 0, 0, w, h);

      const dataUrl = canvas.toDataURL(options.outputFormat, options.quality);

      // Approximate compressed size from base64 data URL
      const base64 = dataUrl.split(',')[1] ?? '';
      const compressedSize = Math.round((base64.length * 3) / 4);

      resolve({
        dataUrl,
        originalSize: file.size,
        compressedSize,
        width: w,
        height: h,
        format: options.outputFormat.split('/')[1]!.toUpperCase(),
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
