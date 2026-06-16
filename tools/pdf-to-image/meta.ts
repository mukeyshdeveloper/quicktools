import type { ToolMeta } from '@/types';

export const meta: ToolMeta = {
  slug: 'pdf-to-image',
  name: 'PDF & Word to Image',
  title: 'PDF & Word to Image Converter – Extract Pages as Images | QuickUtils',
  description: 'Convert PDF and Word (.docx) files to high-quality PNG or JPG images directly in your browser. Fast, secure, and 100% offline-capable.',
  category: 'developer',
  icon: '🖼️',
  color: 'orange',
  keywords: [
    'pdf to image',
    'word to image',
    'docx to image',
    'convert pdf to png',
    'convert docx to png',
    'extract pdf pages',
    'extract word pages',
    'pdf to jpg converter',
    'offline pdf converter',
    'docx to png converter',
    'pdf to image download'
  ],
  canonical: '/pdf-to-image',
  faqs: [
    {
      question: 'Is my data secure?',
      answer: 'Yes, completely. This converter does not send your documents to any external server. All processing is executed strictly inside your local web browser, making it completely private and secure.',
    },
    {
      question: 'Can I convert large Word or PDF files?',
      answer: 'Yes. The converter can handle multi-page documents. Since it uses your device\'s memory and CPU power to render pages on-the-fly, larger documents may take slightly longer to process.',
    },
    {
      question: 'Why does the browser ask for multiple download permissions?',
      answer: 'When downloading all pages simultaneously, your browser receives requests to save multiple files. This is a built-in security feature to protect you. Simply click "Allow" to let the browser download all converted page images.',
    },
  ],
};
