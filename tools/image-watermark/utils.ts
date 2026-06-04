export interface WatermarkText {
  text: string;
  fontSize: number; // relative to image, e.g. 0.06 = 6%
  color: string;
  opacity: number; // 0-1
  rotation: number; // degrees
  position: string; // 'top-left' | 'top-center' ... 'bottom-right' | 'center'
}

export interface WatermarkLogo {
  dataUrl: string;
  scale: number; // 0.1 - 0.6
  opacity: number;
  position: string;
}

export interface WatermarkOptions {
  texts: WatermarkText[];
  logo?: WatermarkLogo | undefined;
}

export interface WatermarkResult {
  dataUrl: string;
  width: number;
  height: number;
  originalName?: string;
}

const POSITIONS: Record<string, (w: number, h: number, iw: number, ih: number) => { x: number; y: number }> = {
  'top-left': (w, h, iw, ih) => ({ x: 40, y: 40 }),
  'top-center': (w, h, iw, ih) => ({ x: (w - iw) / 2, y: 40 }),
  'top-right': (w, h, iw, ih) => ({ x: w - iw - 40, y: 40 }),
  'middle-left': (w, h, iw, ih) => ({ x: 40, y: (h - ih) / 2 }),
  'center': (w, h, iw, ih) => ({ x: (w - iw) / 2, y: (h - ih) / 2 }),
  'middle-right': (w, h, iw, ih) => ({ x: w - iw - 40, y: (h - ih) / 2 }),
  'bottom-left': (w, h, iw, ih) => ({ x: 40, y: h - ih - 40 }),
  'bottom-center': (w, h, iw, ih) => ({ x: (w - iw) / 2, y: h - ih - 40 }),
  'bottom-right': (w, h, iw, ih) => ({ x: w - iw - 40, y: h - ih - 40 }),
};

export function applyWatermarks(
  baseDataUrl: string,
  options: WatermarkOptions,
  originalName?: string
): Promise<WatermarkResult> {
  return new Promise((resolve, reject) => {
    const baseImg = new Image();
    baseImg.onload = async () => {
      const canvas = document.createElement('canvas');
      canvas.width = baseImg.naturalWidth;
      canvas.height = baseImg.naturalHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return reject(new Error('Canvas unavailable'));

      ctx.drawImage(baseImg, 0, 0);

      // Draw logo first (so text can sit on top)
      if (options.logo) {
        const lg = options.logo;
        const logoImg = new Image();
        await new Promise<void>((res) => {
          logoImg.onload = () => {
            const lw = logoImg.width * lg.scale;
            const lh = logoImg.height * (lw / logoImg.width);
            const posFn = POSITIONS[lg.position] || POSITIONS['bottom-right'];
            const pos = posFn ? posFn(canvas.width, canvas.height, lw, lh) : { x: 40, y: canvas.height - lh - 40 };
            const { x, y } = pos;
            ctx.save();
            ctx.globalAlpha = lg.opacity;
            ctx.drawImage(logoImg, x, y, lw, lh);
            ctx.restore();
            res();
          };
          logoImg.src = lg.dataUrl;
        });
      }

      // Draw texts
      for (const t of options.texts) {
        if (!t.text.trim()) continue;
        const fontSize = Math.max(12, Math.round(Math.min(canvas.width, canvas.height) * t.fontSize));
        ctx.save();
        ctx.font = `600 ${fontSize}px system-ui, -apple-system, sans-serif`;
        ctx.fillStyle = t.color;
        ctx.globalAlpha = t.opacity;
        ctx.textBaseline = 'top';

        const metrics = ctx.measureText(t.text);
        const tw = metrics.width;
        const th = fontSize * 1.15;

        const posFn = POSITIONS[t.position] || POSITIONS['bottom-right'];
        const pos = posFn ? posFn(canvas.width, canvas.height, tw, th) : { x: canvas.width - tw - 40, y: canvas.height - th - 40 };
        let { x, y } = pos;

        if (t.rotation) {
          const cx = x + tw / 2;
          const cy = y + th / 2;
          ctx.translate(cx, cy);
          ctx.rotate((t.rotation * Math.PI) / 180);
          ctx.translate(-cx, -cy);
        }

        // subtle shadow for readability
        ctx.shadowColor = 'rgba(0,0,0,0.45)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetY = 1.5;

        ctx.fillText(t.text, x, y);
        ctx.restore();
      }

      resolve({
        dataUrl: canvas.toDataURL('image/png'),
        width: canvas.width,
        height: canvas.height,
        originalName: originalName || undefined,
      } as any);
    };
    baseImg.onerror = () => reject(new Error('Failed to load base image'));
    baseImg.src = baseDataUrl;
  });
}
