export interface KeywordResult {
  word: string;
  count: number;
  percentage: number;
}

export interface KeywordDensityAnalysis {
  oneWord: KeywordResult[];
  twoWord: KeywordResult[];
  threeWord: KeywordResult[];
  totalWords: number;
}

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', "aren't", 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', "can't", 'cannot', 'could',
  "couldn't", 'did', "didn't", 'do', 'does', "doesn't", 'doing', "don't", 'down', 'during', 'each', 'few', 'for',
  'from', 'further', 'had', "hadn't", 'has', "hasn't", 'have', "haven't", 'having', 'he', "he'd", "he'll", "he's",
  'her', 'here', "here's", 'hers', 'herself', 'him', 'himself', 'his', 'how', "how's", 'i', "i'd", "i'll", "i'm",
  "i've", 'if', 'in', 'into', 'is', "isn't", 'it', "it's", 'its', 'itself', "let's", 'me', 'more', 'most', "mustn't",
  'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours',
  'ourselves', 'out', 'over', 'own', 'same', "shan't", 'she', "she'd", "she'll", "she's", 'should', "shouldn't",
  'so', 'some', 'such', 'than', 'that', "that's", 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there',
  "there's", 'these', 'they', "they'd", "they'll", "they're", "they've", 'this', 'those', 'through', 'to', 'too',
  'under', 'until', 'up', 'very', 'was', "wasn't", 'we', "we'd", "we'll", "we're", "we've", 'were', "weren't",
  'what', "what's", 'when', "when's", 'where', "where's", 'which', 'while', 'who', "who's", 'whom', 'why', "why's",
  'with', "won't", 'would', "wouldn't", 'you', "you'd", "you'll", "you're", "you've", 'your', 'yours', 'yourself',
  'yourselves', 'can', 'will', 'just'
]);

export function analyzeKeywordDensity(text: string, ignoreStopWords: boolean): KeywordDensityAnalysis {
  if (!text.trim()) {
    return { oneWord: [], twoWord: [], threeWord: [], totalWords: 0 };
  }

  // Tokenize text into words (alphanumeric sequences, including hyphens/apostrophes)
  const words = text.toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, ' ') // replace non-word chars with space
    .split(/\s+/)
    .filter(w => w.length > 0);

  const totalWords = words.length;

  let filteredWords = words;
  if (ignoreStopWords) {
    filteredWords = words.filter(w => !STOP_WORDS.has(w));
  }

  const oneWordCounts: Record<string, number> = {};
  const twoWordCounts: Record<string, number> = {};
  const threeWordCounts: Record<string, number> = {};

  for (let i = 0; i < filteredWords.length; i++) {
    // 1-word
    const w1 = filteredWords[i];
    oneWordCounts[w1!] = (oneWordCounts[w1!] || 0) + 1;

    // 2-word
    if (i < filteredWords.length - 1) {
      const w2 = `${filteredWords[i]} ${filteredWords[i+1]}`;
      twoWordCounts[w2] = (twoWordCounts[w2] || 0) + 1;
    }

    // 3-word
    if (i < filteredWords.length - 2) {
      const w3 = `${filteredWords[i]} ${filteredWords[i+1]} ${filteredWords[i+2]}`;
      threeWordCounts[w3] = (threeWordCounts[w3] || 0) + 1;
    }
  }

  const mapToResult = (counts: Record<string, number>): KeywordResult[] => {
    return Object.entries(counts)
      .map(([word, count]) => ({
        word,
        count,
        percentage: (count / (totalWords || 1)) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 50); // Top 50
  };

  return {
    oneWord: mapToResult(oneWordCounts),
    twoWord: mapToResult(twoWordCounts),
    threeWord: mapToResult(threeWordCounts),
    totalWords
  };
}
