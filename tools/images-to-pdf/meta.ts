import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'images-to-pdf',
  name: 'Images to PDF Generator',
  title: 'Images to PDF Generator – Merge Photos into Professional PDF | QuickUtils',
  description:
    'Combine any number of images into a clean printable PDF. Multi-column layouts, per-image rotation, title pages, filename captions, quality control, custom page sizes & more. 100% private — nothing uploads.',
  category: 'generator',
  icon: '📄',
  color: 'sky',
  keywords: [
    'images to pdf',
    'multiple images to pdf',
    'photo to pdf converter',
    'combine images pdf',
    'jpg to pdf',
    'png to pdf',
    'multi column pdf',
    'rotate images pdf',
    'image pdf with title page',
    'bulk photos to pdf',
  ],
  canonical: '/images-to-pdf',
  ogImage: '/og/images-to-pdf.jpg',
  faqs: [
    {
      question: 'Is my images uploaded anywhere?',
      answer: 'No. Everything is processed locally using your browser. Images never leave your device.',
    },
    {
      question: 'Can I control the PDF layout?',
      answer: 'Yes — page size (A4/Letter/Legal/A5), portrait or landscape, 1/2/3 columns per page, contain/cover/stretch fit, margins, background color, per-image 90/180/270° rotation, optional title page with title+subtitle, filename captions under images, and page numbers.',
    },
    {
      question: 'How do I reduce the PDF file size?',
      answer: 'Use the Image Quality slider (e.g. 70%). It downsamples images via canvas before printing — often 3-5× smaller files with acceptable quality for most documents.',
    },
  ],
  whatIs:
    'A fully private browser-based tool that merges photos, scans, screenshots or artwork into a single, print-ready PDF with advanced layout controls including multi-column pages, individual rotations, title pages and quality tuning.',
};
