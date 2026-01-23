# Daily News

Live Demo: https://daily-news-theta-nine.vercel.app/

## Introduction

Daily News is a minimalist, real-time news application designed to provide instant access to the latest technology headlines without the noise. Ideally suited for users who value speed, privacy, and a distraction-free reading environment.

## Features

- **Live News Feed**: Automatically aggregates and updates headlines from major technology publications including BBC, NYT, Wired, and TechCrunch.
- **Premium Monochrome Design**: A strict black-and-white aesthetic focusing on typography and readability.
- **Keyless Architecture**: Built on public APIs and RSS feeds.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Vanilla CSS Modules
- **Data Fetching**: rss-parser
- **Deployment**: Vercel

## Folder Structure

- **src/app/api/news**: API route handling RSS feed aggregation.
- **src/components/NewsCard**: Component responsible for displaying individual news items.
- **src/app/globals.css**: Global design system definitions.

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open http://localhost:3000 in your browser.
