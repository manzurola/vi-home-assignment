/**
 * Generic paginated result wrapper for API responses.
 */
export interface PaginatedResult<T> {
  items: T;
  page: number;
  pageSize: number;
  totalCount: number;
}

// Movies Per Actor Endpoint
export interface MovieSummary {
  id: string;
  title: string;
}
export type MoviesPerActorResponse = PaginatedResult<Record<string, MovieSummary[]>>;

// Actors with Multiple Characters Endpoint
export interface ActorCharacterRole {
  movieId: string;
  movieName: string;
  characterId: string;
  characterName: string;
}
export type ActorsWithMultipleCharactersResponse = PaginatedResult<Record<string, ActorCharacterRole[]>>;

// Characters with Multiple Actors Endpoint
export interface CharacterActorRole {
  movieId: string;
  movieName: string;
  actorId: string;
  actorName: string;
}
export type CharactersWithMultipleActorsResponse = PaginatedResult<Record<string, CharacterActorRole[]>>; 