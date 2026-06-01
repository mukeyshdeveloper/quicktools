import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'qr-code-generator',
  name: 'QR Code Generator',
  title: 'QR Code Generator – Create Custom QR Codes for Free (PNG + SVG)',
  description:
    'Free QR code generator for URLs, Wi-Fi, vCard, SMS, email, and plain text. Customize colors, size, and error correction. Download PNG or SVG.',
  category: 'generator',
  icon: '📱',
  color: 'violet',
  keywords: [
    'qr code generator',
    'wifi qr code generator',
    'vcard qr code',
    'custom qr code',
    'qr code maker',
  ],
  canonical: '/qr-code-generator',
  ogImage: '/og/qr-code-generator.jpg',
  faqs: [
    { question: 'Which error correction level should I use?', answer: 'Medium is fine for most digital use. Use High for printed materials that might get damaged or dirty.' },
    { question: 'Can I make a Wi-Fi QR code for guests?', answer: 'Yes. Select Wi-Fi, enter SSID, password, and encryption type. Guests can scan and connect instantly.' },
  ],
};
