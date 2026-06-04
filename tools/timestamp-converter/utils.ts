export interface TimeResult {
  unixSeconds: number;
  unixMs: number;
  iso: string;
  human: string;
  relative: string;
  timezones: Record<string, string>;
}

const COMMON_TIMEZONES = [
  'UTC', 'America/New_York', 'America/Chicago', 'America/Los_Angeles', 'America/Sao_Paulo',
  'Europe/London', 'Europe/Berlin', 'Europe/Paris', 'Africa/Johannesburg',
  'Asia/Tokyo', 'Asia/Kolkata', 'Asia/Singapore', 'Asia/Dubai',
  'Australia/Sydney', 'Pacific/Auckland'
];

export function parseTimestamp(input: string): Date | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Unix seconds or ms
  const num = Number(trimmed);
  if (!isNaN(num)) {
    if (num > 1e12) return new Date(num); // ms
    if (num > 1e9) return new Date(num * 1000); // seconds
  }

  // Try native parse (ISO, human, etc)
  const d = new Date(trimmed);
  if (!isNaN(d.getTime())) return d;

  return null;
}

export function convertTimestamp(input: string): TimeResult | null {
  const date = parseTimestamp(input);
  if (!date) return null;

  const unixMs = date.getTime();
  const unixSeconds = Math.floor(unixMs / 1000);

  const iso = date.toISOString();

  const human = date.toLocaleString(undefined, {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short'
  });

  const now = Date.now();
  const diff = now - unixMs;
  const abs = Math.abs(diff);
  let relative = '';
  if (abs < 60000) relative = diff < 0 ? 'in a few seconds' : 'just now';
  else if (abs < 3600000) relative = `${Math.round(abs / 60000)} minute${Math.round(abs / 60000) === 1 ? '' : 's'} ${diff < 0 ? 'from now' : 'ago'}`;
  else if (abs < 86400000) relative = `${Math.round(abs / 3600000)} hour${Math.round(abs / 3600000) === 1 ? '' : 's'} ${diff < 0 ? 'from now' : 'ago'}`;
  else relative = `${Math.round(abs / 86400000)} day${Math.round(abs / 86400000) === 1 ? '' : 's'} ${diff < 0 ? 'from now' : 'ago'}`;

  const timezones: Record<string, string> = {};
  COMMON_TIMEZONES.forEach(tz => {
    try {
      timezones[tz] = date.toLocaleString(undefined, { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      timezones[tz] = 'Invalid zone';
    }
  });

  return { unixSeconds, unixMs, iso, human, relative, timezones };
}

export function batchConvert(inputs: string[]): Array<{ input: string; result: TimeResult | null }> {
  return inputs.map(input => ({ input, result: convertTimestamp(input) }));
}

export function nowAsAll(): TimeResult {
  return convertTimestamp(Date.now().toString())!;
}
