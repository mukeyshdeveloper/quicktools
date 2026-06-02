'use client';

import { useState, useEffect } from 'react';

interface FormData {
  name: string;
  email: string;
  toolName: string;
  description: string;
  category: string;
  additionalNotes: string;
}

const categories = [
  'Calculator',
  'Text Tools',
  'Developer Tools',
  'Finance & Investment',
  'Health & Fitness',
  'Productivity',
  'Utilities',
  'Other',
];

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function RequestToolPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    toolName: '',
    description: '',
    category: '',
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // Load reCAPTCHA script
  useEffect(() => {
    if (RECAPTCHA_SITE_KEY && !window.grecaptcha) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [RECAPTCHA_SITE_KEY]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.toolName || !formData.description) {
      setErrorMessage('Please fill in Email, Tool Name, and Description.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      let recaptchaToken = '';

      // Get reCAPTCHA token if configured
      if (RECAPTCHA_SITE_KEY && window.grecaptcha) {
        recaptchaToken = await new Promise<string>((resolve, reject) => {
          window.grecaptcha.ready(() => {
            window.grecaptcha
              .execute(RECAPTCHA_SITE_KEY, { action: 'submit' })
              .then((token: string) => resolve(token))
              .catch(reject);
          });
        });
      }

      const payload = {
        ...formData,
        recaptchaToken,
      };

      const response = await fetch('/api/request-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        toolName: '',
        description: '',
        category: '',
        additionalNotes: '',
      });
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Request a New Tool</h1>
        <p className="text-lg text-muted">
          Can't find the tool you need? Let us know! We'll review your request and consider building it.
        </p>
      </div>

      {submitStatus === 'success' ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
          <div className="text-emerald-600 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-semibold mb-2">Request Received!</h2>
          <p className="text-muted">
            Thank you! We've received your tool request. We'll review it and get back to you if we decide to build it.
          </p>
          <button
            onClick={() => setSubmitStatus('idle')}
            className="mt-6 px-6 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-3xl p-8">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1.5">
              Your Name (optional)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-2xl border border-border bg-background focus:outline-none focus:border-brand"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-2xl border border-border bg-background focus:outline-none focus:border-brand"
              placeholder="you@example.com"
            />
            <p className="text-xs text-muted mt-1">We'll only use this to contact you about your request.</p>
          </div>

          <div>
            <label htmlFor="toolName" className="block text-sm font-medium mb-1.5">
              Tool Name / Idea <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="toolName"
              name="toolName"
              required
              value={formData.toolName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-2xl border border-border bg-background focus:outline-none focus:border-brand"
              placeholder="e.g., JSON to CSV Converter"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1.5">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:border-brand resize-y"
              placeholder="Describe what the tool should do, what problem it solves, and any key features..."
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1.5">
              Category (optional)
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-2xl border border-border bg-background focus:outline-none focus:border-brand"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="additionalNotes" className="block text-sm font-medium mb-1.5">
              Additional Notes (optional)
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              rows={3}
              value={formData.additionalNotes}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:border-brand resize-y"
              placeholder="Any other details, similar tools you like, or urgency..."
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-2xl bg-brand hover:bg-brand/90 text-white font-semibold disabled:opacity-70 transition"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Tool Request'}
          </button>

          <p className="text-xs text-center text-muted">
            Protected by reCAPTCHA. We review all requests. Not all ideas will be built, but we appreciate your input!
          </p>
        </form>
      )}
    </div>
  );
}
