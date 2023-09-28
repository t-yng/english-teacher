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

export const Chat = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<ReactNode[]>([]);

  useLayoutEffect(() => {
    const text = window.sessionStorage.getItem("inputText") ?? "";
    setInputText(text);
    setMessages([`# 英文\n${text}`, "添削中..."]);
  }, []);

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
