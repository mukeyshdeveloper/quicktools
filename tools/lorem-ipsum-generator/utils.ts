const WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'reprehenderit', 'in', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'perspiciatis', 'unde',
  'omnis', 'iste', 'natus', 'error', 'accusantium', 'doloremque', 'laudantium',
  'totam', 'rem', 'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'inventore', 'veritatis',
  'quasi', 'architecto', 'beatae', 'vitae', 'dicta', 'explicabo', 'nemo', 'ipsam',
  'quia', 'voluptas', 'aspernatur', 'odit', 'fugit', 'consequuntur', 'magni',
  'dolores', 'ratione', 'sequi', 'nesciunt', 'neque', 'porro', 'quisquam', 'dolorem',
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)] as T;
}

function sentence(minW = 6, maxW = 14): string {
  const len = minW + Math.floor(Math.random() * (maxW - minW));
  const ws = Array.from({ length: len }, () => pick(WORDS));
  const first = ws[0];
  if (first) ws[0] = first.charAt(0).toUpperCase() + first.slice(1);
  return ws.join(' ') + '.';
}

function paragraph(minS = 3, maxS = 6): string {
  const len = minS + Math.floor(Math.random() * (maxS - minS));
  return Array.from({ length: len }, () => sentence()).join(' ');
}

export interface LoremOptions {
  type: 'paragraphs' | 'sentences' | 'words';
  count: number;
  startWithLorem: boolean;
}

export function generateLorem(opts: LoremOptions): string {
  const { type, count, startWithLorem } = opts;
  const LOREM_START = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

  if (type === 'words') {
    const ws = Array.from({ length: count }, () => pick(WORDS));
    if (startWithLorem) ws.splice(0, 0, ...LOREM_START.split(' ').slice(0, Math.min(5, count)));
    return ws.slice(0, count).join(' ');
  }

  if (type === 'sentences') {
    const ss = Array.from({ length: count }, () => sentence());
    if (startWithLorem && ss.length > 0) ss[0] = LOREM_START;
    return ss.join(' ');
  }

  // paragraphs
  const ps = Array.from({ length: count }, () => paragraph());
  if (startWithLorem && ps.length > 0) {
    ps[0] = LOREM_START + ' ' + (ps[0] ?? '');
  }
  return ps.join('\n\n');
}
