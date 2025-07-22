import Bottleneck from 'bottleneck';
import pRetry from 'p-retry';
import { TMDB } from 'tmdb-ts';

export class TmdbDataFetcher {
  private readonly tmdb: TMDB;
  private readonly limiter: Bottleneck;

  constructor(apiKey: string) {
    this.tmdb = new TMDB(apiKey);
    this.limiter = new Bottleneck({
      minTime: 300, // ~3 requests per second
      maxConcurrent: 1,
    });
  }

  async fetchMovieDetails(tmdbId: number) {
    return this.limiter.schedule(() =>
      pRetry(() => this.tmdb.movies.details(tmdbId), { retries: 3 })
    );
  }

  async fetchMovieCredits(tmdbId: number) {
    return this.limiter.schedule(() =>
      pRetry(() => this.tmdb.movies.credits(tmdbId), { retries: 3 })
    );
  }
} 