export type CaseType =
  | 'upper'
  | 'lower'
  | 'title'
  | 'sentence'
  | 'camel'
  | 'pascal'
  | 'snake'
  | 'kebab'
  | 'constant'
  | 'alternating'
  | 'inverse';

export interface CaseOption {
  key: CaseType;
  label: string;
  example: string;
}

export const CASE_OPTIONS: CaseOption[] = [
  { key: 'upper', label: 'UPPER CASE', example: 'HELLO WORLD' },
  { key: 'lower', label: 'lower case', example: 'hello world' },
  { key: 'title', label: 'Title Case', example: 'Hello World' },
  { key: 'sentence', label: 'Sentence case', example: 'Hello world' },
  { key: 'camel', label: 'camelCase', example: 'helloWorld' },
  { key: 'pascal', label: 'PascalCase', example: 'HelloWorld' },
  { key: 'snake', label: 'snake_case', example: 'hello_world' },
  { key: 'kebab', label: 'kebab-case', example: 'hello-world' },
  { key: 'constant', label: 'CONSTANT_CASE', example: 'HELLO_WORLD' },
  { key: 'alternating', label: 'aLtErNaTiNg', example: 'hElLo WoRlD' },
  { key: 'inverse', label: 'iNVERSE cASE', example: 'hELLO wORLD' },
];

function words(text: string): string[] {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_\-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function convertCase(text: string, type: CaseType): string {
  if (!text) return '';
  switch (type) {
    case 'upper': return text.toUpperCase();
    case 'lower': return text.toLowerCase();
    case 'title': return text.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    case 'sentence': {
      const s = text.toLowerCase();
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
    case 'camel': {
      const ws = words(text.toLowerCase());
      return (ws[0] ?? '') + ws.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    }
    case 'pascal': return words(text.toLowerCase()).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    case 'snake': return words(text.toLowerCase()).join('_');
    case 'kebab': return words(text.toLowerCase()).join('-');
    case 'constant': return words(text.toUpperCase()).join('_');
    case 'alternating': return text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
    case 'inverse': return text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
    default: return text;
  }
}
