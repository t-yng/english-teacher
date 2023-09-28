import { FC } from "react";
import { diffWordsInSentence } from "./diff";

type CorrectionResult = {
  revisedSentences: {
    originalSentence: string;
    revisedSentence: string;
    explanation: string;
  }[];
  revisedFullText: string;
  revisedFullTextInJapanese: string;
  isPerfect: boolean;
};

type CorrectionMessageProps = {
  correctionResult: CorrectionResult;
};

export const CorrectionMessage: FC<CorrectionMessageProps> = ({
  correctionResult,
}) => {
  return (
    <section>
      <div style={{ whiteSpace: "pre-line" }}>
        <div># 修正案</div>
        <p>{correctionResult.revisedFullText}</p>
        <br />
        <div># 修正案（日本語）</div>
        <p>{correctionResult.revisedFullTextInJapanese}</p>
        <br />
      </div>
      {correctionResult.isPerfect && (
        <div>
          <p># 添削結果</p>
          <p>英文は完璧です🎉</p>
        </div>
      )}
      {!correctionResult.isPerfect &&
        correctionResult.revisedSentences.map((revision, i) => {
          const { originalSentenceBlocks, revisedSentenceBlocks } =
            diffWordsInSentence(
              revision.originalSentence,
              revision.revisedSentence
            );

          return (
            <div key={i} style={{ marginTop: 8 }}>
              <p># 添削結果{i + 1}</p>
              <p>
                原文:{" "}
                {originalSentenceBlocks.map((block, i) => {
                  return (
                    <span
                      key={block.value}
                      style={{
                        color: block.removed ? "red" : undefined,
                        textDecoration: block.removed
                          ? "line-through"
                          : undefined,
                      }}
                    >
                      {block.value}
                    </span>
                  );
                })}
              </p>
              <p>
                修正文:{" "}
                {revisedSentenceBlocks.map((block) => {
                  return (
                    <span
                      key={block.value}
                      style={{ color: block.added ? "green" : undefined }}
                    >
                      {block.value}
                    </span>
                  );
                })}
              </p>
              <p>説明: {revision.explanation}</p>
            </div>
          );
        })}
    </section>
  );
};
