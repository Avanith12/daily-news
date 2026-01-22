# Daily News

Live Demo: https://daily-news-theta-nine.vercel.app/

## Introduction

Daily News is a minimalist, real-time news application designed to provide instant access to the latest technology headlines without the noise. It combines live RSS aggregation with an intelligent, context-aware AI chatbot. The application scrapes article content in real-time, allowing users to have meaningful conversations about news stories directly within the interface. Ideally suited for users who value speed, privacy, and a distraction-free reading environment.

## Features

- **Live News Feed**: Automatically aggregates and updates headlines from major technology publications including BBC, NYT, Wired, and TechCrunch.
- **Context-Aware AI Chat**: Integrated chatbot that scrapes and reads the full text of any selected article to provide accurate, context-specific answers.
- **Premium Monochrome Design**: A strict black-and-white aesthetic focusing on typography and readability, eliminating visual clutter.
- **Smart Image Handling**: Automatically extracts images from feed data or falls back to high-quality relevant stock imagery to ensure a consistent visual experience.
- **Keyless Architecture**: Built on public APIs and RSS feeds, requiring no API keys or complex configuration to deploy and run.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Vanilla CSS Modules
- **Data Fetching**: rss-parser
- **Web Scraping**: cheerio
- **AI Integration**: Pollinations.ai (OpenAI-compatible endpoints)
- **Deployment**: Vercel

## Folder Structure

- **src/app/api/news**: API route handling RSS feed aggregation and normalization.
- **src/app/api/chat**: API route handling web scraping and AI prompt generation.
- **src/components/NewsCard**: Component responsible for displaying individual news items and handling image fallbacks.
- **src/components/ChatInterface**: Component managing the chat UI, message history, and user interaction.
- **src/app/globals.css**: Global design system definitions including variables for the monochrome theme.

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open http://localhost:3000 in your browser.
