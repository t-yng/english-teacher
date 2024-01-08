export interface CorrectEnglishResult {
  revisedSentences: Array<{
    originalSentence: string;
    revisedSentence: string;
    explanation: string;
  }>;
  revisedFullText: string;
  revisedFullTextInJapanese: string;
}
