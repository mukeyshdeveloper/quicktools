export type OutputFormat = 'image/jpeg' | 'image/png' | 'image/webp';

export interface ConvertResult {
  dataUrl: string;
  width: number;
  height: number;
  originalSize: number;
  newSize: number;
  format: string;
}

export function convertImageFormat(
  file: File,
  outputFormat: OutputFormat,
  quality: number
): Promise<ConvertResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context unavailable'));

      // White background for jpeg (prevents transparent → black)
      if (outputFormat === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      const dataUrl = canvas.toDataURL(outputFormat, quality);
      const base64 = dataUrl.split(',')[1] ?? '';
      const newSize = Math.round((base64.length * 3) / 4);

      resolve({
        dataUrl,
        width: img.naturalWidth,
        height: img.naturalHeight,
        originalSize: file.size,
        newSize,
        format: outputFormat.split('/')[1]!.toUpperCase(),
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
