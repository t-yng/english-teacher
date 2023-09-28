import { diffWords } from "diff";

type OriginalSentenceBlock = {
  removed: boolean;
  value: string;
};

type RevisedSentenceBlock = {
  added: boolean;
  value: string;
};

export const diffWordsInSentence = (
  originalSentence: string,
  revisedSentence: string
) => {
  const result = diffWords(originalSentence, revisedSentence, {
    ignoreWhitespace: true,
  }).filter((part) => part.value.trim() !== "");

  const originalSentenceBlocks = result
    .filter((part) => !part.added)
    .reduce<OriginalSentenceBlock[]>((acc, word) => {
      if (acc.length === 0) {
        acc.push({ removed: word.removed ?? false, value: word.value });
        return acc;
      } else if (acc[acc.length - 1].removed === word.removed) {
        acc[acc.length - 1].value += ` ${word.value}`;
        return acc;
      } else if (acc[acc.length - 1].removed !== word.removed) {
        acc.push({ removed: word.removed ?? false, value: ` ${word.value}` });
        return acc;
      } else {
        return acc;
      }
    }, []);

  const revisedSentenceBlocks = result
    .filter((part) => !part.removed)
    .reduce<RevisedSentenceBlock[]>((acc, word) => {
      if (acc.length === 0) {
        acc.push({ added: word.added ?? false, value: word.value });
        return acc;
      } else if (acc[acc.length - 1].added === word.added) {
        acc[acc.length - 1].value += ` ${word.value}`;
        return acc;
      } else if (acc[acc.length - 1].added !== word.added) {
        acc.push({ added: word.added ?? false, value: ` ${word.value}` });
        return acc;
      } else {
        return acc;
      }
    }, []);

  return {
    originalSentenceBlocks,
    revisedSentenceBlocks,
  };
};
