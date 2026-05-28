export interface RegexMatch {
  match: string;
  index: number;
  groups: string[];
}

export interface RegexResult {
  isValid: boolean;
  error: string | null;
  matches: RegexMatch[];
  highlightedHtml: string;
}

export function testRegex(pattern: string, flags: string, text: string): RegexResult {
  if (!pattern) {
    return { isValid: true, error: null, matches: [], highlightedHtml: escapeHtml(text) };
  }

  let regex: RegExp;
  try {
    regex = new RegExp(pattern, flags);
  } catch (err: any) {
    return { isValid: false, error: err.message, matches: [], highlightedHtml: escapeHtml(text) };
  }

  const matches: RegexMatch[] = [];
  let highlightedHtml = '';
  let lastIndex = 0;

  // We must ensure the global flag is set if we want to find all matches, otherwise it loops infinitely
  const isGlobal = flags.includes('g');
  const safeRegex = new RegExp(regex.source, isGlobal ? regex.flags : regex.flags + 'g');

  let match;
  // Fallback to prevent infinite loops in edge cases
  let iterations = 0;
  
  while ((match = safeRegex.exec(text)) !== null) {
    if (iterations++ > 5000) break; // safeguard
    
    // If the match is empty (e.g. ^ or $ or .* matching empty string), prevent infinite loop
    if (match.index === safeRegex.lastIndex) {
      safeRegex.lastIndex++;
    }

    if (match[0].length === 0) continue; // ignore zero-length matches for highlighting

    matches.push({
      match: match[0],
      index: match.index,
      groups: match.slice(1),
    });

    // Build highlighted HTML
    highlightedHtml += escapeHtml(text.substring(lastIndex, match.index));
    highlightedHtml += `<mark class="bg-violet-200 dark:bg-violet-900/50 text-violet-900 dark:text-violet-100 rounded px-0.5">${escapeHtml(match[0])}</mark>`;
    lastIndex = match.index + match[0].length;

    if (!isGlobal) break; // only find first match if not global
  }

  highlightedHtml += escapeHtml(text.substring(lastIndex));

  return {
    isValid: true,
    error: null,
    matches,
    highlightedHtml: highlightedHtml || escapeHtml(text),
  };
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
