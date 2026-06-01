'use client';

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
  type ReactElement,
  type SVGProps,
} from 'react';
import { Check, Copy } from 'lucide-react';
import { usePathname } from 'next/navigation';

const EXCLUDED_PATHS = new Set<string>(['/', '/about', '/contact']);

interface ShareLink {
  id: string;
  label: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
}

function normalizePath(pathname: string): string {
  if (pathname === '/') return pathname;
  return pathname.replace(/\/$/, '');
}

function subscribeToPageChanges(onStoreChange: () => void): () => void {
  window.addEventListener('hashchange', onStoreChange);
  window.addEventListener('popstate', onStoreChange);

  return (): void => {
    window.removeEventListener('hashchange', onStoreChange);
    window.removeEventListener('popstate', onStoreChange);
  };
}

function getCurrentUrl(): string {
  return window.location.href;
}

function getServerUrl(): string {
  return '';
}

function getPageTitle(): string {
  return document.title || 'QuickUtils';
}

function getServerTitle(): string {
  return 'QuickUtils';
}

function FacebookIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M14.2 8.3V6.8c0-.7.5-.9.9-.9h2.2V2.2L14.2 2c-3.4 0-4.5 2.1-4.5 4.5v1.8H6.8v3.9h2.9V22h4.1v-9.8h3.1l.5-3.9h-3.2Z"
      />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M6.9 8.9H3.1V21h3.8V8.9ZM5 7.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4ZM21 21h-3.8v-6.6c0-1.7-.6-2.8-2-2.8-1.1 0-1.8.8-2.1 1.5-.1.3-.1.7-.1 1V21H9.2V8.9H13v1.7c.5-.8 1.4-2 3.5-2 2.6 0 4.5 1.7 4.5 5.3V21Z"
      />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M14.1 10.2 21.6 2h-1.8l-6.5 7.1L8.1 2h-6l7.9 10.8L2.1 22h1.8l6.9-7.8 5.6 7.8h6l-8.3-11.8Zm-2.4 2.7-.8-1.1L4.6 3.4h2.6l5.1 6.8.8 1.1 6.6 9.1h-2.6l-5.4-7.5Z"
      />
    </svg>
  );
}

function WhatsAppIcon(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 2.2A9.7 9.7 0 0 0 3.7 17l-1.2 4.8 4.9-1.2A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3a8 8 0 1 1 6.7 3.6Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.2.2-.3.2-.6.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2.1-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.7 1.2 2.9c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1-.1-.2-.3-.3-.5-.4Z"
      />
    </svg>
  );
}

function copyWithFallback(value: string): boolean {
  const textArea = document.createElement('textarea');

  textArea.value = value;
  textArea.className = 'fixed left-0 top-0 h-px w-px opacity-0';
  textArea.setAttribute('readonly', 'true');

  document.body.appendChild(textArea);
  textArea.select();

  const didCopy = document.execCommand('copy');
  document.body.removeChild(textArea);

  return didCopy;
}

export default function ShareRail(): ReactElement | null {
  const pathname = usePathname();
  const currentUrl = useSyncExternalStore(subscribeToPageChanges, getCurrentUrl, getServerUrl);
  const pageTitle = useSyncExternalStore(subscribeToPageChanges, getPageTitle, getServerTitle);
  const [copied, setCopied] = useState<boolean>(false);
  const copyResetTimer = useRef<number | null>(null);

  const normalizedPath = normalizePath(pathname);

  useEffect(() => {
    return (): void => {
      if (copyResetTimer.current !== null) {
        window.clearTimeout(copyResetTimer.current);
      }
    };
  }, []);

  if (EXCLUDED_PATHS.has(normalizedPath)) {
    return null;
  }

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(pageTitle);
  const encodedMessage = encodeURIComponent(`${pageTitle} ${currentUrl}`);

  const links: ShareLink[] = [
    {
      id: 'facebook',
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: FacebookIcon,
    },
    {
      id: 'linkedin',
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: LinkedinIcon,
    },
    {
      id: 'x',
      label: 'Share on X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: XIcon,
    },
    {
      id: 'whatsapp',
      label: 'Share on WhatsApp',
      href: `https://wa.me/?text=${encodedMessage}`,
      icon: WhatsAppIcon,
    },
  ];

  function handleShareClick(event: MouseEvent<HTMLAnchorElement>): void {
    if (!currentUrl) {
      event.preventDefault();
    }
  }

  async function handleCopyClick(): Promise<void> {
    if (!currentUrl) return;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        copyWithFallback(currentUrl);
      }

      setCopied(true);
      if (copyResetTimer.current !== null) {
        window.clearTimeout(copyResetTimer.current);
      }
      copyResetTimer.current = window.setTimeout((): void => setCopied(false), 1800);
    } catch {
      if (copyWithFallback(currentUrl)) {
        setCopied(true);
        if (copyResetTimer.current !== null) {
          window.clearTimeout(copyResetTimer.current);
        }
        copyResetTimer.current = window.setTimeout((): void => setCopied(false), 1800);
      }
    }
  }

  return (
    <>
      <aside
        className="pointer-events-none fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
        aria-label="Share this page"
      >
        <div className="pointer-events-auto flex flex-col gap-2 rounded-full border border-border bg-card/95 p-2 shadow-[0_12px_36px_rgba(26,25,23,0.14)] backdrop-blur-xl">
          {links.map((link: ShareLink) => {
            const Icon = link.icon;

            return (
              <a
                key={link.id}
                href={currentUrl ? link.href : '#'}
                target="_blank"
                rel="noopener noreferrer nofollow"
                onClick={handleShareClick}
                className="group relative flex h-11 w-11 items-center justify-center rounded-full text-muted transition hover:bg-background hover:text-brand focus:outline-none focus:ring-4 focus:ring-brand/15"
                aria-label={link.label}
              >
                <Icon className="h-5 w-5" />
                <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg border border-border bg-text px-2.5 py-1.5 text-xs font-semibold text-card opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  {link.label.replace('Share on ', '')}
                </span>
              </a>
            );
          })}

          <button
            type="button"
            onClick={handleCopyClick}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full text-muted transition hover:bg-background hover:text-brand focus:outline-none focus:ring-4 focus:ring-brand/15"
            aria-label={copied ? 'Link copied' : 'Copy page link'}
          >
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg border border-border bg-text px-2.5 py-1.5 text-xs font-semibold text-card opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100">
              {copied ? 'Copied' : 'Copy link'}
            </span>
          </button>
        </div>
      </aside>

      <aside
        className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 lg:hidden"
        aria-label="Share this page"
      >
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-border bg-card/95 p-1.5 shadow-[0_14px_40px_rgba(26,25,23,0.16)] backdrop-blur-xl">
          {links.map((link: ShareLink) => {
            const Icon = link.icon;

            return (
              <a
                key={link.id}
                href={currentUrl ? link.href : '#'}
                target="_blank"
                rel="noopener noreferrer nofollow"
                onClick={handleShareClick}
                className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition hover:bg-background hover:text-brand focus:outline-none focus:ring-4 focus:ring-brand/15"
                aria-label={link.label}
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}

          <button
            type="button"
            onClick={handleCopyClick}
            className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition hover:bg-background hover:text-brand focus:outline-none focus:ring-4 focus:ring-brand/15"
            aria-label={copied ? 'Link copied' : 'Copy page link'}
          >
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
          </button>
        </div>
      </aside>
    </>
  );
}
