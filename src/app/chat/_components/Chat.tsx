"use client";

import {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { CorrectionMessage } from "./CorrectionMessage";
import { ChatMessageList } from "./ChatMessageList";
import { ChatBox } from "./ChatBox";
import styles from "./Chat.module.css";
import { CorrectionResult } from "@/app/_models/Correction";

type ChatMessage = {
  text: string;
  node?: ReactNode;
};

const createCorrectionText = (correction: CorrectionResult) => {
  return [
    `# 修正案\n${correction.revisedFullText}`,
    `# 修正案（日本語）\n${correction.revisedFullTextInJapanese}`,
    correction.isPerfect && "# 添削結果\n英文は完璧です🎉",
    ...correction.revisedSentences.map((revision, i) => {
      return `# 添削結果${i + 1}\n原文: ${revision.originalSentence}\n修正文: ${
        revision.revisedSentence
      }`;
    }),
  ].join("\n");
};

export const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const correctEnglish = useCallback(async (text: string) => {
    const res = await fetch("/api/gpt/correction", {
      method: "POST",
      body: JSON.stringify({
        text,
      }),
    });
    const result = await res.json();

    return result.correction;
  }, []);

  const askQuestion = useCallback(
    async (question: string) => {
      setMessages((messages) => {
        return [
          ...messages,
          {
            text: question,
          },
          {
            text: "回答中...",
          },
        ];
      });

      const res = await fetch("/api/gpt/question", {
        method: "POST",
        body: JSON.stringify({
          messages: [...messages.map((m) => m.text), question],
        }),
      });
      const result = await res.json();

      setMessages((messages) => {
        return messages.with(-1, {
          text: result.answer,
        });
      });

      return result.answer;
    },
    [messages]
  );

  useEffect(() => {
    // メッセージの一覧が更新されたら、メッセージが見えるようにスクロールする
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useLayoutEffect(() => {
    const text = window.sessionStorage.getItem("inputText") ?? "";
    setMessages([{ text: `# 英文\n${text}` }, { text: "添削中..." }]);

    if (text.length > 0) {
      correctEnglish(text).then((correction) => {
        setMessages((messages) => {
          return [
            {
              text: messages[0].text,
            },
            {
              text: createCorrectionText(correction),
              node: (
                <CorrectionMessage
                  key="correction-message"
                  correctionResult={correction}
                />
              ),
            },
          ];
        });
      });
    }
  }, [correctEnglish]);

  return (
    <div>
      <ChatMessageList messages={messages.map((m) => m.node ?? m.text)} />
      <div className={styles.chatBoxContainer}>
        <ChatBox onSubmit={askQuestion} />
      </div>
    </div>
  );
};
