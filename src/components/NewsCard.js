import { useState, useEffect } from 'react';
import styles from './NewsCard.module.css';
import { isBookmarked, toggleBookmark } from '../utils/bookmarks';

export default function NewsCard({ article, onBookmarkChange }) {
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        setBookmarked(isBookmarked(article.url));
    }, [article.url]);

    const handleBookmark = (e) => {
        e.preventDefault();
        const newState = toggleBookmark(article);
        setBookmarked(newState);
        if (onBookmarkChange) onBookmarkChange();
    };

    return (
        <article className={`${styles.card} glass`}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={styles.source}>{article.source.name}</span>
                    <button
                        onClick={handleBookmark}
                        className={styles.bookmarkBtn}
                        aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark article'}
                    >
                        {bookmarked ? '★' : '☆'}
                    </button>
                </div>
                <h3 className={styles.title}>{article.title}</h3>
                <p className={styles.description}>{article.description}</p>
                <div className={styles.actions}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
                        Read Article
                    </a>
                </div>
            </div>
        </article>
    );
}
