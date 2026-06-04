export interface IconSize {
  size: number;
  name: string;
  purpose?: string;
}

export const WEB_SIZES: IconSize[] = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
];

export const APP_SIZES: IconSize[] = [
  { size: 180, name: 'apple-touch-icon.png', purpose: 'apple' },
  { size: 192, name: 'icon-192.png', purpose: 'pwa' },
  { size: 512, name: 'icon-512.png', purpose: 'pwa' },
];

export interface GeneratedIcon {
  size: number;
  name: string;
  dataUrl: string;
}

export async function generateIcons(sourceDataUrl: string, sizes: IconSize[]): Promise<GeneratedIcon[]> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = sourceDataUrl;
  });

  const results: GeneratedIcon[] = [];

  for (const s of sizes) {
    const canvas = document.createElement('canvas');
    canvas.width = s.size;
    canvas.height = s.size;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) continue;

    // white bg for non-transparent targets
    if (s.size <= 48) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, s.size, s.size);
    }

    // contain fit
    const ratio = Math.min(s.size / img.width, s.size / img.height);
    const dw = img.width * ratio;
    const dh = img.height * ratio;
    const dx = (s.size - dw) / 2;
    const dy = (s.size - dh) / 2;

    ctx.drawImage(img, dx, dy, dw, dh);

    results.push({
      size: s.size,
      name: s.name,
      dataUrl: canvas.toDataURL('image/png'),
    });
  }

  return results;
}

export function buildManifestSnippet(icons: GeneratedIcon[]) {
  const manifestIcons = icons
    .filter(i => i.size >= 192)
    .map(i => ({ src: i.name, sizes: `${i.size}x${i.size}`, type: 'image/png' }));

  return JSON.stringify({
    name: 'My App',
    short_name: 'App',
    icons: manifestIcons.length ? manifestIcons : [{ src: 'icon-192.png', sizes: '192x192', type: 'image/png' }],
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
  }, null, 2);
}
