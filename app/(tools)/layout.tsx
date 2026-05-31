import AdBanner from '@/components/layout/AdBanner';
import { AD_SLOTS } from '@/lib/site';

interface ToolsLayoutProps {
  children: React.ReactNode;
}

export default function ToolsLayout({ children }: ToolsLayoutProps) {
  return (
    <>
      {/* Top ad slot */}
      {AD_SLOTS.top && (
        <AdBanner slot={AD_SLOTS.top} className="mb-8" />
      )}

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        {children}
      </div>

      {/* Bottom ad slot */}
      {AD_SLOTS.bottom && (
        <AdBanner slot={AD_SLOTS.bottom} className="mt-8" />
      )}
    </>
  );
}
