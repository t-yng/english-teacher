"use client";

import { useState, useCallback } from "react";
import { diffWordsInSentence } from "./diff";
import styles from "./HomeContent.module.css";

type Correction = {
  revisedSentences: {
    originalSentence: string;
    revisedSentence: string;
    revisedReason: string;
  }[];
  revisedFullText: string;
  revisedFullTextInJapanese: string;
};

export const HomeContent = () => {
  const [text, setText] = useState("");
  const [correction, setCorrection] = useState<Correction | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const correctEnglish = useCallback(async () => {
    setCorrection(null);
    setIsFetching(true);

    try {
      const res = await fetch("/api/gpt/correction", {
        method: "POST",
        body: JSON.stringify({
          text,
        }),
      });

      res.json().then((json) => {
        setCorrection(json.correction);
      });
    } finally {
      setIsFetching(false);
    }
  }, [text]);

  return (
    <>
      <textarea
        value={text}
        cols={70}
        rows={7}
        onChange={(e) => {
          setText(e.target.value);
        }}
        className={styles.textarea}
      />
      <button className={styles.correctButton} onClick={correctEnglish}>
        添削
      </button>
      {isFetching && <div>添削中...</div>}
      {correction && (
        <section>
          <div style={{ whiteSpace: "pre-line" }}>
            <div># 修正案</div>
            <p>{correction.revisedFullText}</p>
            <br />
            <div># 修正案（日本語）</div>
            <p>{correction.revisedFullTextInJapanese}</p>
          </div>
          {correction.revisedSentences.map((revision, i) => {
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
                <p>説明: {revision.revisedReason}</p>
              </div>
            );
          })}
        </section>
      )}
    </>
  );
};
