export interface CorrectionTextResult {
  revisedSentences: Array<{
    originalSentence: string;
    revisedSentence: string;
    explanation: string;
  }>;
  revisedFullText: string;
  revisedFullTextInJapanese: string;
}
