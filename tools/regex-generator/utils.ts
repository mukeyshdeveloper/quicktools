export interface RegexResult {
  pattern: string;
  flags: string;
  explanation: string;
  testResults: Array<{ input: string; matches: boolean; groups?: string[] }>;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function looksLikeEmail(s: string) { return /@/.test(s) && /\.[a-z]{2,}$/i.test(s); }
function looksLikeUrl(s: string) { return /^https?:\/\//i.test(s) || /^www\./i.test(s); }
function looksLikePhone(s: string) { return /[\d\s().-]{7,}/.test(s) && /\d{3,}/.test(s); }
function looksLikeDate(s: string) { return /\d{4}[-/]\d{1,2}[-/]\d{1,2}/.test(s) || /\d{1,2}[-/]\d{1,2}[-/]\d{2,4}/.test(s); }
function looksLikeIp(s: string) { return /^\d{1,3}(\.\d{1,3}){3}$/.test(s); }

export function generateRegexFromExamples(positive: string[], negative: string[] = []): RegexResult {
  if (positive.length === 0) {
    return { pattern: '.*', flags: '', explanation: 'Add at least one example that should match.', testResults: [] };
  }

  // Smart inference for common cases
  const all = [...positive, ...negative];
  if (positive.every(looksLikeEmail)) {
    const pat = '^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$';
    const flags = 'i';
    const re = new RegExp(pat, flags);
    const testResults = all.map(input => ({ input, matches: re.test(input) }));
    return { pattern: pat, flags, explanation: 'Common email pattern inferred from examples.', testResults };
  }
  if (positive.every(looksLikeUrl)) {
    const pat = '^https?://[^\\s/$.?#].[^\\s]*$';
    const flags = 'i';
    const re = new RegExp(pat, flags);
    const testResults = all.map(input => ({ input, matches: re.test(input) }));
    return { pattern: pat, flags, explanation: 'Basic http/https URL pattern.', testResults };
  }
  if (positive.every(looksLikePhone)) {
    const pat = '^[+]?[0-9][\\d\\s().-]{6,}[0-9]$';
    const testResults = all.map(input => ({ input, matches: new RegExp(pat).test(input) }));
    return { pattern: pat, flags: '', explanation: 'Loose international phone number pattern.', testResults };
  }
  if (positive.every(looksLikeDate)) {
    const pat = '^\\d{4}[-/]\\d{1,2}[-/]\\d{1,2}$|^\\d{1,2}[-/]\\d{1,2}[-/]\\d{2,4}$';
    const testResults = all.map(input => ({ input, matches: new RegExp(pat).test(input) }));
    return { pattern: pat, flags: '', explanation: 'Common date formats (YYYY-MM-DD or MM/DD/YYYY).', testResults };
  }
  if (positive.every(looksLikeIp)) {
    const pat = '^(?:[0-9]{1,3}\\.){3}[0-9]{1,3}$';
    const testResults = all.map(input => ({ input, matches: new RegExp(pat).test(input) }));
    return { pattern: pat, flags: '', explanation: 'Simple IPv4 address pattern.', testResults };
  }

  // Generic prefix/suffix + length or char class
  const prefix = (() => {
    let p = positive[0] || '';
    for (const s of positive) while (p && !s.startsWith(p)) p = p.slice(0, -1);
    return p;
  })();
  const suffix = (() => {
    let suf = positive[0] || '';
    for (const s of positive) while (suf && !s.endsWith(suf)) suf = suf.slice(1);
    return suf.split('').reverse().join('').split('').reverse().join('');
  })();

  let core = '.+?';
  const middles = positive.map(s => s.slice(prefix.length, s.length - suffix.length));
  if (middles.length && middles.every(m => /^\d+$/.test(m))) core = '\\d+';
  else if (middles.length && middles.every(m => /^[a-zA-Z]+$/.test(m))) core = '[a-zA-Z]+';
  else if (middles.length && middles.every(m => /^[0-9a-fA-F]+$/.test(m))) core = '[0-9a-fA-F]+';
  else {
    const lens = middles.map(m => m.length);
    const minL = Math.min(...lens), maxL = Math.max(...lens);
    core = minL === maxL ? `.{${minL}}` : `.{${minL},${maxL}}`;
  }

  let flags = '';
  const needsI = positive.some((s, i) => (s || '').toLowerCase() !== (positive[i] || '').toLowerCase());
  if (needsI) flags = 'i';

  const pattern = `^${escapeRegex(prefix || '')}${core}${escapeRegex(suffix || '')}$`;

  const testResults = all.map(input => {
    try {
      const re = new RegExp(pattern, flags);
      const m = re.exec(input || '');
      const groups = m ? m.slice(1).filter((g): g is string => g !== undefined) : undefined;
      return { input: input || '', matches: !!m, groups };
    } catch { return { input: input || '', matches: false }; }
  });

  const explanation = prefix || suffix
    ? `Anchored to prefix "${prefix}" + core ${core} + suffix "${suffix}".`
    : `Generic pattern using character class / length inference.`;

  return { pattern, flags, explanation, testResults: testResults as any };
}

export function testCustomRegex(pattern: string, flags: string, inputs: string[]) {
  try {
    const re = new RegExp(pattern, flags);
    return inputs.map(input => {
      const m = re.exec(input || '');
      const groups = m ? m.slice(1).filter((g): g is string => g !== undefined) : undefined;
      return { input: input || '', matches: !!m, groups };
    });
  } catch (e: any) {
    return inputs.map(input => ({ input: input || '', matches: false, error: e.message }));
  }
}
