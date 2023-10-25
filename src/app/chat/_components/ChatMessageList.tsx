"use client";

import { FC, ReactNode } from "react";
import { clsx } from "clsx";
import styles from "./ChatMessageList.module.css";

type ChatMessageListProps = {
  messages: ReactNode[];
  askQuestionError?: Error | null;
  onClickReAskQuestion?: () => void;
};

export const ChatMessageList: FC<ChatMessageListProps> = ({
  messages,
  askQuestionError,
  onClickReAskQuestion,
}) => {
  return (
    <div className={styles.chatList}>
      {messages.map((message, i) => (
        <div
          key={message?.toString()}
          className={clsx(
            styles.chat,
            i % 2 == 1 && styles.chatWhite,
            i % 2 === 0 && styles.chatGray
          )}
        >
          <div className={styles.message}>
            <span>{message}</span>
            {/* TODO: エラーメッセージとボタンのデザインを修正 */}
            {i === messages.length - 1 && askQuestionError && (
              <>
                <span className={styles.error}>エラーが発生しました</span>
                {/* TODO: 更新アイコンを追加 */}
                <button
                  onClick={onClickReAskQuestion}
                  className={styles.regenerateButton}
                >
                  回答を再生成
                </button>
              </>
            )}
          </div>
        </div>
      ))}
      <div
        key={"space-chat-message"}
        className={clsx(
          styles.chat,
          (messages.length + 1) % 2 == 1 && styles.chatWhite,
          (messages.length + 1) % 2 === 0 && styles.chatGray
        )}
      />
    </div>
  );
};
