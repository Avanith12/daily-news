# Daily News

![Daily News Demo](readme.gif)

**Live Demo:** [https://daily-news-theta-nine.vercel.app/](https://daily-news-theta-nine.vercel.app/)

---

## 📖 About

**Daily News** is a reaction against the cluttered, ad-heavy state of modern tech journalism. It is a minimalist, real-time news aggregator designed to strip away the noise and deliver raw information with an editorial aesthetic.

Unlike standard aggregators that cache content, Daily News performs **real-time ingestion** of global RSS feeds the moment you load the page, ensuring you are always seeing the absolute latest headlines from the world's most trusted technology sources.

## ✨ Key Features

### ⚡ Real-Time Aggregation
- **Zero Latency**: Fetches directly from origin RSS feeds on every request.
- **Multi-Source Merging**: Seamlessly blends headlines from BBC, New York Times, Wired, and TechCrunch into a single, unified timeline.
- **Duplicate Removal**: Intelligent filtering to ensure a clean reading experience.

### 🎨 Editorial Design System
- **Monochrome Aesthetic**: A strict black-and-white design language inspired by traditional print journalism.
- **Typography Focused**: Utilizes classic Serif typography for headlines to maximize readability and gravitas.
- **Distraction-Free**: No sidebars, no popups, no "You might also like" widgets. Just the news.

### 🖼️ Intelligent Visuals
- **Dynamic Headers**: Automatically extracts high-resolution imagery from feed metadata.
- **Smart Fallbacks**: If a source fails to provide an image, the system automatically sources high-quality, relevant technology photography from Unsplash to maintain visual consistency.

## 🛠️ Technical Architecture

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

## 📡 Included Sources

The application currently aggregates open RSS feeds from:
- **BBC Technology**
- **The New York Times (Tech)**
- **Wired (Science & Tech)**
- **TechCrunch**

## 🚀 Local Development

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

## 📂 Project Structure

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

## 📄 License
This project is open source and available for educational purposes.
