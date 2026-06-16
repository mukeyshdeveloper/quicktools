import React from 'react';
import type { FAQ } from '@/types';

interface FAQSectionProps {
  faqs?: FAQ[] | undefined;
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-text">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-border pb-6 last:border-0 last:pb-0">
            <h3 className="font-semibold text-lg text-text mb-2">
              {faq.question}
            </h3>
            <p className="text-muted leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
