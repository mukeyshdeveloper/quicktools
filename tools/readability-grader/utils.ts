export interface ReadabilityResult {
  wordCount: number;
  sentenceCount: number;
  syllableCount: number;
  readingEase: number; // 0-100
  gradeLevel: number;
  levelText: string;
}

function countSyllables(word: string): number {
  word = word.toLowerCase().trim();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

export function calculateReadability(text: string): ReadabilityResult {
  const fallback = {
    wordCount: 0,
    sentenceCount: 0,
    syllableCount: 0,
    readingEase: 0,
    gradeLevel: 0,
    levelText: 'N/A'
  };

  if (!text.trim()) return fallback;

  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const sentenceCount = sentences.length || 1;

  const words = text.match(/\b[-?a-zA-Z0-9]+'?[a-zA-Z0-9]+\b|\b[a-zA-Z0-9]+\b/g) || [];
  const wordCount = words.length || 1;

  let syllableCount = 0;
  for (const word of words) {
    syllableCount += countSyllables(word);
  }

  // Flesch Reading Ease
  // 206.835 - 1.015 * (Total Words / Total Sentences) - 84.6 * (Total Syllables / Total Words)
  let readingEase = 206.835 - (1.015 * (wordCount / sentenceCount)) - (84.6 * (syllableCount / wordCount));
  readingEase = Math.max(0, Math.min(100, Math.round(readingEase * 10) / 10));

  // Flesch-Kincaid Grade Level
  // 0.39 * (Total Words / Total Sentences) + 11.8 * (Total Syllables / Total Words) - 15.59
  let gradeLevel = (0.39 * (wordCount / sentenceCount)) + (11.8 * (syllableCount / wordCount)) - 15.59;
  gradeLevel = Math.max(0, Math.round(gradeLevel * 10) / 10);

  let levelText = '';
  if (gradeLevel < 5) levelText = 'Very Easy to read.';
  else if (gradeLevel < 7) levelText = 'Easy to read. Conversational.';
  else if (gradeLevel < 9) levelText = 'Plain English. Good for most people.';
  else if (gradeLevel < 12) levelText = 'Fairly difficult. High school level.';
  else if (gradeLevel < 16) levelText = 'Difficult. College level.';
  else levelText = 'Very difficult. Scientific or academic.';

  return {
    wordCount,
    sentenceCount,
    syllableCount,
    readingEase,
    gradeLevel,
    levelText
  };
}
