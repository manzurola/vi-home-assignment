# Marvel Service Backend

This backend is a Node.js (NestJS) service that manages Marvel movies, actors, and characters. It uses a PostgreSQL database (via TypeORM) and fetches data from TMDB to populate and update its local database. The service exposes RESTful APIs for querying movies, actors, and their relationships, and includes a data-scraper endpoint for initial data import.

---

## How to Run

1. Copy `.env.test` to `.env` and fill in your TMDB token:
   ```bash
   cp .env.test .env
   # Edit .env to add your TMDB token
   ```
2. Install dependencies:
   ```bash
   nvm use
   npm install
   ```
3. Set up the local database (runs migrations):
   ```bash
   npm run db:clean
   ```
4. Start the server:
   ```bash
   npm run start
   # or for watch mode:
   npm run start:dev
   ```
   The server runs at http://localhost:3000
5. (First time) Populate the database:
   ```bash
   curl -X POST http://localhost:3000/data-scraper/scrape-movies
   ```

---

## How to Test

- Unit tests:
  ```bash
  npm run test
  ```
- End-to-end tests:
  ```bash
  npm run test:e2e
  ```
- Test coverage:
  ```bash
  npm run test:cov
  ```

---

## How to Develop

- Use `npm run start:dev` for hot-reloading during development.
- Make sure your `.env` is set up with a valid TMDB token.
- Database is managed via Docker Compose and migrations (see below).

For more details, see comments in the code or contact the maintainer.
