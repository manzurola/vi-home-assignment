// Movies Per Actor Endpoint
export type MoviesPerActorResponse = Record<string, string[]>;

// Actors with Multiple Characters Endpoint
export interface ActorCharacterRole {
  movieName: string;
  characterName: string;
}
export type ActorsWithMultipleCharactersResponse = Record<string, ActorCharacterRole[]>;

// Characters with Multiple Actors Endpoint
export interface CharacterActorRole {
  movieName: string;
  actorName: string;
}
export type CharactersWithMultipleActorsResponse = Record<string, CharacterActorRole[]>; 