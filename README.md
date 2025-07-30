# Fandom Wiki Scraper

A full-stack web application to scrape and organize content from Fandom wikis (e.g., Lord of the Mysteries Wiki).

## Setup

1. **Install Dependencies**:
   - Backend: `cd server && npm install`
   - Frontend: `cd client && npm install`

2. **Run Locally**:
   - Backend: `cd server && npm start`
   - Frontend: `cd client && npm start`

3. **Docker**:
   - `docker-compose up --build`

4. **Access**:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`
   - WebSocket: `ws://localhost:8080`

## Features
- Beautiful gradient-themed UI with light/dark mode
- Dynamic category selection with multi-level navigation
- Real-time scraping progress and console logs
- Export to `.md`, `.txt`, `.pdf`, `.docx`
- Caching for faster re-scraping
- Dockerized deployment

## Notes
- Ensure the `server/outputs` directory exists for file storage.
- The scraper respects Fandom's robots.txt and uses standard HTTP requests.
