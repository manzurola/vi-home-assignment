// Re-export types from tmdb-ts for convenience
export interface ScrapingResult {
  moviesProcessed: number;
  actorsProcessed: number;
  charactersProcessed: number;
  castRelationsProcessed: number;
  errors: ScrapingError[];
}

export interface ScrapingError {
  movie: string;
  tmdbId: number;
  error: string;
}

export interface MoviesData {
  movies: Record<string, number>;
  actors: string[];
} 