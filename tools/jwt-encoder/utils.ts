function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return atob(str);
}

export async function signJWT(
  header: Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
  payload: Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
  secret: string,
  algorithm: 'HS256' | 'HS384' | 'HS512' = 'HS256'
): Promise<string> {
  const algMap = {
    HS256: 'SHA-256',
    HS384: 'SHA-384',
    HS512: 'SHA-512',
  } as const;

  const headerWithAlg = { ...header, alg: algorithm, typ: header.typ || 'JWT' };
  const encodedHeader = base64UrlEncode(JSON.stringify(headerWithAlg));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  const data = `${encodedHeader}.${encodedPayload}`;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: algMap[algorithm] },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  const encodedSignature = base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));

  return `${data}.${encodedSignature}`;
}

export function decodeJWT(token: string): { header: any; payload: any; signature: string } | null { // eslint-disable-line @typescript-eslint/no-explicit-any
  try {
    const [headerB64, payloadB64, signature] = token.split('.');
    if (!headerB64 || !payloadB64) return null;

    const header = JSON.parse(base64UrlDecode(headerB64));
    const payload = JSON.parse(base64UrlDecode(payloadB64));

    return { header, payload, signature: signature || '' };
  } catch {
    return null;
  }
}

export const DEFAULT_HEADER = { alg: 'HS256', typ: 'JWT' };
export const DEFAULT_PAYLOAD = {
  sub: '1234567890',
  name: 'John Doe',
  iat: Math.floor(Date.now() / 1000),
};
