export interface JwtParts {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  isExpired: boolean | null;
  expiresAt: string | null;
  issuedAt: string | null;
  algorithm: string | null;
}

function b64decode(str: string): string {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4;
  const padded2 = pad ? padded + '='.repeat(4 - pad) : padded;
  return decodeURIComponent(
    atob(padded2)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
}

function formatTs(ts: unknown): string | null {
  if (typeof ts !== 'number') return null;
  try {
    return new Date(ts * 1000).toLocaleString();
  } catch {
    return null;
  }
}

export function decodeJwt(token: string): { parts: JwtParts | null; error: string | null } {
  const parts = token.trim().split('.');
  if (parts.length !== 3) {
    return { parts: null, error: 'Invalid JWT — must have exactly 3 parts (header.payload.signature).' };
  }

  try {
    const header = JSON.parse(b64decode(parts[0] ?? '')) as Record<string, unknown>;
    const payload = JSON.parse(b64decode(parts[1] ?? '')) as Record<string, unknown>;
    const signature = parts[2] ?? '';

    const exp = payload['exp'];
    const iat = payload['iat'];
    const isExpired = typeof exp === 'number' ? Date.now() / 1000 > exp : null;

    return {
      parts: {
        header,
        payload,
        signature,
        isExpired,
        expiresAt: formatTs(exp),
        issuedAt: formatTs(iat),
        algorithm: typeof header['alg'] === 'string' ? header['alg'] : null,
      },
      error: null,
    };
  } catch {
    return { parts: null, error: 'Failed to decode JWT. Make sure it is a valid token.' };
  }
}
