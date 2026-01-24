import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import styles from './NewsFeed.module.css';

export default function NewsFeed({ searchQuery, category }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchNews() {
            setLoading(true);
            try {
                // Build URL with query params
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

    return (
        <div className={styles.grid}>
            {articles.map((article, index) => (
                <NewsCard key={index} article={article} />
            ))}
        </div>
    );
}
