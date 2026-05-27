import Link from 'next/link';

export default function Footer(): React.ReactElement {
  return (
    <footer className="border-t border-border bg-card px-4 py-6 text-center text-xs text-muted">
      <p>
        © 2026 QuickUtils ·{' '}
        <Link className="footer-link" href="/privacy-policy">
          Privacy Policy
        </Link>{' '}
        ·{' '}
        <Link className="footer-link" href="/about">
          About
        </Link>{' '}
        ·{' '}
        <Link className="footer-link" href="/contact">
          Contact
        </Link>
      </p>
      <p className="mt-1">Free tools for everyone · Made in India</p>
    </footer>
  );
}
