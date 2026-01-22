"use client";
import { useState } from 'react';
import styles from "./page.module.css";
import NewsFeed from "../components/NewsFeed";
import ChatInterface from "../components/ChatInterface";

export default function Home() {
  const [activeArticle, setActiveArticle] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChat = (article) => {
    setActiveArticle(article);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setActiveArticle(null);
  };

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
              Stay Informed with <span className={styles.highlight}>AI Insights</span>
            </h1>
            <p className={styles.subtitle}>
              Get real-time news updates and chat with our AI to understand the context behind the headlines.
            </p>
          </section>

          <NewsFeed onChat={handleChat} />
        </div>
      </main>

      {isChatOpen && (
        <ChatInterface
          activeArticle={activeArticle}
          onClose={handleCloseChat}
        />
      )}
    </div>
  );
}
