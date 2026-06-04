export type DeviceType = 'iphone' | 'macbook';

export interface MockupOptions {
  device: DeviceType;
  color: string;
  shadow: boolean;
  bgColor?: string;
}

export interface MockupResult {
  dataUrl: string;
  width: number;
  height: number;
}

const COLORS: Record<string, string> = {
  black: '#111111',
  silver: '#c8c9cd',
  gold: '#d4af37',
  midnight: '#1e2937',
  blue: '#0a4c8a',
  purple: '#3b2a5e',
};

export function getDeviceColors() {
  return Object.keys(COLORS);
}

function drawPhone(ctx: CanvasRenderingContext2D, w: number, h: number, color: string, shadow: boolean) {
  // Simple modern iPhone-like frame
  const radius = 70;
  const bezel = 18;

  ctx.save();
  if (shadow) {
    ctx.shadowColor = 'rgba(0,0,0,0.35)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 25;
  }

  // Body
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(0, 0, w, h, radius);
  ctx.fill();
  ctx.restore();

  // Screen area (inner)
  ctx.fillStyle = '#0a0a0a';
  ctx.beginPath();
  ctx.roundRect(bezel, bezel * 1.6, w - bezel * 2, h - bezel * 3.2, 12);
  ctx.fill();

  // Dynamic island
  ctx.fillStyle = '#111';
  ctx.beginPath();
  ctx.roundRect(w / 2 - 70, bezel * 0.9, 140, 32, 16);
  ctx.fill();

  // Camera dot
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.arc(w / 2 + 45, bezel * 1.05, 5, 0, Math.PI * 2);
  ctx.fill();
}

function drawLaptop(ctx: CanvasRenderingContext2D, w: number, h: number, color: string, shadow: boolean) {
  const bodyH = h * 0.82;
  const screenPadding = 18;

  ctx.save();
  if (shadow) {
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 35;
    ctx.shadowOffsetY = 20;
  }
  // Screen bezel
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, w, bodyH);

  // Screen
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(screenPadding, screenPadding, w - screenPadding * 2, bodyH - screenPadding * 2 - 8);

  // Camera notch
  ctx.fillStyle = '#111827';
  ctx.fillRect(w / 2 - 8, 8, 16, 6);

  // Base / keyboard area
  ctx.fillStyle = color;
  ctx.fillRect(-30, bodyH - 12, w + 60, h * 0.22);

  // Trackpad hint
  ctx.fillStyle = '#1f2937';
  ctx.fillRect(w * 0.35, bodyH + 18, w * 0.3, 8);
  ctx.restore();
}

export async function generateMockup(
  imageDataUrl: string,
  options: MockupOptions
): Promise<MockupResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const isPhone = options.device === 'iphone';
      const scale = 2; // retina
      const baseW = isPhone ? 520 : 980;
      const baseH = isPhone ? 1020 : 620;

      const canvas = document.createElement('canvas');
      canvas.width = baseW * scale;
      canvas.height = baseH * scale;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return reject(new Error('Canvas error'));

      ctx.scale(scale, scale);

      // Background
      if (options.bgColor) {
        ctx.fillStyle = options.bgColor;
        ctx.fillRect(0, 0, baseW, baseH);
      } else {
        // subtle gradient
        const g = ctx.createLinearGradient(0, 0, 0, baseH);
        g.addColorStop(0, '#f8fafc');
        g.addColorStop(1, '#e0e7ff');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, baseW, baseH);
      }

      const color = COLORS[options.color] || '#111111';

      if (isPhone) {
        drawPhone(ctx, baseW, baseH, color, options.shadow);
        // Photo inside screen
        const pad = 28;
        const screenX = pad;
        const screenY = 58;
        const screenW = baseW - pad * 2;
        const screenH = baseH - 110;
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(screenX, screenY, screenW, screenH, 8);
        ctx.clip();
        // cover
        const ratio = Math.max(screenW / img.width, screenH / img.height);
        const dw = img.width * ratio;
        const dh = img.height * ratio;
        ctx.drawImage(img, (screenW - dw) / 2 + screenX, (screenH - dh) / 2 + screenY, dw, dh);
        ctx.restore();
      } else {
        drawLaptop(ctx, baseW, baseH, color, options.shadow);
        // Screen content area for laptop
        const pad = 22;
        const screenX = pad;
        const screenY = pad + 4;
        const screenW = baseW - pad * 2;
        const screenH = baseH * 0.78 - 30;
        ctx.save();
        ctx.beginPath();
        ctx.rect(screenX, screenY, screenW, screenH);
        ctx.clip();
        const ratio = Math.max(screenW / img.width, screenH / img.height);
        const dw = img.width * ratio;
        const dh = img.height * ratio;
        ctx.drawImage(img, (screenW - dw) / 2 + screenX, (screenH - dh) / 2 + screenY, dw, dh);
        ctx.restore();
      }

      resolve({
        dataUrl: canvas.toDataURL('image/png'),
        width: canvas.width,
        height: canvas.height,
      });
    };
    img.onerror = () => reject(new Error('Failed to load source image'));
    img.src = imageDataUrl;
  });
}
