import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  MoviesPerActorResponse,
  ActorsWithMultipleCharactersResponse,
  CharactersWithMultipleActorsResponse,
} from './app.controller.types';

@Injectable()
export class AggregateRepository {
  constructor(private readonly dataSource: DataSource) {}

  async getMoviesPerActor(page?: number, pageSize?: number): Promise<MoviesPerActorResponse> {
    // Step 1: Get paginated actors
    let actorRows;
    if (page !== undefined && pageSize !== undefined) {
      actorRows = await this.dataSource.query(`
        SELECT id, name FROM actors ORDER BY name LIMIT $1 OFFSET $2
      `, [pageSize, (page - 1) * pageSize]);
    } else {
      actorRows = await this.dataSource.query(`SELECT id, name FROM actors ORDER BY name`);
    }
    if (actorRows.length === 0) return {};
    const actorIds = actorRows.map((row: any) => row.id);
    // Step 2: Get movies for these actors
    const movieRows = await this.dataSource.query(`
      SELECT a.id AS "actorId", a.name AS "actorName", m.id AS "movieId", m.title AS "movieTitle"
      FROM actors a
      JOIN movie_cast mc ON mc.actor_id = a.id
      JOIN movies m ON mc.movie_id = m.id
      WHERE a.id = ANY($1)
      ORDER BY a.name
    `, [actorIds]);
    const result: MoviesPerActorResponse = {};
    for (const row of movieRows) {
      if (!result[row.actorName]) result[row.actorName] = [];
      result[row.actorName].push({ id: row.movieId, title: row.movieTitle });
    }
    return result;
  }

  async getActorsWithMultipleCharacters(page?: number, pageSize?: number): Promise<ActorsWithMultipleCharactersResponse> {
    // Step 1: Get paginated actors with multiple characters
    let actorRows;
    if (page !== undefined && pageSize !== undefined) {
      actorRows = await this.dataSource.query(`
        SELECT a.id, a.name FROM actors a
        WHERE a.id IN (
          SELECT actor_id FROM movie_cast GROUP BY actor_id HAVING COUNT(DISTINCT character_id) > 1
        )
        ORDER BY a.name LIMIT $1 OFFSET $2
      `, [pageSize, (page - 1) * pageSize]);
    } else {
      actorRows = await this.dataSource.query(`
        SELECT a.id, a.name FROM actors a
        WHERE a.id IN (
          SELECT actor_id FROM movie_cast GROUP BY actor_id HAVING COUNT(DISTINCT character_id) > 1
        )
        ORDER BY a.name
      `);
    }
    if (actorRows.length === 0) return {};
    const actorIds = actorRows.map((row: any) => row.id);
    // Step 2: Get roles for these actors
    const rows = await this.dataSource.query(`
      SELECT a.id AS "actorId", a.name AS "actorName", m.id AS "movieId", m.title AS "movieName", c.id AS "characterId", c.name AS "characterName"
      FROM actors a
      JOIN movie_cast mc ON mc.actor_id = a.id
      JOIN characters c ON mc.character_id = c.id
      JOIN movies m ON mc.movie_id = m.id
      WHERE a.id = ANY($1)
      ORDER BY a.name
    `, [actorIds]);
    const result: ActorsWithMultipleCharactersResponse = {};
    for (const row of rows) {
      if (!result[row.actorName]) result[row.actorName] = [];
      result[row.actorName].push({
        movieId: row.movieId,
        movieName: row.movieName,
        characterId: row.characterId,
        characterName: row.characterName,
      });
    }
    return result;
  }

  async getCharactersWithMultipleActors(page?: number, pageSize?: number): Promise<CharactersWithMultipleActorsResponse> {
    // Step 1: Get paginated characters with multiple actors
    let characterRows;
    if (page !== undefined && pageSize !== undefined) {
      characterRows = await this.dataSource.query(`
        SELECT c.id, c.name FROM characters c
        WHERE c.id IN (
          SELECT character_id FROM movie_cast GROUP BY character_id HAVING COUNT(DISTINCT actor_id) > 1
        )
        ORDER BY c.name LIMIT $1 OFFSET $2
      `, [pageSize, (page - 1) * pageSize]);
    } else {
      characterRows = await this.dataSource.query(`
        SELECT c.id, c.name FROM characters c
        WHERE c.id IN (
          SELECT character_id FROM movie_cast GROUP BY character_id HAVING COUNT(DISTINCT actor_id) > 1
        )
        ORDER BY c.name
      `);
    }
    if (characterRows.length === 0) return {};
    const characterIds = characterRows.map((row: any) => row.id);
    // Step 2: Get roles for these characters
    const rows = await this.dataSource.query(`
      SELECT c.id AS "characterId", c.name AS "characterName", m.id AS "movieId", m.title AS "movieName", a.id AS "actorId", a.name AS "actorName"
      FROM characters c
      JOIN movie_cast mc ON mc.character_id = c.id
      JOIN actors a ON mc.actor_id = a.id
      JOIN movies m ON mc.movie_id = m.id
      WHERE c.id = ANY($1)
      ORDER BY c.name
    `, [characterIds]);
    const result: CharactersWithMultipleActorsResponse = {};
    for (const row of rows) {
      if (!result[row.characterName]) result[row.characterName] = [];
      result[row.characterName].push({
        movieId: row.movieId,
        movieName: row.movieName,
        actorId: row.actorId,
        actorName: row.actorName,
      });
    }
    return result;
  }
} 