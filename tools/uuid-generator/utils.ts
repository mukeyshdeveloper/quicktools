/**
 * Generate standard cryptographically secure random bytes if available,
 * otherwise fall back to math.random.
 */
function getRandomBytes(count: number): Uint8Array {
  const bytes = new Uint8Array(count);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < count; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  return bytes;
}

/**
 * Generate a UUID v4 (Random).
 */
export function generateV4(): string {
  const bytes = getRandomBytes(16);
  // Set version to 4
  bytes[6] = (bytes[6]! & 0x0f) | 0x40;
  // Set variant to RFC 4122
  bytes[8] = (bytes[8]! & 0x3f) | 0x80;

  return bytesToUuid(bytes);
}

/**
 * Generate a UUID v1 (Time-based).
 */
export function generateV1(): string {
  const bytes = getRandomBytes(16);
  const now = Date.now();
  // 100-nanosecond intervals since Oct 15, 1582
  const gregorianEpoch = BigInt(12219292800000);
  const intervals = (BigInt(now) + gregorianEpoch) * BigInt(10000);

  const timeLow = Number(intervals & BigInt(0xffffffff));
  const timeMid = Number((intervals >> BigInt(32)) & BigInt(0xffff));
  const timeHi = Number((intervals >> BigInt(48)) & BigInt(0x0fff));

  bytes[0] = (timeLow >> 24) & 0xff;
  bytes[1] = (timeLow >> 16) & 0xff;
  bytes[2] = (timeLow >> 8) & 0xff;
  bytes[3] = timeLow & 0xff;
  bytes[4] = (timeMid >> 8) & 0xff;
  bytes[5] = timeMid & 0xff;
  bytes[6] = ((timeHi >> 8) & 0x0f) | 0x10; // version 1
  bytes[7] = timeHi & 0xff;
  bytes[8] = (bytes[8]! & 0x3f) | 0x80; // variant

  return bytesToUuid(bytes);
}

/**
 * Generate a UUID v7 (Time-ordered, Unix Epoch).
 */
export function generateV7(): string {
  const bytes = getRandomBytes(16);
  const timestamp = Date.now(); // Milliseconds since Unix Epoch

  // 48-bit timestamp
  bytes[0] = (timestamp >> 40) & 0xff;
  bytes[1] = (timestamp >> 32) & 0xff;
  bytes[2] = (timestamp >> 24) & 0xff;
  bytes[3] = (timestamp >> 16) & 0xff;
  bytes[4] = (timestamp >> 8) & 0xff;
  bytes[5] = timestamp & 0xff;

  // Set version to 7
  bytes[6] = (bytes[6]! & 0x0f) | 0x70;
  // Set variant to RFC 4122
  bytes[8] = (bytes[8]! & 0x3f) | 0x80;

  return bytesToUuid(bytes);
}

/**
 * Utility to convert 16 bytes array into standard UUID hex format.
 */
function bytesToUuid(bytes: Uint8Array): string {
  const hex: string[] = [];
  for (let i = 0; i < 16; i++) {
    const val = bytes[i]!;
    hex.push((val < 16 ? '0' : '') + val.toString(16));
  }

  return [
    hex.slice(0, 4).join(''),
    hex.slice(4, 6).join(''),
    hex.slice(6, 8).join(''),
    hex.slice(8, 10).join(''),
    hex.slice(10, 16).join(''),
  ].join('-');
}

export interface GeneratorOptions {
  version: 'v4' | 'v1' | 'v7';
  count: number;
  uppercase: boolean;
  hyphens: boolean;
  braces: boolean;
  separator: 'newline' | 'comma' | 'semicolon' | 'space' | 'json' | 'array';
}

export function generateBulk(options: GeneratorOptions): string[] {
  const rawList: string[] = [];
  for (let i = 0; i < options.count; i++) {
    let id = '';
    if (options.version === 'v1') id = generateV1();
    else if (options.version === 'v7') id = generateV7();
    else id = generateV4();

    if (!options.hyphens) {
      id = id.replace(/-/g, '');
    }
    if (options.uppercase) {
      id = id.toUpperCase();
    }
    if (options.braces) {
      id = `{${id}}`;
    }
    rawList.push(id);
  }
  return rawList;
}

export function formatUuidList(list: string[], separator: GeneratorOptions['separator']): string {
  if (separator === 'comma') return list.join(', ');
  if (separator === 'semicolon') return list.join('; ');
  if (separator === 'space') return list.join(' ');
  if (separator === 'json') return JSON.stringify(list, null, 2);
  if (separator === 'array') {
    return '[\n  ' + list.map(item => `"${item}"`).join(',\n  ') + '\n]';
  }
  return list.join('\n');
}
