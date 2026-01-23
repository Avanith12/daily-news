"use client";
import styles from "./page.module.css";
import NewsFeed from "../components/NewsFeed";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className="container">
          <nav className={styles.nav}>
            <div className={styles.logo}>Daily News.</div>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          <section className={styles.hero}>
            <h1 className={styles.title}>
              The <span className={styles.highlight}>Latest.</span>
            </h1>
            <p className={styles.subtitle}>
              Global technology news, curated in real-time.
            </p>
          </section>

          <NewsFeed />
        </div>
      </main>
    </div>
  );
}
