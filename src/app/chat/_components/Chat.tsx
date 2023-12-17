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
import { CorrectionTextResult } from "@/app/type";

type ChatMessage = {
  text: string;
  node?: ReactNode;
};

const createCorrectionText = (correction: CorrectionTextResult) => {
  return [
    `# 修正案\n${correction.revisedFullText}`,
    `# 修正案（日本語）\n${correction.revisedFullTextInJapanese}`,
    correction.revisedSentences.length === 0 && "# 添削結果\n英文は完璧です🎉",
    ...correction.revisedSentences.map((revision, i) => {
      return `# 添削結果${i + 1}\n原文: ${revision.originalSentence}\n修正文: ${
        revision.revisedSentence
      }`;
    }),
  ].join("\n");
};

export const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [askQuestionError, setAskQuestionError] = useState<Error | null>(null);
  const [question, setQuestion] = useState<string>("");

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

  /**
   * ストリーミング形式のレスポンスを処理して質問の回答を表示する
   */
  const handleStreamAnswerResponse = useCallback((res: Response) => {
    // ストリームのリーダーを取得
    // TextDecoderStreamを通して、Uint8Arrayを文字列に変換する
    const reader = res.body?.pipeThrough(new TextDecoderStream()).getReader();
    if (!reader) return;

    // リーダーからデータを読み込む
    // REFACTOR: 処理用のクラスを別途作成する
    const read = async ({ firstRead }: { firstRead: boolean }) => {
      // TODO: net:ERR_HTTP2_PROTOCOL_ERROR が発生場合があるので、例外処理をしてリトライ可能にする
      try {
        const { done, value } = await reader.read();
        if (done) {
          reader.releaseLock();
          return;
        }
        // 読み込んだイベントデータから、dataとeventを抽出する
        const result = value.split(/\n\n/).reduce(
          (acc, message) => {
            if (message.startsWith("data: ") && message !== "data: [DONE]") {
              // data: test1\ndata:test2 と複数行のデータが送られてくる場合を考慮
              acc["data"] += message
                .split("\n")
                .filter((line) => line !== "data: [DONE]")
                .map((line) => line.replace("data: ", ""))
                .join("\n");
              return acc;
            } else if (message.startsWith("event: ")) {
              acc["event"] = message.replace("event: ", "");
              return acc;
            }

            return acc;
          },
          { data: "", event: null } as { data: string; event: string | null }
        );

        // 回答を逐次更新して表示
        setMessages((messages) => {
          const answerMessage = messages[messages.length - 1];
          const answer = firstRead
            ? result.data
            : answerMessage.text + result.data;

          return messages.with(-1, {
            text: answer,
          });
        });

        read({ firstRead: false });
      } catch (e) {
        console.error(`質問に対する回答の取得中にエラーが発生しました: ${e}`);
        setAskQuestionError(e as Error);
      }
    };

    read({ firstRead: true });
  }, []);

  /**
   * 質問を送信して回答をリクエストする
   */
  const askQuestion = useCallback(
    async (question: string) => {
      setQuestion(question);
      const WAITING_TEXT = "思考中...";

      // レスポンスが返ってくるまでの待機テキストを表示
      setMessages((messages) => {
        return [
          ...messages,
          {
            text: question,
          },
          {
            text: WAITING_TEXT,
          },
        ];
      });

      // 回答をリクエスト
      try {
        const res = await fetch("/api/gpt/question", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages.map((m) => m.text), question],
          }),
        });
        // ストリーミング形式のレスポンスを処理
        handleStreamAnswerResponse(res);
      } catch (e) {
        console.error(`質問の回答リクエストに失敗しました: ${e}`);
        setAskQuestionError(e as Error);
      }
    },
    [handleStreamAnswerResponse, messages]
  );

  /**
   * 回答の再生成をリクエストする
   */
  const reAskQuestion = useCallback(() => {
    setAskQuestionError(null);
    setMessages((messages) => {
      return messages.slice(0, -2);
    });
    askQuestion(question);
  }, [askQuestion, question]);

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
      <ChatMessageList
        messages={messages.map((m) => m.node ?? m.text)}
        askQuestionError={askQuestionError}
        onClickReAskQuestion={reAskQuestion}
      />
      <div className={styles.chatBoxContainer}>
        <ChatBox onSubmit={askQuestion} />
      </div>
    </div>
  );
};
