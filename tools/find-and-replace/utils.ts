export interface FindReplaceOptions {
  findText: string;
  replaceText: string;
  matchCase: boolean;
  wholeWord: boolean;
  useRegex: boolean;
}

export interface FindReplaceResult {
  output: string;
  matchCount: number;
  error: string | null;
}

export function performFindReplace(input: string, options: FindReplaceOptions): FindReplaceResult {
  if (!input || !options.findText) {
    return { output: input, matchCount: 0, error: null };
  }

  let regex: RegExp;
  let flags = 'g';
  if (!options.matchCase) flags += 'i';

  try {
    let searchPattern = options.findText;

    if (!options.useRegex) {
      // Escape all regex characters to treat as literal string
      searchPattern = searchPattern.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&');
    }

    if (options.wholeWord) {
      searchPattern = `\\b${searchPattern}\\b`;
    }

    regex = new RegExp(searchPattern, flags);
  } catch (err: any) {
    return { output: input, matchCount: 0, error: 'Invalid Regular Expression' };
  }

  // Count matches
  const matches = input.match(regex);
  const matchCount = matches ? matches.length : 0;

  let replacement = options.replaceText;
  if (!options.useRegex) {
    // If not using regex, we must prevent string replacement patterns like $1 from being evaluated
    // But actually, JavaScript string replace takes a string. If the user typed "$1" literally and they didn't mean regex,
    // we should replace it exactly. To do that in .replace(), we use a replacer function to avoid $ replacement.
    const replacerFn = () => replacement;
    const output = input.replace(regex, replacerFn);
    return { output, matchCount, error: null };
  }

  // If using Regex, let standard replacement string patterns like $1 work
  const output = input.replace(regex, replacement);

  return { output, matchCount, error: null };
}
