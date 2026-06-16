import Link from 'next/link';

export default function Footer(): React.ReactElement {
  return (
    <footer className="border-t border-border bg-card px-4 py-6 text-xs text-muted">
 <div className="max-w-5xl mx-auto">
    
    <div className="space-y-8">
   
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        <div>
          <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">QuickUtils</p>
          <p className="text-sm text-muted/70">Free tools for developers & makers.</p>
        </div>
        
        <div>
          <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Navigate</p>
          <ul className="space-y-2">
            <li><a href="/about" className="text-sm text-muted hover:text-foreground transition-colors">About</a></li>
            <li><a href="/contact" className="text-sm text-muted hover:text-foreground transition-colors">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Legal</p>
          <ul className="space-y-2">
            <li><a href="/privacy-policy" className="text-sm text-muted hover:text-foreground transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
        
        <div>
          <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Social</p>
          <ul className="space-y-2">
            <li><a href="https://twitter.com/thequickutils" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-brand transition-colors">Twitter/X</a></li>
          </ul>
        </div>
      </div>
 

      <div className="h-px bg-border/40"></div>
 

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-muted/60">
        <p>© 2026 QuickUtils · Made in India 🇮🇳</p>
        <a href="https://pitchwall.co/product/quickutils?utm_source=badge" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
          <img src="https://pitchwall.co/images/listed/pitchwall-light.png" width="140" height="48" alt="Listed on PitchWall" className="h-[48px] w-auto"/>
        </a>
      </div>
    </div>
  </div>

    </footer>
  );
}
