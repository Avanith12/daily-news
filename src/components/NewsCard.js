import { useState, useEffect } from 'react';
import styles from './NewsCard.module.css';
import { isBookmarked, toggleBookmark } from '../utils/bookmarks';
import { getRelativeTime } from '../utils/timeFormat';

export default function NewsCard({ article, onBookmarkChange }) {
    const [bookmarked, setBookmarked] = useState(false);
    const [relativeTime, setRelativeTime] = useState('');

    useEffect(() => {
        setBookmarked(isBookmarked(article.url));
    }, [article.url]);

    // Update relative time every minute
    useEffect(() => {
        const updateTime = () => {
            if (article.publishedAt) {
                setRelativeTime(getRelativeTime(new Date(article.publishedAt)));
            }
        };

        updateTime();
        const interval = setInterval(updateTime, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [article.publishedAt]);

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
                {relativeTime && (
                    <div className={styles.published}>{relativeTime}</div>
                )}
                <div className={styles.actions}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
                        Read Article
                    </a>
                </div>
            </div>
        </article>
    );
}
