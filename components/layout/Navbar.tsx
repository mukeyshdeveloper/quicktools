import Link from 'next/link';
import Image from 'next/image';

export default function Navbar(): React.ReactElement {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-extrabold text-text"
          aria-label="QuickUtils homepage"
        >
          <Image src="/logo.png" alt="QuickUtils" width={32} height={32} />
          QuickUtils
        </Link>

        <div className="flex items-center">
          <Link className="nav-link" href="/">
            Home
          </Link>
          <Link className="nav-link" href="/about">
            About
          </Link>
          <Link className="nav-link" href="/contact">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
