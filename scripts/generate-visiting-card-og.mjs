import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '../public/og/visiting-card-generator.jpg');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#eef6f1"/>
      <stop offset="55%" stop-color="#f5f4f0"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>
    <linearGradient id="cardAccent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2d6a4f"/>
      <stop offset="100%" stop-color="#52b788"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#1a3d30" flood-opacity="0.14"/>
    </filter>
    <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.5" fill="#2d6a4f" opacity="0.12"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="280" height="630" fill="url(#dots)" opacity="0.55"/>
  <rect x="920" y="0" width="280" height="630" fill="url(#dots)" opacity="0.35"/>

  <text x="980" y="120" font-family="Georgia, serif" font-size="120" font-weight="700" fill="#2d6a4f" opacity="0.06">CARD</text>
  <text x="40" y="560" font-family="Georgia, serif" font-size="90" font-weight="700" fill="#2d6a4f" opacity="0.05">VC</text>

  <g transform="translate(88, 118)">
    <rect x="0" y="0" width="430" height="394" rx="28" fill="#ffffff" opacity="0.72"/>
    <g filter="url(#shadow)" transform="translate(36, 42)">
      <rect x="0" y="0" width="350" height="200" rx="14" fill="#ffffff" stroke="#d8e8df" stroke-width="2"/>
      <rect x="0" y="0" width="14" height="200" rx="7" fill="url(#cardAccent)"/>
      <text x="34" y="52" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" fill="#1a1917">Priya Sharma</text>
      <text x="34" y="82" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="600" fill="#2d6a4f">Senior Product Designer</text>
      <text x="34" y="104" font-family="Arial, Helvetica, sans-serif" font-size="12" fill="#787570">QuickUtils Studio</text>
      <rect x="34" y="118" width="42" height="3" rx="1.5" fill="#52b788"/>
      <text x="34" y="142" font-family="Arial, Helvetica, sans-serif" font-size="11" fill="#1a1917">priya@quickutils.in</text>
      <text x="34" y="162" font-family="Arial, Helvetica, sans-serif" font-size="11" fill="#1a1917">+91 98765 43210</text>
      <text x="34" y="182" font-family="Arial, Helvetica, sans-serif" font-size="11" fill="#1a1917">www.quickutils.in</text>
      <rect x="250" y="24" width="72" height="72" rx="10" fill="#e8f3ed" stroke="#b7d8c5" stroke-width="1.5"/>
      <circle cx="286" cy="52" r="16" fill="#52b788" opacity="0.35"/>
      <rect x="268" y="72" width="36" height="5" rx="2.5" fill="#2d6a4f" opacity="0.25"/>
      <rect x="274" y="82" width="24" height="4" rx="2" fill="#2d6a4f" opacity="0.18"/>
    </g>

    <g transform="translate(56, 268)">
      <rect x="0" y="0" width="98" height="62" rx="10" fill="#ffffff" stroke="#d8e8df" stroke-width="1.5"/>
      <rect x="0" y="0" width="98" height="14" rx="7" fill="#2d6a4f"/>
      <rect x="10" y="24" width="52" height="5" rx="2.5" fill="#cbd5e1"/>
      <rect x="10" y="36" width="68" height="4" rx="2" fill="#e2e8f0"/>
      <rect x="10" y="46" width="44" height="4" rx="2" fill="#e2e8f0"/>

      <rect x="116" y="0" width="98" height="62" rx="10" fill="#ffffff" stroke="#d8e8df" stroke-width="1.5"/>
      <rect x="116" y="0" width="98" height="62" rx="10" fill="#1a1917" opacity="0.92"/>
      <rect x="126" y="12" width="36" height="3" rx="1.5" fill="#52b788"/>
      <rect x="126" y="24" width="52" height="5" rx="2.5" fill="#f5f4f0" opacity="0.9"/>
      <rect x="126" y="36" width="68" height="4" rx="2" fill="#f5f4f0" opacity="0.55"/>

      <rect x="232" y="0" width="98" height="62" rx="10" fill="#ffffff" stroke="#d8e8df" stroke-width="1.5"/>
      <path d="M232 14 Q281 0 330 14 L330 62 L232 62 Z" fill="#52b788" opacity="0.22"/>
      <rect x="242" y="24" width="52" height="5" rx="2.5" fill="#2d6a4f" opacity="0.35"/>
      <rect x="242" y="36" width="68" height="4" rx="2" fill="#2d6a4f" opacity="0.22"/>
    </g>

    <g transform="translate(250, 24)">
      <circle cx="0" cy="0" r="26" fill="#2d6a4f"/>
      <text x="-18" y="8" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700" fill="#ffffff">12+</text>
    </g>
  </g>

  <g transform="translate(590, 150)">
    <text x="0" y="0" font-family="Arial, Helvetica, sans-serif" font-size="74" font-weight="800" fill="#1a1917">Visiting</text>
    <text x="0" y="88" font-family="Arial, Helvetica, sans-serif" font-size="74" font-weight="800" fill="#2d6a4f">Card Generator</text>
    <rect x="0" y="112" width="180" height="5" rx="2.5" fill="#d4a843"/>
    <text x="0" y="162" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="600" fill="#2d6a4f" letter-spacing="1">12 Templates • PDF • Print Ready</text>
    <text x="0" y="210" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#787570">Design business cards free in your browser</text>
  </g>

  <g transform="translate(590, 470)">
    <rect x="0" y="0" width="150" height="42" rx="12" fill="#2d6a4f"/>
    <text x="24" y="28" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="#ffffff">QuickUtils</text>
    <text x="170" y="28" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="#787570">Free • No signup • Offline</text>
  </g>

  <rect x="1040" y="44" width="120" height="120" rx="18" fill="#ffffff" opacity="0.55" stroke="#d8e8df" stroke-width="1.5"/>
  <rect x="1068" y="72" width="64" height="64" rx="8" fill="url(#cardAccent)" opacity="0.18"/>
  <text x="1088" y="118" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#2d6a4f">💳</text>
</svg>`;

await sharp(Buffer.from(svg))
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(outPath);

console.log(`Wrote ${outPath}`);