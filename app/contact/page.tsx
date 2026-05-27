import type { Metadata } from 'next';
import { Mail, MessageCircle, Code2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | QuickUtils',
  description: 'Get in touch with the QuickUtils team for support, feedback, or feature requests.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl mb-4">
          Contact Us
        </h1>
        <p className="text-muted mb-12 text-lg">
          We'd love to hear from you. Whether you have a question, a feature request, or found a bug, let us know!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Direct Contact</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted">
                  <div className="p-2 bg-brand/10 text-brand rounded-lg">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text">Email</p>
                    <a href="mailto:hello@quickutils.in" className="hover:text-brand transition">mukeysh.developer@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-muted">
                  <div className="p-2 bg-brand/10 text-brand rounded-lg">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text">Twitter / X</p>
                    <a href="https://twitter.com/quickutils" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition">@quickutils</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-muted">
                  <div className="p-2 bg-brand/10 text-brand rounded-lg">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text">GitHub</p>
                    <a href="https://github.com/mukeysh/quickutils" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition">github.com/mukeysh</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (UI Only for AdSense compliance) */}
          {/* <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Send a Message</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-muted mb-1">Name</label>
                <input type="text" id="name" placeholder="Your name" className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-brand outline-none transition" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-muted mb-1">Email</label>
                <input type="email" id="email" placeholder="your@email.com" className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-brand outline-none transition" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-muted mb-1">Message</label>
                <textarea id="message" rows={4} placeholder="How can we help?" className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:ring-2 focus:ring-brand outline-none transition resize-none"></textarea>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-brand hover:bg-brand/90 text-white font-bold transition">
                Send Message
              </button>
              <p className="text-xs text-center text-muted mt-2">
                * Form currently disabled in beta. Please use email instead.
              </p>
            </form>
          </div> */}
        </div>
      </main>
    </div>
  );
}
