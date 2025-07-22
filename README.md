# Marvel Data Explorer

A full-stack application to explore Marvel movies, actors, and characters using TMDB API.


Product Assumptions:

1. No definition on what data should be displayed exactly. For example, when fetching actors with multiple characters, should we display which characters were played?
2. Assuming tmdb could be only one source of data, so setting ground for that.
3. Assuming no real time data requirements, so scraping is done by a separate component. Assuming scraping of data could be frequent and intensive.
   4. Since tmdb is rate limited and could be slow or non existent, we don't want to fail requests on that.