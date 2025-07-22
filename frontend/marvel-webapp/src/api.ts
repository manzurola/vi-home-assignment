// API utility for backend endpoints
const API_BASE = 'http://localhost:3000';

export interface MovieSummary {
  id: string;
  title: string;
}
export interface ActorCharacterRole {
  movieId: string;
  movieName: string;
  characterId: string;
  characterName: string;
}
export interface CharacterActorRole {
  movieId: string;
  movieName: string;
  actorId: string;
  actorName: string;
}

export interface PaginatedResult<T> {
  items: T;
  page: number;
  pageSize: number;
  totalCount: number;
}

export async function fetchMoviesPerActor(page = 1, pageSize = 50): Promise<PaginatedResult<Record<string, MovieSummary[]>>> {
  const res = await fetch(`${API_BASE}/moviesPerActor?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) throw new Error('Failed to fetch movies per actor');
  return res.json();
}

export async function fetchActorsWithMultipleCharacters(page = 1, pageSize = 50): Promise<PaginatedResult<Record<string, ActorCharacterRole[]>>> {
  const res = await fetch(`${API_BASE}/actorsWithMultipleCharacters?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) throw new Error('Failed to fetch actors with multiple characters');
  return res.json();
}

export async function fetchCharactersWithMultipleActors(page = 1, pageSize = 50): Promise<PaginatedResult<Record<string, CharacterActorRole[]>>> {
  const res = await fetch(`${API_BASE}/charactersWithMultipleActors?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) throw new Error('Failed to fetch characters with multiple actors');
  return res.json();
}

// Placeholder for future detail fetches (e.g., fetchMovieDetails, fetchActorDetails, etc.) 