"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { CorrectionMessage } from "./CorrectionMessage";
import { ChatMessageList } from "./ChatMessageList";

export const Chat = () => {
  const [inputText] = useState(() => sessionStorage.getItem("inputText") ?? "");
  const [messages, setMessages] = useState<ReactNode[]>(() => {
    return [`# 英文\n${inputText}`, "添削中..."];
  });

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

  useEffect(() => {
    correctEnglish(inputText).then((correction) => {
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
  }, [correctEnglish, inputText]);

  return <ChatMessageList messages={messages} />;
};
