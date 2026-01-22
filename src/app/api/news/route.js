import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

export const dynamic = 'force-dynamic';

const parser = new Parser();

const FEEDS = [
    'http://feeds.bbci.co.uk/news/technology/rss.xml',
    'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
    'https://www.wired.com/feed/category/science/latest/rss',
    'https://techcrunch.com/feed/'
];

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    try {
        const feedPromises = FEEDS.map(url => parser.parseURL(url).catch(e => null));
        const feeds = await Promise.all(feedPromises);

        let articles = [];

        feeds.forEach(feed => {
            if (feed && feed.items) {
                feed.items.forEach(item => {
                    // 1. Check standard RSS fields
                    let imageUrl = item.enclosure?.url || item.itunes?.image;

                    // 2. Check content for <img> tags
                    if (!imageUrl && item.content) {
                        const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
                        if (imgMatch) imageUrl = imgMatch[1];
                    }

                    // 3. Fallback to Unsplash Tech images if still null
                    // We append a random param to avoid all cards having the SAME cached image
                    if (!imageUrl) {
                        imageUrl = `https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60`; // Default tech image
                    }

                    if (item.title && item.link) {
                        articles.push({
                            title: item.title,
                            description: item.contentSnippet || item.content || "",
                            url: item.link,
                            urlToImage: imageUrl,
                            source: { name: feed.title || "News Source" },
                            publishedAt: item.isoDate || new Date().toISOString()
                        });
                    }
                });
            }
        });

        // Sort by date descending
        articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

        if (query) {
            const lowerQ = query.toLowerCase();
            articles = articles.filter(a =>
                a.title.toLowerCase().includes(lowerQ) ||
                a.description.toLowerCase().includes(lowerQ)
            );
        }

        return NextResponse.json({ articles: articles.slice(0, 20), status: "ok" });

    } catch (error) {
        console.error("RSS Error:", error);
        return NextResponse.json({ error: "Failed to fetch news feeds" }, { status: 500 });
    }
}
