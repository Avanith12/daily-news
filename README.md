# Daily News

![Daily News Demo](readme.gif)

**Live Demo:** [https://daily-news-theta-nine.vercel.app/](https://daily-news-theta-nine.vercel.app/)

Daily News is a minimalist news aggregator that delivers real-time technology headlines in a clean, distraction-free interface. Built with Next.js and powered by RSS feeds from top publishers, it offers instant access to breaking news without ads, trackers, or algorithmic curation.

## Key Features

### Real-Time Aggregation
- **Zero Latency**: Fetches directly from origin RSS feeds on every request.
- **Multi-Source Merging**: Seamlessly blends headlines from BBC, New York Times, Wired, and TechCrunch into a single, unified timeline.
- **Duplicate Removal**: Intelligent filtering to ensure a clean reading experience.

### Editorial Design System
- **Monochrome Aesthetic**: A strict black-and-white design language inspired by traditional print journalism.
- **Typography Focused**: Utilizes classic Serif typography for headlines to maximize readability and gravitas.
- **Distraction-Free**: No sidebars, no popups, no "You might also like" widgets. Just the news.

### Intelligent Visuals
- **Dynamic Headers**: Automatically extracts high-resolution imagery from feed metadata.
- **Smart Fallbacks**: If a source fails to provide an image, the system automatically sources high-quality, relevant technology photography from Unsplash to maintain visual consistency.

## Technical Architecture

This project is built on the **Next.js 14** framework, leveraging the App Router and Serverless API routes for maximum performance and scalability.

### Stack
- **Framework**: [Next.js 14](https://nextjs.org/)
- **Runtime**: Node.js (Serverless)
- **Styling**: Vanilla CSS Modules (No heavy CSS frameworks)
- **Data**: RSS / XML Parsing via `rss-parser`

### Architecture Flow
1.  **Client Request**: User visits the homepage.
2.  **Serverless Execution**: The `/api/news` route is triggered.
3.  **Parallel Fetching**: The server requests XML data from 4+ sources simultaneously.
4.  **Normalization**: Data is standardized into a common JSON format.
5.  **Delivery**: The frontend renders the curated list using React Server Components.

## Included Sources

The application currently aggregates open RSS feeds from:
- **BBC Technology**
- **The New York Times (Tech)**
- **Wired (Science & Tech)**
- **TechCrunch**

## API Documentation

The backend exposes a single REST endpoint for fetching news:

**Endpoint:** `/api/news`  
**Method:** GET  
**Location:** `src/app/api/news/route.js`

**Query Parameters:**
- `cat` - Category filter (optional)
  - `home` (default) - All news sources
  - `tech` - Technology news
  - `business` - Business news  
  - `science` - Science news
  - `ai` - AI-focused news
- `q` - Search query (optional) - Filters articles by keyword in title or description

**Example Requests:**
```bash
# Get all news (default)
GET /api/news

# Get tech news only
GET /api/news?cat=tech

# Search for "OpenAI"
GET /api/news?q=OpenAI

# Search within AI category
GET /api/news?cat=ai&q=GPT
```

**Response Format:**
```json
{
  "status": "ok",
  "articles": [
    {
      "title": "Article Title",
      "description": "Article description...",
      "url": "https://...",
      "urlToImage": "https://...",
      "source": { "name": "Source Name" },
      "publishedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

## Local Development

To run this project locally on your machine:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Avanith12/daily-news.git
    cd daily-news
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

4.  **View the app**:
    Open `http://localhost:3000` in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/news/      # Serverless route for RSS aggregation
│   ├── globals.css    # Global design system & variables
│   ├── layout.js      # Root app layout
│   └── page.js        # Main landing page
│
└── components/
    ├── NewsFeed.js    # Data fetching & state management
    └── NewsCard.js    # Individual article component
```

## Credits

- **News Data**: Sourced via public RSS feeds from [BBC](https://www.bbc.com/news), [NYT](https://www.nytimes.com/), [Wired](https://www.wired.com/), and [TechCrunch](https://techcrunch.com/). All content belongs to respective publishers.
- **Photography**: Fallback and placeholder imagery provided by [Unsplash](https://unsplash.com/).
- **Demo GIF**: From Google.
- **Typography**: [Geist](https://vercel.com/font) by Vercel and standard System Serif fonts.

## License

This project is licensed under the [MIT License](LICENSE).
