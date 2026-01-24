import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import styles from './NewsFeed.module.css';
import { getBookmarks } from '../utils/bookmarks';

export default function NewsFeed({ searchQuery, category, onBookmarkChange }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchNews() {
            setLoading(true);
            try {
                // Special handling for "Saved" category
                if (category === 'saved') {
                    const bookmarks = getBookmarks();
                    setArticles(bookmarks);
                    setLoading(false);
                    return;
                }

                // Build URL with query params for other categories
                const params = new URLSearchParams();
                if (searchQuery) params.append('q', searchQuery);
                if (category) params.append('cat', category);

                const url = `/api/news?${params.toString()}`;

                const res = await fetch(url);
                const data = await res.json();

                if (data.status === 'ok' || data.articles) {
                    setArticles(data.articles);
                } else {
                    throw new Error(data.message || 'Failed to fetch');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        // Debounce search slightly to avoid too many requests
        const timeoutId = setTimeout(() => {
            fetchNews();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, category]);

    if (loading) return <div className={styles.loading}>Loading News...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;

    if (category === 'saved' && articles.length === 0) {
        return <div className={styles.empty}>No saved articles yet. Bookmark articles to read them later.</div>;
    }

    return (
        <div className={styles.grid}>
            {articles.map((article, index) => (
                <NewsCard
                    key={index}
                    article={article}
                    onBookmarkChange={onBookmarkChange}
                />
            ))}
        </div>
    );
}
