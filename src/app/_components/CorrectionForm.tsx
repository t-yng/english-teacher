import { useState, useCallback, FC, FormEvent } from "react";
import { clsx } from "clsx";
import styles from "./CorrectionForm.module.css";

type CorrectionFormProps = {
  onSubmit: (text: string) => void;
  className?: string;
};

export const CorrectionForm: FC<CorrectionFormProps> = ({
  onSubmit,
  className,
}) => {
  const [text, setText] = useState("");

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onSubmit(text);
    },
    [onSubmit, text]
  );

  return (
    <form onSubmit={handleSubmit} className={clsx(styles.form, className)}>
      <textarea
        value={text}
        rows={7}
        onChange={(e) => {
          setText(e.target.value);
        }}
        className={styles.textarea}
      />
      <button className={styles.correctButton}>添削</button>
    </form>
  );
};
