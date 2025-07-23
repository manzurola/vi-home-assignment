# Marvel Data Explorer

A full-stack application to explore Marvel movies, actors, and characters.


## About the Product:

### Current Assumptions

1. No real time data requirement. Assumed data is fetched and processed offline (periodically, by invocation etc).
2. Preparing for large scale (in the scope of this project), for both users and data

### Possible Future features
Some possible future features are:
1. Different sorting and searching (as you mentioned as well)
2. Viewing an actor/character/cast/movie in a separate page (full view)
3. Additional entities, perhaps sound engineers, directors etc
4. Additional data providers aside from tmdb

## Project Architecture:

The project is split into two separate components - backend and frontend.

### BACKEND - /backend/marvel-service
A nestJS server application responsible for data queries and scraping. The scraping module is currently part of this service.
Composed of two main components:

DATA SCRAPER

This module is responsible for scraping data offline from the tmdb endpoints.

Possible design improvement to support larger scale and multiple providers:
1. Maintain a table log for with state of each movie to be processed (pending/failed/in-progress/fetch-completed/load-completed). This will be the trigger to which data should be loaded, instead of the json file.
2. Store the raw data fetched
3. We shall separate the fetching of data from its loading into the databases, this way we can do both concurrently. One components fetches from tmdb, the other in parallel scans the unhandled raw data and loads in db.
4. It's possible that the data loader will be in the service itself, to consolidate db access. We can go further with an even driven arch if needed.
5. To support multiple providers, we shall add an "externalId" and "externalProvider" to each entity record, maintaining the link to the external platform. Also, perhaps add link to the entry in the log table above. 

MOVIE EXPLORER

This module handles various queries on the movie data we hold. Currently satisfies the three endpoints required.
The endpoints have been changed a bit to support fetching of complete entities via references. The required APIs used names as foreign keys, which is not robust and error prone.
Name normalization is not included but should be - a possible product decision on how to do that exactly.

This module supports adding endpoints to fetch entities directly via ID. 

* If additional features/modules are required to the backend service, they should be added parallel to the above two.

### FRONTEND - /frontend/marvel-webapp

This is a react+ts project. UI design with material-ui.

A simple webapp that displays data from the backend. Based on a page layout so additional features/pages could be added easily.
