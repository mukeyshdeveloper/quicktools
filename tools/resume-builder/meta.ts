import type { ToolMeta } from '@/types/tool'

export const meta: ToolMeta = {
  slug: 'resume-builder',
  name: 'Resume Builder',
  title: 'Free ATS Resume Builder – Create & Download Professional CVs | QuickUtils',
  description:
    'Free ATS-friendly resume builder. Create a professional CV with live preview and download as PDF. No signup required.',
  category: 'business',
  icon: '📄',
  color: 'indigo',
  keywords: [
    'resume builder',
    'free resume builder',
    'ats resume builder',
    'cv maker',
    'download resume pdf',
  ],
  canonical: '/resume-builder',
  ogImage: '/og/resume-builder.jpg',
  faqs: [
    {
      question: 'Is this resume ATS friendly?',
      answer:
        'Yes. The templates use clean formatting that Applicant Tracking Systems can parse easily without design elements interfering.',
    },
    {
      question: 'Do I need to create an account?',
      answer:
        'No account or signup is required. Everything happens in your browser and you can download your resume instantly.',
    },
  ],
}
