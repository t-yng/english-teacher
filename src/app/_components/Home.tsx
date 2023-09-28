"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { CorrectionForm } from "./CorrectionForm";
import styles from "./Home.module.css";

export const Home = () => {
  const router = useRouter();

  const handleSubmit = useCallback(
    (text: string) => {
      sessionStorage.setItem("inputText", text);
      router.push("/chat");
    },
    [router]
  );

  return <CorrectionForm onSubmit={handleSubmit} className={styles.form} />;
};
