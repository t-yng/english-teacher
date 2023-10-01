import { FC, FormEvent, useCallback, useState } from "react";
import styles from "./ChatBox.module.css";

type ChatBoxProps = {
  onSubmit?: (text: string) => void;
};

export const ChatBox: FC<ChatBoxProps> = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit?.(text);
      setText("");
    },
    [onSubmit, text]
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="質問する"
        className={styles.chatBox}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};
