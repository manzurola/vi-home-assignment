# Data Scraper Documentation

## Overview

The data scraper service fetches movie and cast information from The Movie Database (TMDB) API and populates the local database with the data defined in `movies-and-actors.json`.

## Setup

1. **Get TMDB API Key**
   - Sign up at [https://www.themoviedb.org/](https://www.themoviedb.org/)
   - Go to Settings → API and request an API key
   - Set the `TMDB_API_KEY` environment variable

2. **Environment Variables**
   ```bash
   TMDB_API_KEY=your_tmdb_api_key_here
   ```

## API Endpoint

### POST /data-scraper/scrape-movies

**Description:** Scrapes all movies defined in `movies-and-actors.json` and populates the database with detailed information from TMDB.

**Method:** POST  
**URL:** `http://localhost:3000/data-scraper/scrape-movies`  
**Body:** None required

**Response:**
```json
{
  "success": true,
  "message": "Movies scraping completed successfully",
  "data": {
    "moviesProcessed": 25,
    "actorsProcessed": 150,
    "charactersProcessed": 200,
    "castRelationsProcessed": 500,
    "errors": []
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error occurred during scraping",
  "error": "Error details here"
}
```

## What Gets Scraped

For each movie in `movies-and-actors.json`, the scraper fetches:

1. **Movie Details:**
   - Title
   - Release date
   - Overview/description
   - TMDB ID

2. **Cast Information:**
   - Actor details (name, profile image)
   - Character names
   - Cast order

3. **Database Behavior:**
   - If entities already exist, they are updated (and `updated_at` field is refreshed)
   - If entities don't exist, they are created
   - Relationships between movies, actors, and characters are established

## Usage Example

```bash
# Using curl
curl -X POST http://localhost:3000/data-scraper/scrape-movies

# Using httpie
http POST localhost:3000/data-scraper/scrape-movies
```

## Notes

- The scraping process can take several minutes depending on the number of movies
- Each movie requires 2 API calls to TMDB (details + credits)
- Failed movies are logged and included in the response errors array 