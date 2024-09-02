import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section class="section">
        <div class="container has-text-centered">
          <h1 class="title">Hello World</h1>
          <p class="subtitle">
            My first website with
            <strong class="has-text-primary">Bulma</strong>!
          </p>
        </div>
      </section>
    </main>
  );
}
