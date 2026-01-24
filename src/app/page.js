"use client";
import { useState } from 'react';
import styles from "./page.module.css";
import NewsFeed from "../components/NewsFeed";

const CATEGORIES = [
  { id: 'home', label: 'Home' },
  { id: 'tech', label: 'Tech' },
  { id: 'business', label: 'Business' },
  { id: 'science', label: 'Science' },
  { id: 'ai', label: 'AI' }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("home");

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
              Today's <span className={styles.highlight}>Headlines.</span>
            </h1>

            <div className={styles.inputGroup}>
              <div className={styles.searchWrapper}>
                <input
                  type="text"
                  placeholder="Search headlines..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className={styles.categories}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    className={`${styles.catBtn} ${category === cat.id ? styles.activeCat : ''}`}
                    onClick={() => setCategory(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <NewsFeed searchQuery={searchQuery} category={category} />
        </div>
      </main>
    </div>
  );
}
