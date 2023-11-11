import {
  ChangeEvent,
  FC,
  FormEvent,
  KeyboardEvent,
  KeyboardEventHandler,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { IoSend } from "react-icons/io5";
import styles from "./ChatBox.module.css";
import { useAutoResize } from "./useAutoResize";

type ChatBoxProps = {
  onSubmit?: (text: string) => void;
};

export const ChatBox: FC<ChatBoxProps> = ({ onSubmit }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const { autoResize, resetSize } = useAutoResize();

  useLayoutEffect(() => {
    if (!textareaRef.current) return;
    autoResize(textareaRef.current);
  }, [autoResize]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit?.(text);
      setText("");
      if (textareaRef.current) {
        resetSize(textareaRef.current);
      }
    },
    [onSubmit, resetSize, text]
  );

  const handleChangeText = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      autoResize(e.target);
      setText(e.target.value);
    },
    [autoResize]
  );

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      // cmd + enter を押したときにフォームの送信を実行する
      if (e.key === "Enter" && e.metaKey) {
        formRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      }
    },
    []
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
      <textarea
        rows={1}
        placeholder="質問する"
        className={styles.chatBox}
        value={text}
        onChange={handleChangeText}
        onKeyDown={handleKeyDown}
        ref={textareaRef}
      />
      <button type="submit" className={styles.submitButton}>
        <IoSend />
      </button>
    </form>
  );
};
