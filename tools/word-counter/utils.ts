export interface WordCountResult {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
}

const wordsPerMinute = 200;

export function countWords(text: string): WordCountResult {
  const trimmedText: string = text.trim();
  const wordMatches: RegExpMatchArray | null = trimmedText.match(/\S+/g);
  const sentenceMatches: RegExpMatchArray | null =
    trimmedText.match(/[^.!?]+[.!?]+|[^.!?]+$/g);
  const paragraphCount: number =
    trimmedText.length === 0
      ? 0
      : trimmedText
          .split(/\n\s*\n/)
          .filter((paragraph: string) => paragraph.trim().length > 0).length;
  const words: number = wordMatches?.length ?? 0;

  return {
    words,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    sentences: trimmedText.length === 0 ? 0 : sentenceMatches?.length ?? 0,
    paragraphs: paragraphCount,
    readingTimeMinutes: words === 0 ? 0 : Math.ceil(words / wordsPerMinute),
  };
}
