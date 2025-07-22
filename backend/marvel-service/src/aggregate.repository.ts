import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  MoviesPerActorResponse,
  ActorsWithMultipleCharactersResponse,
  CharactersWithMultipleActorsResponse,
  MovieSummary,
  ActorCharacterRole,
  CharacterActorRole,
} from './app.controller.types';

@Injectable()
export class AggregateRepository {
  constructor(private readonly dataSource: DataSource) {}

  async getMoviesPerActor(page: number, pageSize: number): Promise<MoviesPerActorResponse> {
    // Get total count of actors
    const countResult = await this.dataSource.query('SELECT COUNT(*) FROM actors');
    const totalCount = parseInt(countResult[0].count, 10);
    // Paginated query
    const rows = await this.dataSource.query(`
      SELECT a.id AS "actorId", a.name AS "actorName", m.id AS "movieId", m.title AS "movieTitle"
      FROM actors a
      JOIN movie_cast mc ON mc.actor_id = a.id
      JOIN movies m ON mc.movie_id = m.id
      ORDER BY a.name
      LIMIT $1 OFFSET $2
    `, [pageSize, (page - 1) * pageSize]);
    const items: Record<string, MovieSummary[]> = {};
    for (const row of rows) {
      if (!items[row.actorName]) items[row.actorName] = [];
      items[row.actorName].push({ id: row.movieId, title: row.movieTitle });
    }
    return { items, page, pageSize, totalCount };
  }

  async getActorsWithMultipleCharacters(page: number, pageSize: number): Promise<ActorsWithMultipleCharactersResponse> {
    // Get all actor IDs with multiple characters
    const idRows = await this.dataSource.query(`
      SELECT a.id FROM actors a
      WHERE a.id IN (
        SELECT actor_id FROM movie_cast GROUP BY actor_id HAVING COUNT(DISTINCT character_id) > 1
      )
      ORDER BY a.name
      LIMIT $1 OFFSET $2
    `, [pageSize, (page - 1) * pageSize]);
    const totalCountRows = await this.dataSource.query(`
      SELECT COUNT(*) FROM (
        SELECT actor_id FROM movie_cast GROUP BY actor_id HAVING COUNT(DISTINCT character_id) > 1
      ) sub
    `);
    const totalCount = parseInt(totalCountRows[0].count, 10);
    if (idRows.length === 0) return { items: {}, page, pageSize, totalCount };
    const actorIds = idRows.map((row: any) => row.id);
    // Get roles for these actors
    const rows = await this.dataSource.query(`
      SELECT a.id AS "actorId", a.name AS "actorName", m.id AS "movieId", m.title AS "movieName", c.id AS "characterId", c.name AS "characterName"
      FROM actors a
      JOIN movie_cast mc ON mc.actor_id = a.id
      JOIN characters c ON mc.character_id = c.id
      JOIN movies m ON mc.movie_id = m.id
      WHERE a.id = ANY($1)
      ORDER BY a.name
    `, [actorIds]);
    const items: Record<string, ActorCharacterRole[]> = {};
    for (const row of rows) {
      if (!items[row.actorName]) items[row.actorName] = [];
      items[row.actorName].push({
        movieId: row.movieId,
        movieName: row.movieName,
        characterId: row.characterId,
        characterName: row.characterName,
      });
    }
    return { items, page, pageSize, totalCount };
  }

  async getCharactersWithMultipleActors(page: number, pageSize: number): Promise<CharactersWithMultipleActorsResponse> {
    // Get all character IDs with multiple actors
    const idRows = await this.dataSource.query(`
      SELECT c.id FROM characters c
      WHERE c.id IN (
        SELECT character_id FROM movie_cast GROUP BY character_id HAVING COUNT(DISTINCT actor_id) > 1
      )
      ORDER BY c.name
      LIMIT $1 OFFSET $2
    `, [pageSize, (page - 1) * pageSize]);
    const totalCountRows = await this.dataSource.query(`
      SELECT COUNT(*) FROM (
        SELECT character_id FROM movie_cast GROUP BY character_id HAVING COUNT(DISTINCT actor_id) > 1
      ) sub
    `);
    const totalCount = parseInt(totalCountRows[0].count, 10);
    if (idRows.length === 0) return { items: {}, page, pageSize, totalCount };
    const characterIds = idRows.map((row: any) => row.id);
    // Get roles for these characters
    const rows = await this.dataSource.query(`
      SELECT c.id AS "characterId", c.name AS "characterName", m.id AS "movieId", m.title AS "movieName", a.id AS "actorId", a.name AS "actorName"
      FROM characters c
      JOIN movie_cast mc ON mc.character_id = c.id
      JOIN actors a ON mc.actor_id = a.id
      JOIN movies m ON mc.movie_id = m.id
      WHERE c.id = ANY($1)
      ORDER BY c.name
    `, [characterIds]);
    const items: Record<string, CharacterActorRole[]> = {};
    for (const row of rows) {
      if (!items[row.characterName]) items[row.characterName] = [];
      items[row.characterName].push({
        movieId: row.movieId,
        movieName: row.movieName,
        actorId: row.actorId,
        actorName: row.actorName,
      });
    }
    return { items, page, pageSize, totalCount };
  }
} 