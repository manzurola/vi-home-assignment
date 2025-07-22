import Bottleneck from 'bottleneck';
import pRetry from 'p-retry';
import { TMDB } from 'tmdb-ts';

// Shared global limiter for all TMDB API requests (50 req/sec)
const tmdbLimiter = new Bottleneck({
  minTime: 20, // 1000ms / 50req = 20ms between requests
  maxConcurrent: 1,
});

export class TmdbDataFetcher {
  private readonly tmdb: TMDB;
  // Remove instance limiter, use global limiter

  constructor(apiKey: string) {
    this.tmdb = new TMDB(apiKey);
  }

  async fetchMovieDetails(tmdbId: number) {
    return tmdbLimiter.schedule(() =>
      pRetry(() => this.tmdb.movies.details(tmdbId), { retries: 3 })
    );
  }

  async fetchMovieCredits(tmdbId: number) {
    return tmdbLimiter.schedule(() =>
      pRetry(() => this.tmdb.movies.credits(tmdbId), { retries: 3 })
    );
  }
} 