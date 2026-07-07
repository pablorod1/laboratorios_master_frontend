const storageKey = 'rick-and-morty-best-sentences';

type BestSentenceDictionary = Record<string, string>;

const readBestSentences = (): BestSentenceDictionary => {
  try {
    return JSON.parse(localStorage.getItem(storageKey) ?? '{}');
  } catch {
    return {};
  }
};

const writeBestSentences = (bestSentences: BestSentenceDictionary) => {
  localStorage.setItem(storageKey, JSON.stringify(bestSentences));
};

export const getBestSentence = (id: string): string =>
  readBestSentences()[id] ?? '';

export const saveBestSentence = (id: string, bestSentence: string) => {
  const bestSentences = readBestSentences();
  writeBestSentences({
    ...bestSentences,
    [id]: bestSentence,
  });
};
