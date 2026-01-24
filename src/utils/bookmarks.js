// Bookmark management using localStorage

const STORAGE_KEY = 'daily-news-bookmarks';

export const getBookmarks = () => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
};

export const isBookmarked = (articleUrl) => {
    const bookmarks = getBookmarks();
    return bookmarks.some(article => article.url === articleUrl);
};

export const addBookmark = (article) => {
    const bookmarks = getBookmarks();
    if (!isBookmarked(article.url)) {
        const updated = [...bookmarks, { ...article, savedAt: new Date().toISOString() }];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
};

export const removeBookmark = (articleUrl) => {
    const bookmarks = getBookmarks();
    const filtered = bookmarks.filter(article => article.url !== articleUrl);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const toggleBookmark = (article) => {
    if (isBookmarked(article.url)) {
        removeBookmark(article.url);
        return false; // Not bookmarked
    } else {
        addBookmark(article);
        return true; // Bookmarked
    }
};
