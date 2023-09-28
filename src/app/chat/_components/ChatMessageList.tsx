"use client";

import { FC, ReactNode } from "react";
import { clsx } from "clsx";
import styles from "./ChatMessageList.module.css";

type ChatMessageListProps = {
  messages: ReactNode[];
};

export const ChatMessageList: FC<ChatMessageListProps> = ({ messages }) => {
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
          <div className={styles.message}>{message}</div>
        </div>
      ))}
    </div>
  );
};
