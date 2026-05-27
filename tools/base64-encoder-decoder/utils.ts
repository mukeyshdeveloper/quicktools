export function encodeBase64(input: string): string {
  try {
    return btoa(unescape(encodeURIComponent(input)));
  } catch {
    return '';
  }
}

export function decodeBase64(input: string): { result: string; error: string | null } {
  try {
    const decoded = decodeURIComponent(escape(atob(input.trim())));
    return { result: decoded, error: null };
  } catch {
    return { result: '', error: 'Invalid Base64 string. Please check your input.' };
  }
}

export function encodeBase64Url(input: string): string {
  return encodeBase64(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeBase64Url(input: string): { result: string; error: string | null } {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4;
  const padded2 = pad ? padded + '='.repeat(4 - pad) : padded;
  return decodeBase64(padded2);
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1] ?? '');
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
