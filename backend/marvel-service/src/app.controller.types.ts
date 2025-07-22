// Movies Per Actor Endpoint
export interface MovieSummary {
  id: string;
  title: string;
}
export type MoviesPerActorResponse = Record<string, MovieSummary[]>;

// Actors with Multiple Characters Endpoint
export interface ActorCharacterRole {
  movieId: string;
  movieName: string;
  characterId: string;
  characterName: string;
}
export type ActorsWithMultipleCharactersResponse = Record<string, ActorCharacterRole[]>;

// Characters with Multiple Actors Endpoint
export interface CharacterActorRole {
  movieId: string;
  movieName: string;
  actorId: string;
  actorName: string;
}
export type CharactersWithMultipleActorsResponse = Record<string, CharacterActorRole[]>; 