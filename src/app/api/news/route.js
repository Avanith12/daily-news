import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

export const dynamic = 'force-dynamic';

const parser = new Parser();

const FEED_MAP = {
    home: [
        'http://feeds.bbci.co.uk/news/technology/rss.xml',
        'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
        'https://www.wired.com/feed/category/science/latest/rss',
        'https://techcrunch.com/feed/',
        'http://feeds.bbci.co.uk/news/business/rss.xml',
        'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml'
    ],
    tech: [
        'http://feeds.bbci.co.uk/news/technology/rss.xml',
        'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
        'https://www.wired.com/feed/category/science/latest/rss',
        'https://techcrunch.com/feed/'
    ],
    business: [
        'http://feeds.bbci.co.uk/news/business/rss.xml',
        'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml',
        'https://www.cnbc.com/id/10001147/device/rss/rss.html'
    ],
    science: [
        'http://feeds.bbci.co.uk/news/science_and_environment/rss.xml',
        'https://rss.nytimes.com/services/xml/rss/nyt/Science.xml',
        'https://www.wired.com/feed/category/science/latest/rss'
    ],
    ai: [
        'https://techcrunch.com/category/artificial-intelligence/feed/',
        'https://www.wired.com/tag/artificial-intelligence/feed/rss'
    ]
};

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('cat') || 'tech';

    try {
        // Select feeds based on category, default to 'home'
        const targetFeeds = FEED_MAP[category] || FEED_MAP['home'];

        const feedPromises = targetFeeds.map(url => parser.parseURL(url).catch(e => null));
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

                    // 3. Fallback to Unsplash images based on category
                    if (!imageUrl) {
                        // Different fallback image keywords per category could be cool, but keeping it simple for now
                        imageUrl = `https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60`;
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

        return NextResponse.json({ articles: articles.slice(0, 30), status: "ok" }); // Increased limit slightly

    } catch (error) {
        console.error("RSS Error:", error);
        return NextResponse.json({ error: "Failed to fetch news feeds" }, { status: 500 });
    }
}
