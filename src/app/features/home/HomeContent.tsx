"use client";

import { useState, useCallback } from "react";

type Correction = {
  revisedSentences: {
    originalSentence: string;
    revisedSentence: string;
    revisedReason: string;
  }[];
  revisedFullText: string;
};

const format = (correction: Correction) => {
  const revisions: string[] = [];
  for (const revision of correction.revisedSentences) {
    const content = `原文: ${revision.originalSentence}\n修正文: ${revision.revisedSentence}\n説明: ${revision.revisedReason}`;
    revisions.push(content);
  }

  return `#修正案\n ${
    correction.revisedFullText
  }\n\n #添削結果\n\n${revisions.join("\n\n")}`;
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
        console.log(json);
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
        style={{ padding: 8, marginBottom: 8 }}
      />
      <button onClick={correctEnglish}>添削</button>
      {isFetching && <div>添削中...</div>}
      {correction && (
        <div style={{ whiteSpace: "pre-line" }}>{format(correction)}</div>
      )}
    </>
  );
};
