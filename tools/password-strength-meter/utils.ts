export interface PasswordStrength {
  score: number; // 0 to 4
  entropy: number;
  crackTime: string;
  crackTimeSeconds: number;
  feedback: {
    warning: string;
    suggestions: string[];
  };
}

export function calculatePasswordStrength(password: string): PasswordStrength {
  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

  const length = password.length;
  // Entropy = L * log2(R)
  const entropy = length > 0 && poolSize > 0 ? length * Math.log2(poolSize) : 0;

  // Assume a generic offline attack speed of 10 billion guesses per second
  const guessesPerSecond = 1e10;
  const totalGuesses = Math.pow(2, entropy);
  const crackTimeSeconds = totalGuesses / guessesPerSecond;

  let crackTime = '';
  if (crackTimeSeconds < 1) crackTime = 'Instantly';
  else if (crackTimeSeconds < 60) crackTime = `${Math.round(crackTimeSeconds)} seconds`;
  else if (crackTimeSeconds < 3600) crackTime = `${Math.round(crackTimeSeconds / 60)} minutes`;
  else if (crackTimeSeconds < 86400) crackTime = `${Math.round(crackTimeSeconds / 3600)} hours`;
  else if (crackTimeSeconds < 31536000) crackTime = `${Math.round(crackTimeSeconds / 86400)} days`;
  else if (crackTimeSeconds < 3153600000) crackTime = `${Math.round(crackTimeSeconds / 31536000)} years`;
  else crackTime = 'Centuries';

  let score = 0;
  if (entropy > 80) score = 4;
  else if (entropy > 60) score = 3;
  else if (entropy > 40) score = 2;
  else if (entropy > 25) score = 1;

  const suggestions: string[] = [];
  let warning = '';

  if (length < 8) warning = 'Password is too short.';
  else if (poolSize < 50) warning = 'Add uppercase letters, numbers, or symbols.';

  if (!/[A-Z]/.test(password)) suggestions.push('Add an uppercase letter');
  if (!/[0-9]/.test(password)) suggestions.push('Add a number');
  if (!/[^a-zA-Z0-9]/.test(password)) suggestions.push('Add a special character');
  if (length < 12) suggestions.push('Make it longer (12+ characters is ideal)');

  return {
    score,
    entropy: Math.round(entropy),
    crackTime,
    crackTimeSeconds,
    feedback: { warning, suggestions }
  };
}
