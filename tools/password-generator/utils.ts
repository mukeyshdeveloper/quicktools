export type StrengthLevel = 'Weak' | 'Fair' | 'Strong' | 'Excellent';

export interface PasswordOptions {
  length: number;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeAmbiguous: boolean;
  preventRepeats: boolean;
}

export interface PasswordResult {
  password: string;
  entropyBits: number;
  poolSize: number;
  strength: StrengthLevel;
  crackTimeLabel: string;
}

interface CharacterGroup {
  enabled: boolean;
  characters: string;
}

type RandomIndex = (maxExclusive: number) => number;

const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numberCharacters = '0123456789';
const symbolCharacters = '!@#$%^&*()-_=+[]{};:,.?/<>~';
const ambiguousCharacters = new Set<string>([
  '0',
  'O',
  'o',
  '1',
  'l',
  'I',
  '|',
  '`',
  "'",
  '"',
]);

function dedupeCharacters(characters: string): string {
  return Array.from(new Set(characters.split(''))).join('');
}

function removeAmbiguous(characters: string): string {
  return characters
    .split('')
    .filter((character: string) => !ambiguousCharacters.has(character))
    .join('');
}

function getCharacterGroups(options: PasswordOptions): CharacterGroup[] {
  const groups: CharacterGroup[] = [
    {
      enabled: options.includeLowercase,
      characters: lowercaseCharacters,
    },
    {
      enabled: options.includeUppercase,
      characters: uppercaseCharacters,
    },
    {
      enabled: options.includeNumbers,
      characters: numberCharacters,
    },
    {
      enabled: options.includeSymbols,
      characters: symbolCharacters,
    },
  ];

  return groups
    .filter((group: CharacterGroup) => group.enabled)
    .map((group: CharacterGroup) => ({
      ...group,
      characters: options.excludeAmbiguous
        ? removeAmbiguous(group.characters)
        : group.characters,
    }))
    .filter((group: CharacterGroup) => group.characters.length > 0);
}

function shuffleCharacters(characters: string[], randomIndex: RandomIndex): string[] {
  const shuffledCharacters: string[] = [...characters];

  for (let index = shuffledCharacters.length - 1; index > 0; index -= 1) {
    const swapIndex: number = randomIndex(index + 1);
    const currentCharacter: string | undefined = shuffledCharacters[index];
    const swapCharacter: string | undefined = shuffledCharacters[swapIndex];

    if (currentCharacter !== undefined && swapCharacter !== undefined) {
      shuffledCharacters[index] = swapCharacter;
      shuffledCharacters[swapIndex] = currentCharacter;
    }
  }

  return shuffledCharacters;
}

function getStrength(entropyBits: number): StrengthLevel {
  if (entropyBits < 50) return 'Weak';
  if (entropyBits < 75) return 'Fair';
  if (entropyBits < 110) return 'Strong';
  return 'Excellent';
}

function formatCrackTime(entropyBits: number): string {
  const guessesPerSecond = 10_000_000_000;
  const seconds: number = 2 ** entropyBits / guessesPerSecond;
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const year = day * 365;

  if (seconds < minute) return 'under a minute';
  if (seconds < hour) return `${Math.round(seconds / minute)} minutes`;
  if (seconds < day) return `${Math.round(seconds / hour)} hours`;
  if (seconds < year) return `${Math.round(seconds / day)} days`;
  if (seconds < year * 1_000_000) {
    return `${Math.round(seconds / year).toLocaleString('en-IN')} years`;
  }

  return 'over a million years';
}

export function buildCharacterPool(options: PasswordOptions): string {
  return dedupeCharacters(
    getCharacterGroups(options)
      .map((group: CharacterGroup) => group.characters)
      .join(''),
  );
}

export function generatePassword(
  options: PasswordOptions,
  randomIndex: RandomIndex,
): PasswordResult | null {
  const groups: CharacterGroup[] = getCharacterGroups(options);
  const pool: string = buildCharacterPool(options);

  if (
    options.length < 4 ||
    groups.length === 0 ||
    pool.length === 0 ||
    (options.preventRepeats && options.length > pool.length)
  ) {
    return null;
  }

  const passwordCharacters: string[] = groups.map((group: CharacterGroup) => {
    const index: number = randomIndex(group.characters.length);
    return group.characters[index] ?? '';
  });
  const usedCharacters = new Set<string>(passwordCharacters);

  while (passwordCharacters.length < options.length) {
    const nextCharacter: string | undefined = pool[randomIndex(pool.length)];

    if (!nextCharacter) {
      return null;
    }

    if (options.preventRepeats && usedCharacters.has(nextCharacter)) {
      continue;
    }

    passwordCharacters.push(nextCharacter);
    usedCharacters.add(nextCharacter);
  }

  const password: string = shuffleCharacters(passwordCharacters, randomIndex).join('');
  const entropyBits: number = options.length * Math.log2(pool.length);

  return {
    password,
    entropyBits,
    poolSize: pool.length,
    strength: getStrength(entropyBits),
    crackTimeLabel: formatCrackTime(entropyBits),
  };
}
