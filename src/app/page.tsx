import styles from "./page.module.css";
import { HomeContent } from "./features/home/HomeContent";

export default function Home() {
  return (
    <main className={styles.main}>
      <HomeContent />
    </main>
  );
}
