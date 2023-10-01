export type CorrectionResult = {
  revisedSentences: {
    originalSentence: string;
    revisedSentence: string;
    explanation: string;
  }[];
  revisedFullText: string;
  revisedFullTextInJapanese: string;
  isPerfect: boolean;
};
