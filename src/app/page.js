"use client";
import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import NewsFeed from "../components/NewsFeed";
import { getRelativeTime } from "../utils/timeFormat";

const CATEGORIES = [
  { id: 'home', label: 'Home' },
  { id: 'tech', label: 'Tech' },
  { id: 'business', label: 'Business' },
  { id: 'science', label: 'Science' },
  { id: 'ai', label: 'AI' },
  { id: 'saved', label: 'Saved' }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("home");
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [relativeTime, setRelativeTime] = useState('');

  const handleBookmarkChange = () => {
    // Refresh the feed if we're on the Saved tab
    if (category === 'saved') {
      setRefreshKey(prev => prev + 1);
    }
  };

  const handleUpdateTime = (time) => {
    setLastUpdated(time);
  };

  // Update relative time every 30 seconds
  useEffect(() => {
    if (!lastUpdated) return;

    const updateRelativeTime = () => {
      setRelativeTime(getRelativeTime(lastUpdated));
    };

    updateRelativeTime();
    const interval = setInterval(updateRelativeTime, 30000);

    return () => clearInterval(interval);
  }, [lastUpdated]);

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

              {lastUpdated && (
                <div className={styles.timestamp}>
                  Updated {relativeTime}
                </div>
              )}
            </div>
          </section>

          <NewsFeed
            searchQuery={searchQuery}
            category={category}
            onBookmarkChange={handleBookmarkChange}
            onUpdateTime={handleUpdateTime}
            key={refreshKey}
          />
        </div>
      </main>
    </div>
  );
}
