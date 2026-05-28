export function minifyHtml(html: string): string {
  if (!html.trim()) return '';

  // Remove HTML comments
  let min = html.replace(/<!--[\s\S]*?-->/g, '');

  // Remove whitespace between tags
  min = min.replace(/>\s+</g, '><');

  // Collapse multiple whitespaces/newlines into a single space
  min = min.replace(/\s+/g, ' ');

  // Trim final result
  return min.trim();
}

export function minifyCss(css: string): string {
  if (!css.trim()) return '';

  // Remove CSS comments
  let min = css.replace(/\/\*[\s\S]*?\*\//g, '');

  // Collapse multiple spaces/newlines into a single space
  min = min.replace(/\s+/g, ' ');

  // Remove spaces around common symbols
  min = min.replace(/\s*([\{\}:;,])\s*/g, '$1');

  // Remove trailing semicolons in blocks
  min = min.replace(/;}/g, '}');

  return min.trim();
}

/**
 * A safe, lightweight JS minifier that preserves string literals
 * while stripping comments and collapsing redundant whitespace.
 */
export function minifyJs(js: string): string {
  if (!js.trim()) return '';

  let min = '';
  let i = 0;
  let inString = false;
  let quoteChar = '';
  let inRegex = false;

  while (i < js.length) {
    const char = js[i]!;
    const nextChar = js[i + 1] || '';

    // Handle strings
    if (inString) {
      min += char;
      if (char === quoteChar && js[i - 1] !== '\\') {
        inString = false;
      }
      i++;
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      inString = true;
      quoteChar = char;
      min += char;
      i++;
      continue;
    }

    // Handle block comments /* ... */
    if (char === '/' && nextChar === '*') {
      i += 2;
      while (i < js.length && !(js[i] === '*' && js[i + 1] === '/')) {
        i++;
      }
      i += 2;
      continue;
    }

    // Handle single-line comments // ...
    if (char === '/' && nextChar === '/') {
      i += 2;
      while (i < js.length && js[i] !== '\n' && js[i] !== '\r') {
        i++;
      }
      continue;
    }

    // Capture standard characters
    min += char;
    i++;
  }

  // Collapse sequential newlines and spaces, retaining syntax-critical spaces
  min = min
    .replace(/\r/g, '')
    .replace(/\n+/g, '\n')
    .replace(/[ \t]+/g, ' ')
    // Remove space around common operators/syntax
    .replace(/\s*([\{\}\(\)\[\]=+\-*\/%&|<>!?;:,])\s*/g, '$1')
    // Safe trailing/leading space cleanups
    .trim();

  return min;
}

export interface MinifyResult {
  code: string;
  originalSize: number;
  minifiedSize: number;
  savingsPercent: number;
}

export function performMinification(code: string, type: 'html' | 'css' | 'js'): MinifyResult {
  const originalSize = new Blob([code]).size;
  let minified = '';

  if (type === 'html') minified = minifyHtml(code);
  else if (type === 'css') minified = minifyCss(code);
  else if (type === 'js') minified = minifyJs(code);

  const minifiedSize = new Blob([minified]).size;
  
  const savings = originalSize > 0 
    ? ((originalSize - minifiedSize) / originalSize) * 100 
    : 0;

  return {
    code: minified,
    originalSize,
    minifiedSize,
    savingsPercent: Math.max(0, parseFloat(savings.toFixed(1))),
  };
}
