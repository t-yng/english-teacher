import styles from "./page.module.css";
import { Home } from "./_components";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Home />
    </main>
  );
}
