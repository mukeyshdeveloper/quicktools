export interface ConverterOptions {
  delimiter: 'comma' | 'semicolon' | 'pipe' | 'space' | 'newline' | 'custom';
  customDelimiter: string;
  quoteStyle: 'none' | 'single' | 'double' | 'bracket';
  addSpaceAfterDelimiter: boolean;
  trimItems: boolean;
  removeEmpty: boolean;
  removeDuplicates: boolean;
}

export function convertList(input: string, mode: 'to-delimited' | 'to-list', options: ConverterOptions): string {
  if (!input) return '';

  let items: string[] = [];

  if (mode === 'to-delimited') {
    // Treat any newline as separator when converting to delimited
    items = input.split(/\r?\n/);
  } else {
    // Mode: delimited to list
    // Figure out the delimiter to split by
    let del = '';
    switch (options.delimiter) {
      case 'comma': del = ','; break;
      case 'semicolon': del = ';'; break;
      case 'pipe': del = '|'; break;
      case 'space': del = ' '; break;
      case 'custom': del = options.customDelimiter; break;
      default: del = ','; break;
    }
    
    if (!del) del = ',';

    // We split by the delimiter.
    items = input.split(del);

    // If there's an expected space after delimiter, they might have typed ", ".
    // Splitting by ',' leaves a leading space on the next item, which `trimItems` will fix.
  }

  // Processing
  if (options.trimItems) {
    items = items.map(item => item.trim());
  }

  if (options.removeEmpty) {
    items = items.filter(item => item.length > 0);
  }

  if (options.removeDuplicates) {
    items = Array.from(new Set(items));
  }

  // Output formatting
  if (mode === 'to-delimited') {
    // Apply quotes
    items = items.map(item => {
      switch (options.quoteStyle) {
        case 'single': return `'${item}'`;
        case 'double': return `"${item}"`;
        case 'bracket': return `[${item}]`;
        default: return item;
      }
    });

    let del = '';
    switch (options.delimiter) {
      case 'comma': del = ','; break;
      case 'semicolon': del = ';'; break;
      case 'pipe': del = '|'; break;
      case 'space': del = ' '; break;
      case 'newline': del = '\n'; break;
      case 'custom': del = options.customDelimiter; break;
    }

    if (options.addSpaceAfterDelimiter && options.delimiter !== 'space' && options.delimiter !== 'newline') {
      del += ' ';
    }

    return items.join(del);
  } else {
    // Outputting as list (newlines)
    // Strip quotes if they were added (optional, but typically desired when converting back)
    if (options.quoteStyle !== 'none') {
      items = items.map(item => {
        if (options.quoteStyle === 'single' && item.startsWith("'") && item.endsWith("'")) return item.slice(1, -1);
        if (options.quoteStyle === 'double' && item.startsWith('"') && item.endsWith('"')) return item.slice(1, -1);
        if (options.quoteStyle === 'bracket' && item.startsWith('[') && item.endsWith(']')) return item.slice(1, -1);
        return item;
      });
    }
    return items.join('\n');
  }
}
