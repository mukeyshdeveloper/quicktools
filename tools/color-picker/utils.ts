export interface ColorInfo {
  hex: string;
  rgb: string;
  hsl: string;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1] as string, 16),
        g: parseInt(result[2] as string, 16),
        b: parseInt(result[3] as string, 16),
      }
    : null;
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function parseColor(hex: string): ColorInfo | null {
  if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) return null;
  
  const normalizedHex = hex.startsWith('#') ? hex : `#${hex}`;
  const rgb = hexToRgb(normalizedHex);
  
  if (!rgb) return null;
  
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  return {
    hex: normalizedHex.toUpperCase(),
    rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
  };
}

export function generateShadesAndTints(hex: string): string[] | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;

  const { r, g, b } = rgb;
  const colors: string[] = [];

  // Generate tints (mix with white)
  for (let i = 8; i > 0; i--) {
    const weight = i * 0.1;
    const nr = Math.round(r + (255 - r) * weight);
    const ng = Math.round(g + (255 - g) * weight);
    const nb = Math.round(b + (255 - b) * weight);
    colors.push(`#${((1 << 24) + (nr << 16) + (ng << 8) + nb).toString(16).slice(1).toUpperCase()}`);
  }

  // Base color
  colors.push(hex.toUpperCase());

  // Generate shades (mix with black)
  for (let i = 1; i <= 8; i++) {
    const weight = 1 - (i * 0.1);
    const nr = Math.round(r * weight);
    const ng = Math.round(g * weight);
    const nb = Math.round(b * weight);
    colors.push(`#${((1 << 24) + (nr << 16) + (ng << 8) + nb).toString(16).slice(1).toUpperCase()}`);
  }

  return colors;
}
