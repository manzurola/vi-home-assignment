# Marvel Data Explorer

A full-stack application to explore Marvel movies, actors, and characters using TMDB API.


## Product Assumptions:

1. No definition on what data should be displayed exactly. For example, when fetching actors with multiple characters, should we display which characters were played?
2. It's possible that more providers other than tmdb will appear. Not currently supported, as a challenge appears which is to normalize entity IDs across different providers.
3. Assuming no real time data requirements, so scraping is done by a separate component. Assuming scraping of data could be frequent and intensive. Since tmdb is rate limited and could be slow or non existent, we don't want to fail requests on that.
4. Preparing for features to view actor/character/movie in more details (db schema supports this)
5. Added pagination by default to support larger scale.

## Project Architecture:

The project is split into two separate components - backend and frontend.

### BACKEND - /backend/marvel-service
A nestJS server application responsible for data queries and scraping. The scraping module is currently part of this service.
Composed of two main features:

DATA SCRAPER

This module is responsible for scraping data offline from the tmdb endpoints.

If scale increases significantly in the data loaded (not queries), this module can be separated to a dedicated service.
In such a scenario, a few optimizations can be implemented:
1. Maintain a table log for with state of each movie to be processed (pending/failed/in-progress/fetch-completed/load-completed). This will be the trigger to which data should be loaded, instead of the json file.
2. We shall separate the fetching of data from its loading into the databases, this way we can do both concurrently. One components fetches from tmdb, the other in parallel scans the unhandled raw data and loads in db.
3. It's possible that the data loader will be in the service itself, to consolidate db access. We can go further with an even driven arch if needed.

MOVIE EXPLORER

This module handles various queries on the movie data we hold. Currently satisfies the three endpoints required.
The endpoints have been changed a bit to support fetching of complete entities via references. The required APIs used names as foreign keys, which is not robust and error prone.
Name normalization is not included but should be - a possible product decision on how to do that exactly.

* If additional features/modules are required, they should be added parallel to the above.

### FRONTEND - /frontend/marvel-webapp

This is a react+ts project. UI design with material-ui.

A simple webapp that displays data from the backend.
