import styles from './NewsCard.module.css';

export default function NewsCard({ article, onChat }) {
    return (
        <article className={`${styles.card} glass`}>
            <div className={styles.content}>
                <span className={styles.source}>{article.source.name}</span>
                <h3 className={styles.title}>{article.title}</h3>
                <p className={styles.description}>{article.description}</p>
                <div className={styles.actions}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
                        Read Article
                    </a>
                    <button onClick={() => onChat(article)} className={styles.chatBtn}>
                        Chat about this
                    </button>
                </div>
            </div>
        </article>
    );
}
