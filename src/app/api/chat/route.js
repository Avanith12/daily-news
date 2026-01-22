import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request) {
    try {
        const { message, context } = await request.json();
        let articleContent = "";

        // If we have an article URL, try to "read" the full page
        if (context && context.url) {
            try {
                console.log("Fetching article content from:", context.url);
                // Add User-Agent to avoid being blocked by some sites
                const articleRes = await fetch(context.url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    }
                });

                if (articleRes.ok) {
                    const html = await articleRes.text();
                    const $ = cheerio.load(html);

                    // Remove scripts, styles, and ads to get clean text
                    $('script').remove();
                    $('style').remove();
                    $('nav').remove();
                    $('header').remove();
                    $('footer').remove();
                    $('aside').remove();
                    $('.ad').remove();

                    // Extract text from paragraphs
                    const paragraphs = [];
                    $('p').each((i, el) => {
                        const text = $(el).text().trim();
                        if (text.length > 50) paragraphs.push(text); // Filter out short/nav links
                    });

                    // Take the first ~2000 chars to avoid hitting GET limit of Pollinations (since we use URL params)
                    // Note: Pollinations via GET is limited by URL length. 
                    // We will try to send a reasonable amount.
                    articleContent = paragraphs.join('\n\n').slice(0, 2500);
                }
            } catch (e) {
                console.error("Failed to scrape article:", e);
                articleContent = context.description || "Could not read full article.";
            }
        }

        // Construct the prompt
        // We need to keep it within URL limits for the free GET API
        const contextPrompt = context
            ? `Article: "${context.title}"\nContent: "${articleContent || context.description}"\n\nQuestion: ${message}`
            : message;

        const systemInstruction = "You are a helpful news assistant. Answer based on the article.";
        const finalPrompt = `${systemInstruction}\n\n${contextPrompt}`;

        // Pollinations.ai (Free GET API)
        // We must be careful with length. If it's too long, it might fail.
        // We truncate the prompt to ensure it fits ~2000-3000 chars safe limit for URLs.
        const safePrompt = finalPrompt.slice(0, 3000);
        const encodedPrompt = encodeURIComponent(safePrompt);
        // Add a random seed to get variations if needed, though not strictly necessary for chat
        const url = `https://text.pollinations.ai/${encodedPrompt}?model=openai`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Pollinations API failed");
        const text = await res.text();

        return NextResponse.json({
            role: 'assistant',
            content: text
        });

    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: "Failed to fetch chat response" }, { status: 500 });
    }
}
