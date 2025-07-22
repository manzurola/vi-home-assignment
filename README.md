# Marvel Data Explorer

A full-stack application to explore Marvel movies, actors, and characters using TMDB API.


Product Assumptions:

1. No definition on what data should be displayed exactly. For example, when fetching actors with multiple characters, should we display which characters were played?
2. It's possible that more providers other than tmdb will appear. Not currently supported, as a challenge appears which is to normalize entity IDs across different providers. 
3. Assuming no real time data requirements, so scraping is done by a separate component. Assuming scraping of data could be frequent and intensive.
   4. Since tmdb is rate limited and could be slow or non existent, we don't want to fail requests on that.


Possible Performance Optimizations:
1. data scraping
   2. store a table of state of processed movies. then scraping does only pending. supports failure of scraping mid process and restart as an idempotent process.
   3. 