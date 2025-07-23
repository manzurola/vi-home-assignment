# Marvel Data Explorer

A full-stack application to explore Marvel movies, actors, and characters.

# About the Product:

## Current Assumptions

1. No real time data requirement. Assumed data is fetched and processed offline (periodically, by invocation etc).
2. Preparing for large scale (in the scope of this project), for both users and data
3. The initial data to fetch includes movies and actors. It seems that actors are defined perhaps to only allow them in the search. I removed this limitation and only scraping movies with all their associated actors.
4. Pagination added to all APIs
5. A larger dataset is supported but under the current json configuration. This should be changed once set is large enough.
6. I didn't add any user facing features (pagination only), both due to lack of time and I chose to go with the "wait until someone asks" approach for this one

## Possible Future features
Some possible future features are:
1. Different sorting and searching (as you mentioned as well)
2. Viewing an actor/character/cast/movie in a separate page (full view, db is ready for that)
3. Additional entities, perhaps sound engineers, directors etc (db ready)
4. Additional data providers aside from tmdb (not ready but design suggested below)
5. Large dataset (unsupported by design suggests below)
6. Large user base (heavy reads - numbers are pending but should cater to quite a heavy load)

# High Level Design and Features

A nestJS backend and react frontend. The backend populates tmdb data via dedicated API call.

## marvel-service
A nestJS backend. Two main components:

### movie-explorer
   1. Postgres database integrated (postgres for familiarity and entity relationship management)
   2. Pagination included in all three endpoints
   5. e2e test that runs postgres via docker, populates the db via actual tmdb access and asserts success scenario on all APIs
   6. db schema with UUID, defined for fast reading and ready for fetching actual entities if required
   7. docker definitions for db and app for production/testing/dev
   8. .env file support
   9. health endpoint for production deployments
   10. basic nestJS logging
   11. Future enhancements to support larger data+user scale:
       1. DB indexes could probably be improved/added
       2. Multiple instances deployable supported out-of-the-box
       3. Instead of joins, data can be precalculated in views or new tables
       4. A caching layer (although it should probably be last resort)

### data-scraper
   1. Scrapes tmdb in an offline manner, currently invoked by API for development/testing convenience at `/data-scraper/scrape-movies`
   2. Data to populate is defined in `movies-and-actors.json`
   3. Future enhancements to support larger data scale:
      1. Maintain a table log for with state of each movie to be processed (pending/failed/in-progress/fetch-completed/load-completed). This will be the trigger to which data should be loaded, instead of the json file.
      2. Store the raw data fetched
      3. We shall separate the fetching of data from its loading into the databases, this way we can do both concurrently. One components fetches from tmdb, the other in parallel scans the unhandled raw data and loads in db.
      4. It's possible that the data loader will be in the service itself, to consolidate db access. We can go further with an even driven arch if needed.
      5. To support multiple providers, we shall add an "externalId" and "externalProvider" to each entity record, maintaining the link to the external platform. Also, perhaps add link to the entry in the log table above.

## marvel-webapp - a react web app
   1. Presents the 3 desired pages via API call to marvel-service
   2. Easily extensible by adding more pages
   3. docker definitions for production/testing/dev
   4. .env file support

# Running the services

Prerequisite: Make sure you have docker installed

1. Clone the repo
2. To run both services and their dependencies in parallel locally:
   1. Add the TMDB_API_KEY value to `marvel-service/.env.test`
   2. From the root folder run - `./scripts/start_local` - starts dockerized services
   3. Once completed, run the following to scrape tmdb (a few good seconds..)
      `curl -X POST http://localhost:3000/data-scraper/scrape-movies`
   4. Then access the UI for you pleasure :)

# Testing and Development

A single e2e test exists on the backend. This test lifts postgres as a docker dependency, runs the scraper against an actual tmdb endpoint, and asserts success scenarios on all three endpoints.
No test coverage on frontend :(

1. A CI/CD pipeline is in place, running the test on PRs to main.
2. docker-compose.yml configured with test and dev databases (commands avilable in package.json)
3. `.env` file integration in place and a sample `.env.test` is available



