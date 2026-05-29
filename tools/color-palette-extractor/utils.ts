export interface ExtractedColor {
  hex: string;
  rgb: { r: number; g: number; b: number };
  percentage: number;
}

export interface PaletteResult {
  colors: ExtractedColor[];
  width: number;
  height: number;
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function colorDistance(a: [number, number, number], b: [number, number, number]): number {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 +
    (a[1] - b[1]) ** 2 +
    (a[2] - b[2]) ** 2
  );
}

/**
 * Simple median-cut inspired extraction using bucketed quantization.
 * Runs fully in browser with Canvas API — no server upload.
 */
export function extractPalette(
  file: File,
  paletteSize: number
): Promise<PaletteResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      const SAMPLE_SIZE = 400; // scale to max 400px for speed
      const canvas = document.createElement('canvas');
      const scale = Math.min(1, SAMPLE_SIZE / Math.max(img.naturalWidth, img.naturalHeight));
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);

      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas context unavailable'));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Bucket quantization: reduce each channel to 8 levels (32-step buckets)
      const buckets: Record<string, number> = {};
      const STEP = 32;

      for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3]!;
        if (a < 128) continue; // skip transparent

        const r = Math.round(data[i]! / STEP) * STEP;
        const g = Math.round(data[i + 1]! / STEP) * STEP;
        const b = Math.round(data[i + 2]! / STEP) * STEP;

        const key = `${r},${g},${b}`;
        buckets[key] = (buckets[key] ?? 0) + 1;
      }

      // Sort by frequency
      const sorted = Object.entries(buckets)
        .sort((a, b) => b[1] - a[1]);

      const totalPixels = sorted.reduce((s, [, c]) => s + c, 0);

      // Greedily pick top colors that are visually distinct (distance > 64)
      const picked: [number, number, number][] = [];
      const colors: ExtractedColor[] = [];

      for (const [key, count] of sorted) {
        if (colors.length >= paletteSize) break;
        const [r, g, b] = key.split(',').map(Number) as [number, number, number];

        const tooClose = picked.some(p => colorDistance(p, [r, g, b]) < 64);
        if (tooClose) continue;

        picked.push([r, g, b]);
        colors.push({
          hex: rgbToHex(Math.min(255, r), Math.min(255, g), Math.min(255, b)),
          rgb: { r, g, b },
          percentage: Math.round((count / totalPixels) * 1000) / 10,
        });
      }

      resolve({ colors, width: img.naturalWidth, height: img.naturalHeight });
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
