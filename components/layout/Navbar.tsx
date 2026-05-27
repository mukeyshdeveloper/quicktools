import Link from 'next/link';

export default function Navbar(): React.ReactElement {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-extrabold text-text"
          aria-label="QuickUtils homepage"
        >
          <span className="h-2 w-2 rounded-full bg-brand shadow-[0_0_12px_rgba(45,106,79,0.55)]" />
          QuickUtils
        </Link>

        <div className="flex items-center gap-1">
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
