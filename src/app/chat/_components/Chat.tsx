"use client";

import { ReactNode, useCallback, useLayoutEffect, useState } from "react";
import { CorrectionMessage } from "./CorrectionMessage";
import { ChatMessageList } from "./ChatMessageList";

export const Chat = () => {
  const [messages, setMessages] = useState<ReactNode[]>([]);

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

  useLayoutEffect(() => {
    const text = window.sessionStorage.getItem("inputText") ?? "";
    setMessages([`# 英文\n${text}`, "添削中..."]);

    if (text.length > 0) {
      correctEnglish(text).then((correction) => {
        setMessages((messages) => {
          return [
            messages[0],
            <CorrectionMessage
              key="correction-message"
              correctionResult={correction}
            />,
          ];
        });
      });
    }
  }, [correctEnglish]);

  return <ChatMessageList messages={messages} />;
};
