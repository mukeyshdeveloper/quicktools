import type { ToolMeta } from '@/types/tool'

export const meta: ToolMeta = {
  slug: 'invoice-generator',
  name: 'Invoice Generator',
  title: 'Free Invoice Generator – Create & Download PDF Invoices | QuickUtils',
  description: 'Create professional invoices instantly for your business. Customize details, calculate taxes, and download as a PDF for free, entirely in your browser.',
  category: 'business',
  icon: '🧾',
  color: 'emerald',
  keywords: ['invoice generator', 'free invoice maker', 'download pdf invoice', 'create invoice online', 'receipt maker'],
  canonical: '/invoice-generator',
  ogImage: '/og/invoice-generator.jpg',
  faqs: [
    {
      question: 'Is my invoice data saved?',
      answer: 'No. Everything is generated locally in your browser. Nothing is stored on our servers.',
    },
    {
      question: 'Can I add my company logo?',
      answer: 'The current version focuses on clean text-based invoices. Logo support is planned for a future update.',
    },
  ],
}
