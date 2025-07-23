// Movies Per Actor Endpoint
import { PaginatedResult } from '../common/paginated-result';

export interface MovieSummary {
  id: string;
  title: string;
}
export type MoviesPerActorResponse = PaginatedResult<
  Record<string, MovieSummary[]>
>;

// Actors with Multiple Characters Endpoint
export interface ActorCharacterRole {
  movieId: string;
  movieName: string;
  characterId: string;
  characterName: string;
}
export type ActorsWithMultipleCharactersResponse = PaginatedResult<
  Record<string, ActorCharacterRole[]>
>;

// Characters with Multiple Actors Endpoint
export interface CharacterActorRole {
  movieId: string;
  movieName: string;
  actorId: string;
  actorName: string;
}
export type CharactersWithMultipleActorsResponse = PaginatedResult<
  Record<string, CharacterActorRole[]>
>;
