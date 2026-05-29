export interface ProcessOptions {
  removeDuplicates: boolean;
  caseSensitive: boolean;
  removeEmpty: boolean;
  trimLines: boolean;
  sortType: 'none' | 'a-z' | 'z-a' | 'length-asc' | 'length-desc';
}

export interface ProcessResult {
  output: string;
  originalCount: number;
  newCount: number;
  removedCount: number;
}

export function processTextList(text: string, options: ProcessOptions): ProcessResult {
  if (!text) {
    return { output: '', originalCount: 0, newCount: 0, removedCount: 0 };
  }

  // Split by newline
  let lines = text.split(/\r?\n/);
  const originalCount = lines.length;

  // Trim if enabled
  if (options.trimLines) {
    lines = lines.map(line => line.trim());
  }

  // Remove empty if enabled
  if (options.removeEmpty) {
    lines = lines.filter(line => line.length > 0);
  }

  // Remove duplicates if enabled
  if (options.removeDuplicates) {
    if (options.caseSensitive) {
      lines = Array.from(new Set(lines));
    } else {
      const seen = new Set<string>();
      const uniqueLines: string[] = [];
      for (const line of lines) {
        const lower = line.toLowerCase();
        if (!seen.has(lower)) {
          seen.add(lower);
          uniqueLines.push(line); // push original casing
        }
      }
      lines = uniqueLines;
    }
  }

  // Sorting
  if (options.sortType !== 'none') {
    lines.sort((a, b) => {
      const cmpA = options.caseSensitive ? a : a.toLowerCase();
      const cmpB = options.caseSensitive ? b : b.toLowerCase();
      
      switch (options.sortType) {
        case 'a-z':
          return cmpA.localeCompare(cmpB);
        case 'z-a':
          return cmpB.localeCompare(cmpA);
        case 'length-asc':
          return a.length - b.length || cmpA.localeCompare(cmpB);
        case 'length-desc':
          return b.length - a.length || cmpA.localeCompare(cmpB);
        default:
          return 0;
      }
    });
  }

  const output = lines.join('\n');
  const newCount = lines.length;

  return {
    output,
    originalCount,
    newCount,
    removedCount: originalCount - newCount,
  };
}
