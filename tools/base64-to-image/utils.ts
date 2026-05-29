export function isValidBase64(str: string): boolean {
  if (str ==='' || str.trim() ==='') return false;
  try {
    // Strip the data:image prefix if present to check validity
    const base64Str = str.includes('base64,') ? str.split('base64,')[1] : str;
    return btoa(atob(base64Str!)) === base64Str;
  } catch (err) {
    return false;
  }
}
