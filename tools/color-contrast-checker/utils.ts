export interface RGB {
  r: number;
  g: number;
  b: number;
}

export function parseColor(input: string): RGB | null {
  const trimmed = input.trim().toLowerCase();

  // Hex
  if (trimmed.startsWith('#')) {
    let hex = trimmed.slice(1);
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2) || '00', 16);
      const g = parseInt(hex.slice(2, 4) || '00', 16);
      const b = parseInt(hex.slice(4, 6) || '00', 16);
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return { r, g, b };
    }
  }

  // rgb() or rgba()
  const rgbMatch = trimmed.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    const r = Math.max(0, Math.min(255, parseInt(rgbMatch[1] || '0')));
    const g = Math.max(0, Math.min(255, parseInt(rgbMatch[2] || '0')));
    const b = Math.max(0, Math.min(255, parseInt(rgbMatch[3] || '0')));
    return { r, g, b };
  }

  // hsl() - simple conversion
  const hslMatch = trimmed.match(/^hsla?\((\d+),\s*(\d+)%,\s*(\d+)%/);
  if (hslMatch) {
    const h = parseInt(hslMatch[1] || '0') / 360;
    const s = parseInt(hslMatch[2] || '0') / 100;
    const l = parseInt(hslMatch[3] || '0') / 100;
    return hslToRgb(h, s, l);
  }

  return null;
}

function hslToRgb(h: number, s: number, l: number): RGB {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function luminance({ r, g, b }: RGB): number {
  const rs = (r ?? 0) / 255;
  const gs = (g ?? 0) / 255;
  const bs = (b ?? 0) / 255;
  const rLin = rs <= 0.04045 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
  const gLin = gs <= 0.04045 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
  const bLin = bs <= 0.04045 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);
  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

export function contrastRatio(fg: RGB, bg: RGB): number {
  const L1 = luminance(fg);
  const L2 = luminance(bg);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

export interface Compliance {
  level: string;
  normal: string;
  large: string;
  ui: string;
  ratio: number;
}

export function getCompliance(ratio: number): Compliance {
  const normalAA = ratio >= 4.5;
  const normalAAA = ratio >= 7;
  const largeAA = ratio >= 3;
  const largeAAA = ratio >= 4.5;
  const uiAA = ratio >= 3;

  return {
    level: normalAAA ? 'AAA' : normalAA ? 'AA' : largeAA ? 'AA (Large only)' : 'Fail',
    normal: normalAAA ? 'AAA' : normalAA ? 'AA' : 'Fail',
    large: largeAAA ? 'AAA' : largeAA ? 'AA' : 'Fail',
    ui: uiAA ? 'AA' : 'Fail',
    ratio: Math.round(ratio * 100) / 100,
  };
}

export function suggestBetterColor(fg: RGB, bg: RGB, targetRatio = 4.5): string {
  // Very simple suggestion: darken or lighten foreground toward black/white
  const current = contrastRatio(fg, bg);
  if (current >= targetRatio) return '';

  const lumBg = luminance(bg);
  const isLightBg = lumBg > 0.5;

  // Try darkening or lightening fg
  let best: RGB | null = null;
  let bestRatio = current;

  for (let factor = 0.9; factor > 0.1; factor -= 0.05) {
    const test: RGB = isLightBg 
      ? { r: Math.round(fg.r * factor), g: Math.round(fg.g * factor), b: Math.round(fg.b * factor) }
      : { r: Math.round(255 - (255 - fg.r) * factor), g: Math.round(255 - (255 - fg.g) * factor), b: Math.round(255 - (255 - fg.b) * factor) };
    const r = contrastRatio(test, bg);
    if (r > bestRatio) {
      bestRatio = r;
      best = test;
    }
    if (bestRatio >= targetRatio) break;
  }

  if (best) {
    return `#${best.r.toString(16).padStart(2,'0')}${best.g.toString(16).padStart(2,'0')}${best.b.toString(16).padStart(2,'0')}`;
  }
  return '';
}
