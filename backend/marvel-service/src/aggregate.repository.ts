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

  async getMoviesPerActor(): Promise<MoviesPerActorResponse> {
    const rows = await this.dataSource.query(`
      SELECT a.name AS "actorName", array_agg(m.title) AS "movies"
      FROM actors a
      JOIN movie_cast mc ON mc.actor_id = a.id
      JOIN movies m ON mc.movie_id = m.id
      GROUP BY a.name
    `);
    const result: MoviesPerActorResponse = {};
    for (const row of rows) {
      result[row.actorName] = row.movies;
    }
    return result;
  }

  async getActorsWithMultipleCharacters(): Promise<ActorsWithMultipleCharactersResponse> {
    const rows = await this.dataSource.query(`
      SELECT a.name AS "actorName", m.title AS "movieName", c.name AS "characterName"
      FROM actors a
      JOIN movie_cast mc ON mc.actor_id = a.id
      JOIN characters c ON mc.character_id = c.id
      JOIN movies m ON mc.movie_id = m.id
      WHERE a.id IN (
        SELECT actor_id
        FROM movie_cast
        GROUP BY actor_id
        HAVING COUNT(DISTINCT character_id) > 1
      )
      ORDER BY a.name
    `);
    const result: ActorsWithMultipleCharactersResponse = {};
    for (const row of rows) {
      if (!result[row.actorName]) result[row.actorName] = [];
      result[row.actorName].push({ movieName: row.movieName, characterName: row.characterName });
    }
    return result;
  }

  async getCharactersWithMultipleActors(): Promise<CharactersWithMultipleActorsResponse> {
    const rows = await this.dataSource.query(`
      SELECT c.name AS "characterName", m.title AS "movieName", a.name AS "actorName"
      FROM characters c
      JOIN movie_cast mc ON mc.character_id = c.id
      JOIN actors a ON mc.actor_id = a.id
      JOIN movies m ON mc.movie_id = m.id
      WHERE c.id IN (
        SELECT character_id
        FROM movie_cast
        GROUP BY character_id
        HAVING COUNT(DISTINCT actor_id) > 1
      )
      ORDER BY c.name
    `);
    const result: CharactersWithMultipleActorsResponse = {};
    for (const row of rows) {
      if (!result[row.characterName]) result[row.characterName] = [];
      result[row.characterName].push({ movieName: row.movieName, actorName: row.actorName });
    }
    return result;
  }
} 